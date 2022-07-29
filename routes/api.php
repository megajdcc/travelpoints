<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{AuthController};
use App\Http\Controllers\{ UserController,NotificacionController,RolController,PermisoController};
use Laravel\Socialite\Facades\Socialite;
use App\Models\{Pais,Estado,Ciudad};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



// Route::middleware('auth:api')->group(function(){


    Route::group(['prefix' => 'auth'], function () {
        
        Route::get('google/redirect',[AuthController::class,'redirectGoogle']);
        Route::get('google/callback', [AuthController::class, 'callbackGoogle']);

        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('nuevo/usuario',[UserController::class,'nuevoUsuario']);
        Route::post('recuperar/contrasena',[AuthController::class,'recuperarContrasena']);
        Route::post('reset-password',[AuthController::class,'resetPassword']);
        

        Route::group(['middleware' => 'auth:sanctum'], function () {
            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('user', [AuthController::class, 'user']);
        });

    });
    
// });





Route::group(['middleware' => 'auth:sanctum'], function () {

    // Request de usuarios Form Perfil 

    Route::post('upload/avatar', [UserController::class, 'uploadAvatar'])->name('upload_avatar');
    Route::put('perfil/update/usuario/{usuario}',[UserController::class, 'updatePerfil']);
    Route::post('cambiar/contrasena/usuario/{usuario}',[UserController::class, 'changePassword']);


    /*****************************/
    /* NOTIFICACIONES
    /*****************************/

    Route::get('notificaciones/{usuario}',[NotificacionController::class,'NotificacionesSinLeer']);
    Route::get('notificaciones/markread/{notificacion}/usuario/{usuario}',[NotificacionController::class,'NotificacionLeida']);
    Route::delete('notificaciones/{notificacion}/usuario/{usuario}',[NotificacionController::class,'eliminar']);
    Route::get('notificaciones/marknoread/{notificacion}/usuario/{usuario}',[NotificacionController::class,'NotificacionNoLeida']);

    Route::get('notificaciones/todoleido/usuario/{usuario}',[NotificacionController::class,'todoLeido']);
    Route::post('notificaciones/seleccionados/leidos/usuario/{usuario}',[NotificacionController::class,'seleccionadasLeidas']);
    Route::post('notificaciones/seleccionados/eliminar/usuario/{usuario}', [NotificacionController::class, 'eliminarSeleccionados']);

    /*****************************/
    /* ROLES DE USUARIO
    /*****************************/ 
    Route::resource('roles', RolController::class);
    Route::get('roles/get/permisos', [PermisoController::class, 'getPermisos'])->name('getPermisos');
    Route::get('roles/listar/table', [RolController::class, 'listar']);
    Route::delete('roles/delete/{role}', [RolController::class, 'destroy']);
    Route::get('listar/roles', [RolController::class, 'roles']);
    Route::post('fetch/roles',[RolController::class,'fetchData']);
    Route::get('roles/{role}/get',[RolController::class,'getRol']);
    


    /*****************************/
    /* PERMISOS DE USUARIO
    /*****************************/ 
    Route::resource('permisos', PermisoController::class);
    Route::get('listar/permisos', [PermisoController::class, 'listarPermisos'])->name('listar_permisos');
    Route::post('/revocar/permiso/{permiso}/role/{role}', [RolController::class, 'revocarPermiso']);
    Route::post('/listar/permisos/role/{role}', [RolController::class, 'listarPermisosRole']);
    Route::get('cargar/permisos', [PermisoController::class, 'getPermissions']);
    Route::get('permisos/listar/table',[PermisoController::class, 'listarPermisos']);
    Route::post('fetch/permisos', [PermisoController::class, 'fetchData']);
    Route::get('permisos/{permiso}/get', [PermisoController::class, 'getPermiso']);



    /*****************************/
    /* USUARIOS
    /*****************************/
    Route::get('/usuarios/all', [UserController::class, 'getUsuarios']);
    Route::resource('usuarios', UserController::class)->middleware('format_telefono');
    Route::get('listar/usuarios', [UserController::class, 'listar'])->name('listar_usuarios');
    Route::get('usuarios/{usuario}/get',[UserController::class,'getUsuario']);

    Route::post('fetch/usuarios',[UserController::class,'getUsers']);
    Route::post('usuario/{usuario}/update/avatar',[UserController::class,'actualizarAvatarUsuario']);

    Route::post('desactivar/usuario',[UserController::class,'desactivarCuenta']);

    Route::put('usuarios/{usuario}/crear/link/referidor',[UserController::class,'crearLinkReferidor']);


});

Route::put('usuario/{usuario}/establecer/contrasena', [UserController::class, 'EstablecerContrasena'])->name('establecercontrasena');

Route::get('get/paises',function(){
    $paises = Pais::get();
    return response()->json($paises);
});

Route::get('get/estados/{pais}', function(Pais $pais) {
    $estados = $pais->estados;
    return response()->json($estados);
});

Route::get('get/ciudades/{estado}', function (Estado $estado) {
    $ciudades = $estado->ciudades;
    return response()->json($ciudades);
});


Route::get('usuarios/verificar/codigo/{codigo}', [UserController::class, 'verificarCodigo']);


