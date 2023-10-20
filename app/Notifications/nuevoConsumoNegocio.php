<?php

namespace App\Notifications;

use App\Models\Venta;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\VonageMessage;

class nuevoConsumoNegocio extends Notification implements ShouldQueue
{
    use Queueable;

    protected $tps = 0;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es',protected Venta $venta)
    {
        $this->tps = \number_format((float) $this->venta->tps_bonificados, 2, ',', '.');
        
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database', 'vonage'];
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
                    ->subject(__("Gracias por tu compra en (:categoria - :negocio)",['categoria' => $this->venta->model->categoria->categoria,'negocio' => $this->venta->model->nombre]))
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("Se te ha registrado un consumo en (:categoria - :negocio), que te ha generado Tp$ :tp en tu cuenta.", ['categoria' => $this->venta->model->categoria->categoria, 'negocio' => $this->venta->model->nombre,'tp' => $this->tps]))
                    ->line(__("Recuerda que los puntos TravelPoints (Tp), puedes utilizarlo para comprar en la tienda travel en el siguiente enlance:"))
                    ->action(__("Tienda Travel Points"),$this->url.'/tienda-travel')
                    ->line(__("Nos gustaría saber qué te pareció tu experiencia, por favor compártela en el siguiente enlace:"))
                    ->action(__("Mis consumos"), url('/consumos'))
                    ->salutation(__("Gracias por seguir usando Travel Points"));
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
            'titulo' => __("Gracias por consumir en :negocio",['negocio' => $this->venta->model->nombre ]),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("Gracias por tu compra en :categoria (:negocio), Has ganado Tp$ :tp Travel Points y ya están en tu cuenta",['categoria' => $this->venta->model->categoria->categoria,'negocio' => $this->venta->model->nombre,'tp' => $this->tps]),__("Nos gustaría saber qué te pareció tu experiencia,por favor compártela en el siguiente enlace:")],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __("Ir a mis Consumos"),
            'url' => ['name' => 'socio.consumos']
        ];
    }

     /**
     * Get the Vonage / SMS representation of the notification.
     */
    public function toVonage(object $notifiable): VonageMessage
    {   
        $url = $this->url.'/consumos';
        $mensaje = __("Gracias por tu compra en (:categoria - :negocio), Has ganado Tp$ :tp Travel Points y ya están en tu cuenta. Nos gustaría saber qué te pareció tu experiencia, por favor compártela en el siguiente enlace: :url",['categoria' => $this->venta->model->categoria->categoria,'negocio' => $this->venta->model->nombre,'tp' => $this->tps,'url' => $url]);

        return (new VonageMessage)
            ->content($mensaje)
            ->unicode();
    }


}
