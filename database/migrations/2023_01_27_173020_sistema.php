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
        Schema::create('sistema', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->longText('terminos')->nullable();
            $table->string('logotipo_fondo_claro')->nullable();
            $table->string('logotipo_fondo_oscuro')->nullable();
            $table->text('paypal_id')->nullable();
            $table->text('paypal_secrect')->nullable();
            $table->boolean('production_paypal')->default(false);
            $table->boolean('paypal')->default(false);

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
        Schema::dropIfExists('sistema');
    }
};
