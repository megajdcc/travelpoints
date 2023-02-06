<?php 
namespace App\Trais;
use App\Models\Recomendacion;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
* 
*/
trait hasRecomendacion
{  
   
   public function recomendaciones(){
      return $this->morphMany(Recomendacion::class,'model');
   }

   public function toggleRecomendacion(User $usuario) : Model{

    if($recomendacion = $this->recomendaciones->where('usuario_id', $usuario->id)->first()){
      $recomendacion->delete();
    }else{

      $recomendacion = Recomendacion::create([
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
