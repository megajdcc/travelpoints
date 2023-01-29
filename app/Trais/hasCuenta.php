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

   public function aperturarCuenta() : EstadoCuenta{

      $cuenta = EstadoCuenta::create([
         'saldo'      => 0,
         'model_type' => $this->model_type,
         'model_id'   => $this->id,
         'divisa_id'  => $this->divisa_id
      ]);

      $movimiento = $cuenta->movimientoApertura();
      // $cuenta->saldo = $movimiento->balance;

      // $cuenta->save();

      $cuenta->divisa;
      $cuenta->model;
      $cuenta->movimientos;

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