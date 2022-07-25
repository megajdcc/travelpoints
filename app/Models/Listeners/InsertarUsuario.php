<?php

namespace App\Models\Listeners;

use App\Models\Events\UsuarioCreado;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InsertarUsuario
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
     * @param  \App\Models\Events\UsuarioCreado  $event
     * @return void
     */
    public function handle(UsuarioCreado $event)
    {
        //
    }
}
