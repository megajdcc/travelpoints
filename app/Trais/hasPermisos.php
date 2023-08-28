<?php
namespace App\Trais;
use App\Models\Usuario\Permiso;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

use App\Models\PermisosAsignados;


/**
 * 
 */
trait hasPermisos
{

   public function permisos(){
      return $this->morphMany(PermisosAsignados::class, 'model');
   }

   public function asignarPermisosDefault(string $panel = 'Negocio'): Collection{

      $permisos_asignados = collect([]);

      $permisos = Permiso::whereHas('panel',fn(Builder $q) => $q->where('panel',$panel))->with(['modelos','roles','usuarios','panel'])->get();  

      foreach($permisos as $permiso){
        $permisos_asignados->push(PermisosAsignados::create([
            'model_id' => $this->id,
            'model_type' => $this->model_type,
            'permiso_id' => $permiso->id,
         ]));

      }

      return $permisos_asignados;

   }

   public function addPermisos(array $permisos){
      $this->quitarPermisos();
      
      foreach($permisos as $permiso){
         PermisosAsignados::updateOrCreate([
            'model_id' => $this->id,
            'model_type' => $this->model_type,
            'permiso_id' => is_array($permiso) ? $permiso['id'] : $permiso,
         ],[
            'model_id' => $this->id,
            'model_type' => $this->model_type,
            'permiso_id' => is_array($permiso) ? $permiso['id'] : $permiso,

         ]);
      }

   }

   public function quitarPermisos(){
     
      foreach($this->permisos as $permiso){
         $permiso->delete();
     }

   }  


}

?>