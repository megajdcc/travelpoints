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
        Schema::create('ciudads', function (Blueprint $table) {
            $table->id();
            $table->string('ciudad');
            $table->unsignedBigInteger('estado_id');
            $table->foreign('estado_id')->references('id')->on('estados')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::table('users',function(Blueprint $t){
            $t->foreignId('ciudad_id')->nullable()->constrained('ciudads')->cascadeOnUpdate()->onDelete('set null');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $t) {
            $t->dropForeign('users_ciudad_id_foreign');
            $t->dropColumn('ciudad_id');
        });
        
        Schema::dropIfExists('ciudads');
    }
};
