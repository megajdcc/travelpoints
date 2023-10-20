<?php

namespace App\Notifications;

use App\Models\Retiro;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificarRetiro extends Notification implements ShouldQueue
{
    use Queueable;



    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es',public Retiro $retiro)
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
        if(in_array($notifiable->rol->nombre,['Administrador','Desarrollador'])){
            return (new MailMessage)
                ->subject(__("Solicitud de Retiro de Comisión"))
                ->greeting(__("Solicitud de Retiro de Comisión"))
                ->line(__("El :rol :usuario",['rol' => $this->retiro->usuario->rol->nombre,'usuario' => $this->retiro->usuario->getNombreCompleto()]))
                ->line(__("Ha solicitado un retiro de comisión; Atiende el mismo en el panel de retiros de comisiones."))
                ->action(__('Retiros de comisiones'), $this->url.'/retiros')
                ->salutation(__('Gracias por usar Travel Points'));
        }
        return (new MailMessage)
            ->subject(__("Solicitud de Retiro de Comisión"))
            ->greeting(__("Tu solicitud de retiro ha sido recibida"))
            ->line(__("Te estaremos informando cuando sea procesado el mismo"))
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
        if(in_array($notifiable->rol->nombre,['Administrador','Desarrollador'])){
            return [
                'titulo' => __("Solicitud de Retiro de Comisión"),
                'avatar' => null,
                'usuario' => null,
                'mensaje' => [__("El :rol :usuario",['rol' => $this->retiro->usuario->rol->nombre,'usuario' => $this->retiro->usuario->getNombreCompleto()]), __("Ha solicitado un retiro de comisión; Atiende el mismo en el panel de retiros de comisiones.")],
                'type' => 'light-primary', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => __('Ir a retiros'),
                'url' => ['name' => 'retiro.list',]
            ];
        }

        return [
            'titulo' => __('Tu solicitud de retiro ha sido recibida'),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [__("Tu solicitud de retiro ha sido recibida, te estaremos informando cuando sea procesado el mismo")],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => __('Ir a mi perfil'),
            'url' => ['name' => 'perfil.editar',]
        ];
    }
}
