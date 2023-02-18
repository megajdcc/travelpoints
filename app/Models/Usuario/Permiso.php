<?php

namespace App\Models\Usuario;

<<<<<<< HEAD
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
=======
use App\Models\PermisosAsignados;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Panel;
>>>>>>> vite

class Permiso extends Model
{
   use HasFactory;

   protected $fillable = [
<<<<<<< HEAD
      'nombre'
=======
      'nombre',
      'panel_id'
>>>>>>> vite
   ];

   public function usuarios()
   {
      return $this->belongsToMany(User::class,'usuario_permisos','permiso_id', 'usuario_id')->withPivot(['action']);
   }
<<<<<<< HEAD

=======
>>>>>>> vite
   
   public function roles(){
      return $this->belongsToMany(Rol::class,'rol_permisos','permiso_id','rol_id')->withPivot('actions');
   }
<<<<<<< HEAD
=======

   public function modelos(){
      return $this->hasMany(PermisosAsignados::class,'permiso_id','id');
   }

   public function panel(){
      return $this->belongsTo(Panel::class,'panel_id','id');
   }

>>>>>>> vite
}
