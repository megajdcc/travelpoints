<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Iata;
use App\Models\Negocio\Negocio;
use App\Trais\HasDireccion;
use App\Trais\{hasImages, hasLike,hasLocation};
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class Destino extends Model
{

    use HasFactory,HasDireccion,hasImages,hasLike,hasLocation;

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

    public static function getLocation($datos) : Collection{
        
        $destinos = Destino::all()->filter(function($val) use($datos) {
            return Destino::cerca($datos,$val,$datos['km']);
        });

        foreach ($destinos as $key => $destino) {
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->tipo = 'Destino';
            $destino->imagenes;
            $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';
        }

        return $destinos;

    }

    public function atracciones(){
        return $this->hasMany(Atraccion::class,'destino_id','id');
    }


    public function negocios(){
        
        $negocios = Negocio::where('iata_id',$this->iata_id)->get();
        
        foreach($negocios as $negocio){
            $negocio->telefonos;
            $negocio->imagenes;
            $negocio->cuenta;
            $negocio->categoria;
            $negocio->solicitud;
            $negocio->encargado;
            $negocio->divisa;
            $negocio->ciudad;
            $negocio->estado?->pais;
            $negocio->eventos;
            $negocio->iata;
            $negocio->horarios;
            $negocio->likes;
        }

        return $negocios;

    }
}
