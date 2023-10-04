<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

use App\Mail\UsuarioCreado;

class WelcomeUsuario extends Notification implements ShouldQueue
{
    
    use Queueable;

    protected $usuario;
    
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->usuario = $user;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [
            'database',
            'mail',
            // 'broadcast'
        ];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new UsuarioCreado($this->usuario))
            ->to($this->usuario->email);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable){
        return [
            'titulo' => __("Bienvenido a :sistema",['sistema' => env('APP_NAME')]),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("Hola :nombre .Bienvenido/a a TravelPoints. Estamos listos para acompañarte en este viaje.  Gana puntos en los registros de las compras que hagas en los Negocios Travel Points, invita amigos y disfruta todo lo que tenemos para tí",['nombre' => $notifiable->getNombreCompleto()])],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __("Ir a mi perfil"),
            'url' => ['name' => 'perfil.editar',]
             ];
    }

}
