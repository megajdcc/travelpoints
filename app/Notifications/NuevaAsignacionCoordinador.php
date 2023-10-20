<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NuevaAsignacionCoordinador extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es', protected User $lider)
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
        if ($notifiable->rol->nombre == 'Coordinador') {
            return (new MailMessage)
                ->subject(__('Te hemos asignado un Lider a tu red de lideres'))
                ->greeting(__('Hola :nombre',['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Tienes a un nuevo lider en tu red de lideres; El nuevo lider es :lider, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación",['lider' => $this->lider->getNombreCompleto()]))
                ->line(__("El nuevo lider ya te aparece en tu listado de lideres, puedes ir a verlo cuando gustes, por aca de doy el link directo"))
                ->action(__('Ir a mis lideres'), $this->url.'/lideres')
                ->salutation(__('Gracias por usar Travel Points'));
        } else {
            return (new MailMessage)
                ->subject(__('Te hemos asignado un Coordinador'))
                ->greeting(__('Hola :nombre', ['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Ya no estarás solo en esta aventura, te hemos asignado el coordinador :coordinador",['coordinador' => $this->lider->coordinador->getNombreCompleto()]))
                ->line(__("El nuevo coordinador te aparecerá en tu tablero principal"))
                ->action(__('Ir a mi tablero'), $this->url.'/home')
                ->salutation(__('Gracias por usar Travel Points'));
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
        if ($notifiable->rol->nombre == 'Coordinador') {
            return [
                'titulo' => __('Te hemos asignado un Lider a tu red de lideres'),
                'avatar' => $this->lider->getAvatar(),
                'usuario' => $this->lider->getNombreCompleto(),
                'mensaje' => [__("Tienes a un nuevo lider en tu red de lideres; El nuevo lider es :lider, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación", ['lider' => $this->lider->getNombreCompleto()])],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => __('Mis promotores'),
                'url' => ['name' => 'promotores.list',]
            ];
        } else {
            return [
                'titulo' => __('Te hemos asignado un Coordinador'),
                'avatar' => $this->lider->coordinador->getAvatar(),
                'usuario' => $this->lider->coordinador->getNombreCompleto(),
                'mensaje' => [__("Ya no estarás solo en esta aventura, te hemos asignado el coordinador :coordinador", ['coordinador' => $this->lider->coordinador->getNombreCompleto()])],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => __('Mi tablero'),
                'url' => ['name' => 'home',]
            ];
        }
       
    }
}
