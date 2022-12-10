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
        Schema::create('estado_cuentas', function (Blueprint $table) {
            $table->id();
            $table->decimal('saldo')->default(0);
            $table->string('model_type');
            $table->unsignedBigInteger('model_id');
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->cascadeOnUpdate()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estado_cuentas');
    }
};
