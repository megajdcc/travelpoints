<?php

namespace App\Http\Controllers;

use App\Models\Opinion;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\{DB};

class OpinionController extends Controller
{   


    public function fetchData(Request $request){


        $datos = $request->all();

        $paginator = Opinion::where([
            ['titulo','LIKE',"%{$datos['q']}%",'OR'],
            ['opinion','LIKE',"%{$datos['q']}%",'OR'],
        ])
        ->whereHas('usuario',function(Builder $q) use($datos){

            $q->orWhere([
                ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['email', 'LIKE', "%{$datos['q']}%", 'OR']
            ]);
        })
        ->orderBy('id','desc')
        ->paginate($datos['perPage'] ?: 10000);

        $opinions = $paginator->items();

        foreach($opinions as $opinion){
            $opinion->model;
            $opinion->usuario;
            $opinion->imagenes;
            
        }


        return response()->json([
            'total' => $paginator->total(),
            'opinions' => $opinions
        ]);

    }


    public function fetchDataModel(Request $request){

        $datos = $request->all();

        if($datos['model_type'] == "App\Models\Negocio\Negocio"){
            $paginator = Opinion::where('model_id', $datos['model_id'])
            ->where('model_type', $datos['model_type'])
            ->where([
                ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['opinion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
            ->whereHas('usuario', function (Builder $q) use ($datos) {

                $q->orWhere([
                    ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
                    ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
                    ['email', 'LIKE', "%{$datos['q']}%", 'OR']
                ]);
            })
                ->orderBy('id', 'desc')
                ->paginate($datos['perPage'] ?: 10000);
        }else{
            $paginator = Opinion::where('model_id', $datos['model_id'])
            ->where('model_type', $datos['model_type'])
            ->where([
                ['titulo', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['opinion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
            ->whereHas('usuario', function (Builder $q) use ($datos) {

                $q->orWhere([
                    ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
                    ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
                    ['email', 'LIKE', "%{$datos['q']}%", 'OR']
                ]);
            })
                ->orderBy('id', 'desc')
                ->paginate($datos['perPage'] ?: 10000);
        }

        
      
      

        $opinions = $paginator->items();

        foreach ($opinions as $opinion) {
            $opinion->model;
            $opinion->usuario->avatar = $opinion->usuario?->getAvatar();
            
            
            $opinion->imagenes;
        
        }

        return response()->json([
            'total' => $paginator->total(),
            'opinions' => $opinions
        ]);
      
    }

    private function validar(Request $request){

        return $request->validate([
            'calificacion'  => 'required',
            'opinion'       => 'required',
            'titulo'        => 'required',
            'asistencia'    => 'nullable',
            'acompanante'   => 'required',
            'certificacion' => 'required',
            'model_id' => 'required',
            'model_type' => 'required',
            // 'preguntas' => 'nullable',
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
            $opinion = Opinion::create([...$datos,...['usuario_id' => $request->user()->id,'preguntas' => null ]]);
            
            if($datos['model_type'] === 'App\Models\Venta'){
                if($opinion->model->model_type == "App\Models\Negocio\Negocio"){
                    Opinion::create([...$datos,...[
                        'usuario_id' => $request->user()->id, 
                        'preguntas' => null ,
                        'model_id' => $opinion->model->model_id,
                        'model_type' => $opinion->model->model_type
                    ]]);
                }

            }
          
            $opinion->imagenes;
            $opinion->usuario;
            $opinion->model;

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
            dd($e);
        }

        return response()->json(['result' => $result,'opinion' => $result ? $opinion : null]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Opinion  $opinion
     * @return \Illuminate\Http\Response
     */
    public function show(Opinion $opinion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Opinion  $opinion
     * @return \Illuminate\Http\Response
     */
    public function edit(Opinion $opinion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Opinion  $opinion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Opinion $opinion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Opinion  $opinion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Opinion $opinion)
    {
        //
    }
}
