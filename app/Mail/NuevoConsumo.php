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
    public function __construct(Consumo $consumo,public string $url = 'travelpoints.es',)
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

        $mensaje = "Si ha comprado productos Digitales, revise en su correo electrónico, la bandeja de entrada y verifique el comprabante de compra, descargue el archivo adjunto asociado; de lo contrario también le hemos enviado la dirección de la tienda para que retires sus productos comprados...";

        if ($this->consumo->ordencj) {
            $mensaje = 'Los productos físicos, son envíádo a su dirección asociada a su cuenta y que confirmó en la caja antes de pagar. Puedes ver los detalles de la orden de compra en tus consumos.';
        }

        
        if($this->consumo->productos->first()->archivo){
            return $this->markdown('emails.newconsumo')

            ->attachFromStorageDisk('archivo_productos', $this->consumo->productos->first()->archivo ?: null)
            ->subject("Gracias por tu compra " . $this->consumo->cliente->getNombreCompleto())
                ->with([
                    'cliente' => $this->consumo->cliente->getNombreCompleto(),
                    'productos' => $this->consumo->productos,
                    'consumo' => $this->consumo,
                    'tienda' => $this->consumo->tienda,
                    'mensaje' => $mensaje

                ]);
        }else{
            return $this->markdown('emails.newconsumo')
                ->subject("Gracias por tu compra " . $this->consumo->cliente->getNombreCompleto())
                ->with([
                    'cliente' => $this->consumo->cliente->getNombreCompleto(),
                    'productos' => $this->consumo->productos,
                    'consumo' => $this->consumo,
                    'tienda' => $this->consumo->tienda,
                    'mensaje' => $mensaje
                ]);
        }   
        
    }
}
