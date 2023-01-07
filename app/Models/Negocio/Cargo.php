<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    use HasFactory;

    protected $fillable = [
        'cargo',
        'negocio_id'
    ];


    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }
    
}
