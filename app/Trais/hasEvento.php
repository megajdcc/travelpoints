<?php 

namespace App\Trais;

use App\Models\Evento;

/**
 * 
 */
trait hasEvento
{

   public function eventos()
   {
      return $this->morphMany(Evento::class, 'model');
   }


   public function addEvento(array $data): Evento
   {

      $evento = Evento::create([...$data, ...['model_id' => $this->id, 'model_type' => $this->model_type]]);

      $evento->model;
      return $evento;
   }

   public function actualizarEvento(array $data): Evento
   {

      $evento = Evento::find($data['id']);
      $evento->update($data);
      $evento->model;

      return $evento;

   }

}


?>