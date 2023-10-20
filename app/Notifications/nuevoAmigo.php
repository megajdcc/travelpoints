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
    public function __construct(public string $url = 'travelpoints.es',protected User $amigo)
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
                    ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                    ->line(__("Tu amigo :amigo, se ha registrado con tu link de invitación",['amigo' => $this->amigo->getNombreCompleto()]))
                    ->line(__("Ahora de todos los consumos que se registren a nombre de tu amigo, te ganarás un porcentaje en puntos Travel Points"))
                    ->line(__("No hay limite de invitados, puedes invitar a todos tus amigos y familiares y ganar por cada consumo que le registren en los negocios asociados a Travel Points"))
                    ->line(__("Puedes ver este y todos tus amigos en tu panel de invitados"))
                    ->action(__("Mis invitados"), $this->url.'/socio/perfil/invitados')
                    ->salutation(__("Gracias por usar Travel Points!"));
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
            'titulo' => __("Nuevo Amigo asociado con tu Link de invitado"),
            'avatar' => null,
            'usuario' => null,
            'mensaje' => [
                __("Tu amigo :amigo, se ha registrado con tu link de invitación", ['amigo' => $this->amigo->getNombreCompleto()]),
                __("Ahora de todos los consumos que se registren a nombre de tu amigo, te ganarás un porcentaje en puntos Travel Points"),
                __("No hay limite de invitados, puedes invitar a todos tus amigos y familiares y ganar por cada consumo que le registren en los negocios asociados a Travel Points"),
                __("Puedes ver este y todos tus amigos en tu panel de invitados")

            ],
            'type' => 'light-success', // light-info , light-success, light-danger, light-warning
            'btn' => true,
            'btnTitle' => __('Mis invitados'),
            'url' => ['name' => 'misreferidos',]
        ];
    }
}
