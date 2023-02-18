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
        'model_id'
    ];


    public function model(){
        return $this->morphTo();
    }

}
