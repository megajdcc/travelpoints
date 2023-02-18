@component('mail::message')

# Hola **{{ trim($cliente) }}**  
> Gracias por tu compra de:  
>> **{{ $productos->first()->nombre }}**

@if ($productos->first()->tipo_producto == 2)
> Puedes descargar el Archivo Adjunto 
@else
> Puedes retirar el producto en cualquiera de nuestras Tiendas.   
@endif

# ¡Gracias por preferirnos Travel Points! #
@endcomponent
