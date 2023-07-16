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

        
        Schema::create('mensajes_vonages', function (Blueprint $table) {
            $table->id();
            $table->string('msisdn')->nullable();
            $table->string('to')->nullable();
            $table->string('messageId')->nullable();
            $table->string('text')->nullable();
            $table->string('type')->nullable();
            $table->string('keyword')->nullable();
            $table->string('message-timestamp')->nullable();
            $table->string('timestamp')->nullable();
            $table->string('nonce')->nullable();
            $table->string('concat')->nullable();
            $table->string('concat-ref')->nullable();
            $table->string('concat-total')->nullable();
            $table->string('concat-part')->nullable();
            $table->string('data')->nullable();
            $table->string('udh')->nullable();
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
        Schema::dropIfExists('mensajes_vonages');
    }
};
