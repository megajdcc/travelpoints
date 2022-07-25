<?php

namespace App\Providers;

use App\Providers\UsuarioCreado;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InsertarUsuarios
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Providers\UsuarioCreado  $event
     * @return void
     */
    public function handle(UsuarioCreado $event)
    {
        //
    }
}
