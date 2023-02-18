<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Divisa;
use App\Models\User;

class Cupon extends Model
{
    use HasFactory;

    public $fillable = [
        'nombre',
        'descripcion',
        'condiciones',
        'restricciones',
        'imagen',
        'expide',
        'vence',
        'disponibles',
        'precio',
        'divisa_id',
        'negocio_id',
        'activo',
    ];


    protected $casts = [
        'activo' => 'boolean'
    ];


    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }


    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'cupon_usuario', 'cupon_id', 'usuario_id')->withPivot(['status']);
    }

    

}
