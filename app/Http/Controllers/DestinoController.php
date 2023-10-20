<?php

namespace App\Http\Controllers;

use App\Jobs\ModelTraslate;
use App\Models\Destino;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};

use Illuminate\Database\Eloquent\Builder;
use App\Models\Imagen;
use App\Models\Pais;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class DestinoController extends Controller
{


    public function getAll(){

        $destinos = Destino::where('activo',true)->limit(10)->get();

        $destinos->each(fn($destino)=> $destino->cargar());


        return response()->json($destinos);

    }



    public function fetchAll(Request $request){
        $destinos = Destino::where('activo',true)->get();

        $destinos->each(function($destino){
            $destino->imagenes;
            $destino->modelType = $destino->model_type;
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->about_travel = null;
        });

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
        ->paginate($datos['perPage'] ?: 4);

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
        $searchs = collect(['nombre','titulo','descripcion']);

        $pagination = Destino::where(fn($q) => $searchs->map(fn($s) => $q->where($s,'LIKE',"%{$datos['q']}%","OR")))
        ->whereHas('iata' , fn(Builder $q) => $q->orWhere([['codigo','LIKE',"%{$datos['q']}%", 'OR'],['aeropuerto','LIKE',"%{$datos['q']}%",'OR']]))
        ->orderBY($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->select(['nombre','titulo','descripcion','activo','id'])
        ->with('imagenes')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'destinos' => $pagination->items(),
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
            ModelTraslate::dispatch($destino, ['nombre', 'titulo','descripcion']);


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
            ModelTraslate::dispatch($destino,['nombre','titulo','descripcion']);

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
            $destino->quitarTraduccion(['nombre','titulo','descripcion']);
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


    public function fetchDataDestinoReport(Request $request){
        
        $filtro  = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));
        $pagination = Destino::when(isset($filtro['pais']) && !empty($filtro['pais']), function($query){
                    $query->select(['nombre','created_at','id']);
                })->when(!isset($filtro['pais']) || empty($filtro['pais']),function($q){
                    $q->selectRaw('count(*) as destinos');
                })
            ->addSelect([
                'pais' => Pais::select('pais')->whereHas('estados', fn ($q) => $q->whereColumn('id', 'destinos.estado_id'))
            ])
            ->where([
                ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
                ['titulo', 'LIKE', "%{$filtro['q']}%", 'OR'],
                ['about_travel', 'LIKE', "%{$filtro['q']}%", 'OR'],

            ])
            // ->whereHas('estado.pais', fn ($q) => $q->where([
            //     ['pais', 'LIKE', "%{$filtro['q']}%", 'OR']
            // ]))
            ->where('activo', true)
            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function(Builder $q) use($mes){
                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
            })
             ->when(isset($filtro['pais']) && !empty($filtro['pais']),fn($q) => $q->whereHas('estado.pais',fn($qu) => $qu->where('pais',$filtro['pais'])))
            ->when(!isset($filtro['pais']) || empty($filtro['pais']),fn($q) => $q->groupBy('pais'))
            ->orderBy($filtro['sortBy'],$filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?? 1000);
        
        $totalPaises = (collect($pagination->items()))->groupBy('pais')->count();
        

      
        return response()->json([
            'total' => $pagination->total(),
            'destinos' => $pagination->items(),
            'totalPaises' => $totalPaises
        ]);
        
    }

    public function descargarFetchDataDestinoReport(Request $request){

        $filtro  = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        $pagination = Destino::when(isset($filtro['pais']) && !empty($filtro['pais']), function ($query) {
                            $query->select(['nombre', 'created_at', 'id']);
                        })->when(!isset($filtro['pais']) || empty($filtro['pais']), function ($q) {
                            $q->selectRaw('count(*) as destinos');
                        })
                    ->addSelect([
                        'pais' => Pais::select('pais')->whereHas('estados', fn ($q) => $q->whereColumn('id', 'destinos.estado_id'))
                    ])
                    ->where([
                        ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
                        ['titulo', 'LIKE', "%{$filtro['q']}%", 'OR'],
                        ['about_travel', 'LIKE', "%{$filtro['q']}%", 'OR'],
                    ])
            // ->whereHas('estado.pais', fn ($q) => $q->where([
            //     ['pais', 'LIKE', "%{$filtro['q']}%", 'OR']
            // ]))
            ->where('activo', true)
            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function (Builder $q) use ($mes) {
                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
            })
            ->when(isset($filtro['pais']) && !empty($filtro['pais']), fn ($q) => $q->whereHas('estado.pais', fn ($qu) => $qu->where('pais', $filtro['pais'])))
            ->when(!isset($filtro['pais']) || empty($filtro['pais']), fn ($q) => $q->groupBy('pais'))

            ->orderBy($filtro['sortBy'], $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?? 1000);

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));

        $datos = [
            'filtro' => $filtro,
            'destinos' => $pagination->items(),
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
        ];


        $pdf = Pdf::loadView('reports.territorios.destinos', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Destinos.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);
    }



}
