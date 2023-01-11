<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasPermisos;


class Cargo extends Model
{
    use HasFactory,hasPermisos;

    public readonly string $model_type ;

    public function __construct()
    {
        $this->model_type = 'App\Models\Negocio\Cargo';
    }

    protected $fillable = [
        'cargo',
        'negocio_id'
    ];


    public function negocio(){
        return $this->belongsTo(Negocio::class,'negocio_id','id');
    }
    
}
