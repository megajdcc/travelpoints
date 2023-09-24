<?php

namespace Tests\Feature\Http;

use App\Models\Negocio\Negocio;
use App\Models\User;
use App\Models\Venta;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class VentaControllerTest extends TestCase
{
    
    use RefreshDatabase;

    public function test_get_five_countries_with_major_sales(){
    
        $negocios = Negocio::factory()->count(5);
        $users = User::factory()->has(Venta::factory()->count(19),'consumos')->create();

        Sanctum::actingAs(
            User::factory()->create(),
            '*'
        );


        $this->getJson('/api/reporte/ventas/get/cinco-mejores-paises-en-ventas')
                ->assertOK()
                ->assertJsonCount(2);

    }
}
