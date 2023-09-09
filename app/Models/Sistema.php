<?php

namespace App\Models;

use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasCuenta;
use App\Trais\{hasImages, hasRedes, hasSucursal, hasVideos};
use Illuminate\Database\Eloquent\Builder;
use PhpParser\Node\Expr\Instanceof_;

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
        'negocio',
        'cjdropshipping',
        'porcentaje_referido'
    ];

    protected $casts = [
        'paypal'            => 'boolean',
        'production_paypal' => 'boolean',
        'empresa_digital'   => 'boolean',
        'negocio'           => 'array',
        'cjdropshipping'    => 'array',
    ];


    public function divisa(){

        return $this->belongsTo(Divisa::class,'divisa_id','id');
    
    }

    public function cargar(){
        $this->divisa;
        $this->redes;
        $this->cuenta?->divisa;
        $this->imagenes;
        $this->videos;
        $this->sucursales->load(['estado.pais','iata','telefonos']);
    }


    private function asignarComisionPerfiles(Venta $venta,Movimiento $movimiento){

        $cliente = $venta->cliente;
        
        // Si la venta proviene de una reservacion y esta tiene un operador (promotor), le asignamos la comisión correspondiente por promotor
        if($operador = $venta?->reservacion?->operador){
            
            // Verificamos si el operador en realidad es un Promotor
            if (\in_array($operador->rol->nombre, ['Promotor'])){
                $this->asignarComisionPromotor($operador, $venta, $movimiento); // procedemos con la asignación de la comisión
            }

        }else if($cliente->referidor instanceof \Illuminate\Database\Eloquent\Collection){ 
            // en el caso de que no sea por reserva la operacion de venta, se verifica si el usuario tiene un referidor (invitador)
            
            if($referidor = $cliente->referidor->first()){
                // si tiene un referidor, se verifica que este se promotor , para asignarle la comision al promotor
                if (\in_array($referidor->rol->nombre, ['Promotor'])) {
                    $this->asignarComisionPromotor($referidor, $venta, $movimiento);
                }
                
              
            }
        }
    }


    private function asignarComisionPromotor(User $promotor, Venta $venta,Movimiento $movimiento){

        $monto = number_format((float) $venta->monto, 2, '.', ',') . ' ' . $venta->divisa->iso;
        if($promotor->lider && $promotor->lider->lider_business && $promotor->lider->comision_promotores > 0){
           
            
            // Adjudicar la comision que el lider haya establecido a sus promotores
            $porcentaje_lider = (Rol::where('nombre','Lider')->first())?->comision?->comision;

            $monto_lider = $movimiento->monto * $porcentaje_lider / 100 ;

            $monto_promotor = $monto_lider * $promotor->lider->comision_promotores / 100;
            
            // Asignamos comision al promotor, lo correspondiente que le haya asignado en porcentaje el su lider
            $promotor->generarMovimiento($monto_promotor,
                "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre}.",
                Movimiento::TIPO_INGRESO);

            $this->generarMovimiento($monto_promotor, "Comisión adjudicada a promotor {$promotor->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);
            
            // ASignamos comision al lider, restando lo que le hemos dado al promotor

            if($monto_lider < $monto_promotor){
                $monto_asignar_lider = $monto_promotor - $monto_lider;
            }else{
                $monto_asignar_lider = $monto_lider - $monto_promotor;
            }

            $promotor->lider->generarMovimiento($monto_asignar_lider, "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre}. El promotor quien realizó la reserva fue {$promotor->getNombreCompleto()}",Movimiento::TIPO_INGRESO);
            
            $this->generarMovimiento($monto_asignar_lider, "Comisión adjudicada a lider {$promotor->lider->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);
            
            if($promotor->lider->coordinador){
                $this->asginarComisionCoordinador($promotor->lider->coordinador,$venta,$movimiento,$promotor);
            }

        }else{

            // En el caso, de que el lider, no sea lider_business o no tenga una comision para los promotores por encima del 0 % 
            $rol_promotor = (Rol::where('nombre', 'Promotor')->first());
            $comision_promotor = $rol_promotor->comision;

            

            if ($comision_promotor) {
                $monto_comision = $movimiento->monto * $comision_promotor->comision / 100;

                $promotor->generarMovimiento(
                    $monto_comision,
                    "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre}.",
                    Movimiento::TIPO_INGRESO
                );


                $this->generarMovimiento($monto_comision, "Comisión adjudicada a promotor {$promotor->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);


                if ($lider = $promotor->lider) {
                    $this->asginarComisionLider($lider, $venta, $movimiento, $promotor);
                }
            }
        }

        
    }

    private function asginarComisionLider(User $lider,Venta $venta, Movimiento $movimiento,User $promotor = null){
        $monto = number_format((float) $venta->monto, 2, '.', ',') . ' ' . $venta->divisa->iso;
        $rol_lider = (Rol::where('nombre', 'Lider')->first());
        $comision_lider = $rol_lider->comision;

        if ($comision_lider) {
            $monto_comision = $movimiento->monto * $comision_lider->comision / 100;

            $lider->generarMovimiento(
                $monto_comision,
                "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre}. El promotor quien realizó la reserva fue {$promotor->getNombreCompleto()}",
                Movimiento::TIPO_INGRESO
            );

            $this->generarMovimiento($monto_comision, "Comisión adjudicada a lider {$lider->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);
        }

        if($coordinador = $lider->coordinador){
            
            $this->asginarComisionCoordinador($coordinador,$venta,$movimiento,$promotor);
        }
    }

    private function asginarComisionCoordinador(User $coordinador,Venta $venta,Movimiento $movimiento,User $promotor = null){

        $monto = number_format((float) $venta->monto, 2, '.', ',') . ' ' . $venta->divisa->iso;

        $rol_coordinador = (Rol::where('nombre', 'Coordinador')->first());

        if ($comision_coordinador = $rol_coordinador->comision) {
            $monto_comision = $movimiento->monto * $comision_coordinador->comision / 100;

            $coordinador->generarMovimiento(
                $monto_comision,
                "Comisión por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre}. El promotor quien realizó la reserva fue {$promotor->getNombreCompleto()}, del lider {$promotor->lider->getNombreCompleto()}",
                Movimiento::TIPO_INGRESO
            );

            $this->generarMovimiento($monto_comision, "Comisión adjudicada a coordinador {$coordinador->getNombreCompleto()}, por consumo de cliente {$venta->cliente->getNombreCompleto()} en el negocio {$venta->model->nombre} por un monto de: {$monto}.", Movimiento::TIPO_EGRESO);
        }
        
    }


    
    public function adjudicarComisiones($comision, Venta $venta){

        $monto = number_format((float) $venta->monto, 2, '.', ',') . ' ' . $venta->divisa->iso;
        
        // Le adjudicamos, la comision al sistema
        $movimiento = $this->generarMovimiento(
            $this->divisa->convertir($venta->divisa, $comision),
            "Consumo de cliente {$venta->cliente->nombre} {$venta->cliente->apellido} por un monto de:{$monto}.", 
            Movimiento::TIPO_INGRESO);
        
        // Adjudicar Comisiones a perfiles
        $this->asignarComisionPerfiles($venta,$movimiento);

        
    }
    


    public static function totalIngresoTienda(){
        $sistema = Sistema::first();

        $cuenta = $sistema->cuenta;

        
        return '$ '.number_format((float) ($cuenta->saldo * 25 / 100),2). ' '.$cuenta->divisa->iso;

    }

   
}
