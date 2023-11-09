<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_nivels',function(Blueprint $t){
            $t->boolean('completado')->default(false);
            $t->boolean('en_proceso')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_nivels', function (Blueprint $t) {
            $t->dropColumn('completado');
            $t->dropColumn('en_proceso');
        });
    }
};
