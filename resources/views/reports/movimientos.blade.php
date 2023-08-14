<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">



	<title>Estado de Cuenta</title>
	
{{-- 	<link rel="stylesheet" type="text/css" href="{{ asset('css/estilos.css') }}">
 --}}	{{-- <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}"> --}}


	<style>
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
			},

			p{
				line-height: 16px;
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

			.table-cliente{
				border-collapse: collapse;
				/* border: 1px solid black; */

			}
			.table-cliente thead{
				text-align: justify;

			}
			.table-cliente td{
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
				bottom: 4rem;
				left: auto;right: auto;
				margin: auto auto 0px auto;
				width:100%;
			}


	</style>
</head>
<body>
	
	<div class="container">
		<div class="container-header">

				<div class="header-left">
					<table class="table-1" border="0">
						<tbody>
							<tr>
								<td style="width:250px;"><img src="{{ $logotipo }}" alt="TravelPoints" class="logo-template"></td>
								<td><h2 class="invoice_name_cliente font-weight-bold" style="color:#0097CE">Estado de Cuenta</h2>

										<p style ="margin:0;line-height:25px">
											Movimientos:{{ $movimientos->count() }}  <br>
											Saldo en Cartera: {{ $divisa->iso }} {{ number_format((float) $cuenta->saldo,2,',','.') }} {{ $divisa->simbolo }}
										</p>

								</td>
							</tr>

						</tbody>
					</table>
				</div>
				
	
			
		</div>

		<div class="container-cliente">
			<table class="table-cliente" width="100%" border="0" class="">
				<thead>
					<tr>
						<th class="">No.</th>
						<th class="">Fecha</th>
						<th class="">Concepto</th>
						<th class="">Monto</th>
						<th class="">Balance</th>
					</tr>
					
				</thead>
				<tbody>

					@for($i = 0 ; $i < count($movimientos); $i++)
							<tr style="border-bottom:1px solid rgba(0,0,0,0.4)">
								<td>{{ $i + 1  }}</td>
								<td>{{ $movimientos[$i]->created_at->toDateTimeString() }}</td>
								<td style="text-align:justify">{{ $movimientos[$i]->concepto }}</td>
								<td>{{ $movimientos[$i]->divisa->iso }} {{ number_format((float) $movimientos[$i]->monto,2,',','.') }} {{ $movimientos[$i]->divisa->simbolo }}</td>
								<td>{{ $movimientos[$i]->divisa->iso }} {{ number_format((float) $movimientos[$i]->balance,2,',','.') }} {{ $movimientos[$i]->divisa->simbolo }}</td>
							</tr>
					@endfor
				</tbody>
			</table>
		</div>


			<div class="pie-pagina">

					<table class="table-totales" width="100%" >
					<tbody>
						<tr>
							<td >
								<img src="{{ $logotipo }}" alt="TravelPoints" class="logo-template">
							</td>
						</tr>
						<tr>
							<td style="width:auto;text-align: center"><strong>Copyright &copy; {{ date('Y') }} <a href="{{ env('APP_URL') }}" title="{{ env('APP_NAME') }}">{{ env('APP_NAME') }}</a>.</strong>
                All rights reserved.</td>
						</tr>

						
					</tbody>
				</table>
			</div>
		
	</div>
</body>
</html>