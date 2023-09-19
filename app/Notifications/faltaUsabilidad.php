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
                    ->subject('Mucho tiempo de inactividad')
                    ->greeting("Hola {$notifiable->getNombreCompleto()}, llevas mucho tiempo de inactividad.")
                    ->line('Recuerda que si llegas a 12 meses sin inactividad alguna se te descontará el 10 % de tus TravelPoints.')
                    ->line('Te invito que entres al sistema y efectues algún tipo de registro, para evitar el descuento por inactividad.')
                    ->action('Ir a Travel Points', url('/'))
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
            'titulo' => "Mucho tiempo de inactividad",
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                'Recuerda que si llegas a 12 meses sin inactividad alguna se te descontará el 10 % de tus TravelPoints.',
                'Te invito a que efectues algún tipo de registro, para evitar el descuento por inactividad.'
            ],
            'type' => 'light-info', 
            'btn' => false,
            'btnTitle' => '',
            'url' => []
        ];
    }
}
