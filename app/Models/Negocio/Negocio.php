<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\{Ciudad,Estado};

class Negocio extends Model
{
    use HasFactory;


    protected $fillable = [
        'nombre',
        'descripcion',
        'breve',
        'categoria_id',
        'comision',
        'tipo_comision', // 1 Porcentaje por venta, 2 Monto por Venta 
        'url',
        'email',
        'telefono',
        'sitio_web',
        'direccion',
        'codigo_postal',
        'ciudad_id',
        'estado_id',
        'lat',
        'lng',
        'logo',
        'foto',
        'situacion',
        'comentario',
        'usuario_id',
        
    ];

    public function categoria(){
        return $this->belongsTo(NegocioCategoria::class,'categoria_id','id');
    }

    
    public function ciudad(){
        return $this->belongsTo(Ciudad::class,'ciudad_id','id');
    }

    public function estado(){
        return $this->belongsTo(Estado::class,'estado_id','id');
    }


}
