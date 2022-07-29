<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class CuentaDesactivada extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public User $usuario, protected string $mensaje )
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Cuenta desactivada')
                    ->greeting("Hola {$notifiable->getNombreCompleto()}")
                    ->line("El usuario {$this->usuario->getNombreCompleto()} ha desactivado su cuenta.")
                    ->line("El motivo de su baja es la siguiente:")
                    ->line($this->mensaje)
                    ->salutation('Gracias por usar TravelPoints!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'titulo' => 'Un usuario ha desactivado su cuenta',
            'avatar' => $this->usuario->getAvatar(),
            'usuario' => $this->usuario->getNombreCompleto(),
            'mensaje' => ["El usuario {$this->usuario->getNombreCompleto()} ha desactivado su cuenta.", "El motivo de su baja es la siguiente:",$this->mensaje],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => 'Ir a mi perfil',
            'url' => ['name' => 'perfil',]
        ];
    }
}
