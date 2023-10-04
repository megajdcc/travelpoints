<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Sistema;
use Illuminate\Notifications\Messages\VonageMessage;
class NuevoMensaje extends Notification implements ShouldQueue
{
  use Queueable;

  public Sistema $sistema;
  public $datos;

  public $perfiles = [];
  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct(Sistema $sistema, array $datos)
  { 
    $this->perfiles = [__('Viajero'), __("Negocio"), __('No registrado'), __('otro')];
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

      ->subject(__('Nuevo mensaje en contacto | :asunto',['asunto' => $this->datos['asunto']]))
      ->greeting(__("Hola :nombre",['nombre' => $notifiable->getNombreCompleto()]))
      ->line(__("Perfil: :perfil",['perfil' => $this->perfiles[$this->datos['perfil'] - 1]]))
      ->line(__("Tienes un mensaje desde contacto"))
      ->line(__("El mensaje lo ha enviado :nombre y te quiere hacer saber lo siguiente:",['nombre' => $this->datos['nombre']]))
      ->line($this->datos['mensaje'])
      ->line(($this->datos['telefono']) ? __("Te ha dejado su número de contacto por si quieres contáctarlo: :telefono",['telefono' => $this->datos['telefono']]) : '')
      ->salutation(__("Gracias por usar nuestra applicación, Equipo - :sistema",['sistema' => $this->sistema->nombre ]));
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
      'titulo' => __('Nuevo mensaje en contacto | :asunto', ['asunto' => $this->datos['asunto']]),
      'avatar' => null,
      'usuario' => null,
      'mensaje' => [__("Tienes un mensaje desde contacto"), 
                    __("El mensaje lo ha enviado :contacto y te quiere hacer saber lo siguiente:",['contacto' => $this->datos['nombre']]), 
                    $this->datos['mensaje'], 
                    ($this->datos['telefono']) ? __("Te ha dejado su número de contacto por si quieres contáctarlo: :telefono",['telefono' => $this->datos['telefono']]) : '', 
                    __("Perfil: :perfil",['perfil' => $this->perfiles[$this->datos['perfil'] - 1]])
                  ],
      'type' => 'light-success', // light-info , light-success, light-danger, light-warning
      'btn' => false,
      'btnTitle' => __("Ir a mi perfil"),
      'url' => ['name' => 'perfil',]
    ];
  }


  /**
   * Get the Vonage / SMS representation of the notification.
   */
  public function toVonage(object $notifiable): VonageMessage
  {
    return (new VonageMessage)
      ->content('Nuevo mensaje prueba Jhonatan...');
  }


}
