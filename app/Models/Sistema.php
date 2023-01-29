<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasCuenta;

class Sistema extends Model
{
    use HasFactory, hasCuenta;
    protected $table = 'sistema';

    public string $model_type = 'App\Models\Sistema';

    protected $fillable = [
        'nombre',
        'terminos',
        'logotipo_fondo_claro',
        'logotipo_fondo_oscuro',
        'paypal_id',
        'paypal_secrect',
        'production_paypal',
        'paypal'
    ];


    protected $casts = [
        'paypal' => 'boolean',
        'production_paypal' => 'boolean'
    ];


    

   
}
