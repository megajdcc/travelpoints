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
    public readonly string $model_type;
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


    protected $casts = [
        'fecha' => 'date:Y-m-d'
    ];

    public function __construct(){
     $this->model_type = 'App\Models\Negocio\Reservacion';
    }

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
        $dt =  Carbon::parse(date('Y-m-d',strtotime($this->fecha)).' '.$this->hora);
        return $dt->isoFormat('LL [a las] h:mm A');
    }

    public function getPersonas(){

        if($this->personas > 1){
            return $this->personas .' Personas';
        }

        return $this->personas .' Persona';
    }
    
    
}