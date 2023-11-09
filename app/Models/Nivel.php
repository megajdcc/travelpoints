<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Trais\hasTranslate;

class Nivel extends Model
{
    use HasFactory,hasTranslate;

    protected $fillable = [
        'nombre',
        'descripcion',
        'insignia',
        'baja_nivel', // boolean,
        'condicion_bajar_nivel', // [ tiempo => cantidad, tipo_tiempo => 1 ano, 2 meses y 3 dias]
        'activacion' , // [tipo_registro => [1 consumos, 2 monto consumido, 3 registro por iata, 4 por paises distintos], negocios_diferentes => true (si), false (no)]
        'grupo_id',
        'nivel_inicial', // true or false
        'nivel_anterior_id'
    ];


    protected $casts = [
        'condicion_bajar_nivel' => 'object',
        'activacion' => 'object',
        'baja_nivel' => 'boolean',
        'nivel_inicial' => 'boolean'
    ];


    
    public function grupo(){
        return $this->belongsTo(GrupoNivel::class,'grupo_id','id');
    }

    public function usuarios(){
        return $this->hasMany(UserNivel::class,'nivel_id','id');
    }

    public function nivelAnterior(){
        return $this->belongsTo(Nivel::class,'nivel_anterior_id','id');
    }

    public function nivelSiguiente(){
        return $this->hasOne(Nivel::class, 'nivel_anterior_id','id');
    }

    public function cargar(){
        $this->grupo;
        $this->usuarios;
        $this->nivelAnterior;
        
        $this->nivelSiguiente;
        
        $this->uri_insignia = asset("/storage/insignias/{$this->insignia}");
        
        
        return $this;
    }


   
}
