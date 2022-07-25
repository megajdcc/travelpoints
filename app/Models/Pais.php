<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;

    protected $table = 'pais';

    protected $fillable = [
        'codigo',
        'lada',
        'pais'
    ];

    public function estados()
    {
        return $this->hasMany(Estado::class, 'pais_id', 'id');
    }
    
}
