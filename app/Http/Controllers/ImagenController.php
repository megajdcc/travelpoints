<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};


class ImagenController extends Controller
{
  

    public function togglePrincipal(Request $request,Imagen $imagen){

        $model = $imagen->model;
        
        try{
            DB::beginTransaction();

            
            if($image = $model->imagenes->where('portada', true)->first()){
                $image->portada = false;
                $image->save();
            }

            $imagen->portada = $request->get('portada');
            $imagen->save();

            DB::commit();
            $result  = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'imagenes'=> $model->imagenes]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Imagen  $imagen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Imagen $imagen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Imagen  $imagen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Imagen $imagen)
    {
        //
    }
}
