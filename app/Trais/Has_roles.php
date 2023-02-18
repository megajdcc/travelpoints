<?php

namespace App\Trais;
use App\Models\Usuario\{Rol,Permiso};
<<<<<<< HEAD
=======
use Illuminate\Support\Collection;
>>>>>>> vite

trait Has_roles 
{
   
   public function asignarPermisosPorRol(){

      foreach ($this->rol->permisos as $key => $permiso) {
         $this->permisos()->attach($permiso->id, ['action' => $permiso->pivot->actions]);
      }

      return $this;

   }

   public function asignarPermisos($permisos = [],$actions = ['read','write','update','delete']){
      
      
      foreach ($permisos as $key => $permiso) {
            
<<<<<<< HEAD
            $this->permisos()->attach($permiso->id,['action' => json_encode($actions)]);
=======
         $this->permisos()->detach($permiso->id);

         $this->permisos()->attach($permiso->id,['action' => json_encode($actions)]);
>>>>>>> vite
      }

      return $this;

   }

<<<<<<< HEAD

=======
   public function addPermiso(Permiso $permiso,$actions = ['read','write','update','delete']){

      // dd($permiso,$actions);
      
         $this->permisos()->detach($permiso->id);
         $this->permisos()->attach($permiso->id,['action' => json_encode($actions)]);
         return $this;
   }


   public function quitarPermisos(Collection $permisos){
      foreach($permisos as $permiso ){
         $this->permisos()->detach($permiso->id);
      }
      
   }
>>>>>>> vite

   public function getHabilidades(){
      

      $result = [];

      foreach ($this->permisos as $key => $value) {
         
         foreach (json_decode($value->pivot->action) as $k => $v) {
            array_push($result,['action' => $v,'subject' => $value->nombre]);   
         }

       
      }

      return $result;
      
   }


   public function removeRole(){
      $this->permisos()->detach();
   }



}


?>
