<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Iata;
use App\Trais\HasDireccion;
use App\Trais\{hasImages};

class Destino extends Model
{
    use HasFactory,HasDireccion,hasImages;

    public readonly  string  $model_type;

    public function __construct()
    {
        $this->model_type = 'App\Models\Destino';
    }

    protected $fillable = [
        'iata_id',
        'nombre',
        'ciudad_id',
        'estado_id',
        'descripcion',
        'lat',
        'lng',
        'titulo',
    ];
    

    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }
}
