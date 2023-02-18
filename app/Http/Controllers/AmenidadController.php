<?php

namespace App\Http\Controllers;

use App\Models\Amenidad;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\{DB};

class AmenidadController extends Controller
{
    

    public function getAll(){
        
        return response()->json(Amenidad::with('negocios')->get());
    }


    public function fetchData(Request $request){
        
        $datos = $request->all();

        $paginator = Amenidad::where([
            ['nombre','LIKE',"%{$datos['q']}%",'OR'],
        ])
        ->with('negocios')
        ->orderBy($datos['sortBy']?: 'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);


            return response()->json([
                'total' => $paginator->total(),
                'amenidades' => $paginator->items()
            ]);

    }

    private function validar(Request $request, Amenidad $amenidad = null) : array{
        return $request->validate([
            'nombre' => ['required' , $amenidad ? Rule::unique('amenidads','nombre')->ignore($amenidad) : 'unique:amenidads,nombre']
        ],[
            'nombre.unique' => 'El nombre de la Amenidad, ya está siendo usado, inténte con otro'
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
            $amenidad = Amenidad::create($datos);

            $amenidad->negocios;

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'amenidad' => $result ? $amenidad : null ]);

    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Amenidad  $amenidad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Amenidad $amenidad)
    {
        $datos = $this->validar($request,$amenidad);

        try {
            DB::beginTransaction();
            $amenidad->update($datos);

            $amenidad->negocios;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'amenidad' => $result ? $amenidad : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Amenidad  $amenidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Amenidad $amenidad)
    {
        try{
            DB::beginTransaction();
                $amenidad->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function fetch(Amenidad $amenidad){
        return response()->json($amenidad->load('negocios'));
    }

}
