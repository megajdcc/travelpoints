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
        'paypal',
        'divisa_id'
    ];


    protected $casts = [
        'paypal' => 'boolean',
        'production_paypal' => 'boolean'
    ];


    public function divisa(){

        return $this->belongsTo(Divisa::class,'divisa_id','id');
    
    }

    

   
}
