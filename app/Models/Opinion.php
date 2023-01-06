<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\{hasImages};

class Opinion extends Model
{
    use HasFactory;

    use hasImages;


    /**
     * 
     * Acompañates 
     * 1 => pareja
     * 2 => Familia (niños pequeños)
     * 3 => familia (Adolescentes)
     * 4  => Amigos
     * 5  => De Negocios
     * 6 =>  Solitario
     * 
     * Preguntas
     *  1 => Le recomendarias este lugar o actividad a un amigo que visite el lugar por primera vez ? 
     *  2 => ¿Esta atracción es una joya oculta o está fuera del circuito turístico?
     *  3 => ¿Es algo que no te puedes perder si viajas con un grupo grande (más de 5 personas)?
     *  4 => ¿Esta atracción es un buen lugar para visitar durante una luna de miel?
     *
     * */ 



    protected $fillable = [
        'calificacion',
        'opinion',
        'titulo',
        'asistencia',
        'acompanante',
        'certificacion',
        'preguntas',
        'model_id',
        'model_type',
        'usuario_id'
    ];


    protected $casts = [
        'certificacion' => 'boolean',
        'preguntas' => 'array'
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function model(){
        return $this->morphTo();
    }


}
