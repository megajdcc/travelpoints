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
        Schema::create('tiendas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->cascadeOnUpdate()->onDelete('set null');
            $table->boolean('fisica')->default(false);
            $table->foreignId('iata_id')->nullable()->constrained('iatas')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('estado_id')->nullable()->constrained('estados')->cascadeOnUpdate()->onDelete('set null');
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return voidpa migr
     */
    public function down()
    {
        Schema::dropIfExists('tiendas');
    }
};
