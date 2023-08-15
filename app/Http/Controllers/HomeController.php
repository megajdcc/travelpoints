<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Atraccion, Destino, Divisa, Movimiento, Retiro, User};
use App\Models\Negocio\Negocio;
use Illuminate\Database\Eloquent\Builder;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except(['searchPublic', 'searchLocation', 'getTravels']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {

        $usuario = $request->user();

        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();


        return view('home', compact('usuario'));
    }


    public function getDataApp(Request $request)
    {

        $usuario = $request->user();
        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();

        return response()->json($usuario);
    }





    public function tableroAdmin()
    {

        $result = collect([
            'cantidad_usuarios' => User::get()->count()
        ]);

        return response()->json($result);
    }

    public function tableroUser()
    {

        $result = [];
        return response()->json($result);
    }

    public function searchPublic(request $request)
    {
        $q = $request->get('q');
        $destino = $request->get('destino');
        $destinos = Destino::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['titulo', 'LIKE', "%{$q}%", "OR"],
        ])->where('activo', true)->when($destino, function ($query) use ($destino) {
            $query->where('id', $destino);
        })
            ->get();

        foreach ($destinos as $key => $destino) {
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->tipo = 'Destino';
            $destino->imagenes;
            $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';
        }

        $atracciones = Atraccion::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['incluye', 'LIKE', "%{$q}%", "OR"],
        ])->when($destino, function ($query) use ($destino) {
                $query->where('destino_id', $destino);
            })->get();

        foreach ($atracciones as $key => $atraccion) {
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->tipo = 'Atracción';
            $atraccion->imagenes;
            $atraccion->opinions;
            $atraccion->imagen = $atraccion->imagenes[0] ? "/storage/atracciones/imagenes/{$atraccion->imagenes[0]->imagen}" : '';
        }

        $negocios = Negocio::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['breve', 'LIKE', "%{$q}%", "OR"],
        ])->when($destino && !empty($destino), function ($query) use ($destino) {
            $query->whereHas('iata', function (Builder $q) use ($destino) {
                $q->whereHas('destinos', function (Builder $query) use ($destino) {
                    $query->where('id', $destino);
                });
            });
        })->where('publicado',true)
        ->get();

        foreach ($negocios as $key => $negocio) {
            $negocio->ruta = "/negocio/{$negocio->url}";
            $negocio->tipo = 'Negocio';
            $negocio->imagenes;
            $negocio->opinions;
            $negocio->imagen = $negocio->imagenes[0] ? "/storage/negocios/fotos/{$negocio->imagenes[0]->imagen}" : '';
            $negocio->cargar();
        }


        $resultados = collect([...$destinos, ...$atracciones, ...$negocios]);

        return response()->json($resultados);
    }


    public function searchLocation(Request $request)
    {
        $datos = $request->all();
        return response()->json(collect([...Destino::getLocation($datos), ...Atraccion::getLocation($datos)]));
    }


    public function getTravels(Destino $destino)
    {


        $destinos = Destino::where('activo', true)
            // ->when($destino,function($query) use($destino){
            //         $query->where('id', $destino->id);
            // })
            ->get();

        foreach ($destinos as $key => $destino) {
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->tipo = 'Destino';
            // $destino->descripcion = '';
            $destino->about_travel = '';
            // $destino->imagenes;
            // $destino->cargar();
            // $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';
        }

        $atracciones = Atraccion::get();
        foreach ($atracciones as $key => $atraccion) {
            // $atraccion->cargar();
            $atraccion->tipo = 'Atracción';

        }

        $negocios = Negocio::where('status', 1)->get();

        foreach ($negocios as $key => $negocio) {
            $negocio->ruta = "/{$negocio->url}";
            $negocio->tipo = 'Negocio';
            // $negocio->opinions;
            // $negocio->imagen = count($negocio->imagenes) > 0 ? "/storage/negocios/fotos/{$negocio->imagenes[0]->imagen}" : '';

            // $negocio->cargar();
        }


        $travels = collect([...$destinos, ...$atracciones, ...$negocios]);

        return response()->json($travels);
    }


    public function getMovimientosPorMes(Request $request,User $usuario){

        $ano = $request->input('anio');

        $ingresos = Movimiento::selectRaw('SUM(monto) as monto, MONTH(movimientos.created_at) as mes')
            ->join('estado_cuentas', 'movimientos.estado_cuenta_id', '=', 'estado_cuentas.id')
            ->join('users', 'estado_cuentas.model_id', '=', 'users.id')
            ->where('tipo_movimiento', 1)
            ->whereYear('movimientos.created_at', $ano)
            ->where('users.id', $usuario->id)
            ->groupBy('mes')
            ->orderBy('mes', 'asc')
            ->pluck('monto', 'mes')
            ->toArray();

        $egresos = Movimiento::selectRaw('SUM(monto) as monto, MONTH(movimientos.created_at) as mes')
            ->join('estado_cuentas', 'movimientos.estado_cuenta_id', '=', 'estado_cuentas.id')
            ->join('users', 'estado_cuentas.model_id', '=', 'users.id')
            ->where('tipo_movimiento', 2)
            ->whereYear('movimientos.created_at', $ano)
            ->where('users.id', $usuario->id)
            ->groupBy('mes')
            ->orderBy('mes', 'asc')
            ->pluck('monto', 'mes')
            ->toArray();

        // $retirado = Retiro::where('usuario_id',$usuario->id)->where('status',3)->get()->sum('monto');
        $retirado = Movimiento::selectRaw('sum(monto) as monto,movimientos.divisa_id')
                        ->join('estado_cuentas','movimientos.estado_cuenta_id','estado_cuentas.id')
                        ->join('users','estado_cuentas.model_id','users.id')
                        ->where('estado_cuentas.model_type',"App\Models\User")
                        ->where('users.id',$usuario->id)
                        ->where('tipo_movimiento',2)
                        ->where('concepto','Retiro de comisiones')
                        ->groupBy('divisa_id')
                        ->get();

        $monto_retirado = 0;
        foreach($retirado as $value){
            $monto_retirado += Divisa::cambiar(Divisa::find($value->divisa_id),$usuario->cuenta->divisa,$value->monto);
        }

        $saldo = $usuario->cuenta->saldo;

        // Arreglo para almacenar los montos por mes
        $mesesIngresos = [];
        $mesesEgresos = [];


        // Iterar del 1 al 12 y obtener los montos para cada mes
        for ($mes = 1; $mes <= 12; $mes++) {
            // Obtener el monto de ingresos para el mes actual o establecer cero si no existe
            $montoIngresos = isset($ingresos[$mes]) ? $ingresos[$mes] : 0;

            // Obtener el monto de egresos para el mes actual o establecer cero si no existe
            $montoEgresos = isset($egresos[$mes]) ? $egresos[$mes] : 0;

            // Agregar los montos al arreglo de meses
            $mesesIngresos[] = $montoIngresos;
            $mesesEgresos[] = -$montoEgresos;
        }

        // Formar las series de ingresos y egresos con los montos de cada mes
        $seriesIngresos = [
            'name' => 'Ingresos',
            'data' => $mesesIngresos,
        ];

        $seriesEgresos = [
            'name' => 'Egresos',
            'data' => $mesesEgresos,
        ];

        $result = [
            $seriesIngresos,
            $seriesEgresos,
        ];


        return response()->json(['graficas' => $result,'saldo' => $saldo,'iso' => $usuario?->cuenta?->divisa?->iso,'retirado' => $monto_retirado]);
    }


    public function getAcumuladoPorAno(User $usuario){

        
        $acumulado = Movimiento::whereHas('cuenta',function(Builder $q) use($usuario) {
            $q->where('model_id',$usuario->id)->where('model_type',$usuario->model_type);
        })
        ->where('tipo_movimiento',Movimiento::TIPO_INGRESO)
        ->where('concepto',"!=","Conversión de divisa")
        ->groupBy('movimientos.divisa_id')
        ->selectRaw('sum(movimientos.monto) as monto, movimientos.divisa_id')
        ->get();

        $monto_acumulado = 0;

        foreach ($acumulado as $key => $value) {
            $monto_acumulado += Divisa::cambiar(Divisa::find($value->divisa_id), $usuario->cuenta->divisa, (float) $value->monto);
        }
       
        $ingresos_acumulados = Movimiento::selectRaw('SUM(monto) as monto, YEAR(movimientos.created_at) as ano')
            ->join('estado_cuentas', 'movimientos.estado_cuenta_id', '=', 'estado_cuentas.id')
            ->join('users', 'estado_cuentas.model_id', '=', 'users.id')
            ->where('tipo_movimiento', Movimiento::TIPO_INGRESO)
            ->where('users.id', $usuario->id)
            ->groupBy('ano')
            ->orderBy('ano', 'asc')
            ->pluck('monto')
            ->toArray();

        $seriesMonto = [
            'name' => 'Ingresos',
            'data' => [0,...$ingresos_acumulados]
        ];

            

        return response()->json(['acumulado' => $monto_acumulado,'series' => [$seriesMonto]]);

    }

    public function getEfectividad(User $usuario){
        return response()->json($usuario->getEfectividad());
    }

  


}
