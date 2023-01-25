<?php

namespace App\Http\Controllers;

use App\Models\Negocio\HorarioReservacion;
use App\Models\Negocio\Mesa;
use App\Models\Negocio\Negocio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HorarioReservacionController extends Controller
{
    
    public function fetchData(Request $request){

        $datos = $request->all();

        if(isset($datos['negocio_id'])){

            $paginator = HorarioReservacion::where([
                ['dia','LIKE',"%{$datos['q']}%",'or'],
                ['hora', 'LIKE', "%{$datos['q']}%", 'or'],
                ['condicion', 'LIKE', "%{$datos['q']}%",'or'],
            ])
            ->where('negocio_id',$datos['negocio_id'])
            ->with(['negocio', 'mesas'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage']?: 10000);
        }else{
            $paginator = HorarioReservacion::where([
                ['dia', 'LIKE', "%{$datos['q']}%", 'or'],
                ['hora', 'LIKE', "%{$datos['q']}%", 'or'],
                ['condicion', 'LIKE', "%{$datos['q']}%", 'or'],
            ])
                ->where('negocio_id', $datos['negocio_id'])
                ->with(['negocio','mesas'])
                ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($datos['perPage'] ?: 10000);
        }


        return response()->json([
            'total' => $paginator->total(),
            'horarios' => $paginator->items()
        ]);


    }

    public function fetch(HorarioReservacion $horario){

        $horario->load('negocio');

        return response()->json($horario);


    }

    public function getAll(Negocio $negocio){
        $horarios = $negocio->horarioReservacions->load('mesas');
        return response()->json($horarios);
    }


    private function validar(Request $request){

        return $request->validate([
            'negocio_id' => 'required',
            'dia' => 'required',
            'hora' => 'required',
            'lugares' => 'nullable',
            'floor_plan' => 'required'
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
        try{
            DB::beginTransaction();
                $horario = HorarioReservacion::create($this->validar($request));

                $horario->load('negocio');
            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'horario' => $result ? $horario : null]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\HorarioReservacion  $horario_reservacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HorarioReservacion $horario_reservacion)
    {
        try {
            DB::beginTransaction();
            $horario_reservacion->update($this->validar($request));

            $horario_reservacion->load('negocio');
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());

        }

        return response()->json(['result' => $result, 'horario' => $result ? $horario_reservacion : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\HorarioReservacion  $horario_reservacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(HorarioReservacion $horario_reservacion)
    {
        try{
            DB::beginTransaction();

            
            $negocio = $horario_reservacion->negocio;

            $horario_reservacion->delete();

            DB::commit();

            $result = true;

            $horarios = $negocio->horarioReservacions->load('mesas');

        }catch(\Exception $e){
            DB::rollBack();
            $result =true;

        }

        return response()->json(['result' => $result, 'horarios' => $horarios]);

    }

    public function asignarHorario(Request $request){

        $datos = $request->validate([
            'dias' => 'required',
            'hora' => 'required',
            'lugares' => 'required',
            'negocio_id' => 'required',
            'lugares' => "nullable",
            'floor_plan' => 'required'
        ]);

        try {
            DB::beginTransaction();
                foreach($datos['dias'] as $dia){

                    $horario = HorarioReservacion::create([
                        'dia' => $dia,
                        'negocio_id' => $datos['negocio_id'],
                        'hora' => $datos['hora'],
                        'condicion' => 1,
                        'lugares' => !$datos['floor_plan'] ? $datos['lugares'] : 0,
                        'floor_plan' => $datos['floor_plan']
                    ]);


                }

            $negocio = Negocio::find($datos['negocio_id']);
            
            $horarios = $negocio->horarioReservacions;

            DB::commit();
            $result =true;
        } catch (\Throwable $th) {
           DB::rollBack();
           $result= false;

        //    dd($th->getMessage());
        }
        return response()->json(['result' => $result,'horarios' => $result ? $horarios : null]);
    }

}
