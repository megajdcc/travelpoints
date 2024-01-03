<?php

namespace App\Models;

use App\Trais\hasImages;
use App\Trais\hasOpinion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory,hasOpinion,hasImages;
    

    public readonly string $model_type;
    public readonly string $disk;




    protected $fillable = [
        'nombre',
        'breve',
        'categoria_id',
        'precio',
        'descripcion',
        'caracteristicas',
        'envio',
        'tipo_producto',
        'archivo',
        'divisa_id',
        'isChino',
        'pid', // si es chino el producto, aqui almacenamos su pid
        'cj', // si es chino el producto, aquí guardamos toda la data del producto capturado desde la Api
        'variants',
        'enviable'
    ];


    protected $casts = [
        'caracteristicas' => 'array',
        'envio'           => 'array',
        'cj'              => 'array',
        'variants'        => 'array',
        'isChino'         => 'boolean',
        'enviable'        => 'boolean'
    ];


    public function __construct(){
        $this->model_type = 'App\Models\Producto';
        $this->disk = 'imagenes_productos';

    }

    public function categoria(){
        return $this->belongsTo(CategoriaProducto::class,'categoria_id','id');
    }

    public function consumos()
    {
        return $this->belongsToMany(Consumo::class, 'consumo_productos', 'producto_id', 'consumo_id')->withPivot([
            'cantidad',
            'monto',
            'vid'
        ]);
    }


    public function tiendas(){
        return $this->belongsToMany(Tienda::class,'tienda_producto','producto_id','tienda_id')->withPivot(['cantidad']);
    }
    

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }



    public function carritos(){
        return $this->belongsToMany(User::class,'carrito_productos','producto_id','cliente_id')->withPivot(['cantidad','precio_unitario','monto','tienda_id','vid']);
    }

    public function cargar(){
        $this->carritos;
        $this->divisa;
        $this->tiendas->load(['telefonos','horarios']);
        $this->consumos;
        $this->categoria;
        $this->imagenes;
        $this->opinions;
    }   


}
