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
        Schema::create('reunions', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->string('model_type')->nullable();
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->boolean('recurrente')->default(false);
            $table->json('recurrencia')->nullable();
            $table->boolean('all_dia');
            $table->tinyInteger('tipo_recurrencia')->nullable();
            $table->string('archivo')->nullable();
            $table->text('nota')->nullable();
            $table->tinyInteger('estado')->default(0);
            $table->json('participantes')->nullable();
            $table->json('recordatorio')->nullable();
            $table->tinyInteger('tipo');
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
        Schema::dropIfExists('reunions');
    }
};
