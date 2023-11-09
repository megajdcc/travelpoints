<?php

namespace App\Http\Controllers;

use App\Jobs\VerificarNivelViajero;
use App\Models\Consumo;
use App\Models\Destino;
use App\Models\Divisa;
use App\Models\Movimiento;
use App\Models\Negocio\Empleado;
use App\Models\Negocio\Negocio;
use App\Models\Pais;
use App\Models\Sistema;
use App\Models\Venta;
use App\Notifications\consumoInvitado;
use App\Notifications\nuevoConsumoNegocio;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use phpseclib3\Crypt\DES;

class VentaController extends Controller
{
    public function fetchData(Request $request){
        $datos = $request->all();

       
        if(isset($datos['negocio_id']) ){
          
            $paginator = Venta::where('model_id',$datos['negocio_id'])
            ->where('model_type', $datos['model_type'])
            ->where([
                ['monto','like',"%{$datos['q']}%",'or'],
                ['comision', 'like', "%{$datos['q']}%", 'or'],
                ['tps', 'like', "%{$datos['q']}%", 'or'],
                ['tps_referente', 'like', "%{$datos['q']}%", 'or'],
                ['tps_bonificados', 'like', "%{$datos['q']}%", 'or'],
                ['certificado', 'like', "%{$datos['q']}%", 'or'],
            ])
            ->whereHas('cliente',function(Builder $q) use($datos){

                $q->orWhere([
                    ['nombre','like',"%{$datos['q']}%",'or'],
                    ['apellido', 'like', "%{$datos['q']}%", 'or'],
                    ['email', 'like', "%{$datos['q']}%", 'or'],
                    ['username', 'like', "%{$datos['q']}%", 'or'],
                ]);

            })
            ->with(['model','empleado','cliente','divisa'])
            ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);

        }else{

            $paginator = Venta::where([
                ['monto', 'like', "%{$datos['q']}%", 'or'],
                ['comision', 'like', "%{$datos['q']}%", 'or'],
                ['tps', 'like', "%{$datos['q']}%", 'or'],
                ['tps_referente', 'like', "%{$datos['q']}%", 'or'],
                ['tps_bonificados', 'like', "%{$datos['q']}%", 'or'],
                ['certificado', 'like', "%{$datos['q']}%", 'or'],
            ])
            ->whereHas('cliente', function (Builder $q) use ($datos){
                $q->orWhere([
                    ['nombre', 'like', "%{$datos['q']}%", 'or'],
                    ['apellido', 'like', "%{$datos['q']}%", 'or'],
                    ['email', 'like', "%{$datos['q']}%", 'or'],
                    ['username', 'like', "%{$datos['q']}%", 'or'],
                ]);
            })

            ->whereHas('empleado', function (Builder $q) use ($datos) {
                
                $q->orWhereHas('usuario', function (Builder $query) use ($datos) {
                    $query->orWhere([
                        ['nombre', 'like', "%{$datos['q']}%", 'or'],
                        ['apellido', 'like', "%{$datos['q']}%", 'or'],
                        ['email', 'like', "%{$datos['q']}%", 'or'],
                        ['username', 'like', "%{$datos['q']}%", 'or'],
                    ]);
                });
            })
            ->when($datos['model_type'],function($query) use($datos) {
                $query->where('model_type',$datos['model_type']);
            })
            ->when(isset($datos['usuario_id']) && $datos['usuario_id'],function($q) use($datos){
                $q->where('cliente_id',$datos['usuario_id']);
            })
            ->with(['model', 'empleado', 'cliente', 'divisa'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);
        }

        $ventas = collect($paginator->items())->each(fn ($val) => $val->cargar());

        return response()
        ->json([
            'total' => $paginator->total(),
            'ventas' => $ventas
        ]);



    }   


    public function fetch(Venta $venta){

        $venta->load(['model','empleado','cliente','divisa']);

        return response()->json($venta);
    }

    
    private function validar(Request $request,Venta $venta = null){

        return  $request->validate([
            'divisa_id' => 'required',
            'monto'          => 'required',
            'comision'       => 'nullable',
            'tipo_comision' => 'nullable',
            'tps'            => 'nullable',
            'tps_referente'  => 'nullable',
            'certificado'    => 'nullable',
            'empleado_id'    => 'nullable',
            'cliente_id'     => 'required',
            'personas'       => 'required',
            'reservacion_id' => 'nullable',
            'model_id' => 'required',
            'model_type' => 'required',
            'cantidad' => 'nullable',
            'cupon_id' => 'nullable'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();
            
            $venta = Venta::create([...$datos]);
            
            // Si fué un empleado del negocio, quien registró la venta, entonces asociamos al empleado a la venta
            if($venta->empleado_id = Empleado::where('negocio_id',$venta->model_id)->where('usuario_id', $request->user()->id)->first()?->id){
                $venta->save();
            }
            
            // Aplicar Cupon
            if(isset($datos['cupon_id']) && !is_null($datos['cupon_id'])){
                $venta->cliente->cupones()
                ->wherePivot('cupon_id',$datos['cupon_id'])
                ->wherePivot('status',1)
                ->updateExistingPivot($datos['cupon_id'],['status' => 2]);
            }

            $monto = number_format((float) $venta->monto,2,'.',',') .' '.$venta->divisa->iso;

            // Comision Viajero Tps
            if(in_array($venta->cliente->rol->nombre, ['Viajero'])){
                // multiplicamos el monto tps correspondido por la tasa de la divisa de la venta correspondiente a la divisa principal TP
                $comision_cliente = $datos['tps'] / $venta->divisa->tasa;

                //  Generamos el movimiento en la billetera del cliente 
                if (!$venta->cliente->cuenta) {
                    $venta->cliente->aperturarCuenta(0, 'Tp');
                }
                
                $movimiento = $venta->cliente->generarMovimiento($comision_cliente, "Consumo en {$venta->model->nombre} por un monto de:{$monto}.");

                $venta->tps_bonificados = $comision_cliente;
                $venta->save();

                
                // Adjudicar Comision a referidor
                if($venta->cliente->referidor->first() && $venta->cliente->referidor->first()->activo){
                    
                    $porcentaje_referidor  = Sistema::first()->porcentaje_referido;
                    $referidor = $venta->cliente->referidor->first();
                    if($porcentaje_referidor > 0){
                       
                       $comision_referidor = round($comision_cliente * $porcentaje_referidor / 100,2);
                        
                       if(!$referidor->cuenta){
                        $referidor->aperturarCuenta(0,'Tp');
                       }

                       $movimiento_referidor = $referidor->generarMovimiento($comision_referidor,
                       "Consumo de un invitado ({$venta->cliente->getNombreCompleto()}) en el negocio {$venta->model->nombre}.");

                        // Descontamos al sistema el monto adjudicado al Referidor

                        $sistema = Sistema::first();
                        
                        $monto_descontar = $comision_referidor * $sistema->cuenta->divisa->tasa;

                        
                        $sistema->generarMovimiento($monto_descontar,"Comisión adjudicada al viajero {$referidor->getNombreCompleto()}, por consumo de su invitado ({$venta->cliente->getNombreCompleto()}) en el negocio ({$venta->model->nombre}), por un monto de:{$monto}",Movimiento::TIPO_EGRESO);

                        // Se le notifica al invitador de la nueva comisión.
                        $referidor->notify(new consumoInvitado($venta,$comision_referidor, $request->headers->get('origin')));
                    }
                }
                
            }

            // descontamos al negocio El monto correspondiente por haber realizado la venta
            $comision_travel = $venta->getComisionTravel();
            $monto_descuento = Divisa::cambiar($venta->divisa,$venta->model->divisa,$comision_travel);
            $venta->model->generarMovimiento($monto_descuento, "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.",Movimiento::TIPO_EGRESO);
           
            // generar movimiento para el sistema... 
            $sistema = Sistema::first();
            $sistema->adjudicarComisiones($comision_travel,$venta);
            
            $sistema->refresh();

            if($reservacion = $venta->reservacion){
                $reservacion->status = 2;
                $reservacion->save();
            }

           
            // Falta Notificar Venta al usuario y a los operadores si los Hubiera...

            // $venta->cliente->notify(new nuevoConsumoNegocio($request->headers->get('origin'),$venta));
            DB::commit();

            VerificarNivelViajero::dispatch($venta->cliente);

            $venta->cargar();
            $result = true;
        } catch (\Throwable $th) {

            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result, 'venta' => $result ? $venta : null]);
    }

 

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Venta $venta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Venta $venta)
    {
        //
    }


    public function fetchConsumos(Request $request){

        $datos  = $request->all();


        $paginator = Venta::where([
            ['monto', 'like', "%{$datos['q']}%", 'or'],
            ['comision', 'like', "%{$datos['q']}%", 'or'],
            ['tps', 'like', "%{$datos['q']}%", 'or'],
            ['tps_referente', 'like', "%{$datos['q']}%", 'or'],
            ['certificado', 'like', "%{$datos['q']}%", 'or'],
        ])
            ->whereHas('cliente', function (Builder $q) use ($datos) {
                $q->orWhere([
                    ['nombre', 'like', "%{$datos['q']}%", 'or'],
                    ['apellido', 'like', "%{$datos['q']}%", 'or'],
                    ['email', 'like', "%{$datos['q']}%", 'or'],
                    ['username', 'like', "%{$datos['q']}%", 'or'],
                ]);
            })

            ->where('cliente_id',$datos['usuario'])
            ->with(['model', 'empleado', 'cliente', 'divisa','opinions'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);


        $ventas = collect($paginator->items());

        $ventas = $ventas->each(fn($venta) => $venta->cargar());

        return response()->json([
            'total' => $paginator->total(),
            'ventas' => $ventas
        ]);

    }


    public function fetchDataGastoTuristico(Request $request){

        $filtro = $request->all();

        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if($request->has('pais')){

            $paginations = Destino::select('nombre as destino')
                                    
                                    ->addSelect(['total_compras' => Venta::selectRaw('count(*)')
                                                    ->whereHasMorph('model', [Negocio::class], function (Builder $query) {
                                                        $query->whereColumn('estado_id','destinos.estado_id');
                                                    })
                                                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                    }),
                                                'total_consumos' => Consumo::selectRaw('count(*)')
                                                    ->whereHas('tienda', function (Builder $query) {
                                                                 $query->whereColumn('estado_id', 'destinos.estado_id');
                                                    })
                                                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                    })
                                    ])
                ->whereHas('estado.pais',fn($q) => $q->where('pais',$filtro['pais']))
                ->havingRaw('total_compras > 0 || total_consumos > 0')
                ->orderBy($filtro['sortBy'] ?? 'destino',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 100);

                $ds = Sistema::getDivisa();

                $registros = collect($paginations->items())->each(function($r) use($mes,$ds) {
                        $r->total_operaciones = ($r->total_compras + $r->total_consumos);

                        $ventas = Venta::whereHasMorph('model', [Negocio::class], function (Builder $query) use($r) {
                                     $query->whereHas('estado.destinos',fn($q) => $q->where('nombre',$r->destino));
                                })
                                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                    $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                })->get();

                        $r->reg_promedio = ($ventas->each(fn($v) => $v->monto = Divisa::cambiar($v->divisa,$ds,$v->monto)))->avg('monto');
                        $r->reg_promedio = "{$ds->iso} ".number_format((float) $r->reg_promedio,2,',','.')." {$ds->simbolo}";
                        
                });

            
        }else{
           
             $paginations = Pais::select('pais')
                                ->addSelect([
                                    'total_compras' => Venta::selectRaw('count(*)')
                                                        ->whereHasMorph('model', [Negocio::class], function (Builder $query) {
                                                            $query->whereHas('estado', fn (Builder $q) => $q->whereColumn('pais_id', 'pais.id'));
                                                        })
                                                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                                            $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                        }),
                                    'total_consumos' => Consumo::selectRaw('count(*)')
                                                        ->whereHas('tienda', function (Builder $query) {
                                                            $query->whereHas('estado', fn (Builder $q) => $q->whereColumn('pais_id', 'pais.id'));
                                                        })
                                                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                                            $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                        })
                                ])
                                ->havingRaw('total_compras > 0 || total_consumos > 0')
                                ->orderBy($filtro['sortBy'] ?? 'pais') 
                                ->paginate($filtro['perPage'] ?? 100);
                                                        
            $ds = Sistema::getDivisa();

            $registros = collect($paginations->items())->each(function($r) use($mes,$ds) {
                    $r->total_operaciones = ($r->total_compras + $r->total_consumos);

                    $ventas = Venta::whereHasMorph('model', [Negocio::class], function (Builder $query) use($r) {
                                $query->whereHas('estado.pais', fn (Builder $q) => $q->where('pais', $r->pais));
                            })
                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                                $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                            })->get();

                    $r->reg_promedio = ($ventas->each(fn($v) => $v->monto = Divisa::cambiar($v->divisa,$ds,$v->monto)))->avg('monto');
                    $r->reg_promedio = "{$ds->iso} ".number_format((float) $r->reg_promedio,2,',','.')." {$ds->simbolo}";
                    
            });
        }

        return response()->json([
            'total' => $paginations->total(),
            'registros' => $registros
        ]);


    }

    public function fetchDataGastoTuristicoDescargar(Request $request){

        $filtro = $request->all();

        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if ($request->has('pais')) {

            $paginations = Destino::select('nombre as destino')

            ->addSelect([
                'total_compras' => Venta::selectRaw('count(*)')
                ->whereHasMorph('model', [Negocio::class], function (Builder $query) {
                    $query->whereColumn('estado_id', 'destinos.estado_id');
                })
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    }),
                'total_consumos' => Consumo::selectRaw('count(*)')
                ->whereHas('tienda', function (Builder $query) {
                    $query->whereColumn('estado_id', 'destinos.estado_id');
                })
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
            ])
                ->whereHas('estado.pais', fn ($q) => $q->where('pais', $filtro['pais']))
                ->havingRaw('total_compras > 0 || total_consumos > 0')
                ->orderBy($filtro['sortBy'] ?? 'destino', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 100);

            $ds = Sistema::getDivisa();

            $registros = collect($paginations->items())->each(function ($r) use ($mes, $ds) {
                $r->total_operaciones = ($r->total_compras + $r->total_consumos);

                $ventas = Venta::whereHasMorph('model', [Negocio::class], function (Builder $query) use ($r) {
                    $query->whereHas('estado.destinos', fn ($q) => $q->where('nombre', $r->destino));
                })
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })->get();

                $r->reg_promedio = ($ventas->each(fn ($v) => $v->monto = Divisa::cambiar($v->divisa, $ds, $v->monto)))->avg('monto');
                $r->reg_promedio = "{$ds->iso} " . number_format((float) $r->reg_promedio, 2, ',', '.') . " {$ds->simbolo}";
            });
        } else {

            $paginations = Pais::select('pais')
                ->addSelect([
                    'total_compras' => Venta::selectRaw('count(*)')
                    ->whereHasMorph('model', [Negocio::class], function (Builder $query) {
                        $query->whereHas('estado', fn (Builder $q) => $q->whereColumn('pais_id', 'pais.id'));
                    })
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                            $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        }),
                    'total_consumos' => Consumo::selectRaw('count(*)')
                    ->whereHas('tienda', function (Builder $query) {
                        $query->whereHas('estado', fn (Builder $q) => $q->whereColumn('pais_id', 'pais.id'));
                    })
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                            $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                ])
                ->havingRaw('total_compras > 0 || total_consumos > 0')
                ->orderBy($filtro['sortBy'] ?? 'pais')
                ->paginate($filtro['perPage'] ?? 100);

            $ds = Sistema::getDivisa();

            $registros = collect($paginations->items())->each(function ($r) use ($mes, $ds) {
                $r->total_operaciones = ($r->total_compras + $r->total_consumos);

                $ventas = Venta::whereHasMorph('model', [Negocio::class], function (Builder $query) use ($r) {
                    $query->whereHas('estado.pais', fn (Builder $q) => $q->where('pais', $r->pais));
                })
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($query) use ($mes) {
                        $query->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })->get();

                $r->reg_promedio = ($ventas->each(fn ($v) => $v->monto = Divisa::cambiar($v->divisa, $ds, $v->monto)))->avg('monto');
                $r->reg_promedio = "{$ds->iso} " . number_format((float) $r->reg_promedio, 2, ',', '.') . " {$ds->simbolo}";
            });
        }


        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));

        $datos = [
            'filtro' => $filtro,
            'registros' => $registros,
            'paises_con_mayor_registros' => Venta::cinco_paises_con_mayores_registros(),
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
        ];


        $pdf = Pdf::loadView('reports.territorios.gasto-turistico', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Gasto Turístico.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);
    }


    public function getCincoPaisesConMayoresRegistros(){

       $ventas = Venta::cinco_paises_con_mayores_registros();
        return response()->json($ventas);

    }

}