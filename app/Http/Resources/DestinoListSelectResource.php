<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinoListSelectResource extends JsonResource
{

    public function __construct(mixed $resource)
    {
        
        parent::__construct($resource);
        JsonResource::withoutWrapping();

    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre
        ];
    }
}
