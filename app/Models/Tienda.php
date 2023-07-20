<?php

namespace App\Models;

use App\Trais\{HasDireccion,hasHorario,hasTelefonos};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    use HasFactory,HasDireccion,hasHorario, hasTelefonos;
    public readonly string $model_type;

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

     public function __construct(string $model_type = 'App\Models\Tienda')
    {
        $this->model_type = $model_type;
    }


    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    
    }

    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'tienda_producto', 'tienda_id', 'producto_id')->withPivot(['cantidad']);
    }

    public function direccion(){
        return $this->direccion." (". $this->ciudad?->ciudad." - ".$this->estado?->estado.' - '. $this->estado?->pais?->pais.')'; 
    }

    public function consumos(){
        return $this->hasMany(Consumo::class,'tienda_id','id');
    }
    
    public function cargar(){
        $this->divisa;
        $this->iata;
        $this->ciudad;
        $this->estado?->pais;
        $this->productos;
        $this->direccion;
        $this->consumos;
        $this->horarios;
        $this->telefonos;
    }
}
