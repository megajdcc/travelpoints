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
        Schema::create('vav', function (Blueprint $table) {

            $table->foreignId('video_academia_id')->constrained('academia_videos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('video_id')->constrained('videos')->cascadeOnDelete()->cascadeOnUpdate();

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
        Schema::dropIfExists('vav');
    }
};
