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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('categoria_id')->constrained('categoria_productos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('tienda_id')->constrained('tiendas')->cascadeOnDelete()->cascadeOnUpdate();
            $table->decimal('precio',18);
            $table->longText('descripcion')->nullable();
            $table->integer('disponibles')->default(0);
            $table->json('caracteristicas')->nullable();
            $table->json('envio')->nullable();
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
        Schema::dropIfExists('productos');
    }
};
