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
        'nota',
        'divisa_id'
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function divisa_id(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    
}
