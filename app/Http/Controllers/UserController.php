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


class UserController extends Controller
{

    public function getUsuario(User $usuario){
        $usuario->rol;
        $usuario->rol->permisos;
        $usuario->avatar = $usuario->getAvatar();

        return response()->json($usuario);

    }


    private function validar(Request $request,User $usuario = null){
        return $request->validate([
            'nombre'           => 'required',
            'apellido'         => 'nullable',
            'telefono'         => 'nullable',
            'email'            => ['required', $usuario ? Rule::unique('users', 'email')->ignore($usuario): 'unique:users,email'],
            'direccion'        => 'nullable',
            'fecha_nacimiento' => 'nullable',
            'rol_id'           => 'required',
            'website'          => 'nullable',
            'is_whatsapp'      => 'required_with:telefono',
            'twitter'          => 'nullable',
            'facebook'         => 'nullable',
            'instagram'        => 'nullable',
            'genero'           => 'nullable',
            'codigo_postal'    => 'nullable',
            'activo'           => 'nullable',
            'ciudad_id'        => 'nullable',
            
        ],[
            'nombre.required' => 'El nombre es importante',
            'email.unique'    => 'El email ya está siendo usado, el mismo debe ser único',
            'rol_id.required' => 'El rol es importante no lo olvides',
            'email.required'  => 'Este campo es obligatorio',
            'email.email'     => 'El email no es valido por favor verifique',
            'email.unique'    => 'El email debe ser único ya otro usuario lo esta usando.',
            'is_whatsapp.required_with' => 'Este campo es importante'
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

        try{
            DB::beginTransaction();
                $usuario = $this->crearUsuario($datos);
                $usuario->notify(new WelcomeUsuario($usuario));
            DB::commit();
            $usuario->rol;
            $usuario->rol->permisos;
            $usuario->avatar = $usuario->getAvatar();
            $result = true;

        }catch(Exception $e){
            
            dd($e->getMessage());

            DB::rollBack();
            $result = false;
        
        }

        return response()->json(['result' => $result,'usuario' => ($result) ? $usuario : null]);

    }

    /**
     * [crearUsuario description]
     * @param  Array  $datos [Los datos del nuevo usuario a crear ]
     * @return [App\User]        [El usuario creado]
     */
    public function crearUsuario(Array $datos) : User {

        
        $usuario = User::create([
            'nombre' => $datos['nombre'],
            'apellido'  => $datos['apellido'],
            'telefono'  => $datos['telefono'],
            'email'     => $datos['email'],
            'direccion' => $datos['direccion'],
            'password'  => Hash::make('20464273jd'),
            'fecha_nacimiento' => (isset($datos['fecha_nacimiento'])) ? $datos['fecha_nacimiento'] : null ,
            'rol_id' => $datos['rol_id'],
            'is_whatsapp' => $datos['is_whatsapp'],
            'website' => $datos['website'],
            'twitter' => $datos['twitter'],
            'facebook' => $datos['facebook'],
            'instagram' => $datos['instagram'],
        ]);

        $usuario->asignarPermisosPorRol();
        return $usuario;
    
    }

    public function validarDatos(Request $request) : array{

        $datos = $request->validate([
            'nombre'           => 'required',
            'apellido'         => 'nullable',
            'telefono'         => 'nullable',
            'email'            => [Rule::unique('users','email')],
            'direccion'        => 'nullable',
            'fecha_nacimiento' => 'nullable',
            'rol_id'           => 'nullable',
            'website'          => 'nullable',
            'is_whatsapp'      => 'nullable',
            'twitter'          => 'nullable',
            'facebook'         => 'nullable',
            'instagram'        => 'nullable'

        ],[
            'nombre.required' => 'El nombre es importante',
            'email.unique' => 'El email ya está siendo usado, el mismo debe ser único',

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

            $usuario->rol;
            $usuario->ciudad;
            $usuario->rol->permisos;
            $usuario->avatar = $usuario->getAvatar();
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
            $usuario->rol;
            $usuario->ciudad?->estado?->pais;
            $usuario->rol->permisos;
            $usuario->avatar = $usuario->getAvatar();
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
            $usuario->password = Hash::make($datos['password']);
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
        $user->ciudad?->estado?->pais;

        $user->rol;
        $user->habilidades = $user->getHabilidades();
        $user->avatar = $user->getAvatar();
        
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

        $v = Validator::make($request->all(),[
            'contrasenaAnterior' => ['required',function($attribute,$value,$fail){
                if(!Hash::check($value,Auth::user()->password)){
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
        ])->validate();
        
        $usuario->password = Hash::make($v['contrasenaNueva']);
        
        return response()->json(['result' =>  $usuario->save()]);
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

        if(Auth::user()->rol->nombre == 'Desarrollador'){

            $paginator = DB::table('users','u')
                        ->selectRaw("
                            concat(u.nombre,' ',u.apellido) as usuario,
                            u.email,
                            u.telefono,
                            r.nombre as rol,
                            u.id,
                            u.imagen as avatar

                        ")
                ->join('rols as r','u.rol_id','r.id')
                ->where('u.rol_id', $datos['role'] ? $datos['role'] : '>', 0)
                ->where([
                        ['u.nombre', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                        ['u.email', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                        ['u.telefono', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                        ['u.apellido', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                        ['u.bio', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                        ['u.direccion', 'LIKE', '%' . $datos['q'] . '%','OR'],
                        ['r.nombre', 'LIKE', '%' . $datos['q'] . '%','OR'],

                ])
                ->orderBy($datos['sortBy'] ?: 'u.id', ($datos['sortDesc']) ? 'desc' : 'asc')
                ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);

               
        }else{

            $paginator = DB::table('users', 'u')
                ->selectRaw("
                            concat(u.nombre,' ',u.apellido) as usuario,
                            u.email,
                            u.telefono,
                            r.nombre as rol,
                            u.id,
                            u.imagen as avatar
                        ")
                ->join('rols as r', 'u.rol_id', 'r.id')
                ->where('u.rol_id', $datos['role'] ? $datos['role'] : '>', 0)
                ->where('r.nombre','!=','Desarrollador')
                ->where([
                    ['u.nombre', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                    ['u.email', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                    ['u.telefono', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                    ['u.apellido', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                    ['u.bio', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                    ['u.direccion', 'LIKE', '%' . $datos['q'] . '%','OR'],
                ['r.nombre', 'LIKE', '%' . $datos['q'] . '%','OR'],
                ])
                ->orderBy($datos['sortBy'] ?: 'u.id' , ($datos['sortDesc']) ? 'desc' : 'asc')
                ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);

        }

        $usuarios = $paginator->items();


        foreach($usuarios as $key => $usuario){

            if($usuario->avatar){
               $usuarios[$key]->avatar =asset('storage/img-perfil/' . $usuario->avatar); 
            } else{
                $usuarios[$key]->avatar = asset('storage/img-perfil/default.jpg'); 
            }

        }

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


}
