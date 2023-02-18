<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Consumo;
use App\Mail\NuevoConsumo as newConsumo;

class NuevoConsumo extends Notification implements ShouldQueue
{
    use Queueable;

    protected Consumo $consumo;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Consumo $consumo)
    {
        $this->consumo = $consumo;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new newConsumo($this->consumo))
            ->to($notifiable->email);
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
            'titulo' => 'Gracias por tu compra',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                "¡Hola {$notifiable->getNombreCompleto()}!",
                "Gracias por tu compra de {$this->consumo->productos->first()->nombre}.",
                $this->consumo->productos->first()->tipo_producto == 2 ? "Te hemos enviado al correo el archivo asociado a tu compra, Dirigete a la Bandeja de correo en archivos Adjunto y descarga." : "Puedes Retirar el producto en nuestras tiendas Travel, la que te quede mas cercana."
            ],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a mis Consumos',
            'url' => ['name' => 'socio.consumos',]
        ];
    }
}
