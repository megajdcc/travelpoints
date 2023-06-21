<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Sistema;

class NuevoMensaje extends Notification implements ShouldQueue
{
  use Queueable;

  public Sistema $sistema;
  public $datos;

  public $perfiles = ['Viajero','Negocio','No registrado','otro'];
  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct(Sistema $sistema, array $datos)
  {
    $this->sistema = $sistema;
    $this->datos = $datos;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function via($notifiable)
  {
    return ['mail', 'database'];
  }

  /**
   * Get the mail representation of the notification.
   *
   * @param  mixed  $notifiable
   * @return \Illuminate\Notifications\Messages\MailMessage
   */
  public function toMail($notifiable)
  {

    // $bcc = \array_filter($this->sistema->correos, fn ($val) => $val['principal'])[0]['email'];

    return (new MailMessage)
      ->subject('Nuevo mensaje en contacto | ' . $this->datos['asunto'])
      // ->bcc($bcc)
      ->greeting("Hola {$notifiable->getNombreCompleto()}!")
      ->line('Perfil: '.$this->perfiles[$this->datos['perfil'] - 1])
      ->line('Tienes un mensaje desde contacto')
      ->line("El mensaje lo ha enviado {$this->datos['nombre']} y te quiere hacer saber lo siguiente:")
      ->line($this->datos['mensaje'])
      ->line(($this->datos['telefono']) ? "Te ha dejado su número de contacto por si quieres contáctarlo: {$this->datos['telefono']} " : '')
      ->salutation("Gracias por usar nuestra applicación, Equipo - {$this->sistema->nombre}!");
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
      'titulo' => 'Nuevo mensaje en contacto | ' . $this->datos['asunto'],
      'avatar' => null,
      'usuario' => null,
      'mensaje' => ['Tienes un mensaje desde contacto:', "El mensaje lo ha enviado {$this->datos['nombre']} y te quiere hacer saber lo siguiente:", $this->datos['mensaje'], ($this->datos['telefono']) ? "Te ha dejado su número de contacto por si quieres contáctarlo: {$this->datos['telefono']} " : '', 'Perfil:' . $this->perfiles[$this->datos['perfil'] - 1]],
      'type' => 'light-success', // light-info , light-success, light-danger, light-warning
      'btn' => false,
      'btnTitle' => 'Ir a mi perfil',
      'url' => ['name' => 'perfil',]
    ];
  }
}
