<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PaisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {   

        return [
            'pais' => fake()->country(),
            'codigo' => fake()->countryISOAlpha3(),
            'lada' => fake()->unique()->numberBetween(0,999),
        ];
    }
}
