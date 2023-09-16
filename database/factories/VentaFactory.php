<?php

namespace Database\Factories;

use App\Models\Divisa;
use App\Models\Negocio\Negocio;
use App\Models\User;
use App\Models\Usuario\Rol;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venta>
 */
class VentaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        // $negocio = Negocio::factory()->create();
        return [
            'divisa_id' => Divisa::factory(),
            'monto' => fake()->randomFloat(2,0,10000),
            'comision' => fake()->randomFloat(2, 0, 1000), // Monto de la comisión para el momento
            'tipo_comision' => 1, // 1 => Porcentaje por venta 2 => Monto por personas
            'tps' => 10,
            'tps_referente' => 0,
            'certificado' => null,
            'model_id' => Negocio::factory(),
            'model_type' => function(array $atrs){
                return Negocio::find($atrs['model_id'])->model_type;
            },
            'empleado_id' => User::factory(),
            'cliente_id' => User::factory(),            
            'personas' => 2,
            'reservacion_id' => null,
            'cantidad' => 1,
            'tps_bonificados' => 0
        ];
    }
}
