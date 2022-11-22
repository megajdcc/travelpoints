<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divisa extends Model
{
    use HasFactory;



    public  $fillable = [
        'nombre',
        'iso',
        'simbolo',
        'principal',
        'tasa' 
    ];

    public  $casts = [
        'principal' => 'boolean'
    ];

}
