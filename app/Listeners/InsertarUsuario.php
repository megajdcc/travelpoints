<?php

namespace App\Listeners;

use App\Events\UsuarioCreado;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\WelcomeUsuario;

class InsertarUsuario implements ShouldQueue
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
     * @param  \App\Events\UsuarioCreado  $event
     * @return boolean
     */
    public function handle(UsuarioCreado $event)
    {
        // $event->usuario->notify(new WelcomeUsuario($event->usuario));

        return false;

    }
}
