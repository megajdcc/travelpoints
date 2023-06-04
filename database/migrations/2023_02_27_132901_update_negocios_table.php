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
        Schema::table('negocios', function (Blueprint $t) {
            $t->tinyInteger('tipo_menu')->nullable();
            $t->string('menu')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('negocios', function (Blueprint $t) {
            $t->dropColumn('tipo_menu');
            $t->dropColumn('menu');
        });

        
    }
};
