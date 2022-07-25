@component('mail::message')
## Hola estimado invitado {{ $invitado }}!  

@if($forma_pago == 'Conekta' || $forma_pago == 'Paypal')
Los pagos hechos con tarjetas de crédito,debito o a traves de PayPal, son verificados y aprobados de forma automática por el sistema, sin embargo la encargada de reservaciones {{ $coordinador }}, hará la validación correspondiente, con el fin de verificar si el procesador de pago debitó correctamente o simplemente el pago quedá pendiente, en el caso de que el banco Rechaze la transacción la misma será puesta como rechazada en el sistema y se le notificará por correo electrónico del cambio de estatus de este pago.
@else
Le informamos que su comprobante de pago se ha recibido sin embargo esta pendiente por validarse. La encargada de reservaciones {{ $coordinador }} le hará llegar su confirmación una vez que sea aprobado.
@endif  
  
**Cualquier duda estamos a sus órdenes, ¡excelente día!**
------------------------------------
**Políticas y Condiciones de la Boda y la Reservación**

{{ $politicas_reserva }}

@endcomponent