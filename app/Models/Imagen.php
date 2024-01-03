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
        'is_thumb',
        'is_gallery'
    ];


    public $casts = [
        'portada' => 'boolean',
        'logo' => 'boolean',
        'is_thumb' => 'boolean',
        'is_gallery' => 'boolean'
    ];


    public function model(){
        return $this->morphTo();
    }

}
