<?php

namespace App\Http\Controllers;

use App\Models\Sistema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SistemaController extends Controller
{
   
    public function fetch(){


        $sistema = Sistema::with('cuenta')->first();

        return response()->json($sistema);



    }

    private function validar(Request $request,Sistema $sistema){
        
        return $request->validate([
            'nombre'            => 'required',
            'terminos'          => 'nullable',
            'paypal_id'         => 'nullable',
            'paypal_secrect'    => 'nullable',
            'production_paypal' => 'nullable',
            'paypal'            => 'nullable'
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

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'sistema' => $sistema]);

    }
}
