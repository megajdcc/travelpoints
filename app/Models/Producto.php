<?php

namespace App\Models;

use App\Trais\hasImages;
use App\Trais\hasOpinion;
use App\Trais\hasVenta;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory,hasOpinion,hasImages,hasVenta;
    

    public readonly string $model_type;



    protected $fillable = [
        'nombre',
        'breve',
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


    public function __construct(){
        $this->model_type = 'App\Models\Producto';
    }

    public function categoria(){
        return $this->belongsTo(CategoriaProducto::class,'categoria_id','id');
    }


    public function tienda(){
        return $this->belongsTo(Tienda::class,'tienda_id','id');
    }


    
}
