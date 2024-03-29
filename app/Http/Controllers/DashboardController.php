<?php

namespace App\Http\Controllers;

use App\Models\Consumo;
use App\Models\Destino;
use App\Models\Movimiento;
use App\Models\Negocio\Negocio;
use App\Models\Pais;
use App\Models\Producto;
use App\Models\Sistema;
use App\Models\User;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

        $user = $usuario ?? $request->user();
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

            $viajeros = Venta::whereBetween('created_at',[now()->subYear(),now()])
                ->selectRaw('ROUND(COUNT(DISTINCT ventas.cliente_id) * 100 / (select count(*) from users)) AS porcentaje')
                ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                    $q->whereBetween('v.created_at', $rango_fecha);
                })
                ->first('porcentaje');

            // $viajeros = DB::table('ventas', 'v')
            //     ->selectRaw('ROUND(COUNT(DISTINCT v.cliente_id) * 100 / (select count(*) from users)) AS porcentaje')
            //     ->whereRaw('v.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)')
            //     ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
            //         $q->whereBetween('v.created_at', $rango_fecha);
            //     })

            //     ->first('porcentaje');
        }
       

        return response()->json((float) $viajeros->porcentaje);
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
       
        $user = $usuario ?? $request->user();
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
            $paises = Pais::selectRaw("distinct(pais.codigo) as codigo")
                            ->addSelect([
                                'cant' => User::whereHas('ciudad', function(Builder $query) {
                                            $query->whereHas('estado',function(Builder $quer) {
                                                $quer->whereColumn('pais_id','pais.id');
                                            });
                                        })
                                        ->whereHas('rol',fn($q) => $q->where('nombre','Viajero'))
                                        ->where('activo',true)
                                        ->selectRaw("count(distinct(users.id)) as cant")
                                ])
                    ->havingRaw('cant > 0')
                    ->get();

            $paises =  [
                'name' => 'Origen de viajeros',
                'enableMouseTracking' => true,
                'color' => '#0097CE',
                'type' => 'map',
                'allAreas' => false,

                'colorByPoint' => false,
                'marker' =>  [
                    'radius' => 5
                ],

                // 'index' => 1,
                'data' => [
                    ...$paises->map(fn ($val) => [\strtolower($val->codigo), $val->cant])
                ]
            ];

            $destinos = Pais::selectRaw("distinct(pais.codigo) as codigo")
            ->addSelect([
                'cant' => Destino::whereHas('ciudad', function (Builder $query) {
                    $query->whereHas('estado', function (Builder $quer) {
                        $quer->whereColumn('pais_id', 'pais.id');
                    });
                })
                    ->where('activo', true)
                    ->selectRaw("count(distinct(destinos.id)) as cant")
            ])
                ->havingRaw('cant > 0')
                ->get();


            $destinos =  [
                'name' => 'Destinos activos',
                'allAreas' => false,
                'showInLegend' => true,
                'colorByPoint' => false,
                'enableMouseTracking' => true,
                // 'index' => 1,
                'type' => 'map', 
                'color' => '#283046',

                'marker' =>  [
                    'radius' => 5
                ],
                'data' => [
                    ...$destinos->map(fn ($val) => [\strtolower($val->codigo),$val->cant]),
                ]
            ];
            
            $data = [['allAreas' => true, 'data' => [],'showInLegend' => false,'name'=>'x'],$destinos, $paises,];
            // dd($data);
             return response()->json($data);

        }
    }

    public function totalNegociosAfiliados(){
        

        $paises = Pais::selectRaw("distinct(pais.codigo) as codigo")
                    ->addSelect([
                        'cant' => Negocio::whereHas('estado',fn($q) => $q->whereColumn('pais_id','pais.id'))
                                    ->selectRaw('count(distinct(negocios.id)) as cant'),
                        'cant_activos' => Negocio::whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'))
                                        ->where('publicado',true)
                                        ->selectRaw('count(distinct(negocios.id)) as cant'),
                        
                                   
                    ])
                    // ->groupBy('codigo')
                    ->having('cant','>',0)
                    ->get();
      
        
        $negocios = [
            'name' => 'Negocios Registrados',
            'enableMouseTracking' => true,
            'color' => '#0097CE',
            'type' => 'map',
            'allAreas' => false,

            'colorByPoint' => false,
            'marker' =>  [
                'radius' => 5
            ],
            'data' => $paises->map(fn($pais) => [Str::lower($pais->codigo),$pais->cant]),
        ];

        $negocios_activos = [
                'name' => 'Negocios Activos',
                'allAreas' => false,
                'showInLegend' => true,
                'colorByPoint' => false,
                'enableMouseTracking' => true,
                // 'index' => 1,
                'type' => 'map', 
                'color' => '#283046',
                'data' => $paises->map(fn ($pais) => [Str::lower($pais->codigo), $pais->cant_activos]),
        ];

        return response()->json([['name'=>'x','data' => [], 'showInLegend' => false],$negocios_activos,$negocios]);
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

        // $ultima_fecha = Venta::get()->last()?->created_at;
        $ultima_fecha = now()->firstOfMonth()->format('d/m/Y') .' - '. now()->format('d/m/Y');

        
        $total_operaciones_registradas = collect([
            'icon'        => 'fa-cash-register',
            'color'       => 'light-primary',
            'title'       => $q1,
            'subtitle'    => 'Total compras registradas',
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

        $q1 = Sistema::totalIngresoTienda();
        $tpsGenerados = Venta::travelpointsGenerados();
        $tpsConsumados = Venta::travelpointsConsumados();
        $tpsDisponibles = Venta::travelpointsDisponibles();
        $tpsRecuperados = Venta::tpsRecuperados();
        $totalIngresosTienda = Venta::totalIngresosTienda();
        $totalRegalosVendidos = Consumo::totalRegaloVendidos();
        $precioPromedioRegalo =  Producto::avg('precio');
        
         $total_travelpoints_generados = collect([
            'icon'        => 'fa-sack-dollar',
            'color'       => 'light-success',
            'title'       => '$ ' . number_format((float) $tpsGenerados, 2) . ' TPS',
            'subtitle'    => 'Travel Points generados en el mes',
            'customClass' => 'mb-2 mb-xl-0',
        ]);

        $tps_consumados = collect([
            'icon'        => 'fa-file-invoice-dollar',
            'color'       => 'light-danger',
            'title'       => '$ ' . number_format((float) $tpsConsumados, 2) . ' TPS',
            'subtitle'    => 'Travel Points consumidos en el mes',
            'customClass' => 'mb-2 mb-xl-0',
        ]);

         $tps_disponibles = collect([
            'icon'        => 'fa-hand-holding-dollar',
            'color'       => 'light-primary',
            'title'       => '$ ' . number_format((float) $tpsDisponibles, 2) . ' TPS',
            'subtitle'    => 'Travel Points disponibles en total',
            'customClass' => 'mb-2 mb-xl-0',
        ]);

        $tps_recuperados = collect([
            'icon'        => 'fa-hand-holding-dollar',
            'color'       => 'light-primary',
            'title'       => '$ ' . number_format((float) $tpsRecuperados, 2) . ' TPS',
            'subtitle'    => 'Travel Points Recuperados',
            'customClass' => 'mb-2 mb-xl-0',
        ]);


        $totalIngresoTienda = collect([
            'icon'        => 'fa-hand-holding-dollar',
            'color'       => 'light-primary',
            'title'       => $q1,
            'subtitle'    => 'Total Ingresos para la tienda',
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
            'title'       => round($precioPromedioRegalo,2),
            'subtitle'    => 'Precio promedio Regalos Tienda',
            'customClass' => '',
        ]);



        return response()
        ->json([
            'items' => [
                $total_travelpoints_generados,
                $tps_consumados,
                $tps_disponibles,
                $tps_recuperados,
                $totalIngresoTienda,
                $totalIngresosTienda,
                $totalRegalosVendidos,
                $precioPromedioRegalo
            ],
            'ultimaFecha' => null
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

        $user = $usuario ?? $request->user();

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
            $paises = Pais::selectRaw("distinct(pais.pais) as pais, count(pais.id) as cant")
                        ->join('estados as e', 'pais.id', 'e.pais_id')
                        ->join('ciudads as c', 'e.id', 'c.estado_id')
                        ->join('users as u', 'c.id', 'u.ciudad_id')
                        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
                        ->join('users as prom', 'ur.usuario_id', 'prom.id')
                        ->groupBy('pais')->get();
            // dd($paises);
            $data = collect([]);
            foreach ($paises as $pais) {
                $data->push([
                    'pais' => $pais->pais,
                    'porcentaje' => round($pais->cant * 100 / $paises->reduce(fn (int $car, $p) => $p->cant + $car, 0), 2)
                ]);
            }
            return response()->json($data);


        }
    
    }


    public function comisionesAltasMesPromotores(Request $request,User $usuario){

        
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


    public function totalViajerosRegistrados(Request $request, User $usuario){

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


    public function eficaciaViajeros(Request $request,User $usuario){
        $uso = 0;
        $total_viajeros = $usuario->totalViajeros();
        $viajeros_activos = $usuario->viajerosActivos();
        if($total_viajeros > 0){
            $uso = ($viajeros_activos * 100) / $total_viajeros;
        }

        $activos = $total_viajeros > 0 ? $usuario->viajerosActivosConsumo() * 100 / $total_viajeros : 0;
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


    public function getNegociosActivos(User $usuario){

        $total_invitaciones = $usuario->invitaciones->count();
        $total_invitaciones_activas = $usuario->invitaciones->where('status',2)->count();

        return response()->json([
            'totalInvitaciones' => $total_invitaciones,
            'totalInvitacionesAceptadas' => $total_invitaciones_activas
        ]);
        
    }


    public function getTotalNegociosPorDestino(){

        $destinos = Destino::addSelect([
            'cant' => Negocio::whereHas('iata',fn($q) => $q->whereColumn('id', 'destinos.iata_id'))->selectRaw('count(distinct(id)) as cant')
        ])
        ->selectRaw('nombre as destino')
        ->havingRaw('cant > 0')
        ->get();

        $destinos = [
            'name' => 'Negocios',
            'data' => $destinos->map(fn($destino) => [$destino->destino,$destino->cant])
        ];

        return response()->json([$destinos]);
    }
    public function getTotalViajeros(){
        $viajeros = User::whereHas('rol',fn($q) => $q->where('nombre','Viajero'))
                        ->count();
      
        return response()->json($viajeros);
    }

    public function getViajerosPorPais(Request $request){

        
        $viajeros = Pais::selectRaw('codigo')
                        ->addSelect([
                            'cant' => User::join('ciudads as c','users.ciudad_id','c.id')->join('estados as e','c.estado_id','e.id')
                                        ->whereColumn('e.pais_id','pais.id')
                                        ->whereHas('rol', fn($q) => $q->where('nombre','Viajero'))
                                        ->selectRaw('count(users.id) as cant')
                        ])
                        ->havingRaw('cant > 0')
                        ->get();
                        

         $viajeros = [
            'name' => 'Viajeros por Pais',
            'data' => $viajeros->map(fn($viajero) => [Str::lower($viajero->codigo),$viajero->cant])
         ];


        return response()->json([
            ['name' => 'x','data' => [],'showInLegend' => false],
            $viajeros
        ]);

    }

    public function getViajerosPieChart(){

       
         $viajeros_con_consumo = User::whereHas('consumos',function($q){
            $q->whereBetween('created_at',[now()->subYear(),now()]);
        })
        ->where('activo',true)
        ->whereHas('rol',fn($q) => $q->where('nombre','Viajero'))
        ->distinct()
        ->count();

        $viajeros_sin_consumo = User::whereDoesntHave('consumos', function ($q) {
            $q->whereBetween('created_at', [now()->subYear(), now()]);
        })
            ->where('activo', true)
            ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))

            ->distinct()

            ->count();

        $viajeros_inactivos = User::where('activo',false)
        ->whereHas('rol',fn($q) => $q->where('nombre','Viajero'))
        ->distinct()->count();

        $data = collect([
            ['name' => 'Viajeros con consumo','y' => $viajeros_con_consumo], 
            ['Viajeros sin consumo', $viajeros_sin_consumo], 
            ['Viajeros inactivos', $viajeros_inactivos]]);

        $viajeros = [
            'name' => 'Viajeros',
            'showInLegend' => true,
            'data' => $data->toArray()
        ];
        
        return  response()->json([$viajeros]);
    }


    public function equipoPromotor(){

        $coordinadores = Pais::selectRaw('codigo')
                        ->addSelect([
                            'cant' => User::join('ciudads as c', 'users.ciudad_id', 'c.id')->join('estados as e', 'c.estado_id', 'e.id')
                                        ->whereColumn('e.pais_id', 'pais.id')
                                        ->whereHas('rol',fn($q) => $q->where('nombre','Coordinador'))
                                        ->selectRaw('count(users.id) as cant')
                        ])
                        ->havingRaw('cant > 0')
                        ->get();

        $lideres = Pais::selectRaw('codigo')
                    ->addSelect([
                        'cant' => User::join('ciudads as c', 'users.ciudad_id', 'c.id')->join('estados as e', 'c.estado_id', 'e.id')
                                        ->whereColumn('e.pais_id', 'pais.id')
                                        ->whereHas('rol', fn ($q) => $q->where('nombre','Lider'))
                                        ->selectRaw('count(users.id) as cant')
                    ])
                    ->havingRaw('cant > 0')
                    ->get();

        $promotores = Pais::selectRaw('codigo')
        ->addSelect([
            'cant' => User::join('ciudads as c', 'users.ciudad_id', 'c.id')->join('estados as e', 'c.estado_id', 'e.id')
                            ->whereColumn('e.pais_id', 'pais.id')
                            ->whereHas('rol', fn ($q) => $q->where('nombre','Promotor'))
                            ->selectRaw('count(users.id) as cant')
        ])
            ->havingRaw('cant > 0')
            ->get();
       
        $coordinadores_por_destino = Destino::selectRaw('lat,lng,nombre')
                            ->addSelect([
                                'cant' => User::whereHas('rol',fn($q) => $q->where('nombre','Coordinador'))
                                                ->whereHas('lideres.promotores',fn($q) => $q->whereColumn('destino_id','destinos.id'))
                                                ->selectRaw('count(users.id) as cant')
                            ])
                            ->where('activo',true)
                            ->havingRaw('cant > 0')
                            ->get();

        $lideres_por_destino = Destino::selectRaw('lat,lng,nombre')
        ->addSelect([
            'cant' => User::whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
            ->whereHas('promotores', fn ($q) => $q->whereColumn('destino_id', 'destinos.id'))
            ->selectRaw('count(users.id) as cant')
        ])
            ->where('activo', true)
            ->havingRaw('cant > 0')
            ->get();

        $promotores_por_destino = Destino::selectRaw('lat,lng,nombre')
        ->addSelect([
            'cant' => User::whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                ->whereColumn('destino_id','destinos.id')
                ->selectRaw('count(users.id) as cant')
        ])
            ->where('activo', true)
            ->havingRaw('cant > 0')
            ->get();
        
        $coordinadores = [
            'name' => 'Coordinadores',
            'showInLegend' => false,
            'allAreas' => false,
            'data' => $coordinadores->map(fn($c) => [Str::lower($c->codigo),$c->cant])
        ];

        $lideres = [
            'name' => 'Líderes',
            'showInLegend' => false,
            'allAreas' => false,
            'data' => $lideres->map(fn ($l) => [Str::lower($l->codigo), $l->cant])
        ];

        $promotores = [
            'name' => 'Promotores',
            'showInLegend' => false,
            'allAreas' => false,
            'data' => $promotores->map(fn ($p) => [Str::lower($p->codigo),$p->cant])
        ];

      

        $coordinador_por_destino = [
            'name' => 'Coordinadores',
            'allAreas' => false,
            'type' => 'mappoint',
            'data' => $coordinadores_por_destino->map(fn ($d) => ['name' => $d->nombre,'value' => $d->cant, 'geometry' => ['type' => 'Point', 'coordinates' => [(float) $d->lng, (float) $d->lat]]])
        ];

        $lideres_por_destino = [
            'name' => 'Líderes',
            'allAreas' => false,
            'type' => 'mappoint',
            'data' => $lideres_por_destino->map(fn ($d) => ['name' => $d->nombre,'value' => $d->cant, 'geometry' => ['type' => 'Point', 'coordinates' => [(float) $d->lng, (float) $d->lat]]])
        ];

         $promotores_por_destino = [
            'name' => 'Promotores',
            'allAreas' => false,
            'type' => 'mappoint',
            'data' => $promotores_por_destino->map(fn ($d) => ['name' => $d->nombre,'value' => $d->cant, 'geometry' => ['type' => 'Point', 'coordinates' => [(float) $d->lng, (float) $d->lat]]])
        ];


        return response()->json([['name' => 'x','data' => [], 'showInLegend' => false,'allAreas' => true],
            $coordinadores,
            $lideres,
            $promotores,
            $coordinador_por_destino,
            $lideres_por_destino,
            $promotores_por_destino
        ]);
    }

    public function totalCoordinadores(){

        $total_coordinadores = User::whereHas('rol',fn($q) => $q->where('nombre','Coordinador'))
                                ->count();

        return response()->json($total_coordinadores);
    }

    public function totalLideres()
    {

        $total_lideres = User::whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
        ->count();

        return response()->json($total_lideres);
    }

    public function totalPromotores()
    {
        $total_promotores = User::whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
        ->count();
        return response()->json($total_promotores);
    }
}
