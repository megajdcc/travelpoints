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
        Schema::create('carrito_productos', function (Blueprint $table) {
            $table->foreignId('cliente_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('cantidad')->default(1);
            $table->decimal('precio_unitario');
            $table->decimal('monto');
            $table->foreignId('tienda_id')->nullable()->constrained('tiendas')->onDelete('set null')->cascadeOnUpdate();
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
        Schema::dropIfExists('carrito_productos');
    }
};
