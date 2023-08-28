<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;

class aperturarCuenta extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuario:aperturar-cuenta {--ut|user-type=Promotor}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verifica que los usuario tenga cuenta aperturada, si no, se las creamo';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $option = $this->option('user-type');

        $usuarios  = User::whereHas('rol',fn($q) => $q->where('nombre',$option))->get();

        $usuarios->each(fn($user) => $user->crearCuentaSiNoExiste());

        $this->comment('Se ha terminado de verificar y aperturar cuentas si no tienen los usuarios con el Rol de: '.$option);
        return Command::SUCCESS;
    }
}
