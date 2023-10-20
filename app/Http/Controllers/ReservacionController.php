<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Notifications\nuevaReservacion;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class ReservacionController extends Controller
{

    public function fetchData(Request $request){

        $datos = $request->all();
        $rol = $request->user()->rol;
        

            $paginator = Reservacion::where([
                ['fecha','like',"%{$datos['q']}%",'OR'],
                ['personas', 'like', "%{$datos['q']}%", 'OR'],
                ['status', 'like', "%{$datos['q']}%", 'OR'],
            ])
            ->whereHas('usuario',function(Builder $q) use($datos){
                $q->orWhere([
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                     ['apellido', 'like', "%{$datos['q']}%", 'OR'],
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                    ['username', 'like', "%{$datos['q']}%", 'OR'],
                ]);
            })
            ->whereHas('negocio',function(Builder $q) use($datos){
                $q->orWhere([
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                     ['breve', 'like', "%{$datos['q']}%", 'OR'],
                    ['descripcion', 'like', "%{$datos['q']}%", 'OR'],
                    
                ]);
            })
            ->when(isset($datos['negocio_id']) , function($query) use($datos){
                 $query->where('negocio_id',$datos['negocio_id']);
            })
           ->when(in_array($rol->nombre,['Promotor','Tienda','Lider','Coordinador']),function($query) use ($request){
                $query->where('operador_id',$request->user()->id);
           })
            ->with(['usuario','operador','negocio'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);

        $reservaciones  = $paginator->items();

        foreach($reservaciones as $reserva){
            $reserva->usuario->avatar = $reserva->usuario->getAvatar();

            if($reserva->operador){
                $reserva->operador->avatar = $reserva->operador->getAvatar();
            }
           
        }

        return response()->json([
            'total' => $paginator->total(),
            'reservaciones' => $reservaciones,
        ]);

    
    }

    public function fetchDataUser(Request $request){

         $datos = $request->all();

            $paginator = Reservacion::where([
                ['fecha','like',"%{$datos['q']}%",'OR'],
                ['personas', 'like', "%{$datos['q']}%", 'OR'],
                ['status', 'like', "%{$datos['q']}%", 'OR'],
            ])
            ->whereHas('usuario',function(Builder $q) use($datos){
                $q->orWhere([
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                     ['apellido', 'like', "%{$datos['q']}%", 'OR'],
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                    ['username', 'like', "%{$datos['q']}%", 'OR'],
                ]);
            })
            ->whereHas('negocio',function(Builder $q) use($datos){
                $q->orWhere([
                     ['nombre', 'like', "%{$datos['q']}%", 'OR'],
                     ['breve', 'like', "%{$datos['q']}%", 'OR'],
                    ['descripcion', 'like', "%{$datos['q']}%", 'OR'],
                    
                ]);
            })
            ->where('usuario_id',$datos['usuario'])
            ->with(['usuario','operador','negocio'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);


        $reservaciones  = $paginator->items();


        foreach($reservaciones as $reserva){
            $reserva->usuario->avatar = $reserva->usuario->getAvatar();

            if($reserva->operador){
                $reserva->operador->avatar = $reserva->operador->getAvatar();
            }
           
        }

        return response()->json([
            'total' => $paginator->total(),
            'reservaciones' => $reservaciones,
        ]);


    }


    public function fetch(Reservacion $reservacion){

        $reservacion->load(['negocio','operador','usuario']);
        // $reservacion->usuario->avatar = $reservacion->usuario->getAvatar();
        $reservacion->usuario->cargar();

        if ($reservacion->operador) {
            $reservacion->operador->avatar = $reservacion->operador->getAvatar();
        }
        
        return response()->json($reservacion);

    }


    private function validar(Request $request, Reservacion $reservacion = null) : Collection{

        return collect($request->validate([
            'fecha'       => 'required',
            'hora'        => 'required',
            'observacion' => 'nullable',
            'personas'    => 'required|min:1',
            'status'      => 'nullable',
            'negocio_id'  => 'required',
            'usuario_id'  => 'required',
            'operador_id' => 'nullable',
            'observacion' => 'nullable'
        ],[
            'personas.min' => 'El mínimo de personas es 1'
        ]));
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
            $reservacion = Reservacion::create([...$datos->toArray(),...['status' => 1 ]]);
            DB::commit();
            $result = true;
            $reservacion->load(['negocio','usuario','operador']);
            
            // Notificar al negocio de su Reservación

            $empleados = $reservacion->negocio->empleados;
            $encargado = $reservacion->negocio->encargado;
            $users_negocio = collect([...$empleados,$encargado]);

            Notification::send($users_negocio,new nuevaReservacion($request->url(),$reservacion,1));
             
            // Notificar al usuario de su Reservación
            $reservacion->usuario->notify(new nuevaReservacion($request->url(),$reservacion,2));

            // Guardarlo como un recordatorio
            $reservacion->usuario->agregarRecordatorio($reservacion);

        } catch (\Throwable $th) {
           DB::rollBack();
         
           $result = false;

            dd($th->getMessage());

        }

        return response()->json(['result' => $result, 'reservacion' => $result ? $reservacion : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\Reservacion  $reservacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservacion $reservacion)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $reservacion->update([...$datos->except(['operador_id'])->toArray()]);

            DB::commit();
            $result = true;
            $reservacion->load(['negocio', 'usuario', 'operador']);

            // Notificar al usuario de su Reservación



        } catch (\Throwable $th) {
            DB::rollBack();

            $result = false;

            // dd($th->getMessage());
        }

        return response()->json(['result' => $result, 'reservacion' => $result ? $reservacion : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\Reservacion  $reservacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservacion $reservacion)
    {
        try {
            
            DB::beginTransaction();

            $reservacion->delete();

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }

    public function getAll(Negocio $negocio =null){

        if($negocio){
            $reservaciones = $negocio->reservaciones->load(['usuario','operador','negocio']);

        }else{
            $reservaciones = Reservacion::with(['negocio','usuario','operador'])->get();
        }


        return response()->json($reservaciones);

    }

    public function cancelar(Reservacion $reservacion){

        try {
            DB::beginTransaction();

            $reservacion->status = 3;
            $reservacion->save();

            // Informar al usuario por Notificacion...
            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
            //throw $th;
        }

        return response()->json(['result' => $result]);
    }

}
