<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarritoProducto extends Model
{
    use HasFactory;


    public $table = 'carrito_productos';

    protected $fillable = [
        'producto_id',
        'cantidad',
        'precio_unitario',
        'monto',
        'cliente_id',
        'tienda_id'
    ];


    public function producto(){
        return $this->belongsTo(Producto::class,'producto_id',
        'id');


    }

    public function tienda(){
        return $this->belongsTo(Tienda::class,'tienda_id','id');

    }
    
    public function cliente()
    {
        return $this->belongsTo(
            User::class,
            'cliente_id',
            'id'
        );

        
    }
}
