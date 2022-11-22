<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Usuario\Permiso;

use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\DB;

class PermisoController extends Controller
{



    public function getPermiso(Permiso $permiso){
        $permiso->usuarios;
        $permiso->roles;

        return response()->json($permiso);

    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Permiso::where([
            ['nombre','LIKE','%'.$datos['q'].'%','OR'],
        ])
        ->orderBy($datos['sortBy'], $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage']  == 0 ? 10000 : $datos['perPage']);

        
        $permisos = $paginator->items();

        foreach($permisos as $permiso){
            $permiso->roles;
            $permiso->usuarios;
        }

        return response()->json([
            'permisos' => $permisos,
            'total' => $paginator->total()
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
        $datos = $request->validate([
            'nombre' => 'required|unique:permisos,nombre',
        ],[
            'nombre.required' => 'Este campo es necesario',
            'nombre.unique' => 'Este Permiso ya está creado, no puede crear uno igual',
        ]);


        try{

            DB::beginTransaction();
                $permiso  = Permiso::create([
                'nombre' => $datos['nombre'],
                ]);
                
            DB::commit();
            $result = true;
            $message ='Se ha creado con éxito el permiso';

        }catch(\Exception $e){
              DB::rollBack();
              $message = 'No se ha podido registrar el permiso';
            $result = true;
        }

        return response()->json(['result' => $result,'permiso' => ($result) ? $permiso : null, 'message' => $message]);
   
    }



     public function getPermisos(){
        $data = [
            'permisos' => Permiso::get(),
        ];


        return response()->json($data);
    }

  
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permiso $permiso)
    {
        $datos = $request->validate([
            'nombre' => ['required',Rule::unique('permisos','nombre')->ignore($permiso)],
        ],[
            'nombre.required' => 'Este campo es necesario',
            'nombre.unique' => 'Este permiso ya está creado, no puede crear uno igual',
        ]);

        try{
                DB::beginTransaction();
                $permiso->nombre = $datos['nombre'];
                $permiso->save();
                    
                DB::commit();
                $message = 'Se ha actualizado con éxito el permiso';
                $result = true;
        }catch(\Exception $e){
                DB::rollBack();
                $message = 'No se pudo actualizar el permiso';

                $result = false;
        }

        return response()->json(['result' => $result, 'permiso' => ($result) ? $permiso : null, 'message' => $message]);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Permiso $permiso)
    {

        try {
            DB::beginTransaction();
                $permiso->delete();
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    
    }



    public function listarPermisos(Request $request){

            $datos = Permiso::get();

               return \DataTables::of($datos)
                    ->addIndexColumn()
                    ->addColumn('action',function($row){

                        $btn = '<button type="button" class="btn btn-outline-primary" title="Editar permiso" data-action="editarPermiso" data-toggle="tooltip"><i class="fas fa-edit mx-2 " data-action="editarPermiso"></i></button>';

                        $btn .= '<button type="button" class="btn btn-outline-danger eliminar-permiso" data-action="eliminarPermiso" title="Eliminar Permiso"><i class="fa fa-trash mx-2" data-action="eliminarPermiso"></i></button>';

                        return '<div class="btn-group btn-group-sm">'.$btn.'</div>';

                    })
                    ->rawColumns(['action'])
                    ->make(true);
    }


    public function getPermissions(){

        return response()->json(Permiso::get());

    }
}
