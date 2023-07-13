<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};

use Illuminate\Database\Eloquent\Builder;
use App\Models\Imagen;
use Illuminate\Support\Collection;

class DestinoController extends Controller
{


    public function getAll(){

        $destinos = Destino::where('activo',true)->limit(10)->get();

        $destinos->each(fn($destino)=> $destino->cargar());

        // foreach($destinos as $destino){
        //     $destino->iata;
        //     $destino->imagenes;
        //     $destino->ciudad;
        //     $destino->estado?->pais;
        //     $destino->likes;
        //     $destino->modelType = $destino->model_type;
        //     $destino->ruta = "/Destinos?q={$destino->nombre}";
        //     $destino->negocios = $destino->negocios();
            
        // }

        return response()->json($destinos);

    }


    public function fetchDataPublic(Request $request){
        $datos = $request->all();

        $pagination = Destino::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
        ->where('activo',true)
        ->whereHas('iata', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['codigo', 'LIKE', "%{$datos['q']}%", 'OR'], ['aeropuerto', 'LIKE', "%{$datos['q']}%", 'OR'],
            ]);
        })
        ->orderBY($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate(4);

        $destinos = collect($pagination->items())->each(function($destino){
            // $destino->cargar();
            $destino->imagenes;
            $destino->iata;
            $destino->iata->pais = $destino->pais();
            $destino->ciudad;
            $destino->estado;
            $destino->likes;
            $destino->estado?->pais;
            $destino->modelType = $destino->model_type;
            $destino->likes;
            $destino->ruta = "/Destinos?q={$destino->nombre}";

            $destino->about_travel = '';
        });

        
        return response()->json([
            'destinos' => $destinos,
            'total' => $pagination->total()
        ]);
    }

    public function fetch(Destino $destino){

        $destino->cargar();
        
        return response()->json($destino);
        
    }

    public function fetchData(Request $request)
    {   
        $datos = $request->all();

        $pagination = Destino::where([
            ['nombre','LIKE',"%{$datos['q']}%",'OR'],
            ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
        ->whereHas('iata' , function(Builder $q) use ($datos) {
                    $q->orWhere([
                        ['codigo','LIKE',"%{$datos['q']}%",'OR'],['aeropuerto', 'LIKE', "%{$datos['q']}%", 'OR'],
                    ]);
        })
        ->orderBY($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);

        $destinos= $pagination->items();
        
        foreach ($destinos as $key => $destino) {
            $destino->iata;
            $destino->imagenes;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->likes;

        }

        return response()->json([
            'destinos' => $destinos,
            'total' => $pagination->total()
        ]);
    }


    private function validar(Request $request, Destino $destino = null) : Collection {

        return collect($request->validate([
            'nombre'      => 'required',
            'titulo'      => 'required',
            'descripcion' => 'required',
            'ciudad_id'   => 'nullable',
            'estado_id'   => 'nullable',
            'iata_id'     => 'required',
            'lat' => 'nullable',
            'lng' => 'nullable',
            'imagenes' => 'nullable',
            'about_travel' => 'nullable'
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


        try{
            DB::beginTransaction();

            $destino = Destino::create($datos->except(['imagenes'])->toArray());


            if (isset($datos['imagenes']) && count($datos['imagenes']) > 0) {
                foreach ($datos['imagenes'] as $imagen) {

                    $img = Imagen::find($imagen);

                    Storage::copy("/public/multimedias/{$img->imagen}", "/public/destinos/imagenes/{$img->imagen}");

                    $destino->addImagen([
                        'imagen' => $img->imagen,
                    ]);
                }
            }

            $destino->refresh();
            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->imagenes;
            $destino->likes;
            
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'destino' => $result ? $destino : null]);

    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Destino  $destino
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Destino $destino)
    {
        $datos = $this->validar($request,$destino);

        try {
            DB::beginTransaction();

            $destino->update($datos->except(['imagenes'])->toArray());

            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->imagenes;
            $destino->likes;


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'destino' => $destino]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Destino  $destino
     * @return \Illuminate\Http\Response
     */
    public function destroy(Destino $destino)
    {
        try{
            DB::beginTransaction();
            $destino->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function cargarImagen(Request $request,Destino $destino){

        $files = $request->file('imagen');

        try{
            DB::beginTransaction();

            foreach($files as $file){
                
                $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

                Storage::disk('destino_imagenes')->put($file_name, File::get($file));

                $destino->addImagen([
                    'imagen' => $file_name,
                ]);

            }

                
           
            $destino->imagenes;
            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->likes;

            DB::commit();
            $result = true;
        }catch(\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result,'destino' => $destino]);

    }

    public function eliminarImagen(Destino $destino, Imagen $imagen){
        
        try{
            DB::beginTransaction();

            $imagen->delete();

            $destino->imagenes;
            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->likes;
            

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'destino' => $destino]);


    }



    public function getPorNombre(Request $request){

        $destino = Destino::where('nombre',$request->get('nombre'))->where('activo',true)->first();
        
        if($destino){
            $destino->iata;
            $destino->imagenes;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->likes;
            $destino->modelType = $destino->model_type;

            $destino->negocios = $destino->negocios();


            foreach ($destino->atracciones as $atraccion) {
                $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
                $atraccion->opinions;
                $atraccion->telefono;
                $atraccion->imagenes;
                $atraccion->destino;
                $atraccion->horarios;
                $atraccion->likes;
                $atraccion->modelType = $atraccion->model_type;
            }

        }
        
        return response()->json(['result' => $destino ? true : false,'destino' => $destino]);
    }

    public function toggleActive(Request $request, Destino $destino){

        $datos = $request->all();

        try {
            DB::beginTransaction();

            $destino->update($datos);

            $destino->cargar();

            DB::commit();
            $result =true;
            
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'destino' => $destino]);

    }



}
