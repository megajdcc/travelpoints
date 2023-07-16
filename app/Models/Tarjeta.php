<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarjeta extends Model
{
    use HasFactory;

    public $fillable = [
        'lote_id',
        'numero',
        'aplicada',
        'validada'
    ];

    public $casts = [
        'aplicada' => 'boolean',
        'validada' => 'boolean'
    ];

    public function lote(){
        return $this->belongsTo(Lote::class,'lote_id','id');
    }

    public function usuario(){
        return $this->hasOne(User::class,'tarjeta_id','id');
    }

    public function cargar(){
        $this->lote;
        $this->lote?->divisa;
        $this->usuario;
    }

}
