<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Destino;

use App\Trais\{hasTelefonos,hasImages,hasHorario, hasLike};

class Atraccion extends Model
{

    use HasFactory,hasTelefonos,hasImages, hasHorario,hasLike;

    public readonly string $model_type;

    public function __construct()
    {   
        $this->model_type = 'App\Models\Atraccion';
    }
    
    public $fillable = [
        'nombre',
        'duracion_sugerida',
        'sitio_web',
        'email',
        'destino_id',
        'lat',
        'lng',
        'incluye',
        'descripcion'
    ];

    public $casts = [
        'incluye' => 'array'
    ];


    public function destino(){
        return $this->belongsTo(Destino::class,'destino_id','id');
    }

    public function telefono(){
        return $this->morphOne(Telefono::class,'model');
    }

}
