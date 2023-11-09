<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nivels', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('insignia');
            $table->boolean('baja_nivel')->default(false);
            $table->json('condicion_bajar_nivel'); // [ tiempo => cantidad, tipo_tiempo => 1 ano, 2 meses y 3 dias]
            $table->json('activacion'); 
            $table->foreignId('grupo_id')->constrained('grupo_nivels')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nivels');
    }
};
