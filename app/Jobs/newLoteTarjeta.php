<?php

namespace App\Jobs;

use App\Models\Lote;
use App\Models\Tarjeta;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class newLoteTarjeta implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Create a new job instance.
     *
     * @param  \App\Models\Lote  $lote
     */
    public function __construct(protected Lote $lote)
    {}

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void
    {
        $numero_inicial = $this->lote->numero_inicial;
        $codigo_lada = $this->lote->codigo_lada;

        for ($i = 0; $i < $this->lote->cantidad; $i++) {
            $correlativo = str_pad($numero_inicial, 5, '0', STR_PAD_LEFT);

            $numero_tarjeta = $codigo_lada . $correlativo;

            $success = Tarjeta::create([
                'lote_id' => $this->lote->id,
                'numero' => $numero_tarjeta,
            ]);

            $numero_inicial++;
        }
    }

}
