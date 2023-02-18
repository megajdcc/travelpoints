<?php

namespace App\Http\Controllers;

use App\Models\Sistema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class SistemaController extends Controller
{
   
    public function fetch(){

        $sistema = Sistema::with(['cuenta','divisa'])->first();
        return response()->json($sistema);

    }

    private function validar(Request $request,Sistema $sistema){
        
        return $request->validate([
            'nombre'            => 'required',
            'terminos'          => 'nullable',
            'paypal_id'         => 'nullable',
            'paypal_secrect'    => 'nullable',
            'production_paypal' => 'nullable',
            'paypal'            => 'nullable',
            'divisa_id' => 'required'
        ]);
        
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sistema  $sistema
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sistema $sistema)
    {
        
        try {
            DB::beginTransaction();

                $sistema->update($this->validar($request,$sistema));
                $sistema->cuenta;
                $sistema->divisa;

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'sistema' => $sistema]);

    }

    public function crearCuenta(Sistema $sistema){

        try {
            DB::beginTransaction();
            if(isNull($sistema->cuenta)){
                $cuentaNueva = $sistema->aperturarCuenta();
            }

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }
        
        $sistema->load(['cuenta','divisa']);

        return response()->json(['result' => $result,'sistema' => $sistema]);
    }
}
