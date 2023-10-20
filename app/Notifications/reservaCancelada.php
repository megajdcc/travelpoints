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
    public function __construct(public string $url = 'travelpoints.es',protected Reservacion $reservacion)
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
                    ->subject(__("Reservación cancelada"))
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("Hemos cancelado tu reservación al negocio (:negocio) que tenías activa para el pasado día :dia, por que no se ha registrado tu asistena, por lo que no has acumulado Travel Points.",['negocio' =>$this->reservacion->negocio->nombre,'dia'  => $this->reservacion->getDia()]))
                    ->line(__("Si fuiste y por algún motivo el negocio no registró tu consumo, y deseas que se te registren tus puntos, por favor haznos saber de cuántas personas era tu grupo, y cuanto fue el monto del consumo. Si tuvieras una foto del ticket pagado puedes adjuntarla. Asegúrate de incluir tu usuario o email registrado en tu mensaje, para que nos sea más fácil localizar tu cuenta."))
                    
                    ->action(__("Contacto"), $this->url.'/contact')
                    ->salutation(__("Gracias por seguir usando nuestra aplicación de Travel Points"));
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
            'titulo' => __("Reservación cancelada"),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("Hemos cancelado tu reservación al negocio (:negocio) que tenías activa para el pasado día :dia, por que no se ha registrado tu asistena, por lo que no has acumulado Travel Points.", ['negocio' => $this->reservacion->negocio->nombre, 'dia'  => $this->reservacion->getDia()]), __("Si fuiste y por algún motivo el negocio no registró tu consumo, y deseas que se te registren tus puntos, por favor haznos saber de cuántas personas era tu grupo, y cuanto fue el monto del consumo. Si tuvieras una foto del ticket pagado puedes adjuntarla. Asegúrate de incluir tu usuario o email registrado en tu mensaje, para que nos sea más fácil localizar tu cuenta.")],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __('Ir a contacto'),
            'url' => '/contact'
        ];
    }
}
