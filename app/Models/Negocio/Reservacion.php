<?php

namespace App\Models\Negocio;

use App\Models\User;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;


use Illuminate\Support\Carbon;


class Reservacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha',
        'hora',
        'observacion',
        'personas',
        'status', // 1 => Sin consumar, 2 => consumada , 3 => Cancelada
        'negocio_id',
        'usuario_id',
        'operador_id',
        'observaciaon',
    ];

    // public function fecha() : Attribute{
    //     return Attribute::make(
    //         get:fn($val) => new Carbon(new \DateTime($val))
    //     );
    // }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }


    public function operador(){
        return $this->belongsTo(User::class, 'operador_id', 'id');
    }


    public function venta(){
        return $this->hasOne(Venta::class,'reservacion_id','id');
    }

    public function getDia(){
        $dt =  Carbon::parse($this->fecha.' '.$this->hora);
        return $dt->isoFormat('LL [a las] h:mm A');
    }

    public function getPersonas(){

        if($this->personas > 1){
            return $this->personas .' Personas';
        }

        return $this->personas .' Persona';
    }
    
    
}
