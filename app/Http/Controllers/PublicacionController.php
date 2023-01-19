<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PublicacionController extends Controller
{
  
    public function fetchData(Request $request){
        $datos = $request->all();

        $paginator = Publicacion::where([
            ['titulo','like',"%{$datos['q']}%",'OR'],
            ['contenido', 'like', "%{$datos['q']}%", 'OR'],
        ])
        ->where('model_id', $datos['model_id'])
        ->where('model_type','App\Models\Negocio\Negocio')
        ->with(['imagenes','model'])
        ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc' :  'asc')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'publicaciones' => $paginator->items()
        ]);


    }


    public function getAll(Request $request){
        $datos = $request->all();

        $publicaciones = Publicacion::where('model_id', $datos['model_id'])
                                    ->where('model_type',$datos['model_type'])->with(['model','imagenes']);


        return response()->json($publicaciones);



    }

    public function fetch(Publicacion $publicacion){
        
        $publicacion->load(['model','imagenes']);

        return response()->json($publicacion);

    }


    private function validar(Request $request) : array{
        return $request->validate([
            'titulo' => 'required',
            'contenido' => 'required',
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
        try{
            DB::beginTransaction();

            $publicacion = Publicacion::create($this->validar($request));

            $publicacion->model;
            $publicacion->imagenes;

            DB::commit();

            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
            dd($e->getMessage());

        }


        return response()->json(['result' => $result,'publicacion' => $result ? $publicacion : null]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Publicacion $publicacion)
    {
        try {

            DB::beginTransaction();

            $publicacion->update($this->validar($request));

            $publicacion->model;
            $publicacion->imagenes;

            DB::commit();
            $result = true;

        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'publicacion' => $result ? $publicacion : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Publicacion  $publicacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Publicacion $publicacion)
    {
        try{
            DB::beginTransaction();
                $publicacion->delete();
            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function addImagen(Request $request, Publicacion $publicacion)
    {

        try {
            DB::beginTransaction();

            foreach ($request->file('imagenes') as $imagen) {

                $imagen_name = \sha1($imagen->getClientOriginalName()) . '.' . $imagen->getClientOriginalExtension();
                Storage::disk('imagenes_publicaciones')->put($imagen_name, File::get($imagen));

                $publicacion->addImagen([
                    'imagen' => $imagen_name,
                    'portada' => false,
                    'logo' => false
                ]);
            }


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        $publicacion->load(['imagenes','model']);

        return response()->json(['result' => $result, 'publicacion' => $publicacion]);
    }

    public function eliminarImagen(Imagen $imagen)
    {

        $publicacion = $imagen->model;

        try {
            DB::beginTransaction();

            $result = Storage::disk('imagenes_publicaciones')->delete($imagen->imagen);

            if ($result) {
                $imagen->delete();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }

        $publicacion->load(['imagenes','model']);

        return response()->json(['result' => $result, 'publicacion' => $publicacion]);
    }

}
