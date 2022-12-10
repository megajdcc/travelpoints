<?php

namespace App\Trais;
use App\Models\Imagen;

/**
 * 
 */
trait hasImages
{
   
   public function imagenes(){
      return $this->morphMany(Imagen::class,'model');
   }


   public function addImagen(array $data): Imagen
   {

      $imagen = Imagen::create([...$data, ...['model_id' => $this->id, 'model_type' => $this->model_type]]);
      $imagen->model;
      return $imagen;
   }

   public function actualizarImagen(array $data): Imagen
   {

      $imagen = Imagen::find($data['id']);

      $imagen->update($data);
      $imagen->model;

      return $imagen;
   }


}


?>