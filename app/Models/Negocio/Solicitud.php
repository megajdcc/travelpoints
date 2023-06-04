<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\{Storage};
use App\Models\{User,Ciudad,Estado,Iata};
use App\Models\Divisa;


class Solicitud extends Model
{
    use HasFactory;

    public $estatus = [1 => "Enviada", 2 => "Desaprobada", 3  => "Aceptada", 4 => "Rechazada"];
    
    protected $fillable = [
        'nombre',
        'descripcion',
        'breve',
        'categoria_id',
        'comision',
        'tipo_comision',// 1 => Porcentaje, 2 => Monto fijo por persona 
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
        'situacion',// 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
        'comentario',
        'usuario_id',
        'divisa_id',
        'iata_id'

    ];

    protected $casts = [
        'comision' => 'float',
        'situacion' => 'integer',
        'tipo_comision' => 'integer'
    ];


    public function getMensage(int $situacion = 1){
        $mensajes = [
            1 => 'Tu Solicitud ha sido enviada con éxito',
            2 => "Tu Solicitud para que afiliemos al negocio {$this->nombre} ha sido desaprobada, debes cambiar alguna información importante y enviárnosla de nuevo para proceder a aceptar la misma",
            3 => "Tu solicitud para que afiliemos al negocio {$this->nombre} ha sido aceptada, puedes verificar tu panel de negocio y proceder a llenar la información importante",
            4 => "Lamentablemente tu solicitud para que afiliemos al negocio {$this->nombre} ha sido rechazada, pero no te desanimes puedes comunicarte con nostros y explicarnos porque quieres afiliar el negocio a nuestro sistema."
        ];

        return $mensajes[$situacion];
    }

    // public function logo(): Attribute{ 
    //     return Attribute::make(
    //         get:fn($val) => Storage::url("negocios/logos/{$val}")
    //     );
    // }

    // public function foto(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn ($val) => Storage::url("negocios/fotos/{$val}")
    //     );
    // }



    public function getEstatus(int $situation = 1):string{

        return $this->estatus[$situation];

    }

    /**
     * Una solicitud de negocio puede estar relacionada a una categoría de negocio
     */
    public function categoria() {
        return $this->belongsTo(NegocioCategoria::class,'categoria_id','id');
    }

    /**
     * Un negocio puede estar asociado a una ciudad
     */
    public function ciudad(){
        return $this->belongsTo(Ciudad::class,'ciudad_id','id');
    }

    /**
     * Un negocio puede estar asociado a un estado
     */
    public function estado()
    {
        return $this->belongsTo(Estado::class, 'estado_id', 'id');
    }

    /** 
     * Una solicitud la realizó un usuario
     */
    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }


    /**
     * Una solicitud tiene que tener una divisa con la que va a operar el Negocio
     */
    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }

    public function cargar(){
        $this->categoria;

        if ($this->usuario) {
            $this->usuario->avatar = $this->usuario->getAvatar();
        }

        $this->ciudad;
        $this->estado->pais;
        $this->divisa;
        $this->iata;
    }
    

}
