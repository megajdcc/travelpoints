<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Consumo;

// use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Attachment;
class NuevoConsumo extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected Consumo $consumo;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Consumo $consumo)
    {
        $this->consumo = $consumo;

    }

    /**
     * Get the attachments for the message.
     *
     */
    public function attachments(){


        return [
            $this->consumo->productos->first()->tipo_producto == 2 ?  
            Attachment::fromStorageDisk('archivo_productos',$this->consumo->productos->first()->archivo) 
            : null
        ];

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.newconsumo')
        ->subject("Gracias por tu compra" . $this->consumo->cliente->getNombreCompleto())
        
            ->with([
                'cliente' => $this->consumo->cliente->getNombreCompleto(),
                'productos' => $this->consumo->productos,
                'consumo' => $this->consumo,
            ]);
    }
}
