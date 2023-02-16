<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tienda;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TiendaController extends Controller
{
    public function fetchData(Request $request ){

        $datos = $request->all();
        
        $paginator = Tienda::whereHas('divisa',function(Builder $q ) use ($datos){
            $q->where([
                ['nombre','like',"%{$datos['q']}%",'OR'],
                ['iso', 'like', "%{$datos['q']}%", 'OR'],
                ['simbolo', 'like', "%{$datos['q']}%", 'OR'],
            ]);
            
        })
        ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);

        
        $tiendas = collect($paginator->items());

        foreach($tiendas as $tienda){
            $tienda->load(['divisa', 'iata', 'ciudad', 'estado.pais','productos']);
        }

        return response()->json(['tiendas' => $tiendas,'total' => $paginator->total()]);

    }

    public function fetch(Tienda $tienda)
    {
        $tienda->load(['divisa', 'iata', 'ciudad', 'estado','productos']);
        return response()->json($tienda);
    }


    public function getAll(){

        $tiendas = Tienda::all();

        $tiendas->load(['divisa','ciudad','estado.pais','iata']);
        
        return response()->json($tiendas);



    }

    private function validar(Request $request,Tienda $tienda = null){

        return $request->validate([
            'nombre' => ['required', $tienda ? Rule::unique('tiendas','nombre')->ignore($tienda) : 'unique:tiendas,nombre'],
            'divisa_id' => 'required',
            'fisica'    => 'required',
            'iata_id'   => 'nullable',
            'ciudad_id' => 'nullable',
            'estado_id' => 'nullable',
            'lat'       => 'nullable',
            'lng'       => 'nullable'
        ]);
        
    }

    public function store(Request $request){
        $datos = $this->validar($request);


        try {
            DB::beginTransaction();

            $tienda = Tienda::create($datos);
            $tienda->load(['divisa', 'iata', 'ciudad', 'estado','productos']);
            DB::commit();

            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'tienda' => $result ? $tienda : null]);

    }


    public function update(Request $request,Tienda $tienda)
    {
        $datos = $this->validar($request,$tienda);


        try {
            DB::beginTransaction();

            $tienda->update($datos);
            $tienda->load(['divisa', 'iata', 'ciudad', 'estado', 'productos']);
            DB::commit();

            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'tienda' => $result ? $tienda : null]);
    }

    public function destroy(Tienda $tienda){

        $result = $tienda->delete();

        return response()->json(['result' => $result]);
    }


}
