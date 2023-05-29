<?php

namespace App\Notifications;

use App\Models\Consumo;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrdenCancelada extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Consumo $consumo)
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
       

        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $rol = $notifiable->rol->nombre;

        if($rol == 'Viajero'){

            return (new MailMessage)
                ->subject('Se ha cancelado la orden de compra')
                ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                ->line("Se ha cancelado su compra con el número de orden {$this->consumo->ordencj}, por un monto de {$this->consumo->total}")
                ->line("El monto pagado por el producto se ha reembolsado en tps a su billetera")
                ->line('Si ha pagado un monto por el envío del mismo a traves de paypal, ya hemos generado la orden de reintegro a su cuenta de donde ha pagado la misma, debe acreditarse en los próximos días, si ve que pasan mas de dos semana, comuniquese con nosotros explicando su problema.')
                ->action('Ir a mis consumos', url('/socio/compras'))
                ->salutation('¡Gracias por seguir usando TravelPoints!');

        }else{
            return (new MailMessage)
                ->subject('Se ha cancelado la orden de compra')
                ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                ->line("Se ha cancelado una compra con el número de orden {$this->consumo->ordencj}, por un monto de {$this->consumo->total}")
                ->line("El monto pagado por el producto se ha reembolsado en tps a la billetera del cliente {$this->consumo->cliente->getNombreCompleto()}")
                ->line($this->consumo->monto_envio ? "El monto del envío fue pagado por Paypal, el número de control en Paypal es: {$this->consumo->paypal_id}, procede a entrar en la plataforma de paypal y reembolsa el mismo" : 'No hay costo por concepto de envios, no es necesario hacer mas devoluciones')
                ->action('Ir a ventas', url('/productos/ventas/'))
                ->salutation('¡Gracias por seguir usando TravelPoints!');
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
        $rol = $notifiable->rol->nombre;

        return [
            //
        ];
    }
}
