<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use App\Models\{Atraccion,Destino,Imagen};
use Illuminate\Support\Facades\{DB,Storage,File};
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class EventoController extends Controller
{
    
    public function fetch(Evento $evento){

        $evento->model;
        $evento->imagenes;
        $evento->model->model_type;


        return response()->json($evento);
    }


    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Evento::where([
            ['titulo','LIKE',"%{$datos['q']}%",'OR'],
            ['contenido', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
        ->orderBy($datos['sortBy'] ?: 'id' , $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);
        

        $eventos = $paginator->items();

        foreach($eventos as $evento){

            $evento->imagenes;
            $evento->model;
            $evento->model->model_type ;

        }

        return response()->json([
            'eventos' => $eventos,
            'total' => $paginator->total()
        ]);
    }


    private function validar(Request $request,Evento $evento = null) : array{

        return $request->validate([
            'titulo' => 'required',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'required',
            'recurrente' => 'required',
            'contenido' => 'required',
            'url' => ['required',$evento ? Rule::unique('eventos','url')->ignore($evento) : 'unique:eventos,url']
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

        $model = $request->get('model');
        $datos = $this->validar($request);

        try{    
            DB::beginTransaction();

            $evento = Evento::create([...$datos,...[
                'model_type' => $model['model_type'],
                'model_id' => $model['model_id'],
                'url' => Str::slug($datos['url'])
            ]]);
            
            $evento->establecerEstaus();

            $evento->model;
            $evento->model->model_type;
            $evento->imagenes;

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }


        return response()->json(['result' => $result,'evento' => $result ? $evento : null]);
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Evento $evento)
    {
        $datos = $this->validar($request,$evento);
        $model = $request->get('model');

        try {
            DB::beginTransaction();
            $evento->update([...$datos, ...[
                'model_type' => isset($model['id']) ? $request->get('model_type') : $model['model_type'],
                'model_id'  => isset($model['id']) ? $request->get('model_id') : $model['model_id'],
                'url' => Str::slug($datos['url'])
            ]]);
            $evento->establecerEstaus();

            $evento->model;
            $evento->imagenes;
            $evento->model->model_type;



            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }


        return response()->json(['result' => $result, 'evento' => $evento]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evento $evento)
    {
        try{
            DB::beginTransaction();
            
            
            foreach($evento->imagenes as $imagen){
                Storage::disk('eventos_imagenes')->delete($imagen->imagen);
                $imagen->delete();
            }

            $evento->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function getDestinosAtraccions(){
        
        $items = collect([...Atraccion::all(),...Destino::all()]);
        $items = $items->map(fn($val) => (["model_id" => $val->id,'model_type' => $val->model_type,'nombre' => $val->nombre]));
        return response()->json($items);

    }

    public function cargarImagen(Request $request, Evento $evento)
    {

        $files = $request->file('imagen');

        try {
            DB::beginTransaction();

            foreach ($files as $file) {

                $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

                Storage::disk('eventos_imagenes')->put($file_name, File::get($file));

                $evento->addImagen([
                    'imagen' => $file_name,
                ]);
            }



            $evento->imagenes;
            $evento->model;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'evento' => $evento]);
    }



    public function eliminarImagen(Evento $evento, Imagen $imagen)
    {

        try {
            DB::beginTransaction();
            Storage::disk('eventos_imagenes')->delete($imagen->imagen);
            $imagen->delete();
            $evento->imagenes;
        
            $evento->model;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'evento' => $evento]);
    }





}
