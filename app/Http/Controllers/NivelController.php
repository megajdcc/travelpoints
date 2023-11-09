<?php

namespace App\Http\Controllers;

use App\Jobs\ModelTraslate;
use App\Jobs\VerificarNivelViajero;
use App\Models\GrupoNivel;
use App\Models\Nivel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class NivelController extends Controller
{

    public function fetch(Nivel $nivel){
        
        $nivel->cargar();
        return response()->json($nivel);

    }


    public function fetchData(Request $request){

        $filtro  = $request->all();

        $paginator = Nivel::where([
            ['nombre','LIKE',"%{$filtro['q']}%","OR"],
            ['descripcion', 'LIKE', "%{$filtro['q']}%", "OR"]
        ])

        ->orderBy($filtro['sortBy'] ?? 'nombre', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage']);

        $niveles = collect($paginator->items())->each(fn($nivel) => $nivel->cargar());
        
        return response()->json([   
            'total' => $paginator->total(),
            'niveles' => $niveles
        ]);

    }


    public function validar(Request $request,Nivel $nivel = null){

        return $request->validate([
            'nombre' => ['required'], 
            'descripcion'           => ['nullable'],
            'baja_nivel'            => 'required',
            'condicion_bajar_nivel' => 'nullable',
            'activacion'            => 'nullable',
            'grupo_id'              => 'required',
            'nivel_inicial' =>  'required',
            'nivel_anterior_id' => [Rule::requiredIf(!$request->input('nivel_inicial',false))]
        ],[
            'insignia.required_with' => 'La insignia no debe faltar',
            'nivel_anterior_id.required_if' => 'El nivel anterior es importante no debe faltar.'
        ]);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            if($datos['nivel_inicial']){
              if($nivel_inicial = Nivel::whereHas('grupo', fn (Builder $q)  => $q->where('id', $datos['grupo_id']))->where('nivel_inicial', true)->first()){
                    $nivel_inicial->update(['nivel_inicial',false]);
                }
            }

            if(isset($datos['nivel_anterior_id'])){
                
                if($nivel_anterior = Nivel::find($datos['nivel_anterior_id'])){
                    if($nivel_siguiente = $nivel_anterior->nivelSiguiente){
                        $nivel_siguiente->update(['nivel_anterior_id',null]);
                    }
                }
            }


            $nivel = Nivel::create($datos);
            ModelTraslate::dispatch($nivel, ['nombre', 'descripcion']);


            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result, 'nivel' => $result ? $nivel : null]);

    }

 

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nivel $nivel)
    {
        $datos = collect($this->validar($request));
        try {
            DB::beginTransaction();

            if ($datos['nivel_inicial']) {
                if($nivel_inicial = Nivel::whereHas('grupo', fn (Builder $q)  => $q->where('id', $datos['grupo_id']))->where('nivel_inicial', true)->first()) {
                    $nivel_inicial->update(['nivel_inicial', false]);
                }
            }

            if (isset($datos['nivel_anterior_id'])) {

                if ($nivel_anterior = Nivel::find($datos['nivel_anterior_id'])) {
                    if ($nivel_siguiente = $nivel_anterior->nivelSiguiente) {
                        $nivel_siguiente->update(['nivel_anterior_id', null]);
                    }
                }
            }
            

            $nivel->update($datos->toArray());
            ModelTraslate::dispatch($nivel, ['nombre', 'descripcion']);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

        }

        $nivel->cargar();

        return response()->json(['result' => $result, 'nivel' => $result ? $nivel : null]);
    }


    public function guardarInsignia(Request $request, Nivel $nivel){

        try {
            DB::beginTransaction();

            $insignia_name = null;


            if ($request->hasFile('insignia')) {

                if ($nivel->insignia) {
                    Storage::disk('insignias')->delete($nivel->insignia);
                }

                $insignia = $request->file('insignia');
                $insignia_name = \sha1($insignia->getClientOriginalName()) . '.' . $insignia->getClientOriginalExtension();

                $result = Storage::disk('insignias')->put($insignia_name, File::get($insignia));
               

                $nivel->update([
                    'insignia' => $insignia_name
                ]);


            }

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
            dd($th->getMessage());
        }

        $nivel->cargar();

        return response()->json([
            'result' => $result,
            'nivel' => $nivel
        ]);
    }


    /**
    * Remove the specified resource from storage.
     */
    public function destroy(Nivel $nivel)
    {
        try{
            DB::beginTransaction();
            
            if($nivel->insignia){
                Storage::disk('insignias')->delete($nivel->insignia);
            }

            $result = $nivel->delete();
            DB::commit();
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }

    public function getAllGrupo(GrupoNivel $grupo){

        $nivels = [];
        foreach($grupo->nivels as $nivel){
            array_push($nivels,['nombre' => $nivel->nombre,'id' => $nivel->id, 'is_selected' => is_null($nivel->nivel_siguiente)]);
        }
   
        return response()->json($nivels);
    }

    public function verificarNivelViajeros(){

        try {

            VerificarNivelViajero::dispatch();
            $result = true;
        } catch (\Throwable $th) {
            $result = false;
        }
        
        return response()->json(['result' => $result]);

    }
}
