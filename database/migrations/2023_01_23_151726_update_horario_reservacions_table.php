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
        Schema::table('horario_reservacions',function(Blueprint $t){
            $t->boolean('floor_plan')->default(false);
            $t->integer('lugares')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('horario_reservacions', function (Blueprint $t) {
            $t->dropColumn('floor_plan');
            $t->dropColumn('lugares');
        });
    }
};
