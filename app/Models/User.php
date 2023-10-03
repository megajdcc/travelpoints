<?php

namespace App\Models;

use App\Console\Commands\establecerNivel;
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
use App\Trais\{agendar, hasCuenta, Has_roles, hasTelefonos,hasCarrito};

use App\Models\Divisa;
use App\Models\Negocio\Cupon;
use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Models\Usuario\Permiso;
use App\Models\Usuario\Rol;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\{Collection,Str};
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use SebastianBergmann\Type\NullType;
use Illuminate\Database\Eloquent\Factories\Factory;

class User extends Authenticatable
{

    use HasApiTokens,HasFactory, Notifiable;
    use Has_roles;
    use hasCuenta,hasTelefonos,hasCarrito;
    use agendar;
    public string $model_type = 'App\models\User';
    public readonly int|null $divisa_id; 

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
        'coordinador_id',
        'tarjeta_id',
        'destino_id',
        'portada',
        'porcentaje_perfil',
        'lider_business',
        'comision_promotores',
        'locale', // default => es

         /**
          * Para el caso de los promotores el nivel 
          * [1 => Visitante (1 acti), 2 => Recomendador (100 activ), 3 => Promotor(500 acti) , 4 => Consul (1000 act) , 5 => Embajador (3000 activ)]
          * Es un Json [nivel => 0, activaciones  => 0]
          **/
        'nivel',
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
        'tps'               => 'float',
        'nivel'             => 'array',
        'lider_business' => 'boolean',
        'ultimo_login' => 'datetime'
    ];

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


    public function getPortada()
    {

        if (empty($this->portada)) {
            $this->portada = 'banner-travel.jpg';

            return asset('storage/img-portada/' . $this->portada);
        } else {
            return asset('storage/img-portada/' . $this->portada);
        }
    }

    public function getNombreCompleto(){

        if($this->nombre){
            return $this->nombre . ' ' . $this->apellido;
        }

        return $this->username;

      
    }

    public function rol(){
        return $this->belongsTo(Rol::class,'rol_id','id');
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

    public function consumos(){
        return $this->hasMany(Venta::class,'cliente_id','id');
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
        return $this->belongsToMany(Producto::class, 'carrito_productos', 'cliente_id', 'producto_id')->withPivot(['cantidad', 'precio_unitario', 'monto','tienda_id','vid']);
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


    public function getStatus(){

        $statuses = ['Activo','En peligro','Inactivo'];

        $status  = $this->getStatusUser();

        if($this->rol->nombre == 'Promotor'){

            if($status['referidos']['ultimo_mes'] > 0){
                return $statuses[0];
            }else if($status['referidos']['ultimo_trimestre'] > 0 ){
                return $statuses[1];
            }else{
                return $statuses[2];
            }

        }else if($this->rol->nombre == 'Lider'){

            if ($status['promotores_activos']['ultimo_mes'] > 0) {
                return $statuses[0];
            } else if ($status['promotores_activos']['ultimo_trimestre'] > 0) {
                return $statuses[1];
            } else {
                return $statuses[2];
            }

        }else if($this->rol->coordinador == 'Coordinador') {

            if ($status['lideres_activos']['ultimo_mes'] >= 10) {
                return $statuses[0];
            } else if ($status['lideres_activos']['ultimo_mes'] > 0) {
                return $statuses[1];
            } else {
                return $statuses[2];
            }

        }else{
            return $statuses[2];
        }
    }


    public function getStatusUser(): array
    {

        // Esto es para el promotor
        $referidos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        // Esto es para el lider
        $promotores_activos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        // Esto es para el coordinador
        $lideres_activos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        if ($this->rol->nombre    == 'Promotor') {
            $referidos_ultimo_mes = User::whereHas('referidor' ,function(Builder $q) {
                    $q->where('id',$this->id);
            })
            ->whereBetween('created_at',[now()->subMonth(), now()])
            ->count();

            $referidos_ultimo_trimestre = User::whereHas('referidor',function(Builder $q){
                $q->where('id',$this->id);
            })
            ->whereBetween('created_at',[now()->subDays(89), now()])
            ->count();

            $referidos['ultimo_mes']       = $referidos_ultimo_mes;
            $referidos['ultimo_trimestre'] = $referidos_ultimo_trimestre;
            
        } else if ($this->rol->nombre == 'Lider') {

        

            $activos_ultimo_mes = DB::table('users','u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
                ->join('users as promotor','ur.usuario_id','promotor.id')
                ->where('promotor.lider_id',$this->id)
                ->whereBetween('u.created_at',[now()->subMonth(),now()])
                ->count();

    


            $activos_ultimo_trimestre = DB::table('users', 'u')
            ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
            ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
            ->where('promotor.lider_id', $this->id)
            ->whereBetween('u.created_at', [now()->subMonths(3), now()])
            ->count();

            $promotores_activos['ultimo_mes'] = $activos_ultimo_mes;
            $promotores_activos['ultimo_trimestre'] = $activos_ultimo_trimestre;

        } else if ($this->rol->nombre == 'Coordinador') {

            $activos_ultimo_mes = 0;
            $activos_ultimo_trimestre = 0;

            foreach ($this->lideres as $key => $lider) {
                

                $activos_ultimo_mes = User::whereHas('rol',fn($q) => $q->where('nombre','Promotor'))
                        ->whereHas('referidos',function($query){
                                $query->whereBetween('usuario_referencia.created_at', [now()->subMonth(), now()])
                                    ->where('activo', true);
                                })
                        ->where('lider_id',$lider->id)
                        ->distinct()
                        ->count();
                    if($activos_ultimo_mes > 0){
                        $activos_ultimo_mes++;
                    }

                $activos_ultimo_trimestre= User::whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                ->whereHas('referidos', function ($query) {
                    $query->whereBetween('usuario_referencia.created_at', [now()->subMonths(3), now()])
                        ->where('activo', true);
                })
                    ->where('lider_id', $lider->id)
                    ->distinct()
                    ->count();
             

                if($activos_ultimo_trimestre > 0){
                    $activos_ultimo_trimestre++;
                }
            }

            $lideres_activos['ultimo_mes'] = $activos_ultimo_mes;
            $lideres_activos['ultimo_trimestre'] = $activos_ultimo_trimestre;
        }


        return ['referidos' => $referidos, 'promotores_activos' => $promotores_activos,'lideres_activos' => $lideres_activos];
    }

    public function getImagen(){
        return $this->imagen;
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

    function totalLideres()
    {

        $lideres_activos = DB::table('users', 'u')
        ->selectRaw('count(*) as lideres')
        ->where('u.coordinador_id', $this->id)
            ->where('u.activo', true)
            ->get('lideres')->first();


        $lideres_inactivos = DB::table('users', 'u')
            ->selectRaw('count(*) as lideres')
            ->where('u.coordinador_id', $this->id)
            ->where('u.activo', false)
            ->get('lideres')
            ->first();

        return ['lideres_activos' => $lideres_activos->lideres, 'lideres_inactivos' => $lideres_inactivos->lideres];
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

    /**
     * Un Usuario con el rol de Coordinador, puede tener muchos o ningunos lideres en red 
    */
    public function lideres(){
        return $this->hasMany(User::class,'coordinador_id','id');
    }


    public function totalPromotoresPorLider(){

        $consulta = DB::table('users as u')
        ->join('users as l', 'u.lider_id', '=', 'l.id')
        ->join('users as c', 'l.coordinador_id', '=', 'c.id')
        ->where('c.id', '=', $this->id)
        ->where('u.activo',true)
        ->groupBy('lider')
        ->select('l.nombre as lider', DB::raw('COALESCE(COUNT(u.id), 0) as promotores'))
        ->get();

        $consulta_2 = DB::table('users as u')
        ->join('users as l', 'u.lider_id', '=', 'l.id')
        ->join('users as c', 'l.coordinador_id', '=', 'c.id')
        ->where('c.id', '=', $this->id)
        ->where('u.activo', false)
        ->groupBy('lider')
        ->select('l.nombre as lider', DB::raw('COALESCE(COUNT(u.id), 0) as promotores'))
        ->get();



        $categorias = $this->lideres->map(fn($val) => $val->nombre);

        $data = collect([
            [
                'data' => collect([]),
                'name' => 'Activos'
            ],
            [
                'data' => collect([]),
                'name' => 'Inactivos'
            ]
        ]);


        $categorias->each(function($val) use($data,$consulta, $consulta_2){
            $valor_1 = $consulta->where('lider',$val)?->first()?->promotores ;
            $valor_2 = $consulta_2->where('lider', $val)?->first()?->promotores;
            $data[0]['data']->push($valor_1 | 0);
            $data[1]['data']->push($valor_2 | 0);
        });

    

        return ['categorias' => $categorias, 'data' => $data];

    }

    public function eficaciaViajerosPorPromotor($promotor_id = null){

        $promotores = DB::table('users as u')
        ->leftJoin('usuario_referencia as r', 'u.id', '=', 'r.usuario_id')
        ->leftJoin('users as vj', 'r.referido_id', '=', 'vj.id')
        ->leftJoin('ventas as v', 'v.cliente_id', '=', 'vj.id')
        ->join('users as l', 'u.lider_id', '=', 'l.id')
        ->join('users as c', 'l.coordinador_id', '=', 'c.id')
        ->where('c.id', '=', $this->id)
        ->when($promotor_id,function($q) use($promotor_id){
            $q->where('u.id', $promotor_id);
        })
        ->groupBy('u.id','u.nombre')
        ->select(
            'u.nombre as promotor',
            DB::raw('IFNULL(ROUND(COUNT(DISTINCT CASE WHEN v.cliente_id IS NOT NULL THEN v.cliente_id ELSE NULL END) / COUNT(DISTINCT r.referido_id) * 100, 2), 0) as porcentaje_eficacia')
        )
        ->get();


        $categorias = $promotores->map(fn($val) =>$val->promotor);
        $data = collect([]);

        $categorias->each(function ($val) use ($data,$promotores) {
            $valor_1 = $promotores->where('promotor', $val)?->first()?->porcentaje_eficacia;
            $data->push($valor_1 | 0);
        });


        return ['categorias' => $categorias,'data' => $data];

  

    }

    public function totalViajerosCoordinador($promotor_id = null){
        
        $viajeros = DB::table('users as u')
            ->select(
                'u.id as id_promotor',
                'u.nombre as promotor',
                DB::raw('SUM(CASE WHEN v.created_at BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) AND CURRENT_DATE() THEN 1 ELSE 0 END) as viajeros_ultimo_mes'),
                DB::raw('SUM(CASE WHEN v.created_at BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) THEN 1 ELSE 0 END) as viajeros_penultimo_mes'),
                DB::raw('SUM(CASE WHEN v.created_at BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 0 MONTH) AND DATE_SUB(CURRENT_DATE(), INTERVAL -1 MONTH) THEN 1 ELSE 0 END) as viajeros_mes_actual')
            )
            ->leftJoin('usuario_referencia as ur', 'u.id', '=', 'ur.usuario_id')
            ->leftJoin('users as v', 'ur.referido_id', '=', 'v.id')
            ->leftJoin('users as l', 'u.lider_id', '=', 'l.id')
            ->leftJoin('users as c', 'l.coordinador_id', '=', 'c.id')
            ->where('c.id',
                '=',
                $this->id
            )
            ->when($promotor_id, function($q) use($promotor_id){
                $q->where('u.id',$promotor_id);
            })
            ->groupBy('u.id', 'u.nombre')
            ->get();


        
        $categorias = $viajeros->map(fn($val) => $val->promotor);
            
        $data = [

            [
                'name' => 'Mes Actual',
                'data' => collect([])
            ],

            [
                'name' => 'Ultimo mes',
                'data' => collect([])
            ],
            [
                'name' => 'Penultimo mes',
                'data' => collect([])
            ]
           
        ];


        $categorias->each(function($val) use($data, $viajeros){
            
            if($promotor = $viajeros->where('promotor',$val)->first()){
                $data[0]['data']->push($promotor->viajeros_mes_actual);
                $data[1]['data']->push($promotor->viajeros_ultimo_mes);
                $data[2]['data']->push($promotor->viajeros_penultimo_mes);
            }
        });

        
        return ['categorias' => $categorias , 'data' => $data];

    }
    
    public function porcentajeViajerosLogin(){

        // $porcentaje = DB::table('users as u')
        //     ->join('usuario_referencia as ur', 'u.id', '=', 'ur.usuario_id')
        //     ->join('users as v', 'ur.referido_id', '=', 'v.id')
        //     ->join('users as l', 'u.lider_id', '=', 'l.id')
        //     ->join('users as c', 'l.coordinador_id', '=', 'c.id')
        //     ->where('c.id', $this->id)
        //     ->whereBetween('v.ultimo_login', [now()->subMonth(), now()])
        //     ->distinct('v.id')
        //     ->selectRaw('round(count(distinct(v.ultimo_login)) / count(distinct(v.id)) * 100, 2) as porcentaje')
        //     ->first()
        //     ->porcentaje;


        $total_viajeros = DB::table('users as u')
        ->join('usuario_referencia as ur', 'u.id', '=', 'ur.usuario_id')
        ->join('users as v', 'ur.referido_id', '=', 'v.id')
            ->join('users as l', 'u.lider_id', '=', 'l.id')
            ->join('users as c', 'l.coordinador_id', '=', 'c.id')
            ->where('c.id', '=', 17)
            ->whereBetween('v.ultimo_login', [Carbon::now()->subMonth(1), Carbon::now()])
            ->select(DB::raw('count(distinct(v.id)) as total_viajeros'))
            ->first();

        $porcentaje = DB::table('users as u')
        ->join('usuario_referencia as ur',
            'u.id',
            '=',
            'ur.usuario_id'
        )
        ->join('users as v', 'ur.referido_id', '=', 'v.id')
        ->join('users as l', 'u.lider_id', '=', 'l.id')
        ->join('users as c',
            'l.coordinador_id',
            '=',
            'c.id'
        )
        ->where('c.id', '=', 17)
        ->whereBetween('v.ultimo_login', [Carbon::now()->subMonth(1), Carbon::now()])
        ->select(DB::raw('round(count(distinct(v.ultimo_login)) / count(distinct v.id) * 100, 2) as porcentaje'))
        ->first();


           
        return ['porcentaje' => (float) $porcentaje->porcentaje, 'total_viajeros' => $total_viajeros->total_viajeros];

    }

    public function generateLink(){
        if(is_null($this->codigo_referidor) || empty($this->codigo_referidor)){
            $this->codigo_referidor = Str::slug($this->username);
            $this->save();
        }

        return $this;
    }

    public function asignarToken(){
        $this->token = ($this->createToken($this->nombre . '-' . $this->id))?->plainTextToken;
        $this->save();
        return $this;
    }

    public function postCreate(){
        $this->generateLink()
        ->asignarToken()
        ->asignarPermisosPorRol()
        ->aperturarCuenta(0,'Tp');
        return $this;
    }
    public function tarjeta(){
        return $this->belongsTo(Tarjeta::class,'tarjeta_id','id');
    }

    public function getFillPercentage()
    {   
        $arrays_except = [
            'password',
            'is_password',
            'token',
            'lenguaje',
            'activo',
            'ultimo_login',
            'lider_id',
            'coordinador_id',
            'tarjeta_id', 
            'porcentaje_perfil',
            'destino_id',
            'portada'
        ];
        $fillableProperties = (collect($this->getFillable()))->filter(fn($val) => !\array_search($val,$arrays_except));
        $fillableProperties->push('telefonos');

        $totalProperties = $fillableProperties->count();
        $filledProperties = 0;

        foreach ($fillableProperties as $property) {

            if($property == 'telefonos'){
                if($this->telefonos->count() > 0){
                    $filledProperties++;
                }
            }else if(!empty($this[$property])){
                $filledProperties++;
            }
            
        }

        $percentageFilled = ($filledProperties / $totalProperties) * 100;
        
        $this->porcentaje_perfil = $percentageFilled;
        $this->refresh();
        $this->update(['porcentaje_perfil' => $percentageFilled]);
      
        return $percentageFilled;
    }

    public function destino(){
        return $this->belongsTo(Destino::class,'destino_id','id');
    }   

    public function reunions(){
        return $this->hasMany(Reunion::class,'usuario_id','id');
    }

    public function establecerNivel() : bool{
        
        $result = false;

        if($this->rol->nombre == 'Promotor'){
            $referidos = $this->referidos->where('activo', true);
            
            $result =  $this->update(['nivel' => [
                'activaciones' => $referidos->count(),
                'nivel' => $this->getNivel($referidos->count())
            ]]);

        }

        return $result;

       
    }

    public function getNivel(int $activaciones) : int|null {
        $niveles = collect([1,100,500,1000,3000]);
        $nivel = null;

        if($activaciones < 1){
            return $nivel;
        }
        foreach ($niveles as $key => $n) {
          
            if($activaciones >= $n){
                $nivel = $key;
            }
        }
        return $nivel;
    }

    public function activacionesRestante(){
        $niveles = collect([1, 100, 500, 1000, 3000]);
        
        if(!is_null($this->nivel['nivel'])){
            return $niveles[$this->nivel['nivel'] + 1] - $this->nivel['activaciones'];
        }

        return 1;
    }

    public function getEfectividad(){

        $activos = DB::table('usuario_referencia as ur')
        ->join('users as u', 'ur.referido_id', '=', 'u.id')
        ->join('users as promotor', 'ur.usuario_id','promotor.id')
        ->join('ventas as v', 'u.id', '=', 'v.cliente_id')
        ->when($this->rol->nombre == 'Promotor',fn($q) => $q->where('promotor.id',$this->id))
        ->when($this->rol->nombre == 'Lider', fn ($q) => $q->where('promotor.lider_id', $this->id))
        ->select(DB::raw('COUNT(DISTINCT u.id) as activos'))
        ->first();

        // Accede al resultado
        $cantidadActivos = $activos->activos;

        return $cantidadActivos;

    }

    public function ultimaActivacion(){
        $fecha_ultima = $this->referidos->where('activo',true)->sortByDesc('created_at')->pluck('created_at')->first();
        return $fecha_ultima ? Carbon::now()->diffInDays($fecha_ultima) : 0;
    }


    public function ultimoRegistro(){
        $fecha_uiltimo_registro = $this->referidos->sortByDesc('created_at')->pluck('created_at')->first();
        return $fecha_uiltimo_registro ? Carbon::now()->diffInDays($fecha_uiltimo_registro) : 0;
    }


    /**
     * @return int cantidad de viajeros de un promotor o lider a traves de sus promotores que han usado el sistema
     */
    public function viajerosActivos() : int {
        $viajeros = User::whereHas('rol',fn($q) => $q->where('nombre','Viajero'))
                    ->whereHas('referidor',function(Builder $q){
                        $q->when($this->rol->nombre == 'Promotor',fn($query) => $query->where('id',$this->id))
                        ->when($this->rol->nombre == 'Lider',fn($query) => $query->where('lider_id',$this->id));
                    })
                    ->where('activo',true)
                    ->whereBetween('ultimo_login',[now()->subMonth(),now()])
                    ->count();

        return $viajeros;
    }

    public function viajerosActivosConsumo() :int{

        $viajeros =
        User::whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
        ->whereHas('consumos', fn (Builder $q) =>  $q->whereBetween('ultimo_login', [now()->subMonth(), now()]))
        ->whereHas('referidor', function (Builder $q) {
            $q->when($this->rol->nombre == 'Promotor', fn ($query) => $query->where('id', $this->id))
                ->when($this->rol->nombre == 'Lider', fn ($query) => $query->where('lider_id', $this->id));
        })
        
            ->where('activo', true)
            ->count();

        return $viajeros;
    }

    public function totalViajeros() : int{

        $viajeros = User::whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                        ->whereHas('referidor', function (Builder $q) {
                            $q->when($this->rol->nombre == 'Promotor', fn ($query) => $query->where('id', $this->id))
                                ->when($this->rol->nombre == 'Lider', fn ($query) => $query->where('lider_id', $this->id));
                        })
                        ->where('activo', true)
                        ->count();
        return $viajeros;
    }

    public function activacionesMes(){
        $referidos = User::whereHas('referidor',fn($q) => $q->where('id',$this->id))->where('activo',true)
        ->whereBetween('created_at',[now()->subMonth(),now()])
        ->count();
        return $referidos;

    }   

    public function allPromotores(Collection|NullType $searchs = null,array $filtro = [])
    {   
        $primer_dia = null;
        $ultimo_dia = null;

        if(isset($filtro['mes']) && !empty($filtro['mes'])){
            $primer_dia = (new Carbon(new \DateTime($filtro['mes'])))->firstOfMonth();
            $ultimo_dia = (new Carbon(new \DateTime($filtro['mes'])))->lastOfMonth();
        }
        $resultado = User::when($this->rol->nombre == 'Lider',fn($q)  => $q->where('lider_id', $this->id))
            ->when($this->rol->nombre == 'Coordinador', function($q) {
                $q->whereHas('lider',function($query) {
                    $query->where('coordinador_id',$this->id);
                });
            })
            ->withCount(['referidos as total_viajeros_registrados' => function ($query) use ($primer_dia, $ultimo_dia) {
                    $query->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                        $q->whereBetween('usuario_referencia.created_at', [$primer_dia, $ultimo_dia]);
                    });
                },
                'referidos as total_viajeros_activos' => function ($query) use ($primer_dia, $ultimo_dia) {
                    $query->where('activo', true)
                        ->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                            $q->whereBetween('usuario_referencia.created_at', [$primer_dia, $ultimo_dia]);
                        });
                },
                'referidos as total_viajeros_activos_mes' => function ($query) use ($primer_dia, $ultimo_dia) {
                    $query->where('activo', true)
                        ->when(is_null($primer_dia) && is_null($ultimo_dia), function ($q) {
                            $q->whereBetween('usuario_referencia.created_at', [now()->firstOfMonth(), now()->lastOfMonth()]);
                        })
                        ->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                            $q->whereBetween('usuario_referencia.created_at', [$primer_dia, $ultimo_dia]);
                        });
                }
            ])
            ->with(['referidos' => function ($query) use ($primer_dia, $ultimo_dia) {
                $query->where('activo', true)
                    ->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                        $q->whereBetween('usuario_referencia.created_at', [$primer_dia, $ultimo_dia]);
                    })
                    ->orderBy('usuario_referencia.created_at', 'desc')
                    ->take(1); // Obtener solo el primer resultado (última fecha)
            }])
            ->where(fn ($q) => $searchs->each(fn ($s) => $q->orWhere($s, 'LIKE', "%{$filtro['q']}%", 'OR')))
            ->orderBy($filtro['sortBy'], $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 1000);

        


       return $resultado;
    }

    public function allLideres(Collection|NullType $searchs = null,array $filtro = []){

        $primer_dia = null;
        $ultimo_dia = null;
        if (isset($filtro['mes']) && !empty($filtro['mes'])) {
            $primer_dia = (new Carbon(new \DateTime($filtro['mes'])))->firstOfMonth();
            $ultimo_dia = (new Carbon(new \DateTime($filtro['mes'])))->lastOfMonth();
        }
        $resultado = User::where('coordinador_id', $this->id)
            ->addSelect([
                'comision' => EstadoCuenta::join('movimientos as m','estado_cuentas.id','m.estado_cuenta_id')
                                ->selectRaw('sum(m.monto) as comision')
                                ->where('model_type',"App\\Models\\User")
                                ->whereColumn('model_id','users.id')
                                ->where('m.concepto','!=', 'Conversión de divisa')
                                ->where('tipo_movimiento', Movimiento::TIPO_INGRESO)
                                
            ])
            ->withCount([
                'promotores as total_promotores' => function ($query) use ($primer_dia, $ultimo_dia) {
                    $query->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                        $q->whereBetween('created_at', [$primer_dia, $ultimo_dia]);
                    });
                }
            ])
            ->with(['promotores' => function ($query) use ($primer_dia, $ultimo_dia) {
                $query->where('activo', true)
                ->when(!is_null($primer_dia) && !is_null($ultimo_dia), function ($q) use ($primer_dia, $ultimo_dia) {
                    $q->whereBetween('created_at', [$primer_dia, $ultimo_dia]);
                })
                    ->orderBy('created_at', 'desc')
                    ->take(1); // Obtener solo el primer resultado (última fecha)
            }])
            ->where(fn ($q) => $searchs->each(fn ($s) => $q->orWhere($s, 'LIKE', "%{$filtro['q']}%", 'OR')))
            ->orderBy($filtro['sortBy'], $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 1000);
        

        return $resultado;


    }


    public function invitaciones(){
        return $this->hasMany(Invitacion::class,'usuario_id','id');
    }

    public function toggleLider(int $lider_nuevo) :bool{
        
        return $this->update([
            'lider_id' => $lider_nuevo
        ]);

    }

    public function cargar(): User{
        $this->porcentaje_perfil = $this->getFillPercentage();
        $this->tokens;
        $this->rol?->permisos;
        $this->rol?->academia->load('videos');
        $this->habilidades = $this->getHabilidades();
        $this->avatar = $this->getAvatar();
        $this->portada = $this->getPortada();
        $this->ciudad?->estado?->pais;
        $this->cuenta;
        $this->cuenta?->divisa;
        $this->telefonos;
        $this->likes;
        foreach ($this->negocios as $key => $negocio) {
            $negocio->descripcion = '';
        }
       
        $this->solicitudes;
        $this->destino;
        // $this->faqs;

        if($this->referidor){
            $this->referidor->first()?->cargar();
        }

        $this->referidos;
        $this->permisos;
        $this->reservaciones;
        $this->reservacionesOperadas;
        $this->recomendaciones;
        $this->seguidos;
        $this->cupones->each(fn($cupon) => $cupon->cargar());
        $this->carritoCompra;
        $this->datosPago?->cargar();
        $this->retiros;
        $this->lider?->cargar();
        $this->promotores;
        $this->coordinador?->cargar();

        $this->lideres;
       
        $this->tarjeta?->lote;
        $this->reunions;
        $this->consumos;

        if($this->rol->nombre == 'Promotor'){
            $this->ultimaActivacion = $this->ultimaActivacion();
            $this->totalActivaciones = $this->nivel['activaciones'];
            $this->totalRegistros = $this->referidos->count();
            $this->ultimoRegistro = $this->ultimoRegistro();
            $this->activaciones = [
                'acumulada' => $this->nivel['activaciones'],
                'mes' => $this->activacionesMes(),
                'promedio' => $this->nivel['activaciones'] > 0 ? $this->activacionesMes() * 100 / $this->nivel['activaciones'] : 0
            ];
        }

        $this->invitaciones;

        return $this;
    }


}
