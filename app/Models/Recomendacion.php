<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recomendacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'model_type',
        'model_id',
        'usuario_id'
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function model(){
        return $this->morphTo();
    }
    
}
