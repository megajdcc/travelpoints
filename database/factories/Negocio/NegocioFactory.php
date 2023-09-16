<?php

namespace Database\Factories\Negocio;

use App\Models\Ciudad;
use App\Models\Divisa;
use App\Models\Estado;
use App\Models\Iata;
use App\Models\Negocio\NegocioCategoria;
use App\Models\Negocio\Solicitud;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Negocio\Negocio>
 */
class NegocioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        return [
            'nombre' => fake()->unique()->word,
            'descripcion' => fake()->realText(),
            'breve' => fake()->text(80),
            'categoria_id' => NegocioCategoria::factory(),
            'comision' => fake()->numberBetween(10,100), // Comision que paga el negocio a Travelpoints
            'tipo_comision' => 1, // 1 Porcentaje por venta, 2 Monto por Venta 
            'url' => fake()->unique()->slug(),
            'sitio_web' =>fake()->url() ,
            'emails' => [['email' => fake()->unique->email,'principal' => true]],
            'direccion' => fake()->address(),
            'codigo_postal' => fake()->postcode(),
            'ciudad_ id' => Ciudad::factory(),
            'estado_id' => Estado::factory(),
            'lat' => fake()->latitude,
            'lng' => fake()->longitude,
            'logo' => null,
            'vistas' => 0,
            'ultima_recarga' => null,
            'floor_plan' => false,
            'acepta_reservas' => true,
            'status' => 1, // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
            'usuario_id' => User::factory(),
            'solicitud_id' => Solicitud::factory(),
            'iata_id' => Iata::factory(),
            'divisa_id' => Divisa::factory(),
            'precios' => ['precio_minimo' => 0,'precio_maximo' => 1000], // [precio_minimo => 0,precio_maximo => 0]
            'tipo_menu'  => 1, // 1 => URL , 2=> PDF 3 => image
            'menu' => fake()->url(),
            'publicado' => true
        ];
    }
}
