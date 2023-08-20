<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Pagina;

class PaginaTest extends TestCase
{
    /**
     * @test
     * @return void
     */
    public function home()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

 

    public function test_model_can_be_instantiated(){
        $pagina = Pagina::factory()->make();
        $this->assertInstanceOf(Pagina::class,$pagina,'Pagina puede ser instanciada');
    
    }

}
