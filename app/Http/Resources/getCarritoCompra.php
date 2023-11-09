<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class getCarritoCompra extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $carrito_productos = $this->carritoCompra;
        return $carrito_productos->map(fn ($producto) => [
            'id'       => $producto->id,
            'nombre'   => $producto->nombre,
            'breve'    => $producto->breve,
            'imagenes' => $producto->imagenes,
            'pivot' => $producto->pivot
        ])->toArray();
    }
}
