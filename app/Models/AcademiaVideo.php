<?php

namespace App\Models;

use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Trais\hasVideos;

class AcademiaVideo extends Model
{
    use HasFactory;

    public readonly  string  $model_type;

    public function __construct()
    {
        $this->model_type = 'App\Models\AcademiaVideo';
    }

    public $fillable = [
        'descripcion',
        'titulo',
    ];


    public function roles(){
        return $this->belongsToMany(Rol::class,'var','video_academia_id','rol_id');
    }

    public function videos(){
        return $this->belongsToMany(Video::class,'vav','video_academia_id','video_id');
    }

    
}
