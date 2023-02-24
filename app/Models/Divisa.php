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


    /**
     * @param App\Models\Divisa $divisa La divisa 
     * @param int|float $monto
     * @return float|int;
     */
    public function convertir(Divisa $divisa, $monto) : int|float{

        // 10 $ dolares convertir a pesos mexicanos 
        // tasa peso mexicano es de 18 por dolar 

        // 10 * 18 = 180 Pesos mexicos 
        
        if($divisa->id === $this->id){
            return $monto;
        }

        $monto_dolar = $monto / $divisa->tasa;

        return $monto_dolar *  $this->tasa;


    }

    public function sistema(){
        return $this->hasOne(Sistema::class,'divisa_id','id');
    }

    public function productos(){
        return $this->hasMany(Producto::class,'divisa_id','id');
        
    }
}
