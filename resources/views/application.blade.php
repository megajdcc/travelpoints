<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->
  <link rel="manifest" href="/manifest.json">

  <title>TravelPoints</title>
 
  <!-- Favicon -->
  <link rel="shortcut icon" href="{{ asset('favicons/favicon-57x57.png') }}">
  <script src="https://accounts.google.com/gsi/client" async defer ></script>
 
   <!-- Styles -->
  @vite(['resources/js/app.js'])
  <link rel="stylesheet" href="/css/loader.css">
  
</head>

<body>

  <div id="loading-bg">
    <div class="loading-logo">
      <img src="{{ asset('/storage/logotipo.png') }}" alt="Logo" />
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
  <div id="app">
  </div>

  
  @if(env('APP_ENV') == 'production')
    <script>
      window.addEventListener('load',() => {
          if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/build/sw.js',{ scope: '/build/' }).then(() => {
              console.log('Service Worker registrado!')
            }).catch(e => {
              console.log('Service Worker no pudo ser registrado')
              console.log(e)
            });
          }
      });
    </script> 

  @endif

    {{-- <script src="{{ mix('js/manifest.js')}}"></script>
    <script src="{{ mix('js/vendor.js')}}"></script>
    <script src="{{ mix('js/app.js')}}"></script> --}}
  
  </body>

</html>
