<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Notification;
use App\Notifications\WelcomeUsuario;
use Illuminate\Support\Facades\{Hash, Auth, File, Storage, Validator, DB, Mail};
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Exception;
use Datatables;
use App\Events\{UsuarioCreado};
use App\Models\Destino;
use App\Models\Divisa;
use App\Notifications\CuentaDesactivada;
use Illuminate\Validation\Rules\RequiredIf;
use App\Models\Usuario\Rol;
use Illuminate\Support\Str;
use App\Models\Telefono;

use App\Models\Like;
use App\Models\Movimiento;
use App\Models\Negocio\Cargo;
use App\Models\Pais;
use App\Models\Panel;
use App\Models\Producto;
use App\Models\Tarjeta;
use App\Models\Usuario\Permiso;
use App\Models\Venta;
use App\Notifications\NuevaAsignacionCoordinador;
use App\Notifications\NuevaAsignacionLider;
use App\Notifications\nuevoAmigo;
use App\Notifications\validarVentaTarjeta;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Collection;
use Barryvdh\DomPDF\Facade\Pdf;

class UserController extends Controller
{
    

    public function fetchDataViajeros(Request $request){

        $filtro = $request->all();
        $usuario = $request->user();

        $searchs = collect(['username','nombre','apellido','email','bio','direccion','fecha_nacimiento']);

        $pagination = User::where(fn(Builder $q) => $searchs->each(fn($s) => $q->orWhere($s,'LIKE',"%{$filtro['q']}%",'OR')))
        ->when(\in_array($usuario->rol->nombre,['Coordinador']), function(Builder $q) use ($usuario){
            $q->whereHas('referidor',function($query) use($usuario){
                $query->whereHas('lider', fn($que) => $que->where('coordinador_id' , $usuario->id));
            });
        })
         ->when(\in_array($usuario->rol->nombre,['Lider']), function(Builder $q) use ($usuario){
            $q->whereHas('referidor',function($query) use($usuario){
                $query->where('lider_id',$usuario->id);
            });
        })
        ->orderBy($filtro['sortBy'] ?: 'id',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage'] ?: 1000);

        $viajeros = collect($pagination->items())->each(fn($viajero) => $viajero->cargar()); // cargamos toda la data del viajero


        return response()->json([
            'total' => $pagination->total(),
            'viajeros' => $viajeros
        ]);
    }

    public function getUsuario(User $usuario)
    {
        $usuario->cargar();
        return response()->json($usuario);
    }


    private function validar(Request $request, User $usuario = null)
    {
        return $request->validate([
            'username'         => ['required', $usuario ? Rule::unique('users', 'username')->ignore($usuario) : 'unique:users,username'],
            'nombre'           => 'nullable',
            'apellido'         => 'nullable',
            'email'            => ['required', $usuario ? Rule::unique('users', 'email')->ignore($usuario)   : 'unique:users,email'],
            'direccion'        => 'nullable',
            'fecha_nacimiento' => 'nullable',
            'rol_id'           => 'required',
            'website'          => 'nullable',
            'twitter'          => 'nullable',
            'facebook'         => 'nullable',
            'instagram'        => 'nullable',
            'genero'           => 'nullable',
            'codigo_postal'    => 'nullable',
            'ciudad_id'        => 'nullable',
            'codigo_referidor' => 'nullable',
            'bio'              => 'nullable',
            'destino_id'       => 'nullable',
            'lider_business'   => 'nullable'
        ], [
            'username.unique' => 'El nombre de usuario ya está siendo usado, inténta con otro',
            'email.unique'    => 'El email ya está siendo usado, el mismo debe ser único',
            'rol_id.required' => 'El rol es importante no lo olvides',
            'email.required'  => 'Este campo es obligatorio',
            'email.email'     => 'El email no es valido por favor verifique',
            'email.unique'    => 'El email debe ser único ya otro usuario lo esta usando.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $datos = $this->validar($request);

        $user_register  = $request->user();

        try {
            DB::beginTransaction();
            $usuario = $this->crearUsuario($datos);

            if ($user_register->rol->nombre == 'Promotor') {
                
                $user_register->referidos()->attach($usuario->id, [
                    'codigo' => $user_register->codigo_referidor ?: 'no_aplica',
                    'created_at' => now(),
                ]);

                $user_register->establecerNivel();
            }

            $usuario->notify((new WelcomeUsuario($usuario))->locale($usuario->es));
            DB::commit();
            $usuario->cargar();

            $result = true;
        } catch (Exception $e) {


            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'usuario' => ($result) ? $usuario : null]);
    }

    public function nuevoUsuario(Request $request)
    {

        $datos = $request->validate([
            'username'       => 'required|unique:users,username',
            'nombre'         => 'required',
            'apellido'       => 'required',
            'email'          => 'required|unique:users,email',
            'password'       => 'required|min:6',
            'retypePassword' => 'required|same:password',
            'referidor'      => 'nullable'
        ], [
            'username.required' => 'El nombre de usuario es importante',
            'username.unique' => 'El nombre de usuario ya está siendo usado inténte con otro',
            'password.required' => 'La contraseña es importante no lo olvides',
            'password.min' => 'La contraseña debe tener mínimo 6 caracteres',
            'retypePassword.required' => 'La contraseña es importante no lo olvides',
            'retypePassword.same' => 'La contraseñas deben ser iguales',
            'email.unique' => 'Este email, ya está registrado en nuestra base de datos, inténte con otro'
        ]);


        try {
            DB::beginTransaction();
            $usuario = User::create([
                'username'    => Str::slug($datos['username']),
                'nombre' => $datos['nombre'],
                'apellido' => $datos['apellido'],
                'email'       => $datos['email'],
                'password'    => $datos['password'],
                'is_password' => true,
                'rol_id' => Rol::where('nombre', 'Viajero')->first()->id
            ]);

            $usuario->asignarPermisosPorRol();


            if ($datos['referidor'] && $datos['referidor'] != 'null') {

                $usuario_referidor = User::where('codigo_referidor', $datos['referidor'])->first();

                if ($usuario_referidor){
                    $usuario->referidor()->attach($usuario_referidor->id, [
                        'codigo' => $datos['referidor'],
                        'created_at' => now()
                    ]);
                }

                // Notificar al usuario referidor del nuevo amigo
                $usuario_referidor->notify(new nuevoAmigo($usuario));
                $usuario_referidor->establecerNivel();
            }

            $usuario->cargar();

            $result = true;

            $usuario->notify((new WelcomeUsuario($usuario))->locale($usuario->locale));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'usuario' => $result ? $usuario : null]);
    }


    /**
     * [crearUsuario description]
     * @param  Array  $datos [Los datos del nuevo usuario a crear ]
     * @return [App\User]        [El usuario creado]
     */
    public function crearUsuario(array $datos): User
    {

        $usuario = User::create([...$datos, ...['password' => '20464273jd']]);
        $usuario->asignarPermisosPorRol();

        if (in_array($usuario->rol->nombre, ['Promotor', 'Lider', 'Coordinador'])) {
            $usuario->aperturarCuenta(0, 'USD');
        } else {
            $usuario->aperturarCuenta();
        }

        $usuario->cargar();
        return $usuario;
    }

    public function validarDatos(Request $request, User $usuario = null): array
    {

        $datos = $request->validate([
            'username'         => ['required', !is_null($usuario) ? Rule::unique('users', 'username')->ignore($usuario) : 'unique:users,username'],
            'nombre'           => 'required',
            'apellido'         => 'nullable',
            'email'            => ['required', !is_null($usuario) ? Rule::unique('users', 'email')->ignore($usuario) : 'unique:users,email'],
            'direccion'        => 'nullable',
            'fecha_nacimiento' => 'nullable',
            'rol_id'           => 'required',
            'website'          => 'nullable',
            'twitter'          => 'nullable',
            'facebook'         => 'nullable',
            'instagram'        => 'nullable'

        ], [
            'nombre.required' => 'El nombre es importante',
            'email.unique'    => 'El email ya está siendo usado, el mismo debe ser único',
            'username.unique' => 'El nombre de usuario ya está siendo usado, inténta con otro'

        ]);

        return $datos;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $usuario)
    {

        $datos = $this->validar($request, $usuario);

        try {
            DB::beginTransaction();

            $usuario->removeRole();
            $usuario->update($datos);

            $usuario->asignarPermisosPorRol();

            DB::commit();

            $usuario->cargar();

            $result = true;

        } catch (Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'usuario' => $usuario]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $usuario)
    {

        try {
            DB::beginTransaction();
            $usuario->delete();
            DB::commit();
            $result = true;
        } catch (Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function perfil(Request $request)
    {
        return view('admin.usuario.perfil');
    }

    public function getUsuarios()
    {
        return response()->json(User::where('activo',true)->get()->each(fn ($val) => $val->cargar()));
    }

    public function getLideres()
    {

        $lideres = User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Lider'))->get();

        $lideres->each(fn ($val) => $val->cargar());
        return response()->json($lideres);
    }

    public function getCoordinadores()
    {

        $coordinadores = User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Coordinador'))->get();

        $coordinadores->each(fn ($val) => $val->cargar());
        return response()->json($coordinadores);
    }

    public function EstablecerContrasena(Request $request, User $usuario)
    {

        $datos = $request->validate([
            'password' => 'required|min:6',
            'password_confirmation' => 'same:password'
        ], [
            'password.required'     => 'La contraseña es importante no la olvides.',
            'password.min'          => 'La contraseña tiene que tener minimo 6 caracteres.',
            'password_confirmation.same' => 'Las contraseñas no son iguales verifica.'
        ]);

        try {

            DB::beginTransaction();

            $usuario->password = $datos['password'];
            $usuario->is_password = true;
            $usuario->save();

            DB::commit();

            $result = true;
            $status = 'Se ha establecido la contraseña de forma éxitosa. ';
        } catch (Exception $e) {
            DB::rollBack();
            $result = false;

            $status = 'No se pudo establecer la contraseña, vuelva a intentarlo mas tarde.';
        }


        return response()->json(['result' => $result, 'status' => $status]);
    }

    /**
     *Usado para autenticar manualmente al usuario
     * 
     * @param [App\user $usuario]
     * @param [Illuminate\Http\Request $request]
     */
    private function autenticar(User $usuario, Request $request)
    {

        $credenciales = ['email' => $usuario->email, 'password' => $request->get('contrasena')];

        if (Auth::attempt($credenciales)) {

            if ($usuario->roles->contains(function ($val, $i) {
                return ($val->name == 'Desarrollador' || $val->name == 'Administrador');
            })) {
                return  redirect()->route('home');
            } else {
                redirect('/home');
            }
        }
    }

    public function updatePerfil(Request $request, User $usuario)
    {

        $result =  $usuario->update($this->validar($request, $usuario));
        $user = User::find($usuario->id);

        $user->tokens;
        $user->cargar();
        $user->habilidades = $user->getHabilidades();
      
        return response()->json(['result' => $result, 'usuario' => $user]);
    }

    public function uploadAvatar(Request $request)
    {

        $usuario = $request->user();

        $avatar = $request->file('filepond');

        if ($usuario->imagen) {
            Storage::disk('img-perfil')->delete($usuario->imagen);
        }

        try {

            $avatarName = sha1(Carbon::now() . $usuario->id) . '.' . $avatar->getClientOriginalExtension();
            $result = Storage::disk('img-perfil')->put($avatarName, File::get($avatar));
            $usuario->imagen = $avatarName;
            $usuario->save();
        } catch (\Exception $e) {
            dd($e->getMessage());
        }

        return response()->json(\url($usuario->getAvatar()));
    }


    public function togglePortada(Request $request, User $usuario)
    {

        $portada = $request->file('portada');

        if ($usuario->portada) {
            Storage::disk('img-portada')->delete($usuario->portada);
        }

        try {
            DB::beginTransaction();


            $portadaName = sha1($portada->getClientOriginalName()) . '.' . $portada->getClientOriginalExtension();
            $result = Storage::disk('img-portada')->put($portadaName, File::get($portada));
            $usuario->portada = $portadaName;
            $usuario->save();

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'portada' => \url($usuario->getPortada())]);
    }

    public function actualizarAvatarUsuario(Request $request, User $usuario)
    {


        $avatar = $request->file('filepond');

        if ($usuario->imagen) {
            Storage::disk('img-perfil')->delete($usuario->imagen);
        }

        $avatarName = sha1(Carbon::now() . $usuario->id) . '.' . $avatar->getClientOriginalExtension();
        Storage::disk('img-perfil')->put($avatarName, File::get($avatar));

        $usuario->imagen = $avatarName;
        $usuario->save();

        return response()->json($usuario->getAvatar());
    }

    public function changePassword(Request $request, User $usuario)
    {



        $data = $request->validate([
            'contrasenaAnterior' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->password)) {
                    $fail('Su contraseña no coincide con la actual');
                }
            }],
            'contrasenaNueva'     => 'required|min:6',
            'retypePassword' => 'required|same:contrasenaNueva'
        ], [
            'contrasenaAnterior.required' => 'Su contraseña es requeridad para poder actualizarla',
            'contrasenaNueva.required'    => 'Su nueva contraseña es obligatoria',
            'contrasenaNueva.min'         => 'Su contraseña debe ser mayor a 6 caracteres',
            'retypePassword.same'         => 'La contraseñas no son iguales'
        ]);


        try {
            DB::beginTransaction();
            $usuario->password = $data['contrasenaNueva'];

            $usuario->save();

            $usuario->cargar();

            DB::commit();

            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' =>  $result, 'usuario' => $usuario]);
    }

    public function perfilDatos()
    {

        $usuario = Auth::user();

        $datos = [
            'nombre'           => $usuario->nombre,
            'apellido'         => $usuario->apellido,
            'telefono'         => $usuario->telefono,
            'direccion'        => $usuario->direccion,
            'email'            => $usuario->email,
            'rol'              => $usuario->rol,
            'avatar'           => asset('storage/img-perfil/' . $usuario->imagen),
            'fecha_nacimiento' => $usuario->fecha_nacimiento,
            'id'               => $usuario->id,
        ];
        return response()->json($datos);
    }

    public function refresh()
    {

        $usuario = User::find(Auth::id());

        $data = [
            'avatar' => $usuario->getAvatar(),
            'usuario' => $usuario,
        ];

        return response()->json($data);
    }

    public function getUsers(Request $request)
    {

        $datos = $request->all();
        $usuario = $request->user();

        $paginator = User::where([
            ['username', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
            ->when(isset($datos['role']), function ($query) use ($datos) {
                $query->where('rol_id', $datos['role'] ? $datos['role'] : '>', 0);
            })
            ->when(!in_array($request->user()->rol->nombre, ['Desarrollador', 'Administrador']), function ($query) {
                $query->whereHas('rol', fn (Builder $q) => $q->whereNotIn('nombre', ['Desarrollador', 'Administrador']));
            })
            ->when(in_array($request->user()->rol->nombre, ['Promotor']), function ($query) use ($usuario) {
                $query->whereHas('referidor', function (Builder $q) use ($usuario) {
                    $q->where('usuario_id', $usuario->id);
                });
            })

            ->orderBy($datos['sortBy'], $datos['sortDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage'],pageName: 'currentPage');

        $usuarios = collect($paginator->items())->each(function($user){
            $user->porcentajePerfil = $user->getFillPercentage();
            $user->portada = $user->getPortada();
            // $user->tokens;
            $user->rol?->permisos;
            // $user->rol?->academia->load('videos');
            $user->habilidades = $user->getHabilidades();
            $user->avatar = $user->getAvatar();
            $user->ciudad?->estado?->pais;
            $user->cuenta;
            $user->cuenta?->divisa;
            $user->telefonos;
            $user->likes;

            // $user->solicitudes;
            // $user->destino;
            $user->referidor;
            $user->referidos;
            $user->permisos;
            // $user->reservaciones;
            // $user->reservacionesOperadas;
            // $user->recomendaciones;
            // $user->seguidos;
            // $user->cupones->each(fn ($cupon) => $cupon->cargar());
            // $user->carritoCompra;
            $user->datosPago?->cargar();
            $user->retiros;
            $user->lider?->cargar();
            $user->promotores;
            $user->coordinador;
            $user->lideres;
          
            $user->tarjeta?->lote;
            
        });


        return response()->json([
            'users' => $usuarios,
            'total' => $paginator->total()
        ]);
    }

    public function desactivarCuenta(Request $request)
    {

        $v = Validator::make($request->all(), [
            'mensaje' => 'required',
            'contrasena' => ['required', function ($attribute, $value, $fail) use ($request) {
                if (!Hash::check($value, $request->user()->password)) {
                    $fail('La contraseña no coincide con la actual');
                }
            }],
        ], [
            'mensaje.required' => 'El mensaje es importante, no lo olvides',
        ])->validate();


        $result = $request->user()->update(['activo' => false]);

        Notification::send(
            User::whereHas('rol', fn (Builder $q) => $q->whereIn('nombre', ['Desarrollador', 'Administrador']))->get(),
            new CuentaDesactivada($request->user(), $v['mensaje'])
        );

        // Quitar saldo y ponerselo al sistema Travel, solo si el usuario es Promotor, Lider o Coordinador;
        $usuario = $request->user();

        if (in_array($usuario->rol->nombre, ['Promotor', 'Lider', 'Coordinador']) && !$usuario->activo) {
            // Si el usuario Lider, tiene promotores a su disposición al darse de baja pierde esa red de promotores
            $usuario->promotores->each(function ($val) {
                $val->lider_id = null;
                $val->save();
            });

            $usuario->removerSaldo("Consignación de saldo por cuenta desactivada a {$usuario->rol->nombre} - {$usuario->getNombreCompleto()}");
        }

        return response()->json(['result' => $result]);
    }


    public function agregarTelefono(Request $request, User $usuario)
    {

        $datos =  $request->validate([
            'id'          => 'nullable',
            'telefono'    => 'required',
            'is_whatsapp' => 'required',
            'principal'   => 'required',
        ]);

        try {
            DB::beginTransaction();

            if (isset($datos['id'])) {
                $telefono = $usuario->actualizarTelefono($datos);
            } else {
                $telefono = $usuario->addTelefono($datos);
            }


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }
        return response()->json(['result' => $result, 'telefono' => $result ? $telefono : null]);
    }

    public function quitarTelefono(Request $request, Telefono $telefono)
    {

        try {
            DB::beginTransaction();

            $telefono->delete();

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function crearLinkReferidor(Request $request, User $usuario)
    {

        $datos = $request->validate([
            'codigo_referidor' => 'required|unique:users,codigo_referidor'
        ], [
            'codigo_referidor.required' => 'El código es importante no lo olvides',
            'codigo_referidor.unique' => 'El código de referidor ya está siendo usuario por otro usuario, inténta con otro...'
        ]);

        $result = $usuario->update($datos);

        $usuario->tokens;
        $usuario->habilidades = $usuario->getHabilidades();

        $usuario->cargar();

        return response()->json(['result' => $result, 'usuario' => $usuario]);
    }

    public function verificarCodigo(string $codigo)
    {

        $usuario = User::where('codigo_referidor', $codigo)->first();

        return response()->json(['result' => $usuario ? true : false]);
    }

    public function misReferidos(Request $request)
    {

        $datos = $request->all();
        $paginator = DB::table('usuario_referencia', 'ur')
            ->selectRaw("concat(u.nombre,' ',u.apellido) as nombre_completo, u.id,u.username,u.imagen")
            ->join('users as u', 'ur.referido_id', 'u.id')
            ->where('ur.usuario_id', $datos['usuario_id'])
            ->orderBy('u.id', 'desc')
            ->paginate($datos['perPage'],pageName:'currentPage');


        // $usuarios = collect($paginator->items())->each(fn($val) => $val->cargar());
        $usuarios = $paginator->items();

        foreach ($usuarios as $key => $usuario) {
            if (empty($usuario->imagen)) {
                $usuario->imagen =  asset('storage/img-perfil/default.jpg');
            } else {
                $usuario->imagen =  asset('storage/img-perfil') .'/'.$usuario->imagen;
            }

            // $usuario->cargar();


        }

        return response()->json([
            'usuarios' => $usuarios,
            'total' => $paginator->total(),
        ]);
    }


    public function toggleLike(Request $request, User $usuario)
    {

        try {

            DB::beginTransaction();
            $datos = $request->all();

            if ($like = Like::where([
                ['usuario_id', $usuario->id],
                ['model_id', $datos['model_id']],
                ['model_type', $datos['model_type']]
            ])->first()) {
                $like->delete();
            } else {

                $like = Like::create([
                    'usuario_id' => $usuario->id,
                    'model_id'   => $datos['model_id'],
                    'model_type' => $datos['model_type'],
                    'comentario' => ''
                ]);
            }



            DB::commit();
            $result  = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }

        $likes = $usuario->likes;

        return response()->json(['result' => $result, 'likes' => $result ? $likes : null]);
    }


    public function searchUser(Request $request)
    {

        $query = $request->get('q');

        $usuarios = User::where([
            ['nombre', 'LIKE', "%{$query}%", "OR"],
            ['apellido', 'LIKE', "%{$query}%", "OR"],
            ['email', 'LIKE', "%{$query}%", "OR"],
            ['username', 'LIKE', "%{$query}%", "OR"],
        ])
            ->get();

        foreach ($usuarios as $usuario) {
            $usuario->cargar();
        }


        return response()->json($usuarios);
    }


    public function getCarrito(User $usuario)
    {

        $carrito_productos = $usuario->carritoCompra;

        $carrito_productos->load(['opinions', 'imagenes', 'categoria', 'tiendas', 'divisa']);

        return response()->json($carrito_productos);
    }

    public function sacarProductoCarrito(User $usuario, Producto $producto)
    {

        $result = $usuario->sacarProducto($producto);

        return response()->json(['result' => $result]);
    }


    public function addProductoCarrito(Request $request)
    {


        $result = $request->user()->addProducto(

            $request->validate([
                'tienda_id'       => 'nullable',
                'producto_id'     => 'required',
                'monto'           => 'required',
                'precio_unitario' => 'required',
                'cantidad'        => 'required',
                'cliente_id'      => 'nullable',
                'vid'             => 'nullable',
                'isChino'         => 'nullable'
            ])
        );

        return response()->json([
            'result' => $result,
            'carrito' => $request->user()->carritoCompra
        ]);
        
    }

    public function fetchDataCarrito(Request $request)
    {

        $datos = $request->all();

        $response = $request->user()->fetchDataCarrito($datos);

        return response()->json($response);
    }

    public function getStatus(Request $request, User $usuario = null)
    {
        $user = $usuario ?? $request->user();
        $resultado = $user->getStatusUser();

        
        $total_usuarios =  User::when($user->rol->nombre == 'Promotor',function($q) use($user) {
                $q->whereHas('referidor',fn($query) => $query->where('id',$user->id));
        })
        ->when($user->rol->nombre == 'Lider',function($q) use($user){
            $q->whereHas('referidor', fn($query) => $query->where('lider_id', $user->id)); 
        })
        ->where('activo',true)
        ->get()
        ->count();

        $total_usuarios_activos = DB::table('users','u')
                                        ->join('usuario_referencia as ur','u.id','ur.referido_id')
                                        ->join('ventas as v', 'u.id', 'v.cliente_id')
                                        ->join('users as promotor', 'ur.usuario_id', 'promotor.id')
                                        ->when($user->rol->nombre == 'Promotor',fn($q) => $q->where('promotor.id',$user->id))
                                        ->when($user->rol->nombre == 'Lider',fn($q) => $q->where('promotor.lider_id',$user->id))
                                        ->where('u.activo',true)
                                        ->whereBetween('v.created_at',[now()->subDays(89),now()])
                                        ->selectRaw("count(distinct(u.id)) as usuarios")
                                        ->pluck('usuarios')
                                        ->first();
        return response()->json([
            'status' => $resultado,
            'totalViajeros' => $total_usuarios,
            'totalViajerosActivos' => $total_usuarios_activos
        ]);
        
    }



    public function changeDivisa(Request $request, User $usuario)
    {

        try {
            DB::beginTransaction();
            $usuario->changeDivisa(Divisa::find($request->get('divisa')));
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
            dd($th->getMessage());
        }

        $usuario->fresh();
        $usuario->cargar();

        return response()->json(['result' => $result, 'usuario' => $usuario]);
        
    }

    public function cambiarStatus(Request $request,User $usuario)
    {
        try {
            DB::beginTransaction();
            $usuario->activo = !$usuario->activo;
            $usuario->save();

            DB::commit();
            $result = true;

            if(\in_array($request->user()->rol->nombre,['Desarrollador','Administrador'])){
                // Quitar saldo y ponerselo al sistema Travel, solo si el usuario es Promotor, Lider o Coordinador;
                if (in_array($usuario->rol->nombre, ['Promotor', 'Lider', 'Coordinador']) && !$usuario->activo) {
                    $usuario->removerSaldo("Consignación de saldo por cuenta desactivada a {$usuario->rol->nombre} - {$usuario->getNombreCompleto()}");
                }
            }

           
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }
        $usuario->cargar();

        return response()->json(['result' => $result, 'usuario' => $usuario]);
    }


    public function fetchDataPromotores(Request $request)
    {
        $filtro = $request->all();
        $rol_user = $request->user()->rol->nombre;

        $filas = collect(['username', 'email', 'nombre', 'apellido','direccion', 'fecha_nacimiento', 'codigo_postal', 'bio']);

        $pagination = User::select([
            'id',
            'username',
            'imagen',
            DB::raw('CONCAT(nombre, " ", apellido) AS nombre'),
            DB::raw('COALESCE(JSON_UNQUOTE(JSON_EXTRACT(nivel, "$.nivel")), 0) AS nivel'),
            DB::raw('COALESCE(JSON_UNQUOTE(JSON_EXTRACT(nivel, "$.activaciones")), 0) AS activaciones'),
            'email'
        ])
        ->addSelect([
                'users.*',
                'comision' => function ($query) {
                $query->select(DB::raw('SUM(monto) as total_comision'))
                    ->from('movimientos')
                    ->join('estado_cuentas', 'movimientos.estado_cuenta_id', '=', 'estado_cuentas.id')
                    ->where('estado_cuentas.model_type', 'App\\Models\\User')
                    ->whereColumn('estado_cuentas.model_id', 'users.id')
                    ->where('movimientos.tipo_movimiento', 1)
                    ->where('movimientos.concepto', '!=', 'Conversión de divisa');
            }
        ])
        ->addSelect([
            'comision_mes' => function ($query) {
                $query->select(DB::raw('SUM(monto) as total_comision'))
                    ->from('movimientos as m')
                    ->join('estado_cuentas as ec', 'm.estado_cuenta_id', '=', 'ec.id')
                    ->where('ec.model_type', 'App\\Models\\User')
                    ->whereColumn('ec.model_id', 'users.id')
                    ->where('m.tipo_movimiento', 1)
                    ->where('m.concepto', '!=', 'Conversión de divisa')
                    ->whereBetween('m.created_at',[now()->subMonth(), now()]);
            }
        ])

        ->where(fn($q) => $filas->each(fn($fila) => $q->orWhere($fila,'LIKE',"%{$filtro['q']}%")))
        ->whereHas('rol',fn($q) => $q->where('nombre','Promotor'))

         ->when((isset($filtro['lider']) && !is_null($filtro['lider']) && in_array($rol_user, ['Lider', 'Coordinador'])), function ($q) use ($filtro, $rol_user, $request) {
                $q->where('users.lider_id', $filtro['lider']);
         })
        ->when((isset($filtro['lider']) && !is_null($filtro['lider']) && in_array($rol_user, ['Desarrollador', 'Administrador'])), function ($q) use ($filtro, $rol_user, $request) {
                $usuario = User::find($filtro['lider']);

                if($usuario->rol->nombre == 'Lider'){
                    $q->where('users.lider_id',$filtro['lider']);
                }else if($usuario->rol->nombre == 'Coordinador'){
                    $q->whereHas('lider', fn($query) => $query->where('users.coordinador_id',$filtro['lider']));
                }

            })
            ->when(!isset($filtro['lider']) && is_null($filtro['lider']), function(Builder $q) use($filtro,$rol_user,$request) {

                if($rol_user == 'Coordinador'){
                    $q->whereHas('lider', fn($query) => $query->where('coordinador_id',$request->user()->id));
                }
            })
            ->with(['rol.permisos'])
            ->orderBy($filtro['sortBy'] ?: 'comision',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 1000);

        $promotores = collect($pagination->items());

        foreach ($promotores as $promotor) {
            
            $promotor->cuenta?->divisa;
            $status_user = $promotor->getStatusUser();
            $promotor->portada = $promotor->getPortada();
            $promotor->avatar = $promotor->getAvatar();
            $promotor->destino;
            $promotor->lider?->cargar();
    
            if ($status_user['referidos']['ultimo_mes'] > 0) {
                $promotor->status = 1;
            } else if ($status_user['referidos']['ultimo_trimestre'] > 0) {
                $promotor->status = 2;
            } else {
                $promotor->status = 3;
            }
        }

        return response()->json([
            'total' => $pagination->total(),
            'promotores' => $promotores
        ]);
    }

    public function fetchDataLideres(Request $request)
    {

        $filtro = $request->all();
        $rol_user = $request->user()->rol->nombre;

        if($request->has('coordinador') && !empty($request->get('coordinador'))){
            $user = User::find($request->get('coordinador'));
            $rol_user = $user->rol->nombre;
        }

        $searchs = collect(['username','email','nombre','apellido','direccion','fecha_nacimiento','codigo_postal','bio']);

        $pagination = User::addSelect([
                'users.*',
                'comision' => function ($query) {
                $query->select(DB::raw('SUM(monto) as total_comision'))
                    ->from('movimientos')
                    ->join('estado_cuentas', 'movimientos.estado_cuenta_id', '=', 'estado_cuentas.id')
                    ->where('estado_cuentas.model_type', 'App\\Models\\User')
                    ->whereColumn('estado_cuentas.model_id', 'users.id')
                    ->where('movimientos.tipo_movimiento', 1)
                    ->where('movimientos.concepto', '!=', 'Conversión de divisa');
            }
        ])->where(fn($q) => $searchs->each(fn($v) => $q->orWhere($v,"LIKE","%{$filtro['q']}%")))
            ->whereHas('rol', fn($q) =>  $q->where('nombre', 'Lider'))
            ->when(isset($filtro['coordinador']) && !is_null($filtro['coordinador']) && $rol_user == 'Coordinador', function ($q) use ($filtro) {
                $q->where('coordinador_id', $filtro['coordinador']);
            })
            ->orderBy('comision', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 1000);


        $lideres = collect($pagination->items())->each(fn ($val) => $val->cargar());

        foreach ($lideres as $lider) {
            $status_user = $lider->getStatusUser();
            if ($status_user['promotores_activos']['ultimo_mes'] > 0) {
                $lider->status = 1;
            } else if ($status_user['promotores_activos']['ultimo_trimestre'] > 0) {
                $lider->status = 2;
            } else {
                $lider->status = 3;
            }
        }

        return response()->json([
            'total' => $pagination->total(),
            'lideres' => $lideres
        ]);

    }

    public function fetchDataCoordinadores(Request $request)
    {

        $filtro = $request->all();
        $rol_user = $request->user()->rol->nombre;

        $pagination = User::where([
            ['username', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['email', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['apellido', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['direccion', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_nacimiento', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['codigo_postal', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['bio', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])
            ->whereHas('rol', function (Builder $q) {
                $q->where('nombre', 'Coordinador');
            })

            ->orderBy($filtro['sortBy'] ?: 'id', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 1000);


        $coordinadores = collect($pagination->items())->each(fn ($val) => $val->cargar());

        return response()->json([
            'total' => $pagination->total(),
            'coordinadores' => $coordinadores
        ]);
    }



    public function asignarLiderPromotor(Request $request)
    {

        $datos = $request->validate([
            'lider_id' => 'required',
            'promotor_id' => 'required'
        ]);

        try {
            DB::beginTransaction();
            $promotor = User::find($datos['promotor_id']);
            $promotor->lider_id = $datos['lider_id'];
            $promotor->save();
            $promotor->cargar();

            // Notificar al lider y el promotor de la nueva asignación

            $users_notification = collect([
                $promotor,
                $promotor->lider
            ]);

            Notification::sendNow($users_notification, new NuevaAsignacionLider($promotor));

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'promotor' => $result ? $promotor : null]);
    }

    public function asignarCoordinadorLider(Request $request)
    {

        $datos = $request->validate([
            'lider_id' => 'required',
            'coordinador_id' => 'required'
        ]);

        try {
            DB::beginTransaction();
            $lider = User::find($datos['lider_id']);
            $lider->coordinador_id = $datos['coordinador_id'];
            $lider->save();
            $lider->cargar();

            // Notificar al lider y el promotor de la nueva asignación

            $users_notification = collect([
                $lider,
                $lider->coordinador
            ]);

            // Notification::sendNow($users_notification, new NuevaAsignacionCoordinador($lider));

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'lider' => $result ? $lider : null]);
    }



    public function quitarLiderPromotor(User $promotor)
    {

        try {
            DB::beginTransaction();

            $promotor->lider_id = null;
            $promotor->save();
            $promotor->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function quitarCoordinadorLider(User $lider)
    {

        try {
            DB::beginTransaction();

            $lider->coordinador_id = null;
            $lider->save();
            $lider->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function guardarLider(Request $request)
    {
        $lider = null;

        if($request->get('id') && !empty($request->get('id'))){
            $lider = User::find($request->get('id'));
        }

        $datos  = collect($request->validate([
            'username'       => ['required', $lider ? Rule::unique('users','username')->ignore($lider) : 'unique:users,username' ] ,
            'nombre'         => 'required',
            'apellido'       => 'required',
            'email'          => ['required', $lider ? Rule::unique('users', 'email')->ignore($lider) : 'unique:users,email'],
            'lider_id'       => 'nullable',
            'coordinador_id' => 'nullable',
            'tipo_usuario'   => 'nullable',
            'lider_business' => 'nullable',
            'divisa_id' => 'required'
        ], [
            'username.unique' => 'El nombre de usuario ya está siendo usado, intente con otro',
            'email.unique' => 'El email ya está siendo usado, intente con otro',
        ]));

        try {
            DB::beginTransaction();

            if($request->has('id') && !empty($request->get('id'))){
                $lider->update([
                        ...$datos->except(['divisa_id'])->toArray()
                    ]);

            }else{

                $lider = User::create(
                    [
                        ...$datos->except(['divisa_id'])->toArray(),
                        ...[
                            'password' => fake()->password(),
                            'rol_id' => Rol::where('nombre', 'Lider')->first()->id,
                        ]
                    ]
                );

                $lider->asignarPermisosPorRol();

                $lider->aperturarCuenta(0, Divisa::find($datos['divisa_id'])->iso);
            }


            if($lider->lider_business){
               
                if($permiso = Permiso::where('nombre', 'Gestionar comisión promotores')->first()){
                    $lider->addPermiso($permiso);
                }else{
                    
                    $permiso = Permiso::create([
                        'nombre' => 'Gestionar comisión promotores',
                        'panel_id' => Panel::where('nombre','Travel')->first()->id
                    ]);

                    $lider->addPermiso($permiso);

                }
            }else{
                if($permiso = Permiso::where('nombre', 'Gestionar comisión promotores')->first()) {
                    $lider->quitarPermisos(collect([$permiso]));
                }
            }

            $lider->cargar();
            $lider->notify((new WelcomeUsuario($lider))->locale($lider->locale));

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'lider' => $result ? $lider : null]);
    }
    public function guardarPromotor(Request $request)
    {

        $datos  = $request->validate([
            'username' => 'required|unique:users,username',
            'nombre'   => 'required',
            'apellido' => 'required',
            'email'    => 'required|email|unique:users,email',
            'lider_id' => 'nullable',
            'divisa_id' => 'required'
        ], [
            'username.unique' => 'El nombre de usuario ya está siendo usado, intente con otro',
            'email.unique' => 'El email ya está siendo usado, intente con otro',
        ]);

        try {
            DB::beginTransaction();
            // dd($datos);
            $promotor = User::create([
                ...$datos,
                ...[
                    'rol_id' => Rol::where('nombre', 'Promotor')->first()->id,
                    'password' => '20464273jd',
                    'nivel' => [
                        'nivel' => null,
                        'activaciones' => 0
                    ]
                ]
            ]);
            $promotor->asignarPermisosPorRol();
            

            if (in_array($promotor->rol->nombre, ['Promotor', 'Lider', 'Coordinador'])) {
                $promotor->aperturarCuenta(0, (Divisa::find($datos['divisa_id']))->iso);
            } else {
                $promotor->aperturarCuenta();
            }
            $promotor->cargar();
            $promotor->notify((new WelcomeUsuario($promotor))->locale($promotor->locale));

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }


        return response()->json([
            'result' => $result,
            'promotor' => $result ? $promotor : null
        ]);
    }


    public function misPromotores(Request $request)
    {

        $usuario = $request->user();

        $promotores = $usuario->promotores->each(fn ($promotor) => $promotor->cargar());


        return response()->json($promotores);
    }

    public function getTotalPromotoresPorLider(Request $request)
    {
        return response()->json($request->user()->totalPromotoresPorLider());
    }


    public function getEficaciaViajerosPorPromotor(Request $request)
    {
        return response()->json($request->user()->eficaciaViajerosPorPromotor($request->get('promotor_id')));
    }

    public function getPromotores(Request $request)
    {

        $promotores = DB::table('users as u')
            ->join('users as l', 'u.lider_id', '=', 'l.id')
            ->join('users as c', 'l.coordinador_id', '=', 'c.id')
            ->where('c.id', '=', $request->user()->id)
            ->select('u.*')
            ->get();


        return response()->json($promotores);
    }


    public function totalViajerosCoordinador(Request $request)
    {

        return response()->json($request->user()->totalViajerosCoordinador($request->get('promotor_id')));
    }

    public function getPorcentajeUsoViajeros(Request $request)
    {

        return response()->json($request->user()->porcentajeViajerosLogin());
    }

    public function calcularEnvioCarrito(Request $request)
    {

        $user = $request->user();
        $datos = $request->all();
        $producto_controller = new ProductoController();

        $monto = 0;
        $result = true;
        $mensaje = '';
        $pais = Pais::find($datos['pais_id']);


        $logistic = $producto_controller->obtenerLogistica([
            'startCountryCode' => 'CN',
            'endCountryCode'   => $pais->codigo,
            'products' => $user->carritoCompra
                ->filter(fn ($val) => $val->isChino)
                ->map(fn ($val) => [
                    'vid' => $val->pivot['vid'],
                    'quantity' => $val->pivot['cantidad']
                ])
        ]);


        $monto += $user->carritoCompra->filter(fn ($val) => !$val->isChino)->sum('envio.precio');

        if (count($logistic) > 0) {
            $monto += $logistic[0]->logisticPrice;
        }


        if ($monto > 0) {
            $mensaje = 'Se ha cargado con éxito el costo del envío.';
        }

        return response()->json(['result' => $result, 'monto' => $monto, 'mensaje' => $mensaje]);
    }

    public function asociarTarjeta(Request $request, User $usuario){
        
        $datos  = $request->validate([
            'codigo' => ['required','min:8','max:8',function($atr,$val,$fail) use($request,$usuario){
                
                if($tarjeta = Tarjeta::where('numero',$val)->first()){
                    if(!$tarjeta->aplicada && $tarjeta->validada){
                        if ($usuario = $tarjeta->usuario) {
                            $fail('El número de tarjeta no es Valido');
                        }
                    }else{
                        $fail('El número de tarjeta no es Valido');
                    }

                }else{  
                    $fail('El número de tarjeta no es Valido');
                }


            }]
        ],[
            'codigo.min' => 'El código debe tener 8 caractares',
        ]);

        try{
            DB::beginTransaction();
            $result = false;
            if( $tarjeta = Tarjeta::where('numero',$datos['codigo'])->first()){
                 $usuario->update([
                    'tarjeta_id' => $tarjeta->id
                 ]);
                 $tarjeta->aplicada = true;
                 $tarjeta->save();

                 $result = true;    

                //  $usuario->notify(new validarVentaTarjeta($tarjeta));

                if($usuario->cuenta->divisa->iso == 'Tp'){
                    $usuario->generarMovimiento($tarjeta->lote->tps, 'Nueva Tarjeta asociada a su cuenta');
                }else{
                    $usuario->generarMovimiento($tarjeta->lote->tps * $usuario->cuenta->divisa->tasa, 'Nueva Tarjeta asociada a su cuenta');
                }
                 
            }
           
            DB::commit();
        }catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        $usuario->cargar();
        
        return response()->json(['result' => $result,'usuario' => $usuario,'tarjeta' => $result ? $tarjeta : null]);


    }


    public function cancelarTarjeta(User $usuario, Tarjeta $tarjeta){
        
        try {
            DB::beginTransaction();

            $usuario->tarjeta_id = null;
            $usuario->save();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }
        $usuario->cargar();
        
        return response()->json(['result' => $result,'usuario' => $usuario]);

    }

    public function getEstado(User $usuario)
    {
        return response()->json([
            'ultimaActivacion' =>  $usuario->ultimaActivacion()
        ]);
    }


    public function fetchDataInvitados(Request $request,User $usuario){

        $filtro = $request->all();
        $paginator = User::where([
            ['username', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['email', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['apellido', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['direccion', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_nacimiento', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['codigo_postal', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['bio', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])->whereHas('referidor',function(Builder $q) use($filtro,$usuario){
            $q->where('id',$usuario->id);
        })
        ->orderBy($filtro['sortBy'],$filtro['sortDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage'] ?: 1000);

        // select count(distinct(u.id)) as cant, month(u.created_at) as mes from usuario_referencia as ur 
        // join users as u on ur.referido_id = u.id 
        // where year(u.created_at) = year(now()) && u.activo = 1 && ur.usuario_id = 22
        // group by mes 
        // order by mes asc 
        $activaciones_por_mes = DB::table('usuario_referencia','ur')
            ->join('users as u','ur.referido_id','u.id')
            ->whereRaw("year(u.created_at) = year(now()) && u.activo = 1")
            ->where('ur.usuario_id',$usuario->id)
            ->selectRaw('count(distinct(u.id)) as cant, month(u.created_at) as mes')
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();
        $activaciones_por_mes_ano_anterior = DB::table('usuario_referencia', 'ur')
        ->join('users as u', 'ur.referido_id', 'u.id')
        ->whereRaw("year(u.created_at) = (year(now()) - 1) && u.activo = 1")
        ->where('ur.usuario_id', $usuario->id)
            ->selectRaw('count(distinct(u.id)) as cant, month(u.created_at) as mes')
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();
        
        $activaciones = collect([
            [
                'name' => now()->format('Y'),
                'data'=> collect([])
            ],
            [
                'name' => now()->subYear()->format('Y'),
                'data' => collect([])
            ]
        ]);

        for ($i=0; $i <= 11; $i++) {
            
            
            if($activacion = $activaciones_por_mes->where('mes',($i + 1))->first()){
                $activaciones[0]['data']->push($activacion->cant);  
            }else{
                $activaciones[0]['data']->push(0);
            }

            if ($activacion = $activaciones_por_mes_ano_anterior->where('mes', ($i + 1))->first()) {
                $activaciones[1]['data']->push($activacion->cant);
            } else {
                $activaciones[1]['data']->push(0);
            }
        }

        $invitados = collect($paginator->items())->each(fn($invitado) => $invitado->cargar());

        return response()->json([
            'invitados' => $invitados,
            'total' => $paginator->total(), 
            'activaciones' => $activaciones
        ]);

    }


    public function descargarActivaciones(Request $request){

        $usuario = $request->user();

        $invitados = User::join('usuario_referencia as ur', 'users.id', 'ur.referido_id')
        ->where('ur.usuario_id', $usuario->id)
        ->where('users.activo', true)
        ->orderBy('users.created_at', 'desc')
        ->get();
        $invitados->each(fn ($invitado) => $invitado->cargar());

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));
        $avatar  = "data:image/png;base64," . base64_encode(Storage::disk('img-perfil')->get($usuario->imagen ?: 'default.jpg'));

        $datos = [
            'invitados' => $invitados,
            'usuario' => $usuario,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
            'avatar' => $avatar
        ];


        $pdf = Pdf::loadView('reports.activaciones',$datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');
        return $pdf->download('Mis activaciones.pdf');

    }

  

   

    public function fetchDataPromotoresReport(Request $request){

        $filtro = $request->all();
        $searchs = collect(['username','nombre','apellido','email','bio','direccion']);
        $usuario = $request->user();

        $pagination = $usuario->allPromotores($searchs,$filtro);
            
        $promotores = collect($pagination->items())->each(function($promotor){
          
            $promotor->avatar = $promotor->getAvatar();
            $promotor->portada = $promotor->getPortada();
                $fecha_ultima = $promotor->referidos->where('activo', true)->sortByDesc('created_at')->pluck('created_at')->first();
                $promotor->ultimaActivacion = $fecha_ultima ? Carbon::now()->diffInDays($fecha_ultima) : 0;
                $promotor->totalActivaciones = $promotor->nivel['activaciones'];
                $promotor->totalRegistros = $promotor->referidos->count();
                $promotor->ultimoRegistro = $promotor->ultimoRegistro();
                $promotor->activaciones = [
                    'acumulada' => $promotor->total_viajeros_registrados,
                    'mes' => $promotor->total_viajeros_activos_mes,
                    'promedio' =>  $promotor->total_viajeros_registrados > 0 ? $promotor->total_viajeros_activos_mes * 100 / $promotor->total_viajeros_registrados : 0
                ];
        });

        return response()->json([
            'total' => $pagination->total(),
            'promotores' => $promotores
        ]);

    }

    public function descargarPromotoresReport(Request $request){
        $usuario = $request->user();
        $filtro = $request->all();
        $searchs = collect(['username', 'nombre', 'apellido', 'email', 'bio', 'direccion']);
        $pagination = $usuario->allPromotores($searchs, $filtro);

        $promotores = collect($pagination->items())->each(function ($promotor) {

            $promotor->avatar = $promotor->getAvatar();
            $promotor->portada = $promotor->getPortada();

            $fecha_ultima = $promotor->referidos->where('activo', true)->sortByDesc('created_at')->pluck('created_at')->first();
            $promotor->ultimaActivacion = $fecha_ultima ? Carbon::now()->diffInDays($fecha_ultima) : 0;
            $promotor->totalActivaciones = $promotor->nivel['activaciones'];
            $promotor->totalRegistros = $promotor->referidos->count();
            $promotor->ultimoRegistro = $promotor->ultimoRegistro();
            $promotor->activaciones = [
                'acumulada' => $promotor->total_viajeros_registrados,
                'mes' => $promotor->total_viajeros_activos_mes,
                'promedio' =>  $promotor->total_viajeros_registrados > 0 ? $promotor->total_viajeros_activos_mes * 100 / $promotor->total_viajeros_registrados : 0
            ];
        });


    

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));
        $avatar  = "data:image/png;base64," . base64_encode(Storage::disk('img-perfil')->get($usuario->imagen ?: 'default.jpg'));

        $datos = [
            'promotores' => $promotores,
            'usuario' => $usuario,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
            'avatar' => $avatar
        ];


        $pdf = Pdf::loadView('reports.promotores', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Promotores y sus resultados.pdf';
        $pdf->save($nombre, 'reportes');

        // return $pdf->save($nombre,'reportes')->download($nombre);
        // return response()->download();
        

        return response()->json([
            'url' => Storage::url('public/reportes/'.$nombre),
            'filename' => $nombre
        ]);

    }


    public function fetchDataLideresReport(Request $request){

        $usuario = $request->user();
        $filtro = $request->all();
        $searchs = collect(['username', 'nombre', 'apellido', 'email', 'bio', 'direccion']);

        $pagination = $usuario->allLideres($searchs,$filtro); 

        $lideres = collect($pagination->items())->each(function($lider) {
            $lider->avatar = $lider->getAvatar();
            $lider->portada = $lider->getPortada();
            $fecha_ultima = $lider->promotores->where('activo', true)->sortByDesc('created_at')->pluck('created_at')->first();
            $lider->ultimaActivacion = $fecha_ultima ? Carbon::now()->diffInDays($fecha_ultima) : 0;

            $lider->comision = $lider->cuenta->divisa->iso.' '.number_format((float) $lider->comision,2,',','.').' '.$lider->cuenta->divisa->simbolo;
            $lider->status = $lider->getStatus();
           
        });

        return response()->json([
            'total' => $pagination->total(),
            'lideres' => $lideres
        ]);

    }

    public function descargarLideresReport(Request $request)
    {
        $usuario = $request->user();
        $filtro = $request->all();
        $searchs = collect(['username', 'nombre', 'apellido', 'email', 'bio', 'direccion']);
        $pagination = $usuario->allLideres($searchs, $filtro);

        $lideres = collect($pagination->items())->each(function ($lider) {
            $lider->avatar = $lider->getAvatar();
            $lider->portada = $lider->getPortada();
            $fecha_ultima = $lider->promotores->where('activo', true)->sortByDesc('created_at')->pluck('created_at')->first();
            $lider->ultimaActivacion = $fecha_ultima ? Carbon::now()->diffInDays($fecha_ultima) : 0;

            $lider->comision = $lider->cuenta->divisa->iso . ' ' . number_format((float) $lider->comision, 2, ',', '.') . ' ' . $lider->cuenta->divisa->simbolo;
            $lider->status = $lider->getStatus();
        });

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));
        $avatar  = "data:image/png;base64," . base64_encode(Storage::disk('img-perfil')->get($usuario->imagen ?: 'default.jpg'));

        $datos = [
            'lideres' => $lideres,
            'usuario' => $usuario,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
            'avatar' => $avatar
        ];


        $pdf = Pdf::loadView('reports.lideres', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Líderes y sus resultados.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);
    }


    public function updateComisionPromotor(Request $request, User $usuario){

        $datos = $request->validate([
            'comision_promotores' => 'required'
        ],[
            'comision_promotores.required' => 'La comisión es importante, no lo olvides'
        ]);

        try {
            DB::beginTransaction();

            $usuario->update($datos);

            $usuario->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result =false;
        }

        return response()->json([
            'result' => $result,
            'usuario' => $usuario
        ]);
        

    }

    public function fetchLideresCoordinador(User $coordinador){
        return response()->json($coordinador->lideres);
    }

    public function toggleLider(Request $request,User $promotor){

        $datos = $request->validate([
            'lider_actual_id' => 'required',
            'lider_nuevo_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
                $result = $promotor->toggleLider((int) $datos['lider_nuevo_id']);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }


    public function fetchDataViajerosReportPorPais(Request $request){

        $filtro = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if($request->has('pais')){
            $paginations = User::addSelect([
                    'pais' => Pais::select('pais')->whereHas('estados.ciudades', fn ($q) => $q->whereColumn('id', 'users.ciudad_id'))
                ])
                ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                })
                ->when($filtro['pais'] == 'otros', function ($q) use ($filtro) {
                    $q->whereNull('ciudad_id');
                   
                })
                ->when($filtro['pais'] != 'otros', function ($q) use($filtro) {
                    $q->whereHas('ciudad.estado.pais', fn ($qu) => $qu->where('pais', $filtro['pais']));
                })
                // ->groupBy('pais')
                ->orderBy($filtro['sortBy'], $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 1000);

            $viajeros = collect($paginations->items())->each(fn ($u) => $u->cargar());

        }else{
            $paginations = Pais::select('pais')
            ->addSelect([
                'viajeros' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
                'con_consumo' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->has('consumos')
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
                'sin_consumo' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->doesntHave('consumos')
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
            ])
            ->where([
                ['pais',"LIKE","%{$filtro['q']}%","OR"]
            ])
            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                $q->whereHas('estados.ciudades.usuarios',function($query) use($mes){
                    $query->whereHas('rol',fn($qu) => $qu->where('nombre','Viajero'))
                    ->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                });
            })
            ->havingRaw('viajeros > 0')
            ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?? 1000);
            $viajeros = $paginations->items();
        }
        
       
        return response()->json([
            'total' => $paginations->total(),
            'viajeros' => $viajeros,
        ]);
    }

    public function descargarFetchDataViajerosReportPorPais(Request $request){
        $filtro = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if ($request->has('pais')) {
            $paginations = User::addSelect([
                'pais' => Pais::select('pais')->whereHas('estados.ciudades', fn ($q) => $q->whereColumn('id', 'users.ciudad_id'))
            ])
                ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                })
                ->when($filtro['pais'] == 'otros', function ($q) use ($filtro) {
                    $q->whereNull('ciudad_id');
                })
                ->when($filtro['pais'] != 'otros', function ($q) use ($filtro) {
                    $q->whereHas('ciudad.estado.pais', fn ($qu) => $qu->where('pais', $filtro['pais']));
                })
                // ->groupBy('pais')
                ->orderBy($filtro['sortBy'], $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 1000);

            $viajeros = collect($paginations->items())->each(fn ($u) => $u->cargar());
        } else {
            $paginations = Pais::select('pais')
            ->addSelect([
                'viajeros' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
                'con_consumo' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->has('consumos')
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
                'sin_consumo' => User::selectRaw('count(*)')
                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Viajero'))
                    ->doesntHave('consumos')
                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                    })
                    ->whereHas('ciudad.estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id')),
            ])
            ->where([
                ['pais', "LIKE", "%{$filtro['q']}%", "OR"]
            ])
            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                $q->whereHas('estados.ciudades.usuarios', function ($query) use ($mes) {
                    $query->whereHas('rol', fn ($qu) => $qu->where('nombre', 'Viajero'))
                    ->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                });
            })
            ->havingRaw('viajeros > 0')
            ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?? 1000);
            $viajeros = $paginations->items();
        }

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));

        $datos = [
            'filtro' => $filtro,
            'viajeros' => $viajeros,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
        ];


        $pdf = Pdf::loadView('reports.viajeros', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Viajeros.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);
    }


    public function fetchDataEquipo(Request $request){

        $filtro = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if($request->has('pais') && !empty($filtro['pais'])){
            $paginations = Destino::selectRaw('nombre as destino')
                                    ->addSelect([
                                        'pais' => Pais::select('pais')->whereHas('estados',fn($q) => $q->whereColumn('id','destinos.estado_id')),
                                        'coordinadores' =>User::selectRaw('count(distinct(users.id))')
                                                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Coordinador'))
                                                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                            })
                                                            ->whereHas('lideres.promotores',fn($q) => $q->whereColumn('destino_id','destinos.id')),
                                        'lideres' => User::selectRaw('count(distinct(users.id))')
                                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
                                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                            })
                                            ->whereHas('promotores', fn ($q) => $q->whereColumn('destino_id', 'destinos.id')),
                                        'promotores' => User::selectRaw('count(distinct(users.id))')
                                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                            })
                                            ->whereColumn('destino_id','destinos.id'),
                                    ])
                                    ->where([
                                        ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
                                        ['titulo', 'LIKE', "%{$filtro['q']}%", 'OR'],
                                        ['about_travel', 'LIKE', "%{$filtro['q']}%", 'OR'],

                                    ])
                                    ->whereHas('estado.pais',fn($q) => $q->where('pais',$filtro['pais']))
                                    ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                                    ->paginate($filtro['perPage'] ?? 100);

            $equipo = $paginations->items();
                                

        }else{
            $paginations = Pais::select('pais')
                                ->addSelect([
                                    'coordinadores' => User::selectRaw('count(distinct(users.id))')
                                                                ->whereHas('rol',fn($q) => $q->where('nombre','Coordinador'))
                                                                ->when(isset($filtro['mes']) && !empty($filtro['mes']),function($q) use($mes){
                                                                    $q->whereBetween('created_at',[$mes->firstOfMonth(),(new Carbon($mes))->lastOfMonth()]);
                                                                })
                                                                ->whereHas('lideres.promotores',function($query){
                                                                    $query->whereHas('destino',function($que){
                                                                        $que->whereHas('estado',fn($q) => $q->whereColumn('pais_id','pais.id'));
                                                                    });
                                                                }),
                                    'lideres' =>    User::selectRaw('count(distinct(users.id))')
                                                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
                                                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                    })
                                                    ->whereHas('promotores', function ($query) {
                                                        $query->whereHas('destino', function ($que) {
                                                            $que->whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'));
                                                        });
                                                    }),
                                    'promotores' =>    User::selectRaw('count(distinct(users.id))')
                                    ->whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                        })
                                        ->whereHas('destino', function ($que) {
                                            $que->whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'));
                                        }),
                                        
                                ])
                                ->where([
                                    ['pais','LIKE',"%{$filtro['q']}%",'OR']
                                ])
                                ->havingRaw('coordinadores > 0 || lideres > 0 || promotores > 0')
                                ->orderBy($filtro['sortBy'] ?? 'pais',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
                                ->paginate($filtro['perPage'] ?? 100);

            $equipo = $paginations->items();
        }


        return response()->json([
            'total' => $paginations->total(),
            'equipo' => $equipo
        ]);

    }

    public function descargarFetchDataEquipo(Request $request){
        $filtro = $request->all();
        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if ($request->has('pais') && !empty($filtro['pais'])) {
            $paginations = Destino::selectRaw('nombre as destino')
                ->addSelect([
                    'pais' => Pais::select('pais')->whereHas('estados', fn ($q) => $q->whereColumn('id', 'destinos.estado_id')),
                    'coordinadores' => User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Coordinador'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereHas('lideres.promotores', fn ($q) => $q->whereColumn('destino_id', 'destinos.id')),
                    'lideres' => User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereHas('promotores', fn ($q) => $q->whereColumn('destino_id', 'destinos.id')),
                    'promotores' => User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereColumn('destino_id', 'destinos.id'),
                ])
                ->where([
                    ['nombre', 'LIKE', "%{$filtro['q']}%", 'OR'],
                    ['titulo', 'LIKE', "%{$filtro['q']}%", 'OR'],
                    ['about_travel', 'LIKE', "%{$filtro['q']}%", 'OR'],

                ])
                ->whereHas('estado.pais', fn ($q) => $q->where('pais', $filtro['pais']))
                ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 100);

            $equipo = $paginations->items();
        } else {
            $paginations = Pais::select('pais')
                ->addSelect([
                    'coordinadores' => User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Coordinador'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereHas('lideres.promotores', function ($query) {
                            $query->whereHas('destino', function ($que) {
                                $que->whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'));
                            });
                        }),
                    'lideres' =>    User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Lider'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereHas('promotores', function ($query) {
                            $query->whereHas('destino', function ($que) {
                                $que->whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'));
                            });
                        }),
                    'promotores' =>    User::selectRaw('count(distinct(users.id))')
                        ->whereHas('rol', fn ($q) => $q->where('nombre', 'Promotor'))
                        ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                            $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                        })
                        ->whereHas('destino', function ($que) {
                            $que->whereHas('estado', fn ($q) => $q->whereColumn('pais_id', 'pais.id'));
                        }),

                ])
                ->where([
                    ['pais', 'LIKE', "%{$filtro['q']}%", 'OR']
                ])
                ->havingRaw('coordinadores > 0 || lideres > 0 || promotores > 0')
                ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                ->paginate($filtro['perPage'] ?? 100);

            $equipo = $paginations->items();
        }

        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));

        $datos = [
            'filtro' => $filtro,
            'equipos' => $equipo,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
        ];


        $pdf = Pdf::loadView('reports.equipo', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Equipo Promotor.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);


    }

    public function updateLocale(User $usuario,string $locale){

        $usuario->locale = $locale;
        $result = $usuario->save();
        return response()->json(['result' => $result]);

    }


}
