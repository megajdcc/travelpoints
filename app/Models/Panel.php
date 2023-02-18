<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario\Permiso;

class Panel extends Model
{
    use HasFactory;

    protected $fillable = [
        'panel',
    ];

    public function permisos(){
        return $this->hasMany(Permiso::class,'panel_id','id');
    }

}
