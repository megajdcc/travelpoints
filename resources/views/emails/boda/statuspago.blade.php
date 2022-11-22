@component('mail::message')

# Estimado {{ $nombre }}!  
**Es un placer saludarle nuevamente.**  

@php
    $nro_referencia = $pago->nro_referencia;

    if(!$pago->nro_referencia){
      $nro_referencia = $pago->id;
    }

@endphp

@if ($pago->status == 2)
El motivo de mi correo es para confirmar a usted que hemos recibido y aplicado a su reservación {{$reserva->nro_reserva}} el pago con número de referencia **{{ $nro_referencia }}** realizado por la cantidad de {{ number_format((float) $pago->monto,2,'.',',') }} MXN, una vez que se liquide su reservación recibirá por correo su carta de confirmación la cual deberá presentar en el hotel al momento de hacer el check in, y esta será comprobante de que su estancia se encuentra liquidada. 
@endif

@if ($pago->status == 3)
El motivo de mi correo es para confirmar a usted que hemos recibido y rechazado el pago con número de referencia **{{ $nro_referencia }}** realizado por la cantidad de {{ number_format((float) $pago->monto,2,'.',',') }} MXN.  

**El Pago no ha podido ser comprobado**  

Le invitamos a que se comunique con nosotros por esta via, si tiene problema al realizar su pago o si el comprobante que nos envío en caso de transferencia era incorrecto.  
@endif

@if ($pago->status == 1)
El motivo de mi correo es para confirmar a usted que hemos recibido y comprobado el pago con número de referencia **{{ $nro_referencia }}** realizado por la cantidad de {{ number_format((float) $pago->monto,2,'.',',') }} MXN.  

**El Pago está pendiente de aprobación**  

Una vez que se apruebe el pago, recibirá por correo su confirmación.  
@endif

@if($pago->status == 0)
El motivo de mi correo es para confirmar a usted que hemos recibido su pago con número de referencia **{{ $nro_referencia }}** realizado por la cantidad de {{ number_format((float) $pago->monto,2,'.',',') }} MXN.  

**El Pago está pendiente de comprobación**  

Una vez que se compruebe y apruebe  el pago, recibirá por correo su confirmación.  
@endif

**Le recordamos que:**  
- Su reservación deberá liquidarse antes del: {{date('d M \d\e Y' , strtotime($reserva->boda->fecha_limite_liquidacion))}}  
- La fecha máxima para cambios de su reservación es:  {{date('d M \d\e Y' , strtotime($reserva->boda->fecha_limite_cambios))}} , cambios realizados fuera de la fecha mencionada tiene un costo de {{number_format((float) $reserva->boda->cargo_administrativo,2,'.',',')}} pesos y es necesario revisar previamente con el hotel  
- No se acepta ningún cambio durante el check in ni durante su estancia.  
- Las salidas anticipadas no son reembolsables.  
- En caso de No Show se aplicará una penalidad de toda la estancia con la tarifa acordada.  
- En caso de cancelaciones antes del {{date('d M \d\e Y' , strtotime($reserva->boda->fecha_limite_cancelacion))}}, los anticipos no son rembolsables.  
- En caso de cancelaciones después del del {{date('d M \d\e Y' , strtotime($reserva->boda->fecha_limite_cancelacion))}}, se penaliza con la estancia completa. 

# Cualquier duda estamos a sus órdenes! #

Por otro lado, quisiera confirmar si ¿requiere factura de su pago? en caso de requerirla le pido me envíe sus datos de facturación lo antes posible para poder realizarla, ya que al final del mes todos aquellos pagos de los cuales no se soliciten facturas se facturarán a "público en general" y no habrá manera de modificarla una vez emitida.

# Políticas y Condiciones de la Boda y Reservaciones! #  

{{ $reserva->boda->politicas_reserva }}

# Quedo a sus órdenes, ¡que tenga un excelente día! #
@endcomponent
