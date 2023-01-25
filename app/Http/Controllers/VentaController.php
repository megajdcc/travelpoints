<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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
            ->whereHas('cliente',function(Builder $q) use($datos){

                $q->orWhere([
                    ['nombre','like',"%{$datos['q']}%",'or'],
                    ['apellido', 'like', "%{$datos['q']}%", 'or'],
                    ['email', 'like', "%{$datos['q']}%", 'or'],
                    ['username', 'like', "%{$datos['q']}%", 'or'],
                ]);

            })

            ->whereHas('empleado', function (Builder $q) use ($datos) {

                $q->orWhereHas('usuario',function(Builder $query) use($datos){
                    $query->orWhere([
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


        return response()->json([
            'total' => $paginator->total(),
            'ventas' => $paginator->items()
        ]);



    }   


    public function fetch(Venta $venta){

        $venta->load(['model','empleado','cliente','divisa']);

        return response()->json($venta);
    }
    




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
