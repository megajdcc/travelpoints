<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesa extends Model
{
    use HasFactory;

    public $table = 'mesas';
    
    public $fillable = [
        'cantidad',
        'sillas',
        'horario_reservacion_id'
    ];


    public function horario(){
        return $this->belongsTo(HorarioReservacion::class,'horario_reservacion_id','id');
    }

}
