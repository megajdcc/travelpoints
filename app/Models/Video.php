<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    public $fillable = [
        'nombre',
        'url',
        'youtube',
        'model_id',
        'model_type'
    ];

    public $casts = [
        'youtube' => 'boolean'
    ];

    public function model(){
        return $this->morphTo();
    }




}
