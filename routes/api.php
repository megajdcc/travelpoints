<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{AuthController};
use App\Http\Controllers\{AcademiaVideoController, AmenidadController, ApplicationController, CargoController, CategoriaFaqController, CategoriaProductoController, ComisionController, ConsumoController, CuponController, DashboardController, DatosPagosController, DestinoController, DivisaController, EmpleadoController, EventoController, FaqController, FormaPagoController, HomeController, HorarioController, HorarioReservacionController, IataController, MovimientoController, NegocioCategoriaController, NegocioController, UserController, NotificacionController, RolController, PermisoController, SolicitudController, TelefonoController, OpinionController, PanelController, ProductoController, PublicacionController, ReservacionController, RetiroController, SistemaController, SucursalController, TiendaController, VentaController};
use App\Http\Middleware\convertirNull;
use Laravel\Socialite\Facades\Socialite;
use App\Models\{CategoriaFaq, CategoriaProducto, Pais, Estado, Ciudad,};
use App\Http\Controllers\AtraccionController;
use App\Models\Divisa;
use App\Http\Controllers\ImagenController;
use App\Models\Negocio\HorarioReservacion;

use App\Http\Controllers\{PaisController, CiudadController, EstadoController, LoteController, MensajesVonageController, PaginaController, ReunionController, TarjetaController};

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

    Route::get('google/redirect', [AuthController::class, 'redirectGoogle']);
    Route::get('google/callback', [AuthController::class, 'callbackGoogle']);

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('nuevo/usuario', [UserController::class, 'nuevoUsuario']);
    Route::post('recuperar/contrasena', [AuthController::class, 'recuperarContrasena']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);


    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});

// });





Route::group(['middleware' => 'auth:sanctum'], function () {

    // Request de usuarios Form Perfil 

    Route::post('upload/avatar', [UserController::class, 'uploadAvatar'])->name('upload_avatar');
    Route::put('perfil/update/usuario/{usuario}', [UserController::class, 'updatePerfil']);
    Route::put('cambiar/contrasena/usuario/{usuario}', [UserController::class, 'changePassword']);
    Route::post('usuarios/{usuario}/toggle-portada',[UserController::class,'togglePortada']);

    /*****************************/
    /* NOTIFICACIONES
    /*****************************/

    Route::get('notificaciones/{usuario}', [NotificacionController::class, 'NotificacionesSinLeer']);
    Route::get('notificaciones/markread/{notificacion}/usuario/{usuario}', [NotificacionController::class, 'NotificacionLeida']);
    Route::delete('notificaciones/{notificacion}/usuario/{usuario}', [NotificacionController::class, 'eliminar']);
    Route::get('notificaciones/marknoread/{notificacion}/usuario/{usuario}', [NotificacionController::class, 'NotificacionNoLeida']);

    Route::get('notificaciones/todoleido/usuario/{usuario}', [NotificacionController::class, 'todoLeido']);
    Route::post('notificaciones/seleccionados/leidos/usuario/{usuario}', [NotificacionController::class, 'seleccionadasLeidas']);
    Route::post('notificaciones/seleccionados/eliminar/usuario/{usuario}', [NotificacionController::class, 'eliminarSeleccionados']);

    /*****************************/
    /* ROLES DE USUARIO
    /*****************************/
    Route::resource('roles', RolController::class);
    Route::get('roles/get/permisos', [PermisoController::class, 'getPermisos'])->name('getPermisos');
    Route::get('roles/listar/table', [RolController::class, 'listar']);
    Route::delete('roles/delete/{role}', [RolController::class, 'destroy']);
    Route::get('listar/roles', [RolController::class, 'roles']);
    Route::post('fetch/roles', [RolController::class, 'fetchData']);
    Route::get('roles/{role}/get', [RolController::class, 'getRol']);



    /*****************************/
    /* PERMISOS DE USUARIO
    /*****************************/
    Route::resource('permisos', PermisoController::class);
    Route::get('listar/permisos', [PermisoController::class, 'listarPermisos'])->name('listar_permisos');
    Route::post('/revocar/permiso/{permiso}/role/{role}', [RolController::class, 'revocarPermiso']);
    Route::post('/listar/permisos/role/{role}', [RolController::class, 'listarPermisosRole']);
    Route::get('cargar/permisos', [PermisoController::class, 'getPermissions']);
    Route::get('permisos/listar/table', [PermisoController::class, 'listarPermisos']);
    Route::post('fetch/permisos', [PermisoController::class, 'fetchData']);
    Route::get('permisos/{permiso}/get', [PermisoController::class, 'getPermiso']);



    /*****************************/
    /* USUARIOS
    /*****************************/
    Route::get('/usuarios/all', [UserController::class, 'getUsuarios']);
    Route::get('usuarios/get/lideres', [UserController::class, 'getLideres']);
    Route::get('usuarios/get/coordinadores', [UserController::class, 'getCoordinadores']);

    Route::resource('usuarios', UserController::class)->middleware('format_telefono');
    Route::get('listar/usuarios', [UserController::class, 'listar'])->name('listar_usuarios');
    Route::get('usuarios/{usuario}/get', [UserController::class, 'getUsuario']);

    Route::post('fetch/usuarios', [UserController::class, 'getUsers']);
    Route::post('usuario/{usuario}/update/avatar', [UserController::class, 'actualizarAvatarUsuario']);

    Route::post('desactivar/usuario', [UserController::class, 'desactivarCuenta']);

    Route::put('usuarios/{usuario}/crear/link/referidor', [UserController::class, 'crearLinkReferidor']);

    Route::post('usuario/perfil/referidos', [UserController::class, 'misReferidos']);
    Route::put('usuarios/{usuario}/add/telefono', [UserController::class, 'agregarTelefono']);
    Route::put('usuarios/{usuario}/toggle-like', [UserController::class, 'toggleLike']);

    Route::post('users/search', [UserController::class, 'searchUser']);
    Route::put('usuarios/{usuario}/change-divisa', [UserController::class, 'changeDivisa']);
    Route::get('usuarios/{usuario}/cambiar/estado', [UserController::class, 'cambiarStatus']);

    Route::post('usuarios/promotores/fetch/data', [UserController::class, 'fetchDataPromotores']);
    Route::post('usuarios/lideres/fetch/data', [UserController::class, 'fetchDataLideres']);
    Route::post('usuarios/coordinadores/fetch/data', [UserController::class, 'fetchDataCoordinadores']);

    Route::post('usuarios/promotor/asignar/lider', [UserController::class, 'asignarLiderPromotor']);
    Route::post('usuarios/lider/asignar/coordinador', [UserController::class, 'asignarCoordinadorLider']);

    Route::get('usuarios/promotor/{promotor}/quitar/lider', [UserController::class, 'quitarLiderPromotor']);
    Route::get('usuarios/lider/{lider}/quitar/coordinador', [UserController::class, 'quitarCoordinadorLider']);

    Route::post('usuarios/promotor/save', [UserController::class, 'guardarPromotor']);
    Route::post('usuarios/lider/save', [UserController::class, 'guardarLider']);

    Route::put('usuarios/{usuario}/asociar/tarjeta',[UserController::class,'asociarTarjeta']);
    Route::delete('usuarios/{usuario}/cancelar/tarjeta/{tarjeta}',[UserController::class,'cancelarTarjeta']);

    Route::put('usuarios/{usuario}/get-movimiento-por-mes',[HomeController::class, 'getMovimientosPorMes']);
    Route::get('usuarios/{usuario}/get-acumulado-por-ano',[HomeController::class,'getAcumuladoPorAno']);
    Route::get('usuarios/{usuario}/get-efectividad',[HomeController::class,'getEfectividad']);
    Route::get('usuarios/{usuario}/get-status',[UserController::class, 'getEstado']);

    Route::post('usuarios/{usuario}/mis-invitados',[UserController::class,'fetchDataInvitados']);

    /*****************************/
    /* TELEFONOS
    /*****************************/
    Route::resource('telefonos', TelefonoController::class);

    /*****************************/
    /* Destinos
    /*****************************/

    Route::get('destinos/{destino}/fetch/data', [DestinoController::class, 'fetch']);
    Route::post('destinos/fetch/data', [DestinoController::class, 'fetchData']);
    Route::resource('destinos', DestinoController::class);
    Route::put('destinos/{destino}/cargar/imagen', [DestinoController::class, 'cargarImagen']);
    Route::delete('destinos/{destino}/eliminar/imagen/{imagen}', [DestinoController::class, 'eliminarImagen']);
    Route::put('destinos/{destino}/toggle/active', [DestinoController::class, 'toggleActive']);
    /*****************************/
    /* Atracciones
    /*****************************/

    Route::get('atraccions/{atraccion}/fetch/data', [AtraccionController::class, 'fetch']);
    Route::post('atraccions/fetch/data', [AtraccionController::class, 'fetchData']);
    Route::resource('atraccions', AtraccionController::class);
    Route::put('atraccions/{atraccion}/cargar/imagen', [AtraccionController::class, 'cargarImagen']);
    Route::delete('atraccions/{atraccion}/eliminar/imagen/{imagen}', [AtraccionController::class, 'eliminarImagen']);
    Route::get('atraccions/{atraccion}/aperturar/horario', [AtraccionController::class, 'aperturarHorario']);
    Route::put('atraccions/{atraccion}/guardar/horario', [AtraccionController::class, 'guardarHorario']);
    Route::get('atraccions/{atraccion}/quitar/horario', [AtraccionController::class, 'quitarHorario']);



    /*****************************/
    /* Eventos
    /*****************************/
    Route::get('eventos/{evento}/fetch/data', [EventoController::class, 'fetch']);
    Route::resource('eventos', EventoController::class);
    Route::put('eventos/{evento}/cargar/imagen', [EventoController::class, 'cargarImagen']);
    Route::delete('eventos/{evento}/eliminar/imagen/{imagen}', [EventoController::class, 'eliminarImagen']);

    Route::get('get/all/destinos-y-atraccions', [EventoController::class, 'getDestinosAtraccions']);

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

    Route::get('faqs/{faq}/get', [FaqController::class, 'get']);
    Route::resource('faqs', FaqController::class);
    Route::post('faqs/fetch', [FaqController::class, 'fetchData']);

    Route::post('faqs/categorias/fetch', [CategoriaFaqController::class, 'fetchData']);

    Route::resource('faqs/faqs-categorias', CategoriaFaqController::class);
    Route::get('faqs/categorias/get/all', [CategoriaFaqController::class, 'getAll']);
    Route::get('faqs/categorias/{categoria}/get', [CategoriaFaqController::class, 'get']);


    /*****************************/
    /* Negocio Solicitudes
    /*****************************/

    Route::post('negocio/solicituds/fetch/data', [SolicitudController::class, 'fetchData']);
    Route::post('negocio/solicituds/fetch/data/admin', [SolicitudController::class, 'fetchDataAdmin']);
    Route::get('negocio/solicituds/sinaceptar', [SolicitudController::class, 'solicitudesSinAceptar']);
    Route::resource('negocio/solicituds', SolicitudController::class)->middleware(convertirNull::class);
    Route::get('negocio/solicituds/get/all', [SolicitudController::class, 'getAll']);
    Route::get('negocio/solicituds/{solicitud}/get', [SolicitudController::class, 'getSolicitud']);
    Route::get('negocio/mis-solicitudes',[SolicitudController::class,'misSolicitudes']);

    Route::get('negocios/get-cantidad/solicitudes',[SolicitudController::class, 'solicitudesSinAceptar']);
    /*****************************/
    /* Negocios
    /*****************************/
    Route::get('/negocios/{negocio}/fetch/data', [NegocioController::class, 'fetch']);
    Route::post('negocios/fetch/data', [NegocioController::class, 'fetchData']);
    Route::put('negocios/{negocio}/actualizar/logo', [NegocioController::class, 'actualizarLogo']);
    Route::resource('negocios', NegocioController::class);

    Route::put('negocios/{negocio}/add/imagen', [NegocioController::class, 'addImagen']);
    Route::delete('negocios/eliminar/imagen/{imagen}', [NegocioController::class, 'eliminarImagen']);

    Route::put('negocios/{negocio}/add/telefono', [NegocioController::class, 'addTelefono']);

    Route::get('negocios/{negocio}/aperturar/horario', [NegocioController::class, 'aperturarHorario']);
    Route::get('negocios/{negocio}/quitar/horario', [NegocioController::class, 'quitarHorario']);
    Route::put('negocios/{negocio}/guardar/amenidads', [NegocioController::class, 'guardarAmenidad']);
    Route::put('negocios/{negocio}/guardar/formas-pago', [NegocioController::class, 'guardarFormasPagos']);
    Route::put('negocios/{negocio}/agregar/red-social', [NegocioController::class, 'agregarRed']);
    Route::delete('negocios/{negocio}/quitar/red-social/{red}', [NegocioController::class, 'quitarRed']);
    Route::get('negocios/{negocio}/quitar/all-redes', [NegocioController::class, 'quitarRedes']);
    Route::put('negocios/{negocio}/guardar/video', [NegocioController::class, 'guardarVideo'])->middleware('convertir.null');

    Route::put('negocios/{negocio}/consultar/horas', [NegocioController::class, 'consultarHoras']);

    Route::put('negocios/{negocio}/cargar/saldo', [NegocioController::class, 'agregarSaldo']);

    Route::get('negocios/{negocio}/datos/home', [NegocioController::class, 'datosHome']);
    
    Route::get('negocios/{negocio}/recomendacions/toggle/user/{usuario}', [NegocioController::class, 'togleRecomendacion']);
    Route::get('negocios/{negocio}/seguidors/toggle/user/{usuario}', [NegocioController::class, 'toggleSeguidor']);

    Route::post('negocios/users/asociado', [NegocioController::class, 'negociosAsociados']);

    Route::put('negocios/{negocio}/update/menu', [NegocioController::class, 'updateMenu']);

    Route::put('negocios/{negocio}/gestion/saldo', [NegocioController::class, 'gestionSaldo']);

    Route::get('negocios/get/all', [NegocioController::class, 'getNegocios']);
    Route::get('negocios/{negocio}/toggle-publicado',[NegocioController::class,'togglePublicado']);


    /*****************************/
    /* Divisas
    /*****************************/

    Route::get('divisas/{divisa}/fetch', [DivisaController::class, 'fetch']);
    Route::post('divisas/fetch/data', [DivisaController::class, 'fetchData']);
    Route::resource('divisas', DivisaController::class);
    Route::get('divisas/get/principal', [DivisaController::class, 'getPrincipal']);
    Route::get('divisas/get/all', fn () => response()->json(Divisa::all()));


    /*****************************/
    /* cuenta y movimientos
    /*****************************/

    Route::post('/movimientos/fetch/data', [MovimientoController::class, 'fetchData']);

    /*****************************/
    /* Iata
    /*****************************/

    Route::get('iatas/{iata}/fetch/data', [IataController::class, 'fetch']);
    Route::post('iatas/fetch/data', [IataController::class, 'fetchData']);
    Route::resource('iatas', IataController::class);
    Route::get('iatas/get/all', [IataController::class, 'getIatas']);

    /*****************************/
    /* Imagenes
    /*****************************/
    Route::put('imagens/{imagen}/toggle', [ImagenController::class, 'togglePrincipal']);


    /*****************************/
    /* Horarios
    /*****************************/

    Route::resource('horarios', HorarioController::class);

    /*****************************/
    /* Opinions
    /*****************************/

    Route::post('opinions/fetch/data', [OpinionController::class, 'fetchData']);
    Route::resource('opinions', OpinionController::class);


    /*****************************/
    /* Panels
    /*****************************/

    Route::post('panels/fetch/data', [PanelController::class, 'fetchData']);
    Route::get('panels/{panel}/fetch/data', [PanelController::class, 'fetch']);
    Route::get('panels/get/all', [PanelController::class, 'getAll']);

    Route::resource('panels', PanelController::class);
    Route::get('panels/{panel}/get/permisos', [PanelController::class, 'getPermisosPanel']);


    /*****************************/
    /* Cargos de negocios
    /*****************************/
    Route::get('cargos/get/all', [CargoController::class, 'getAll']);
    Route::post('cargos/fetch/data', [CargoController::class, 'fetchData']);
    Route::resource('cargos', CargoController::class);
    Route::get('cargos/{cargo}/fetch/data', [CargoController::class, 'fetch']);

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
    Route::get('empleado/cargar/negocio/{ultimoNegocio?}', [NegocioController::class, 'cargarNegocioEmpleado'])->middleware('convertir.null');
    Route::get('empleado/cambiar/negocio/{negocio}', [NegocioController::class, 'cambiarNegocioEmpleado']);


    /*****************************/
    /* Amenidades
    /*****************************/

    Route::get('amenidads/get/all', [AmenidadController::class, 'getAll']);
    Route::post('amenidads/fetch/data', [AmenidadController::class, 'fetchData']);
    Route::resource('amenidads', AmenidadController::class);
    Route::get('amenidads/{amenidad}/fetch/data', [AmenidadController::class, 'fetch']);

    /*****************************/
    /* Formas de Pago
    /*****************************/

    Route::get('formas-pago/get/all', [FormaPagoController::class, 'getAll']);
    Route::post('formas-pago/fetch/data', [FormaPagoController::class, 'fetchData']);
    Route::resource('formas-pago', FormaPagoController::class);
    Route::get('formas-pago/{forma}/fetch/data', [FormaPagoController::class, 'fetch']);


    /*****************************/
    /* Comisiones
    /*****************************/

    Route::get('comisions/get/all', [ComisionController::class, 'getAll']);
    Route::post('comisions/fetch/data', [ComisionController::class, 'fetchData']);
    Route::resource('comisions', ComisionController::class);
    Route::get('comisions/{comision}/fetch/data', [ComisionController::class, 'fetch']);


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
    Route::get('cupons/{cupon}/fetch/data', [CuponController::class, 'fetch']);
    Route::post('cupons/reservas/fetch-data',[CuponController::class,'fetchDataReservas']);
    Route::get('cupons/negocio/{negocio}/get/all', [CuponController::class, 'getAll']);
    Route::post('cupons/reservar',[CuponController::class,'reservar']);
    Route::get('cupons/reservas/{cupon}/cancelar/usuario/{usuario}',[CuponController::class,'cancelarReserva']);
    Route::resource('cupons', CuponController::class);
    Route::get('cupons/{cupon}/reservar/usuario/{usuario}',[CuponController::class,'reservarCupon']);

    /*****************************/
    /* Ventas de negocio
    /*****************************/

    Route::post('ventas/fetch/data', [VentaController::class, 'fetchData']);
    Route::get('ventas/{venta}/fetch/data', [VentaController::class, 'fetch']);
    Route::get('ventas/negocio/{negocio}/get/all', [VentaController::class, 'getAll']);
    Route::resource('ventas', VentaController::class);
    Route::post('ventas/fetch/data/consumo', [VentaController::class, 'fetchConsumos']);

    /***********************************/
    /* Horario Reservacion Negocio
    /**********************************/


    Route::post('horario-reservacion/fetch/data', [HorarioReservacionController::class, 'fetchData']);
    Route::get('horario-reservacion/{horario}/fetch/data', [HorarioReservacionController::class, 'fetch']);
    Route::get('horario-reservacion/negocio/{negocio}/get/all', [HorarioReservacionController::class, 'getAll']);


    Route::resource('horario-reservacion', HorarioReservacionController::class);

    Route::post('horarios/asignar/horario', [HorarioReservacionController::class, 'asignarHorario']);


    /***********************************/
    /* Reservacions
    /**********************************/


    Route::post('reservacions/fetch/data', [ReservacionController::class, 'fetchData']);
    Route::post('reservacions/fetch/data/user', [ReservacionController::class, 'fetchDataUser']);

    Route::get('reservacions/{reservacion}/fetch/data', [ReservacionController::class, 'fetch']);
    Route::get('reservacions/get/all', [ReservacionController::class, 'getAll']);
    Route::get('reservacions/negocio/{negocio}/get/all', [ReservacionController::class, 'getAll']);
    Route::resource('reservacions', ReservacionController::class);
    Route::get('reservacions/{reservacion}/cancelar', [ReservacionController::class, 'cancelar']);



    /*****************************/
    /* Admin sistema
    /*****************************/

    Route::put('sistema/{sistema}', [SistemaController::class, 'update']);
    Route::get('sistemas/{sistema}/crear/cuenta', [SistemaController::class, 'crearCuenta']);
    Route::put('sistema/{sistema}/update/banner', [SistemaController::class, 'updateBanner']);
    Route::delete('sistema/{sistema}/eliminar/red/social/{red}', [SistemaController::class, 'eliminarRedSocial']);


    /*****************************/
    /* Categoria de Productos
    /*****************************/

    Route::post('categoria-productos/fetch/data', [CategoriaProductoController::class, 'fetchData']);
    Route::get('/categoria-productos/categories-dropshipping', [CategoriaProductoController::class, 'categoriesDropShipping']);

    Route::get('categoria-productos/{categoria}/fetch/data', [CategoriaProductoController::class, 'fetch']);
    Route::resource('categoria-productos', CategoriaProductoController::class);


    /*****************************/
    /* Tienda
    /*****************************/

    Route::post('tiendas/fetch/data', [TiendaController::class, 'fetchData']);
    Route::get('tiendas/{tienda}/fetch/data', [TiendaController::class, 'fetch']);
    Route::resource('tiendas', TiendaController::class);
    Route::put('tiendas/{tienda}/add/telefono',[TiendaController::class,'agregarTelefono']);

    Route::get('tiendas/{tienda}/aperturar/horario', [TiendaController::class, 'aperturarHorario']);
    Route::get('tiendas/{tienda}/quitar/horario', [TiendaController::class, 'quitarHorario']);


    /*****************************/
    /* Producto
    /*****************************/


    Route::resource('productos', ProductoController::class);
    Route::put('productos/{producto}/cargar/imagen', [ProductoController::class, 'cargarImagen']);
    Route::delete('productos/{producto}/eliminar/imagen/{imagen}', [ProductoController::class, 'eliminarImagen']);
    Route::put('productos/{producto}/cargar/archivo', [ProductoController::class, 'cargarArchivo']);
    Route::post('productos/cj-dropshipping/fetch/data', [ProductoController::class, 'fetchDataCjDropshipping']);

    Route::get('productos/details/{pid}', [ProductoController::class, 'getDetailsProductoCj']);
    Route::get('productos/agregar-to-travel/producto-cj/{pid}', [ProductoController::class, 'agregarToTravelProductCj']);
    Route::get('productos-cj/vid/{vid}/stock', [ProductoController::class, 'cjProductStock']);
    /*****************************/
    /* Consumos
    /*****************************/

    Route::post('consumos/fetch/data', [ConsumoController::class, 'fetchData']);
    Route::get('consumos/{consumo}/fetch/data', [ConsumoController::class, 'fetch']);
    Route::resource('consumos', ConsumoController::class);
    Route::get('consumos/{consumo}/marcar/comentada', [ConsumoController::class, 'marcarComentada']);
    Route::get('consumos/orden-details/orden/{orden}', [ConsumoController::class, 'getOrdenDetailsCj']);
    Route::get('consumos/orden-details/confirmar-orden/{orden}', [ConsumoController::class, 'confirmarOrdenCj']);
    Route::get('consumos/{consumo}/orden-details/eliminar-orden/{orden}', [ConsumoController::class, 'eliminarOrdenCj']);
    Route::get('consumos/orden-details/pagar-orden/{orden}', [ConsumoController::class, 'pagarOrdenCj']);


    /*****************************/
    /* Carrito Compra
    /*****************************/

    Route::get('carrito/compra/{usuario}/get', [UserController::class, 'getCarrito']);
    Route::get('carrito/compra/{usuario}/quitar/producto/{producto}', [UserController::class, 'sacarProductoCarrito']);
    Route::post('carrito/comprar/agregar/producto', [UserController::class, 'addProductoCarrito']);

    Route::post('carrito/fetch/data', [UserController::class, 'fetchDataCarrito']);

    Route::post('carrito-compra/calcular-envio', [UserController::class, 'calcularEnvioCarrito']);

    /*****************************/
    /* Sistema
    /*****************************/

    Route::post('sistema/upload/archivos', [SistemaController::class, 'uploadArchivos']);
    Route::put('sistemas/{sistema}/eliminar/archivo', [SistemaController::class, 'eliminarArchivo']);


    /*****************************/
    /* Sucursal
    /*****************************/
    Route::post('sucursals/fetch/data', [SucursalController::class, 'fetchData']);
    Route::get('sucursals/get/all', [SucursalController::class, 'getAll']);
    Route::get('sucursals/{sucursal}/fetch/data', [SucursalController::class, 'fetch']);
    Route::resource('sucursals', SucursalController::class);

    /*****************************/
    /* Dashboard
    /*****************************/

    Route::post('dashboard/total/viajeros', [DashboardController::class, 'totalViajeros']);
    Route::post('dashboard/get/viajeros/activos', [DashboardController::class, 'viajerosActivos']);
    Route::post('dashboard/get/destinos/activos', [DashboardController::class, 'destinosActivos']);
    Route::get('dashboard/total/destinos/activos', [DashboardController::class, 'destinosActivosChart']);
    Route::get('dashboard/get/paises/activos', [DashboardController::class, 'getPaisesActivos']);
    Route::get('dashboard/total/negocios/afiliados', [DashboardController::class, 'totalNegociosAfiliados']);
    Route::get('dashboard/porcentaje/negocios', [DashboardController::class, 'porcentajeNegocio']);
    Route::post('dashboard/gastos/turisticos', [DashboardController::class, 'fetchGastosTuristicos']);
    Route::post('dashboard/tienda/regalos', [DashboardController::class, 'fetchTiendaRegalos']);
    Route::get('dashboard/total/promotores', [DashboardController::class, 'fetchTotalPromotores']);
    Route::get('dashboard/total/coordinadores', [DashboardController::class, 'fetchTotalCoordinadores']);
    Route::get('dashboard/total/comisiones/generadas', [DashboardController::class, 'fetchComisionesGeneradas']);
    Route::get('dashboard/total/operaciones/travel', [DashboardController::class, 'getTotalOperacionesTravel']);
    Route::get('dashboard/tablero/promotor/get-status', [UserController::class, 'getStatus']);
    Route::get('dashboard/tablero/lider/get-status', [UserController::class, 'getStatus']);
    Route::get('dashboard/tablero/coordinador/get-status', [UserController::class, 'getStatus']);

    Route::get('dashboard/total/viajeros/anual', [DashboardController::class, 'getTotalReferidosRegistradoAnual']);
    Route::post('dashboard/total/comisiones/promotor', [DashboardController::class, 'comisiones']);
    Route::get('dashboard/promotores/status', [DashboardController::class, 'getStatusPromotores']);
    Route::get('dashboard/coordinadores/status', [DashboardController::class, 'getStatusCoordinadores']);

    Route::get('dashboard/promotores/get/eficacia', [DashboardController::class, 'getEficaciaPromotores']);
    Route::post('dashboard/lider/viajeros-totales', [DashboardController::class, 'totalesViajeros']);
    Route::get('dashboard/lider/mis-promotores', [UserController::class, 'misPromotores']);
    Route::get('dashboard/lider/eficacia-mes', [DashboardController::class, 'porcentajeEficacia']);

    Route::get('dashboard/lider/eficacia-mes/promotores', [DashboardController::class, 'porcentajeEficaciaPromotores']);

    Route::get('dashboard/total/promotores/por-lider', [UserController::class, 'getTotalPromotoresPorLider']);
    Route::post('dashboard/eficacia/promotor/coordinador', [UserController::class, 'getEficaciaViajerosPorPromotor']);
    Route::get('usuarios/get/all/promotores', [UserController::class, 'getPromotores']);
    Route::post('dashboard/total/viajeros/por-coordinador', [UserController::class, 'totalViajerosCoordinador']);
    Route::get('dashboard/porcentaje-uso/viajeros', [UserController::class, 'getPorcentajeUsoViajeros']);
    Route::get('dashboard/porcentaje-viajeros/por-pais',[DashboardController::class,'getPorcentajeViajerosPorPais']);
    Route::get('dashboard/tres-mayores-comisiones-promotores',[DashboardController::class,'comisionesAltasMesPromotores']);

    Route::get('dashboard/total-viajeros',[DashboardController::class, 'totalViajerosRegistrados']);
    Route::get('dashboard/porcentaje-efectividad',[DashboardController::class, 'eficaciaViajeros']);
    
    /*****************************/
    /* Datos de pagos
    /*****************************/

    Route::get('datos-pago/fetch/{usuario}', [DatosPagosController::class, 'fetch']);
    Route::resource('datos-pago', DatosPagosController::class);


    /*****************************/
    /*  Retiros
    /*****************************/
    Route::get('retiros/get/all', [RetiroController::class, 'getAll']);
    Route::post('retiros/fetch/data', [RetiroController::class, 'fetchData']);
    Route::get('retiros/{retiro}/fetch/data', [RetiroController::class, 'fetch']);
    Route::resource('retiros', RetiroController::class);


    /**************************/
    /* Pais
    /**************************/


    Route::get('get/paises', [PaisController::class, 'getPaises']);
    Route::post('fetch/paises', [PaisController::class, 'fetchData']);
    Route::resource('pais', PaisController::class);
    Route::get('fetch/pais/{pais}', [PaisController::class, 'fetchPais']);


    /**************************/
    /* Estado
    /**************************/


    Route::get('get/estados', [EstadoController::class, 'getEstados']);
    Route::post('fetch/estados', [EstadoController::class, 'fetchData']);
    Route::resource('estados', EstadoController::class);
    Route::get('fetch/estado/{estado}', [EstadoController::class, 'fetchEstado']);

    /**************************/
    /* Ciudad
    /**************************/


    Route::get('get/ciudades', [CiudadController::class, 'getCiudades']);
    Route::post('fetch/ciudades', [CiudadController::class, 'fetchData']);
    Route::resource('ciudads', CiudadController::class);
    Route::get('fetch/ciudad/{ciudad}', [CiudadController::class, 'fetchCiudad']);





    /**************************/
    /* Academia
    /**************************/
    Route::post('/academias/videos/fetch-data', [AcademiaVideoController::class, 'fetchData']);
    Route::resource('academia-videos', AcademiaVideoController::class);
    Route::get('academia-videos/{video}/fetch-data', [AcademiaVideoController::class, 'fetch']);

    Route::get('academia-videos/get/panel/negocio', [AcademiaVideoController::class, 'getPanelNegocio']);


    /**************************/
    /* CJDropShipping
    /**************************/
    Route::get('dropshipping/obtener-token', [SistemaController::class, 'obtenerTokenDropshipping']);
    Route::get('dropshipping/refresh-token', [SistemaController::class, 'refreshTokenDropshipping']);
    Route::get('dropshipping/caducar-token', [SistemaController::class, 'caducarTokenDropshipping']);


    /**************************/
    /* Paginas
    /**************************/

    Route::post('paginas/fetch-data', [PaginaController::class, 'fetchData']);
    Route::get('paginas/{pagina}/fetch-data', [PaginaController::class, 'fetch']);
    Route::resource('paginas', PaginaController::class);



    /**************************/
    /* Lote
    /**************************/
    Route::get('get/lotes', [LoteController::class, 'getLotes']);
    Route::post('fetch/lotes', [LoteController::class, 'fetchData']);
    Route::resource('lotes', LoteController::class);
    Route::get('fetch/lote/{lote}', [LoteController::class, 'fetch']);

    Route::put('lotes/{lote}/asociar/lote',[LoteController::class,'asociarLote']);

    /**************************/
    /* Tarjeta
    /**************************/
    Route::get('get/tarjetas', [TarjetaController::class, 'getLotes']);
    Route::post('fetch/tarjetas', [TarjetaController::class, 'fetchData']);
    Route::resource('tarjetas', TarjetaController::class);
    Route::get('fetch/tarjeta/{tarjeta}', [TarjetaController::class, 'fetch']);
    Route::get('tarjetas/{tarjeta}/toggle-validation',[TarjetaController::class,'toggleValidation']);

    /**************************/
    /* Vonage
    /**************************/
    Route::post('vonages/sms/fetchData',[MensajesVonageController::class,'fetchDataSms']);
    Route::delete('vonages/sms/{mensaje}/eliminar',[MensajesVonageController::class,'eliminarSMS']);

    /**************************/
    /* Reunion
    /**************************/
    Route::get('reunions/usuario/{usuario}/get/all',[ReunionController::class,'getAll']);
    Route::post('reunions/fetch/data',[ReunionController::class,'fetchData']);
    Route::get('reunions/{reunion}/fetch/data',[ReunionController::class,'fetch']);
    Route::resource('reunions',ReunionController::class);

    Route::post('reunions/{reunion}/guardar/archivo',[ReunionController::class,'guardarArchivo']);
    Route::post('reunions/fetch/reunions',[ReunionController::class,'fetchReunions']);

});

Route::put('usuario/{usuario}/establecer/contrasena', [UserController::class, 'EstablecerContrasena'])->name('establecercontrasena');

Route::get('get/paises', function () {
    $paises = Pais::get();
    return response()->json($paises);
});

Route::get('get/estados/{pais}', function (Pais $pais) {
    $estados = $pais->estados;
    return response()->json($estados);
});

Route::get('get/ciudades/{estado}', function (Estado $estado) {
    $ciudades = $estado->ciudades;
    return response()->json($ciudades);
});


Route::get('usuarios/verificar/codigo/{codigo}', [UserController::class, 'verificarCodigo']);
Route::post('cargar/categorias', [CategoriaFaqController::class, 'cargar']);

Route::post('auth/google', [AuthController::class, 'authGoogle']);


// Destinos 
Route::get('destinos/get/all', [DestinoController::class, 'getAll']);
Route::post('destinos/fetch-data/public', [DestinoController::class, 'fetchDataPublic']);
// Atracciones
Route::get('atraccions/get/all', [AtraccionController::class, 'getAll']);
Route::get('atraccions/{atraccion}/otras/cercanas', [AtraccionController::class, 'otrasCercanas']);
// Search Public
Route::post('search/public', [HomeController::class, 'searchPublic']);
Route::post('search/location', [HomeController::class, 'searchLocation']);
Route::post('destinos/obtener/por-nombre', [DestinoController::class, 'getPorNombre']);
Route::get('destinos/{destino}/fetch/data-public',[DestinoController::class,'fetch']);
Route::post('atraccions/obtener/por-nombre', [AtraccionController::class, 'getPorNombre']);

Route::post('opinions/fetch/data/model', [OpinionController::class, 'fetchDataModel']);

// Sistema

Route::get('sistema/fetch', [SistemaController::class, 'fetch']);

// Capturar negocio por Url 
Route::post('negocio/obtener-por-url', [NegocioController::class, 'capturarPorUrl']);

// Perfil Negocio Publicaciones

Route::post('publicacions/fetch/data', [PublicacionController::class, 'fetchData']);

// perfil Negocio Eventos
Route::get('negocios/{negocio}/aumentar-vistas', [NegocioController::class, 'aumentarVistas']);
Route::post('eventos/fetch/data', [EventoController::class, 'fetchData']);
Route::post('eventos/fetch/eventos', [EventoController::class, 'fetchEventos']);

// Negocios

Route::post('negocios/fetch/data/public', [NegocioController::class, 'fetchDataPublic']);

// Rango de precios Productos

Route::get('productos/rango/precios', [ProductoController::class, 'rangoPrecios']);

// Categorias de Productos

Route::get('categoria-productos/get/all', [CategoriaProductoController::class, 'getAll']);
// Todas las tiendas

Route::get('tiendas/get/all', [TiendaController::class, 'getAll']);

// Productos 

Route::post('productos/fetch/data', [ProductoController::class, 'fetchData']);
Route::get('productos/{producto}/fetch/data', [ProductoController::class, 'fetch']);


// Contacto
Route::post('enviar/mensaje/contacto', [ApplicationController::class, 'enviarMensajeContacto']);

// Paginas
Route::get('paginas/get/page/param/{param}', [PaginaController::class, 'getPagina']);
Route::get('paginas/get/all', [PaginaController::class, 'getAll']);

// Eventos
Route::get('eventos/fetch-data/url/{url}', [EventoController::class, 'fetchDataUrl']);
Route::post('eventos/fetch-data-public', [EventoController::class, 'fetchDataPublic']);

// Travels
Route::get('travels/map/destino/{destino}', [HomeController::class, 'getTravels']);

// Cupones

Route::post('cupons/fetch-data/public',[CuponController::class,'fetchDataPublic']);
