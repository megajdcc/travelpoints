<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Trais\HasDireccion;

class Iata extends Model
{
    
    use HasFactory, HasDireccion;

    protected $fillable = [
        'codigo',
        'aeropuerto',
        'estado_id',
        'ciudad_id'
    ];


    public function destinos(){
        return $this->hasMany(Destino::class,'iata_id','id');
    }



}
