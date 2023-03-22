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
        Schema::create('comisions', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('rol_id')->nullable();
            // $table->foreign('rol_id')->references('id')->on('rols')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('rol_id')->constrained('rols')->cascadeOnDelete()->cascadeOnUpdate();
            $table->decimal('comision');
            $table->engine = 'MyISAM';
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
        Schema::dropIfExists('comisions');
    }
};
