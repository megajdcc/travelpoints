<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Factura - nro {{ $id }}</title>
	
{{-- 	<link rel="stylesheet" type="text/css" href="{{ asset('css/estilos.css') }}">
 --}}	{{-- <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}"> --}}


	<style>

      .body{
        padding: 0px;
        margin: 0px;
      }
       .html{
        padding: 0px;
        margin: 0px;

      }
      .factura{
        width:100%;
        height:100%;
        margin: 0 0;
      }

			.logo-template{
				width: 220px;
				height: auto;

			}

      .top-header{
        background: black;
        color:white;
        text-align: center;
        border-radius: 5px;
      }
      .header{
        position: relative;
        width: 100% ;
      } 

      .logotipo{
        position: relative;
      }

      .logotipo img{
        width:80%;
        height:auto;
        margin-top:0px;
        margin-bottom: auto;
        position: absolute;
      }

      .logotipo table{
        margin-top:auto;
        margin-bottom: 0px;
      }


			h2{
				margin: 0px;
			},

			p{
				line-height: 16px;
				margin: 0 !important; 
			}
      .table-logo{
        height: 230px;
				width: 25%;
        /* float:inline-start; */
			}

      .table-emisor-receptor{
				border-collapse: collapse;
				width: 60%;
        height: 230px;
        /* float:inline-end; */
			}

			.table-1{
				width: 25%;
			}
			.table-2{
				width: 50%;
				float: right;
			}

      table td{
       word-break: unset;
      }

	


			.table-cliente{
				border-collapse: collapse;

			}
			.table-cliente td{
				padding: 3px;
				text-align: center;
			}

			.title-head{
				background-color: #35656F !important;
				color: white;
				border: 1px solid black;
				text-align: center;
			}
			.container-data{
				position: relative;
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
				bottom: 4rem;
				left: auto;right: auto;
				margin: auto auto 0px auto;
        width: 100%;
			}

      .title-box{
        background: black;
        color:white;
      }

      .w-100{
        width:100%;
      } 

      .w-35{
        width:35%;
      }
      .w-65{
        width:65%;
      }

      .h-100{
        height:100%;
      }

      .w-auto{
        width:auto;
      }
      .p-2{
        padding: 1rem;
      }

      .p-1{
        padding: .2rem;
      }

      .mt-3{
        margin-top:2rem !important;
      }
      .mt-1{
        margin-top:1rem !important;
      }

      .my-1{
        margin-top:.5rem;
        margin-bottom:.5rem;

      }

      .line-item{
        margin-top:.5rem ;
        margin-bottom:.5rem;
        /* background: #e5e5e5; */
        text-align: left !important;
       }

      .px-1{
        padding-left: .5rem;
        padding-right: .5rem;
      }

      .px-3{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }

      .bg-dark{
        background: black;
        color:white;
      }

      .bg-gray{
        background: rgb(192, 187, 187);
        color:black;
      }

      .text-align-left{
        text-align: left;
      }
       .text-align-center{
        text-align: center;
      }

      .border-radius-5{
        border-radius: 5px;
      }

      .tabla-retenciones{
        float: left;
        position: relative;
        text-align: left;
      }

       .tabla-totales{
        float: right;
        position: relative;
      }
      
     
     
	</style>
</head>
<body>
	
	<div class="container factura">
    <section class="header">
        
        <section class="table-logo-emisor-receptor">
          <table class="w-100" border="0">
          
          <tbody >
            <tr>
              <td  valign="bottom" rowspan="2" class="logotipo">
                <img src="{{ $logotipo }}" alt="TravelPoints"  >

                <table class="" border="0" style="vertical-align: bottom;">
                
                  <tbody>
                    
                    <tr style="" >
                      <td class="w-25" >Expedición:</td><td style="">{{ date('d/m/Y', strtotime($updated_at)) }}</td>
                    </tr>
                    <tr style="">
                      <td class="w-25">Factura Núm:</td><td>#{{ $id }}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </td>
              <td class="title-box">RECEPTOR</td>
              <td class="title-box">EMISOR</td>
            </tr>
        
            <tr class="w-65">
              <td class="p-1 " style="border:1px solid rgba(0,0,0,.3); max-width:250px;">
                <small style="text-wrap:pretty;">
                  <strong>Info Channel S.L. </strong><br>
                  Ave. Reyes Católicos 29. Int.22 38005 Santa Cruz de Tenerífe Islas Canarías, España. <br>
                  <a href="https://wwww.travelpoints.es" style="text-decoration:none">www.travelpoints.es</a><br>
                  <a href="tel:+34822123456" target="_blank" style="text-decoration:none">tel:+34822123456</a><br>
                  <a href="mailto:corporativo@travelpoints.es" target="_blank" style="text-decoration:none">corporativo@travelpoints.es</a><br>
                  NIF | RIF:{{ $sistema->nif }}
                </small>
              </td>

                <td class="p-1 " style="border:1px solid rgba(0,0,0,.3); vertical-align: baseline;  max-width:250px;">
                <small style="text-wrap:pretty;">
                  <strong>{{ $solicitante->getNombreCompleto() }}</strong><br>
                  {{ $solicitante->direccion }} <br>
                  CP:{{ $solicitante->codigo_postal ?: 'N/A' }} {{ $solicitante?->ciudad->ciudad ?: '' }} {{ $solicitante->ciudad?->estado?->estado ?: '' }} {{ $solicitante->ciudad?->estado?->pais->pais ?: '' }}<br>

                  
                  <a href="tel:{{ $solicitante->telefonos->first()->telefono }}" target="_blank">tel:{{ $solicitante->telefonos->first()->telefono }}</a><br>
                  <a href="mailto:{{ $solicitante->email }}" target="_blank">{{ $solicitante->email }}</a><br>
                </small>
              </td>
              
            </tr>

          </tbody>
        </table>
        </section>
       
    </section>

      <div class="container-cliente mt-3" >
        <table class="table-cliente " width="100%" border="0" class="" style="box-sizing:border-box;">
          <thead >
            <tr >
              <th class="px-1"><div class="bg-dark w-100 text-align-left border-radius-5 p-1">No.</div></th>
              <th class="px-1"><div class="bg-dark w-100 text-align-left border-radius-5 p-1">Fecha</div></th>
              <th class="px-1"><div class="bg-dark w-100 text-align-left border-radius-5 p-1">Concepto</div></th>
              <th class="px-1"><div class="bg-dark w-100 text-align-center border-radius-5 p-1">SubTotal</div></th>
            </tr>
            
          </thead>
          <tbody class="mt-1">
            
            @for($i = 0 ; $i < count($items); $i++)
                <tr style="" class="line-item ">
                  <td class="px-1  mt-1"><div class="w-100  bg-gray text-align-left border-radius-5 p-1"> {{ $i + 1 }}</div></td>
                  <td class="px-1  mt-1"><div class="w-100 bg-gray text-align-left border-radius-5 p-1"> {{ $items[$i]['fecha']->format('d/m/Y') }}</div></td>
                  <td class="px-1 mt-1"><div class="w-100  bg-gray text-align-left border-radius-5 p-1"> {{  $items[$i]['concepto'] }}</div></td>
                  <td class="px-1  mt-1"><div class="w-100  bg-gray text-align-center border-radius-5 p-1 text"> {{ number_format((float) $items[$i]['total'],2) }}{{ $items[$i]['divisa']->simbolo }}</div></td>
                </tr>
            @endfor


            
          </tbody>
        </table>
      </div>

      <div class="px-3 pie-pagina">
        <hr>

        <table class="tabla-retenciones" width="50%" border="0" >
          <tbody>
            <tr>
            <td valign="top" class="text-align-left" style="line-height: 12px;">BASE IMPONIBLE AL {{ $cuota }}% {{ $abrev }}:</td> <td valign="top">{{ number_format((float) $monto,2) }}{{ $divisa->simbolo }}</td>
            </tr>
            <tr>
            <td valign="top" class="text-align-left" style="line-height: 12px;">CUOTA DEL {{ $cuota }}% DE {{ $abrev }}:</td> <td valign="top">{{ number_format((float) $impuesto,2) }}{{ $divisa_impuesto->simbolo }}</td>
            </tr>

            <tr>
              <td valign="top" class="text-align-left" style="line-height: 12px;"> <small>Pagadero por el cobrante en su siguiente declaración patrimonial.</small> </td>
            </tr>

          </tbody>
        </table>

        <table class="tabla-totales" width="30%" border="0" >
          <tbody>
            <tr> 
            <td style="line-height: 18px; text-align:right"><h3 style="margin:0px" ><strong style="padding:0px;">TOTAL {{ number_format((float) $monto,2) }}{{ $divisa->simbolo }}</strong></h3></td>
            </tr>
            <tr>
            <td style="line-height: 18px; text-align:right"><strong style="padding:0px;" >RETENCIONES {{ number_format((float) $impuesto,2) }}{{ $divisa_impuesto->simbolo }}</strong></td>
            </tr>
            <tr>
            <td style="line-height: 18px; text-align:right"><strong style="padding:0px;">A PAGAR {{ number_format((float) $pagar,2) }}{{ $divisa_impuesto->simbolo }}</strong></td>
            </tr>

          </tbody>
        </table>

      </div>

    


		
		
	</div>
</body>
</html>