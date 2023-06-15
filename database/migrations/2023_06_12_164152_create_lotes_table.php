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
        Schema::create('lotes', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_llegada');
            $table->integer('cantidad');
            $table->string('codigo_lada',3);
            $table->string('numero_inicial',5);
            $table->string('numero_final',5)->nullable();
            $table->decimal('monto')->default(5);
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->cascadeOnUpdate()->onDelete('set null');
            $table->decimal('tps');
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
        Schema::dropIfExists('lotes');
    }
};
