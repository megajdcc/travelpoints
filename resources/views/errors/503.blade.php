<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->
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
</body>

</html>
