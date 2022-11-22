<?php

namespace App\Http\Controllers;

use App\Models\Divisa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB};
use Illuminate\Validation\Rule;

class DivisaController extends Controller
{   
    

    public function fetch(Divisa $divisa){

        return response()->json($divisa);

    }

    public function fetchData(Request $request){

        $data = $request->all();

        $pagination = Divisa::where([
            ['nombre','LIKE',"%{$data['q']}%",'OR'],
            ['simbolo', 'LIKE', "%{$data['q']}%", 'OR'],
            ['iso', 'LIKE', "%{$data['q']}%", 'OR'],
            ['tasa', 'LIKE', "%{$data['q']}%", 'OR'],
        ])
        ->orderBy($data['sortBy'],$data['isSortDirDesc']? 'desc' : 'asc')
        ->paginate($data['perPage'] == 0 ? 100 : $data['perPage']);

        return response()->json(['total' => $pagination->total(),'divisas' => $pagination->items()]);

    }


    private function validar(Request $request,Divisa $divisa = null): array{

        return  $request->validate([
            'nombre' => ['required',$divisa ? Rule::unique('divisas','nombre')->ignore($divisa) : 'unique:divisas,nombre'],
            'iso'       => 'required',
            'simbolo'   => 'required',
            'tasa'      => 'nullable',
            'principal' => 'required'
        ],[
            'nombre.required' => 'El nombre de la divisa es importante',
            'nombre.unique' => 'La divisa ya está registrada',
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

            $divisa = Divisa::create($this->validar($request));

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result,'divisa' => $result ? $divisa  : null]);

    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Divisa  $divisa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Divisa $divisa)
    {
        try {
            DB::beginTransaction();

            $divisa->update($this->validar($request,$divisa));


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result, 'divisa' => $divisa]);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Divisa  $divisa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Divisa $divisa)
    {
        try{
            DB::beginTransaction();

            $divisa->delete();

            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
