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
        Schema::table('imagens',function(Blueprint $t){
            $t->boolean('is_thumb')->default(false);
            $t->boolean('is_gallery')->default(true);

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('imagens', function (Blueprint $t) {
            $t->dropColumn('is_thumb');
            $t->dropColumn('is_gallery');
        });
    }
};
