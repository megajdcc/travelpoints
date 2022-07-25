<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Usuario\Permiso;
use Illuminate\Support\Arr;

use App\Models\Categoria;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "nombre" => $this->faker->word(),
            "banner" => $this->faker->imageUrl(),
            "permiso_id" => Arr::random(Permiso::get()->pluck('id')->all()),
            "categoria_id" => Arr::random(Categoria::get()->pluck('id')->all()),
        ];
    }
}
