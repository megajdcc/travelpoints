<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'titulo' => $this->titulo,
            'imagenes' => $this->imagenes,
            'estado' => $this->estado,
            'pais' => $this->estado?->pais,
            'isAboutTravel' => !empty($this->about_travel),
            'ruta' => "/Destinos?q={$this->nombre}",
            'modelType' => $this->model_type
            
        ];

    }
}
