<?php

namespace App\Jobs;

use App\Models\Divisa;
use App\Models\Movimiento;
use App\Models\Sistema;
use App\Notifications\faltaUsabilidad;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UsabilidadViajeros implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected \Illuminate\Database\Eloquent\Collection $users;

    /**
     * Create a new job instance.
     */
    public function __construct(\Illuminate\Database\Eloquent\Collection $users)
    {
        $this->users = $users;
    }

    /**
     * Se ejecuta el trabajo; Si el Viajero no ha usado (nisiquiera a entrado al sistema) en los ultimos 10 meses el sistema, se le notifica para que sepa que si
     * no usa el sistema en los siguientes 2 meses restante se le descontará de su billetera el 10 % de sus TravelPoints...
     */
    public function handle(): void
    {
        $this->users->each(function($user) {
                $tps = $user?->cuenta->saldo ?? 0;
                $monto_descontar  = $tps / 10; 

                if($user->ultimo_login->diffInMonths(now()) >= 10 && $user->ultimo_login->diffInMonths(now()) < 12){
                    if($monto_descontar > 0){
                        $user->notify(new faltaUsabilidad());
                    }
                }else if($user->ultimo_login->diffInMonths(now()) >= 12){

                    if($monto_descontar > 0){
                        
                        $user->generarMovimiento(
                        $monto_descontar,
                        "Inactividad de 1 año. Descuento del 10% de tus puntos. Usa el sistema al menos una vez al año.",
                        Movimiento::TIPO_EGRESO);

                        // generamos movimiento de ingreso al sistema de los tps descontado
                        $sistema = Sistema::first();
                        $monto = Divisa::cambiar($user->cuenta->divisa,$sistema->divisa,$monto_descontar);

                        $sistema->generarMovimiento($monto,"Inactividad del Viajero {$user->getNombreCompleto()}, descuento del 10% de sus TravelPoints",Movimiento::TIPO_INGRESO);

                        
                    }
                  
                }

        });
    }
}
