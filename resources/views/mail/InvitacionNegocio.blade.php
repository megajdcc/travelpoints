<x-mail::message>
{{-- # El {{ $invitacion->usuario->rol->nombre }} - {{ $invitacion->usuario->getNombreCompleto() }}. --}}

{{ $mensaje }}

{{  __('Puedes formar parte de Travel Points cuando lo desees, Utiliza el siguiente enlace directo, para que rellenes la información de tu negocio.') }}
<x-mail::button :url="$url.'/negocios/asociarme/invitacion/'.$invitacion->id">
{{ __('Sí, me quiero unir') }}
</x-mail::button>

 Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
