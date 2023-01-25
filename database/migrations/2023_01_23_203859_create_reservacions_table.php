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
        Schema::create('reservacions', function (Blueprint $table) {
            $table->id();

            $table->date('fecha');
            $table->time('hora');
            $table->text('observacion')->nullable();
            $table->integer('personas');
            $table->tinyInteger('status');
            
            $table->foreignId('negocio_id')->constrained('negocios')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('operador_id')->nullable()->constrained('users')->onDelete('set null')->cascadeOnUpdate();

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
        Schema::dropIfExists('reservacions');
    }
};
