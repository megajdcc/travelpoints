<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Negocio\Solicitud;

class SolicitudNegocioActualizada extends Notification implements ShouldQueue
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
                    ->subject(__("Tu Solicitud de afiliación del negocio :negocio, ha sido :status",['negocio' => $this->solicitud->nombre,'status' => $this->solicitud->getEstatus($this->solicitud->situacion)]))
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line($this->solicitud->getMensage($this->solicitud->situacion))
                    // ->action('Notification Action', url('/'))
                    ->line(__("Gracias por seguir usando nuestra aplicacion de TravelPoinst!"));
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
            'titulo' => __("Tu Solicitud de afiliación del negocio :negocio, ha sido :status", ['negocio' => $this->solicitud->nombre, 'status' => $this->solicitud->getEstatus($this->solicitud->situacion)]),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [$this->solicitud->getMensage($this->solicitud->situacion)],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __("Solicitud"),
            'url' => ['name' => 'socio.negocio.solicitudes.edit','params' => ['id' => $this->solicitud->id]]
        ];
    }
}
