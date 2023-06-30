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
        return $this->tipoUser == 1 ? ['mail','database','vonage'] : ['mail','database'];
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
                ->line("Hemos asociado a tu cuenta una reservación al negocio {$this->reservacion->negocio->nombre}, para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.")
                ->line("Y nos has hecho saber la siguiente observación:{$this->reservacion->observacion}")
                ->line('Si tu no has realizado está acción, te invitamos a que no los haga saber, de igual modo que sepas que puedes entrar a tu cuenta y usted mismo cancelar la reservación')
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

            $mensaje = ["Hola {$notifiable->getNombreCompleto()}", "Hemos asociado a tu cuenta una reservación al negocio {$this->reservacion->negocio->nombre}, para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.", "Y nos has hecho saber la siguiente observación:{$this->reservacion->observacion}", 'Si tu no has realizado está acción, te invitamos a que no los haga saber, de igual modo que sepas que puedes entrar a tu cuenta y usted mismo cancelar la reservación'];
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
        return (new VonageMessage)
            ->content("El viajero {$this->reservacion->usuario->getNombreCompleto()} a realizado una reservación a tu negocio ({$this->reservacion->negocio->nombre}), para el día {$this->reservacion->getDia()}, para {$this->reservacion->getPersonas()}.")
            ->unicode();
    }

}
