<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LimpiarCarrito implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $usuario;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $usuario)
    {
        $this->usuario = $usuario;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->usuario->limpiarCarrito();
    }
}
