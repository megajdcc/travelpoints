<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'model_type',
        'model_id',
        'comentario'
    ];


    public function model(){
        return $this->morphTo();
    }

   public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
   }

}
