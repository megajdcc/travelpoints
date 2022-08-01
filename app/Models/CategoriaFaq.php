<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaFaq extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'icono'
    ];


    public function faqs(){
        return $this->hasMany(Faq::class,'categoria_id','id');
    }

    

}
