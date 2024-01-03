<?php

namespace App\Trais;
use App\Models\Imagen;
use Illuminate\Support\Facades\{Storage,File};
// use Intervention\Image;
// use Intervention\Image\ImageManagerStatic as Image;

use Image;
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

      // Verificar si la imagen es thumbnails
      if(!$imagen->is_thumb){
         // Crear la imagen thumb a partir de la imagen principal
         $this->generarThumbnail($imagen);
      }

      return $imagen;
   }

   public function generarThumbnail(Imagen $imagen){
      Image::configure(['driver' => 'imagick']);
      
      if($imagen){
         // dd($imagen);
         // try {

            if ($original = Image::make(Storage::disk($this->disk)->get($imagen->imagen))) {
               if($original->width() > 300 && $original->height() > 200){
                  $original->resize(300, 200);
                  $original->save(\storage_path('app/public/thumbnails/') . "thumbnail-{$imagen->imagen}", 50);
                  $imagen = Imagen::create([
                     'imagen' => "thumbnail-{$imagen->imagen}",
                     'portada' => false,
                     'logo' => false,
                     'model_id' => $imagen->model_id,
                     'model_type' => $imagen->model_type,
                     'is_thumb' => true,
                     'is_gallery' => false
                  ]);
               }else{
                  $original->save(\storage_path('app/public/thumbnails/') . "thumbnail-{$imagen->imagen}", 50);
                  $imagen = Imagen::create([
                     'imagen' => "thumbnail-{$imagen->imagen}",
                     'portada' => false,
                     'logo' => false,
                     'model_id' => $imagen->model_id,
                     'model_type' => $imagen->model_type,
                     'is_thumb' => true,
                     'is_gallery' => false
                  ]);
               }  

              
            }
         // } catch (\Throwable $th) {
            
         //    dd($th->getMessage());
         // }
        
      }

      // $fotoConMarca->save(public_path('storage/imagenes/conmarcas/') . $this->fotoname, 50);
   }

   public function actualizarImagen(array $data): Imagen
   {

      $imagen = Imagen::find($data['id']);

      $imagen->update($data);
      $imagen->model;

      return $imagen;
   }

   public function quitarImagen(Imagen $imagen) : bool{

      return $imagen->delete();

   }


}


?>