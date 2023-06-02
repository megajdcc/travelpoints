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
        'activo',
        'is_contacto',
        'showHeader',
        'icono'
    ];


    public $casts = [
        'header'      => 'array',
        'is_termino'  => 'boolean',
        'is_politica' => 'boolean',
        'activo'      => 'boolean',
        'is_contacto' => 'boolean',
        'showHeader'  => 'boolean'

    ];


    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }
    

}
