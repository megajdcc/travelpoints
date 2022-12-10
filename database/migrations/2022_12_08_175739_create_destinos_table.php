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
        Schema::create('destinos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('iata_id')->nullable()->constrained('iatas')->onDelete('set null')->cascadeOnUpdate();
            $table->string('nombre');
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->onDelete('set null')->cascadeOnUpdate();
            $table->foreignId('estado_id')->constrained('estados')->cascadeOnDelete()->cascadeOnUpdate();
            $table->text('descripcion')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->string('titulo');
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
        Schema::dropIfExists('destinos');
    }
};
