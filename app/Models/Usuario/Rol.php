<?php

namespace App\Models\Usuario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    public function permisos(){
        return $this->belongsToMany('App\Models\Usuario\Permiso','rol_permisos','rol_id','permiso_id')->withPivot(['actions']);
    }


    public function usuarios(){
        return $this->hasMany('App\Models\User','rol_id','id');
    }




}
