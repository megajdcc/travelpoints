<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $fillable = [
        'estado_cuenta_id',
        'monto',
        'tipo_movimiento',  // 1 => Ingreso, 2 => egreso
        'balance',
        'concepto',
        'divisa_id'
    ];

    public const TIPO_INGRESO = 1;
    public const TIPO_EGRESO = 2;

    public $attributes = [
        'tipo_movimiento' => 1,
    ];

    /**
     * Un movimiento pertenece a una Cuenta
     */
    public function cuenta(){
        return $this->belongsTo(EstadoCuenta::class,'estado_cuenta_id','id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public static function add(EstadoCuenta $cuenta,$monto, $concepto = 'Apertura de cuenta', int $tipo_movimiento = 1,bool $conversion = false) : Movimiento  {
        
        if($conversion){
            $movimiento =  Movimiento::create([
                'estado_cuenta_id' => $cuenta->id,
                'monto'            => $monto,
                'tipo_movimiento'  => $tipo_movimiento,
                'balance'          => $monto,
                'concepto' => $concepto,
                'divisa_id' => $cuenta->divisa_id ?: null
            ]);
        }else{
            $movimiento =  Movimiento::create([
                'estado_cuenta_id' => $cuenta->id,
                'monto'            => $monto,
                'tipo_movimiento'  => $tipo_movimiento,
                'balance'          => $tipo_movimiento == 1 ? $cuenta->saldo + $monto : $cuenta->saldo - $monto,
                'concepto' => $concepto,
                'divisa_id' => $cuenta->divisa_id ?: null
            ]);
        }
       

        $cuenta->saldo = $movimiento->balance;
        $cuenta->save();
        return $movimiento;
        

    }

    public function cargar(){
        $this->cuenta->model;
        $this->cuenta->divisa;
        $this->divisa;
        $this->_cellVariants =  ['monto' => $this->tipo_movimiento == 1 ? 'success' : 'danger', 
                                "balance" => $this->balance < 0 ? 'danger' : 'success'];
    }



}
