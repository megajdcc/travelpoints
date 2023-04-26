<?php

namespace App\Notifications;

use App\Models\Retiro;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RetiroUpdateStatus extends Notification implements ShouldQueue
{
    use Queueable;


    protected $mensajes = [
        2 => 'Su retiro de comisión se encuentra en proceso',
        3 => 'Su retiro de comisión se ha procesado con éxito',
        4 => 'Su retiro se ha rechazado, Comuniquese con soporte'
    ];

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Protected Retiro $retiro)
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
        return ['mail','Database'];
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
        ->subject($this->mensajes[$this->retiro->status])
                    ->greeting("Hola {$this->retiro->usuario->getNombreCompleto()}!")
                    ->line($this->mensajes[$this->retiro->status])
                    ->line('Gracias por usar nuestra Applicación de TravelPoints!');
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
            'titulo' => 'Cambio en el estado de la solicitud de Retiro de comisión',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [$this->mensajes[$this->retiro->status]],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => 'Ir a mi perfil',
            'url' => ['name' => 'perfil.editar',]
        ];
    }
}
