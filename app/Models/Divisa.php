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
     * @param App\Models\Divisa $divisa La divisa en la que se quiere convertir 
     * @param int|float $monto  El monto a convertir
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

    public static function convertirDivisa($monto, $tasa, Divisa $monedaDestino)
    {
        // Verificar que la tasa de conversión sea mayor que cero
        if ($tasa <= 0) {
            throw new \Exception("La tasa de conversión debe ser mayor que cero.");
        }

        // Verificar que el monto a convertir sea mayor o igual que cero
        if ($monto < 0) {
            throw new \Exception("El monto a convertir debe ser mayor o igual que cero.");
        }

        // Realizar la conversión
        $montoConvertido = $monto * $tasa;

        // Redondear el resultado a dos decimales
        $montoConvertido = round($montoConvertido, 2);

        // Devolver el monto convertido con la moneda de destino
        return $montoConvertido . " " . $monedaDestino->iso;
    }

    public function sistema(){
        return $this->hasOne(Sistema::class,'divisa_id','id');
    }

    public function productos(){
        return $this->hasMany(Producto::class,'divisa_id','id');
        
    }
}
