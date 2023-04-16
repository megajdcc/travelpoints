<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Notification;
use App\Notifications\WelcomeUsuario;
use Illuminate\Support\Facades\{Hash,Auth,File,Storage,Validator,DB,Mail};
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Exception;
use Datatables;
use App\Events\{UsuarioCreado};
use App\Notifications\CuentaDesactivada;
use Illuminate\Validation\Rules\RequiredIf;
use App\Models\Usuario\Rol;
use Illuminate\Support\Str;
use App\Models\Telefono;

use App\Models\Like;
use App\Models\Producto;
use Illuminate\Database\Query\Builder as QueryBuilder;

class UserController extends Controller
{

    public function getUsuario(User $usuario){
        $usuario->cargar();

        return response()->json($usuario);

    }


    private function validar(Request $request,User $usuario = null){
        return $request->validate([
            'username'         => ['required', $usuario ? Rule::unique('users', 'username')->ignore($usuario): 'unique:users,username'],
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
            'codigo_referidor' => 'nullable'            
        ],[
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

        try{
            DB::beginTransaction();
            $usuario = $this->crearUsuario($datos);

            if($user_register->rol->nombre == 'Promotor'){
                $user_register->referidos()->attach($usuario->id,['codigo' => $user_register->codigo_referidor ?: 'no_aplica' ,
                'created_at' => now(),
                ]);
            }

            $usuario->notify(new WelcomeUsuario($usuario));
            DB::commit();


            $usuario->cargar();
            
            $result = true;

        }catch(Exception $e){
            
            dd($e->getMessage());

            DB::rollBack();
            $result = false;
        
        }

        return response()->json(['result' => $result,'usuario' => ($result) ? $usuario : null]);

    }

    public function nuevoUsuario(Request $request ){

        $datos = $request->validate([
            'username'       => 'required|unique:users,username',
            'email'          => 'required|unique:users,email',
            'password'       => 'required|min:6',
            'retypePassword' => 'required|same:password',
            'referidor'      => 'nullable'
        ],[
            'username.required' => 'El nombre de usuario es importante',
            'username.unique' => 'El nombre de usuario ya está siendo usado inténte con otro',
            'password.required' => 'La contraseña es importante no lo olvides',
            'password.min' => 'La contraseña debe tener mínimo 6 caracteres',
            'retypePassword.required' => 'La contraseña es importante no lo olvides',
            'retypePassword.same' => 'La contraseñas deben ser iguales'
        ]);

     
        try{
            DB::beginTransaction();
                $usuario = User::create([
                    'username'    => Str::slug($datos['username']),
                    'email'       => $datos['email'],
                    'password'    => $datos['password'],
                    'is_password' => true,
                    'rol_id' => Rol::where('nombre','Usuario')->first()->id
                ]);

                $usuario->asignarPermisosPorRol();


                if($datos['referidor'] && $datos['referidor'] != 'null'){
                    $usuario->referidor()->attach(User::where('codigo_referidor',$datos['referidor'])->first()->id,[
                        'codigo' => $datos['referidor'],
                        'created_at' => now()
                    ]);
                }

                $usuario->cargar();

                $result = true;
            
                $usuario->notify(new WelcomeUsuario($usuario));

            DB::commit();
            

        }catch(\Exception $e){
            DB::rollback();
            $result = false;
        }

        return response()->json(['result' => $result, 'usuario' => $result ? $usuario : null ]);
        
    }


    /**
     * [crearUsuario description]
     * @param  Array  $datos [Los datos del nuevo usuario a crear ]
     * @return [App\User]        [El usuario creado]
     */
    public function crearUsuario(Array $datos) : User {
        
        $usuario = User::create([...$datos,...['password' => '20464273jd']]);
        $usuario->asignarPermisosPorRol();
        // $usuario->aperturarCuenta();

        $usuario->cargar();

        return $usuario;
    
    }

    public function validarDatos(Request $request,User $usuario = null) : array{

        $datos = $request->validate([
            'username'         => ['required',!is_null($usuario) ? Rule::unique('users','username')->ignore($usuario) : 'unique:users,username'],
            'nombre'           => 'required',
            'apellido'         => 'nullable',
            'email'            => ['required',!is_null($usuario) ? Rule::unique('users','email')->ignore($usuario): 'unique:users,email'],
            'direccion'        => 'nullable',
            'fecha_nacimiento' => 'nullable',
            'rol_id'           => 'required',
            'website'          => 'nullable',
            'twitter'          => 'nullable',
            'facebook'         => 'nullable',
            'instagram'        => 'nullable'

        ],[
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
    public function update(Request $request, User $usuario){

        $datos = $this->validar($request,$usuario);
    
        try{
            DB::beginTransaction();

            $usuario->removeRole();
            $usuario->update($datos);
            
            $usuario->asignarPermisosPorRol();
            
            DB::commit();

            $usuario->cargar();

            $result = true;
        }catch(Exception $e){
            DB::rollBack();
            $result = false;
        }
       
       return response()->json(['result' => $result,'usuario' => $usuario]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, User $usuario){

        try{
            DB::beginTransaction();
                $usuario->delete();
            DB::commit();
            $result = true;
        }catch(Exception $e){
            DB::rollBack();
            $result = false;
        }
        
        return response()->json(['result' => $result]); 
    
    }

    public function perfil(Request $request){
        return view('admin.usuario.perfil');
    }

    public function getUsuarios(){
        
        $usuarios = User::get();
        foreach ($usuarios as $key => $usuario) {
            $usuario->cargar();
        }

        return response()->json($usuarios);

    }

    public function EstablecerContrasena(Request $request,User $usuario){

        $datos = $request->validate([
            'password' => 'required|min:6',
            'password_confirmation' => 'same:password'
        ],[
            'password.required'     => 'La contraseña es importante no la olvides.',
            'password.min'          => 'La contraseña tiene que tener minimo 6 caracteres.',
            'password_confirmation.same' => 'Las contraseñas no son iguales verifica.'
        ]);

        try{
            
            DB::beginTransaction();

            $usuario->password = $datos['password'];
            $usuario->is_password = true;
            $usuario->save();

            DB::commit();
            
            $result = true;
            $status = 'Se ha establecido la contraseña de forma éxitosa. ';

        }catch(Exception $e){
            DB::rollBack();
            $result = false;

            $status = 'No se pudo establecer la contraseña, vuelva a intentarlo mas tarde.';

        }
       

        return response()->json(['result' => $result,'status' => $status]);
    }

    /**
     *Usado para autenticar manualmente al usuario
     * 
     * @param [App\user $usuario]
     * @param [Illuminate\Http\Request $request]
     */
    private function autenticar(User $usuario, Request $request){

        $credenciales = ['email' => $usuario->email, 'password' => $request->get('contrasena')];

        if(Auth::attempt($credenciales)){

            if($usuario->roles->contains(function($val,$i){
                return ($val->name == 'Desarrollador' || $val->name == 'Administrador');  
            })){
                return  redirect()->route('home');
            }else{
                redirect('/home');   
            }
        }
    }

    public function updatePerfil(Request $request, User $usuario){

        $result =  $usuario->update($this->validar($request, $usuario));
        $user = User::find($usuario->id);

        $user->tokens;
        $user->habilidades = $user->getHabilidades();
        $user->cargar();
        return response()->json(['result' => $result, 'usuario' => $user]);

    }

    public function uploadAvatar(Request $request){

        $usuario = $request->user();

        $avatar = $request->file('filepond');

        if($usuario->imagen){
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

    public function actualizarAvatarUsuario(Request $request,User $usuario){


        $avatar = $request->file('filepond');

        if($usuario->imagen){
            Storage::disk('img-perfil')->delete($usuario->imagen);
        }

        $avatarName = sha1(Carbon::now() . $usuario->id) . '.' . $avatar->getClientOriginalExtension();
        Storage::disk('img-perfil')->put($avatarName, File::get($avatar));

        $usuario->imagen = $avatarName;
        $usuario->save();

        return response()->json($usuario->getAvatar());
    }

    public function changePassword(Request $request,User $usuario){

       
        
        $data = $request->validate([
            'contrasenaAnterior' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::user()->password)) {
                    $fail('Su contraseña no coincide con la actual');
                }
            }],
            'contrasenaNueva'     => 'required|min:6',
            'retypePassword' => 'required|same:contrasenaNueva'
        ],[
            'contrasenaAnterior.required' => 'Su contraseña es requeridad para poder actualizarla',
            'contrasenaNueva.required'    => 'Su nueva contraseña es obligatoria',
            'contrasenaNueva.min'         => 'Su contraseña debe ser mayor a 6 caracteres',
            'retypePassword.same'         => 'La contraseñas no son iguales'
        ]);


        try{
            DB::beginTransaction();
            $usuario->password = $data['contrasenaNueva'];
            
            $usuario->save();

            $usuario->cargar();

            DB::commit();

            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

     
        return response()->json(['result' =>  $result, 'usuario' => $usuario]);
    }

    public function perfilDatos(){

        $usuario = Auth::user();

        $datos = [
                'nombre'           => $usuario->nombre,
                'apellido'         => $usuario->apellido,
                'telefono'         => $usuario->telefono,
                'direccion'        => $usuario->direccion,
                'email'            => $usuario->email,
                'rol'              => $usuario->rol,
                'avatar'           => asset('storage/img-perfil/'.$usuario->imagen),
                'fecha_nacimiento' => $usuario->fecha_nacimiento,
                'id'               => $usuario->id,
        ];
        return response()->json($datos);
    }

    public function refresh(){

        $usuario = User::find(Auth::id());
        
        $data = [
            'avatar' => $usuario->getAvatar(),
            'usuario' => $usuario,
        ];

        return response()->json($data);
    }

    public function getUsers(Request $request){ 

        $datos = $request->all();
        $usuario = $request->user();

         $paginator = User::where([
                ['username','LIKE',"%{$datos['q']}%",'OR'],
                ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['direccion', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['fecha_nacimiento', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['codigo_postal', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['bio', 'LIKE', "%{$datos['q']}%", 'OR'],
            ])
            ->when(isset($datos['role']),function($query) use($datos){
                $query->where('rol_id',$datos['role'] ? $datos['role'] : '>',0);
            })
            ->when(!in_array($request->user()->rol->nombre,['Desarrollador','Administrador']),function($query){
                $query->whereHas('rol', fn(Builder $q) => $q->whereNotIn('nombre', ['Desarrollador', 'Administrador']));
            })
            ->when(in_array($request->user()->rol->nombre, ['Promotor']), function($query) use ($usuario){
                $query->whereHas('referidor',function(Builder $q) use($usuario){
                    $q->where('usuario_id', $usuario->id);
                });
            })
            
            ->orderBy($datos['sortBy'],$datos['sortDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);
            
        $usuarios = collect($paginator->items())->each(fn($user) => $user->cargar());

        return response()->json([
            'users' => $usuarios,
            'total' => $paginator->total()
        ]);

    }

    public function desactivarCuenta(Request $request){

        $v = Validator::make($request->all(), [
            'mensaje' => 'required',
            'contrasena' => ['required', function ($attribute, $value, $fail) use ($request){
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
            new CuentaDesactivada($request->user(),$v['mensaje'])
        );

        
        return response()->json(['result' => $result]);
    }


    public function agregarTelefono(Request $request, User $usuario) {

        $datos =  $request->validate([
            'id'          => 'nullable',
            'telefono'    => 'required',
            'is_whatsapp' => 'required',
            'principal'   => 'required',
        ]);

        try{
            DB::beginTransaction();
            
            if(isset($datos['id'])){
                $telefono = $usuario->actualizarTelefono($datos);
            }else{
                $telefono = $usuario->addTelefono($datos);
            }


            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }
        return response()->json(['result' => $result,'telefono' => $result ? $telefono : null]);
    }

    public function quitarTelefono(Request $request, Telefono $telefono){

        try{
            DB::beginTransaction();

                $telefono->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function crearLinkReferidor(Request $request, User $usuario){

        $datos = $request->validate([
            'codigo_referidor' => 'required|unique:users,codigo_referidor'
        ],[
            'codigo_referidor.required' => 'El código es importante no lo olvides',
            'codigo_referidor.unique' => 'El código de referidor ya está siendo usuario por otro usuario, inténta con otro...'
        ]);

        $result = $usuario->update($datos);

        $usuario->tokens;
        $usuario->habilidades = $usuario->getHabilidades();

        $usuario->cargar();
        
        return response()->json(['result' => $result,'usuario' => $usuario]);
        
    }

    public function verificarCodigo(string $codigo){

        $usuario = User::where('codigo_referidor',$codigo)->first();

        return response()->json(['result' => $usuario ? true : false]);

    }

    public function misReferidos(Request $request){

        $datos = $request->all();
        $paginator = DB::table('usuario_referencia','ur')
                            ->selectRaw("concat(u.nombre,' ',u.apellido) as nombre_completo, u.id,u.username,u.imagen")
                            ->join('users as u','ur.referido_id','u.id')
                            ->where('ur.usuario_id',$datos['usuario_id'])
                            ->orderBy('u.id','desc')
                            ->paginate($datos['perPage']);


        $usuarios = $paginator->items();

        foreach ($usuarios as $key => $usuario) {
            if(empty($usuario->imagen)){
                $usuario->imagen =  asset('storage/img-perfil/default.jpg');
            }else{
                $usuario->imagen =  asset('storage/img-perfil/').$usuario->imagen;
            }

            // $usuario->cargar();


        }

        return response()->json([
            'usuarios' => $usuarios,
            'total' => $paginator->total(),
        ]);

        

    }


    public function toggleLike(Request $request, User $usuario){

        try{
        
            DB::beginTransaction();
                $datos = $request->all();

                if($like = Like::where([
                    ['usuario_id', $usuario->id],
                    ['model_id',$datos['model_id']],
                    ['model_type',$datos['model_type']]
                    ])->first()){
                    $like->delete();
               
                }else{

                    $like = Like::create([
                        'usuario_id' => $usuario->id,
                        'model_id'   => $datos['model_id'],
                        'model_type' => $datos['model_type'],
                        'comentario' => ''
                    ]);

                }

              

            DB::commit();
            $result  = true;
        
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }

       $likes = $usuario->likes;
        
        return response()->json(['result' => $result,'likes' => $result ? $likes : null]);
    
    }


    public function searchUser(Request $request) {

        $query = $request->get('q');
        
        $usuarios = User::where([
            ['nombre','LIKE',"%{$query}%","OR"],
            ['apellido', 'LIKE', "%{$query}%", "OR"],
            ['email', 'LIKE', "%{$query}%", "OR"],
            ['username', 'LIKE', "%{$query}%", "OR"],
        ])
        ->get();

        foreach($usuarios as $usuario){
            $usuario->cargar();

        }


        return response()->json($usuarios);

    }


    public function getCarrito(User $usuario){

        $carrito_productos = $usuario->carritoCompra;

        $carrito_productos->load(['opinions','imagenes','categoria','tiendas','divisa']);

        return response()->json($carrito_productos);
    }

    public function sacarProductoCarrito(User $usuario,Producto $producto){

        $result = $usuario->sacarProducto($producto);

        return response()->json(['result' => $result]);
    }


    public function addProductoCarrito(Request $request){

       
        $result = $request->user()->addProducto(

            $request->validate([
                'tienda_id'       => 'required',
                'producto_id'     => 'required',
                'monto'           => 'required',
                'precio_unitario' => 'required',
                'cantidad'        => 'required',
                'cliente_id'      => 'nullable'
                ])
        );

        return response()->json([
            'result' => $result,
            'carrito' => $request->user()->carritoCompra
        ]);
    }

    public function fetchDataCarrito(Request $request){

        $datos = $request->all();

        $response = $request->user()->fetchDataCarrito($datos);

        return response()->json($response);

    }

    public function getStatus(Request $request){

        $user = $request->user();
        
        $referidos = [
            'ultimo_mes' => 0,
            'ultimo_trimestre' => 0,
            'data' => 0
        ];

        if($user->rol->nombre == 'Promotor'){
           $referidos_ultimo_mes =  DB::table('users','u')
            ->join('usuario_referencia as ur','u.id','ur.usuario_id')
            ->whereRaw('u.id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)',[':usuario' => $user->id])
            ->selectRaw('count(ur.referido_id) as referidos')
            ->first('referidos');

            $referidos_ultimo_trimestre =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 89 DAY)', [':usuario' => $user->id])
                ->selectRaw('count(ur.referido_id) as referidos')
                ->first('referidos');

            $referidos['ultimo_mes'] = $referidos_ultimo_mes->referidos;
            $referidos['ultimo_trimestre'] = $referidos_ultimo_trimestre->referidos;
           

        }

        

        return response()->json($referidos);


    }

}
