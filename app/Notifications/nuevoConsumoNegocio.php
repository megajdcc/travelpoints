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
    public function __construct(protected Venta $venta)
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
                    ->subject("Gracias por tu compra en ({$this->venta->model->categoria->categoria} - {$this->venta->model->nombre})")
                    ->greeting("¡Hola {$notifiable->getNombreCompleto()}!")
                    ->line("Se te ha registrado un consumo en ({$this->venta->model->categoria->categoria} - {$this->venta->model->nombre}), que te ha generado Tp$ {$this->tps} en tu cuenta.")
                    ->line("Recuerda que los puntos TravelPoints (Tp), puedes utilizarlo para comprar en la tienda travel en el siguiente enlance:")
                    ->action('Tienda TravelPoints', url('/tienda-travel'))
                    ->line("Nos gustaría saber qué te pareció tu experiencia, por favor compártela en el siguiente enlace:")
                    ->action('Mis consumos', url('/consumos'))
                    ->salutation('¡Gracias por seguir usando TravelPoints!');
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
            'titulo' => "Gracias por consumir en {$this->venta->model->nombre}",
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["Gracias por tu compra en {$this->venta->model->categoria->categoria} ({$this->venta->model->nombre}), Has ganado Tp$ {$this->tps} Travel Points y ya están en tu cuenta", "Nos gustaría saber qué te pareció tu experiencia,por favor compártela en el siguiente enlace:"],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Ir a mis Consumos',
            'url' => ['name' => 'socio.consumos']
        ];
    }

     /**
     * Get the Vonage / SMS representation of the notification.
     */
    public function toVonage(object $notifiable): VonageMessage
    {   
        $url = url('/consumos');
        $mensaje = "Gracias por tu compra en ({$this->venta->model->categoria->categoria} - {$this->venta->model->nombre}), Has ganado Tp$ {$this->tps} Travel Points y ya están en tu cuenta. Nos gustaría saber qué te pareció tu experiencia, por favor compártela en el siguiente enlace: {$url}";

        return (new VonageMessage)
            ->content($mensaje)
            ->unicode();
    }


}
