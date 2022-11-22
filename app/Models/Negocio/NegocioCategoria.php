<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\{Storage,File};
use Illuminate\Http\UploadedFile;
class NegocioCategoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria',
        'descripcion',
        'imagen'
    ];


    /**
     * 
     * @return \Illuminate\Database\Eloquent\Casts\Attribute;
     */
    public function imagen(): Attribute{
            return Attribute::make(
                get: fn ($val) => $val ? Storage::url("negocios/categorias/{$val}") : null
            );

    }

    /**
     * Una categoria puede tener cero o muchas solicitudes de negocios
     */
    public function solicitudes(){
        return $this->hasMany(Solicitud::class,'categoria_id','id');
    }


}
