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
        ->subject(__("Solicitud enviada"))
        ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("Tu solicitud para que afiliemos al negocio :negocio, ha sido notificada en TravelPoints.",['negocio' => $this->solicitud->nombre]))
                    ->line(__("Al revisar tu solicitud te estaremos informando acerca de su estatus."))
                    ->salutation(__("¡Gracias por usar Travel Points!"));
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
            'titulo' => __("Solicitud enviada"),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("Tu solicitud para que afiliemos al negocio :negocio, ha sido notificada en TravelPoints.", ['negocio' => $this->solicitud->nombre]), __("Al revisar tu solicitud te estaremos informando acerca de su estatus.")],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __("Solicitudes"),
            'url' => ['name' => 'socio.negocio.solicitudes']
        ];
    }
}
