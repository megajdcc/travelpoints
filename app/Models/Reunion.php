<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'usuario_id',
        'model_id',
        'model_type',
        'fecha_inicio',
        'fecha_fin',
        'status',// 1 > activo 2 => vencido 3 => prorrateado,
        'recurrente',
        'recurrencia',
        'all_dia',
        'tipo_recurrencia',
        'archivo',
        'nota',
        'estado', // 0 => sin confirmar, 1 =>confirmada,2 => cancelada
        'participantes', // [nombre,telefono,mail]
        'recordatorio', // [telefono,email,participantes,nota]
        'tipo', // [1 => recordatorio, 2 => tarea, 3 => evento]
    ];


    protected $casts = [
        'recurrente'    => 'boolean',
        'recurrencia'   => 'array',
        'all_dia'       => 'boolean',
        'participantes' => 'array',
        'recordatorio'  => 'array'
    ];


    public function model()
    {
        return $this->morphTo();
    }

    /**
     * Una reunion pertenece a un usuario
     */
    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }


    public function cargar(){
        $this->model;
        $this->usuario;
        return $this;
    }

}
