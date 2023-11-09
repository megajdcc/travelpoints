<?php

namespace App\Http\Controllers;

use App\Models\GrupoNivel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class GrupoNivelController extends Controller
{
    
    public function getAll(){

        $grupos = GrupoNivel::with('nivels')->get();

        return response()->json($grupos);
        
    }

    public function fetch(GrupoNivel $grupo_nivel){

        $grupo_nivel->nivels;
        return response()->json($grupo_nivel);
    }

    public function fetchData(Request $request){

        $filtro = $request->all();
        $paginator = GrupoNivel::where([
            ['nombre','LIKE',"%{$filtro['q']}%",'OR'],
            ['color', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])
        ->with('nivels')
        ->orderBy($filtro['sortBy'] ?? 'nombre',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage']);


        return response()->json([
            'total' => $paginator->total(),
            'grupos' => $paginator->items(),
        ]);
    }


    private function validar(Request $request, GrupoNivel $grupo_nivel = null){

        return $request->validate([
                'nombre' =>  ['required', $grupo_nivel ? Rule::unique('grupo_nivels', 'nombre',)->ignore($grupo_nivel) : 'unique:grupo_nivels,nombre'],
                'color' => ['required', $grupo_nivel ? Rule::unique('grupo_nivels', 'color',)->ignore($grupo_nivel) : 'unique:grupo_nivels,color'],
        ],[
            'nombre.required' => 'El nombre del grupo de nivel es importante',
            'nombre.unique' => 'El nombre de grupo de nivel ya está creado, inténte con otro',
            'color.required' => 'El color es importante, no debe faltar',
            'color.unique' => 'EL color ya existe, inténte con otro'
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

            $grupo = GrupoNivel::create($datos);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollback();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'grupo' => $result ? $grupo : null
        ]);
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GrupoNivel $grupo_nivel)
    {
        $datos = $this->validar($request,$grupo_nivel);

        try {
            DB::beginTransaction();

            $grupo_nivel->update($datos);

            DB::commit();
            $grupo_nivel->nivels;
            $result = true;
        } catch (\Throwable $th) {
            DB::rollback();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'grupo' => $result ? $grupo_nivel : null
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GrupoNivel $grupo_nivel)
    {
        try {

            DB::beginTransaction();
            $grupo_nivel->delete();
            DB::commit();
            $result = true;

        }catch (\Throwable $th) {
            DB::rollback();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
