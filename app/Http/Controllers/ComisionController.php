<?php

namespace App\Http\Controllers;

use App\Models\Comision;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ComisionController extends Controller
{


    public function getAll(){
        $comisiones  = Comision::with(['rol'])->get();
        
        return response()->json($comisiones);

    }

    public function fetchData(Request $request){
        $datos = $request->all();

        $paginator = Comision::where([
            ['comision',"like","%{$datos['q']}%","OR"],
        ])
        ->whereHas('rol',function(Builder $q) use($datos){
            $q->orWhere([
                ['nombre',"LIKE","%{$datos['q']}%","OR"]
            ]);
        })
        ->with(['rol'])
        ->orderBy($datos['sortBy'],$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage']?: 1000 , pageName:'currentPage');

        return response()->json([
            'total' => $paginator->total(),
            'comisiones' => $paginator->items(),
        ]);


    }

    public function fetch(Comision $comision ){
        
        return response()->json($comision->load(['rol']));

    }


    private function validar(Request $request) : Collection{
        return collect($request->validate([
            'comision' => 'required',
            'rol_id' => 'required'
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
            $comision = Comision::create($datos->toArray());
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'comision' => $result ? $comision->load(['rol']) : null
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, comision $comision)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();
            $comision->update($datos->toArray());
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'comision' => $comision->load(['rol'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function destroy(comision $comision)
    {   
        $result = $comision->delete();
        return response()->json(['result' => $result]);

    }
}
