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
use Illuminate\Support\Facades\{Hash};
use App\Trais\{hasCuenta, Has_roles, hasTelefonos};

use App\Models\Divisa;

use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Models\Usuario\Permiso;

class User extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;
    use Has_roles;
    use hasCuenta,hasTelefonos;


    public readonly string $model_type;

    public readonly int $divisa_id;



    public function __construct(
        string $model_type = 'App\Models\User')
    {
        $this->model_type = $model_type;
        $this->divisa_id = Divisa::where('principal',true)->first()->id;
        
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

    public function cargar(): User{

        
        $this->tokens;
        $this->rol->permisos;
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

        return $this;
    }


}
