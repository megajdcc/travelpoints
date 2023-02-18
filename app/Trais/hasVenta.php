<?php 

namespace App\Trais;
use App\Models\Venta;

/**
 * 
 */
trait hasVenta
{
   
   public function ventas(){
      return $this->morphMany(Venta::class,'model');
   }


   
}


?>