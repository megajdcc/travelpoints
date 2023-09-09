<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use Illuminate\Support\Str;
use App\Models\Ciudad;
use App\Models\Invitacion;
use App\Models\Usuario\Rol;
use Database\Seeders\UserSeeder;
use Illuminate\Testing\Fluent\AssertableJson;
use App\Mail\InvitacionNegocio;
use App\Models\Divisa;
use App\Models\Estado;
use App\Models\Iata;
use App\Models\Negocio\NegocioCategoria;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;


class InvitacionControllerTest extends TestCase
{
    // use RefreshDatabase;
    public function test_successfull_invitacion_for_negocio()
    {   
        // $this->seed();
        $this->withoutExceptionHandling();

        Mail::fake();

        $usuario = User::factory()->create();
        Sanctum::actingAs(
            $usuario,
            ['*']
        );

        $response = $this->postJson("/api/invitacions",[
            'mensaje' => fake()->text(100),
            'email' => fake()->email(),
            'usuario_id' => $usuario->id
        ])
        
        ->assertOk()
        ->assertJson(function(AssertableJson $j){
            $j->hasAll(['result','invitacion'])
            ->etc();
        });

         Mail::assertQueued(InvitacionNegocio::class);
    }

    public function test_mailable_content_invitacion()
    {
        $invitacion = Invitacion::factory()->create();

        $mailable  = new InvitacionNegocio($invitacion);
        
        $mailable->assertTo($invitacion->email)
        ->assertFrom($invitacion->usuario->email, $invitacion->usuario->getNombreCompleto())
        ->assertHasSubject('Invitación a formar Parte de Travel Points')
        ->assertSeeInText($invitacion->email);
    }


    public function test_fetch_data_invitacions(){
        
        User::destroy(User::get()->pluck('id'));
        Rol::destroy(Rol::get()->pluck('id'));

        $usuario = User::factory()->for(Rol::factory()->create(['nombre' => 'Coordinador']))->create();
        $invitacions = Invitacion::factory(3)->create(['usuario_id' => $usuario->id]);
        
        Sanctum::actingAs(
            $usuario,
            ['*']
        );

        $this->postJson("/api/invitacions/fetch-data",[
            'page' => 1,
            'sortBy' => 'id',
            'isSortDirDesc' => true,
            'perPage' => 10,
            'q' => '',
            'usuario' => $usuario->id
        ])->assertOk()
        ->assertJson([
            'total' => $invitacions->count()
        ]);

        
    }


    public function test_reseding_invitacion(){
        
        $invitacion = Invitacion::get()->last();
        Mail::fake();

        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );


        $this->getJson("/api/invitacions/{$invitacion->id}/recordar")
        ->assertOk()
        ->assertJson([
            'result' => true
        ]);

        Mail::assertQueued(InvitacionNegocio::class);


    }


    public function test_fetch_data_with_invitacion_id(){
        
        $invitacion_id = Invitacion::factory()->create()->id;

        $this->getJson("/api/invitacions/{$invitacion_id}/fetch-data")
        ->assertOk()
        ->assertJson(['id' => $invitacion_id]);

    }


    public function test_fetch_data_with_invitacion_status_acepted(){
        $invitacion_id = Invitacion::factory()->create(['status' => 2])->id;
        $this->getJson("/api/invitacions/{$invitacion_id}/fetch-data")
        ->assertStatus(204);
    }

    public function test_destroy(){

      
        $invitacion_id = Invitacion::factory()->create()->id;
        
        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );

        $this->deleteJson("/api/invitacions/{$invitacion_id}")
        ->assertOk()
        ->assertJson(['result' => true]);

    }

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
        // Storage::disk('logo_negocios')->assertExists($logo_negocio->hashName());
        
    }

    
}
