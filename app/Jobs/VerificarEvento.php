<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Evento;

class VerificarEvento implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    public Evento $evento;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Evento $evento)
    {
        $this->evento = $evento;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $now = now();

            if ($this->evento->recurrente) {

                if ($now->isAfter($this->evento->fecha_fin)) {

                    $this->evento->fecha_inicio = $this->evento->fecha_inicio->addYear();
                    $this->evento->fecha_fin = $this->evento->fecha_fin->addYear();
                    $this->evento->status = 3;
                    $this->evento->save();
                    $this->dispatch($this->evento)->delay($this->evento->fecha_inicio->addMinute());

                }

                if ($now->between($this->evento->fecha_inicio, $this->evento->fecha_fin)) {

                    $this->evento->status = 1;
                    $this->evento->save();
                    $this->dispatch($this->evento)->delay($this->evento->fecha_fin->addMinute());
                
                }

               
            } else {
                
                if($now->between($this->evento->fecha_inicio,$this->evento->fecha_fin)){
                    $this->evento->status = 1;
                    $this->evento->save();
                    
                    $this->dispatch($this->evento)->delay($this->evento->fecha_fin->addMinute());

                }

                if ($now->isAfter($this->evento->fecha_fin)) {
                    $this->evento->status = 2;
                    $this->evento->save();
                }
            }
        
       



    }
}
