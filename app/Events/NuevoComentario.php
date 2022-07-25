<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Comentario;

class NuevoComentario implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(public Comentario $comentario)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('nuevo-comentario-reserva.'.$this->comentario->reserva_id);
    }

    public function broadcastWith()
    {

        $this->comentario->usuario->avatar = $this->comentario->usuario->getAvatar();
        $this->comentario->usuario->rol;

        return [
            'comentario' => $this->comentario,
            'reserva' => $this->comentario->reserva,
            'boda' => $this->comentario->reserva->boda
        ];
    }


}
