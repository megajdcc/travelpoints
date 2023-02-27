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
        Schema::dropIfExists('horarios');

        Schema::create('horarios', function (Blueprint $table) {
            $table->id();

            $table->tinyInteger('dia');
            $table->json('apertura')->nullable();
            $table->json('cierre')->nullable();
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');
            $table->boolean('doble_turno')->default(false);
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
        Schema::dropIfExists('horarios');

        Schema::create('horarios', function (Blueprint $table) {
            $table->id();

            $table->tinyInteger('dia');
            $table->time('apertura')->nullable();
            $table->time('cierre')->nullable();
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');

            $table->timestamps();
        });

    }
};
