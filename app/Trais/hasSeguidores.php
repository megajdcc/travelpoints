<?php 
namespace App\Trais;
use App\Models\Seguidor;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
* 
*/
trait hasSeguidores
{  
   
   public function seguidores(){
      return $this->morphMany(Seguidor::class,'model');
   }

   public function toggleSeguidor(User $usuario) : Model{

    if($seguidor = $this->seguidores->where('usuario_id', $usuario->id)->first()){
      $seguidor->delete();
    }else{

      $seguidor = Seguidor::create([
         'model_id' => $this->id,
         'model_type' => $this->model_type,
         'usuario_id' => $usuario->id,
      ]);
      
     }

     $this->refresh();

     $this->cargar();

    return $this;

   }


   

}
