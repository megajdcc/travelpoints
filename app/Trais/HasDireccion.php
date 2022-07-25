<?php 
namespace App\Trais;

trait HasDireccion{

   public function ciudad(){
      return $this->belongsTo('App\Models\Ciudad','ciudad_id','id');
   }

   public function estado(){
      return $this->belongsTo('App\Models\Estado','estado_id','id');
   }

   public function pais(){
      return ($this->estado) ? $this->estado->pais : null; 
   }

}
