<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Usuario\Permiso;
<<<<<<< HEAD

=======
use Illuminate\Database\Eloquent\Builder;
>>>>>>> vite
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
<<<<<<< HEAD
=======
        ->whereHas('panel',function(Builder $q) use($datos){
            $q->orWhere('panel','LIKE',"%{$datos['q']}%");
        })
        ->with(['roles','usuarios','panel'])
>>>>>>> vite
        ->orderBy($datos['sortBy'], $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage']  == 0 ? 10000 : $datos['perPage']);

        
<<<<<<< HEAD
        $permisos = $paginator->items();

        foreach($permisos as $permiso){
            $permiso->roles;
            $permiso->usuarios;
        }

        return response()->json([
            'permisos' => $permisos,
=======
        return response()->json([
            'permisos' => $paginator->items(),
>>>>>>> vite
            'total' => $paginator->total()
        ]);

    }


<<<<<<< HEAD

=======
    private function  validar(Request $request, Permiso $permiso = null): array{

        return $request->validate([
            'nombre' => ['required',!is_null($permiso) ? Rule::unique('permisos','nombre')->ignore($permiso->id) : 'unique:permisos,nombre'],
            'panel_id' => 'required'
        ],[
            'nombre.unique' => 'El nombre del permiso ya está registrado, inténte con otro'
        ]);

    } 
>>>>>>> vite
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
<<<<<<< HEAD
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
=======

        try{
            DB::beginTransaction();
                $permiso  = Permiso::create($this->validar($request));
>>>>>>> vite
                
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
<<<<<<< HEAD
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
                    
=======

        try{
                DB::beginTransaction();
                $permiso->update($this->validar($request,$permiso));

>>>>>>> vite
                DB::commit();
                $message = 'Se ha actualizado con éxito el permiso';
                $result = true;
        }catch(\Exception $e){
                DB::rollBack();
                $message = 'No se pudo actualizar el permiso';

                $result = false;
<<<<<<< HEAD
=======

                dd($e->getMessage());

>>>>>>> vite
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



<<<<<<< HEAD
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
=======
>>>>>>> vite


    public function getPermissions(){

        return response()->json(Permiso::get());

    }
}
