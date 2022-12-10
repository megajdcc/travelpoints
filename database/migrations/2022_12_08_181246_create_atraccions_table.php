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
        Schema::create('atraccions', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('duracion_sugerida');
            $table->string('sitio_web')->nullable();
            $table->string('email')->nullable();
            $table->foreignId('destino_id')->constrained('destinos')->cascadeOnDelete()->cascadeOnUpdate();
            
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
        Schema::dropIfExists('atraccions');
    }
};
