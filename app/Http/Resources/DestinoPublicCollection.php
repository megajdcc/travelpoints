<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DestinoPublicCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {

       

        return $this->collection->map(fn($destino) => [
            'id' => $destino->id,
            'imagenes' => $destino->imagenes->where('portada',true)->map(fn($imagen) => ['imagen' => "thumbnail-{$imagen->imagen}"])->toArray(),
            'nombre' => $destino->nombre,
            'descripcion' => $destino->descripcion,
            'titulo' => $destino->titulo,
            'ruta' =>  "/Destinos?q={$destino->nombre}",
            'pais' => $destino->iata?->estado?->pais?->pais,
        ])->toArray();

    }
}
