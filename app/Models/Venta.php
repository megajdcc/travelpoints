<?php

namespace App\Models;

use App\Models\Negocio\Empleado;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $fillable = [
        'divisa_id',
        'monto',
        'comision',
        'tps',
        'tps_referente',
        'certificado',
        'model_id',
        'model_type',
        'empleado_id',
        'cliente_id',
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


}
