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
    public function __construct(public string $url = 'travelpoints.es',protected Consumo $consumo)
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
                ->subject(__("Se ha cancelado la orden de compra"))
                ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Se ha cancelado su compra con el número de orden :orden, por un monto de :monto",['orden' => $this->consumo->ordencj,'monto' => $this->consumo->total]))
                ->line(__("El monto pagado por el producto se ha reembolsado en tps a su billetera"))
                ->line(__("Si ha pagado un monto por el envío del mismo a traves de paypal, ya hemos generado la orden de reintegro a su cuenta de donde ha pagado la misma, debe acreditarse en los próximos días, si ve que pasan mas de dos semana, comuniquese con nosotros explicando su problema."))
                ->action(__('Ir a mis consumos'), $this->url.'/socio/compras')
                ->salutation(__("Gracias por seguir usando Travel Points!"));

        }else{
            return (new MailMessage)
                ->subject(__("Se ha cancelado la orden de compra"))
                ->greeting(__("Hola :nombre", ['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Se ha cancelado una compra con el número de orden :orden, por un monto de :monto",['orden' => $this->consumo->ordencj,'monto' => $this->consumo->total]))
                ->line(__("El monto pagado por el producto se ha reembolsado en tps a la billetera del cliente :cliente",['cliente' => $this->consumo->cliente->getNombreCompleto()]))
                ->line($this->consumo->monto_envio ? __("El monto del envío fue pagado por Paypal, el número de control en Paypal es: :control, procede a entrar en la plataforma de paypal y reembolsa el mismo",['control' => $this->consumo->paypal_id]) : __("No hay costo por concepto de envios, no es necesario hacer mas devoluciones"))
                ->action(__("Ir a ventas"), $this->url.'/productos/ventas/')
                ->salutation(__("Gracias por seguir usando Travel Points!"));
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
