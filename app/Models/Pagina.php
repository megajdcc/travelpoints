<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagina extends Model
{
    use HasFactory;


    public $fillable = [
        'nombre',
        'contenido',
        'header',
        'is_termino',
        'is_politica',
        'ruta',
        'usuario_id',
        'activo'
    ];


    public $casts = [
        'header' => 'array',
        'is_termino' => 'boolean',
        'is_politica' => 'boolean',
        'activo' => 'boolean',

    ];


    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }
    

}
