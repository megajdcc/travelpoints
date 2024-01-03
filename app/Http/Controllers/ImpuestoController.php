<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImpuestoRequest;
use App\Models\Impuesto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImpuestoController extends Controller
{
    
    public function fetch(Impuesto $impuesto){

        $impuesto->cargar();
        return response()->json($impuesto);

    }

    public function fetchData(Request $request){

        $filter  = $request->all();

        $paginator = Impuesto::where([
            ['cuota',"LIKE","%{$filter['q']}%","OR"],
            ['nota', "LIKE", "%{$filter['q']}%", "OR"],
            ['abrev', "LIKE", "%{$filter['q']}%", "OR"],
        ])
        ->with('estado.pais','divisa')
        ->orderBy($filter['q'] ?: 'id', $filter['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filter['perPage'] ?: 1000);


        return response()->json([
            'total' => $paginator->total(),
            'impuestos' => $paginator->items(),
        ]);


    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(ImpuestoRequest $request)
    {
        
        try {
            DB::beginTransaction();
            $impuesto = Impuesto::create($request->all());
            $impuesto->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result,'impuesto' => $result ? $impuesto : null]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImpuestoRequest $request, Impuesto $impuesto)
    {

        try {
            DB::beginTransaction();
            $impuesto->update($request->all());
            $impuesto->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'impuesto' => $impuesto]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Impuesto $impuesto)
    {
        try {
            DB::beginTransaction();
            $result = $impuesto->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            $result  = false;
        }

        return response()->json(['result' => $result]);
    }
}
