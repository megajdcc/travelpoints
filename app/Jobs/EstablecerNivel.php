<?php

namespace App\Jobs;

use App\Console\Commands\establecerNivel as CommandsEstablecerNivel;
use App\Models\User;
use Illuminate\Bus\Queueable;

use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class EstablecerNivel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Collection $users;
    public CommandsEstablecerNivel $comandInstance;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $user_type = 'promotor')
    {
    
        $this->users = User::whereHas('rol',fn(Builder $q) => $q->where('nombre',$user_type))->get();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      
        $this->users->each(fn($usuario) => $usuario->establecerNivel());
    }
}
