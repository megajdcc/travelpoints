<?php

namespace App\Trais;

use App\Models\Negocio\Cargo;
use App\Models\Usuario\{Rol,Permiso};
use Illuminate\Support\Collection;

trait Has_roles 
{
   
   public function asignarPermisosPorRol(){

      $this->permisos()->detach();

      foreach ($this->rol->permisos as $key => $permiso) {

         // $this->permisos()->updateExistingPivot($permiso->id,['action' => $permiso->pivot->actions]);
         $this->permisos()->attach($permiso->id, ['action' => $permiso->pivot->actions]);
      }

      // Ademas de asignar los permisos del rol, asignamos los permisos que tenga el usuario por el cargo que tiene en el negocio
      foreach ($this->negocios as $negocio) {
         $cargo = Cargo::find($negocio->pivot->cargo_id);

         foreach ($cargo->permisos as $permiso) {
            $this->addPermiso($permiso->permiso_id);
         }
      }


      return $this;

   }

   public function asignarPermisos($permisos = [],$actions = ['read','write','update','delete']){
      
      
      foreach ($permisos as $key => $permiso) {
            
         $this->permisos()->detach($permiso->id);

         $this->permisos()->attach($permiso->id,['action' => json_encode($actions)]);
      }

      return $this;

   }

   public function addPermiso(Permiso|int $permiso,$actions = ['read','write','update','delete']){


      if($permiso instanceof Permiso){
         $this->permisos()->detach($permiso->id);
         $this->permisos()->attach($permiso->id, ['action' => json_encode($actions)]);
      }else{
         $this->permisos()->detach($permiso);
         $this->permisos()->attach($permiso, ['action' => json_encode($actions)]);
      }
       
         return $this;
   }


   public function quitarPermisos(Collection $permisos){
      foreach($permisos as $permiso ){
         $this->permisos()->detach($permiso->id);
      }
      
   }

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
