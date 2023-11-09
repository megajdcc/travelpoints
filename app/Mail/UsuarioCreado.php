<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class UsuarioCreado extends Mailable implements ShouldQueue
{
   use Queueable;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct( public User $usuario, public string $url = 'travelpoints.es'){
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->markdown('emails.usuario.creado')
                    ->subject("Bienvenido a Travel Points ".$this->usuario->getNombreCompleto())
                    ->with([
                        'Nombre' => $this->usuario->getNombreCompleto(),
                        'rol'    => $this->usuario->rol->nombre,
                        'Email'  => $this->usuario->email,
                        'Url'    => $this->url.'/usuario/'.$this->usuario->id.'/establecer/contrasena',
                    ]);
                    
    }
}
