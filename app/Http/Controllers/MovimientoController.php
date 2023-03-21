<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use Illuminate\Http\Request;
use App\Models\EstadoCuenta;

use App\Models\User;
use App\Models\Negocio\Negocio;
use App\Models\Divisa;
use App\Models\Sistema;

class MovimientoController extends Controller
{
    
    public function getMovimientos(EstadoCuenta $cuenta){

        $movimientos = $cuenta->movimientos;
        return response()->json($movimientos);

    }


    public function fetchData(Request $request){

        $datos = $request->all();

        switch ($datos['model_type']){
            
            case 'User':
                $model = User::find($datos['model_id']);
                
                break;

            case 'Negocio':

                $model = Negocio::find($datos['model_id']);
                break;

            case 'Sistema':
                $rol = $request->user()->rol;
                $model = $request->user();
                if(in_array($rol->nombre,['Desarrollador','Administrador'])){
                    $model = Sistema::find($datos['model_id']);
                }
               
                break;

        }


        if(!$model->cuenta){
            $cuenta = $model->aperturarCuenta();
        }else{
            $cuenta = $model->cuenta;
        }


        $pagination = Movimiento::where('estado_cuenta_id',$cuenta->id)
                            ->where([
                                ['monto','LIKE',"%{$datos['q']}%",'OR'],
                                ['balance', 'LIKE', "%{$datos['q']}%", 'OR'],
                                ['created_at', 'LIKE', "%{$datos['q']}%", 'OR'],
                            ])
                            ->orderBy($datos['sortBy'],$datos['isSortDirDesc'] ? 'desc' : 'asc')
                            ->paginate($datos['perPage']?: 1000, pageName:'currentPage');

        
                            $movimientos = $pagination->items();

                        foreach($movimientos as $movimiento){
                            
                            $movimiento->cuenta->model;
                            $movimiento->cuenta->divisa;
                            $movimiento->_cellVariants =  ['monto' => $movimiento->tipo_movimiento == 1 ? 'success' : 'danger' , "balance" => $movimiento->tipo_movimiento == 1 ? 'success' : 'danger' ];
                           


                        }


                    return response()->json([
                        'total' => $pagination->total(),
                        'movimientos' => $movimientos
                    ]);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * Display the specified resource.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function show(Movimiento $movimiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function edit(Movimiento $movimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movimiento $movimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movimiento $movimiento)
    {
        //
    }
}
