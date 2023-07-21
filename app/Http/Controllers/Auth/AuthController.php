<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Hash, Storage};
use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use App\Models\Usuario\Rol;

use Illuminate\Support\Facades\Password;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

use App\Events\UsuarioConectado;
use App\Events\UsuarioDesconectado;
use Laravel\Socialite\Facades\Socialite;

use Google\Client;
use GuzzleHttp\Client as ClientGuzzle;


class AuthController extends Controller
{

   
   public function authGoogle(Request $request){
      $data = $request->all();

      $id_token = $data['credential'];

      $client = new Client(['client_id' => $data['clientId']]);
      $payload = $client->verifyIdToken($id_token);
 

      if($payload){

         $usuario = User::where('email',$payload['email'])->first();
         if(!$usuario) {

           

            $url = $payload['picture']; // URL de la imagen a descargar

            $cliente = new ClientGuzzle();
            $response = $cliente->get($url);

            $nombreArchivo = basename($url); // Obtiene el nombre del archivo de la URL

            $usuario = User::create([
               'email'       => $payload['email'],
               'username'    => $payload['email'],
               'nombre'      => $payload['given_name'],
               'apellido'    => $payload['family_name'],
               'activo'      => true,
               'password'    => '20464273jd',
               'is_password' => true,
               'rol_id' => Rol::where('nombre', 'Viajero')->first()->id
            ]);

            $result = Storage::disk('img-perfil')->put($nombreArchivo, $response->getBody()->getContents());
            $usuario->imagen = $nombreArchivo;
            $usuario->save();


            $usuario->asignarPermisosPorRol();
         }else{

            $url = $payload['picture']; // URL de la imagen a descargar
            $cliente = new ClientGuzzle();
            $response = $cliente->get($url);

            $nombreArchivo = basename($url); // Obtiene el nombre del archivo de la URL

            $result = Storage::disk('img-perfil')->put($nombreArchivo, $response->getBody()->getContents());
            $usuario->imagen = $nombreArchivo;
            $usuario->save();

         }

         $usuario->generateLink();
         
         $usuario->ultimo_login = now();
         $usuario->save();

         $token = (!is_null($usuario->getTokenText())) ? $usuario->getTokenText() : ($usuario->createToken($usuario->nombre.'-'.$usuario->id))->plainTextToken;
         // $token = $tokenResult->plainTextToken;

         $usuario->token = $token;

         if(!$usuario->cuenta){
           $usuario->aperturarCuenta();
           $usuario->cuenta;
         } 
         
         $usuario->save();
         
         $usuario->update(['activo' => true]);
      
         $usuario->cargar();
         
         Auth::login($usuario);

         $result = true;

      }else{
         $result = false;
      }

      return response()->json(['result' => $result,'usuario' => $result ? $usuario : null]);

   }


   public function redirectGoogle(Request $request){
      return Socialite::driver('google')->redirect();
   }

   public function callbackGoogle(Request $request){

      $google_user = Socialite::driver('google')->user();

      $usuario = User::updateOrCreate([
         'email' => $google_user->email
      ],[
         'email'       => $google_user->email,
         'username'    => $google_user->email,
         'nombre'      => $google_user->user->given_name,
         'apellido'    => $google_user->user->family_name,
         'activo'      => true,
         'password'    => '20464273jd',
         'is_password' => true,
         'rol_id' => Rol::where('nombre','Usuario')->first()->id
      ]);

      $usuario->asignarPermisosPorRol();

      Auth::login($usuario);

      return redirect('/');

   }


    /**
    * Create user
    *
    * @param  [string] name
    * @param  [string] email
    * @param  [string] password
    * @param  [string] password_confirmation
    * @return [string] message
    */
    public function register(Request $request)
    {
        
      $request->validate([
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email'=>'required|string|unique:users',
            'password'=>'required|string',
            'c_password' => 'required|same:password'
        ],[
         'email.unique' => 'El email ya está registrado, inténte con otro'
        ]);

        $user = User::create([
            'nombre'  => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'password' => $request->password,
            'rol_id' => Rol::where('nombre','Invitado')->first()->id
        ]);
        $user->generateLink();
        if($user->save()){

            $tokenResult = $user->createToken($user->nombre.'-'.$user->id);
            $token = $tokenResult->plainTextToken;
            $user->token = $token;
            $user->save();

            $user->asignarPermisosPorRol();
            

            return response()->json([
            'message' => 'Successfully created user!',
            'accessToken'=> $token,
            ],201);
            
        }else{
            return response()->json(['error'=>'Provide proper details']);
        }

    }


   /**
    * Login user and create token
    *
    * @param  [string] email
    * @param  [string] password
    * @param  [boolean] remember_me
    */

   public function login(Request $request)
   {
      $data = $request->validate([
         'email' => 'exists:users,email',
         'password' => 'required|string',
         'remember' => 'required'
      ],[
         'email.exists' => 'Error en el correo electrónico...'
      ]);


      try{

         $credentials = request(['email', 'password']);
       
         $datos = [...$credentials,...['activo' => true,'is_password' => true]];

         
         if($user_verify = User::where('email',$credentials['email'])->first()){
            $user_verify->generateLink();
            if(!$user_verify->activo){
               return response()->json(['result' => false, 'message' => 'Tu usuario no está activo. Para reactivarlo por favor contacta con soporte técnico.'], 401);
            }  
         }

         if (!Auth::attempt($datos,$data['remember'])){
            return response()->json(['result' => false,'message' => 'El usuario o contraseña, son incorrectos'],401);
         }

         $user = $request->user();
         $user->ultimo_login = now();
       
         $user->save();

         $token = (!is_null($user->getTokenText())) ? $user->getTokenText() : ($user->createToken($user->nombre.'-'.$user->id))->plainTextToken;
         // $token = $tokenResult->plainTextToken;

         $user->token = $token;

         if(!$user->cuenta){
           $cuenta =  $user->aperturarCuenta();
           $user->cuenta = $cuenta;
         } 
         
         $user->save();
         
         $user->update(['activo' => true]);
       
         
         $user->cargar();

         // broadcast(new UsuarioConectado($user))->toOthers();

         $result = true;
      }catch(\Exception $e){

         $result = false;
      }
      
      $user->porcentajePerfil = $user->getFillPercentage();
      return response()->json([
         'result' => $result,
         'accessToken' => $token,
         'token_type' => 'Bearer',
         'usuario' =>  $user
      ]);

   }

   /**
    * Get the authenticated User
    *
    * @return [json] user object
    */
   public function user(Request $request)
   {
      $usuario = User::find($request->user()->id);
      $usuario->cargar();
      
      return response()->json($usuario);
   }


   /**
    * El guardia por defecto de la aplicacion
    *
    * @return \Illuminate\Contracts\Auth\StatefulGuard
    */
   protected function guard(string $guardia  = null)
   {
      return Auth::guard('web');
   }


   /**
    * Logout user (Revoke the token)
    *
    * @return [string] message
    */
   public function logout(Request $request)
   {
      $request->user()->tokens()->delete();

      $usuario =$request->user();
      $usuario->token = null;
      $usuario->save();
      
      $this->guard()->logout();

      $request->session()->invalidate();

      $request->session()->regenerateToken();

      // \broadcast(new UsuarioDesconectado($usuario))->toOthers();

      return response()->json([
         'message' => 'Successfully logged out'
      ]);
     
   }


   public function recuperarContrasena(Request $request){

            $request->validate(['email' => 'required|exists:users,email'],
            ['email.exists' => "Error en el correo electrónico"]);

            $status = Password::sendResetLink(
               $request->only('email')
            );

            switch ($status) {
               case Password::RESET_LINK_SENT:
                  $resultado = ['result' => true, 'mensaje' => 'EL enlace de reestablecimiento de contraseña ha sido enviado a su correo...'];
                  break;

               case Password::RESET_THROTTLED:
                  $resultado = ['result' => false, 'mensaje' => 'Tienes que esperar 60 min, para volver a solicitar otro enlace de reestablecimiento de contraseña...'];
                  break;

               case Password::INVALID_USER:
                  $resultado = ['result' => false, 'mensaje' => 'El usuario no existe'];
                  break;

               default:
                  $resultado = ['result' => false, 'mensaje' => 'Estamos teniendo problema, inténtelo de nuevo mas tarde...'];
                  break;
            }
            
            return new JsonResponse($resultado);

            // $this->sendResetLinkFailedResponse($request, $status);
   }


   private function broker(){

      return Password::broker();

   }
 

   private function credentials(Request $request) : array{
      return $request->only('email');   
   }
   

   /**
     * Get the response for a successful password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse(Request $request, $response)
    {

      // dd($response);

      //   return $request->wantsJson()
      //               ? new JsonResponse(['message' => trans($response)], 200)
      //               : back()->with('status', trans($response));
      
      // return back()->with('status', trans($response));

    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        if ($request->wantsJson()) {
            throw ValidationException::withMessages([
                'email' => [trans($response)],
            ]);
        }

        return back()
                ->withInput($request->only('email'))
                ->withErrors(['email' => trans($response)]);
    }

    public function resetPassword(Request $request){
      
      $request->validate([
         'token' => 'required',
         'email' => 'required|email',
         'password' => 'required|confirmed',
      ]);

      $status = Password::reset(

         $request->only('email', 'password', 'password_confirmation', 'token'),
         
         function ($user, $password) {

            $user->forceFill([
               'password' => $password
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
         }
      );
      
      return $status === Password::PASSWORD_RESET
         ? response()->json(['result' => true, 'status' => $status])
         : response()->json(['result' => false, 'status' => $status]);


    }








}