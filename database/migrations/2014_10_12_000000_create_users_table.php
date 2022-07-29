<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('nombre')->nullable();
            $table->string('apellido')->nullable();
            $table->string('telefono')->nullable();
            $table->string('fecha_nacimiento')->nullable();
            $table->tinyInteger('genero')->default(1);
            $table->string('codigo_postal')->nullable();
            $table->boolean('activo')->default(true);
            $table->text('direccion')->nullable();
            $table->string('imagen')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_password')->default(false);
            $table->text('bio')->nullable();
            $table->string('website')->nullable();
            $table->smallInteger('lenguaje')->nullable();
            $table->boolean('is_whatsapp')->default(false);
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();

            $table->unsignedBigInteger('rol_id')->nullable();
            $table->foreign('rol_id')->references('id')->on('rols')->onUpdate('cascade')->onDelete('set null');
            $table->string('token')->nullable();
            $table->timestamp('ultimo_login')->nullable();
            $table->string('codigo_referidor')->unique()->nullable();
            $table->decimal('tps')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('usuario_referencia',function(Blueprint $table){
            $table->string('codigo');
            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('referido_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuario_referencia');
        Schema::dropIfExists('users');
    }
}
