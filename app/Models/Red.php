<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Red extends Model
{
    use HasFactory;

    public $fillable = [
        'nombre',
        'model_id',
        'model_type',
        'icono',
        'url',
    ];


    public function model(){
        return $this->morphTo();
    }


    
}
