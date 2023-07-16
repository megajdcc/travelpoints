<?php

namespace App\Http\Controllers;

use App\Models\Atraccion;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB, Storage, File};
use Illuminate\Database\Eloquent\Builder;
use App\Models\Imagen;
use Illuminate\Support\Collection;

class AtraccionController extends Controller
{

    public function getAll(){
        
        $atracciones = Atraccion::get();

        foreach($atracciones as $atraccion){
            $atraccion->telefono;
            $atraccion->imagenes;
            // $atraccion->destino;
            // $atraccion->destino->estado?->pais;
            // $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;

        }

        return response()->json($atracciones);


    }
    public function fetch(Atraccion $atraccion)
    {

         $atraccion->telefono;
        $atraccion->imagenes;
        $atraccion->destino;
        $atraccion->destino->estado?->pais;
        $atraccion->destino->ciudad;
        $atraccion->horarios;
        $atraccion->likes;
        $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
        $atraccion->modelType = $atraccion->model_type;
        $atraccion->opinions;

        return response()->json($atraccion);
    }

    public function fetchData(Request $request)
    {
        $datos = $request->all();

        $pagination = Atraccion::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['duracion_sugerida', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['sitio_web', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['incluye', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],

        ])
            ->whereHas('destino', function (Builder $q) use ($datos) {
                $q->orWhere([
                    ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'], 
                    ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
                ]);
            })
            ->where('destino_id',$datos['destino_id'])
            ->orderBY($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);

        $atracciones = $pagination->items();

        foreach ($atracciones as $key => $atraccion) {
            

            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;


        }

        return response()->json([
            'atracciones' => $atracciones,
            'total' => $pagination->total()
        ]);
    }


    private function validar(Request $request, Atraccion $atraccion = null): Collection
    {

        return collect($request->validate([
            'nombre'            => 'required',
            'duracion_sugerida' => 'nullable',
            'sitio_web'         => 'nullable',
            'email'             => 'nullable',
            'destino_id'        => 'required',
            'lat'               => 'nullable',
            'lng'               => 'nullable',
            'incluye'           => 'nullable',
            'descripcion' => 'nullable',
            'imagenes' => 'nullable'
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
        $telefono = $request->get('telefono');
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $atraccion = Atraccion::create($datos->except(['imagenes'])->toArray());
            
            if($telefono['telefono']){
                $atraccion->addTelefono($telefono);
            }

            if (isset($datos['imagenes']) && count($datos['imagenes']) > 0) {
                foreach ($datos['imagenes'] as $imagen) {

                    $img = Imagen::find($imagen);

                    Storage::copy("/public/multimedias/{$img->imagen}", "/public/atracciones/imagenes/{$img->imagen}");

                    $atraccion->addImagen([
                        'imagen' => $img->imagen,
                    ]);
                }
            }

           

            $atraccion->refresh();

            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());

        }

        return response()->json(['result' => $result, 'atraccion' => $result ? $atraccion : null]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Atraccion  $atraccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Atraccion $atraccion)
    {   

        $telefono = $request->get('telefono');
        $datos = $this->validar($request,$atraccion);

        try {
            DB::beginTransaction();

            $atraccion->update($datos->except(['imagenes'])->toArray());
            
            if ($telefono['telefono'] ) {

                if($atraccion->telefono){
                    $atraccion->telefono->delete();
                }

                $atraccion->addTelefono($telefono);
            }



            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;



            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'atraccion' => $atraccion]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Atraccion  $atraccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Atraccion $atraccion)
    {
        try {
            DB::beginTransaction();

            foreach($atraccion->imagenes as $imagen){
                Storage::disk('atracciones_imagenes')->delete($imagen->imagen);

                $imagen->delete();
            }

            $atraccion->delete();
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function cargarImagen(Request $request, Atraccion $atraccion)
    {

        $files = $request->file('imagen');

        try {
            DB::beginTransaction();

            foreach ($files as $file) {

                $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

                Storage::disk('atracciones_imagenes')->put($file_name, File::get($file));

                $atraccion->addImagen([
                    'imagen' => $file_name,
                ]);
            }


            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

           
        }

        return response()->json(['result' => $result, 'atraccion' => $atraccion]);
    }

    public function eliminarImagen(Atraccion $atraccion, Imagen $imagen)
    {

        try {
            DB::beginTransaction();
            Storage::disk('atracciones_imagenes')->delete($imagen->imagen);
            $imagen->delete();



             $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;



            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'atraccion' => $atraccion]);
    }

    public function aperturarHorario(Atraccion $atraccion){
        
        try{
            DB::beginTransaction();
            
            $atraccion->aperturarHorario();

            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;


            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result =false;
            dd($e->getMessage());
        }

        return response()->json(['result' => $result,'atraccion' => $atraccion]);

    }

    public function guardarHorario(Request $request,Atraccion $atraccion){

        try{
            DB::beginTransaction();
            
            $atraccion->actualizarHorario($request->all());

            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;


            DB::commit();
            $result = true;
        
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'atraccion' => $atraccion]);

    }


    public function quitarHorario(Atraccion $atraccion){
        
        try{
            
            DB::beginTransaction();
            
            $atraccion->quitarHorario();
            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->opinions;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            
            DB::rollBack();
            $result = false;

            dd($e->getMessage());

        }

        return response()->json(['result' => $result,'atraccion' => $atraccion]);

    }


    public function getPorNombre(Request $request){
        $datos = $request->all();


        $atraccion = Atraccion::where('nombre',$datos['nombre'])->first();

        $atraccion->telefono;
        $atraccion->imagenes;
        $atraccion->destino;
        $atraccion->destino->estado?->pais;
        $atraccion->destino->ciudad;
        $atraccion->horarios;
        $atraccion->likes;
        $atraccion->opinions;

        $atraccion->modelType = $atraccion->model_type;
    
        return response()->json(['result' => $atraccion ? true : false, 'atraccion' => $atraccion]);


    }


    public function otrasCercanas(Atraccion $atraccion){
  
        $atracciones = Atraccion::getLocation(['lat' => $atraccion->lat,'lng' => $atraccion->lng,'km' => 50]);

        $atracciones  = $atracciones->filter(fn ($val) => $val->id != $atraccion->id)->all();
        return response()->json([...$atracciones]);
    }

}
