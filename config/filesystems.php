<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'img-perfil' => [
            'driver' => 'local',
            'root' => storage_path('app/public/img-perfil'),
            'url' => env('APP_URL') . '/storage/img-perfil',
            'visibility' => 'public',
        ],

        'img-portada' => [
            'driver' => 'local',
            'root' => storage_path('app/public/img-portada'),
            'url' => env('APP_URL') . '/storage/img-portada',
            'visibility' => 'public',
        ],


        'negocio-categoria' => [
            'driver' => 'local',
            'root' => storage_path('app/public/negocios/categorias'),
            'url' => env('APP_URL') . '/storage/negocios/categorias',
            'visibility' => 'public',
        ],
        
        'destino_imagenes' => [
            'driver' => 'local',
            'root' => storage_path('app/public/destinos/imagenes'),
            'url' => env('APP_URL') . '/storage/destinos/imagenes',
            'visibility' => 'public',
        ],

        'atracciones_imagenes' => [
            'driver' => 'local',
            'root' => storage_path('app/public/atracciones/imagenes'),
            'url' => env('APP_URL') . '/storage/atracciones/imagenes',
            'visibility' => 'public',
        ],

        'eventos_imagenes' => [
            'driver' => 'local',
            'root' => storage_path('app/public/eventos/imagenes'),
            'url' => env('APP_URL') . '/storage/eventos/imagenes',
            'visibility' => 'public',
        ],

        'logo_negocios' => [
            'driver' => 'local',
            'root' => storage_path('app/public/negocios/logos'),
            'url' => env('APP_URL') . '/storage/negocios/logos',
            'visibility' => 'public',
        ],
        'videos_negocios' => [
            'driver' => 'local',
            'root' => storage_path('app/public/negocios/videos'),
            'url' => env('APP_URL') . '/storage/negocios/videos',
            'visibility' => 'public',
        ],

        'imagenes_publicaciones' => [
            'driver' => 'local',
            'root' => storage_path('app/public/publicaciones'),
            'url' => env('APP_URL') . '/storage/publicaciones',
            'visibility' => 'public',
        ],

        'negocio_cupones' => [
            'driver' => 'local',
            'root' => storage_path('app/public/negocios/cupones'),
            'url' => env('APP_URL') . '/storage/negocios/cupones',
            'visibility' => 'public',
        ],


        'negocio_menu' => [
            'driver' => 'local',
            'root' => storage_path('app/public/negocios/menu'),
            'url' => env('APP_URL') . '/storage/negocios/menu',
            'visibility' => 'public', 
        ],

        'imagenes_productos' => [
            'driver' => 'local',
            'root' => storage_path('app/public/productos'),
            'url' => env('APP_URL') . '/storage/productos',
            'visibility' => 'public',
        ],

        'archivo_productos' => [
            'driver' => 'local',
            'root' => storage_path('app/public/productos/archivos'),
            'url' => env('APP_URL') . '/storage/productos/archivos',
            'visibility' => 'public',
        ],

        'archivos_multimedias' => [
            'driver' => 'local',
            'root' => storage_path('app/public/multimedias'),
            'url' => env('APP_URL') . '/storage/multimedias',
            'visibility' => 'public',
        ],

        'archivos_comprobante' => [
            'driver' => 'local',
            'root' => storage_path('app/public/comprobantes/archivo_acreditativo'),
            'url' => env('APP_URL') . '/storage/comprobantes/archivo_acreditativo',
            'visibility' => 'public',
        ],

        'comprobante_retiro' => [
            'driver' => 'local',
            'root' => storage_path('app/public/comprobantes/retiros'),
            'url' => env('APP_URL') . '/storage/comprobantes/retiros',
            'visibility' => 'public',
        ],

        'archivos_reunion' => [
            'driver' => 'local',
            'root' => storage_path('app/public/reunions/archivos'),
            'url' => env('APP_URL') . '/storage/reunions/archivos',
            'visibility' => 'public',
        ],

        'reportes' => [
            'driver' => 'local',
            'root' => storage_path('app/public/reportes'),
            'url' => env('APP_URL') . '/storage/reportes',
            'visibility' => 'public',
        ],

        'traducciones' => [
            'driver' => 'local',
            'root' => storage_path('app/public/traducciones'),
            'url' => env('APP_URL') . '/storage/traducciones',
            'visibility' => 'public',
        ],

        'locales' => [
            'driver' => 'local',
            'root' => storage_path('app/resources/js/src/libs/i18n/idiomas'),
            'url' => env('APP_URL') . '/storage/traducciones',
            'visibility' => 'public',
        ],





        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
