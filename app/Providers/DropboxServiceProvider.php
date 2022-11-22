<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\Filesystem;
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;

class DropboxServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

        Storage::extend('dropbox', function ($app, $config) {
            // Nueva implementación en Laravel 9, 
             $adapter = new DropboxAdapter(new DropboxClient(
                 $config['authorization_token']
                ));

            return new FilesystemAdapter(
                    new Filesystem($adapter, $config),
                    $adapter,
                    $config
                );

            // Vieja implementación
            // $client = new DropboxClient(
            //     $config['authorization_token']
            // );

            // return new Filesystem(new DropboxAdapter($client));
        });
    }
}
