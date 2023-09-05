<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Ciudad;
use App\Models\Divisa;
use App\Models\Estado;
use App\Models\Iata;
use App\Models\Invitacion;
use App\Models\Negocio\NegocioCategoria;
use App\Models\Usuario\Rol;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
class NegocioControllerTest extends TestCase
{
   
    public function test_afiliar_negocio_invitado(){

        Rol::destroy(Rol::get()->pluck('id'));
        Rol::factory()->create(['nombre' => 'Viajero']);
        NegocioCategoria::destroy(NegocioCategoria::get()->pluck('id'));

        Storage::fake('logo_negocios');
        $logo_negocio = UploadedFile::fake()->image('logo_negocio.jpg');
        $portada_negocio = UploadedFile::fake()->image('portada_negocio.jpg');

        $invitacion = Invitacion::factory()->create();
        $password = fake()->password();
        $datos = [
            'invitacion_id' => $invitacion->id,
            'usuario' => [
                'email' => fake()->email(),
                'nombre' => fake()->firstNameMale(),
                'apellido' => fake()->lastName(),
                'username' => fake()->userName(),
                'password' => $password,
                'r_password' => $password
            ],
            'nombre' => fake()->word(),
            'descripcion' => fake()->text(),
            'breve' => fake()->text(80),
            'categoria_id' => NegocioCategoria::factory()->create()->id,
            'comision' => fake()->randomNumber(2),
            'url' => fake()->slug(3),
            'sitio_web' => fake()->url(),
            'direccion' => fake()->address(),
            'codigo_postal' => fake()->postcode(),
            'estado_id' => Estado::factory()->create()->id,
            'ciudad_id' => Ciudad::factory()->for(Estado::factory()->create())->create()->id,
            'lat' => fake()->latitude(),
            'lng' => fake()->longitude(),
            'email' => fake()->email(),
            'telefono' => fake()->phoneNumber(),
            'tipo_comision' => 1,
            'divisa_id' => Divisa::factory()->create()->id,
            'iata_id' => Iata::factory()->create()->id,
            'logo' => $logo_negocio,
            'foto' => $portada_negocio 
        ];

      
        $this->post('/api/solicituds/afiliar-invitacion',$datos)
        ->assertOk()
        ->assertJson([
            'result' => true
        ]);

        $invitacion->refresh();
        $this->assertEquals($invitacion->status,2);

        Storage::disk('logo_negocios')->assertExists($logo_negocio->hashName());
        

    }

}
