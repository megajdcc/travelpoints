<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Divisa>
 */
class DivisaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nombre' => fake()->unique()->word(),
            'iso' => fake()->currencyCode(),
            'simbolo' => '$',
            'principal' => false,
            'tasa' => fake()->randomFloat(2,0,10000)
        ];
    }
}
