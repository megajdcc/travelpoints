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
            'categoria_id' => Arr::random(Categoria::get()->pluck('id')->all()),
            'titulo' => $this->faker->jobTitle(),
            'contenido' => $this->faker->paragraphs(100,true),
            'ruta' => $this->faker->slug(3),
            'permiso_id' => Arr::random(Permiso::get()->pluck('id')->all()),
            'usuario_id' =>  User::get()->first()->id,
        ];
    }
}
