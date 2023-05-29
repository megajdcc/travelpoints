@component('mail::message')
@php
    
@endphp
# Hola  **{{ trim($cliente) }}**.   

Gracias por tu compra de:  

@component('mail::table')
| Producto y/o Servicio       | Cantidad         | Monto  |
| -------------- |:----------------:| ------:|
@foreach ($productos as $producto)
| **{{ $producto->nombre }}** | {{ $producto->pivot->cantidad }}  | {{ $producto->divisa->iso.' '. number_format((float) $producto->pivot->monto,2,'.',',') }}  | 
@endforeach
@endcomponent

@if ($productos->first()->tipo_producto == 2)
Puedes descargar el Archivo Adjunto 
@elseif($consumo->ordencj)
{{ $mensaje }}

@else
Puedes retirar en la tienda: **{{ strtoupper($tienda->nombre) }}**.  
 ## Dirección: **{{ strtoupper( $tienda->direccion()) }}**.
@endif

# ¡Gracias por preferirnos Travel Points! #
@endcomponent
