<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Destino;

use App\Trais\{hasTelefonos,hasImages,hasHorario, hasLike, hasLocation, hasOpinion,hasEvento};
use Illuminate\Support\Collection;

class Atraccion extends Model
{

    use HasFactory, hasTelefonos, hasImages, hasHorario, hasLike, hasLocation, hasOpinion,hasEvento;

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

    public static function getLocation($datos): Collection
    {

        $atraccions = Atraccion::all()->filter(function ($val) use ($datos) {
            return Atraccion::cerca($datos, $val,$datos['km']);
        });

        foreach ($atraccions as $key => $atraccion) {


            $atraccion->telefono;
            $atraccion->imagenes;
            $atraccion->destino;
            $atraccion->destino->estado?->pais;
            $atraccion->destino->ciudad;
            $atraccion->horarios;
            $atraccion->likes;
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->modelType = $atraccion->model_type;
            $atraccion->opinions;
            $atraccion->imagen = $atraccion->imagenes[0] ? "/storage/atracciones/imagenes/{$atraccion->imagenes[0]->imagen}" : '';
            $atraccion->tipo = 'Atracción';
       
           
        }
        

        return $atraccions;
    }

    public function cargar(){
        $this->telefono;
        $this->destino;
        $this->ruta = "/Atraccions?q={$this->nombre}";
        $this->tipo = 'Atracción';
        $this->imagenes;
        $this->opinions;
        $this->modelType = $this->model_type;
        $this->imagen = $this->imagenes[0] ? "/storage/atracciones/imagenes/{$this->imagenes[0]->imagen}" : '';
    }

}
