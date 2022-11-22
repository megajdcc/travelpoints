@component('mail::message')
## HOla {{$reserva->reservante}}


## <center>CUPÓN DE HOSPEDAJE</center>
## <center>BODA DE {{ strtoupper($novios->novia) }} & {{ strtoupper($novios->novio) }} </center>  
---  

## <center> **HOTEL** </center>
<center> {{ $reserva->boda->hotel->nombre }}  </center>
<center>{{ trim($reserva->boda->hotel->direccion) }}</center>
  
---
### <center>RESERVACIÓN</center>  


@component('mail::table')
|        |          | 
| ------------- |:-------------:|
| Código de reservación: | {{$reserva->nro_reserva}} |
| Nombre(s) de adulto(s):     | @foreach($reserva->habitaciones as $habitacion) @foreach((json_decode($habitacion->pivot->habitantes))->adults as $key =>  $adulto)  {{ $adulto->nombre }} @if(count((json_decode($habitacion->pivot->habitantes))->adults) -1 != $key) / @endif   @endforeach @endforeach |
| Nombre(s) de Menore(s):     | @if((json_decode($habitacion->pivot->habitantes))->childs > 0 ) @foreach($reserva->habitaciones as $habitacion) @foreach((json_decode($habitacion->pivot->habitantes))->childs as $key =>  $nino)  {{ $nino->nombre }} - {{$nino->edad}} Años @if(count((json_decode($habitacion->pivot->habitantes))->childs) -1 != $key) / @endif   @endforeach @endforeach @else No Aplica @endif |
| Nombre(s) de Jovene(s):     | @if((json_decode($habitacion->pivot->habitantes))->adolescentes > 0 )  @foreach($reserva->habitaciones as $habitacion) @foreach((json_decode($habitacion->pivot->habitantes))->jovenes as $key =>  $joven)  {{ $joven->nombre }} - {{$joven->edad}} Años @if(count((json_decode($habitacion->pivot->habitantes))->jovenes) -1 != $key) / @endif   @endforeach @endforeach @else No Aplica @endif |
| Check IN | {{ date('d M \d\e Y ' , strtotime($reserva->check_in))}} | 
| Check OUT | {{ date('d M \d\e Y ' , strtotime($reserva->check_out))}} | 
| Noches | {{ $reserva->noches }} |
| Notas especiales | Ninguna |
@endcomponent

---
### <center>HABITACIONES</center>  

@foreach($reserva->habitaciones as $habitacion)
   @component('mail::table')
   |        |          | 
   | ------------- |:-------------:|
   | Categoría: | {{$habitacion->nombre}} |
   | Ocupación: | @if(json_decode($habitacion->pivot->habitantes)->adultos  < 2 ) Sencilla @elseif(json_decode($habitacion->pivot->habitantes)->adultos  < 3) Doble @elseif(json_decode($habitacion->pivot->habitantes)->adultos  < 4) Triple @else {{ json_decode($habitacion->pivot->habitantes)->adultos }} Pax @endif |
   | Adultos: | {{json_decode($habitacion->pivot->habitantes)->adultos}} |
   | Jovenes: | {{json_decode($habitacion->pivot->habitantes)->adolescentes}} |
   | Niños: | {{json_decode($habitacion->pivot->habitantes)->ninos}} |
   | Bebé: | {{json_decode($habitacion->pivot->habitantes)->bebes}} |
   | Total a pagar: | {{number_format((float) $habitacion->pivot->monto,2,'.',',') }} MXN |
   | Estatus de reservación: | Confirmada / Liquidada |
   | Plan: | Todo Incluido |
   @endcomponent
<center> - - - </center> 
@endforeach

### <center>OBSERVACIONES</center> 

{{$observaciones}}




@endcomponent 