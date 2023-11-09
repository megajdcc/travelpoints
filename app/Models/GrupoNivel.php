<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrupoNivel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'color'
    ];



    public function nivels(){
        return $this->hasMany(Nivel::class,'grupo_id','id');
    }
    

    
}
