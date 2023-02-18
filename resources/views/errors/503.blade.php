<!DOCTYPE html>
<<<<<<< HEAD
<html lang="en">
=======
<html lang="es">
>>>>>>> vite

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->
<<<<<<< HEAD
    <link rel="manifest" href="/manifest.json">

  <title>Boda y Playa </title>

  <!-- Splash Screen/Loader Styles -->
  <link rel="stylesheet" type="text/css" href="{{ asset(mix('css/loader.css')) }}" />

  <!-- Styles -->
  <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">

  <!-- Favicon -->
  <link rel="shortcut icon" href="{{ asset('images/logo/favicon.png') }}">

  <!-- Font -->
  {{-- <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
    rel="stylesheet"> --}}
  <script type="text/javascript" src="https://pay.conekta.com/v1.0/js/conekta-checkout.min.js"></script>
	<script src="//code-eu1.jivosite.com/widget/w8nabJGDoP" async></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-56EHPE6VCY"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-56EHPE6VCY');
  </script>
=======
  <link rel="manifest" href="/manifest.json">

  <title>TravelPoints</title>

  <!-- Splash Screen/Loader Styles -->
  <link rel="stylesheet" type="text/css" href="{{ mix('css/loader.css') }}" />

  <!-- Styles -->
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">

  <!-- Favicon -->
  <link rel="shortcut icon" href="{{ asset('favicons/favicon-8x8.png') }}">
  <script src="https://accounts.google.com/gsi/client" async defer ></script>
>>>>>>> vite

</head>

<body>
<<<<<<< HEAD
  
  <div id="loading-bg">
    <div class="loading-logo">
      <img src="{{ asset('/storage/logotipo.png') }}" alt="Logo" />
=======

  <div id="loading-bg">
    <div class="loading-logo">
      <img src="{{ asset('/storage/logotipov.png') }}" alt="Logo" />
>>>>>>> vite
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
<<<<<<< HEAD
  
  <div id="app">
   <h2>hola a todos</h2>
  </div>
  
  <script>
    
   if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
         navigator.serviceWorker.register('/sw.js');
      });
   }
   
</script>
<script src="{{ asset(mix('js/app.js')) }}"></script>
=======
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

>>>>>>> vite
</body>

</html>
