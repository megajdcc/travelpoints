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
        Schema::table('consumos',function(Blueprint $t){
            $t->foreignId('tienda_id')->nullable()->constrained('tiendas')->cascadeOnUpdate()->cascadeOnDelete();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('consumos', function (Blueprint $t) {
            $t->dropConstrainedForeignId('tienda_id');
        });
       
    }
};
