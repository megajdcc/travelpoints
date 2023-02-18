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

        Schema::create('horario_reservacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('negocio_id')->constrained('negocios')->cascadeOnDelete()->cascadeOnUpdate();
            $table->tinyInteger('dia');
            $table->time('hora');
            $table->tinyInteger('condicion')->default(1);
            $table->timestamps();
        });

        Schema::create('mesas',function(Blueprint $table){
            $table->id();
            $table->integer('cantidad');
            $table->integer('sillas');
            $table->foreignId('horario_reservacion_id')->constrained('horario_reservacions')->cascadeOnDelete()->cascadeOnUpdate();
            
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mesas');
        Schema::dropIfExists('horario_reservacions');
    }
};
