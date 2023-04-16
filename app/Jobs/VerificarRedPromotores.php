<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class VerificarRedPromotores implements ShouldQueue
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
        $promotores = User::whereHas('rol',function(Builder $q){
            $q->where('nombre','Promotor');
        })->get();

        foreach ($promotores as $key => $promotor) {

            $referidos_ultimo_trimestre =  DB::table('users', 'u')
                ->join('usuario_referencia as ur', 'u.id', 'ur.usuario_id')
                ->whereRaw('u.id = :usuario && ur.created_at >= DATE_SUB(CURDATE(), INTERVAL 89 DAY)', [':usuario' => $promotor->id])
                ->selectRaw('count(ur.referido_id) as referidos')
                ->first('referidos');

                // Si El promotor en los ultimos 90 días no ha invitado a ningun viajero al uso del sistema, eliminamos su red de referidos 
            if($referidos_ultimo_trimestre->referidos < 1){
                $promotor->referidos()->detach();
            }

        }
    }
}
