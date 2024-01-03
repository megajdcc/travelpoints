<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\hasImages;

class Publicacion extends Model
{
    use hasImages;
    use HasFactory;

    public readonly string $model_type;
    public readonly string $disk;


    public function __construct()
    {
        $this->model_type = 'App\Models\Publicacion';
        $this->disk = 'imagenes_publicaciones';

    }

    protected $fillable = [
        'titulo',
        'contenido',
        'model_id',
        'model_type'
    ];

    public function model(){
        return $this->morphTo();
    }


}
