<?php

namespace App\Http\Controllers;

use App\Models\Consumo;
use App\Models\Destino;
use App\Models\Movimiento;
use App\Models\Pais;
use App\Models\Producto;
use App\Models\Sistema;
use App\Models\User;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function totalViajeros(Request $request){
        $filtro  = $request->all();

        $totalViajeros = DB::table('users','u')
            ->join('ciudads as c','u.ciudad_id','c.id')
            ->join('estados as e', 'c.estado_id', 'e.id')
            ->join('pais as p', 'e.pais_id', 'p.id')
            ->selectRaw("count(u.id) as viajeros,p.pais as pais")

            ->when(isset($filtro['genero']), function($q) use($filtro){
                $q->where('u.genero',$filtro['genero']);
            })

            ->when(isset($filtro['edades']), function ($q) use ($filtro) {
                $q->whereRaw('timestampdiff(year,u.fecha_nacimiento,CURDATE()) between :first and :second',
                [':first' => $filtro['edades'][0], ':second' => $filtro['edades'][1]]);
            })

            ->when(isset($filtro['pais']), function ($q) use ($filtro) {
                $q->where('p.id',$filtro['pais']);
            })
            ->groupBy('pais')
            ->get();
       
        $categorias  = $totalViajeros->map(fn($val) => $val->pais);

        $data = collect([]);

        // dd($totalViajeros->where('pais', 'Venezuela')->map(fn($val) => $val->viajeros));

        $categorias->each(function($categoria) use($data,$totalViajeros){
            
            $totalViajeros->where('pais',$categoria)
            ->each(function($val) use($data){
                $data->push($val->viajeros);
            });
          
        });


        return response()->json(['data' => $data, 'categorias' => $categorias]);

        
    }

    public function fetchTotalPromotores(Request $request){

        $filtro  = $request->all();

        $promotores_activos = User::whereHas('rol',function(Builder $q) {
            $q->where('nombre','Promotor');
        })->where('activo',true)->count();

        $promotores_inactivos = User::whereHas('rol', function (Builder $q) {
            $q->where('nombre', 'Promotor');
        })->where('activo', false)->count();


        $categorias  = [
            'Activos',
            'Inactivos'
        ];

        $data = collect([$promotores_activos,$promotores_inactivos]);

        return response()->json(['data' => $data, 'categorias' => $categorias]);

    }

    public function fetchTotalCoordinadores(Request $request)
    {
        $filtro  = $request->all();

        $coordinadores_activos = User::whereHas('rol', function (Builder $q) {
            $q->where('nombre', 'Coordinador');
        })->where('activo', true)->count();

        $coordinadores_inactivos = User::whereHas('rol', function (Builder $q) {
            $q->where('nombre', 'Coordinador');
        })->where('activo', false)->count();


        $categorias  = [
            'Activos',
            'Inactivos'
        ];

        $data = collect([$coordinadores_activos, $coordinadores_inactivos]);


        return response()->json(['data' => $data, 'categorias' => $categorias]);
    }


    public function viajerosActivos(Request $request, User $usuario = null){

        $user = $usuario ?: $request->user();
        $rol_user = $user->rol->nombre;
        $data = $request->all();
        $rango_fecha = false;
        $rango_fecha = preg_replace('/ +/', ' ', $data['rango_fecha']);

        if(!empty($rango_fecha)){
            $rango_fecha = \explode('to', $rango_fecha);
        }

        if(in_array($rol_user, ['Promotor', 'Coordinador', 'Lider'])){

            $referidos = 0;

            if($rol_user == 'Promotor'){
                $referidos = $user->referidos->where('activo', true)->count();
            }

            if($rol_user == 'Lider'){
                $referidos += $user->referidos->where('activo', true)->count();

                foreach($user->promotores as $promotor){
                    $referidos += $promotor->referidos->where('activo',true)->count();
                }
            }

            $viajeros = DB::table('ventas', 'v')
                ->selectRaw("IFNULL(ROUND(COUNT(DISTINCT v.cliente_id) * 100 / {$referidos}),0) AS porcentaje")
                ->join('users as u', 'v.cliente_id', 'u.id')
                ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
                ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
                ->whereRaw('v.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)')
                ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                    $q->whereBetween('v.created_at', $rango_fecha);
                })
                ->when($rol_user == 'Promotor',fn($q) => $q->where('promotor.id', $user->id))
                ->when($rol_user == 'Lider', fn($q) => $q->where('promotor.lider_id', $user->id))
                ->first('porcentaje') ;

        }else{
            $viajeros = DB::table('ventas', 'v')
                ->selectRaw('ROUND(COUNT(DISTINCT v.cliente_id) * 100 / (select count(*) from users)) AS porcentaje')
                ->whereRaw('v.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)')
                ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                    $q->whereBetween('v.created_at', $rango_fecha);
                })

                ->first('porcentaje');
        }
       

        return response()->json($viajeros->porcentaje);
    }

    public function destinosActivos(Request $request){

        $destinos = DB::table('destinos','d')
                        ->selectRaw('COUNT(DISTINCT d.id) as cantidad_destinos')
                        ->join('iatas as i','d.iata_id','i.id')
                        ->join('negocios as n', 'i.id','n.iata_id')
                        ->where('n.status',1)
                        ->groupBy('d.id')
                        ->get()
                        ->sum(fn($val) => $val->cantidad_destinos);
        
        return response()->json($destinos);
    }

    public function destinosActivosChart(){

        $negociosPorDestino = DB::table('destinos')
        ->select('destinos.nombre as destino', DB::raw('count(negocios.id) as totalNegocios'), DB::raw('group_concat(negocios.nombre SEPARATOR ", ") as nombresNegocios'))
        ->join('negocios', 'destinos.iata_id', '=', 'negocios.iata_id')
        ->where('negocios.status', 1)
        ->groupBy('destinos.nombre')
        ->orderBy('totalNegocios', 'desc')
        ->get();

        
        return response()->json($negociosPorDestino);

      

    }

    public function getPaisesActivos(Request $request, User $usuario = null){

        $user = $usuario?: $request->user();
        $rolName = $user->rol->nombre;


        if(\in_array($rolName, ['Promotor', 'Lider', 'Coordinador'])){


            $paises = Pais::selectRaw("distinct(pais.codigo) as codigo, count(pais.id) as cant")
                            ->join('estados as e','pais.id','e.pais_id')
                            ->join('ciudads as c','e.id','c.estado_id')
                            ->join('users as u','c.id', 'u.ciudad_id')
                            ->join('usuario_referencia as ur','u.id','ur.referido_id')
                            ->join('users as prom', 'ur.usuario_id','prom.id')
                            ->when($rolName == 'Promotor',fn($q) => $q->where('prom.id',$user->id))
                            ->when($rolName == 'Lider',fn($q) => $q->where('prom.lider_id',$user->id))
                            ->when($rolName == 'Coordinador',function($q) use($user){
                                $q->join('users as lider','prom.lider_id','lider.id')
                                ->where('lider.coordinador_id',$user->id);
                            })
                            ->groupBy('codigo')->get();

            $paises =  [
                'name' => 'Origen de viajeros',
                'data' => [
                    ...$paises->map(fn ($val) => [\strtolower($val->codigo), $val->cant])
                ]
            ];

            return response()->json([$paises]);


        }else{
            $paises = DB::table('pais', 'p')
                ->selectRaw('distinct(p.codigo) as codigo, count(d.id) as destinos')
                ->join('estados as es', 'p.id', 'es.pais_id')

                ->join('iatas as i', 'es.id', 'i.estado_id')
                ->join('destinos as d', 'i.id', 'd.iata_id')
                ->groupBy('codigo')
                ->get();

            $negocios = DB::table('pais', 'p')
                ->selectRaw('distinct(p.codigo) as codigo, count(n.id) as negocios')
                ->join('estados as es', 'p.id', 'es.pais_id')
                ->join('iatas as i', 'es.id', 'i.estado_id')
                ->join('negocios as n', 'i.id', 'n.iata_id')
                ->where('n.status', 1)
                ->groupBy('codigo')
                ->get();

            $paises =  [
                'name' => 'Destinos activos',
                'states' => [
                    'hover' => [
                        'color' => '#0097CE',
                    ],

                ],

                'color' => '#60a730',
                'dataLabels' => [
                    'enabled' => true,
                    'format' => '{point.name}'
                ],
                'allAreas' => false,
                'enableMouseTracking' => true,
                'showInLegend' => true,
                'data' => [
                    ...$paises->map(fn ($val) => [\strtolower($val->codigo), $val->destinos])
                ]
            ];

            $negocios = [
                'name' => 'Negocios activos',
                'states' => [
                    'hover' => [
                        'color' => '#0097CE',
                    ]
                ],
                'color' => '#0097CE',
                'dataLabels' => [
                    'enabled' => true,
                    'format' => '{point.name}'
                ],
                'allAreas' => false,
                'enableMouseTracking' => true,
                'showInLegend' => true,
                'data' => [
                    ...$negocios->map(fn ($val) => [\strtolower($val->codigo), $val->negocios])
                ],

            ];
             return response()->json([$paises,$negocios]);

        }
    }

    public function totalNegociosAfiliados(){
       
        $negocios = DB::table('pais','p')
                    ->selectRaw('p.pais, count(n.id) as negocios')
                    ->join('estados as es','p.id','es.pais_id')
                    ->join('negocios as n','es.id','n.estado_id')
                    ->where('n.status',1)
                    ->groupBy('pais')
                    ->get();

        $categorias = $negocios->map(fn($val) => $val->pais);
        
        $data = collect([]);

        foreach($categorias as $categoria){

            $negocios->filter(fn($val) => $val->pais == $categoria)->each(fn($val) => $data->push(['name' => 'Negocios','data' => [$val->negocios]]));
        }
 

        return response()->json(['data' => $data, 'categorias' => $categorias]);


    }

    public function porcentajeNegocio(){


       $ventas =  DB::table('ventas','v')
        ->selectRaw('n.nombre as negocio, count(v.id) as ventas, round((count(v.id) / (select count(*) from ventas) * 100),2) as porcentaje')
        ->join('negocios as n', 'v.model_id', '=', 'n.id')
        ->where('v.model_type', "App\\Models\\Negocio\\Negocio")
        ->groupBy('negocio')
        ->get();
        
 

        $categorias = $ventas->map(fn($val) => $val->negocio);
        $data = collect([]);

        foreach($categorias as $categoria){
            $ventas->filter(fn ($val) => $val->negocio == $categoria)
            ->each(fn($val) =>  $data->push((float) $val->porcentaje));
        }


        return response()->json([
            'data'       => $data,
            'categorias' => $categorias
        ]);

    }

    public function fetchGastosTuristicos(Request $request){

        $filtro = $request->all();
        $rango_fecha = false;
        $rango_fecha = preg_replace('/ +/', ' ', $filtro['rango_fecha']);

        if (!empty($rango_fecha)) {
            $rango_fecha = \explode('to', $rango_fecha);
        }

        $q1 = Venta::totalOperacionesRegistradas($filtro,$rango_fecha);
        $promedio = Venta::montoPromedioPorOperacion($filtro,$rango_fecha);
        $montoPromedioxusuario = Venta::montoPromedioPorUsuario($filtro,$rango_fecha);
        $registroPorUsuario = Venta::registroPorUsuario($filtro, $rango_fecha);

        $ultima_fecha = Venta::get()->last()?->created_at;
        $total_operaciones_registradas = collect([
            'icon'        => 'fa-cash-register',
            'color'       => 'light-primary',
            'title'       => $q1->ventas,
            'subtitle'    => 'Total de operaciones registradas',
            'customClass' => 'mb-2 mb-xl-0',
            'tooltip' => 'Filtra por rango de fecha, negocio, pais y Destino'

        ]);

        $monto_promedio_por_operacion = collect([
            'icon'        => 'fa-money-check-dollar',
            'color'       => 'light-primary',
            'title'       => '$ '.number_format((float) $promedio,2).' USD',
            'subtitle'    => 'Monto promedio por operación',
            'customClass' => 'mb-2 mb-xl-0',
            'tooltip' => 'Filtra por rango de fecha'

        ]);


        
        $gasto_promedio_por_viajero = collect([
            'icon'        => 'fa-money-check-dollar',
            'color'       => 'light-primary',
            'title'       => '$ '.number_format((float) $montoPromedioxusuario,2).' USD',
            'subtitle'    => 'Gasto Promedio por Viajero',
            'customClass' => 'mb-2 mb-xl-0',
            'tooltip' => 'Filtra por rango de fecha'

        ]);

        $registros_por_usuario = collect([
            'icon'        => 'fa-user-gear',
            'color'       => 'light-primary',
            'title'       =>  $registroPorUsuario,
            'subtitle'    => 'Registros por usuario',
            'customClass' => '',
            'tooltip' => 'Filtra por rango de fecha'
        ]);

       

        return response()
        ->json(['items' => [
            $total_operaciones_registradas,
            $monto_promedio_por_operacion,
            $gasto_promedio_por_viajero,
            $registros_por_usuario],
            'ultima_fecha' => $ultima_fecha
    ]);
    }
    
    public function fetchTiendaRegalos(Request $request){

        $filtro = $request->all();
        // $rango_fecha = false;
        // $rango_fecha = preg_replace('/ +/', ' ', $filtro['rango_fecha']);

        // if (!empty($rango_fecha)) {
        //     $rango_fecha = \explode('to', $rango_fecha);
        // }

        $q1 = Sistema::totalIngresoTienda();
        $tpsGenerados = Venta::travelpointsGenerados();
        $tpsConsumados = Venta::travelpointsConsumados();
        $totalIngresosTienda = Venta::totalIngresosTienda();
        $totalRegalosVendidos = Consumo::totalRegaloVendidos();
        $precioPromedioRegalo =  Producto::avg('precio');
        $ultima_fecha = Consumo::get()->last()?->created_at;
        
        $totalIngresoTienda = collect([
            'icon'        => 'fa-hand-holding-dollar',
            'color'       => 'light-primary',
            'title'       => $q1,
            'subtitle'    => 'Total Ingresos para la tienda',
            'customClass' => 'mb-2 mb-xl-0',
        ]);

        $total_travelpoints_generados = collect([
            'icon'        => 'fa-sack-dollar',
            'color'       => 'light-success',
            'title'       => '$ ' . number_format((float) $tpsGenerados, 2) . ' TPS',
            'subtitle'    => 'Total Travel Points generados',
            'customClass' => 'mb-2 mb-xl-0',
        ]);



        $tps_consumados = collect([
            'icon'        => 'fa-file-invoice-dollar',
            'color'       => 'light-danger',
            'title'       => '$ ' . number_format((float) $tpsConsumados, 2) . ' TPS',
            'subtitle'    => 'Travel Points Canjeados',
            'customClass' => 'mb-2 mb-xl-0',

        ]);

        $totalIngresosTienda = collect([
            'icon'        => 'fa-cash-register',
            'color'       => 'light-warning',
            'title'       => '$ ' . number_format((float) $totalIngresosTienda, 2) . ' USD',
            'subtitle'    => 'Total ingresos tiendas',
            'customClass' => '',
        ]);


        $totalRegalosVendidos = collect([
            'icon'        => 'fa-gifts',
            'color'       => 'light-danger',
            'title'       => $totalRegalosVendidos,
            'subtitle'    => 'Total Regalos Vendidos',
            'customClass' => '',
        ]);


        $precioPromedioRegalo = collect([
            'icon'        => 'fa-circle-dollar-to-slot',
            'color'       => 'light-success',
            'title'       => $precioPromedioRegalo,
            'subtitle'    => 'Precio promedio Regalos Tienda',
            'customClass' => '',
        ]);



        return response()
        ->json([
            'items' => [
                $totalIngresoTienda,
                $total_travelpoints_generados,
                $tps_consumados,
                $totalIngresosTienda,
                $totalRegalosVendidos,
                $precioPromedioRegalo
            ],
            'ultimaFecha' => $ultima_fecha
        ]);
    }


    public function fetchComisionesGeneradas(Request $request){


        $comisiones_por_pagar = DB::table('estado_cuentas', 'ec')
        ->selectRaw('ec.id as cuenta, sum(ec.saldo) as saldo')
                                    ->join('users as u', 'ec.model_id','u.id')
                                    ->join('rols as r', 'u.rol_id','r.id')
                                    ->where('ec.saldo','>',0)
                                    ->where('ec.model_type',"App\\Models\\User")
                                    ->where([
                                        ['r.nombre','=','Promotor','OR'],['r.nombre','=','Promotor', 'OR'], ['r.nombre','=','Lider', 'OR'], 
                                    ])
                                    ->groupBy('saldo','cuenta')
                                    ->get('saldo')
                                    ->sum('saldo');
                                    

        $comisiones_sin_pagar = DB::table('estado_cuentas', 'ec')
        ->selectRaw('ec.id as cuenta, sum(m.monto) as saldo')
        ->join('users as u', 'ec.model_id', 'u.id')
        ->join('rols as r', 'u.rol_id', 'r.id')
        ->join('movimientos as m','ec.id','m.estado_cuenta_id')
        ->where('m.monto', '>', 0)
        ->where('m.tipo_movimiento',2)
        ->where('ec.model_type', "App\\Models\\User")
        ->where([
            ['r.nombre', '=', 'Promotor', 'OR'], ['r.nombre', '=', 'Promotor', 'OR'], ['r.nombre', '=', 'Lider', 'OR'],
        ])
            ->groupBy('saldo', 'cuenta')
            ->get('saldo')
            ->sum('saldo');


        $categorias = [
            'Sin Pagar',
            'Pagadas'
        ];

        $data = collect([$comisiones_por_pagar,$comisiones_sin_pagar]);

        // foreach ($categorias as $categoria) {
        //     $ventas->filter(fn ($val) => $val->negocio == $categoria)
        //     ->each(fn ($val) =>  $data->push((float) $val->porcentaje));
        // }


        return response()->json([
            'data'       => $data,
            'categorias' => $categorias
        ]);

    }


    public function getTotalOperacionesTravel(){
        //         (select count(v.id) as tps from ventas as v 
        // where v.tps > 0)
        // UNION
        // (select count(c.id) as tps from consumos as c 
        // where c.tps > 0)
        $total_operaciones_en_venta = Venta::where('tps', '>', 0)->count();

        $total_operaciones_en_consumo = Consumo::where('tps','>',0)->count();

        $total_operaciones = $total_operaciones_en_venta +  $total_operaciones_en_consumo;


        return response()->json($total_operaciones);
        


    }

    public function getTotalReferidosRegistradoAnual(Request $request,User $usuario = null){

        $user = $usuario ?: $request->user();
        
        $usuarios_registrados = User::selectRaw('count(id) as usuarios,month(created_at) as mes')
                                    ->whereHas('referidor',function(Builder $q) use($user){
                                        $q->when($user->rol->nombre == 'Promotor',fn($qu) => $qu->where('id',$user->id))
                                        ->when($user->rol->nombre == 'Lider', fn ($qu) => $q->where('lider_id', $user->id))
                                        ->when($user->rol->nombre == 'Coordinador', function($qu) use($user){
                                            $qu->whereHas('lider', function($query) use($user){
                                                $query->where('coordinador_id',$user->id);
                                            });
                                        });
                                    })
                                    ->whereRaw("year(users.created_at) = year(now())")
                                    ->groupBY('mes')
                                    ->orderBy('mes', 'asc')
                                    ->get();


        // $usuarios_registrados = DB::table("users" ,'u')
        // ->selectRaw('count(u.id) as usuarios,month(u.created_at) as mes')
        // ->join('usuario_referencia as ur','u.id','ur.referido_id')
        // ->join('users as promotor','ur.usuario_id','promotor.id')
        // ->whereRaw("year(u.created_at) = year(now())")
        // ->when($user->rol->nombre == 'Promotor',fn($q) => $q->where('promotor.id',$user->id))
        // ->when($user->rol->nombre == 'Lider', fn ($q) => $q->where('promotor.lider_id', $user->id))
        // ->groupBy('mes')
        // ->orderBy('mes','asc')
        // ->get();
        // dd($usuarios_registrados);
        $usuarios_con_consumos = User::selectRaw('count(distinct(users.id)) as usuarios,month(users.created_at) as mes')
        ->has('consumos')
        ->whereHas('referidor', function (Builder $q) use ($user) {
            $q->when($user->rol->nombre == 'Promotor', fn ($qu) => $qu->where('id', $user->id))
                ->when($user->rol->nombre == 'Lider', fn ($qu) => $q->where('lider_id', $user->id))
                ->when($user->rol->nombre == 'Coordinador', function ($qu) use ($user) {
                    $qu->whereHas('lider', function ($query) use ($user) {
                        $query->where('coordinador_id', $user->id);
                    });
                });
        })
            ->whereRaw("year(users.created_at) = year(now())")
            ->groupBY('mes')
            ->orderBy('mes', 'asc')
            ->get();
        // $usuarios_con_consumos =
        // DB::table("users", 'u')
        // ->selectRaw('count(distinct(u.id)) as usuarios,month(u.created_at) as mes')
        // ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        // ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
        // ->join('ventas as v', 'u.id','v.cliente_id')
        // ->whereRaw("year(v.created_at) = year(now())")
        // ->when($user->rol->nombre == 'Promotor', fn ($q) => $q->where('promotor.id', $user->id))
        // ->when($user->rol->nombre == 'Lider', fn ($q) => $q->where('promotor.lider_id', $user->id))
        // ->groupBy('mes')
        // ->orderBy('mes', 'asc')
        // ->get();

        // dd($usuarios_con_consumos);

        $categorias = collect([
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ]);

        $data = \collect([
            [
                'name' => 'Registros nuevos',
                'data' => collect([])
            ],
            [
                'name' => 'Viajeros con consumo',
                'data' => collect([])
            ],


        ]);
       foreach ($categorias as $key => $mes) {

            if($val = $usuarios_registrados->where('mes' ,($key + 1))->first()){
                $data[0]['data']->push($val->usuarios);
            }else{
                $data[0]['data']->push(0);
            }

            if ($val = $usuarios_con_consumos->where('mes', ($key + 1))->first()) {
                $data[1]['data']->push($val->usuarios);
            } else {
                $data[1]['data']->push(0);
            }


       }

       $total_viajeros_consumos = $usuarios_con_consumos->sum('usuarios');
       $total_usuarios_registrados = $usuarios_registrados->sum('usuarios');



      return response()->json(['categorias' => $categorias,'data' => $data,...\compact('total_viajeros_consumos','total_usuarios_registrados')]);


    }


    public function comisiones(Request $request){

        
        $fech = $request->get('fecha');

        
        $comisiones_cobradas = DB::table('retiros','r')
            ->select('r.monto')
            ->join('users as u','r.usuario_id','u.id')
            ->where('u.id',$request->user()->id)
            ->where('r.status',3)
            ->when($fech,function($q) use($fech){
                $fecha = new Carbon($fech);
                $mes = $fecha->month;
                $ano = $fecha->year;
                $q->whereRaw("year(r.created_at) = {$ano} && month(r.created_at) = {$mes}");
            })

            ->get()->sum('monto');

            $comisiones_por_cobrar =  (float) $request->user()->cuenta->saldo;
            return response()->json(['comisiones_cobradas' => $comisiones_cobradas,'comisiones_por_cobrar' => $comisiones_por_cobrar]);


    }



    public function getStatusPromotores(Request $request){

        return response()->json($request->user()->totalPromotores());

    }

    public function getStatusCoordinadores(Request $request)
    {

        return response()->json($request->user()->totalLideres());
    }

    public function getEficaciaPromotores(Request $request){
        $eficacias = $request->user()->eficaciaPromotores();

      
        foreach ($eficacias as $key => $eficacia) {
            if($key == 'data'){
                $eficacia->each(fn($val) => $val['data']->each(fn($v) => \settype($v, 'integer')));
            }
        }
        return response()->json($eficacias);

    }


    public function totalesViajeros(Request $request){

       if($request->offsetExists('promotor_id')){
        $promotor_id = $request->get('promotor_id');
       }
        $categorias = collect([]);

       $request->user()->promotores
       ->when(isset($promotor_id),fn($q) => $q->where('id',$promotor_id))
       ->map(fn($val) => $val->getNombreCompleto())->each(fn($val) => $categorias->push($val));

    //    dd($categorias);
       $mes_actual = strtoupper(now()->isoFormat('MMMM'));
       $mes_anterior = strtoupper(now()->subMonth()->isoFormat('MMMM'));
        $penultimo_mes = strtoupper(now()->subMonths(2)->isoFormat('MMMM'));

        $data = collect([
            [
                'name' => "Este mes ({$mes_actual})",
                'data' => collect([])
            ],
            [
                'name' => "Ultimo mes ({$mes_anterior})",
                'data' => collect([])
            ],
            [
                'name' => "Penultimo mes ({$penultimo_mes})",
                'data' => collect([])
            ]
        ]);


        $request->user()->promotores
        ->when(isset($promotor_id), fn ($q) => $q->where('id', $promotor_id))
        ->each(function($promotor) use($data){
            $viajeros_ultimos_mes = $promotor->viajerosUltimoMes();
            $viajeros_penultimo_mes = $promotor->viajerosPenultimoMes();
            $viajeros_mes_presente = $promotor->viajerosMesPresente();

            $data[0]['data']->push($viajeros_mes_presente);
            $data[1]['data']->push($viajeros_ultimos_mes);
            $data[2]['data']->push($viajeros_penultimo_mes);

        });
        

        return response()->json([
            'categorias' => $categorias,
            'data' => $data
        ]);
      
       
    }

    public function porcentajeEficacia(Request $request){

        $lider = $request->user();

        $porcentaje = (float) $lider->porcentajeEficacia();

        return response()->json($porcentaje);

    }

    public function porcentajeEficaciaPromotores(Request $request){

        $lider  = $request->user();

        $porcentajes = $lider->porcentajeEficaciaPromotores();

        return response()->json($porcentajes);

    }

    public function getPorcentajeViajerosPorPais(Request $request,User $usuario =  null){

        $user = $usuario ?: $request->user();

        $rolName = $user->rol->nombre;

        if(\in_array($rolName, ['Promotor', 'Lider', 'Coordinador'])){

            $paises = Pais::selectRaw("distinct(pais.pais) as pais, count(pais.id) as cant")
                        ->join('estados as e','pais.id','e.pais_id')
                        ->join('ciudads as c','e.id','c.estado_id')
                        ->join('users as u','c.id', 'u.ciudad_id')
                        ->join('usuario_referencia as ur','u.id','ur.referido_id')
                        ->join('users as prom', 'ur.usuario_id','prom.id')
                        ->when($rolName == 'Promotor',fn($q) => $q->where('prom.id',$user->id))
                        ->when($rolName == 'Lider',fn($q) => $q->where('prom.lider_id',$user->id))
                        ->when($rolName == 'Coordinador',function($q) use($user){
                            $q->join('users as lider','prom.lider_id','lider.id')
                            ->where('lider.coordinador_id',$user->id);
                        })
                        ->groupBy('pais')->get();

                $data = collect([]);
                foreach($paises as $pais){
                    $data->push([
                        'pais' => $pais->pais,
                        'porcentaje' => round($pais->cant * 100 / $paises->reduce(fn(int $car, $p) => $p->cant + $car , 0),2)
                    ]);
                }
            return response()->json($data);


        }else{
            $paises = DB::table('pais', 'p')
                ->selectRaw('distinct(p.codigo) as codigo, count(d.id) as destinos')
                ->join('estados as es', 'p.id', 'es.pais_id')

                ->join('iatas as i', 'es.id', 'i.estado_id')
                ->join('destinos as d', 'i.id', 'd.iata_id')
                ->groupBy('codigo')
                ->get();

            $negocios = DB::table('pais', 'p')
                ->selectRaw('distinct(p.codigo) as codigo, count(n.id) as negocios')
                ->join('estados as es', 'p.id', 'es.pais_id')
                ->join('iatas as i', 'es.id', 'i.estado_id')
                ->join('negocios as n', 'i.id', 'n.iata_id')
                ->where('n.status', 1)
                ->groupBy('codigo')
                ->get();

            $paises =  [
                'name' => 'Destinos activos',
                'states' => [
                    'hover' => [
                        'color' => '#0097CE',
                    ],

                ],

                'color' => '#60a730',
                'dataLabels' => [
                    'enabled' => true,
                    'format' => '{point.name}'
                ],
                'allAreas' => false,
                'enableMouseTracking' => true,
                'showInLegend' => true,
                'data' => [
                    ...$paises->map(fn ($val) => [\strtolower($val->codigo), $val->destinos])
                ]
            ];

            $negocios = [
                'name' => 'Negocios activos',
                'states' => [
                    'hover' => [
                        'color' => '#0097CE',
                    ]
                ],
                'color' => '#0097CE',
                'dataLabels' => [
                    'enabled' => true,
                    'format' => '{point.name}'
                ],
                'allAreas' => false,
                'enableMouseTracking' => true,
                'showInLegend' => true,
                'data' => [
                    ...$negocios->map(fn ($val) => [\strtolower($val->codigo), $val->negocios])
                ],

            ];
             return response()->json([$paises,$negocios]);

        }
    
    }


    public function comisionesAltasMesPromotores(Request $request){

        $usuario = $request->user();

        $tres_mayores_comisiones_mes = DB::table('users','u')
                                            ->join('estado_cuentas as ec', 'ec.model_id','u.id')
                                            ->join('movimientos as m','ec.id','m.estado_cuenta_id')
                                            ->join('divisas as d','ec.divisa_id','d.id')
                                            ->where('ec.model_type',$usuario->model_type)
                                            ->where('u.lider_id',$usuario->id)
                                            ->where('m.tipo_movimiento',Movimiento::TIPO_INGRESO)
                                            ->whereBetween('m.created_at',[now()->subMonths(1),now()]) // Mayores comisiones del ultimo mes
                                            ->select(DB::raw("sum(m.monto) as monto, u.username,d.iso,d.simbolo"))
                                            ->groupBy('u.username','simbolo','iso')
                                            ->orderBy('monto','desc')
                                            ->limit(3)
                                            ->get();
        
        return response()->json([
            'series' => $tres_mayores_comisiones_mes->map(function($val){
                return [
                    'y' => (Int) $val->monto,
                    'dataLabels' => [
                        'format' => $val->iso.' '.number_format((float) $val->monto,2,',','.').$val->simbolo
                    ]
                ];
            }),
            'categories' => $tres_mayores_comisiones_mes->pluck('username'),
            'divisa' => ['iso' => $tres_mayores_comisiones_mes->first()?->iso ?: 'USD', 'simbolo' => $tres_mayores_comisiones_mes->first()?->simbolo ?: '$']
        ]);
    }


    public function comisionesAltasMesLideres(Request $request){

        $usuario = $request->user();

        $tres_mayores_comisiones_mes = DB::table('users', 'u')
            ->join('estado_cuentas as ec', 'ec.model_id', 'u.id')
            ->join('movimientos as m', 'ec.id', 'm.estado_cuenta_id')
            ->join('divisas as d', 'ec.divisa_id', 'd.id')
            ->where('ec.model_type', $usuario->model_type)
            ->where('u.coordinador_id', $usuario->id)
            ->where('m.tipo_movimiento', Movimiento::TIPO_INGRESO)
            ->whereBetween('m.created_at', [now()->subMonths(1), now()]) // Mayores comisiones del ultimo mes
            ->select(DB::raw("sum(m.monto) as monto, u.username,d.iso,d.simbolo"))
            ->groupBy('u.username', 'simbolo', 'iso')
            ->orderBy('monto', 'desc')
            ->limit(3)
            ->get();

        return response()->json([
            'series' => $tres_mayores_comisiones_mes->map(function ($val) {
                return [
                    'y' => (int) $val->monto,
                    'dataLabels' => [
                        'format' => $val->iso . ' ' . number_format((float) $val->monto, 2, ',', '.') . $val->simbolo
                    ]
                ];
            }),
            'categories' => $tres_mayores_comisiones_mes->pluck('username'),
            'divisa' => ['iso' => $tres_mayores_comisiones_mes->first()?->iso ?: 'USD', 'simbolo' => $tres_mayores_comisiones_mes->first()?->simbolo ?: '$']
        ]);

    }


    public function totalViajerosRegistrados(Request $request){

        $usuario = $request->user();

        $total_viajeros_mes_presente = DB::table('users','u')
                                            ->join('usuario_referencia as ur','u.id','ur.referido_id')
                                            ->join('users as promotor','ur.usuario_id','promotor.id')
                                            ->when($usuario->rol->nombre === 'Promotor',fn($q) => $q->where('promotor.id',$usuario->id))
                                            ->when($usuario->rol->nombre === 'Lider',fn($q) => $q->where('promotor.lider_id',$usuario->id))
                                            ->where('u.activo',true)
                                            ->whereBetween('u.created_at',[now()->firstOfMonth(),now()]) // se verifica desde el primer dia hasta el dia actual (mes presente)
                                            ->selectRaw("count(distinct(u.id)) as viajeros")
                                            ->first();

        $total_viajeros_ultimo_mes = DB::table('users', 'u')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
        ->when($usuario->rol->nombre === 'Promotor', fn ($q) => $q->where('promotor.id', $usuario->id))
        ->when($usuario->rol->nombre === 'Lider', fn ($q) => $q->where('promotor.lider_id', $usuario->id))
        ->where('u.activo', true)
        ->whereBetween('u.created_at', [now()->subMonth()->firstOfMonth(), now()->subMonth()->lastOfMonth()]) // primer dia a ultimo dia, mes anterior 
        ->selectRaw("count(distinct(u.id)) as viajeros")
        ->first();


        $total_viajeros_penultimo_mes = DB::table('users', 'u')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
        ->when($usuario->rol->nombre === 'Promotor', fn ($q) => $q->where('promotor.id', $usuario->id))
        ->when($usuario->rol->nombre === 'Lider', fn ($q) => $q->where('promotor.lider_id', $usuario->id))
        ->where('u.activo', true)
        ->whereBetween('u.created_at', [now()->subMonths(2)->firstOfMonth(), now()->subMonths(2)->lastOfMonth()]) // primer dia a ultimo dia, mes penultimo 
        ->selectRaw("count(distinct(u.id)) as viajeros")
        ->first();


        $viajeros_activos_mes_presente = DB::table('users', 'u')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->join('users as p', 'ur.usuario_id', 'p.id')
        ->join('ventas as v','u.id','v.cliente_id')
        ->when($usuario->rol->nombre === 'Promotor', fn ($q) => $q->where('p.id', $usuario->id))
        ->when($usuario->rol->nombre === 'Lider', fn ($q) => $q->where('p.lider_id', $usuario->id))
        ->where('u.activo', true)
        ->whereBetween('u.created_at', [now()->firstOfMonth(), now()]) // se verifica desde el primer dia hasta el dia actual (mes presente)
        ->selectRaw("count(distinct(u.id)) as viajeros")
        ->first();

        $viajeros_activos_ultimo_mes = DB::table('users', 'u')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->join('users as p', 'ur.usuario_id', 'p.id')
        ->join('ventas as v', 'u.id', 'v.cliente_id')
        ->when($usuario->rol->nombre === 'Promotor', fn ($q) => $q->where('p.id', $usuario->id))
        ->when($usuario->rol->nombre === 'Lider', fn ($q) => $q->where('p.lider_id', $usuario->id))
        ->where('u.activo', true)
        ->whereBetween('u.created_at', [now()->subMonth()->firstOfMonth(), now()->subMonth()->lastOfMonth()]) // se verifica desde el primer dia hasta el dia actual (mes presente)
        ->selectRaw("count(distinct(u.id)) as viajeros")
        ->first();

        $viajeros_activos_penultimo_mes = DB::table('users', 'u')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->join('users as p', 'ur.usuario_id', 'p.id')
        ->join('ventas as v', 'u.id', 'v.cliente_id')
        ->when($usuario->rol->nombre === 'Promotor', fn ($q) => $q->where('p.id', $usuario->id))
        ->when($usuario->rol->nombre === 'Lider', fn ($q) => $q->where('p.lider_id', $usuario->id))
        ->where('u.activo', true)
        ->whereBetween('u.created_at', [now()->subMonths(2)->firstOfMonth(), now()->subMonths(2)->lastOfMonth()]) // se verifica desde el primer dia hasta el dia actual (mes presente)
        ->selectRaw("count(distinct(u.id)) as viajeros")
        ->first();
        
        $categories = collect([
            now()->subMonths(2)->format('m-Y'), // Penultimo
            now()->subMonths(1)->format('m-Y'),  // Ultimo
            now()->format('m-Y') // Actual
        ]);


        return response()->json([
            'categories' => $categories,
            'viajerosRegistrados' => [
                'name' => 'Registrados',
                // 'colorByPoint' => true,
                'data' => [   
                    [
                        'name' => 'Mes Actual',
                        'y' => $total_viajeros_mes_presente->viajeros,
                        'drilldown' => 'Mes Actual'
                    ],
                    [
                        'name' => 'Último Mes',
                        'y' => $total_viajeros_ultimo_mes->viajeros,
                        'drilldown' => 'Último Mes'

                    ],
                    [
                        'name' => 'Penúltimo Mes',
                        'y' => $total_viajeros_penultimo_mes->viajeros,
                        'drilldown' => 'Penúltimo Mes'

                    ]
                ]    
                    ],
            'viajerosRegistradosActivos' => [
                'name' => 'Activos',
                // 'colorByPoint' => true,
                'data' => [
                    [
                        'name' => 'Mes Actual',
                        'y' => $viajeros_activos_mes_presente->viajeros,
                        'drilldown' => 'Mes Actual'
                    ],
                    [
                        'name' => 'Último Mes',
                        'y' => $viajeros_activos_ultimo_mes->viajeros,
                        'drilldown' => 'Ultimo Mes'

                    ],
                    [
                        'name' => 'Penúltimo Mes',
                        'y' => $viajeros_activos_penultimo_mes->viajeros,
                        'drilldown' => 'Penúltimo Mes'

                    ]
                ]
            ]
        ]);

    }


    public function eficaciaViajeros(Request $request){

        $usuario = $request->user();
        $uso = $usuario->totalViajeros() > 0 ? $usuario->viajerosActivos() * 100 / $usuario->totalViajeros() : 0;
        $activos = $usuario->totalViajeros() > 0 ? $usuario->viajerosActivosConsumo() * 100 / $usuario->totalViajeros() : 0;
        return response()->json([
            'uso' => $uso,
            'activos' => $activos
        ]);
    }


    public function fetchDataCoordinador(Request $request,User $usuario){

        return response()->json([
            'totalLideres' => $usuario->lideres->count(),
        ]);
        
    }

}
