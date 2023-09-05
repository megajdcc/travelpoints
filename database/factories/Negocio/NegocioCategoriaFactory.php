<?php

namespace Database\Factories\Negocio;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Negocio\NegocioCategoria>
 */
class NegocioCategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'categoria' => fake()->unique()->word(),
            'descripcion' => fake()->realText(),
        ];
    }
}
