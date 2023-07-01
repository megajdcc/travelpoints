<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Negocio\Reservacion;
use App\Notifications\reservaCancelada;
use Illuminate\Support\Carbon;

class verificarReservas implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {   
        // Traer todas las reservas que esten pasada un día despues de la fecha pautada, pero que su estado sea sin consumar todavía
        $reservaciones = Reservacion::where('fecha', '>', Carbon::now()->addDay())->where('status',1)
            ->get();

        foreach ($reservaciones as $reservacion) {
            
            $reservacion->status  = 3; // cancelamos la reservación
            $reservacion->save();
            // Notificar al reservante que se le ha cancelado su reserva
            $reservacion->usuario->notify(new reservaCancelada($reservacion));
        }
    }
}
