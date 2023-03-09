<?php 
namespace App\Trais;
use App\Models\EstadoCuenta;
use App\Models\Divisa;
use App\Models\Movimiento;

/**
 * 
 */
trait hasCuenta
{

   public function cuenta(){
      return $this->morphOne(EstadoCuenta::class, 'model');
   }

   public function aperturarCuenta($monto_apertura = null) : EstadoCuenta{

      $cuenta = EstadoCuenta::create([
         'saldo'      => 0,
         'model_type' => $this->model_type,
         'model_id'   => $this->id,
         'divisa_id'  => $this->divisa_id
      ]);

      $movimiento = $cuenta->movimientoApertura($monto_apertura);
      // $cuenta->saldo = $movimiento->balance;

      // $cuenta->save();

      $cuenta->divisa;
      $cuenta->model;
      $cuenta->movimientos;

      $this->refresh();

      return $cuenta;

   }


   public function generarMovimiento($monto, string $concepto, int $tipo_movimiento = Movimiento::TIPO_INGRESO) : Movimiento{


      $movimiento = Movimiento::add(
         cuenta: $this->cuenta,
         monto: $monto,
         concepto:$concepto,
         tipo_movimiento: $tipo_movimiento
      );

      $this->cuenta->save();

      return $movimiento;


   }


   

}


?>