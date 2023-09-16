<?php

namespace Database\Factories\Negocio;

use App\Models\Ciudad;
use App\Models\Divisa;
use App\Models\Estado;
use App\Models\Iata;
use App\Models\Negocio\NegocioCategoria;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Negocio\Solicitud>
 */
class SolicitudFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $logo = fake()->image(\storage_path('app/public/negocios/logos'),220,180);

        return [
            'nombre'        => fake()->word,
            'descripcion'   => fake()->realText(),
            'breve'         => fake()->text(80),
            'categoria_id'  => NegocioCategoria::factory(),
            'comision'      => fake()->numberBetween(10,100),
            'tipo_comision' => 1, // 1         =>Porcentaje, 2 => Monto fijo por persona 
            'url'           => fake()->unique->slug,
            'email'         => fake()->unique()->email,
            'telefono'      => fake()->unique()->phoneNumber(),
            'sitio_web'     => fake()->url(),
            'direccion'     => fake()->address(),
            'codigo_postal' => fake()->postcode(),
            'ciudad_id'     => Ciudad::factory(),
            'estado_id'     => Estado::factory(),
            'lat'           => fake()->latitude(),
            'lng'           => fake()->longitude(),
            'logo' => Str::afterLast($logo,'/'),
            'foto' => Str::afterLast($logo, '/'),
            'situacion' => 3, // 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
            'comentario' => null,
            'usuario_id' => User::factory(),
            'divisa_id' => Divisa::factory(),
            'iata_id' => Iata::factory()
        ];
    }
}
