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
        Schema::table('eventos', function (blueprint $t) {
            $t->dropColumn('fecha_fin');
        });

        Schema::table('eventos',function(blueprint $t){
            $t->dateTime('fecha_fin')->nullable();
            $t->json('recurrencia')->nullable();
            $t->boolean('all_dia')->default(false);
            $t->tinyInteger('tipo_recurrencia')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('eventos', function (blueprint $t) {
            $t->dropColumn('fecha_fin');
        });
        
        Schema::table('eventos', function (blueprint $t){
            $t->dateTime('fecha_fin')->nullable();
            $t->dropColumn('recurrencia');
            $t->dropColumn('all_dia');
            $t->dropColumn('tipo_recurrencia');

        });
    }
};
