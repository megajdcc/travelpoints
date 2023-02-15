<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguidor extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'model_type',
        'model_id',
    ];

    public function model(){
        return $this->morphTo();
    }

    
}
