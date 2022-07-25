<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Reserva - nro {{ $reserva['nro_reserva'] }}</title>
{{-- 	<link rel="stylesheet" type="text/css" href="{{ asset('css/estilos.css') }}">
 --}}	{{-- <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}"> --}}


	<style>
      html{
         margin:0px !important; 
      }
      table td{
         margin:0px;
      }
         body{
            background-color:#eeeae2;
            margin: 0cm 0cm 0cm !important;
         }
			.logo-template{
				width: auto;
				height: 70px;
			}
			.container-header{
				width: 100%;
				margin-bottom: 25px;
				
			}	
			.table-1{
				width: 100%;
			}
			.table-2{
				width: 50%;
				float: right;
			}
			.title-documento{
				/* border: 2px solid black; */
				text-align: center;
				font-size: 24pt;
				font-weight: bold;
				height: 70px;
				margin-bottom: 10px;
				border-radius: 10px;
				/* border-style: outset; */
				background-color: #35656F !important;
				color: white;
			}
			.container-cliente{
					/* width: 100%; */
					/* float: left; */
					/* margin-top: 25pt; */
			}

			.table-cliente{
				border-collapse: collapse;
            border:0px !important;
				/* border: 1px solid black; */

			}
			.table-cliente td,.table-cliente tr{
				/* padding: 3px; */
            border:none !important;
			}
			

			.title-head{
				background-color: #e4dcce !important;
				color: rgb(0, 0, 0);
				/* border: 1px solid black; */
				text-align: center;
			}
			.container-data{
					margin-top: 1rem;
			}
			.table-data{
				border-collapse: collapse;
			}

			.table-totales{
				/* float: right; */
				border-collapse: collapse;
				margin-top: 1rem;
				margin-left: auto;
				margin-right: 0px;
			}

			.pie-pagina{
				text-align: center;
				margin-bottom: 0px;
				position: absolute;
				bottom: 0px;
				left: auto;right: auto;
				margin: auto auto 0px auto;
			}

         .text-center{
            text-align: center !important;
         }

         .my-0{
            margin-top: 0px;
            margin-bottom: 0px;
         }
         .my-1{
            margin-top: .5rem;
            margin-bottom: .5rem;
         }
         p,h4{
             margin-top: .1rem;
            margin-bottom: .1rem;
         }
        


	</style>
</head>
<body>
	
	<div class="container">


		<div class="container-cliente">
         <h3 class="text-center my-1">CUPÓN DE HOSPEDAJE  <br> Boda de {{ $reserva->boda->novios->novia }} y {{ $reserva->boda->novios->novio }}</h3>
         
			<table class="table-cliente" width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">HOTEL</h4></th>
					</tr>
					
				</thead>
		
			</table>

         <table width="100%" >
            <tr>
               <td class="text-center"><h4>{{ $reserva->boda->hotel->nombre }}</h4></td>
            </tr>
             <tr>
               <td class="text-center"><h4>{{ $reserva->boda->hotel->direccion }}</h4></td>
            </tr>
         </table>

         <table class="table-cliente" width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">RESERVACIÓN</h4></th>
					</tr>
					
				</thead>
		
			</table>

         <table width="auto" style="margin-left:1rem">
            
            <tr>
               <td class=""><p>Código de reservación:</p></td><td> <p>{{$reserva->nro_reserva}}</p> </td>
            </tr>

             <tr>
               <td class=""><p>Nombre(s) de adulto(s):</p></td><td>@foreach($reserva->habitaciones as $habitacion) @foreach((json_decode($habitacion->pivot->habitantes))->adults as $key =>  $adulto)  {{ $adulto->nombre }} @if(count((json_decode($habitacion->pivot->habitantes))->adults) -1 != $key) / @endif   @endforeach @endforeach</td>
            </tr>

             <tr>
               <td class=""><p>Nombre(s) de Menore(s):</p></td><td>@if((json_decode($habitacion->pivot->habitantes))->ninos > 0 ) 
                  @foreach($reserva->habitaciones as $habitacion) 
                     @foreach((json_decode($habitacion->pivot->habitantes))->childs as $key =>  $nino)  
                        {{ $nino->nombre }} - {{$nino->edad}} Años 
                        @if(count((json_decode($habitacion->pivot->habitantes))->childs) -1 != $key) / @endif   
                  @endforeach @endforeach @else No Aplica @endif</td>
            </tr>

              <tr>
               <td class=""><p>Nombre(s) de Jovene(s):</p></td><td>@if((json_decode($habitacion->pivot->habitantes))->adolescentes > 0 )  @foreach($reserva->habitaciones as $habitacion) @foreach((json_decode($habitacion->pivot->habitantes))->jovenes as $key =>  $joven)  {{ $joven->nombre }} - {{$joven->edad}} Años @if(count((json_decode($habitacion->pivot->habitantes))->jovenes) -1 != $key) / @endif   @endforeach @endforeach @else No Aplica @endif</td>
            </tr>
            <tr>
               <td class=""><p>Check IN:</p></td><td> {{ date('d M \d\e Y ' , strtotime($reserva->check_in))}} </td>
            </tr>
             <tr>
               <td class=""><p>Check OUT:</p></td><td> {{ date('d M \d\e Y ' , strtotime($reserva->check_out))}} </td>
            </tr>
             <tr>
               <td class=""><p>Noches:</p></td><td> {{ $reserva->noches }}  </td>
            </tr>
             <tr>
               <td class=""><p>Notas especiales:</p></td><td> {{ !empty($reserva->nota) ? $reserva->nota : 'Sin observaciones' }} </td>
            </tr>


         </table>

         <table class="table-cliente" width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">HABITACIONES</h4></th>
					</tr>
					
				</thead>
		
			</table>

         @foreach($reserva->habitaciones as $habitacion)    
            <table width="auto" style="margin-left:1rem">
               <tr>
                  <td>Categoría:</td><td>{{$habitacion->nombre}}</td>
               </tr>
               <tr>
                  <td>Ocupación:</td><td>@if(json_decode($habitacion->pivot->habitantes)->adultos  < 2 ) Sencilla @elseif(json_decode($habitacion->pivot->habitantes)->adultos  < 3) Doble @elseif(json_decode($habitacion->pivot->habitantes)->adultos  < 4) Triple @else {{ json_decode($habitacion->pivot->habitantes)->adultos }} Pax @endif</td>
               </tr>
               <tr>
                  <td>Adultos:</td><td> {{json_decode($habitacion->pivot->habitantes)->adultos}}</td>
               </tr>
                <tr>
                  <td>Jovenes:</td><td> {{json_decode($habitacion->pivot->habitantes)->adolescentes}}</td>
               </tr>
               <tr>
                  <td>Niños:</td><td> {{json_decode($habitacion->pivot->habitantes)->ninos}}  </td>
               </tr>
               <tr>
                  <td>Bebé:</td><td> {{json_decode($habitacion->pivot->habitantes)->bebes}}  </td>
               </tr>
               <tr>
                  <td>Total habitación:</td><td> {{number_format((float) $habitacion->pivot->monto,2,'.',',') }} MXN</td>
               </tr>
               <tr>
                  <td>Cargos adicionales:</td><td> {{ number_format((float) $reserva->cargos->sum('pivot.monto'),2,'.',',') }} MXN</td>
               </tr>
               <tr>
                  <td>Total a pagar:</td><td>{{number_format((float) $habitacion->pivot->monto + $reserva->cargos->sum('pivot.monto'),2,'.',',') }} MXN</td>
               </tr>
                <tr>
                  <td>Estatus de reservación:</td><td>Confirmada / Liquidada</td>
               </tr>
                <tr>
                  <td>Plan:</td><td>Todo Incluido</td>
               </tr>
               
            </table>
            <hr>
          @endforeach
            <table class="table-cliente" width="100%" border="0" >
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">OBSERVACIONES</h4></th>
					</tr>
					
				</thead>
		
			</table>

         <table style="margin-left:1rem">
            <tr>
               <td> - </td>
               <td>El horario del check in es a las 3:00 pm</td>
            </tr>
            <tr>
               <td> - </td>
               <td>El horario del check out es a las 12:00 pm</td>
            </tr>
             <tr>
               <td> - </td>
               <td>Ocupación máxima por habitación: 2 adultos y 2 menores, en camas existentes.</td>
            </tr>
             <tr>
               <td> - </td>
               <td>Edad de menores es de 03 a 12 años.</td>
            </tr>
            <tr>
               <td> - </td>
               <td>Las solicitudes especiales (tipo de cama, etc.) se encuentran sujetas a disponibilidad.</td>
            </tr>
             <tr>
               <td> - </td>
               <td>Los impuestos y las tasas aplicables quedan sujetos a una posible modificación, sin previo aviso, conforme a posibles cambios en la reglamentación gubernamental.</td>
            </tr>

            @if ($reserva->boda->coordinadores->count() > 0)
               <tr>
                  <td> - </td>
                  <td>Favor de verificar que todos los datos sean correctos, de lo contrario favor de hacerlo saber de inmediato a su agente al correo <a href="mailto:{{ $reserva->boda->coordinadores->first()->email }}">{{ $reserva->boda->coordinadores->first()->email }}</a>
                  </td>
               </tr>
            @endif
            
             <tr>
               <td> - </td>
               <td>Todos los menores deberán presentar identificación que acredite su edad al momento de hacer check in. </td>
            </tr>

             <tr>
               <td> - </td>
               <td>En caso de salida anticipada se penalizará con el total de la estancia. </td>
            </tr>
              <tr>
               <td> - </td>
               <td>En caso de no show se penalizará con el total de la estancia. </td>
            </tr>

             <tr>
               <td> - </td>
               <td>Fecha límite para cambios y cancelaciones: {{ date('d M \d\e Y ',strtotime($reserva->boda->fecha_limite_cancelacion)) }}. </td>
            </tr>

             <tr>
               <td> - </td>
               <td>Se aplica un cargo administrativo del {{ number_format((float) $reserva->boda->cargo_administrativo,2,'.',',')}} MXN pesos en cualquier cambio realizado después del  {{ date('d M \d\e Y ',strtotime($reserva->boda->fecha_limite_cambios)) }}.</td>
            </tr>

            <tr>
               <td> - </td>
               <td>En caso de cancelación antes del {{ date('d M \d\e Y ',strtotime($reserva->boda->fecha_limite_cancelacion)) }}, los anticipos no son rembolsables, cancelaciones posteriores a la fecha antes mencionada se penalizarán con el total de la estancia.</td>
            </tr>

             <tr>
               <td> - </td>
               <td>No se admitirá ningún cambio al momento de hacer check in ni durante la estancia.</td>
            </tr>
            
            <tr>
               <td> - </td>
               <td>Si desea obtener más información sobre el plan todo incluido, restaurantes, actividades, le invitamos a que visite la página de 
                  <a href="{{$reserva->boda->hotel->website}}">{{ $reserva->boda->hotel->nombre }}</a></td>
            </tr>





         </table>

		</div>

			{{-- <div class="pie-pagina">
                <strong>Copyright &copy; {{ date('Y') }} {{ env('APP_NAME')}}.</strong>
                All rights reserved.
			</div> --}}
		
	</div>
</body>
</html>
