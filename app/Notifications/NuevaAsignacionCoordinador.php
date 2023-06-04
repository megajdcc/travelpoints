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
    public function __construct(Protected User $lider)
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
                ->subject('Te hemos asignado un Lider a tu red de lideres')
                ->greeting("Hola {$notifiable->getNombreCompleto()}! ")
                ->line("Tienes a un nuevo lider en tu red de lideres; El nuevo lider es {$this->lider->getNombreCompleto()}, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación")
                ->line("El nuevo lider ya te aparece en tu listado de lideres, puedes ir a verlo cuando gustes, por aca de doy el link directo")
                ->action('Ir a mis lideres', url('/lideres'))
                ->salutation('Gracias por usar TravelPoints!');
        } else {
            return (new MailMessage)
                ->subject('Te hemos asignado un Coordinador')
                ->greeting("Hola {$notifiable->getNombreCompleto()}! ")
                ->line("Ya no estarás solo en esta aventura, te hemos asignado el coordinador {$this->lider->coordinador->getNombreCompleto()}")
                ->line("El nuevo coordinador te aparecerá en tu tablero principal")
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
        if ($notifiable->rol->nombre == 'Coordinador') {
            return [
                'titulo' => 'Te hemos asignado un lider a tu red de lideres',
                'avatar' => $this->lider->getAvatar(),
                'usuario' => $this->lider->getNombreCompleto(),
                'mensaje' => ["Tienes a un nuevo lider en tu red de lideres; El nuevo lider es {$this->lider->getNombreCompleto()}, Ayudalo y guialo a cumplir sus metas dentro de travelpoints, y tienes a tu disposición la posibilidad de banearlo si ves que no cumples con las normas dentro de la asociación"],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => 'Mis promotores',
                'url' => ['name' => 'promotores.list',]
            ];
        } else {
            return [
                'titulo' => 'Te hemos asignado un Coordinador',
                'avatar' => $this->lider->coordinador->getAvatar(),
                'usuario' => $this->lider->coordinador->getNombreCompleto(),
                'mensaje' => ["Ya no estarás solo en esta aventura, te hemos asignado al coordinador {$this->lider->coordinador->getNombreCompleto()}"],
                'type' => 'light-success', // light-info , light-success, light-danger, light-warning
                'btn' => true,
                'btnTitle' => 'Mi tablero',
                'url' => ['name' => 'home',]
            ];
        }
       
    }
}
