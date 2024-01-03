<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinoPublicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'result' => $this->id,
            'destino' => [
                'id' => $this->id,
                'nombre' => $this->nombre,
                'descripcion' => $this->descripcion,
                'titulo' => $this->titulo,
                'imagenes' => $this->imagenes,
                'estado' => $this->estado,
                'pais' => $this->estado?->pais,
                'isAboutTravel' => !empty($this->about_travel),
                'ruta' => "/Destinos?q={$this->nombre}",
                'modelType' => $this->model_type,
                'atracciones' => $this->atracciones->each(function($atraccion){
                    $atraccion->imagenes = $atraccion->imagenes->filter(fn ($imagen) => $imagen->is_thumb);
                })
            ]
           
        ];
    }
}
