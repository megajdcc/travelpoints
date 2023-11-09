<?php

namespace App\Models;

use App\Jobs\VerificarNivelViajero;
use App\Models\Negocio\Negocio;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNivel extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'nivel_id',
        'avance', // del 1 al; 100 %, al llegar a 100% subir de nivel
        'completado', // default false
        'en_proceso'
    ];


    public $casts = [
        'completado' => 'boolean',
        'en_proceso' => 'boolean',
    ];



    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function nivel()
    {
        return $this->belongsTo(Nivel::class, 'nivel_id', 'id');
    }


    public function verificarNivelSiguiente(){

        $nivel_siguiente = $this->nivel->nivelSiguiente;

        if($nivel_siguiente){
            switch ($nivel_siguiente->activacion->tipo_registro) {
                case 1:
                    $this->verificarNivelSiguientePorConsumo(
                        $nivel_siguiente->activacion->valor_registro,
                        $nivel_siguiente->activacion->negocios_diferente,
                        $nivel_siguiente->activacion->cantidad_negocios ?? 1
                    );
                    break;

                case 2:
                    $this->verificarNivelSiguientePorMontoSumado(
                        $nivel_siguiente->activacion->valor_registro,
                        $nivel_siguiente->activacion->negocios_diferente,
                        $nivel_siguiente->activacion->cantidad_negocios ?? 1
                    );
                    break;

                case 3:
                    $this->verificarNivelSiguientePorIata(
                        $nivel_siguiente->activacion->valor_registro,
                        $nivel_siguiente->activacion->negocios_diferente,
                        $nivel_siguiente->activacion->cantidad_negocios ?? 1
                    );

                case 4:
                    $this->verificarNivelSiguientePorPaises(
                        $nivel_siguiente->activacion->valor_registro,
                        $nivel_siguiente->activacion->negocios_diferente,
                        $nivel_siguiente->activacion->cantidad_negocios ?? 1
                    );
                    break;
            }
        }
        
    }

    public function verificarNivelSiguientePorConsumo($registros,$negocios_diferentes = false,$cantidad_negocios =1){
        
        $consumos = Venta::where('cliente_id', $this->usuario_id)
            ->where('model_type', "App\Models\Negocio\Negocio")
            ->whereBetween('created_at', [now()->subYear(), now()])
            ->selectRaw('count(distinct(ventas.model_id)) as negocios, count(ventas.id) as registros ')->first();
        
        if($negocios_diferentes && $consumos->negocios >= $cantidad_negocios && $consumos->registros >= $registros){

            $this->completado = true;
            $this->avance = 100;
            $this->en_proceso = false;

            $this->save();
            $this->siguienteNivel();

         }else if(!$negocios_diferentes && $consumos->registros >= $registros){

            $this->completado = true;
            $this->avance = 100;
            $this->en_proceso = false;

            $this->save();
            $this->siguienteNivel();
            
         }else{

            if($negocios_diferentes){
                $this->avance = $consumos->negocios * 100 / $cantidad_negocios; 
            }else{
                $this->avance = $consumos->registros * 100 / $registros; 
            }
            
            $this->save();
            $this->verificarBajarNivel();

         }
    
    }

    public function siguienteNivel(){
        if(!is_null($this->nivel->nivelSiguiente)){
            $siguienteNivel = $this->nivel->nivelSiguiente;

            UserNivel::create([
                    'usuario_id' => $this->usuario_id,
                    'nivel_id' => $siguienteNivel->id,
                    'avance' => 1,
                    'en_proceso' => true,
                    'completado' => false
            ]);
            $this->en_proceso = false;
            $this->save();

            VerificarNivelViajero::dispatch($this->usuario);
        }
      
    }

    public function verificarNivelSiguientePorMontoSumado($monto, $negocios_diferentes = false, $cantidad_negocios = 1){

        $divisaOrigen = Divisa::where('ISO', 'USD')->first();
        $divisaDestino = Divisa::where('ISO', 'EUR')->first();

        $monto_euro = Divisa::cambiar($divisaOrigen, $divisaDestino, $monto);

        
        // Obtener la suma de los montos de los consumos del usuario en el último año
        $consumos = Venta::where('cliente_id', $this->usuario_id)
        ->where('model_type', "App\Models\Negocio\Negocio")
        ->selectRaw('distinct(ventas.model_id) as negocio_id, ventas.divisa_id, sum(ventas.monto) as monto')
        ->whereBetween('created_at', [now()->subYear(), now()])
        ->groupBy(['negocio_id', 'divisa_id'])
        ->get();

        $montoTotal = 0;
        $negociosContados = 0; // Contador de negocios
        $negociosRegistrados = []; // Almacenar los negocios ya contados

        foreach ($consumos as $consumo) {
            // Realizar la conversión de divisa para cada monto de venta a euros
            $montoConvertido = Divisa::cambiar(Divisa::find($consumo->divisa_id), $divisaDestino, $consumo->monto);
            $montoTotal += $montoConvertido;


             // Contar la cantidad de negocios y asegurarse de no contarlos nuevamente si ya se han registrado
            if (!in_array($consumo->negocio_id, $negociosRegistrados)) {
                $negociosContados++;
                $negociosRegistrados[] = $consumo->negocio_id;
            }

        }

        // Comprobar si el usuario cumple con el monto requerido para el siguiente nivel en euros y ademas se verifica si es negocios diferentes
        if ($montoTotal >= $monto_euro  && $negocios_diferentes && $negociosContados >= $cantidad_negocios) {
            // El usuario está listo para el siguiente nivel
            $this->completado = true;
            $this->avance = 100;
            $this->en_proceso = false;

            $this->save();
            $this->siguienteNivel();
        }else if(!$negocios_diferentes && $montoTotal >= $monto_euro){
            // El usuario está listo para el siguiente nivel
            $this->completado = true;
            $this->avance = 100;
            $this->en_proceso = false;

            $this->save();
            $this->siguienteNivel();
        } else {

            $this->avance = $montoTotal * 100 / $monto_euro;
            $this->save();
        }
        
    }


    public function verificarNivelSiguientePorIata($iatas, $negocios_diferentes = false, $cantidad_negocios = 1){

        // Obtener los negocios
        $consumos = Venta::where('cliente_id', $this->usuario_id)
            ->where('model_type', "App\Models\Negocio\Negocio")
            ->selectRaw('distinct(ventas.model_id) as negocio_id')
            ->whereBetween('created_at', [now()->subYear(), now()])
            ->groupBy(['negocio_id'])
            ->get();

        $negocios = collect([]);
        $iatas_contado = [];
        foreach($consumos as $consumo){
            $negocio = Negocio::find($consumo->negocio_id);
            $negocios->push($negocio);
        }

        foreach($negocios as $negocio){

            if(in_array($negocio->iata_id, $iatas_contado)){
                array_push($iatas_contado,$negocio->iata_id);
            }
        }


        if(count($iatas_contado) >= $iatas && $negocios_diferentes && $consumos->count() >= $cantidad_negocios){

            // cumple para subir de nivel
            $this->completado = true;
            $this->en_proceso = false;
            $this->avance = 100;
            $this->save();
            $this->siguienteNivel();
           
        }else if(count($iatas_contado) >= $iatas && !$negocios_diferentes){
            $this->completado = true;
            $this->avance = 100;
            $this->en_proceso = false;
            $this->save();
            $this->siguienteNivel();
        } else {

            $this->avance = count($iatas_contado) * 100 / $iatas;
            $this->save();
        }

    }



    public function verificarNivelSiguientePorPaises($paises, $negocios_diferentes = false, $cantidad_negocios = 1){
        
        // Obtener los negocios
        $consumos = Venta::where('cliente_id', $this->usuario_id)
            ->where('model_type', "App\Models\Negocio\Negocio")
            ->selectRaw('distinct(ventas.model_id) as negocio_id')
            ->whereBetween('created_at', [now()->subYear(), now()])
            ->groupBy(['negocio_id'])
            ->get();

        $negocios = collect([]);
        $paises_contado = [];
        foreach ($consumos as $consumo) {
            $negocio = Negocio::find($consumo->negocio_id);
            $negocios->push($negocio);
        }

        foreach ($negocios as $negocio) {

            if (!\in_array($negocio->estado?->pais_id, $paises_contado)) {
                array_push($paises_contado, $negocio->estado?->pais_id);
            }
        }


        if (count($paises_contado) >= $paises && $negocios_diferentes && $consumos->count() >= $cantidad_negocios) {

            // cumple para subir de nivel
            $this->completado = true;
            $this->avance = 100;
            $this->save();
            $this->siguienteNivel();
        } else if (count($paises_contado) >= $paises && !$negocios_diferentes) {
            $this->completado = true;
            $this->avance = 100;
            $this->save();
            $this->siguienteNivel();
        } else {

            $this->avance = count($paises_contado) * 100 / $paises;
            $this->save();
        }
    }

    public function verificarBajarNivel(){

        if($this->nivel->baja_nivel){
            $consumos = Venta::where('cliente_id', $this->usuario_id)
                ->where('model_type', "App\Models\Negocio\Negocio")
                ->whereBetween('created_at', [now()->subYear(), now()])
                ->selectRaw('count(distinct(ventas.model_id)) as negocios, count(ventas.id) as registros ')->first();

                if($consumos->registros < 1){
                    $user_nivel_anterior = UserNivel::where('usuario_id',$this->usuario_id)->where('nivel_id', $this->nivel->nivel_anterior_id)->first();
                    $user_nivel_anterior->en_proceso = true;
                    $user_nivel_anterior->avance = 0;
                    $user_nivel_anterior->completado = false;
                    $user_nivel_anterior->save();
                    $this->delete();
                }

        }
    }
}
