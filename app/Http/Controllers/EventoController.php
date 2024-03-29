<?php

namespace App\Http\Controllers;

use App\Jobs\ModelTraslate;
use App\Models\Evento;
use Illuminate\Http\Request;
use App\Models\{Atraccion,Destino,Imagen};
use Illuminate\Database\Eloquent\Builder;
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

    public function fetchEventos(Request $request){

        $datos = $request->all();

        $eventos = Evento::when(isset($datos['model_type']), function($query) use($datos) {
                $query->where('model_id', $datos['model_id'])->where('model_type', $datos['model_type']);
        })
        ->when(count($datos['filterOption']) > 0 , function($query) use($datos){
            $query->whereIn('model_type',$datos['filterOption']);
        })
        ->when(isset($datos['negocio']),function($query) use($datos){
            $query->where('model_id',$datos['negocio'])->where('model_type',"App\Models\Negocio\Negocio");
        })
                ->where('status',isset($datos['perfil']) && $datos['perfil'] == true ? 1 :  '>', 0)
                ->with(['imagenes'])
                ->orderBy('fecha_inicio','asc')
                ->get()
                ->each(fn($event) => $event->cargar());

            
        return response()->json($eventos);

    }

    public function fetchData(Request $request){

        $datos = $request->all();


        // dd($datos);

        if(isset($datos['model_type'])){
            $paginator = Evento::where([
                ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['contenido', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
                ->where('model_id', $datos['model_id'])
                ->where('model_type', $datos['model_type'])
                ->when($datos['perfil'], function($q){
                    $q->where('status',true);
                })
                ->with(['imagenes', 'model'])
                ->orderBy($datos['sortBy']  ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($datos['perPage'] ?: 10000);
        }else{
            $paginator = Evento::where([
                ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['contenido', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
            ->when($datos['perfil'], function ($q) {
                $q->where('status', true);
            })
            ->with(['imagenes', 'model'])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);
        }
        
    
        

        return response()->json([
            'eventos' => $paginator->items(),
            'total' => $paginator->total()
        ]);
    }


    private function validar(Request $request,Evento $evento = null) : array{

        return $request->validate([
            'titulo' => 'required',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'nullable',
            'recurrente' => 'required',
            'recurrencia' => 'nullable',
            'all_dia' => 'nullable',
            'tipo_recurrencia' => 'nullable',
            'contenido' => 'required',
            'model_type' => 'nullable',
            'model_id' => 'nullable',
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
                'model_type' => isset($datos['model_type']) ? $datos['model_type'] : $model['model_type'],
                'model_id' => isset($datos['model_id']) ? $datos['model_id'] : $model['model_id'],
                'url' => Str::slug($datos['url'])
            ]]);

            ModelTraslate::dispatch($evento,['titulo','contenido']);
            
            // $evento->establecerEstaus();

            $evento->load(['imagenes','model']);

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            // dd($e->getMessage());
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
            ModelTraslate::dispatch($evento, ['titulo', 'contenido']);

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
            $evento->quitarTraduccion(['titulo','contenido']);
            
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


    public function fetchDataPublic(Request $request){

        $filtro = $request->all();
        $destino = $request->get('destino');

        $paginator = Evento::where([
            ['titulo','LIKE',"%{$filtro['q']}%",'OR'],
            ['contenido', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_inicio', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_fin', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['url', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])->whereIn('status',[1,3])
    
        ->orderBy('fecha_inicio','asc')
        ->paginate($filtro['perPage']?: 1000);

          

        $eventos = collect($paginator->items())->each(fn($event) => $event->cargar())
        ->filter(function($event) use($destino){
                switch ($event->model->model_type) {
                    case "App\\Models\\Destino":
                        return $event->model->id == $destino ;
                        break;

                    case "App\\Models\\Atraccion":
                        return $event->model->destino_id == $destino;
                        break;

                    case "App\\Models\\Negocio\\Negocio":
                        return $event->model->iata->id == (Destino::find($destino))?->iata->id && $event->model->publicado;
                        break;
                    
                    default:
                        return false;
                        break;
                }



        });
        

        return response()->json(['total' => $paginator->total(),'eventos' => $eventos]);


    }

    public function fetchDataUrl(string $url){

        $result = false;
        if( $evento = Evento::where('url', $url)->first()){
            $evento->cargar();
            $result = true;
        }
        return response()->json(['result' => $result,'evento' =>  $result ? $evento : null]);
    }





}
