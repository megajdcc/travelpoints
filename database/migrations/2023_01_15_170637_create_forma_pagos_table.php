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
        Schema::create('forma_pagos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->timestamps();
        });

        Schema::create('formas_pago_negocio',function(Blueprint $table){
            $table->foreignId('forma_id')->constrained('forma_pagos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('negocio_id')->constrained('negocios')->cascadeOnDelete()->cascadeOnUpdate();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forms_pago_negocio');
        Schema::dropIfExists('forma_pagos');
    }
};
