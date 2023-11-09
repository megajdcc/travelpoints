<?php

namespace App\Models;

use App\Trais\hasTranslate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaProducto extends Model
{
    use HasFactory,hasTranslate;


    protected $fillable = [
        'nombre',
        'descripcion'
    ];


    public function productos()
    {
        return $this->hasMany(Producto::class, 'categoria_id', 'id');
    }




}
