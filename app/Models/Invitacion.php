<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitacion extends Model
{
    use HasFactory;


    protected $fillable = [
        'email',
        'mensaje',
        'usuario_id',
        'status' // 1 => invitado , 2 => aceptado
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }


    public function cargar(){
        $this->usuario?->cargar();
    }

    

}
