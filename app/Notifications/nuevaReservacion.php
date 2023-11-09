<?php

namespace App\Notifications;

use App\Models\Negocio\Reservacion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;

class nuevaReservacion extends Notification implements ShouldQueue
{
    use Queueable;

    protected int $tipoUser = 1; // 1 => Negocio , 2 => Reservante
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es',protected Reservacion $reservacion,int $tipoUser = 1)
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
                ->subject(__('Nueva reservación en Travel Points'))
                ->greeting(__('Hola :nombre',['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("El viajero :viajero a realizado una reservación a tu negocio (:negocio), para el día :dia, para :personas",
                ['viajero' => $this->reservacion->usuario->getNombreCompleto(),
                'negocio' =>$this->reservacion->negocio->nombre,
                'dia' => $this->reservacion->getDia(),
                'personas' => $this->reservacion->getPersonas()]))
                ->line(__("Y te ha enviado la siguiente observación: :observacion",['observacion' => $this->reservacion->observacion]))
                ->line(__('Puedes ver esta y otras reservaciones en tu panel'))
                ->action(__('Reservaciones'), $this->url.'/negocios/reservaciones/')
                ->salutation(__('Gracias por usar Travel Points'));
        }else{
            return (new MailMessage)
                ->subject(__('Reserva realizada con éxito'))
                ->greeting(__('Hola :nombre',['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Tienes una reserva en el negocio :negocio , para el día :dia, para :personas",['negocio' => $this->reservacion->negocio->nombre,'dia' => $this->reservacion->getDia(),'personas' => $this->reservacion->getPersonas()]))
                ->line(__("Nos has hecho saber la siguiente observación: :observacion",['observacion' => $this->reservacion->observacion ]))
                ->line(__("Si no fuiste tú, por favor avísanos"))
                ->action(__('Mis reservaciones'), $this->url.'/socio/reservaciones')
                ->salutation(__('Gracias por usar Travel Points'));
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
            $mensaje = [__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]),
            __("El viajero :viajero a realizado una reservación a tu negocio (:negocio), para el día :dia, para :personas",['viajero' => $this->reservacion->usuario->getNombreCompleto(),'negocio' => $this->reservacion->negocio->nombre,'dia' => $this->reservacion->getDia(),'personas' => $this->reservacion->getPersonas()]),__("Y te ha enviado la siguiente observación: :observacion",['observacion' => $this->reservacion->observacion]), __('Puedes ver esta y otras reservaciones en tu panel')];
        } else {

            $mensaje = [__("Hola :nombre", ['nombre' => $notifiable->getNombreCompleto()]), __("Tienes una reserva en el negocio :negocio , para el día :dia, para :personas", ['negocio' => $this->reservacion->negocio->nombre, 'dia' => $this->reservacion->getDia(), 'personas' => $this->reservacion->getPersonas()]), __("Nos has hecho saber la siguiente observación: :observacion", ['observacion' => $this->reservacion->observacion]), __("Si no fuiste tú, por favor avísanos")];
        }

         return [
            'titulo' => $this->tipoUser == 1 ? __('Reserva Asociada') : __('Nueva Reservación'),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => $mensaje,
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => $this->tipoUser == 2 ? __('Mis reservaciones') : __('Reservaciones'),
            'url' => ['name' => $this->tipoUser == 2 ? 'socio.reservaciones' : 'negocio.reservaciones']
        ];

    }

    /**
     * Get the Vonage / SMS representation of the notification.
     */
    public function toVonage(object $notifiable): VonageMessage
    {
        $mensaje = __("El viajero :viajero a realizado una reservación a tu negocio (:negocio), para el día :dia, para :personas",['viajero' => $this->reservacion->usuario->getNombreCompleto(),'negocio' => $this->reservacion->negocio->nombre,'dia' => $this->reservacion->getDia(),'personas' => $this->reservacion->getPersonas()]);

        if($this->tipoUser == 2){
            $mensaje = __("Reserva realizada con éxito al negocio (:negocio),para el día :dia, para :personas. LLega a tiempo y anuncia que vas de Parte de TravelPoints",['negocio' => $this->reservacion->negocio->nombre,'dia' => $this->reservacion->getDia(),'personas' => $this->reservacion->getPersonas()]);
        }

        return (new VonageMessage)
            ->content($mensaje)
            ->unicode();
    }

}
