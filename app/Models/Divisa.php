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
     * @param App\Models\Divisa $divisa La divisa de la que se quiere convertir 
     * @param int|float $monto  El monto a convertir
     * @return float|int;
     */
    public function convertir(Divisa $divisa, $monto) : int|float{

        if($divisa->id === $this->id){
            return $monto;
        }

        $monto_convertir = $monto / $divisa->tasa;

        return $monto_convertir *  $this->tasa;

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
        return $montoConvertido;
    }

    public static function convertirToTravel($monto, Divisa $divisa){
        
        return  $monto / $divisa->tasa;

    }

    public function sistema(){
        return $this->hasOne(Sistema::class,'divisa_id','id');
    }

    public function productos(){
        return $this->hasMany(Producto::class,'divisa_id','id');
        
    }

    // Una Divisa puede estar en muchos movimientos
    public function movimientos(){
        return $this->hasMany(Movimiento::class,'divisa_id','id');
    }


    /**
     * Realiza la conversión de una divisa a otra utilizando una divisa principal como intermediaria.
     *
     * @param Divisa $divisaOrigen La divisa de origen.
     * @param Divisa $divisaDestino La divisa de destino.
     * @param float $monto El monto a convertir.
     * @return float El monto convertido a la divisa de destino.
     */
    public static function cambiar(Divisa $divisaOrigen, Divisa $divisaDestino, float $monto): float
    {
        if ($divisaOrigen->id === $divisaDestino->id) {
            return $monto;
        }

        $divisaPrincipal = Divisa::where('principal', true)->first();

        if (!$divisaPrincipal) {
            throw new \RuntimeException('No se ha encontrado una divisa principal');
        }

        $montoIntermedio = $monto / $divisaOrigen->tasa;
        $montoDestino = $montoIntermedio * $divisaDestino->tasa;

        return $montoDestino;
    }
}


