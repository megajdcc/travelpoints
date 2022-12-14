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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            
            $table->string('titulo');
            $table->longText('contenido');
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');
            $table->tinyInteger('status');
            $table->boolean('recurrente')->default(false);
            $table->string('model_type');
            $table->string('url');
            $table->unsignedBigInteger('model_id');

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
        Schema::dropIfExists('eventos');
    }
};
