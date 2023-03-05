<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{AuthController};
use App\Http\Controllers\{AmenidadController, CargoController, CategoriaFaqController, CategoriaProductoController, ConsumoController, CuponController, DestinoController, DivisaController, EmpleadoController, EventoController, FaqController, FormaPagoController, HomeController, HorarioController, HorarioReservacionController, IataController, MovimientoController, NegocioCategoriaController, NegocioController, UserController,NotificacionController,RolController,PermisoController, SolicitudController, TelefonoController,OpinionController, PanelController, ProductoController, PublicacionController, ReservacionController, SistemaController, SucursalController, TiendaController, VentaController};
use App\Http\Middleware\convertirNull;
use Laravel\Socialite\Facades\Socialite;
use App\Models\{CategoriaFaq, CategoriaProducto, Pais,Estado,Ciudad,};
use App\Http\Controllers\AtraccionController;
use App\Models\Divisa;
use App\Http\Controllers\ImagenController;
use App\Models\Negocio\HorarioReservacion;

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
    Route::put('cambiar/contrasena/usuario/{usuario}',[UserController::class, 'changePassword']);

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

    Route::post('usuario/perfil/referidos',[UserController::class,'misReferidos']);
    Route::put('usuarios/{usuario}/add/telefono',[UserController::class,'agregarTelefono']);
    Route::put('usuarios/{usuario}/toggle-like',[UserController::class,'toggleLike']);

    Route::post('users/search',[UserController::class,'searchUser']);

    
    /*****************************/
    /* TELEFONOS
    /*****************************/
    Route::resource('telefonos',TelefonoController::class);

    /*****************************/
    /* Destinos
    /*****************************/

    Route::get('destinos/{destino}/fetch/data',[DestinoController::class,'fetch']);
    Route::post('destinos/fetch/data',[DestinoController::class,'fetchData']);
    Route::resource('destinos',DestinoController::class);
    Route::put('destinos/{destino}/cargar/imagen',[DestinoController::class,'cargarImagen']);
    Route::delete('destinos/{destino}/eliminar/imagen/{imagen}',[DestinoController::class,'eliminarImagen']);
    
    /*****************************/
    /* Atracciones
    /*****************************/

    Route::get('atraccions/{atraccion}/fetch/data', [AtraccionController::class, 'fetch']);
    Route::post('atraccions/fetch/data', [AtraccionController::class, 'fetchData']);
    Route::resource('atraccions', AtraccionController::class);
    Route::put('atraccions/{atraccion}/cargar/imagen', [AtraccionController::class, 'cargarImagen']);
    Route::delete('atraccions/{atraccion}/eliminar/imagen/{imagen}', [AtraccionController::class, 'eliminarImagen']);
    Route::get('atraccions/{atraccion}/aperturar/horario',[AtraccionController::class,'aperturarHorario']);
    Route::put('atraccions/{atraccion}/guardar/horario',[AtraccionController::class, 'guardarHorario' ]);
    Route::get('atraccions/{atraccion}/quitar/horario',[AtraccionController::class,'quitarHorario']);
   


    /*****************************/
    /* Eventos
    /*****************************/
    Route::get('eventos/{evento}/fetch/data', [EventoController::class, 'fetch']);
    Route::resource('eventos', EventoController::class);
    Route::put('eventos/{evento}/cargar/imagen', [EventoController::class, 'cargarImagen']);
    Route::delete('eventos/{evento}/eliminar/imagen/{imagen}', [EventoController::class, 'eliminarImagen']);

    Route::get('get/all/destinos-y-atraccions',[EventoController::class,'getDestinosAtraccions']);

    /*****************************/
    /* Negocio Categorias
    /*****************************/

    Route::get('negocio/categorias/{categoria}/get', [NegocioCategoriaController::class, 'getCategoria']);
    Route::resource('negocio/categorias', NegocioCategoriaController::class);
    Route::post('negocio/categorias/fetch/data', [NegocioCategoriaController::class, 'fetchData']);
    Route::get('negocio/categorias/get/all', [NegocioCategoriaController::class, 'getAll']);


    /*****************************/
    /* Faqs y Categorias de Faqs
    /*****************************/

    Route::get('faqs/{faq}/get',[FaqController::class,'get']);
    Route::resource('faqs',FaqController::class);
    Route::post('faqs/fetch', [FaqController::class,'fetchData']);

    Route::post('faqs/categorias/fetch',[CategoriaFaqController::class,'fetchData']);

    Route::resource('faqs/faqs-categorias',CategoriaFaqController::class);
    Route::get('faqs/categorias/get/all',[CategoriaFaqController::class,'getAll']);
    Route::get('faqs/categorias/{categoria}/get',[CategoriaFaqController::class,'get']);


    /*****************************/
    /* Negocio Solicitudes
    /*****************************/

    Route::post('negocio/solicituds/fetch/data',[SolicitudController::class,'fetchData']);
    Route::resource('negocio/solicituds',SolicitudController::class)->middleware(convertirNull::class);
    Route::get('negocio/solicituds/get/all',[SolicitudController::class,'getAll']);
    Route::get('negocio/solicituds/{solicitud}/get',[SolicitudController::class,'getSolicitud']);


    /*****************************/
    /* Negocios
    /*****************************/
    Route::get('/negocios/{negocio}/fetch/data',[NegocioController::class,'fetch']);
    Route::post('negocios/fetch/data',[NegocioController::class,'fetchData']);
    Route::put('negocios/{negocio}/actualizar/logo',[NegocioController::class,'actualizarLogo']);
    Route::resource('negocios',NegocioController::class);

    Route::put('negocios/{negocio}/add/imagen',[NegocioController::class,'addImagen']);
    Route::delete('negocios/eliminar/imagen/{imagen}',[NegocioController::class,'eliminarImagen']);

    Route::put('negocios/{negocio}/add/telefono',[NegocioController::class,'addTelefono']);

    Route::get('negocios/{negocio}/aperturar/horario',[NegocioController::class,'aperturarHorario']);
    Route::get('negocios/{negocio}/quitar/horario',[NegocioController::class, 'quitarHorario']);
    Route::put('negocios/{negocio}/guardar/amenidads',[NegocioController::class,'guardarAmenidad']);
    Route::put('negocios/{negocio}/guardar/formas-pago', [NegocioController::class, 'guardarFormasPagos']);
    Route::put('negocios/{negocio}/agregar/red-social',[NegocioController::class,'agregarRed']);
    Route::delete('negocios/{negocio}/quitar/red-social/{red}',[NegocioController::class,'quitarRed']);
    Route::get('negocios/{negocio}/quitar/all-redes',[NegocioController::class,'quitarRedes']);
    Route::put('negocios/{negocio}/guardar/video',[NegocioController::class,'guardarVideo'])->middleware('convertir.null');

    Route::put('negocios/{negocio}/consultar/horas',[NegocioController::class,'consultarHoras']);

    Route::put('negocios/{negocio}/cargar/saldo',[NegocioController::class,'agregarSaldo']);

    Route::get('negocios/{negocio}/datos/home',[NegocioController::class,'datosHome']); 

Route::get('negocios/{negocio}/recomendacions/toggle/user/{usuario}',[NegocioController::class, 'togleRecomendacion']);
    Route::get('negocios/{negocio}/seguidors/toggle/user/{usuario}', [NegocioController::class, 'toggleSeguidor']);

    Route::post('negocios/users/asociado',[NegocioController::class,'negociosAsociados']);

    Route::put('negocios/{negocio}/update/menu',[NegocioController::class,'updateMenu']);
    

    /*****************************/
    /* Divisas
    /*****************************/

    Route::get('divisas/{divisa}/fetch',[DivisaController::class,'fetch']);
    Route::post('divisas/fetch/data',[DivisaController::class,'fetchData']);
    Route::resource('divisas',DivisaController::class);
    Route::get('divisas/get/principal',[DivisaController::class,'getPrincipal']);
    Route::get('divisas/get/all',fn() => response()->json(Divisa::all()));


    /*****************************/
    /* cuenta y movimientos
    /*****************************/

    Route::post('/movimientos/fetch/data',[MovimientoController::class,'fetchData']);

    /*****************************/
    /* Iata
    /*****************************/

    Route::get('iatas/{iata}/fetch/data',[IataController::class,'fetch']);
    Route::post('iatas/fetch/data', [IataController::class, 'fetchData']);
    Route::resource('iatas',IataController::class);
    Route::get('iatas/get/all',[IataController::class, 'getIatas']);

    /*****************************/
    /* Imagenes
    /*****************************/
    Route::put('imagens/{imagen}/toggle', [ImagenController::class, 'togglePrincipal']);


    /*****************************/
    /* Horarios
    /*****************************/

    Route::resource('horarios',HorarioController::class);

    /*****************************/
    /* Opinions
    /*****************************/

    Route::post('opinions/fetch/data',[OpinionController::class,'fetchData']);
    Route::resource('opinions',OpinionController::class);


    /*****************************/
    /* Panels
    /*****************************/

    Route::post('panels/fetch/data',[PanelController::class,'fetchData']);
    Route::get('panels/{panel}/fetch/data',[PanelController::class,'fetch']);
    Route::get('panels/get/all',[PanelController::class,'getAll']);

    Route::resource('panels',PanelController::class);
    Route::get('panels/{panel}/get/permisos',[PanelController::class,'getPermisosPanel']);


    /*****************************/
    /* Cargos de negocios
    /*****************************/
    Route::get('cargos/get/all',[CargoController::class,'getAll']);
    Route::post('cargos/fetch/data',[CargoController::class,'fetchData']);
    Route::resource('cargos',CargoController::class);
    Route::get('cargos/{cargo}/fetch/data',[CargoController::class,'fetch']);

    /*****************************/
    /* Empleados de negocios
    /*****************************/
    Route::get('empleados/get/all', [EmpleadoController::class, 'getAll']);
    Route::post('empleados/fetch/data', [EmpleadoController::class, 'fetchData']);
    Route::resource('empleados', EmpleadoController::class);
    Route::get('empleados/{empleado}/fetch/data', [EmpleadoController::class, 'fetch']);

    /*****************************/
    /* Cargar negocio Loggin emp
    /*****************************/
    Route::get('empleado/cargar/negocio/{ultimoNegocio?}',[NegocioController::class,'cargarNegocioEmpleado'])->middleware('convertir.null');
    Route::get('empleado/cambiar/negocio/{negocio}',[NegocioController::class,'cambiarNegocioEmpleado']);


    /*****************************/
    /* Amenidades
    /*****************************/

    Route::get('amenidads/get/all',[AmenidadController::class,'getAll']);
    Route::post('amenidads/fetch/data',[AmenidadController::class,'fetchData']);
    Route::resource('amenidads',AmenidadController::class);
    Route::get('amenidads/{amenidad}/fetch/data',[AmenidadController::class,'fetch']);

    /*****************************/
    /* Formas de Pago
    /*****************************/

    Route::get('formas-pago/get/all', [FormaPagoController::class, 'getAll']);
    Route::post('formas-pago/fetch/data', [FormaPagoController::class, 'fetchData']);
    Route::resource('formas-pago', FormaPagoController::class);
    Route::get('formas-pago/{forma}/fetch/data', [FormaPagoController::class, 'fetch']);


    /*****************************/
    /* Publicacions
    /*****************************/

    Route::get('publicacions/{publicacion}/fetch/data', [PublicacionController::class, 'fetch']);
    Route::post('publicacions/get/all', [PublicacionController::class, 'getAll']);
    Route::resource('publicacions', PublicacionController::class);

    Route::put('publicacions/{publicacion}/add/imagen', [PublicacionController::class, 'addImagen']);
    Route::delete('publicacions/eliminar/imagen/{imagen}', [PublicacionController::class, 'eliminarImagen']);



    /*****************************/
    /* Cupones Negocio
    /*****************************/

    Route::post('cupons/fetch/data', [CuponController::class, 'fetchData']);
    Route::get('cupons/{certificado}/fetch/data', [CuponController::class, 'fetch']);
    Route::get('cupons/negocio/{negocio}/get/all', [CuponController::class, 'getAll']);

    Route::resource('cupons', CuponController::class);


    /*****************************/
    /* Ventas de negocio
    /*****************************/

    Route::post('ventas/fetch/data', [VentaController::class, 'fetchData']);
    Route::get('ventas/{venta}/fetch/data', [VentaController::class, 'fetch']);
    Route::get('ventas/negocio/{negocio}/get/all', [VentaController::class, 'getAll']);
    Route::resource('ventas', VentaController::class);
    Route::post('ventas/fetch/data/consumo',[VentaController::class,'fetchConsumos']);

    /***********************************/
    /* Horario Reservacion Negocio
    /**********************************/


    Route::post('horario-reservacion/fetch/data', [HorarioReservacionController::class, 'fetchData']);
    Route::get('horario-reservacion/{horario}/fetch/data', [HorarioReservacionController::class, 'fetch']);
    Route::get('horario-reservacion/negocio/{negocio}/get/all', [HorarioReservacionController::class, 'getAll']);


    Route::resource('horario-reservacion', HorarioReservacionController::class);

    Route::post('horarios/asignar/horario',[HorarioReservacionController::class,'asignarHorario']);


    /***********************************/
    /* Reservacions
    /**********************************/


    Route::post('reservacions/fetch/data', [ReservacionController::class, 'fetchData']);
    Route::post('reservacions/fetch/data/user', [ReservacionController::class, 'fetchDataUser']);

    Route::get('reservacions/{reservacion}/fetch/data', [ReservacionController::class, 'fetch']);
    Route::get('reservacions/get/all', [ReservacionController::class, 'getAll']);
    Route::get('reservacions/negocio/{negocio}/get/all',[ReservacionController::class,'getAll']);
    Route::resource('reservacions', ReservacionController::class);
    Route::get('reservacions/{reservacion}/cancelar',[ReservacionController::class,'cancelar']);



    /*****************************/
    /* Admin sistema
    /*****************************/

    Route::put('sistema/{sistema}',[ SistemaController::class, 'update' ]);
    Route::get('sistemas/{sistema}/crear/cuenta',[SistemaController::class,'crearCuenta']);
    Route::put('sistema/{sistema}/update/banner',[SistemaController::class,'updateBanner']);
    Route::delete('sistema/{sistema}/eliminar/red/social/{red}',[SistemaController::class,'eliminarRedSocial']);


    /*****************************/
    /* Categoria de Productos
    /*****************************/

    Route::post('categoria-productos/fetch/data',[CategoriaProductoController::class,'fetchData']);
    Route::get('categoria-productos/{categoria}/fetch/data',[CategoriaProductoController::class,'fetch']);
    Route::resource('categoria-productos', CategoriaProductoController::class);


    /*****************************/
    /* Tienda
    /*****************************/

    Route::post('tiendas/fetch/data',[TiendaController::class,'fetchData']);
    Route::get('tiendas/{tienda}/fetch/data',[TiendaController::class,'fetch']);
    Route::resource('tiendas', TiendaController::class);


    /*****************************/
    /* Producto
    /*****************************/

    
    Route::resource('productos', ProductoController::class);
    Route::put('productos/{producto}/cargar/imagen', [ProductoController::class, 'cargarImagen']);
    Route::delete('productos/{producto}/eliminar/imagen/{imagen}', [ProductoController::class, 'eliminarImagen']);
    Route::put('productos/{producto}/cargar/archivo',[ProductoController::class,'cargarArchivo']);

    /*****************************/
    /* Consumos
    /*****************************/

    Route::post('consumos/fetch/data', [ConsumoController::class, 'fetchData']);
    Route::get('consumos/{consumo}/fetch/data', [ConsumoController::class, 'fetch']);
    Route::resource('consumos', ConsumoController::class);
    Route::get('consumos/{consumo}/marcar/comentada',[ConsumoController::class,'marcarComentada']);

    /*****************************/
    /* Carrito Compra
    /*****************************/

    Route::get('carrito/compra/{usuario}/get',[UserController::class,'getCarrito']);
    Route::get('carrito/compra/{usuario}/quitar/producto/{producto}',[UserController::class,'sacarProductoCarrito']);
    Route::post('carrito/comprar/agregar/producto',[UserController::class,'addProductoCarrito']);

    Route::post('carrito/fetch/data',[UserController::class,'fetchDataCarrito']);

    /*****************************/
    /* Sistema
    /*****************************/

    Route::post('sistema/upload/archivos',[SistemaController::class,'uploadArchivos']);
    Route::put('sistemas/{sistema}/eliminar/archivo',[SistemaController::class,'eliminarArchivo']);


    /*****************************/
    /* Sucursal
    /*****************************/
    Route::post('sucursals/fetch/data',[SucursalController::class,'fetchData']);
    Route::get('sucursals/get/all',[SucursalController::class,'getAll']);
    Route::get('sucursals/{sucursal}/fetch/data',[SucursalController::class,'fetch']);
    Route::resource('sucursals',SucursalController::class);



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
Route::post('cargar/categorias', [CategoriaFaqController::class, 'cargar']);

Route::post('auth/google',[AuthController::class, 'authGoogle']);


// Destinos 
Route::get('destinos/get/all', [DestinoController::class, 'getAll']);

// Atracciones
Route::get('atraccions/get/all', [AtraccionController::class, 'getAll']);
Route::get('atraccions/{atraccion}/otras/cercanas',[AtraccionController::class,'otrasCercanas']);
// Search Public
Route::post('search/public',[HomeController::class,'searchPublic']);
Route::post('search/location',[HomeController::class,'searchLocation']);
Route::post('destinos/obtener/por-nombre',[DestinoController::class,'getPorNombre']);

Route::post('atraccions/obtener/por-nombre', [AtraccionController::class, 'getPorNombre']);

Route::post('opinions/fetch/data/model',[OpinionController::class,'fetchDataModel']);

// Sistema

Route::get('sistema/fetch',[SistemaController::class,'fetch']);

// Capturar negocio por Url 
Route::post('negocio/obtener-por-url',[NegocioController::class,'capturarPorUrl']);

// Perfil Negocio Publicaciones

Route::post('publicacions/fetch/data', [PublicacionController::class, 'fetchData']);

// perfil Negocio Eventos

Route::post('eventos/fetch/data', [EventoController::class, 'fetchData']);

// Negocios

Route::post('negocios/fetch/data/public',[NegocioController::class,'fetchDataPublic']);

// Rango de precios Productos

Route::get('productos/rango/precios',[ProductoController::class,'rangoPrecios']);

// Categorias de Productos

Route::get('categoria-productos/get/all',[CategoriaProductoController::class,'getAll']);
// Todas las tiendas

Route::get('tiendas/get/all',[TiendaController::class,'getAll']);

// Productos 

Route::post('productos/fetch/data', [ProductoController::class, 'fetchData']);
Route::get('productos/{producto}/fetch/data', [ProductoController::class, 'fetch']);
