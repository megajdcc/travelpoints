<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'pregunta',
        'respuesta',
        'categoria_id',
        'usuario_id'
    ];


    public function categoria(){
        return $this->belongsTo(CategoriaFaq::class,'categoria_id','id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }
}
