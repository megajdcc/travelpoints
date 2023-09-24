<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Negocios por Pais</title>

	<style>
		body,html{
			padding: 0px;
			margin: 0px;
			/* line-height: 25px; */
		}
			.logo-template{
				width: 220px !important;
				height: auto;
				object-fit: contain;
			}
			.container-header{
				width: 100%;
				margin-bottom: 25px;
				
			}	

			h2{
				margin: 0px;
			}

			p{
				/* line-height: 16px; */
				margin: 0 !important; 
			}

			.table-1{
				width: 70%;
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
				/* background-color: #35656F !important; */
				/* color: white; */
			}
			.container-cliente{
					/* width: 100%; */
					/* float: left; */
					/* margin-top: 25pt; */
			}

			.table-contenido{
				border-collapse: collapse;
				width:90% !important; 
				margin-right:3rem;
				margin-left:3rem;
				margin-bottom:220px;

			}
			.table-contenido thead th{
				text-align: justify;

			}
			.table-contenido td{
				padding: 3px;
				text-align: justify;
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
				width:100%;
				text-align: center;
			}

			.pie-pagina{
				text-align: center;
				margin-bottom: 0px;
				position: absolute;
				bottom: 0;
				left: auto;right: auto;
				margin: auto auto 0px auto;
				width:100%;
				background:#E11383;
				min-height: 200px;
				max-height: 200px;
				height:200px;

				min-width:100%;
			}

			.table-header{
				height: 100px;
				width:100%;
				position: relative;
				text-align: left;
				margin: 3rem 0px auto 3rem;
			}

			.table-header .line-header{
				width:auto;
				background-color: #E11383;
				height: 5px;
				min-height: 5px;
			}

			.table-pie-pagina{
				height: 200px;
				width:90%;
				position: relative;
				text-align: left;
				margin: auto 3rem;
			}
			.logotipoblanco{
				height: 80%;
				width: auto;
				max-width: 85%;
				vertical-align: center;

			}

			.table-pie-pagina .logotipoblanco{

			}

			.legenda-pie-pagina{
				color:white;
			}
			.legenda-pie-pagina a {
				text-decoration: none;
				color:#F4B223;
				font-weight: 600;
			}

			.p2{
				padding: 1rem;
			}


			.table-1{
				height: 100px;
				width:75%;
				position: relative;
				text-align: left;
				margin: auto auto;
			}
			.avatar-img{
				height:90px;
				width:auto;
				border-radius: 10px;
				margin-top: 15px;
			}

			.text-danger{
				color:#E11383;
			}
			.text-primary{
				color:#0097CE;
			}
			.text-success{
				color:#61A60E;
			}

			.my-0{
				margin-top:0px;
				margin-bottom:0px;
			}
	</style>
</head>
<body>
	
	<div class="container">
		<div class="container-header">

			<table class="table-header" border="0">
				<tbody>
					<tr>
						<td style="width:250px;">
							<img src="{{ $logotipo }}" alt="TravelPoints" class="logo-template">
						</td>
						<td class="" >
							<div class="line-header" style="margin-top:25px"> </div>
						</td>
					</tr>

				</tbody>
			</table>

			<table class="table-1" border="0">
				<tbody>
					<tr>
						<td colspan="2">
							@if(isset($filtro['pais']) && !empty($filtro['pais']))
								<h2>Negocios por Destino: <b>{{ $filtro['pais'] }}</b></h2>
							@elseif(isset($filtro['destino']) && !empty($filtro['destino']))
								<h2>Negocios por Destino</h2>
							@else
								<h2>Negocios por País</h2>

              @endif

						</td>
						
					</tr>

					<tr>
						<td style="width:30%">
							<table border="0">
								<tr>
									<td>
										
									</td>

									<td>
									
									</td>
								</tr>
							</table>
						</td>
					</tr>

				</tbody>
			</table>
			
		</div>

		<div class="container-cliente">
			<table class="table-contenido"  border="0">
				<thead>
					<tr>
						@if(isset($filtro['pais']) && !empty($filtro['pais']))
								<th class="">Num.</th>
								<th class="">Destino</th>
								<th class="">Cant de negocios</th>
								<th class="">País</th>

            @elseif(isset($filtro['destino']) && !empty($filtro['destino']))
                <th class="">Num.</th>
								<th class="">Negocio</th>
								<th class="">Dirección</th>
								<th class="">Destino</th>
								<th class="">País</th>
						@else
								<th class="">Num.</th>
								<th class="">País</th>
								<th class="">Cant de negocios</th>
								<th class="">Negocios Activos</th>
								<th class="">Negocios Desactivados</th>


						@endif
					
					</tr>
					
				</thead>
				<tbody>

					@foreach ($negocios as $key => $negocio)
						<tr style="border-bottom:1px solid rgba(0,0,0,0.4)">
								<td>{{ $key + 1  }}</td>

								@if(isset($filtro['pais']) && !empty($filtro['pais']))
									  <td>{{ $negocio->destino }}</td>
										<td>{{ $negocio->negocios }}</td>
										<td>{{ $negocio->pais ?? 'otros' }}</td>

                @elseif(isset($filtro['destino']) && !empty($filtro['destino']))
                    <td>{{ $negocio->negocio }}</td>
										<td>{{ $negocio->direccion }}</td>
										<td>{{ $negocio->destino }}</td>
										<td>{{ $negocio->pais }}</td>
								@else
										<td>{{ $negocio->pais }}</td>
										<td>{{ $negocio->negocios }}</td>
										<td>{{ $negocio->activos }}</td>
										<td>{{ $negocio->desactivados }}</td>
								@endif
               
						</tr>
					@endforeach

				</tbody>
			</table>
		</div>


			<div class="pie-pagina">
				<table border="0" class="table-pie-pagina">
					<tr>
						<td>
								<img src="{{ $logotipoblanco }}" alt="TravelPoints" class="logotipoblanco">
						</td>
						<td class="p2 legenda-pie-pagina">
							<h2 style="line-height:30px">Gracias por ser parte importante en la Promoción Turística de tu Destino.</h2>
							<p style="line-height:15pt">Aprende más en tu sección <a href="{{ env('APP_URL') }}/mi-academia" target="_blank" rel="noopener noreferrer">Academia</a>,dentro de tu cuenta en travelpoints.es.<br>Conoce nuestra <a href="{{env('APP_URL')}}/politicas-de-privacidad" target="_blank" rel="noopener noreferrer">Política de privacidad</a> y <a href="{{env('APP_URL')}}/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">Términos y condiciones</a> de uso.</p>
						</td>
					</tr>
				</table>
					
			</div>
		
	</div>
</body>
</html>