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
            $t->dropConstrainedForeignId('tienda_id');
            $t->foreignId('divisa_id')->nullable()->constrained('divisas')->onDelete('set null')->cascadeOnUpdate();
            $t->dropColumn('disponibles');
        });

        Schema::create('tienda_producto',function(Blueprint $t){
            $t->foreignId('producto_id')->constrained('productos')->cascadeOnUpdate()->cascadeOnDelete();
            $t->foreignId('tienda_id')->constrained('tiendas')->cascadeOnDelete()->cascadeOnUpdate();
            $t->integer('cantidad')->default(0);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tienda_producto');

        Schema::table('productos', function (Blueprint $t) {
            $t->integer('disponibles');
            $t->dropConstrainedForeignId('divisa_id');
            $t->foreignId('tienda_id')->nullable()->constrained('tiendas')->cascadeOnDelete()->cascadeOnUpdate();
        });

    }
};
