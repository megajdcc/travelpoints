<?php

namespace App\Models;

use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comision extends Model
{
    use HasFactory;

    protected $fillable = [
        'comision',
        'rol_id',
    ];

    public function rol(){
        return $this->belongsTo(Rol::class,'rol_id','id');
    }
    
}
