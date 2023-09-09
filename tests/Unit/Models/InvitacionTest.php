<?php

namespace Tests\Unit\Models;

use App\Models\Invitacion;
use App\Models\User;
use Tests\TestCase;

use Illuminate\Foundation\Testing\RefreshDatabase;
class InvitacionTest extends TestCase
{
    // use RefreshDatabase;

    public function test_belongs_to_user(){

        $invitacion = Invitacion::factory()->create();

        $this->assertInstanceOf(User::class,$invitacion->usuario);
    }

}
