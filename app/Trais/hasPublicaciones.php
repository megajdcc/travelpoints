<?php 
namespace App\Trais;

use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,Storage,File};

/**
 * 
 */
trait hasPublicaciones
{
      public function publicaciones(){
         return $this->morphMany(Publicacion::class,'model');
      }


      public function agregarPublicacion(Request $request) : Publicacion {

         $datos = $request->all();

         return Publicacion::create([
            'model_id' => $this->id,
            'model_type' => $this->model_type,
            'titulo' => $datos['titulo'],
            'contenido' => $datos['contenido']
         ]);

         // if($request->file('imagenes')){

         //    foreach($request->file('imagenes') as $imagen) {
         //       $imagen_name = \sha1($imagen->getClientOriginalName()).'.'.$imagen->getClientOriginalExtension();
         //       Storage::disk('imagenes_publicaciones')->put($imagen_name,File::get($imagen_name));

         //       $this->addImagen(['imagen' => $imagen_name,''])

               
         //    }


         // }

         
      }

      public function quitarPublicacion(Publicacion $publicacion) : bool | null {
         return $publicacion->delete();

      } 

}

?>