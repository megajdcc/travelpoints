<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};

use Illuminate\Database\Eloquent\Builder;
use App\Models\Imagen;

class DestinoController extends Controller
{

    public function fetch(Destino $destino){

        $destino->iata;
        $destino->imagenes;
        $destino->ciudad;
        $destino->estado?->pais;

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
        }

        return response()->json([
            'destinos' => $destinos,
            'total' => $pagination->total()
        ]);
    }


    private function validar(Request $request, Destino $destino = null) :array{

        return $request->validate([
            'nombre'      => 'required',
            'titulo'      => 'required',
            'descripcion' => 'required',
            'ciudad_id'   => 'nullable',
            'estado_id'   => 'nullable',
            'iata_id'     => 'required',
            'lat' => 'nullable',
            'lng' => 'nullable'
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

            $destino = Destino::create($this->validar($request));

            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->imagenes;
            
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
        try {
            DB::beginTransaction();

            $destino->update($this->validar($request,$destino));

            $destino->iata;
            $destino->ciudad;
            $destino->estado?->pais;
            $destino->imagenes;

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
        

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'destino' => $destino]);


    }


}
