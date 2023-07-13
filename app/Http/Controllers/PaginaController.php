<?php

namespace App\Http\Controllers;

use App\Models\Pagina;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class PaginaController extends Controller
{
    

    public function getPagina(string $param){

        
        $result = false;

        if($pagina = Pagina::where('ruta',$param)->where('activo',true)->first()){
            $result = true;
        }

        return response()->json(['result' => $result,'pagina' => $result ? $pagina : null]);
    }

    public function getAll(){
        $paginas = Pagina::where('activo', true)->with('usuario')->get();

        $paginas->each(fn($val) => $val->contenido = '');

        return response()->json($paginas);
    }

    public function fetchData(Request $request){

        $filtro = $request->all();

        $paginator = Pagina::where([
            ['contenido','LIKE',"%{$filtro['q']}%","OR"],
            ['header', 'LIKE', "%{$filtro['q']}%", "OR"],
            ['ruta', 'LIKE', "%{$filtro['q']}%", "OR"],
        ])
        ->with('usuario')
        ->orderBy($filtro['sortBy'],$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage']?:1000);


        return response()->json([
            'total' => $paginator->total(),
            'paginas' => $paginator->items(),
        ]);
        


    }

    public function fetch(Pagina $pagina){
        $pagina->usuario;
        return response()->json($pagina);
    }


    private function validar(Request $request, Pagina $pagina = null){

        return collect($request->validate([
            'nombre'        => ['required', !is_null($pagina) ? Rule::unique('paginas', 'nombre')->ignore($pagina) : 'unique:paginas,nombre'],
            'contenido'   => 'required',
            'header'      => 'nullable',
            'is_termino'  => 'required',
            'is_politica' => 'required',
            'ruta'        => ['required', !is_null($pagina) ? Rule::unique('paginas','ruta')->ignore($pagina): 'unique:paginas,ruta'],
            'usuario_id'  => 'nullable',
            'activo' => 'nullable',
            'icono' => 'nullable',
            'showHeader' => 'nullable',
            'is_contacto' => 'nullable'
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

        try {
            DB::beginTransaction();

            if($datos['is_termino']) {
                if ($pagina_with_termino = Pagina::where('is_termino', true)->first()) {
                    $pagina_with_termino->is_termino = false;
                    $pagina_with_termino->save();
                }
            }

            if($datos['is_politica']) {
                if ($pagina_with_politica = Pagina::where('is_politica', true)->first()) {
                    $pagina_with_politica->is_politica = false;
                    $pagina_with_politica->save();
                }
            }

            if ($datos['is_contacto']) {
                if ($pagina_with_contacto = Pagina::where('is_contacto', true)->first()) {
                    $pagina_with_contacto->is_contacto = false;
                    $pagina_with_contacto->save();
                }
            }

            $pagina = Pagina::create([
                ...$datos->except(['ruta','usuario_id'])->toArray(),
                ...[
                    'ruta' => Str::slug($datos['ruta']),
                    'usuario_id' => $request->user()->id
                ]
            ]);

            $pagina->usuario;

            DB::commit();
            $result = true;
            
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

        return response()->json(['result' => $result, 'pagina' => $result ? $pagina : null]);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pagina  $pagina
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pagina $pagina)
    {
        $datos = $this->validar($request,$pagina);

        try {
            DB::beginTransaction();

            if($datos['is_termino']){
                if($pagina_with_termino = Pagina::where('is_termino', true)->first()){
                    $pagina_with_termino->is_termino = false;
                    $pagina_with_termino->save();
                }
            }

            if($datos['is_politica']) {
                if ($pagina_with_politica = Pagina::where('is_politica', true)->first()) {
                    $pagina_with_politica->is_politica = false;
                    $pagina_with_politica->save();
                }
            }

            if ($datos['is_contacto']) {
                if ($pagina_with_contacto = Pagina::where('is_contacto', true)->first()) {
                    $pagina_with_contacto->is_contacto = false;
                    $pagina_with_contacto->save();
                }
            }

            $pagina->update([
                ...$datos->except(['ruta', 'usuario_id'])->toArray(),
                ...[
                    'ruta' => Str::slug($datos['ruta']),
                    'usuario_id' => $request->user()->id
                ]
            ]);
            
            $pagina->usuario;

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'pagina' => $result ? $pagina : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pagina  $pagina
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pagina $pagina)
    {
        
        try {
            DB::beginTransaction();
            $pagina->delete();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
