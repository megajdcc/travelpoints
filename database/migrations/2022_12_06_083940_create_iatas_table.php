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
        Schema::create('iatas', function (Blueprint $table) {

            $table->id();
            $table->string('codigo')->unique();
            $table->string('aeropuerto')->nullable();
            
            $table->foreignId('estado_id')->nullable()->constrained('estados')->cascadeOnUpdate()->onDelete('set null');

            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->cascadeOnUpdate()->onDelete('set null');


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
        Schema::dropIfExists('iatas');
    }
};
