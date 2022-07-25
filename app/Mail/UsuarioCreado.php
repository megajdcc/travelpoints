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

    protected $usuario ; 
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $usuario){
        $this->usuario = $usuario;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

      

        return $this->markdown('emails.usuario.creado')
                    ->subject('Bienvenido al sistema '.$this->usuario->nombre . ' ' . $this->usuario->apellido)
                    ->with([
                        'Nombre' => $this->usuario->nombre . ' ' . $this->usuario->apellido,
                        'rol'    => $this->usuario->rol->nombre,
                        'Email'  => $this->usuario->email,
                        'Url'    => url('/usuario/'.$this->usuario->id.'/establecer/contrasena'),
                    ]);
                    
    }
}
