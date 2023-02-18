<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Models\User;
<<<<<<< HEAD
=======
use App\Http\Controllers\Auth\AuthController;
>>>>>>> vite

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
<<<<<<< HEAD
      return redirect('/login');
   } else {
      return view('application', ['usuario' => $usuario]);
   }

=======

      return redirect('/login');
   
   } else {
   
      return view('application', ['usuario' => $usuario]);
   
   }
>>>>>>> vite

});


Route::get('/reset-password/{token}', function ($token) {
   return view('application',
      ['token' => $token]
   );
})->middleware('guest')->name('password.reset');
// Route::view('cotizacion/reserva/{reserva}','application');

<<<<<<< HEAD
=======
Route::get('/auth/redirect',[AuthController::class, 'redirectGoogle']);
Route::get('/auth/google',[AuthController::class, 'callbackGoogle']);

>>>>>>> vite

Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');


