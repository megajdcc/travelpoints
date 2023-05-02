<?php 
namespace App\Trais;
use App\Models\EstadoCuenta;
use App\Models\Divisa;
use App\Models\Movimiento;
use App\Models\Sistema;
use App\Models\User;

/**
 * 
 */
trait hasCuenta
{

   public function cuenta(){
      return $this->morphOne(EstadoCuenta::class, 'model');
   }

   public function aperturarCuenta($monto_apertura = 0, string $divisa_iso = null) : EstadoCuenta{

      if($divisa_iso){
         $div = Divisa::where('iso',$divisa_iso)->first()->id;
      }

      $cuenta = EstadoCuenta::create([
         'saldo'      => 0,
         'model_type' => $this->model_type,
         'model_id'   => $this->id,
         'divisa_id'  => isset($div) ? $div : $this->divisa_id
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
         tipo_movimiento: $tipo_movimiento,
      );

      $this->cuenta->save();

      return $movimiento;


   }

   public function changeDivisa(Divisa $divisa = null) :Movimiento|User|bool|null{

      if(!is_null($divisa)){
         $saldo  = $this->cuenta->saldo;
         $new_saldo = $this->cuenta->divisa->convertir($divisa,$saldo);

         $this->cuenta->divisa_id = $divisa->id;
         $this->cuenta->save();

         $movimiento = Movimiento::add(
            cuenta: $this->cuenta,
            monto: $new_saldo,
            tipo_movimiento: Movimiento::TIPO_INGRESO,
            concepto: 'Conversión de divisa',
         );

         $this->cuenta->saldo = $new_saldo;
         $this->cuenta->save();

         return $movimiento;
      }

      return false;
   }

   public function removerSaldo(string $concepto = 'Consignación de saldo por cuenta desactivada' )
   {
      
      $saldo =  $this->cuenta->saldo;

      if ($saldo > 0) {

         $movimiento = $this->generarMovimiento($saldo, 'Remoción de saldo, desactivación de cuenta.', Movimiento::TIPO_EGRESO);
         // Cuenta Sistema | adjudicar saldo removido a usuario;
         $sistema = Sistema::first();
         $sistema->generarMovimiento($saldo, $concepto, Movimiento::TIPO_INGRESO);

      }

   }


   

}


?>