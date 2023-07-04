<?php

namespace App\Models\Negocio;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\{HasDireccion,hasCuenta,hasImages,hasTelefonos,hasEvento, hasHorario, hasLike, hasLocation, hasOpinion,hasPermisos,hasRedes, hasVenta, hasVideos,hasRecomendacion, hasSeguidores};
use App\Models\{Divisa, FormaPago, User,Iata};
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Models\Amenidad;
use App\Models\Sistema;


class Negocio extends Model
{
    use HasFactory;

    use HasDireccion,hasCuenta, hasImages, hasTelefonos, hasEvento,hasHorario,hasLike,hasOpinion, hasPermisos, hasRedes;
    use hasVideos,hasVenta,hasRecomendacion,hasSeguidores,hasLocation;

    public readonly string $model_type;
    public $saldo_apertura = 5;

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
        'comision', // Comision que paga el negocio a Travelpoints
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
        'precios', // [precio_minimo => 0,precio_maximo => 0]
        'tipo_menu', // 1 => URL , 2=> PDF 3 => image
        'menu',
        'tps_referido', // Comision en tps que se paga a los usuarios viajeros por consumir, es una propiedad se calcula convirtiendo la comision en su divisa a la divisa principal tps 
        
    ];

    public $casts = [
        'emails'          => 'array',
        'ultima_recarga'  => 'datetime: Y-m-d Hi:s',
        'floor_plan'      => 'boolean',
        'acepta_reservas' => 'boolean',
        // 'precios'         => 'object'
    ];


    public function precios():Attribute{
            return Attribute::make(
                get:fn($val) => $val ? json_decode($val) : ['precio_minimo' => 0,'precio_maximo' => 0],
                set:fn($val) => \json_encode($val)   
            );
    }

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
        
        $cargo = Cargo::updateOrCreate(
            ['negocio_id' => $this->id,'cargo' => $cargo],
            [
            'negocio_id' => $this->id,
            'cargo' => $cargo
        ]);

        $cargo->asignarPermisosDefault();
        return $cargo;
        
    }

    public function cargar() : Negocio{
        $this->telefonos;
        $this->imagenes;
       
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
        $this->redes;
        $this->videos;
        $this->modelType = $this->model_type;
        $this->cupones;
        $this->ventas->load(['opinions']);
        $this->opinions;
        $this->modelType = $this->model_type;
        $this->recomendaciones;
        $this->seguidores;
        // $this->precios = $this->precios ?: ['precio_minimo' => 0, 'precio_maximo' => 0];
        $this->cuenta?->divisa;
        
        if(!$this->cuenta){
            
            $sistema = Sistema::first();
            $sistema->cargar();
            
            $divisa_credito = Divisa::find($sistema?->negocio['divisa_id']) ?: $this->divisa;
            $saldo_apertura = $divisa_credito->convertir($this->divisa, ($sistema?->negocio['credito'] || 5));
            $this->aperturarCuenta($saldo_apertura);
            $this->cuenta;

        }
        return $this;
    }

    /**
     * @param App\Models\User $empleado;
     * @param App\Models\Negocio\Cargo $cargo;
     * 
     * @return void;
     */
    public function asignarEmpleado(User $empleado,Cargo $cargo){
        if(!$this->empleados->contains($empleado)){
            $this->empleados()->attach($empleado->id, ['cargo_id' => $cargo->id]);
        }
    }

    public function amenidades()
    {
        return $this->belongsToMany(Amenidad::class, 'amenidad_negocio', 'negocio_id', 'amenidad_id');
    }

    public function cupones(){
        return $this->hasMany(Cupon::class,'negocio_id','id');
    }

    public function formasPago()
    {
        return $this->belongsToMany(FormaPago::class, 'formas_pago_negocio', 'negocio_id', 'forma_id');
    }

    public function horarioReservacions(){
        return $this->hasMany(HorarioReservacion::class,'negocio_id','id');
    }

    public function reservaciones(){
        return $this->hasMany(Reservacion::class,'negocio_id','id');
    }


}
