<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\{HasDireccion,hasCuenta,hasImages,hasTelefonos,hasEvento, hasHorario, hasLike, hasOpinion};
use App\Models\{Divisa,User,Iata};

class Negocio extends Model
{
    use HasFactory;

    use HasDireccion,hasCuenta, hasImages, hasTelefonos, hasEvento,hasHorario,hasLike,hasOpinion;

    public readonly string $model_type;


    public $table = 'negocios';

    public function __construct()
    {
        $this->model_type = 'App\Models\Negocio\Negocio';
    }


    protected $fillable = [
        'nombre',
        'descripcion',
        'breve',
        'categoria_id',
        'comision',
        'tipo_comision', // 1 Porcentaje por venta, 2 Monto por Venta 
        'url',
        'sitio_web',
        'emails',
        'direccion',
        'codigo_postal',
        'ciudad_id',
        'estado_id',
        'lat',
        'lng',
        'logo',
        'vistas',
        'ultima_recarga',
        'floor_plan',
        'acepta_reservas',
        'status', // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
        'usuario_id',
        'solicitud_id',
        'iata_id',
        'divisa_id',

    ];


    public $casts = [
        'emails'          => 'array',
        'ultima_recarga'  => 'datetime: Y-m-d H: i: s',
        'floor_plan'      => 'boolean',
        'acepta_reservas' => 'boolean',
    ];



    public function categoria(){
        return $this->belongsTo(NegocioCategoria::class,'categoria_id','id');
    }
    
    /**
     * Un negocio es registrado gracias a una solicitud o no, puede que sea registrado directamente sin una solicitud
     */
    public function solicitud(){
        return $this->belongsTo(Solicitud::class,'solicitud_id','id');
    }

    /**
     * Un Negocio tiene un encargado, es quien envió la solicitud de afiliación...
     */
    public function encargado(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    /**
     * Un Negocio opera con una divisa en particular
     */
    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    /** 
     * Un negocio está asociado a un Iata si existiese 
     */
    public function iata(){
        return $this->belongsTo(Iata::class,'iata_id','id');
    }


}
