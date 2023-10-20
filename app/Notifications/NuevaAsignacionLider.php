<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NuevaAsignacionLider extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public string $url = 'travelpoints.es', protected User $promotor)
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

        if($notifiable->rol->nombre == 'Lider'){
            return (new MailMessage)
                ->subject(__('Te hemos asignado un promotor a tu red de promotores'))
                ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Tienes a un nuevo promotor en tu red de promotores; El nuevo promotor es :promotor, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación",['promotor' => $this->promotor->getNombreCompleto()]))
                ->line(__("El nuevo promotor ya te aparece en tu listado de promotores, puedes ir a verlo cuando gustes, por aca de doy el link directo"))
                ->action(__("Ir a mis promotores"),$this->url.'/promotores')
                ->salutation(__('¡Gracias por preferirnos Travel Points!'));
        }else{
            return (new MailMessage)
                ->subject(__('Te hemos asignado un Lider'))
                ->greeting(__("Hola :nombre", ['nombre' => $notifiable->getNombreCompleto()]))
                ->line(__("Ya no estarás solo en esta aventura, te hemos asignado el lider :lider",['lider' => $this->promotor->lider->getNombreCompleto()]))
                ->line(__("El nuevo lider te aparecerá en tu tablero principal"))
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
        if($notifiable->rol->nombre == 'Lider'){
            return [
                'titulo' => __('Te hemos asignado un promotor a tu red de promotores'),
                'avatar' => $this->promotor->getAvatar(),
                'usuario' => $this->promotor->getNombreCompleto(),
                'mensaje' => [__("Tienes a un nuevo promotor en tu red de promotores; El nuevo promotor es :promotor, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación", ['promotor' => $this->promotor->getNombreCompleto()])],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => __('Mis promotores'),
                'url' => ['name' => 'promotores.list',]
            ];
        }else{
            return [
                'titulo' => __('Te hemos asignado un Lider'),
                'avatar' => $this->promotor->lider->getAvatar(),
                'usuario' => $this->promotor->lider->getNombreCompleto(),
                'mensaje' => [__("Ya no estarás solo en esta aventura, te hemos asignado el lider :lider", ['lider' => $this->promotor->lider->getNombreCompleto()])],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => __('Mi tablero'),
                'url' => ['name' => 'home',]
            ];
        }
       
    }
}
