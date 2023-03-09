<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasCuenta;
use App\Trais\{hasImages, hasRedes, hasSucursal, hasVideos};

class Sistema extends Model
{
    use HasFactory, hasCuenta, hasImages, hasVideos,hasSucursal,hasRedes;
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
        'divisa_id',
        'banner_principal',
        'empresa_digital',
        'negocio'
    ];

    protected $casts = [
        'paypal' => 'boolean',
        'production_paypal' => 'boolean',
        'empresa_digital' => 'boolean',
        'negocio' => 'array'
    ];


    public function divisa(){

        return $this->belongsTo(Divisa::class,'divisa_id','id');
    
    }

    public function cargar(){
        $this->divisa;
        $this->redes;
        $this->cuenta;
        $this->imagenes;
        $this->videos;
        $this->sucursales->load(['estado.pais','iata','telefonos']);

    }

    

   
}
