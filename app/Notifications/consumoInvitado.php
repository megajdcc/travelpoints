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
    public function __construct(protected Venta $venta, $comision)
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
                    ->subject("Tú invitado {$this->venta->cliente->getNombreCompleto()}, ha realizado un consumo.")
                    ->greeting("Hola {$notifiable->getNombreCompleto()}")
                    ->line("Tú invitado {$this->venta->cliente->getNombreCompleto()}, ha realizado un consumo en el negocio {$this->venta->model->nombre}, lo cual te ha generado una comisión en tps por un monto Tp$ {$this->comision}")
                    ->line('Recuerda que puedes invitar a mas amigos y familiares, compartiendo tu link de invitados en la cual podrán registrarse y ser tus invitados dentro de Travel Points.')
                    ->line("Este es tu link de invitado:".url("/register/{$notifiable->codigo_referidor}"))
                    ->line('Te hemos generado un movimiento en tu cuenta por la comisión obtenida, puedes ver este y todos tus movimientos en el siguiente enlace')
                    ->action('Mis Movimientos', url('/socio/perfil/mi-cuenta'))
                    ->salutation('Gracias por usar Travel Points');
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
            'titulo' => "Tú invitado {$this->venta->cliente->getNombreCompleto()}, ha realizado un consumo.",
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                "Tú invitado {$this->venta->cliente->getNombreCompleto()}, ha realizado un consumo en el negocio {$this->venta->model->nombre}, lo cual te ha generado una comisión en tps por un monto Tp$ {$this->comision}",
                'Recuerda que puedes invitar a mas amigos y familiares, compartiendo tu link de invitados en la cual podrán registrarse y ser tus invitados dentro de Travel Points.',
                "Este es tu link de invitado:" . url("/register/{$notifiable->codigo_referidor}"),
                'Te hemos generado un movimiento en tu cuenta por la comisión obtenida, puedes ver este y todos tus movimientos en el siguiente enlace',


            ],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Mis movimientos',
            'url' => ['name' => 'micuenta',]
        ];
    }
}
