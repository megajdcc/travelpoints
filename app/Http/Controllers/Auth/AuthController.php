<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Hash};
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


class AuthController extends Controller
{

   

   public function redirectGoogle(Request $request){
      return Socialite::driver('google')->redirect();
   }

   public function callbackGoogle(Request $request){
      $usuario = Socialite::driver()->user();

      dd($usuario);

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
        ]);

        $user = new User([
            'nombre'  => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol_id' => Rol::where('nombre','Invitado')->first()->id
        ]);

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
         'email' => 'required|string|email',
         'password' => 'required|string',
         'remember' => 'required'
      ]);

      try{

         $credentials = request(['email', 'password']);

         if (!Auth::attempt($credentials,$data['remember'])){
            return response()->json(['result' => false,'message' => 'El usuario o contraseña, son incorrectos'],401);
         }

         $user = $request->user();

         $token = (!is_null($user->getTokenText())) ? $user->getTokenText() : ($user->createToken($user->nombre.'-'.$user->id))->plainTextToken;
         // $token = $tokenResult->plainTextToken;

         $user->token = $token;
         
         $user->save();
         $user->update(['activo' => true]);
         $user->tokens;
         $user->rol;
         $user->habilidades = $user->getHabilidades();
         $user->avatar = $user->getAvatar();


         // broadcast(new UsuarioConectado($user))->toOthers();

         $result = true;
      }catch(\Exception $e){

         $result = false;
      }
      
      
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

      $usuario = $request->user();

      $usuario->tokens;
      $usuario->rol;
      $usuario->habilidades = $usuario->getHabilidades();
      $usuario->avatar = $usuario->getAvatar();
      
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

            $request->validate(['email' => 'required|email'],['email.required' => 'El Email es importante no lo olvides']);

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

      dd($response);

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
               'password' => Hash::make($password)
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