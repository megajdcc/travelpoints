<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\VerificarRedPromotores as verificarRed;
class verificarRedPromotores extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuario:verificar-red-promotores';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Se encarga de verificar la red de promotores|lideres|coordinadores.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        verificarRed::dispatch();
    }
}
