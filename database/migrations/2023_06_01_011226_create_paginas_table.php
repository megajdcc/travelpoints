<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paginas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->longText('contenido');
            $table->json('header')->nullable();
            $table->string('ruta')->unique();
            $table->boolean('activo')->default(false);
            $table->boolean('is_termino')->default();
            $table->boolean('is_politica')->default();
            $table->foreignId('usuario_id')->nullable()->constrained('users')->cascadeOnUpdate()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paginas');
    }
};
