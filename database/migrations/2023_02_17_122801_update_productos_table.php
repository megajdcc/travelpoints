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
        Schema::table('productos',function(Blueprint $t){
            $t->tinyInteger('tipo_producto')->default(1); // 1 => fisico , 2 => Digital
            $t->string('archivo')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('productos', function (Blueprint $t) {
            $t->dropColumn('tipo_producto');
            $t->dropColumn('archivo');
        });
    }
};
