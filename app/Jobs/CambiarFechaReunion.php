<?php

namespace App\Jobs;

use App\Models\Reunion;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CambiarFechaReunion implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(protected Reunion $reunion,protected $nueva_fecha)
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
        if($this->reunion){
            $this->reunion->fecha_inicio = $this->nueva_fecha;
            $this->reunion->save();
            $nueva_fecha = $this->reunion->fecha_inicio->addYear();

            $this->dispatch($this->reunion, $nueva_fecha)->delay(now()->addYear()->setDay(1)->setMonth(1));
        }
        

    }
}
