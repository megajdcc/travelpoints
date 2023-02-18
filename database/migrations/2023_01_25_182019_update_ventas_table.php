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
        Schema::table('ventas',function(Blueprint  $t){
            $t->integer('personas')->default(1);
            $t->tinyInteger('tipo_comision')->nullable();
            $t->foreignId('reservacion_id')->nullable()->constrained('reservacions')->cascadeOnUpdate()->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ventas', function (Blueprint  $t) {
            $t->dropColumn('personas'); 
            $t->dropColumn('tipo_comision');
            $t->dropConstrainedForeignId('reservacion_id');
        });
    }
};
