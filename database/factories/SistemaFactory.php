<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sistema>
 */
class SistemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nombre' => 'TravelPoints',
            'terminos' => fake()->text(),
            'logotipo_fondo_claro' => null,
            'logotipo_fondo_oscuro' => null,
        ];
    }
}
