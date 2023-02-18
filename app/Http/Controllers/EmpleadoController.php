<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Empleado;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario\Permiso;

class EmpleadoController extends Controller
{



    public function getAll(){
        return response()->json(Empleado::with(['negocio', 'usuario','cargo'])->get());
    }  

    public function fetch(Empleado $empleado){

        return response()->json($empleado->load(['usuario.permisos','cargo','negocio']));
    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Empleado::whereHas('usuario',function(Builder $q) use($datos) {
            $q->where([
                ['nombre','LIKE',"%{$datos['q']}%","or"],
                ['apellido', 'LIKE', "%{$datos['q']}%", "or"],
                ['email', 'LIKE', "%{$datos['q']}%", "or"],
            ]);

        })

        ->where('negocio_id', $datos['negocio_id'])
        ->with(['negocio','usuario','cargo'])
        ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage']);

        $empleados = $paginator->items();

        foreach($empleados as $empleado){
            $empleado->usuario->rol;
            $empleado->usuario->avatar = $empleado->usuario->getAvatar();
            $empleado->usuario->permisos;
            $empleado->usuario->telefonos;
        }   

        return response()->json([
            'total' => $paginator->total(),
            'empleados' => $empleados
        ]);

    }

    private function validar(Request $request,Empleado $empleado = null){

        return $request->validate([
            'usuario_id' => 'required',
            'cargo_id' => 'required',
            'negocio_id' => 'required',
            'permisos' => 'required'
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

        try{
            DB::beginTransaction();
            
            $empleado = Empleado::create([
                'usuario_id' => $datos['usuario_id'],
                'cargo_id' => $datos['cargo_id'],
                'negocio_id' => $datos['negocio_id']    
            ]);

            foreach($datos['permisos'] as $permiso){

                $permision = Permiso::where('nombre', $permiso['module'])->first();

                $actions = [];
                if ($permiso['read']) {
                    array_push($actions, 'read');
                }

                if ($permiso['write']) {
                    array_push($actions, 'write');
                }

                if ($permiso['update']) {
                    array_push($actions, 'update');
                }

                if ($permiso['delete']) {
                    array_push($actions, 'delete');
                }   

                $empleado->usuario->addPermiso($permision,$actions);
            }


                $empleado->usuario->cargar();
                $empleado->cargo;
                $empleado->negocio;
                $usuario = $empleado->usuario;
                // $usuario->cargar();


            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());

        }

        return response()->json(['result' => $result, 'empleado' => $result ? $empleado : null,'usuario' => $result ? $usuario : null] );

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Empleado $empleado)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $empleado->update(['usuario_id' => $datos['usuario_id'],
                    'cargo_id' => $datos['cargo_id'],
                    'negocio_id' => $datos['negocio_id']
            ]);

            foreach ($datos['permisos'] as $permiso) {

                $permision = Permiso::where('nombre', $permiso['module'])->first();

                $actions = [];
                if ($permiso['read']) {
                    array_push($actions, 'read');
                }

                if ($permiso['write']) {
                    array_push($actions, 'write');
                }

                if ($permiso['update']) {
                    array_push($actions, 'update');
                }

                if ($permiso['delete']) {
                    array_push($actions, 'delete');
                }



                $empleado->usuario->addPermiso($permision, $actions);
            }


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

          
        }

        $empleado->usuario->cargar();
        $empleado->cargo;
        $empleado->negocio;
        $usuario =  $empleado->usuario;

        // $usuario->cargar();

        return response()->json(['result' => $result, 'empleado' => $result ? $empleado : null,'usuario' => $result ? $usuario : null] );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\Empleado  $empleado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Empleado $empleado)
    {
        try{
            
            DB::beginTransaction();

            $usuario = $empleado->usuario;

            $permisos = collect([]);

            foreach($empleado->cargo->permisos as $permiso){
                $permisos->push($permiso->permiso);
            }

            $usuario->quitarPermisos($permisos);
        
            $empleado->delete();
            
            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
        
    }
}
