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
        Schema::create('var', function (Blueprint $table) {
            
            $table->foreignId('video_academia_id')->constrained('academia_videos')->cascadeOnDelete()->cascadeOnUpdate();
            
            $table->foreignId('rol_id')->constrained('rols')->cascadeOnDelete()->cascadeOnUpdate();
            
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
        Schema::dropIfExists('var');
    }
};
