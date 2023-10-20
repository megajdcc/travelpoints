<?php

namespace App\Notifications;

use App\Models\Venta;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class consumoInvitado extends Notification implements ShouldQueue
{
    use Queueable;

    protected $comision = 0;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es', protected Venta $venta, $comision)
    {
        $this->comision = $comision;
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
                    ->subject(__("Tú invitado :invitado, ha realizado un consumo.",['invitado' => $this->venta->cliente->getNombreCompleto()]))
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("Tú invitado :invitado, ha realizado un consumo en el negocio :negocio, lo cual te ha generado una comisión en tps por un monto Tp$ :tp",['invitado' => $this->venta->cliente->getNombreCompleto(),'negocio' => $this->venta->model->nombre,'tp' => $this->comision]))
                    ->line(__("Recuerda que puedes invitar a mas amigos y familiares, compartiendo tu link de invitados en la cual podrán registrarse y ser tus invitados dentro de Travel Points."))
                    ->line(__("Este es tu link de invitado, :link",['link' => $this->url."/register/{$notifiable->codigo_referidor}" ]))
                    ->line(__('Te hemos generado un movimiento en tu cuenta por la comisión obtenida, puedes ver este y todos tus movimientos en el siguiente enlace'))
                    ->action(__('Mis Movimientos'), $this->url.'/socio/perfil/mi-cuenta')
                    ->salutation(__('Gracias por usar Travel Points'));
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
            'titulo' => __("Tú invitado :invitado, ha realizado un consumo.", ['invitado' => $this->venta->cliente->getNombreCompleto()]),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                __("Tú invitado :invitado, ha realizado un consumo en el negocio :negocio, lo cual te ha generado una comisión en tps por un monto Tp$ :tp", ['invitado' => $this->venta->cliente->getNombreCompleto(), 'negocio' => $this->venta->model->nombre, 'tp' => $this->comision]),
                __("Recuerda que puedes invitar a mas amigos y familiares, compartiendo tu link de invitados en la cual podrán registrarse y ser tus invitados dentro de Travel Points."),
                __("Este es tu link de invitado, :link", ['link' => $this->url."/register/{$notifiable->codigo_referidor}"]),
                __('Te hemos generado un movimiento en tu cuenta por la comisión obtenida, puedes ver este y todos tus movimientos en el siguiente enlace'),


            ],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __('Mis movimientos'),
            'url' => ['name' => 'micuenta',]
        ];
    }
}
