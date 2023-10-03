<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TraduccionTest extends TestCase
{
    
    public function test_traduccion_lg_translater(){
        $cadena_es = 'hola';
        $cadena_en  = 'hello';

        Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );
        
        $this->postJson('/api/traslate/',['msg' => $cadena_es,'locale'  => 'en'])
        ->assertOk()
        ->assertJson(function(AssertableJson $j) use($cadena_en) {
            $j->where('traslate.translated_text', $cadena_en)->etc();
        });
    }
    
}
