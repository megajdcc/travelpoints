<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class UserTest extends TestCase
{

    public function test_has_many_invitacions()
    {
        $usuario = new User;
        $this->assertInstanceOf(Collection::class,$usuario->invitaciones);
        $this->assertEquals(0,$usuario->invitaciones->count());
    }
}
