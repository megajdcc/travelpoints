@component('mail::message')

# {{ __('Hola') }} **{{ trim($Nombre) }}**  
> {{ __('Has recibido autorización para ingresar al Sistema de') }} {{ env('APP_NAME') }}

>{{ __('Tus credenciales son') }}:

>{{ __('Usuario') }}:**{{ $Email }}**  


@if(!$usuario->is_password)
@component('mail::button', ['url' => $Url, 'color' => 'success'])
	{{ __('Por favor establezca su contraseña a continuación') }}
@endcomponent  
@endif


# {{ __('¡Te damos la bienvenida al equipo de Travel Points!') }} #
@endcomponent
