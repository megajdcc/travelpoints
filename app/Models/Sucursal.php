<?php

namespace App\Models;

use App\Trais\HasDireccion;
use App\Trais\hasTelefonos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    use HasFactory,HasDireccion,hasTelefonos;

    public readonly string $model_type;

    protected $fillable = [
        'nombre',
        'ciudad_id',
        'estado_id',
        'direccion',
        'lat',
        'lng',
        'iata_id',
        'model_id',
        'model_type'
    ];

    public function __construct(){
        $this->model_type = 'App\Models\Sucursal';
    }

    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }


    public function model(){
        return $this->morphTo();
    }


    public function cargar(){
        $this->iata;
        $this->model;
        $this->ciudad;
        $this->telefonos;
        $this->estado?->pais;
    }

}
