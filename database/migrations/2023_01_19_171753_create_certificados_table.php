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
        Schema::create('certificados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion');
            $table->text('condiciones');
            $table->text('restricciones');
            $table->string('imagen');
            $table->dateTime('expide');
            $table->dateTime('vence');
            $table->integer('disponibles');
            $table->decimal('precio');
            $table->boolean('activo');
            $table->foreignId('divisa_id')->constrained('divisas')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('negocio_id')->constrained('negocios')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::dropIfExists('certificados');
    }
};
