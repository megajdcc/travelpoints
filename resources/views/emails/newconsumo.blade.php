@component('mail::message')
@php
    
@endphp
# {{ __('Hola') }}  **{{ trim($cliente) }}**.   

{{ __('Gracias por tu compra de') }}:  

@component('mail::table')
| {{ __('Producto y/o Servicio') }}       | {{ __('Cantidad') }}         | {{ __('Monto') }}  |
| -------------- |:----------------:| ------:|
@foreach ($productos as $producto)
| **{{ $producto->nombre }}** | {{ $producto->pivot->cantidad }}  | {{ $producto->divisa->iso.' '. number_format((float) $producto->pivot->monto,2,'.',',') }}  | 
@endforeach
@endcomponent

@if ($productos->first()->tipo_producto == 2)
{{ __('Puedes descargar el Archivo Adjunto') }}
@elseif($consumo->ordencj)
{{ $mensaje }}

@else
{{ __('Puedes retirar en la tienda') }}: **{{ strtoupper($tienda->nombre) }}**.  
 ## {{ __('Dirección') }}: **{{ strtoupper( $tienda->direccion()) }}**.
@endif

# {{ __('¡Gracias por preferirnos Travel Points!') }} #
@endcomponent
