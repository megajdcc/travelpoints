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
        Schema::table('paginas',function(Blueprint $t){
            $t->string('icono')->nullable();
            $t->boolean('showHeader')->default(false);
            $t->boolean('is_contacto')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('paginas', function (Blueprint $t) {
            $t->dropColumn('icono');
            $t->dropColumn('showHeader');
            $t->dropColumn('is_contacto');
        });
    }
};
