<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioReservacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'negocio_id',
        'dia',
        'hora',
        'condicion',
        'lugares',
        'floor_plan'
    ];


    public $casts = [
        'floor_plan' => 'boolean'
    ];

    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }

    public function mesas(){
        return $this->hasMany(Mesa::class,'horario_reservacion_id','id');
    }


}
