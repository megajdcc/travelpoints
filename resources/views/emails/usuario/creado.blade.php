@component('mail::message')

# Hola **{{ trim($Nombre) }}**  
> Has recibido autorización para ingresar al Sistema de {{ env('APP_NAME') }}

>Tus credenciales son:

>Usuario:**{{ $Email }}**  


@if(!$usuario->is_password)
@component('mail::button', ['url' => $Url, 'color' => 'success'])
	Por favor establezca su contraseña a continuación
@endcomponent  
@endif


# ¡Te damos la bienvenida al equipo de Travel Points! #
@endcomponent
