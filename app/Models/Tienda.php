<?php

namespace App\Models;

use App\Trais\HasDireccion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    use HasFactory,HasDireccion;

    protected $fillable = [
        'nombre',
        'divisa_id',
        'iata_id',
        'fisica',
        'ciudad_id',
        'estado_id',
        'lat',
        'lng',
        'direccion'
    ];

    protected $casts = [
        'fisica' => 'boolean' 
    ];

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    
    }

    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }



    public function productos()
    {
        return $this->belongsToMany(Tienda::class, 'tienda_producto', 'tienda_id', 'producto_id')->withPivot(['cantidad']);
    }

    public function direccion(){
        return $this->direccion." (". $this->ciudad?->ciudad." - ".$this->estado?->estado.' - '. $this->estado?->pais?->pais.')'; 
    }

    public function consumos(){
        return $this->hasMany(Consumo::class,'tienda_id','id');
    }
    

}
