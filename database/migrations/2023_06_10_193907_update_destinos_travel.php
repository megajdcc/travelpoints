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
        Schema::table('destinos',function(Blueprint $t){
            $t->longText('descripcion')->change();
            $t->longText('about_travel')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('destinos',function(Blueprint $t){
            $t->text('descripcion')->change();
            $t->dropColumn('about_travel');
        });
    }
};
