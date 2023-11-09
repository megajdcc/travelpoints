<?php

namespace App\Console\Commands;

use App\Jobs\VerificarNivelViajero as JobsVerificarNivelViajero;
use Illuminate\Console\Command;

class VerificarNivelViajero extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuario:verificar-nivel-viajero';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Este comando se utiliza para desencadenar el trabajo de verificacion de nivel del viajero';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->comment('Se ha desencadenado el trabajo de verificación');
        JobsVerificarNivelViajero::dispatch();
        $this->comment('Se ha despachado con éxito el trabajo');

    }
}
