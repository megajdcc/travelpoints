<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lote extends Model
{
    use HasFactory;

    public $fillable  = [
        'fecha_llegada',
        'codigo_lada',
        'cantidad',
        'numero_inicial',
        'numero_final',
        'monto', //El monto en el que se van a vender las tarjetas
        'divisa_id',//la divisa en la se venderan
        'tps', //los tps que va aplicar esa tarjeta cuando el usuario la asocie 
        'usuario_id'
    ];

    // El lote de tarjeta puede ser vendido en una divisa
    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function tarjetas(){
        return $this->hasMany(Tarjeta::class,'lote_id','id');
    }

    public function cargar()
    {
        $this->divisa;
        $this->tarjetas;
        $this->usuario?->cargar();
    }

    
    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }
}
