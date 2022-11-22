<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Pagina;

class PaginaTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * 
     * 
     * @test
     */
    public function can_be_fetch_data(){

        $response = $this->post('/api/paginas/fetch/data',[
            "q" => "",
            "perPage" => 0,
            "page" => 1,
            "sortBy" => 'id',
            "sortDesc" => true,
            'categoria_id' => null
        ]);


        $response->assertStatus(200);

    }


    public function test_model_can_be_instantiated(){
        $pagina = Pagina::factory()->make();

        $this->assertInstanceOf('App\Models\Pagina',$pagina,'Pagina puede ser instanciada');
    }

}
