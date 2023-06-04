<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Negocio\Solicitud;

class Estado extends Model
{
    use HasFactory;

    protected $fillable = [
        'estado',
        'pais_id'

    ];



    public function pais(){
        return $this->belongsTo(Pais::class,'pais_id','id');

    }


    public function ciudades(){
        return $this->hasMany(Ciudad::class, 'estado_id','id');
    }
    

     /**
     * Un estado puede estar relacionada con  cero o muchas solicitudes de negocios 
     */
    public function solicitudes(){
        return $this->hasMany(Solicitud::class,'estado_id','id');
    }


   
    

}
