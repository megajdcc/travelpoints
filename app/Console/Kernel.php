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

        // La verificación la hacemos cada día

        $schedule->call(function(){
            VerificarRedPromotores::dispatch();
        })->daily();

        // Limpiar los trabajos que esten fallidos... 
        $schedule->command('queue:flush')->daily();
        $schedule->job(new verificarReservas)->daily();
        $schedule->command('usuario:establecer-nivel')->daily();

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
