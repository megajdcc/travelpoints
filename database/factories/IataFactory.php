<?php

namespace Database\Factories;

use App\Models\Ciudad;
use App\Models\Estado;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Iata>
 */
class IataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codigo' => fake()->unique()->word,
            'aeropuerto' => fake()->streetAddress(),
            'estado_id' => Estado::factory(),
            'ciudad_id' => Ciudad::factory()->for(Estado::factory())
        ];
    }
}
