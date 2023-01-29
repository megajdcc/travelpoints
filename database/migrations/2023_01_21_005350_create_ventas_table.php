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
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->cascadeOnUpdate()->onDelete('set null');
            $table->decimal('monto');
            $table->decimal('comision')->nullable();
            $table->decimal('tps')->nullable();
            $table->decimal('tps_referente')->nullable();
            $table->boolean('certificado')->default(false);
            $table->foreignId('empleado_id')->nullable()->constrained('empleados')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('cliente_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedBigInteger('model_id');
            $table->string('model_type');
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
        Schema::dropIfExists('ventas');
    }
};
