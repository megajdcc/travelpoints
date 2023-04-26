<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosPagos extends Model
{
    use HasFactory;

    protected $fillable = [
        'metodo_pago', // 1 => banco , 2 => paypal, 3 => stripe
        'divisa_id',
        'pais_id',
        'ciudad_id',
        'nombre_banco',
        'direccion_banco',
        'titular',
        'iban',
        'swift',
        'numero_cuenta',
        'fichero_acreditativo_cuenta',
        'email',
        'usuario_id',
    ];


    protected $attributes = [
        'metodo_pago' => 1
    ];


    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function ciudad(){
        return $this->belongsTo(Ciudad::class,'ciudad_id','id');
    }

    public function pais(){
        return $this->belongsTo(Pais::class,'pais_id','id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function cargar(){
        $this->divisa;
        $this->ciudad;
        $this->pais;
        $this->usuario;
        
    }
    

}
