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

    public function ciudades()
    {

        $estados = $this->estados;
        $ciudades = collect([]);

        foreach ($estados as $estado) {

            foreach ($estado->ciudades as $ciudad) {
                $ciudades->push($ciudad);
            }
        }

        return $ciudades;
    }

    
}
