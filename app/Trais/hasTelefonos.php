<?php 
namespace App\Trais;
use App\Models\Telefono;

/**
* 
*/
trait hasTelefonos
{  
   
   public function telefonos(){
      return $this->morphMany(Telefono::class,'model');
   }

   public function actualizarTelefono(array $data): Telefono{
      if(isset($data['id'])){
         $telefono = Telefono::find($data['id']);
         $telefono->update($data);
         $telefono->model;
      }else{
         $telefono = $this->addTelefono($data);
      }
      return $telefono;
   }


   public function addTelefono(array $data) : Telefono{

      $telefono = Telefono::create([...$data,...['model_id' =>$this->id,'model_type' => $this->model_type ]]);
      $telefono->model;
      return $telefono;
   
   }

   public function eliminarTelefonos(){

      foreach($this->telefonos as $telefono){
         $telefono->delete();
      }
   }



}

?>