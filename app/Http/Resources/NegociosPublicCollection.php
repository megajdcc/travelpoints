<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NegociosPublicCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(fn ($negocio) => [
            'id' => $negocio->id,
            'imagenes' => $negocio->imagenes->where('portada', true)->map(fn($imagen) => ['imagen' => "thumbnail-{$imagen->imagen}"])->toArray(),
            'nombre' => $negocio->nombre,
            'opinions' => $negocio->opinions,
            'url' => $negocio->url,
            'categoria' => $negocio->categoria->categoria,
            'tps_referido' => $negocio->tps_referido,
            'tipo_comision' => $negocio->tipo_comision,
            'comision' => $negocio->comision,
            'recomendaciones' => $negocio->recomendaciones,
            'seguidores' => $negocio->seguidores
        ])->toArray();
    }
}
