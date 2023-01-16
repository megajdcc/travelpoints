<?php

namespace App\Models;

use App\Models\Negocio\Negocio;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormaPago extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'

    ];


    public function negocios(){
        return $this->belongsToMany(Negocio::class, 'formas_pago_negocio','forma_id','negocio_id');
    }
}
