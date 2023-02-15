<?php

namespace App\Models;

use App\Models\Negocio\Empleado;
use App\Models\Negocio\Reservacion;
use App\Trais\hasOpinion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory,hasOpinion;

    // public string $model_type = 'App\Models\Venta';

    protected $fillable = [
        'divisa_id',
        'monto',
        'comision', // Monto de la comisión para el momento
        'tipo_comision', // 1 => Porcentaje por venta 2 => Monto por personas
        'tps',
        'tps_referente',
        'certificado',
        'model_id',
        'model_type',
        'empleado_id',
        'cliente_id',
        'personas',
        'reservacion_id'
    ];


    public $casts = [
        'certificado' => 'boolean'
    ];

    public function model(){
        return $this->morphTo();
    }

    public function cliente(){
        return $this->belongsTo(User::class,'cliente_id','id');
    }

    public function empleado(){
        return $this->belongsTo(Empleado::class,'empleado_id','id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function reservacion(){
        return $this->belongsTo(Reservacion::class,'reservacion_id','id');
        
    }


    public function cargar(){
        $this->reservacion;
        $this->divisa;
        $this->empleado;
        $this->cliente;
        $this->model;
        $this->opinions->load(['usuario','model'])->each(function($opinion) {
            $opinion->usuario->avatar = $opinion->usuario->getAvatar();
        });
        return $this;
    }

}
