<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class VerificarNivelViajero implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $viajeros = null;

    /**
     * Create a new job instance.
     */
    public function __construct(public User|null $usuario = null)
    {
        $this->viajeros = collect([]);

        if(!is_null($usuario)){
            $this->viajeros->push($usuario);
        }else{
            $this->viajeros = User::where('activo', true)->get();
        }

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->viajeros->each(fn($viajero) =>  $viajero->verificarUserNivels());
    }
}
