<?php

namespace App\Console\Commands;

use App\Models\Destino;
use App\Models\Atraccion;
use App\Models\Evento;
use Illuminate\Console\Command;
use App\Models\Imagen;
use App\Models\Negocio\Negocio;
use App\Models\Opinion;
use App\Models\Producto;
use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class GenerarThumbnails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generar-thumbnails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para generar thumbnails a todas las imagenes que no la tengan un thumbnail defenido';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        $imagenes = Imagen::where('is_thumb',false)->whereHasMorph('model',
        [Atraccion::class,Destino::class,Evento::class,Opinion::class,Producto::class,Publicacion::class,Negocio::class],
        function(Builder $query){
            $query->whereNotNull('id');
        })->get();

        foreach ($imagenes as $key => $imagen) {
            if(!Storage::disk('thumbnails')->exists("thumbnail-{$imagen->imagen}")){
                if($imagen->model){
                    $imagen->model->generarThumbnail($imagen);
                }
            }

        }
    }
}
