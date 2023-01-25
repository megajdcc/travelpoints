<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Negocio\Certificado;

class Divisa extends Model
{
    use HasFactory;

    public $fillable = [
        'nombre',
        'iso',
        'simbolo',
        'principal',
        'tasa' 
    ];

    public  $casts = [
        'principal' => 'boolean'
    ];


    public static function getPrincipal() : Divisa | null{

        $divisa = Divisa::where('principal',true)->first();

        return $divisa;

    }

    public function certificados()
    {
        return $this->hasMany(Certificado::class, 'negocio_id', 'id');
    }

}
