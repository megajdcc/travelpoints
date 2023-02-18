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
        Schema::create('movimientos', function (Blueprint $table) {
            
            $table->id();
            $table->foreignId('estado_cuenta_id')->constrained('estado_cuentas')->cascadeOnUpdate()->cascadeOnDelete();
            $table->decimal('monto');
            $table->smallInteger('tipo_movimiento')->default(1); // 1 => Ingreso, 2 => egreso
            $table->decimal('balance');
            $table->text('concepto')->nullable();
            
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
        Schema::dropIfExists('movimientos');
    }
};
