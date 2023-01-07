<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;
    

    protected $fillable = ['usuario_id','negocio_id','cargo_id'];
    

    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function cargo(){
        return $this->belongsTo(Cargo::class,'cargo_id','id');
    }
    

}
