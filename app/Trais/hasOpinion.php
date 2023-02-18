<?php 
namespace App\Trais;
use App\Models\Opinion;

/**
* 
*/
trait hasOpinion
{  
   
   public function opinions(){
      return $this->morphMany(Opinion::class,'model');
   }

   public function updateOpinion(array $data): Opinion{

      $opinion = Opinion::find($data['id']);
      $opinion->update([...$data]);
      $opinion->model;
      $opinion->imagenes;
      return $opinion;
   }

   public function addOpinion(array $data) : Opinion{

      $opinion = Opinion::create([...$data,...['model_id' => $this->id,'model_type' => $this->model_type ]]);
      $opinion->model;
      
      return $opinion;
   
   }


   public function quitarAllOpinions(){

      foreach($this->opinions as $opinion){
         $opinion->delete();
      }

   }


   

}
