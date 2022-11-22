@php
	 setLocale(LC_TIME,'es_MX');
@endphp
@component('mail::message')

# Estimado {{ $nombre }}!  
Es un placer para nosotros responder a su solicitud de cotización para la boda de **{{ trim( $novios->novia . ' & ' . $novios->novio) }}**. A continuación, le envío el desglose de su cotización para su estancia en el hotel **{{$reserva->boda->hotel->nombre}}**, le pedimos leer atentamente la información completa que a continuación le hacemos llegar.  
Nombre de huéspedes:  
<ol>
	@foreach ($habitaciones as $habitacion)
		 @foreach(json_decode($habitacion->pivot->habitantes)->adults as $adulto)
			<li>{{$adulto->nombre}}</li>
		@endforeach
	@endforeach
	
</ol>
@foreach ($habitaciones as $habitacion)
{{-- {{$habitacion->id}} --}}
N° de adultos:{{ json_decode($habitacion->pivot->habitantes)->adultos }}  
N° de jovenes:{{ json_decode($habitacion->pivot->habitantes)->adolescentes }} (De {{json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_juniors)->edades[0]}} a {{json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_juniors)->edades[1]}} años al día de la boda)  
N° de niños: {{ json_decode($habitacion->pivot->habitantes)->ninos }}  (De {{json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_menores)->edades[0]}} a {{json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_menores)->edades[1]}} años al día de la boda)  
N° de bebes:{{ json_decode($habitacion->pivot->habitantes)->bebes }} (De 2 año o menor al día de la boda)  
@endforeach
Fecha de entrada: {{strftime('%a %e %b %Y', strtotime($reserva->check_in))}}  
Fecha de salida: {{strftime('%a %e %b %Y', strtotime($reserva->check_out))}}  
Cantidad de noches: {{ $reserva->noches }}  
@foreach ($habitaciones as $habitacion)
Categoría de habitación: {{ $habitacion->nombre }}  

@endforeach
Correo electrónico: {{ $reserva->email }}  \
Núm. de referencia: {{ $reserva->nro_reserva }} 


@foreach ($habitaciones as $habitacion)
	@php
		switch (json_decode($habitacion->pivot->habitantes)->adultos) {
			case 1:
				$tipo_ocupacion = 'Sencilla';
				$tarifa_ocupacion = $reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_sencilla;
				$ocupantes = 1;
				$precio_adulto = $tarifa_ocupacion * $ocupantes * $reserva->noches;
				break;
			case 2:
				$tipo_ocupacion = 'Doble';
				$tarifa_ocupacion = $reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_doble;
				$ocupantes = 2;
				$precio_adulto = $tarifa_ocupacion * $ocupantes * $reserva->noches;
			break;

			case 3:
				$tipo_ocupacion = 'Triple';
				$tarifa_ocupacion = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_triple)->precio;	
				$ocupantes = 3;
				$precio_adulto = $tarifa_ocupacion * $ocupantes * $reserva->noches;
				break;
			
			default:
				$tipo_ocupacion = 'Triple';
				$tarifa_ocupacion = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_triple)->precio;
				$ocupantes = json_decode($habitacion->pivot->habitantes)->adultos;
				$precio_adulto = $tarifa_ocupacion * $ocupantes * $reserva->noches;
			break;
		}

		$precio_juniors = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_juniors)->precio;
		$precio_menores = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_menores)->precio;
		$menores = json_decode($habitacion->pivot->habitantes)->ninos;
		$juniors = json_decode($habitacion->pivot->habitantes)->adolescentes;
		$precio_adolescentes = $precio_juniors * $juniors * $reserva->noches;
		$precio_nino = $precio_menores * $menores * $reserva->noches;
		$max_adulto = $reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->max_adultos;
		$ocupacion_menores = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_menores);
		$ocupacion_juniors = json_decode($reserva->boda->habitaciones->where('id',$habitacion->id)->first()->pivot->ocupacion_juniors);
		

	@endphp
@endforeach

@component('mail::table')
	| Huésped  | Tarifa  | Noches  | Total   | 
	| ---------|:-------:| -------:| --------|
	@foreach ($huespedes as $huesped)
	|{{$huesped->nombre}} |{{ number_format((float) $huesped->tarifa,2,'.',',').' MXN' }} | <center>{{ $huesped->noches > 1 ? $huesped->noches. ' noches' : $huesped->noches. ' noche' }}</center> | <center>{{ number_format((float) $huesped->monto,2,'.',',').' MXN' }}</center> |
	@endforeach
	|	|	| C Adicionales:	| <center>{{ number_format((float) $reserva->cargos->sum('pivot.monto'),2,'.','.') }} MXN</center>	|
	|	|	| Total a pagar: | <center>{{ number_format((float) $reserva->total_pagar,2,'.','.') }} MXN</center> | 

@endcomponent

Para su mayor comodidad el hotel nos permitió que realice sus pagos diferidos de la siguiente manera:
@foreach ($cuotas as $key =>  $cuota)

@if($key == 0)
- Anticipo: **{{ '$'. number_format((float) $cuota->monto ,2,'.',',').' MXN' }}** antes del {{ strftime('%e %b %Y',strtotime($cuota->fecha)) }}  
@else
- Pago {{$key + 1}}: **{{ '$'. number_format((float) $cuota->monto ,2,'.',',').' MXN' }}** antes del {{  strftime('%e %b %Y',strtotime($cuota->fecha)) }}  
@endif

@endforeach

**En caso de que usted prefiera realizar sus pagos quincenalmente, favor de dividir el pago mensual entre dos.**  

La ocupación máxima por habitación es de {{$max_adulto}} adultos @if($ocupacion_menores->active) y {{$ocupacion_menores->max }} menores @endif  por habitación, en camas existentes.

- Todas las tarifas son basadas en plan todo incluido.  
- Todas las tarifas son en moneda nacional.  
- Todas las tarifas son por persona por noche.  
- No se aceptan habitaciones cuádruples  
- Todas las tarifas incluyen impuestos y servicios, A excepción del impuesto de Derecho de Saneamiento Ambiental, el cual lo estipula el municipio y se paga directamente en el hotel (Los impuestos y las tasas aplicables quedan sujetos a una posible modificación, sin previo aviso, conforme a posibles cambios en la reglamentación gubernamental)  
- Tarifas aplican en la categoría señalada en la cotización.  
- Tarifas válidas solamente para la boda de: **{{ trim( $novios->novia . ' & ' . $novios->novio) }}**.  
- Check in a las 15:00 hrs y check out a las 12:00 hrs.  

**Es importante mencionar que por el momento se está enviando una cotización. El hotel no procede a confirmar ninguna habitación si no se cuenta con el pago de anticipo. Habitaciones no garantizadas con pago, quedarán sujetas a disponibilidad y tarifa.**  

**En caso de que usted desee realizar el pago posterior a la fecha indicada, favor de comunicarse vía correo electrónico para verificar nuevamente la disponibilidad y tarifa antes de realizar el pago.**  

**Usted puede realizar su pago a través de depósito bancario, transferencia electrónica o tarjeta de crédito (con tarjeta de crédito se cobrará un 4.3% adicional), estos son los datos bancarios donde usted puede realizarlo. Le pedimos por favor envíe por correo electrónico su comprobante de pago escaneado para poder acreditarlo y confirmar su reservación.**  
**Es importante que en TODOS los pagos que realice indique su número de referencia.**  

Los números de cuenta para transferencia que tiene a su disposición son los siguientes:  
<ol>
@foreach ($bancos as $key =>  $item)

<li>
	Banco: {{$item->nombre}} <br>
	Cuenta:{{$item->cuenta}}  <br>
	Clabe: {{$item->clabe}} <br>
	Beneficiario: {{ $item->beneficiario }}<br>
</li>
@endforeach
</ol>  

**EN CASO DE REQUERIR FACTURA LE PEDIMOS NOS HAGA LLEGAR SUS DATOS FISCALES JUNTO CON SU COMPROBANTE DE PAGO.**  
  
**IMPORTANTE:**  
- Su reservación deberá liquidarse antes del: {{ strftime('%a %e %b %Y', strtotime($reserva->boda->fecha_limite_liquidacion))}}  
- La fecha máxima para cambios de su reservación es:  {{ strftime('%a %e %b %Y', strtotime($reserva->boda->fecha_limite_cambios))}} , cambios realizados fuera de la fecha mencionada tiene un costo de {{number_format((float) $reserva->boda->cargo_administrativo,2,'.',',')}} pesos y es necesario revisar previamente con el hotel  
- No se acepta ningún cambio durante el check in ni durante su estancia.  
- Las salidas anticipadas no son reembolsables.  
- En caso de No Show se aplicará una penalidad de toda la estancia con la tarifa acordada.  
- En caso de cancelaciones antes del {{ strftime('%a %e %b %Y', strtotime($reserva->boda->fecha_limite_cancelacion))}}, los anticipos no son rembolsables.  
- En caso de cancelaciones después del {{ strftime('%a %e %b %Y', strtotime($reserva->boda->fecha_limite_cancelacion))}}, se penaliza con la estancia completa. 

Es importante recordarle, que los pagos con tarjeta, los puede realizar desde la misma plataforma, el link a continuacion:  

@component('mail::button', ['url' => $url, 'color' => 'success'])
	Pagar Reserva
@endcomponent

Para notificar pagos con transferencia Bancaria , lo puede hacer desde la misma plataforma.


# Políticas y Condiciones de la Boda y Reservaciones! #  
{{ $reserva->boda->politicas_reserva }}

# Cualquier duda estamos a sus órdenes! #
# Saludos! #
@endcomponent
