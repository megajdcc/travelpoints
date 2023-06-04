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
        // return (new newConsumo($this->consumo))
        //     ->to($notifiable->email);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {

        $mensaje = "Si ha comprado productos Digitales, revise en su correo electrónico, la bandeja de entrada y verifique el comprabante de compra, descargue el archivo adjunto asociado; de lo contrario también le hemos enviado la dirección de la tienda para que retires sus productos comprados...";

        if($this->consumo->ordencj){
            $mensaje = 'Los productos físicos, son envíádo a su dirección asociada a su cuenta y que confirmó en la caja antes de pagar. Puedes ver los detalles de la orden de compra en tus consumos.';
        }
        
        return [
            'titulo' => 'Gracias por tu compra',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                "¡Hola {$notifiable->getNombreCompleto()}!",
                "Gracias por tu compra",
                $mensaje
            ],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a mis Consumos',
            'url' => ['name' => 'socio.compras',]
        ];
    }
}
