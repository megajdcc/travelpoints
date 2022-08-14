<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use App\Models\Negocio\Solicitud;

class SolicitudEnviada extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Solicitud $solicitud)
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
        ->subject('Solicitud enviada')
        ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                    ->line("Tu solicitud para que afiliemos al negocio {$this->solicitud->nombre}, ha sido notificada en TravelPoints.")
                    ->line('Al revisar tu solicitud te estaremos informando acerca de su estatus')
                    ->line('Gracias por usar TravelPoints!');
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
            'titulo' => 'Solicitud enviada',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["Tu solicitud para que afiliemos al negocio {$this->solicitud->nombre}, ha sido notificada en TravelPoints.","Al revisar tu solicitud te estaremos informando acerca de su estatus"],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Solicitudes',
            'url' => ['name' => 'socio.negocio.solicitudes']
        ];
    }
}
