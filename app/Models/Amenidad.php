<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Negocio\Negocio;

class Amenidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];


    public function negocios(){
        return $this->belongsToMany(Negocio::class,'amenidad_negocio','amenidad_id','negocio_id');
    }


}
