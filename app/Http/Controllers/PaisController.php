<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB};
use Illuminate\Validation\Rule;



class PaisController extends Controller
{
  

    public function getPaises(){

        $paises = Pais::get();


        foreach($paises as $pais){
            $pais->estados;
            $pais->ciudades = $pais->ciudades();

        }

        return response()->json($paises);

    }

    public function fetchData(Request $request){

        $data = $request->all();


        $pagination = Pais::where([
            ['pais','LIKE',"%{$data['q']}%",'OR'],
            ['codigo', 'LIKE', "%{$data['q']}%", 'OR'],
            ['lada', 'LIKE', "%{$data['q']}%", 'OR'],
        ])
        ->orderBy($data['sortBy'] ?: 'id', $data['sortDesc'] ? 'desc' : 'asc')
        ->paginate($data['perPage'] ?: 10000);


        $paises = $pagination->items();

        foreach($paises as $pais){
            $pais->estados;
            $pais->ciudades = $pais->ciudades();

        }

        return response()->json([
            'paises' => $paises,
            'total' => $pagination->total()
        ]);

    }

    public function fetchPais(Pais $pais){

        $pais->estados;
        $pais->ciudades = $pais->ciudades();

        return response()->json($pais);
    }

    private function validar(Request $request, Pais $pais = null) : array{

        return $request->validate([
            'pais' => ['required',$pais ? Rule::unique('pais','pais')->ignore($pais) : 'unique:pais,pais'],
            'codigo' => 'nullable',
            'lada' => 'nullable'
        ],[
            'pais.required' => 'El Pais es importante no lo olvides',
            'pais.unique' => 'El pais ya está Siendo usado, intente con otro',
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


            $pais = Pais::create($this->validar($request));

            $pais->estados;
            $pais->ciudades();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result , 'pais' => $result ? $pais : null]);
    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pais  $pais
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pais $pai)
    {
        $pais = $pai;

        try{
            DB::beginTransaction();

            $pais->update($this->validar($request,$pais));

            $pais->estados;
            $pais->ciudades();


            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }
        return response()->json(['result' => $result,'pais' => $pais]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pais  $pais
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pais $pai )
    {
        $pais = $pai;
        try{
            DB::beginTransaction();

            $result = $pais->delete();

            DB::commit();
            
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result ]);

    }
}
