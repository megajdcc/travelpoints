<?php

namespace Database\Factories;

use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username'         => $this->faker->unique()->userName(),
            'nombre'           => $this->faker->firstName(),
            'apellido'         => $this->faker->lastName(),
            'bio'              => $this->faker->realText(),
            'website'          => $this->faker->url(),
            'fecha_nacimiento' => $this->faker->date(),
            'genero'           => $this->faker->numberBetween(1, 2),
            'codigo_postal'    => $this->faker->postcode(),
            'activo'           => true,
            'imagen'           => 'default.jpg',
            'direccion'        => $this->faker->address(),
            'email'            => $this->faker->unique()->email(),
            'password'         => $this->faker->password(),
            'is_password'      => true,
            'lenguaje'         => 1,
            'rol_id' => Rol::factory(),
        ];
    }
}