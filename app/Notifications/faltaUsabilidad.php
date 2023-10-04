<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class faltaUsabilidad extends Notification implements ShouldQueue
{
    use Queueable;


    /**
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail','database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject(__('Mucho tiempo de inactividad'))
                    ->greeting(__('Hola :nombre, llevas mucho tiempo de inactividad.',['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__('Recuerda que si llegas a 12 meses sin inactividad alguna se te descontará el 10 % de tus TravelPoints.'))
                    ->line(__('Te invito que entres al sistema y efectues algún tipo de registro, para evitar el descuento por inactividad.'))
                    ->action(__('Ir a Travel Points'), url('/'))
                    ->salutation('');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'titulo' => __("Mucho tiempo de inactividad"),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                __('Recuerda que si llegas a 12 meses sin inactividad alguna se te descontará el 10 % de tus TravelPoints.'),
                __('Te invito que entres al sistema y efectues algún tipo de registro, para evitar el descuento por inactividad.')
            ],
            'type' => 'light-info', 
            'btn' => false,
            'btnTitle' => '',
            'url' => []
        ];
    }
}
