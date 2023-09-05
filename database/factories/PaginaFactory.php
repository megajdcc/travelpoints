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
            'nombre' > fake()->text(),
            'contenido' => fake()->realText(),
            'is_termino' => false,
            'is_politica' => false,
            'ruta' => fake()->slug(),
            'usuario_id' => User::factory()->create(),
            'activo' => true,
            'is_contacto' => false,
            'showHeader' => false,
        ];

      
    }
}
