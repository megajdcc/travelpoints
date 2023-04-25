<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class EstadoCuenta extends Model
{
    use HasFactory;

    protected $fillable = [
        'saldo',
        'model_type',
        'model_id',
        'divisa_id'
    ];

    /** 
     * Una Cuenta esta en una divisa;
     */
    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    /** 
     * Una cuenta puede tener muchos movimientos...
     */
    public function movimientos(){
        return $this->hasMany(Movimiento::class,'estado_cuenta_id','id');
    }

    public function model(){
        return $this->morphTo();
    }

    public function movimientoApertura($monto_apertura = 3) : Movimiento{
    
      $movimiento = Movimiento::add(
        cuenta:$this,
        monto: $monto_apertura,
        concepto : 'Movimiento de apertura de cuenta', 
        tipo_movimiento: Movimiento::TIPO_INGRESO);

      return $movimiento;

    }



}
