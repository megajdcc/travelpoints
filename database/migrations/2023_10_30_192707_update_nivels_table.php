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
        Schema::table('nivels',function(Blueprint $t){
            $t->foreignId('nivel_anterior_id')->nullable()->constrained('nivels')->nullOnDelete()->cascadeOnUpdate();
            $t->boolean('nivel_inicial')->boolean(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nivels', function (Blueprint $t) {
            $t->dropColumn('nivel_inicial');
            $t->dropConstrainedForeignId('nivel_anterior_id');
        });
    }
};
