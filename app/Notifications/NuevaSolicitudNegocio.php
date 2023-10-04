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
        ->subject(__('Nueva solicitud de afiliación de negocio'))
        ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("El socio :socio, ha solicitado afiliar su Negocio :negocio",['socio' => $this->solicitud->usuario->getNombreCompleto(),'negocio' => $this->solicitud->nombre]))
                    ->line(__("El negocio se encuentra en la categoría :categoria",['categoria' => $this->solicitud->categoria->categoria]))
                    ->line(__("Puedes revisar con detenimiento los detalles del negocio en el panel de solicitudes"))
                    ->action(__("Solicitudes"), url('/negocios/solicitudes'))
                    ->salutation(__("Gracias por usar nuestra Aplicación!"));
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
            'titulo' => __('Nueva solicitud de afiliación de negocio'),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("El socio :socio, ha solicitado afiliar su Negocio :negocio", ['socio' => $this->solicitud->usuario->getNombreCompleto(), 'negocio' => $this->solicitud->nombre]), __("El negocio se encuentra en la categoría :categoria", ['categoria' => $this->solicitud->categoria->categoria]), __("Puedes revisar con detenimiento los detalles del negocio en el panel de solicitudes")],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __("Solicitud"),
            'url' => ['name' => 'negocio.solicitud.show','params'=>['id' => $this->solicitud->id]]
        ];
    }
}
