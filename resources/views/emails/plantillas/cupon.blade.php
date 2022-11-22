@component('mail::message')
## Hola {{ $invitado }}

## <center>CUPÓN DE HOSPEDAJE</center>
## <center>BODA DE {{ $novios }} </center>  
---  

### <center> **HOTEL** </center>
<center> {{ $hotel }}  </center>
<center>{{ $hotel_direccion }}</center>
  
---
### <center>RESERVACIÓN</center>  

@component('mail::table')

|                             |                             | 
| --------------------------- |:---------------------------:|
| Código de reservación:      |    {{ $nro_reserva }}       |
| Nombre(s) de adulto(s):     |    {{ $nombre_adultos }}    |
| Nombre(s) de Menore(s):     |    {{ $menores }}           |
| Nombre(s) de Jovene(s):     |    {{ $jovenes }}           |
| Check IN                    |    {{ $check_in }}          | 
| Check OUT                   |    {{ $check_out }}         | 
| Noches                      |    {{ $reserva_noches }}    |
| Notas especiales            |     Ninguna                 |

@endcomponent

------------------------------------
### <center>HABITACIONES</center>  
@component('mail::table')

|                               |                                  | 
| ----------------------------- |:--------------------------------:|
| Categoría:                    |   {{ $nombre_habitacion }}       |
| Ocupación:                    |   {{ $tipo_ocupacion }}          |
| Adultos:                      |   {{ $cantidad_adultos }}        |
| Jovenes:                      |   {{ $cantidad_jovenes }}        |
| Niños:                        |   {{ $cantidad_ninos }}          |
| Bebé:                         |   {{ $cantidad_bebes }}          |
| Total a pagar:                |   {{ $total_pagar  }}            |
| Estatus de reservación:       |   Confirmada / Liquidada         |
| Plan:                         |   Todo Incluido                  |

@endcomponent
------------------------------------

### <center>OBSERVACIONES</center> 

{{$observaciones}}
@endcomponent