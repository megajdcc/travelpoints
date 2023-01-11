<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Cargo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CargoController extends Controller
{
  
    public function getAll(){

        return response()->json(Cargo::with(['negocio','permisos'])->get());

    
    }   

    public function fetch(Cargo $cargo){
        
        $cargo->negocio;
        $cargo->permisos;

        return response()->json($cargo);

        
    }


    public function fetchData(Request $request){
        
        $datos = $request->all();

        $paginator = Cargo::where([
            ['cargo','LIKE',"%{$datos['q']}%","OR"]
        ])->where('negocio_id',$datos['negocio_id'])
        ->with(['negocio','permisos'])
        ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'cargos' => $paginator->items(),
        ]);
   
    }


    private function validar(Request $request,Cargo $cargo = null): array{

        return $request->validate([
            'cargo' => ['required'],
            'negocio_id' => 'required'
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

            $cargo = Cargo::create($this->validar($request));
            $cargo->addPermisos($request->get('permisos'));
            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }
        
        $cargo->negocio;
        $cargo->permisos;

        return response()->json(['result' => $result, 'cargo' => $result ? $cargo : null ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\Cargo  $cargo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cargo $cargo)
    {
        try {
            DB::beginTransaction();

            $cargo->update($this->validar($request,$cargo));

            $cargo->addPermisos($request->get('permisos'));

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        $cargo->negocio;
        $cargo->permisos;

        return response()->json(['result' => $result, 'cargo' => $result ? $cargo : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\Cargo  $cargo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cargo $cargo)
    {
        try{
            DB::beginTransaction();
            $cargo->delete();
            DB::commit();

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }
}
