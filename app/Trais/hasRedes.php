<?php 
namespace App\Trais;

use App\Models\Red;

/**
 * 
 */
trait hasRedes
{
      public function redes(){
         return $this->morphMany(Red::class,'model');
      }


      public function agregarRed(array $datos = []) : Red {

         return Red::updateOrCreate(['model_id' => $this->id, 'model_type' => $this->model_type,'id' => isset($datos['id']) ? $datos['id'] : 0], [
            ...$datos,
            ...['model_id' => $this->id, 'model_type' => $this->model_type],
         ]);
         // return Red::create([
         //    ...$datos,
         //    ...['model_id' => $this->id,'model_type' => $this->model_type],
         // ]);
      }


      public function quitarRed(Red $red ) : bool | null{ 
         return $red->delete();
      }

      public function quitarRedes() {
        foreach($this->redes as $red){
          $red->delete();
        }

      } 

}

?>