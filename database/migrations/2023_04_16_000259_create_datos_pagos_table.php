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
        Schema::create('datos_pagos', function (Blueprint $table){

            $table->id();
            $table->engine = 'MyISAM';
            $table->tinyInteger('metodo_pago')->default(1);
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('pais_id')->nullable()->constrained('pais')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->cascadeOnUpdate()->onDelete('set null');
            $table->string('nombre_banco')->nullable();
            $table->text('direccion_banco')->nullable();
            $table->string('titular');
            $table->string('iban')->nullable();
            $table->string('swift')->nullable();
            $table->string('numero_cuenta')->nullable();
            $table->string('fichero_acreditativo_cuenta')->nullable();
            $table->string('email')->nullable();
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
        Schema::dropIfExists('datos_pagos');
    }
};
