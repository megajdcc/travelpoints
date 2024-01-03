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
        Schema::dropIfExists('retiros_impuesto');
        Schema::dropIfExists('impuestos');

        
        Schema::create('impuestos', function (Blueprint $table) {
            $table->id();
            $table->integer('cuota')->default(0);
            $table->string('abrev')->default('IVA');
            $table->foreignId('estado_id')->constrained('estados')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('divisa_id')->constrained('divisas')->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('nota')->nullable();
            $table->timestamps();
        });

        Schema::create('retiros_impuesto', function (Blueprint $t) {
            $t->bigIncrements('id');
            $t->foreignId('retiro_id');
            $t->foreignId('impuesto_id')->constrained('impuestos')->cascadeOnDelete()->cascadeOnUpdate();
            $t->decimal('monto')->default(0);
            $t->integer('cuota')->default(0);
        });

        Schema::table('retiros',function(Blueprint $t){
            $t->string('recibo')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        Schema::dropIfExists('retiros_impuesto');
        Schema::dropIfExists('impuestos');

        Schema::table('retiros',function(Blueprint $t){
            $t->dropColumn('recibo');
        });
        

    }
};
