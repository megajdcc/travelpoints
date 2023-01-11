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
        
        Schema::create('panels', function (Blueprint $table) {
            $table->id();
            $table->string('panel')->unique();
            $table->timestamps();
        });

        Schema::table('permisos',function(Blueprint $t){
            $t->foreignId('panel_id')->nullable()->constrained('panels')->onDelete('set null')->cascadeOnUpdate();
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permisos', function (Blueprint $t) {
            $t->dropForeignIdFor('panel_id');
        });

        Schema::dropIfExists('panels');
    }
};
