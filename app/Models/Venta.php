<?php

namespace App\Models;

use App\Models\Negocio\Empleado;
use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Trais\hasOpinion;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Venta extends Model
{
    use HasFactory,hasOpinion;

    // public string $model_type = 'App\Models\Venta';

    protected $fillable = [
        'divisa_id',
        'monto',
        'comision', // Monto de la comisión para el momento
        'tipo_comision', // 1 => Porcentaje por venta 2 => Monto por personas
        'tps',
        'tps_referente',
        'certificado',
        'model_id',
        'model_type',
        'empleado_id',
        'cliente_id',
        'personas',
        'reservacion_id',
        'cantidad',
        'tps_bonificados'
    ];


    public $casts = [
        'certificado' => 'boolean'
    ];

    public function model(){
        return $this->morphTo();
    }

    public function cliente(){
        return $this->belongsTo(User::class,'cliente_id','id');
    }

    public function empleado(){
        return $this->belongsTo(Empleado::class,'empleado_id','id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function reservacion(){
        return $this->belongsTo(Reservacion::class,'reservacion_id','id');
        
    }


    public function cargar(){
        $this->reservacion;
        $this->divisa;
        
        if($this->empleado){
            $this->empleado->usuario;
            $this->empleado->usuario->avatar = $this->empleado->usuario->getAvatar();
        }

        $this->cliente->avatar = $this->cliente->getAvatar();

        if($this->model->model_type == 'App\Models\Producto'){
            $this->model?->tienda?->divisa;
        }

        $this->cliente;
        $this->model;
        $this->opinions->load(['usuario','model'])->each(function($opinion) {
            $opinion->usuario->avatar = $opinion->usuario->getAvatar();
        });
        return $this;
    }


    public static function totalOperacionesRegistradas($filtro,$rango_fecha = null){

        $ventas = Venta::when(isset($filtro['pais_id']) && !empty($filtro['pais_id']), function($q) use($filtro){
                                $q->whereHasMorph('model',[Negocio::class],function($q) use($filtro){
                                    $q->whereHas('estado', fn ($query) => $query->where('pais_id', $filtro['pais_id']));
                                });
                            })

                        ->when(isset($filtro['destino_id']), function ($query) use ($filtro) {
                            $iata_id =  Destino::find($filtro['destino_id'])->iata_id;
                            $query->whereHasMorph('model',[Negocio::class],fn($q) => $q->where('iata_id',$iata_id));
                        })
                        ->whereBetween('ventas.created_at', [now()->firstOfMonth(), now()])
                        ->count();
                        
        return $ventas;
    }


    public static function montoPromedioPorOperacion($filtro, $rango_fecha = null){

        $promedios = Venta::selectRaw('avg(ventas.monto) as promedio,d.nombre as divisa')
                            ->join('divisas as d' ,'ventas.divisa_id','d.id')
                            ->when(isset($filtro['pais_id']) && !empty($filtro['pais_id']), function($q) use($filtro){
                                    $q->whereHasMorph('model', [Negocio::class], function ($q) use ($filtro) {
                                        $q->whereHas('estado', fn ($query) => $query->where('pais_id', $filtro['pais_id']));
                                    });
                            })
                            ->when(isset($filtro['destino_id']), function ($query) use ($filtro) {
                                $iata_id =  Destino::find($filtro['destino_id'])->iata_id;
                                $query->whereHasMorph('model',[Negocio::class],fn($q) => $q->where('iata_id',$iata_id));
                            })

                        ->whereBetween('ventas.created_at', [now()->firstOfMonth(), now()])
                        ->groupBy('divisa')
                        ->get();
        
        $divisa = (Sistema::first())->divisa;  // Obtener la divisa en la que opera o muestra el sistema

        foreach($promedios as $promedio){
            $divi = Divisa::where('nombre', $promedio->divisa)->first();
            $promedio->promedio = Divisa::cambiar($divi,$divisa,$promedio->promedio);
        }

        $promedio = 0;

        if($promedios->count() > 0){
            $promedio = $promedios->sum(fn ($val) => $val->promedio) / $promedios->count();
        }
       
        return round($promedio,2);

    }

    public static function montoPromedioPorUsuario($filtro , $rango_fecha = null){

        $promedioPorUsuario = Venta::select([
                                                'cliente_id',
                                                DB::raw('AVG(ventas.monto) as promedio'), 'd.nombre as divisa'
                                             ])
                                            ->join('divisas as d','ventas.divisa_id','d.id')
                                            ->when(isset($filtro['pais_id']) && !empty($filtro['pais_id']), function ($q) use ($filtro) {
                                                    $q->whereHasMorph('model', [Negocio::class], function ($q) use ($filtro) {
                                                        $q->whereHas('estado', fn ($query) => $query->where('pais_id', $filtro['pais_id']));
                                                    });
                                            })
                                            ->when(isset($filtro['destino_id']), function ($query) use ($filtro) {
                                                $iata_id =  Destino::find($filtro['destino_id'])->iata_id;
                                                 $query->whereHasMorph('model', [Negocio::class], fn ($q) => $q->where('iata_id', $iata_id));
                                            })
                                            ->whereBetween('ventas.created_at', [now()->firstOfMonth(), now()])
                                            ->groupBy('cliente_id', 'divisa')
                                            ->get();
        $divisa = (Sistema::first())->divisa;
        foreach ($promedioPorUsuario as $promedio) {
            $divi = Divisa::where('nombre', $promedio->divisa)->first();
            $promedio->promedio = Divisa::cambiar($divi,$divisa,$promedio->promedio);
        }

        $promedio = 0;

        if($promedioPorUsuario->count() > 0){
            $promedio = $promedioPorUsuario->sum(fn ($val) => $val->promedio) / $promedioPorUsuario->count();
        }

        return round($promedio,2);

    }


    public static function registroPorUsuario($filtro, $rango_fecha = null){

        $totalVentasPorUsuario = Venta::select(['cliente_id',DB::raw('count(ventas.id) as ventas')])
                                    ->when(isset($filtro['pais_id']) && !empty($filtro['pais_id']), function($q) use($filtro){
                                            $q->whereHasMorph('model', [Negocio::class], function ($q) use ($filtro) {
                                                $q->whereHas('estado', fn ($query) => $query->where('pais_id', $filtro['pais_id']));
                                            });
                                    })
                                    ->when(isset($filtro['destino_id']), function ($query) use ($filtro) {
                                        $iata_id =  Destino::find($filtro['destino_id'])->iata_id;
                                        $query->whereHasMorph('model', [Negocio::class], fn ($q) => $q->where('iata_id', $iata_id));
                                    })
                                    ->whereBetween('ventas.created_at', [now()->firstOfMonth(), now()])
                                    ->groupBy('cliente_id')
                                    ->get();
   

        $promedio = 0;

        if ($totalVentasPorUsuario->count() > 0) {
            $promedio = $totalVentasPorUsuario->sum(fn ($val) => $val->ventas) / $totalVentasPorUsuario->count();
        }
        return $promedio;

    }

    public static function travelpointsGenerados(){
        return Venta::whereBetween('created_at',[now()->firstOfMonth(),now()])->get()->sum('tps');
    }

    public static function travelpointsConsumados(){
        return Consumo::whereBetween('created_at',[now()->firstOfMonth(),now()])->sum('tps');
    }

    public static function travelpointsDisponibles(){
        return EstadoCuenta::whereHas('divisa',fn($q) => $q->where('iso',(Divisa::where('principal',true)->first())->iso))->where('saldo','>',0)->sum('saldo');
    }   

    public static function tpsRecuperados(){
        $sistema = Sistema::first();

        $monto_recuperados = Movimiento::whereHas('cuenta',function(Builder $query) use($sistema){
            $query->whereHasMorph('model',[Sistema::class],fn($q) => $q->where('id',$sistema->id));
        })
        ->where('concepto','LIKE', "%Inactividad del Viajero%")
        ->where('tipo_movimiento',Movimiento::TIPO_INGRESO)
        ->sum('monto');


        $tps_recuperados = Divisa::cambiar($sistema->cuenta->divisa,Divisa::where('principal',true)->first(),$monto_recuperados);

        return $tps_recuperados;

    }

    public static function totalIngresosTienda(){
        return Consumo::sum('total');
    }

    public function getComisionTravel(){

        $negocio = $this->model;
        $comision_travel = 0;
        if($negocio->tipo_comision == 1){
            $comision_travel = $this->monto * $negocio->comision / 100;
        }else{
            $comision_travel = $negocio->comision * $this->personas;
        }
        return $comision_travel;
    }

}
