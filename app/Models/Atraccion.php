<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Destino;

use App\Trais\{hasTelefonos,hasImages};

class Atraccion extends Model
{

    use HasFactory,hasTelefonos,hasImages;

    public $fillable = [
        'nombre',
        'duracion_sugerida',
        'sitio_web',
        'email',
        'destino_id'
    ];


    public function destino(){
        return $this->belongsTo(Destino::class,'destino_id','id');
    }

    public function telefono(){
        return $this->morphOne(Telefono::class,'model');
    }



}
