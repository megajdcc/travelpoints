<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Models\User;
use App\Http\Controllers\Auth\AuthController;

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

Route::get('/auth/redirect',[AuthController::class, 'redirectGoogle']);
Route::get('/auth/google',[AuthController::class, 'callbackGoogle']);


Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');


