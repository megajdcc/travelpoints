<?php

namespace App\Models;

use App\Trais\hasImages;
use App\Trais\hasOpinion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory,hasOpinion,hasImages;

    protected $fillable = [
        'nombre',
        'categoria_id',
        'tienda_id',
        'precio',
        'descripcion',
        'disponibles',
        'caracteristicas',
        'envio'
    ];


    protected $casts = [
        'caracteristicas' => 'array',
        'envio' => 'array',
    ];


    public function categoria(){
        return $this->belongsTo(CategoriaProducto::class,'categoria_id','id');
    }


    public function tienda(){
        return $this->belongsTo(Tienda::class,'tienda_id','id');
    }


    
}
