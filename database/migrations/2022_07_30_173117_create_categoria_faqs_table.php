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
        Schema::create('categoria_faqs', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->string('icono')->nullable();
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('pregunta')->unique();
            $table->longText('respuesta');
            $table->foreignId('categoria_id')->constrained('categoria_faqs')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('usuario_id')->nullable()->constrained('users')->onDelete('set null')->cascadeOnUpdate();
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
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('categoria_faqs');
    }
};
