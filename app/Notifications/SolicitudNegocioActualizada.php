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
                    ->subject("Tu Solicitud de afiliación del negocio {$this->solicitud->nombre}, ha sido {$this->solicitud->getEstatus($this->solicitud->situacion)}")
                    ->greeting("Hola $notifiable->getNombreCompleto()!")
                    ->line($this->solicitud->getMensage($this->solicitud->situacion))
                    // ->action('Notification Action', url('/'))
                    ->line('Gracias por seguir usando nuestra aplicacion de TravelPoinst!');
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
            'titulo' => "Tu Solicitud de afiliación del negocio {$this->solicitud->nombre}, ha sido {$this->solicitud->getEstatus()}",
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [$this->solicitud->getMensage($this->solicitud->situacion)],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Solicitud',
            'url' => ['name' => 'socio.negocio.solicitudes.edit','params' => ['id' => $this->solicitud->id]]
        ];
    }
}
