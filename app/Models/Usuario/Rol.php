<?php

namespace App\Models\Usuario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
=======
use Illuminate\Database\Eloquent\Casts\Attibute;
>>>>>>> vite

class Rol extends Model
{
    use HasFactory;

    protected $fillable = [
<<<<<<< HEAD
        'nombre'
=======
        'nombre',
>>>>>>> vite
    ];

    public function permisos(){
        return $this->belongsToMany('App\Models\Usuario\Permiso','rol_permisos','rol_id','permiso_id')->withPivot(['actions']);
    }


    public function usuarios(){
        return $this->hasMany('App\Models\User','rol_id','id');
    }



<<<<<<< HEAD

=======
>>>>>>> vite
}
