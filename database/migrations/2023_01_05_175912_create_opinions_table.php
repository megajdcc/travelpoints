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
        Schema::create('opinions', function (Blueprint $table) {
            $table->id();
            $table->decimal('calificacion');
            $table->text('opinion');
            $table->string('titulo');
            $table->string('asistencia');
            $table->tinyInteger('acompanante');
            $table->boolean('certificacion');
            $table->json('preguntas')->nullable();
            $table->unsignedBigInteger('model_id');
            $table->string('model_type');
            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::dropIfExists('opinions');
    }
};
