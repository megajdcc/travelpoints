<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Impuesto extends Model
{
    use HasFactory;

    protected $fillable = [
        'cuota',
        'abrev',
        'estado_id',
        'nota',
        'divisa_id'
    ]; 

    public function estado(){
        return $this->belongsTo(Estado::class,'estado_id','id');
    }

    public function retiros(){
        return $this->belongsToMany(Retiro::class, 'retiros_impuesto','impuesto_id','retiro_id')->withPivot(['monto','cuota']);
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function cargar(){
        $this->estado?->pais;
        $this->divisa;
        $this->retiros;
    }
}   
