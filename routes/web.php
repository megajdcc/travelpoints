<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Models\User;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\EstadoCuentaController;
use App\Http\Controllers\MensajesVonageController;
use App\Http\Controllers\UserController;
use App\Mail\InvitacionNegocio;
use App\Mail\NuevoConsumo;
use App\Models\Consumo;
use App\Models\Invitacion;
use App\Models\Movimiento;
use App\Models\Retiro;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as PDFB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;



// Route::get('/render/invitacion-negocio',function(){
//    $invitacion = Invitacion::first();

//    return new InvitacionNegocio($invitacion);
// });

Route::get('/reports/view/activaciones',function(Request $request){

   $usuario = $request->user();

   $invitados = User::join('usuario_referencia as ur', 'users.id', 'ur.referido_id')
      ->where('ur.usuario_id', $usuario->id)
      ->where('users.activo', true)
      ->orderBy('users.created_at','desc')
      ->get();
   $invitados->each(fn($invitado) => $invitado->cargar());
   // dd($invitados);
   // $invitados = DB::table('users', 'u')
   //    ->join('rols as r', 'u.rol_id', 'r.id')
   //    ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
   //    ->where('ur.usuario_id', $usuario->id)
   //    ->where('u.activo', true)
   //    ->selectRaw("u.id,concat(u.nombre,' ',u.apellido) as nombre, u.username, u.email, u.created_at as creado,r.nombre as rol")
   //    ->orderBy('creado')
   //    ->get();

   $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
   $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));
   $avatar  = "data:image/png;base64," . base64_encode(Storage::disk('img-perfil')->get($usuario->imagen));


   return view('reports.activaciones', [
      'invitados' => $invitados,
      'usuario' => $usuario,
      'logotipo' => $imagenBase64,
      'logotipoblanco' => $logowhite,
      'avatar' => $avatar,
   ]);

});

Route::get('/recibo/retiro',function(Request $request){

   $retiro = Retiro::first();

   $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));

   return $retiro->generarRecibo();
   
   return view('pdfs.recibo', [
      ...$retiro->toArray(),
      'logotipo'  => $imagenBase64,
      'solicitante' => $retiro->usuario,
      'items' => [['fecha' => now(),'concepto' => 'Comisión asignada','total' => '23,50']],
      'abrev' => 'IVA',
      'cuota' => 12
   ]);

});


Route::get('/usuario/{usuario}/establecer/contrasena', function (User $usuario) {

   if ($usuario->is_password) {

      return redirect('/login');
   
   } else {
   
      return view('application', ['usuario' => $usuario]);
   
   }

});

// Reportes
Route::get('reports/descargar/estados-cuenta',[EstadoCuentaController::class,'descargar']);
Route::get('reports/descargar/activaciones',[UserController::class,'descargarActivaciones']);
Route::get('reports/descargar/estado-promotores', [UserController::class, 'descargarPromotoresReport']);


// Mensajes y apis
Route::get('/auth/redirect',[AuthController::class, 'redirectGoogle']);
Route::get('/auth/google',[AuthController::class, 'callbackGoogle']);
Route::post('/vonage/sms-entrante',[MensajesVonageController::class,'smsEntrante']);

Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');



