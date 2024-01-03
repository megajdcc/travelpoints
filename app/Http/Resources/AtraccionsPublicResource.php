<?php

namespace App\Http\Resources;

use App\Models\Atraccion;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AtraccionsPublicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $atracciones = Atraccion::where('destino_id', $this->id)->has('imagenes')->get();
        // foreach ($atracciones as $atraccion) {
        //     $atraccion->telefono;
        //     $atraccion->imagenes = $atraccion->imagenes->where('is_thumb', true);

        //     // $atraccion->destino;
        //     // $atraccion->destino->estado?->pais;
        //     // $atraccion->destino->ciudad;
        //     $atraccion->horarios;
        //     $atraccion->likes;
        //     $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
        //     $atraccion->modelType = $atraccion->model_type;
        //     $atraccion->opinions;
        // }

        return $atracciones->map(fn($atraccion) => [
                'id' => $atraccion->id,
                'imagenes' => $atraccion->imagenes->where('portada',true)->where('is_thumb',false)->map(fn($imagen) => ['imagen' => "thumbnail-{$imagen->imagen}"])->toArray(),
                'nombre' => $atraccion->nombre,
                'opinions' => $atraccion->opinions,
                'duracion_sugerida' => $atraccion->duracion_sugerida,
                'descripcion' => $atraccion->descripcion,
                'modelType' => $atraccion->model_type,
                'ruta' => "/Atraccions?q={$atraccion->nombre}"
            ])->toArray();
    }
}
