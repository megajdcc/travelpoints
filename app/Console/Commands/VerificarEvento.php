<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Evento;

class VerificarEvento extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'eventos:verificar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Este comando se utiliza para verificar el status de todos los eventos registrados';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Despachando verificación de eventos activos y desfasado');

        $eventos = Evento::whereIn('status', [1, 3])->get();

        foreach ($eventos as $evento) {
            $evento->establecerEstaus();
        }
        $this->info('Se ha terminado de verificar los eventos');

        return Command::SUCCESS;
    }
}
