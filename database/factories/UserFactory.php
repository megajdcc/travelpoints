<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Usuario\Rol;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'apellido' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'telefono' => $this->faker->unique()->phoneNumber,
            'direccion' => $this->faker->address,
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'imagen' => '3f8b9ebc8afe480955a01718f4edddebdade7714.jpg',
            'rol_id' => Rol::where('nombre','Invitado')->first()->id
        ];
    }

    // public function suspended(){
    //     return $this->state(function(array $atributos):array{
    //         return [
    //             'nombre' => 'suspended'
    //         ];

    //     });

    // }


}
