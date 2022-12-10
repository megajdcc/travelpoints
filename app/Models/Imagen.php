<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    use HasFactory;

    protected $fillable = [
        'imagen',
        'portada',
        'logo',
        'model_id',
        'model_type',
    ];

    public $attributes = [
        'portada' => false,
        'logo' => false
    ];


    public $casts = [
        'portada' => 'boolean',
        'logo' => 'boolean'
    ];


    public function model(){
        return $this->morphTo();
    }

}
