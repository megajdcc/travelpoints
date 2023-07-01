<?php

namespace App\Notifications;

use App\Models\Negocio\Reservacion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class reservaCancelada extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Reservacion $reservacion)
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
                    ->subject('Reservación cancelada')
                    ->greeting("Hola {$notifiable->getNombreCompleto()}.")
                    ->line("Hemos cancelado tu reservación al negocio ({$this->reservacion->negocio->nombre}) que tenías pendiente para el día {$this->reservacion->getDia()}, por inasistencia o que quizas no te registrarón el consumo en el negocio")
                    ->line('Si fuiste y no te registrarón el consumo, por favor haznolo saber, enviandonos un mensaje desde el módulo de contacto dispuesto para tí en la plataforma, te dejamos el link para que lo hagas')
                    
                    ->action('Contacto', url('/contact'))
                    ->salutation('Gracias por seguir usando nuestra aplicación de TravelPoints.');
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
            'titulo' => 'Reservación Cancelada',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["Hemos cancelado tu reservación al negocio ({$this->reservacion->negocio->nombre}) que tenías pendiente para el día {$this->reservacion->getDia()}, por inasistencia o que quizas no te registrarón el consumo en el negocio", 'Si fuiste y no te registrarón el consumo, por favor haznolo saber, enviandonos un mensaje desde el módulo de contacto dispuesto para tí en la plataforma'],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a contacto',
            'url' => '/contact'
        ];
    }
}
