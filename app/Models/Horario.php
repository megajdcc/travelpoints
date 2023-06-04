<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'dia',
        'apertura',
        'cierre',
        'model_type',
        'model_id',
        'doble_turno'
    ];

    public $casts = [
        'apertura' => 'array',
        'cierre' => 'array',
        'doble_turno' => 'boolean'
    ];

    public function model(){
        return $this->morphTo();
    }

}
