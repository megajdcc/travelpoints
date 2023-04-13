<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Negocio\Solicitud;

class Ciudad extends Model
{
    use HasFactory;


    protected $fillable = [
        'ciudad',
        'estado_id',

    ];


    public function estado(){
        return $this->belongsTo(Estado::class);
    }

    /** 
     * En una ciudad pueden vivir muchos usuarios o no 
     */
    public function usuarios(){
        return $this->hasMany(User::class,'ciudad_id','id');
    }

    /**
     * Una ciudad puede estar relacionada con  cero o muchas solicitudes de negocios 
     */
    public function solicitudes(){
        return $this->hasMany(Solicitud::class,'ciudad_id','id');
    }


    public function iatas(){
        return $this->hasMany(Iata::class,'ciudad_id','id');
    }
    
}
