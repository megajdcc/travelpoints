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
        Schema::create('sucursals', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->onDelete('set null')->cascadeOnUpdate();
            $table->foreignId('estado_id')->constrained('estados')->cascadeOnDelete()->cascadeOnUpdate();
            $table->text('direccion');
            $table->string('lat');
            $table->string('lng');
            $table->foreignId('iata_id')->nullable()->constrained('iatas')->onDelete('set null')->cascadeOnUpdate();
            $table->bigInteger('model_id');
            $table->string('model_type');
            $table->timestamps();
        });

        Schema::table('sistema',function(Blueprint $t){
            $t->boolean('empresa_digital')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sucursals');
        Schema::table('sistema', function (Blueprint $t) {
            $t->dropColumn('empresa_digital');
        });
    }
};
