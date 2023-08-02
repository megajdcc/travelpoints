<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\EstablecerNivel as verificarNivel;

class establecerNivel extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuario:establecer-nivel {--ut|user-type=promotor}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Establecerá los distinto niveles a los promotores, lideres y Coordinadores';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {   
        $option = $this->option('user-type');


        $this->info('Despachando verificación de nivel para todos los usuarios');
        verificarNivel::dispatch($option); 

        return Command::SUCCESS;
    }
}
