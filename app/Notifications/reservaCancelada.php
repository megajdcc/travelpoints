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
                    ->line("Hemos cancelado tu reservación al negocio ({$this->reservacion->negocio->nombre}) que tenías activa para el pasado día {$this->reservacion->getDia()}, por que no se ha registrado tu asistena, por lo que no has acumulado Travel Points.")
                    ->line('Si fuiste y por algún motivo el negocio no registró tu consumo, y deseas que se te registren tus puntos, por favor haznos saber de cuántas personas era tu grupo, y cuanto fue el monto del consumo. Si tuvieras una foto del ticket pagado puedes adjuntarla. Asegúrate de incluir tu usuario o email registrado en tu mensaje, para que nos sea más fácil localizar tu cuenta.')
                    
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
            'mensaje' => ["Hemos cancelado tu reservación al negocio ({$this->reservacion->negocio->nombre}) que tenías activa para el pasado día {$this->reservacion->getDia()}, por que no se ha registrado tu asistena, por lo que no has acumulado Travel Points.", 'Si fuiste y por algún motivo el negocio no registró tu consumo, y deseas que se te registren tus puntos, por favor haznos saber de cuántas personas era tu grupo, y cuanto fue el monto del consumo. Si tuvieras una foto del ticket pagado puedes adjuntarla. Asegúrate de incluir tu usuario o email registrado en tu mensaje, para que nos sea más fácil localizar tu cuenta.'],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a contacto',
            'url' => '/contact'
        ];
    }
}
