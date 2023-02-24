<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consumo extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'empleado_id',
        'total',
        'paypal_id',
        'tps',
        'comentado', 
        'divisa_id',
        'paypal',
        'tienda_id',
    ];


    protected $casts = [
        'comentado' => 'boolean',
        'paypal' => 'array'
    ];

    public function cliente(){
        return $this->belongsTo(User::class,'cliente_id','id');
        
    }

    public function empleado()
    {
        return $this->belongsTo(User::class, 'empleado_id', 'id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function tienda(){
        return $this->belongsTo(Tienda::class,'tienda_id','id');
    }
    
    public function productos(){

        return $this->belongsToMany(Producto::class,'consumo_productos','consumo_id','producto_id')->withPivot([
            'cantidad',
            'monto'
        ]);
        
    }


}
