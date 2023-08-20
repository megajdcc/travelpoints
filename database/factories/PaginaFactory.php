<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\{Categoria,User,Pagina};
use App\Models\Usuario\Permiso;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pagina>
 */
class PaginaFactory extends Factory
{

    /**
     * El nombre del modelo correspondiente de la fábrica.
     * @var string 
     */
    protected $model = Pagina::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {   
         

        return [
            'nombre' => $this->faker->name(),
            'contenido' => $this->faker->text(3000),
            'ruta' => $this->faker->unique()->slug(20),
            'usuario_id' => User::get()->random(),
            'activo' => $this->faker->boolean(),
        ];
    }
}
