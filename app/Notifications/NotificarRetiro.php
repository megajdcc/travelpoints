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
    public function __construct(public Retiro $retiro)
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
                ->subject("Solicitud de Retiro de Comisión.")
                ->greeting("Solicitud de Retiro de Comisión.")
                ->line("El {$this->retiro->usuario->rol->nombre} {$this->retiro->usuario->getNombreCompleto()}")
                ->line("Ha solicitado un retiro de comisión; Atiende el mismo en el panel de retiros de comisiones.")
                ->action('Retiros de comisiones', url('/retiros'))
                ->salutation('Gracias por Seguir usando TravelPoints!');
        }
        return (new MailMessage)
            ->subject("Solicitud de Retiro de Comisión.")
            ->greeting("Tu solicitud de retiro ha sido recibida")
            ->line("Te estaremos informando cuando sea procesado el mismo.")
            ->salutation('Gracias por Seguir usando TravelPoints!');

       
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
                'titulo' => 'Solicitud de Retiro de Comisión.',
                'avatar' => null,
                'usuario' => null,
                'mensaje' => ["El {$this->retiro->usuario->rol->nombre} {$this->retiro->usuario->getNombreCompleto()}", "Ha solicitado un retiro de comisión; Atiende el mismo en el panel de retiros de comisiones."],
                'type' => 'light-primary', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => 'Ir a retiros',
                'url' => ['name' => 'retiro.list',]
            ];
        }

        return [
            'titulo' => 'Tu solicitud de retiro ha sido recibida',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["Tu solicitud de retiro ha sido recibida, te estaremos informando cuando sea procesado el mismo."],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => 'Ir a mi perfil',
            'url' => ['name' => 'perfil.editar',]
        ];
    }
}
