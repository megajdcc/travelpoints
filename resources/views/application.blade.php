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

  <!-- Splash Screen/Loader Styles -->
  <link rel="stylesheet" type="text/css" href="{{ mix('css/loader.css') }}" />

  <!-- Styles -->
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">

  <!-- Favicon -->
  <link rel="shortcut icon" href="{{ asset('favicons/favicon-8x8.png') }}">
  <script src="https://accounts.google.com/gsi/client" async defer ></script>
  {{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnsLa_yFH7kb5s5GdIaE_P9aGKLkeVIUQ&libraries=directions"></script> --}}
  {{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnsLa_yFH7kb5s5GdIaE_P9aGKLkeVIUQ"></script> --}}

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
      // Check that service workers are supported
      if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
    </script> 

  @endif

    <script src="{{ mix('js/manifest.js')}}"></script>
    <script src="{{ mix('js/vendor.js')}}"></script>
    <script src="{{ mix('js/app.js')}}"></script>
  
  </body>

</html>
