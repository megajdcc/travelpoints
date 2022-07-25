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
            'broadcast'
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
            'titulo' => 'Bienvenido a '.env('APP_NAME'),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ['Hola '.$notifiable->getNombreCompleto().'!. Bienvenido a '.env('APP_NAME'), 'Puedes hacer varias cosas dentro del sistema, pero empieza por ajustar los datos de tu perfil.'],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a mi perfil',
            'url' => ['name' => 'perfil',]
             ];
    }

}
