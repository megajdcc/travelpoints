<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Models\User;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\EstadoCuentaController;
use App\Http\Controllers\MensajesVonageController;
use App\Http\Controllers\UserController;
use App\Mail\NuevoConsumo;
use App\Models\Consumo;
use App\Models\Movimiento;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as PDFB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/reports/view/activaciones',function(Request $request){

   $usuario = $request->user();

   $invitados = DB::table('users', 'u')
      ->join('rols as r', 'u.rol_id', 'r.id')
      ->join('usuario_referencia as ur', 'u.id', 'ur.referido_id')
      ->where('ur.usuario_id', $usuario->id)
      ->where('u.activo', true)
      ->selectRaw("concat(u.nombre,' ',u.apellido) as nombre, u.username, u.email, u.created_at as creado,r.nombre as rol")
      ->orderBy('creado')
      ->get();

   $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));

   return view('reports.activaciones', [
      'invitados' => $invitados,
      'usuario' => $usuario,
      'logotipo' => $imagenBase64,

   ]);

});

Route::get('/usuario/{usuario}/establecer/contrasena', function (User $usuario) {

   if ($usuario->is_password) {

      return redirect('/login');
   
   } else {
   
      return view('application', ['usuario' => $usuario]);
   
   }

});


Route::get('/reset-password/{token}', function ($token) {
   return view('application',
      ['token' => $token]
   );
})->middleware('guest')->name('password.reset');
// Route::view('cotizacion/reserva/{reserva}','application');

// Reportes
Route::get('reports/descargar/estados-cuenta',[EstadoCuentaController::class,'descargar']);
Route::get('reports/descargar/activaciones',[UserController::class,'descargarActivaciones']);

// Mensajes y apis
Route::get('/auth/redirect',[AuthController::class, 'redirectGoogle']);
Route::get('/auth/google',[AuthController::class, 'callbackGoogle']);
Route::post('/vonage/sms-entrante',[MensajesVonageController::class,'smsEntrante']);

Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');



