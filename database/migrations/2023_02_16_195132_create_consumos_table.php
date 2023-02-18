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
        Schema::create('consumos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('empleado_id')->nullable()->constrained('users')->onDelete('set null')->cascadeOnUpdate();
            $table->decimal('total');
            $table->string('paypal_id')->nullable();
            $table->decimal('tps')->nullable();
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->onDelete('set null')->cascadeOnUpdate();
            $table->boolean('comentado')->default(false);
            $table->timestamps();
        });

        Schema::create('consumo_productos',function(Blueprint $t){
            $t->foreignId('producto_id')->constrained('productos')->cascadeOnDelete()->cascadeOnUpdate();
            $t->foreignId('consumo_id')->constrained('consumos')->cascadeOnDelete()->cascadeOnUpdate();
            $t->integer('cantidad')->default(0);
            $t->decimal('monto');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consumo_productos');
        Schema::dropIfExists('consumos');
    }
};
