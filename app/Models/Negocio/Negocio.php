<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\{HasDireccion,hasCuenta,hasImages,hasTelefonos,hasEvento, hasHorario, hasLike, hasOpinion,hasPermisos};
use App\Models\{Divisa, FormaPago, User,Iata};

use App\Models\Amenidad;

class Negocio extends Model
{
    use HasFactory;

    use HasDireccion,hasCuenta, hasImages, hasTelefonos, hasEvento,hasHorario,hasLike,hasOpinion, hasPermisos;

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


    public function cargos(){
        return $this->hasMany(Cargo::class,'negocio_id','id');
    }   

    public function empleados(){
        return $this->belongsToMany(User::class,'empleados','negocio_id','usuario_id')->withPivot(['cargo_id']);
    }


    public function primerCargo(String $cargo = 'Gerente')  : Cargo{
        
        $cargo = Cargo::create([
            'negocio_id' => $this->id,
            'cargo' => $cargo
        ]);

        return $cargo;
    }



    public function cargar() : Negocio{
        $this->telefonos;
        $this->imagenes;
        $this->cuenta;
        $this->categoria;
        $this->solicitud;
        $this->encargado;
        $this->divisa;
        $this->ciudad;
        $this->estado?->pais;
        $this->eventos;
        $this->iata;
        $this->horarios;
        $this->likes;
        $this->cargos->load('permisos.permiso');
        $this->empleados->load(['permisos','rol']);
        $this->amenidades;
        $this->formasPago;
        return $this;
    }
    

    /**
     * @param App\Models\User $empleado;
     * @param App\Models\Negocio\Cargo $cargo;
     * 
     * @return void;
     */
    public function asignarEmpleado(User $empleado,Cargo $cargo){
        $this->empleados()->attach($empleado->id,['cargo_id' => $cargo->id]);
    }

    public function amenidades()
    {
        $this->belongsToMany(Amenidad::class, 'amenidad_negocio', 'negocio_id', 'amenidad_id');
    }


    public function formasPago()
    {
        return $this->belongsToMany(FormaPago::class, 'formas_pago_negocio', 'negocio_id', 'forma_id');
    }


}
