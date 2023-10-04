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
                    ->subject(__('Cuenta desactivada'))
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("El usuario :usuario ha desactivado su cuenta.",['usuario' => $this->usuario->getNombreCompleto()]))
                    ->line(__("El motivo de su baja es la siguiente:"))
                    ->line($this->mensaje)
                    ->salutation(__('Gracias por usar Travel Points'));
    }

    /**
     * Get the array representation of the notification.S
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'titulo' => __('Un usuario ha desactivado su cuenta'),
            'avatar' => $this->usuario->getAvatar(),
            'usuario' => $this->usuario->getNombreCompleto(),
            'mensaje' => [__("El usuario :usuario ha desactivado su cuenta.", ['usuario' => $this->usuario->getNombreCompleto()]), __("El motivo de su baja es la siguiente:"),$this->mensaje],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => __('Ir a mi perfil'),
            'url' => ['name' => 'perfil',]
        ];
    }
}
