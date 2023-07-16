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
        Schema::create('tarjetas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lote_id')->constrained('lotes')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('numero')->unique();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $t) {
            $t->foreignId('tarjeta_id')->nullable()->constrained('tarjetas')->nullOnDelete()->cascadeOnUpdate();
        });

       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $t) {
            $t->dropConstrainedForeignId('tarjeta_id');
        });

        Schema::dropIfExists('tarjetas');
    }
};
