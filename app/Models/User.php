<?php

namespace App\Models;

use App\Models\Negocio\Solicitud;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Trais\HasDireccion;

use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\Channel;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\{DB, Hash};
use App\Trais\{hasCuenta, Has_roles, hasTelefonos,hasCarrito};

use App\Models\Divisa;
use App\Models\Negocio\Cupon;
use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Models\Usuario\Permiso;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class User extends Authenticatable
{

    use HasApiTokens,HasFactory, Notifiable;
    use Has_roles;
    use hasCuenta,hasTelefonos,hasCarrito;
    public readonly string $model_type;
    public readonly int $divisa_id;

    public function __construct(
        string $model_type = 'App\Models\User')
    {
        $this->model_type = $model_type;

        $roles = collect(['Promotor','Lider','Coordinador']);

        $this->divisa_id = Divisa::where('principal', true)->first()->id;

       

    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'nombre',
        'apellido',
        'bio',
        'website',
        'fecha_nacimiento',
        'genero' , // 1 => Masculino, 2 => femenino
        'codigo_postal',
        'activo', // activo o no valor booleano
        'imagen',
        'direccion',
        'email',
        'password',
        'is_password',
        'rol_id',
        'token',
        'lenguaje', // 1 => es
        'twitter',
        'facebook',
        'instagram',
        'ultimo_login',
        'ciudad_id' ,
        'codigo_referidor',
        'lider_id',
        'coordinador_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_password'       => 'boolean',
        'activo'            => 'boolean',
        'tps'               => 'float'
    ];


    // protected $attributes = [
    //     'activo' => true,
    // ];


    // public function genero():Attribute{

    //     return Attribute::make(
    //         get:fn($val) => $val,
    //         set:fn($val) => $val == 'Masculino' ? 1 : 2,
    //     );

    // }

    public function password(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => $val,
            set: fn ($val) => Hash::make($val),
        );
    }


    public function getUrlAvatar(){

            if(is_null($this->imagen)){
                return asset('/storage/img-perfil/default.jpg');
            }else{
                return asset('/storage/img-perfil/'.$this->imagen);
            }
        
        // return app('url').'/storage/img-perfil/'.$this->imagen;
        
    }

   

    public function getAvatar(){
        
        if(empty($this->imagen)){
            $this->imagen = 'default.jpg';

            return asset('storage/img-perfil/'.$this->imagen);
        }else{
             return asset('storage/img-perfil/'.$this->imagen);
        }

    }

    public function getNombreCompleto(){

        if($this->nombre){
            return $this->nombre . ' ' . $this->apellido;
        }

        return $this->username;

      
    }

    public function rol(){
        return $this->belongsTo('App\Models\Usuario\Rol','rol_id','id');
    }

    public function permisos(){
        return $this->belongsToMany(Permiso::class,'usuario_permisos','usuario_id','permiso_id')->withPivot(['action']);
    }

    public function getTokenText(){
        return $this->token;
    }

    public static function getUsuarios($filter){

        // return User::orderBy($filter['sortBy'])
        //             ->take($filter['perPage'])

    }


    public function getFullName(){
        return $this->nombre . ' '. $this->apellido; 
    }

    /**
     * Un usuario vive en una ciudad 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ciudad(){
        return $this->belongsTo(Ciudad::class,'ciudad_id','id');
    }

    /** 
     * Un usuario puede tener muchos referidos 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany;
     */
    public function referidos(){
        return $this->belongsToMany(User::class,'usuario_referencia','usuario_id','referido_id')->withPivot('codigo');
    }

    /**
     * Un usuario puede ser referido por otro usuario (referidor)
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany; 
     */
    public function referidor(){
        return $this->belongsToMany(User::class,'usuario_referencia','referido_id','usuario_id')->withPivot('codigo');
    }

    public function faqs(){
        return $this->hasMany(Faq::class,'usuario_id','id');
    }


    /**
     * Un usuario puede estar relacionada con  cero o muchas solicitudes de negocios 
     */
    public function solicitudes()
    {
        return $this->hasMany(Solicitud::class, 'usuario_id', 'id');
    }

    public function likes(){
        return $this->hasMany(Like::class,'usuario_id','id');
    }

    public function negocios(){
        return $this->belongsToMany(Negocio::class,'empleados','usuario_id','negocio_id')->withPivot(['cargo_id']);
    }


    public function reservaciones()
    {
        return $this->hasMany(Reservacion::class, 'usuario_id', 'id');
    }


    public function reservacionesOperadas()
    {
        return $this->hasMany(Reservacion::class, 'operador_id', 'id');
    }   


    public function recomendaciones(){
        return $this->hasMany(Recomendacion::class,'usuario_id','id');

    }

    public function seguidos()
    {
        return $this->hasMany(Seguidor::class, 'usuario_id', 'id');
    }   


    public function cupones(){
        return $this->belongsToMany(Cupon::class,'cupon_usuario','usuario_id','cupon_id')->withPivot(['status']);
    }


    public function carritoCompra()
    {
        return $this->belongsToMany(Producto::class, 'carrito_productos', 'cliente_id', 'producto_id')->withPivot(['cantidad', 'precio_unitario', 'monto','tienda_id']);
    }

    public function datosPago(){
        return $this->hasOne(DatosPagos::class,'usuario_id','id');
    }


    public function retiros(){
        return $this->hasMany(Retiro::class,'usuario_id','id');
    }

    public function lider(){
        return $this->belongsTo(User::class,'lider_id','id');

    }

    public function promotores(){
        return $this->hasMany(User::class,'lider_id','id');
        
    }

    public function getStatusUser(): array
    {
        $referidos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        $promotores_activos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        if ($this->rol->nombre == 'Promotor') {
            $referidos_ultimo_mes =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)', [':usuario' => $this->id])
                ->selectRaw('count(ur.referido_id) as referidos')
                ->first('referidos');

            $referidos_ultimo_trimestre =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 89 DAY)', [':usuario' => $this->id])
                ->selectRaw('count(ur.referido_id) as referidos')
                ->first('referidos');

            $referidos['ultimo_mes'] = $referidos_ultimo_mes->referidos;
            $referidos['ultimo_trimestre'] = $referidos_ultimo_trimestre->referidos;
        } else if ($this->rol->nombre == 'Lider') {

            $activos_ultimo_mes =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.lider_id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)', [':usuario' => $this->id])
                ->selectRaw('count(distinct(ur.usuario_id)) as promotores')
                ->first('referidos');

            $activos_ultimo_trimestre =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.lider_id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 89 DAY)', [':usuario' => $this->id])
                ->selectRaw('count(distinct(ur.usuario_id)) as promotores')
                ->first('referidos');

            $promotores_activos['ultimo_mes'] = $activos_ultimo_mes->promotores;
            $promotores_activos['ultimo_trimestre'] = $activos_ultimo_trimestre->promotores;
        }


        return ['referidos' => $referidos, 'promotores_activos' => $promotores_activos];
    }

    function totalPromotores(){
        
        $promotores_activos = DB::table('users','u')
                                ->selectRaw('count(*) as promotores')
                                ->where('u.lider_id',$this->id)
                                ->where('u.activo',true)
                                ->get('promotores')->first();


        $promotores_inactivos = DB::table('users', 'u')
        ->selectRaw('count(*) as promotores')
        ->where('u.lider_id', $this->id)
            ->where('u.activo', false)
            ->get('promotores')
            ->first();
            
            return ['promotores_activos' => $promotores_activos->promotores,'promotores_inactivos' => $promotores_inactivos->promotores];
    }

    public function eficaciaPromotores() : Array|Null{

        $promotores = collect([]);

        $data = collect([
            [
                'name' => 'Viajeros',
                'data' => collect([])
            ],
            [
                'name' => 'Viajeros Activos',
                'data' => collect([])
            ]
        ]);
        
        $this->promotores->each(function($val) use($promotores,$data){
            $promotores->push($val->getNombreCompleto());

            $viajeros_promotor = DB::table('users', 'u')
                ->selectRaw('count(*) as viajeros')
                ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
                ->where('ur.usuario_id', $val->id)->get('viajeros')->first()->viajeros;

                
            $viajeros_activos = 
            DB::table('users', 'u')
                ->selectRaw('count(distinct(u.id)) as viajeros')
                ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
                ->join('ventas as v','u.id','v.cliente_id')
                ->where('ur.usuario_id', $val->id)->get('viajeros')->first()->viajeros;

            $data[0]['data']->push($viajeros_promotor);
            $data[1]['data']->push($viajeros_activos);

        });


        return [
            'promotores' => $promotores,
            'data' => $data
        ];
        
    }


    public function viajerosUltimoMes() : int{
        $result = 0;

        $result = DB::table('users', 'u')
        ->selectRaw('count(distinct(u.id)) as viajeros_ultimo_mes')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->where('ur.usuario_id', $this->id)
        ->whereRaw('u.created_at between DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 2 MONTH) + interval 1 day AND DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 1 MONTH)')
        ->get('viajeros_ultimo_mes')->first()->viajeros_ultimo_mes;


        return $result;
    }

    public function viajerosPenultimoMes(): int
    {
        $result = 0;

        $result = DB::table('users', 'u')
        ->selectRaw('count(distinct(u.id)) as penultimo_mes')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->where('ur.usuario_id', $this->id)
        ->whereRaw('u.created_at between DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 3 MONTH) + interval 1 day AND DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 2 MONTH)')
        ->get('penultimo_mes')
        ->first()->penultimo_mes;


        return $result;
    }

    public function viajerosMesPresente(): int
    {
        $result = 0;

        $result = DB::table('users', 'u')
        ->selectRaw('count(distinct(u.id)) as mes_presente')
        ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
        ->where('ur.usuario_id', $this->id)
        ->whereRaw('u.created_at between DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 1 MONTH) + interval 1 day AND LAST_DAY(CURDATE())')
        ->get('mes_presente')
        ->first()->mes_presente;

        return $result;
    }



    public function porcentajeEficacia(){
        $referidos = DB::table('usuario_referencia as ur')
        ->selectRaw('COUNT(DISTINCT ur.referido_id) AS total_referidos, 
                            COUNT(DISTINCT v.cliente_id) AS total_clientes,
                            COUNT(DISTINCT v.cliente_id) / COUNT(DISTINCT ur.referido_id) * 100 AS porcentaje_clientes')
        ->join('users as u', 'ur.usuario_id', '=', 'u.id')
            ->leftJoin('users as lider', 'u.lider_id', '=', 'lider.id')
            ->leftJoin('ventas as v', function ($join) {
                $join->on('ur.referido_id', '=', 'v.cliente_id')
                ->whereBetween('v.created_at', [now()->startOfMonth(), now()]);
            })
            ->where('lider.id', $this->id)
            ->groupBy('lider.id')
            ->first();

        if ($referidos) {
            $porcentaje = $referidos->porcentaje_clientes;
        } else {
            $porcentaje = 0;
        }


        return $porcentaje;

    }

    public function porcentajeEficaciaPromotores(){

       $porcentajes =  DB::table('users as u')
            ->leftJoin('usuario_referencia as ur', 'ur.usuario_id', '=', 'u.id')
            ->leftJoin('ventas as v', function($join) {
                    $join->on('v.cliente_id', '=', 'ur.referido_id')
                        ->whereBetween('v.created_at', [Carbon::now()->startOfMonth(), Carbon::now()]);
            })
            ->select('u.id as promotor_id', DB::raw('COUNT(DISTINCT ur.referido_id) as total_referidos'))
            ->selectRaw('COUNT(DISTINCT v.cliente_id) as total_clientes')
            ->selectRaw('IFNULL(COUNT(DISTINCT v.cliente_id) / COUNT(DISTINCT ur.referido_id) * 100, 0) as porcentaje_clientes')
            ->where('u.lider_id', $this->id)
            ->groupBy('u.id')
            ->get();

        $promotores =collect([]);


        $data = collect([]);
        
        foreach($this->promotores  as $promotor){
            $promotores->push($promotor->getNombreCompleto());

            $porcentaje = $porcentajes->where('promotor_id',$promotor->id)->first()->porcentaje_clientes;

            $data->push((float) $porcentaje);
        }

        return ['promotores' => $promotores,'data' => $data];
    }

    /*
        Un lider puede tener o no un coordinador...
    */
    public function coordinador(){
        return $this->belongsTo(User::class,'coordinador_id','id');
    }

    /*
    Un Usuario con el rol de Coordinador, puede tener muchos o ningunos lideres en red 
    */
    public function lideres(){
        return $this->hasMany(User::class,'coordinador_id','id');
    }
    
    public function cargar(): User{
        $this->tokens;
        $this->rol?->permisos;
        $this->habilidades = $this->getHabilidades();
        $this->avatar = $this->getAvatar();
        $this->ciudad?->estado?->pais;
        $this->cuenta?->divisa;
        $this->cuenta?->movimientos;
        $this->telefonos;
        $this->likes;
        $this->negocios;
        $this->solicitudes;
        $this->faqs;
        $this->referidor;
        $this->referidos;
        $this->permisos;
        $this->reservaciones;
        $this->reservacionesOperadas;
        $this->recomendaciones;
        $this->seguidos;
        $this->cupones;
        $this->carritoCompra;
        $this->datosPago?->cargar();
        $this->retiros;
        $this->lider?->cargar();
        $this->promotores;
        $this->coordinador;
        $this->lideres;

        return $this;
    }


}
