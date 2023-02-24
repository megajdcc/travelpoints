<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Compra - nro {{ $data['id'] }}</title>
	<style>
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
				/* border: 1px solid black; */

			}
			.table-cliente td{
				padding: 3px;
			}
			

			.title-head{
				background-color: #35656F !important;
				color: white;
				border: 1px solid black;
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


	</style>
</head>
<body>
	
	<div class="container">
		<div class="container-header">

				<div class="header-left" width="100%">
					<table class="table-1" width="100%" >
						<tbody>
							<tr>
								<td><img src="{{ asset('storage/logotipo.png') }}" alt="TravelPoints" class="logo-template"></td>
								<td colspan="2" class="title-documento">COTIZACI&Oacute;N</td>
							</tr>
							<tr>
								<td>{{ $app->nombre }}</td>
								<td>Fecha:</td><td>{{ date('d-m-Y',strtotime($data->created_at)) }}</td>
							</tr>
							<tr>
								<td>{{ $app->direccion }}</td>
								<td>Compra Nro:</td><td>{{ 'COM-'.$data->id }}</td>
							</tr>
							<tr>
								<td>Teléfono: {{ $app->telefono }}</td>
								<td>Cliente nro:</td><td>{{ $data->cliente->id }}</td>
							</tr>
							<tr>
								<td>Sitio Web: {{ $url }}</td>
								<td>Cotización valida hasta:</td>
							</tr>
						</tbody>
					</table>
				</div>
				
	
			
		</div>

		<div class="container-cliente">
			<table class="table-cliente" width="40%" border="1">
				<thead>
					<tr>
						<th class="title-head">NOMBRE DEL CLIENTE</th>
					</tr>
					
				</thead>
				<tbody>
					<tr>
						<td>{{ $data->cliente->first_name.' '.$data->cliente->last_name }}</td>
					</tr>
					<tr>
						<td>Dirección: {{ $data->cliente->direccion }}</td>
					</tr>
					<tr>
						<td>Teléfono: {{ $data->cliente->telefono }}</td>
					</tr>
					<tr>
						<td>Email: {{ $data->cliente->email }}</td>
					</tr>
				</tbody>
			</table>
		</div>


			<div class="container-data">
				<table class="table-data" width="100%" border="1">
					<thead>
						<tr>
							<th class="title-head" >Descripción</th>
							<th class="title-head">Precio Unitario</th>
							<th class="title-head">Cant.</th>
							<th class="title-head">Total</th>
						</tr>
						
					</thead>
					<tbody>
						<tr>
							<td style="text-align: left;">Tipo de Libro: {{ $data->libro->tipolibro->tipo }} </td>
						
							<td style="text-align:center">X</td>
							<td style="text-align:center">x</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">Tama&ntilde;o de Libro: {{ $data->libro->tamano->tamano }}</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">X</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>


						<tr>
							<td style="text-align: left;">Estilo de Libro: {{ $data->libro->estilo->nombre }}</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">X</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">Portada: {{ $data->libro->portada->nombre }}</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">X</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">P&aacute;ginas para Libro: </td>
							<td style="text-align:center">X</td>
							<td style="text-align:center">{{ ($data->libro->paginas - $data->libro->pag_anuncios) }}</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">P&aacute;ginas para publicidad</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">{{ $data->libro->pag_anuncios }}</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						@php
						if($data->libro->idioma == 1){ 
							$idioma = 'Espa&ntilde;ol'; 
						}elseif($data->libro->idioma == 2){ 
							$idioma = 'Ingles'; 
						}else{
						 	$idioma = 'Bilingue'; 
						}

						if($data->material_cliente == 1){
							$material = 'Si';
						}elseif($data->material_cliente == 2){
							$material = 'No';
						}else{
							$material = 'Quizas';
						}

						$tamano = $data->libro->tamano;

						  $palabras = 0;

					        switch ($data->libro->estilo->id) {
					            case 2:
					                $palabras = ($data->libro->paginas - $data->libro->pag_anuncios) * $tamano->cant_palabras;
					            break;
					            case 3:
					                $palabras = ($data->libro->paginas - $data->libro->pag_anuncios) * ($tamano->cant_palabras / 5);

					            break;
					            case 5:
					                $palabras = ($data->libro->paginas - $data->libro->pag_anuncios) * ($tamano->cant_palabras / 2);

					            break;
					        }




						@endphp

						<tr>
							<td style="text-align: left;">Idioma: {{ $idioma }}</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">1</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">Material cliente:{{ $material }}</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">1</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00,2,'.',',') }}</td>
						</tr>

						<tr>
							<td style="text-align: left;">Palabras</td>
							
							<td style="text-align:center">X</td>
							<td style="text-align:center">{{ $palabras }}</td>
							<td style="text-align:center"> $ {{ number_format((float) 00.00,2,'.',',') }}</td>
						</tr>


						@php
								$utilidad = $data->entrevistas * $precios->entrevista_transcripcion;

							
						@endphp
		
						
		
						<tr>
							<td style="text-align: left;">Entrevistas y transcripci&oacute;n</td>
							
							<td style="text-align:center"> $ {{ number_format((float)$precios->entrevista_transcripcion,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->entrevistas }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ($precios->entrevista_transcripcion * $data->entrevistas),2,'.',',') }}</td>
						</tr>

						@php


								$utilidad += (($palabras/500)  * $data->libro->escritor->precio);

								
						@endphp
						

						<tr>
							<td style="text-align: left;">{{ $data->libro->escritor->nombre }}</td>
							<td style="text-align:center"> $ {{ number_format((float) $data->libro->escritor->precio,2,'.',',') }}</td>
							<td style="text-align:center">{{ ($palabras/500) }} (Palabras / 500) </td>
							<td style="text-align:center"> $ {{ number_format((float) (($palabras/500) * $data->libro->escritor->precio ) ,2,'.',',') }}</td>
						</tr>

						@php
								$utilidad += $data->sesion_fotograficas * $precios->sesiones_fotografia;
						@endphp

						<tr>
							<td style="text-align: left;">Sesiones fotogr&aacute;ficas</td>
							<td style="text-align:center"> $ {{ number_format((float) $precios->sesiones_fotografia,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->sesion_fotograficas }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ( $data->sesion_fotograficas * $precios->sesiones_fotografia ) ,2,'.',',') }}</td>
						</tr>
						@php
								$utilidad += $data->libro->ilustracion->compleja * $precios->ilustraciones_complejas;

						@endphp

						<tr>
							<td style="text-align: left;">Ilustraciones Complejas</td>
							<td style="text-align:center"> $ {{ number_format((float) $precios->ilustraciones_complejas ,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->libro->ilustracion->compleja }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ( $data->libro->ilustracion->compleja * $precios->ilustraciones_complejas ) ,2,'.',',') }}</td>
						</tr>
						@php
								$utilidad += $data->libro->ilustracion->sencilla * $precios->ilustraciones_sencillas;

						@endphp

						<tr>
							<td style="text-align: left;">Ilustraciones Sencillas</td>
							<td style="text-align:center"> $ {{ number_format((float) $precios->ilustraciones_sencillas ,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->libro->ilustracion->sencilla }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ( $data->libro->ilustracion->sencilla * $precios->ilustraciones_sencillas ) ,2,'.',',') }}</td>
						</tr>

						

						<tr>
							<td style="text-align: left;">Banco Av Free:{{ ($data->royaltyfree)? 'Si' : 'No' }}</td>
							<td style="text-align:center">X</td>
							<td style="text-align:center">{{ ($data->royaltyfree)? 1 : 0 }}</td>
							<td style="text-align:center"> $ {{ number_format((float) 0.00 ,2,'.',',') }}</td>
						</tr>

						@php
								$utilidad += $data->img_conderecho * $precios->imagen_autorizada;

						@endphp

						<tr>
							<td style="text-align: left;">Imagenes autorizadas</td>
							<td style="text-align:center">$ {{ number_format((float) $precios->imagen_autorizada ,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->img_conderecho }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ($data->img_conderecho * $precios->imagen_autorizada) ,2,'.',',') }}</td>
						</tr>

						@php
								$utilidad += ($data->libro->estilo->id == 2) ? $data->libro->paginas * $precios->disenador_sencillo : $data->libro->paginas * $precios->disenador;							


						@endphp

						<tr>
							<td style="text-align: left;">Dise&ntilde;o y armado</td>
							<td style="text-align:center">$ {{ number_format((float) $precios->disenador,2,'.',',') }}</td>
							<td style="text-align:center">{{ $data->libro->paginas }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ($data->libro->paginas * $precios->disenador) ,2,'.',',') }}</td>
						</tr>
						@php
								$utilidad += ($palabras/500 * $precios->corrector);

								
						@endphp

						<tr>
							<td style="text-align: left;">Corrector de Estilo</td>
							<td style="text-align:center">$ {{ number_format((float) $precios->corrector ,2,'.',',') }}</td>
							<td style="text-align:center">{{ $palabras /500 }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ($palabras/500 * $precios->corrector) ,2,'.',',') }}</td>
						</tr>

						@php
								$utilidad += $precios->operacion;

						@endphp

						<tr>
							<td style="text-align: left;">Operaci&oacute;n</td>
							<td style="text-align:center">$ {{ number_format((float) $precios->operacion ,2,'.',',') }}</td>
							<td style="text-align:center">1</td>
							<td style="text-align:center"> $ {{ number_format((float) $precios->operacion ,2,'.',',') }}</td>
						</tr>
						@php
								$utilidad += ($palabras/500) * $precios->coordinador;



						@endphp
						<tr>
							<td style="text-align: left;">Coordinador</td>
							<td style="text-align:center">$ {{ number_format((float) $precios->coordinador ,2,'.',',') }}</td>
							<td style="text-align:center">{{ $palabras/500 }}</td>
							<td style="text-align:center"> $ {{ number_format((float) ($palabras/500 * $precios->coordinador) ,2,'.',',') }}</td>
						</tr>

						@php 

								$total = $utilidad;

								$utilidad = $total * $precios->utilidad / 100;
								// dd($utilidad);
								$pvp  = $total + $utilidad;

								$descuento = $data->monto_cupon; 
								
								$iva = (($pvp - $descuento) * $precios->iva) / 100 ;
								$total_pagar = ($pvp - $descuento) + $iva;

						@endphp
							
						<tr>
							<td style="text-align: left;">Utilidad</td>
							<td style="text-align:center">$ {{ number_format((float) $total,2,'.',',') }}</td>
							<td style="text-align:center">1</td>
							<td style="text-align:center">$ {{ number_format((float) ($total * $precios->utilidad) /100,2,'.',',') }}</td>
						</tr>
					
					</tbody>
				</table>

				<table class="table-totales" width="40%" border="1">
					<tbody>
						<tr>
							<td><strong>PVP:</strong></td><td>$ {{ number_format((float) $pvp,2,'.',',') }}</td>
							
						</tr>

						<tr>
							
							<td><strong>Descuento:</strong></td><td>$ {{ number_format((float) $descuento,2,'.',',') }}</td>
						</tr>


						<tr>
							<td><strong>IVA:</strong></td><td>$ {{ number_format((float) $iva,2,'.',',') }}</td>
							
						</tr>

						<tr>
							<td><strong>A pagar:</strong></td><td>$ {{ number_format((float)$total_pagar,2,'.',',') }}</td>
						</tr>
					</tbody>
				</table>
			</div>


			<div class="pie-pagina">
                <strong>Copyright &copy; {{ date('Y') }} <a href="{{ route('welcome') }}" title="{{ $app->nombre }}">{{ $app->nombre }}</a>.</strong>
                All rights reserved.
			</div>
		
	</div>
</body>
</html>
