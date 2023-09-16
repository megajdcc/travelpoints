<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Negocio\Negocio;
use App\Models\User;
use App\Models\Usuario\Rol;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
   

    public function test_get_total_viajeros(){
        Rol::destroy(Rol::get()->pluck('id'));
        User::destroy(User::get()->pluck('id'));
        $usuarios = User::factory()->for(Rol::factory()->create(['nombre' => 'Viajero']), 'rol')->count(fake()->randomNumber(2))->create();

        $user = User::factory()->for(Rol::factory()->create(['nombre' => 'Desarrollador']))->create();

        Sanctum::actingAs(
            $user,
            ['*']
        );

        $this->getJson("/api/dashboard/get/total-viajeros")
            ->assertOk()
            ->assertContent((string) $usuarios->count());
            // ->assertJsonCount($usuarios->count());


    }   

    public function test_get_viajeros_por_pais(){
        Rol::destroy(Rol::get()->pluck('id'));
        User::destroy(User::get()->pluck('id'));

        $usuarios = User::factory()->for(Rol::factory()->create(['nombre' => 'Viajero']),'rol')->count(10)->create();
   
        $this->assertInstanceOf(Collection::class,$usuarios);


        $user = User::factory()->for(Rol::factory()->create(['nombre' => 'Desarrollador']))->create();

        Sanctum::actingAs(
            $user,
            ['*']
        );

        $this->getJson('/api/dashboard/get/viajeros/por-pais')
        ->assertOk()
        ->assertJsonIsArray()
        ->assertJson(function(AssertableJson $j){

            $j->count(2)
            ->where('name','x')
            ->etc();
        });
        
    }

    public function test_get_pie_chart_data_viajeros(){
        Rol::destroy(Rol::get()->pluck('id'));
        User::destroy(User::get()->pluck('id'));

        $usuarios_con_consumo = User::factory()->for(Rol::factory()
        ->create(['nombre' => 'Viajero']), 'rol')
        ->has(Venta::factory()->for(Negocio::factory(),'model')->count(1),'consumos')
        ->count(10)
        ->create(['activo' => true]);

        $usuarios_sin_consumos = User::factory()->for(Rol::factory()
        ->create(['nombre' => 'Viajero']), 'rol')
        ->count(10)
        ->create(['activo' => true]);

        $usuarios_sin_actividad = User::factory()->for(Rol::factory()
        ->create(['nombre' => 'Viajero']), 'rol')
        ->count(10)
        ->create(['activo' => false]);

        $this->assertInstanceOf(Collection::class, $usuarios_con_consumo);
        $this->assertInstanceOf(Collection::class, $usuarios_sin_consumos);
        $this->assertInstanceOf(Collection::class, $usuarios_sin_actividad);


        $user = User::factory()->for(Rol::factory()->create(['nombre' => 'Desarrollador']))->create();

        Sanctum::actingAs(
            $user,
            ['*']
        );


        $this->getJson("/api/dashboard/get/viajeros/pie-chart")
        ->assertOk()
        ->assertJsonCount(1);

    }
}
