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
            $t->boolean('isChino')->default(false);
            $t->string('pid')->nullable();
            $t->json('cj')->nullable();
            $t->json('variants')->nullable();
            $t->boolean('enviable')->default(false);
            
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
            $t->dropColumn('isChino');
            $t->dropColumn('pid');
            $t->dropColumn('cj');
            $t->dropColumn('variants');
            $t->dropColumn('enviable');


        });

    }
};
