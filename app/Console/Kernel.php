<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\{DB};
use App\Jobs\VerificarRedPromotores;
use App\Jobs\verificarReservas;
class Kernel extends ConsoleKernel
{

    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        
        // $schedule->command('inspire')->hourly();
    
        // $schedule->command('queue:work --max-time=290 --max-jobs 100 --tries 5')->cron('*/5 * * * *')->withoutOverlapping(10);

        // Verificar la red de promotores
        $schedule->command('usuario:verificar-red-promotores')->daily();

        // Verificar y establecer los niveles de los usuarios con roles (Promotor)
        $schedule->command('usuario:establecer-nivel')->daily();

        // Se encarga de aperturar cuenta a usuarios que no tengan 
        $schedule->command('usuario:aperturar-cuenta')->daily();

        // Verificar las reservas 
        $schedule->job(new verificarReservas)->daily();
        
        // Limpiar los trabajos que esten fallidos... 
        $schedule->command('queue:flush')->daily();

        // Verificar usabilidad del sistema por parte de los viajeros
        $schedule->command('usuario:verificar-usabilidad-viajeros')->monthly();

        //  Limpiar Tokens Caducados
        $schedule->command('auth:clear-resets')->everyFifteenMinutes();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
