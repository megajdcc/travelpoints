<?php

namespace App\Http\Controllers;

use App\Models\Iata;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\Builder;

use Illuminate\Validation\Rule;

use Illuminate\Support\Facades\{DB};



class IataController extends Controller
{
    

    public function fetch(Iata $iata){

        $iata->ciudad;
        $iata->estado?->pais;

        return response()->json($iata);
    }

    public function getIatas(){
        
        $iatas = Iata::all();


        foreach($iatas as $iata){
            $iata->estado;
            $iata->ciudad;
        }


        return response()->json($iatas);


    }


    public function fetchData(Request $request){

        $datos = $request->all();


        $pagination = Iata::where([
            ['codigo','LIKE',"%{$datos['q']}%",'OR'],
            ['aeropuerto', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
        ->whereHas('ciudad', function(Builder $q) use ($datos){
            $q->orWhere([
                ['ciudad','LIKE',"%{$datos['q']}%",'OR'],
            ]);
        })

        ->whereHas('estado', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['estado', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
            ->orWhereHas('pais',function(Builder $t) use ($datos){

                $t->orWhere([
                    ['pais',"LIKE","%{$datos['q']}%",'OR']
                ]);

            })
        
            ;
        })
        

        ->orderBy($datos['sortBy'], $datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


        $iatas = $pagination->items();

        foreach($iatas as $iata){
            $iata->ciudad;
            $iata->estado?->pais;
        }

        return response()->json([
            'iatas' => $iatas,
            'total' => $pagination->total()
        ]);


    }


    public function validar(Request $request, Iata $iata = null) : array{

        return $request->validate([
            'codigo' => ['required' , $iata ? Rule::unique('iatas','codigo')->ignore($iata) : 'unique:iatas,codigo'],
        'aeropuerto' => 'nullable',
        'ciudad_id'  => 'nullable',
        'estado_id' => 'required'
        ],[
            'codigo.unique' => 'El código ya está siendo usado, intenta con otro' 
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
            $iata = Iata::create($this->validar($request));

            $iata->ciudad;
            $iata->estado?->pais;

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result, 'iata' => $result ? $iata : null]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Iata  $iata
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Iata $iata)
    {
        try {
            DB::beginTransaction();
            $iata->update($this->validar($request,$iata));
            $iata->ciudad;
            $iata->estado?->pais;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'iata' => $result ? $iata : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Iata  $iata
     * @return \Illuminate\Http\Response
     */
    public function destroy(Iata $iata)
    {
        try{
            DB::beginTransaction();
                $iata->delete();
            DB::commit();
            $result = true;
            
        }catch(\Exception $e){
            DB::rollBack();
            $result = true;
        }

        return response()->json(['result' => $result]);

    }
}
