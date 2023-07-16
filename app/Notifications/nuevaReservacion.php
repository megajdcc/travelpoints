<?php

namespace App\Notifications;

use App\Models\Negocio\Reservacion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\VonageMessage;

class nuevaReservacion extends Notification implements ShouldQueue
{
    use Queueable;

    protected int $tipoUser = 1; // 1 => Negocio , 2 => Reservante
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Reservacion $reservacion,int $tipoUser = 1)
    {
        $this->tipoUser = $tipoUser;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database','vonage'] ;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {   


        if($this->tipoUser == 1){
            return (new MailMessage)
                ->subject('Nueva reservación en TravelPoints')
                ->greeting("Hola {$notifiable->getNombreCompleto()}")
                ->line("El viajero {$this->reservacion->usuario->getNombreCompleto()} a realizado una reservación a tu negocio ({$this->reservacion->negocio->nombre}), para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.")
                ->line("Y te ha enviado la siguiente observación:{$this->reservacion->observacion}")
                ->line('Puedes ver esta y otras reservaciones en tu panel')
                ->action('Reservaciones', url('/negocios/reservaciones/'))
                ->salutation('Gracias por usar TravelPoints.');
        }else{
            return (new MailMessage)
                ->subject('Reserva realizada con éxito')
                ->greeting("Hola {$notifiable->getNombreCompleto()}")
                ->line("Tienes una reserva en el negocio {$this->reservacion->negocio->nombre}, para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.")
                ->line("Nos has hecho saber la siguiente observación:\"{$this->reservacion->observacion}\"")
                ->line('Si no fuiste tú, por favor avísanos.')
                ->action('Mis reservaciones', url('/socio/reservaciones'))
                ->salutation('Gracias por usar TravelPoints.');
        }
      
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        if ($this->tipoUser == 1) {
            $mensaje = ["Hola {$notifiable->getNombreCompleto()}", "El viajero {$this->reservacion->usuario->getNombreCompleto()} a realizado una reservación a tu negocio ({$this->reservacion->negocio->nombre}), para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.", "Y te ha enviado la siguiente observación:{$this->reservacion->observacion}", 'Puedes ver esta y otras reservaciones en tu panel'];
        } else {

            $mensaje = ["Hola {$notifiable->getNombreCompleto()}", "Tienes una reserva en el negocio {$this->reservacion->negocio->nombre}, para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.", "Nos has hecho saber la siguiente observación:\"{$this->reservacion->observacion}\"",'Si no fuiste tú, por favor avísanos.'];
        }

         return [
            'titulo' => $this->tipoUser == 1 ? 'Reserva Asociada' : 'Nueva Reservación',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => $mensaje,
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => $this->tipoUser == 2 ? 'Mis reservaciones' : 'Reservaciones',
            'url' => ['name' => $this->tipoUser == 2 ? 'socio.reservaciones' : 'negocio.reservaciones']
        ];

    }

    /**
     * Get the Vonage / SMS representation of the notification.
     */
    public function toVonage(object $notifiable): VonageMessage
    {
        $mensaje = "El viajero {$this->reservacion->usuario->getNombreCompleto()} a realizado una reservación a tu negocio ({$this->reservacion->negocio->nombre}), para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.";

        if($this->tipoUser == 2){
            $mensaje = "Reserva realizada con éxito al negocio ({$this->reservacion->negocio->nombre}),para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}. LLega a tiempo y anuncia que vas de Parte de TravelPoints.";
        }

        return (new VonageMessage)
            ->content($mensaje)
            ->unicode();
    }

}
