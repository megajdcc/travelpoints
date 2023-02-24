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
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        if($this->consumo->productos->first()->archivo){
            return $this->markdown('emails.newconsumo')

            ->attachFromStorageDisk('archivo_productos', $this->consumo->productos->first()->archivo ?: null)
            ->subject("Gracias por tu compra" . $this->consumo->cliente->getNombreCompleto())
                ->with([
                    'cliente' => $this->consumo->cliente->getNombreCompleto(),
                    'productos' => $this->consumo->productos,
                    'consumo' => $this->consumo,
                    'tienda' => $this->consumo->tienda
                ]);
        }else{
            return $this->markdown('emails.newconsumo')
                ->subject("Gracias por tu compra" . $this->consumo->cliente->getNombreCompleto())
                ->with([
                    'cliente' => $this->consumo->cliente->getNombreCompleto(),
                    'productos' => $this->consumo->productos,
                    'consumo' => $this->consumo,
                    'tienda' => $this->consumo->tienda
                ]);
        }   
        
    }
}
