<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retiro extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'monto',
        'status', // 1 => Solicitado , 2 => En proceso,3 => Procesado , 4 => Rechazado
        'comprobante',
        'nota'
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    
}
