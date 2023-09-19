<?php

namespace App\Console\Commands;

use App\Jobs\UsabilidadViajeros;
use App\Models\User;
use Illuminate\Console\Command;


class verificarUsabilidadViajeros extends Command
{
    /**
     * Verificar usabilidad del sistema por parte de los viajeros
     *
     * @var string
     */
    protected $signature = 'usuario:verificar-usabilidad-viajeros';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cada cierto tiempo se verific, si el usuario viajero, no tiene actividad, si se cumplen 12 meses sin actividad le quitamos el 10% de TravelPoints';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        UsabilidadViajeros::dispatch(User::whereHas('rol',fn($q) => $q->where('nombre','Viajero')->get()));
    }
}
