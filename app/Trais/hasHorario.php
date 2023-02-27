<?php 
namespace App\Trais;
use App\Models\Horario;
use Illuminate\Support\Carbon;

/**
* 
*/
trait hasHorario
{  
   
   public function horarios(){
      return $this->morphMany(Horario::class,'model');
   }

   public function actualizarHorario(array $data): Horario{

      $horario = Horario::find($data['id']);

      $horario->update([...$data,...[
         'apertura' => $data['apertura'] && $data['cierre'] ? $data['apertura'] : null,
         'cierre' => $data['apertura'] && $data['cierre'] ? $data['cierre'] : null,
      ]]);

      $horario->model;

      return $horario;
   }

   public function addHorario(array $data) : Horario{

      $horario = Horario::create([...$data,...['model_id' => $this->id,'model_type' => $this->model_type ]]);
      $horario->model;
      
      return $horario;
   
   }

   public function aperturarHorario() {
      

      for ($i=1; $i <= 7 ; $i++) { 
         Horario::create([
            'dia' => $i,
            'apertura' => [now()->setTime(7,0)->format('h:i:s')],
            'cierre' => [now()->setTime(10,0)->format('h:i:s')], 
            'model_type' => $this->model_type,
            'model_id' => $this->id
         ]);
      }

   }

   public function quitarHorario(){

      foreach($this->horarios as $horario){
         $horario->delete();
      }

   }


   

}
