<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    use HasFactory;


    protected $fillable = [
        'ciudad',
        'estado_id',

    ];


    public function estado(){
        return $this->belongsTo(Estado::class);
    }

    /** 
     * En una ciudad pueden vivir muchos usuarios o no 
     */
    public function usuarios(){
        return $this->hasMany(User::class,'ciudad_id','id');
    }

    
}
