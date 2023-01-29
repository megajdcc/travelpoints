<?php

namespace App\Http\Controllers;

use App\Models\Divisa;
use App\Models\Movimiento;
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

            $paginator = Venta::where([
                ['monto','like',"%{$datos['q']}%",'or'],
                ['comision', 'like', "%{$datos['q']}%", 'or'],
                ['tps', 'like', "%{$datos['q']}%", 'or'],
                ['tps_referente', 'like', "%{$datos['q']}%", 'or'],
                ['certificado', 'like', "%{$datos['q']}%", 'or'],
            ])
            ->orWhereHas('cliente',function(Builder $q) use($datos){

                $q->where([
                    ['nombre','like',"%{$datos['q']}%",'or'],
                    ['apellido', 'like', "%{$datos['q']}%", 'or'],
                    ['email', 'like', "%{$datos['q']}%", 'or'],
                    ['username', 'like', "%{$datos['q']}%", 'or'],
                ]);

            })

            ->orWhereHas('empleado', function (Builder $q) use ($datos) {

                $q->whereHas('usuario',function(Builder $query) use($datos){
                    $query->where([
                        ['nombre', 'like', "%{$datos['q']}%", 'or'],
                        ['apellido', 'like', "%{$datos['q']}%", 'or'],
                        ['email', 'like', "%{$datos['q']}%", 'or'],
                        ['username', 'like', "%{$datos['q']}%", 'or'],
                    ]);
                });

            })
            ->where('model_id',$datos['negocio_id'])
            ->where('model_type', $datos['model_type'])
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
            ->whereHas('cliente', function (Builder $q) use ($datos) {
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
            ->with(['model', 'empleado', 'cliente', 'divisa'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);
        }


        $ventas = $paginator->items();

        foreach($ventas as $venta){

            $venta->cliente->avatar = $venta->cliente->getAvatar();

        }

        return response()->json([
            'total' => $paginator->total(),
            'ventas' => $paginator->items()
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
            'model_type' => 'required'
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
        try {
            $datos = $this->validar($request);

            DB::beginTransaction();
            $venta = Venta::create([...$datos,...[
                'empleado_id' => $request->user()->id
                ]]);

        
            $monto = number_format((float) $venta->monto,2,'.',',') .' '.$venta->divisa->iso;


            $venta->cliente->generarMovimiento($datos['tps'],"Consumo en {$venta->model->nombre} por un monto de:{$monto}.");

            // dd($monto);

            $venta->model->generarMovimiento($venta->model->divisa->convertir($venta->divisa, $datos['tps']), "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.",Movimiento::TIPO_EGRESO);
            
            // generar movimiento para el sistema... 

            $sistema = Sistema::first();
            $sistema->generarMovimiento($sistema->divisa->convertir($venta->divisa,$datos['tps']), "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.",Movimiento::TIPO_INGRESO);
            
            // $sistema->refresh();

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

            // dd($th->getMessage());

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
}
