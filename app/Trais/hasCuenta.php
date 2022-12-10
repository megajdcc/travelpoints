<?php 
namespace App\Trais;
use App\Models\EstadoCuenta;
use App\Models\Divisa;

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
      $cuenta->saldo = $movimiento->balance;

      $cuenta->save();

      $cuenta->divisa;
      $cuenta->model;
      $cuenta->movimientos;

      return $cuenta;

   }


   

}


?>