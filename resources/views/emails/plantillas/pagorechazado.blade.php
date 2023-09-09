@component('mail::message')
## Estimado {{ $invitado }}!  
**Es un placer saludarle nuevamente.**  

El motivo de mi correo es para confirmar a usted que hemos recibido y rechazado el pago con número de referencia **{{ $nro_referencia }}** realizado por la cantidad de {{ $monto_pago }}.  

**El Pago no ha podido ser comprobado**  

Le invitamos a que se comunique con nosotros por esta via, si tiene problema al realizar su pago o si el comprobante que nos envío en caso de transferencia era incorrecto.  

**Le recordamos que:**  
- Su reservación deberá liquidarse antes del: {{ $fecha_limite_liquidacion }}  
- La fecha máxima para cambios de su reservación es:  {{ $fecha_limite_cambios }} , cambios realizados fuera de la fecha mencionada tiene un costo de {{ $cargo_administrativo }} pesos y es necesario revisar previamente con el hotel  
- No se acepta ningún cambio durante el check in ni durante su estancia.  
- Las salidas anticipadas no son reembolsables.  
- En caso de No Show se aplicará una penalidad de toda la estancia con la tarifa acordada.  
- En caso de cancelaciones antes del {{ $fecha_limite_cancelacion }}, los anticipos no son rembolsables.  
- En caso de cancelaciones después del del {{ $fecha_limite_cancelacion }}, se penaliza con la estancia completa. 

### Cualquier duda estamos a sus órdenes! ###

Por otro lado, quisiera confirmar si ¿requiere factura de su pago? en caso de requerirla le pido me envíe sus datos de facturación lo antes posible para poder realizarla, ya que al final del mes todos aquellos pagos de los cuales no se soliciten facturas se facturarán a "público en general" y no habrá manera de modificarla una vez emitida.  

------------------------------------
### Políticas y Condiciones de la Boda y Reservaciones! 

{{ $politicas_reserva }}

**Quedo a sus órdenes, ¡que tenga un excelente día!**

@endcomponent