<?php

namespace App\Http\Controllers;

use App\Models\Divisa;
use App\Models\Movimiento;
use App\Models\Negocio\Empleado;
use App\Models\Sistema;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
       

            if($venta->empleado_id = Empleado::where('negocio_id',$venta->model_id)->where('usuario_id', $request->user()->id)->first()?->id){
                $venta->save();
            }
            
            // Aplicar Cupon
            if(isset($datos['cupon_id']) && !is_null($datos['cupon_id'])){
                $venta->cliente->cupones()->updateExistingPivot($datos['cupon_id'],['status' => 2]);
            }

            $monto = number_format((float) $venta->monto,2,'.',',') .' '.$venta->divisa->iso;

            // Comision Viajero Tps
            if(in_array($venta->cliente->rol->nombre, ['Viajero'])){
                // multiplicamos el monto tps correspondido por la tasa de la divisa de la venta correspondiente a la divisa principal TP
                $comision_cliente = $datos['tps'] / $venta->divisa->tasa; 
                // GEneramos el movimiento en la billetera del cliente 
                $venta->cliente->generarMovimiento($comision_cliente, "Consumo en {$venta->model->nombre} por un monto de:{$monto}.");
            }
            
          

            // descontamos al negocio El monto correspondiente por haber realizado la venta
            $comision_travel = $venta->getComisionTravel();
            
            $venta->model->generarMovimiento($venta->model->divisa->convertir($venta->divisa, $comision_travel), "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.",Movimiento::TIPO_EGRESO);

           
            // generar movimiento para el sistema... 
            $sistema = Sistema::first();
            $sistema->adjudicarComisiones($comision_travel,$venta);
            // dd($venta);
            $sistema->refresh();


          
            $venta->cargar();

            if($reservacion = $venta->reservacion){
                $reservacion->status = 2;
                $reservacion->save();
            }

            // Falta Notificar Venta al usuario y a los operadores si los Hubiera...
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {

            DB::rollBack();
            $result = false;

            dd($th->getMessage());

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
}