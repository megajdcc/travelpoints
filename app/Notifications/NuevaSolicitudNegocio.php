<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Negocio\Solicitud;

class NuevaSolicitudNegocio extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Solicitud $solicitud)
    {
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
        ->subject('Nueva solicitud de afiliación de negocio')
        ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                    ->line("El socio {$this->solicitud->usuario->getNombreCompleto()}, ha solicitado afiliar su Negocio {$this->solicitud->nombre}.")
                    ->line("El negocio se encuentra en la categoría {$this->solicitud->categoria->categoria}.")
                    ->line('Puedes revisar con detenimiento los detalles del negocio en el panel de solicitudes.')
                    ->action('Solicitudes', url('/negocios/solicitudes'))
                    ->salutation('Gracias por usar nuestra Aplicación!');
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
            'titulo' => 'Nueva solicitud de afiliación de negocio',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["El socio {$this->solicitud->usuario->getNombreCompleto()}, ha solicitado afiliar su Negocio {$this->solicitud->nombre}.","El negocio se encuentra en la categoría {$this->solicitud->categoria->categoria}.", 'Puedes revisar con detenimiento los detalles del negocio en el panel de solicitudes.'],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Solicitud',
            'url' => ['name' => 'negocio.solicitud.show','params'=>['id' => $this->solicitud->id]]
        ];
    }
}
