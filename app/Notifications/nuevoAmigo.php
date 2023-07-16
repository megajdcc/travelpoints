<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
class nuevoAmigo extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected User $amigo)
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
        return (new MailMessage)
                    ->greeting("Hola {$notifiable->getNombreCompleto()}")
                    ->line("Tu amigo {$this->amigo->getNombreCompleto()}, se ha registrado con tu link de invitación.")
                    ->line('Ahora de todos los consumos que se registren a nombre de tu amigo, te ganarás un porcentaje en puntos Travel Points.')
                    ->line('No hay limite de invitados, puedes invitar a todos tus amigos y familiares y ganar por cada consumo que le registren en los negocios asociados a Travel Points.')
                    ->line('Puedes ver este y todos tus amigos en tu panel de invitados')
                    ->action('Mis invitados', url('/socio/perfil/invitados'))
                    ->salutation('¡Gracias por usar Travel Points!');
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
            'titulo' => 'Nuevo Amigo asociado con tu Link de invitado',
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                "Tu amigo {$this->amigo->getNombreCompleto()}, se ha registrado con tu link de invitación.",
                'Ahora de todos los consumos que se registren a nombre de tu amigo, te ganarás un porcentaje en puntos Travel Points.',
                'No hay limite de invitados, puedes invitar a todos tus amigos y familiares y ganar por cada consumo que le registren en los negocios asociados a Travel Points.',
                'Puedes ver este y todos tus amigos en tu panel de invitados'

            ],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => 'Mis invitados',
            'url' => ['name' => 'misreferidos',]
        ];
    }
}
