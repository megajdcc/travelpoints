<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class EventosPublicCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(fn ($evento) => [
            'id'               => $evento->id,
            'imagenes'         => $evento->imagenes->map(fn ($imagen) => ['imagen'=> "thumbnail-{$imagen->imagen}"])->toArray(),
            'titulo'           => $evento->titulo,
            'opinions'         => $evento->opinions,
            'url'              => $evento->url,
            'fecha_inicio'     => $evento->fecha_inicio,
            'fecha_fin'        => $evento->fecha_fin,
            'status'           => $evento->status, // 1 > activo 2 > vencido 3 > destiempo
            'model_id'         => $evento->model_id,
            'model_type'       => $evento->model_type,
            'recurrente'       => $evento->recurrente,
            'recurrencia'      => $evento->recurrencia, // [dia_semana                         :  [],hora_inicio    :t ime,hora_fin: time,id_group: string,  ] 
            'all_dia'          => $evento->all_dia,
            'tipo_recurrencia' => $evento->tipo_recurrencia, // 1                              =  > semanalmente, 2 => mensual, 3  = > Anual
            'model'            => $evento->model
        ])->toArray();
    }
}
