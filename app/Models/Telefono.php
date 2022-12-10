<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Telefono extends Model
{
    use HasFactory;

    protected $fillable = [
        'telefono',
        'model_id',
        'model_type',
        'is_whatsapp',
        'principal'

    ];

    protected $casts = [
        'is_whatsapp' => 'boolean',
        'principal' => 'boolean',
    ];

    protected $attributes = [
        'is_whatsapp' => false,
        'principal' => false
    ];


    public function model(){
        return $this->morphTo();
    }
    
}
