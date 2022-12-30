<?php 
namespace App\Trais;

use App\Models\Like;
use Illuminate\Support\Facades\DB;
use App\Models\User;

/**
* 
*/
trait hasLike
{  
   
   public function likes(){
      return $this->morphMany(like::class,'model');
   }

   public function addLike(array $datos){
      return Like::create([...$datos,['model_id' => $this->id, 'model_type' => $this->model_type]]);
   }

   public function quitarLike(Like $like) : null | bool {

      try{
         DB::beginTransaction();
         $result =  $like->delete();

         DB::commit();
      }catch(\Exception $e){
         DB::rollBack();
         $result = false;
      }

      return $result;
    
   }

    public function isLikeUser(User $usuario) : bool{

        $result = false;
        $result  = $this->likes->where('usuario_id' , $usuario->id)->first() ? true : false;
        return $result;
    
    }

}
