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
    public function __construct(Protected User $promotor)
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
                ->subject('Te hemos asignado un promotor a tu red de promotores')
                ->greeting("Hola {$notifiable->getNombreCompleto()}! ")
                ->line("Tienes a un nuevo promotor en tu red de promotores; El nuevo promotor es {$this->promotor->getNombreCompleto()}, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación")
                ->line("El nuevo promotor ya te aparece en tu listado de promotores, puedes ir a verlo cuando gustes, por aca de doy el link directo")
                ->action('Ir a mis promotores', url('/promotores'))
                ->salutation('Gracias por usar TravelPoints!');
        }else{
            return (new MailMessage)
                ->subject('Te hemos asignado un Lider')
                ->greeting("Hola {$notifiable->getNombreCompleto()}! ")
                ->line("Ya no estarás solo en esta aventura, te hemos asignado el lider {$this->promotor->lider->getNombreCompleto()}")
                ->line("El nuevo lider te aparecerá en tu tablero principal")
                ->action('Ir a mi tablero', url('/home'))
                ->salutation('Gracias por usar TravelPoints!');
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
                'titulo' => 'Te hemos asignado un promotor a tu red de promotores',
                'avatar' => $this->promotor->getAvatar(),
                'usuario' => $this->promotor->getNombreCompleto(),
                'mensaje' => ["Tienes a un nuevo promotor en tu red de promotores; El nuevo promotor es {$this->promotor->getNombreCompleto()}, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación"],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => 'Mis promotores',
                'url' => ['name' => 'promotores.list',]
            ];
        }else{
            return [
                'titulo' => 'Te hemos asignado un Lider',
                'avatar' => $this->promotor->lider->getAvatar(),
                'usuario' => $this->promotor->lider->getNombreCompleto(),
                'mensaje' => ["Ya no estarás solo en esta aventura, te hemos asignado el lider {$this->promotor->lider->getNombreCompleto()}"],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => 'Mi tablero',
                'url' => ['name' => 'home',]
            ];
        }
       
    }
}
