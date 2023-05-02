<?php

namespace App\Models;

use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasCuenta;
use App\Trais\{hasImages, hasRedes, hasSucursal, hasVideos};
use Illuminate\Database\Eloquent\Builder;

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


    public function adjudicarComisiones($tps, Venta $venta){
        $monto = number_format((float) $venta->monto, 2, '.', ',') . ' ' . $venta->divisa->iso;
        
        $movimiento = $this->generarMovimiento(
            $this->divisa->convertir($venta->divisa, $tps),
            "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.", 
            Movimiento::TIPO_INGRESO);
        
        // Comision Promotor
        if($promotor = $venta?->reservacion?->operador){

            $rol_promotor = (Rol::where('nombre','Promotor')->first());
            $comision_promotor = $rol_promotor->comision;
            

            if($comision_promotor){   
                $monto_comision = $movimiento->monto * $comision_promotor->comision / 100;

                $promotor->generarMovimiento($monto_comision,
                "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.",Movimiento::TIPO_INGRESO);


                $this->generarMovimiento($monto_comision,"Comision adjudicada a promotor {$promotor->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.",Movimiento::TIPO_EGRESO);


            }

            // Comision Lider
            if($lider = $promotor->lider){
                $rol_lider = (Rol::where('nombre', 'Lider')->first());
                $comision_lider = $rol_lider->comision;

                if($comision_lider){
                    $monto_comision = $movimiento->monto * $comision_lider->comision / 100;

                    $lider->generarMovimiento(
                        $monto_comision,
                        "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}. El promotor quien realizó la reserva fue {$promotor->getNombreCompleto()}",
                        Movimiento::TIPO_INGRESO
                    );

                    $this->generarMovimiento($monto_comision, "Comision adjudicada a lider {$lider->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);

                }
               
            }

         
        }

        
    }
    


    public static function totalIngresoTienda(){
        $sistema = Sistema::first();

        $cuenta = $sistema->cuenta;

        
        return '$ '.number_format((float) ($cuenta->saldo * 25 / 100),2). ' '.$cuenta->divisa->iso;

    }

   
}
