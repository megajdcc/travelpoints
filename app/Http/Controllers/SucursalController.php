<?php

namespace App\Http\Controllers;

use App\Models\Sistema;
use App\Models\Sucursal;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SucursalController extends Controller
{
    

    public function getAll(){
        $sucursales = Sucursal::all();

        foreach($sucursales as $sucursal){
            $sucursal->cargar();
        }

        return response()->json($sucursales);

    }
    
    public function fetch(Sucursal $sucursal){
        $sucursal->cargar();
        return response()->json($sucursal);

    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Sucursal::where([
            ['nombre','LIKE',"%{$datos['q']}%",'OR'],
            ['direccion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['lat', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['lng', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
            
        ->orderBy($datos['sortBy'],$datos['isSortDirDesc'] ? 'desc' :'asc')
        ->paginate($datos['perPage'] ?: 10000);
        
        $sucursales = collect($paginator->items());

        foreach($sucursales as $sucursal){
            $sucursal->cargar();
        }

        return response()->json([
            'total' => $paginator->total(),
            'sucursales' => $sucursales
        ]);

    }

    private function validar(Request $request,Sucursal $sucursal = null) : Collection{

        return collect($request->validate([
            'nombre'     => 'required',
            'ciudad_id'  => 'nullable',
            'estado_id'  => 'required',
            'direccion'  => 'required',
            'lat'        => 'required',
            'lng'        => 'required',
            'iata_id'    => 'required',
            'model_id'   => 'nullable',
            'model_type' => 'nullable',
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

            if(isset($datos['model_id']) && isset($datos['model_type'])){
                $sucursal = Sucursal::created($datos->toArray());
            }else{
                $sistema = Sistema::first();

                $sucursal = $sistema->agregarSucursal($datos->except(['model_id','model_type'])->toArray());
               
            }


            DB::commit();   
            $result = true;

            $sucursal->cargar();
            
        
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }



        return response()->json(['result' => $result,'sucursal' => $result ? $sucursal : null]);
    }

   

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sucursal $sucursal)
    {
        $datos = $this->validar($request,$sucursal);
        try {
            DB::beginTransaction();
                $sucursal->update($datos->toArray());
            DB::commit();
            $result = true;
            $sucursal->cargar();
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'sucursal' => $sucursal]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sucursal $sucursal)
    {
        try {
            DB::beginTransaction();

                $sucursal->delete();

            DB::commit();

            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }
}
