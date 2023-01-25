<?php

namespace App\Models\Negocio;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'observacion'

    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }


    public function operador(){
        return $this->belongsTo(User::class, 'operador_id', 'id');
    }


    
    
}
