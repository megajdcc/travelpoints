<?php

namespace App\Http\Controllers;

use App\Models\Telefono;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TelefonoController extends Controller
{
    

    public function validar(Request $request){
        
        return $request->validate([
            'telefono' => 'required',
            'is_whatsapp' => 'required',
            'principal' => 'required',
            'model_id' => 'required',
            'model_type' => 'required'
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

            $telefono = Telefono::create($this->validar($request));
            $telefono->model;
            
            DB::commit();
            $result = true;
       
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'telefono' => $result ? $telefono : null]);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Telefono  $telefono
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Telefono $telefono)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Telefono  $telefono
     * @return \Illuminate\Http\Response
     */
    public function destroy(Telefono $telefono)
    {
        try{
            DB::beginTransaction();
            $telefono->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }
    
        return response()->json(['result' => $result]);
    
    }

}
