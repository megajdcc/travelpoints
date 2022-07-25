<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermisosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permisos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->timestamps();
        });

        Schema::create('usuario_permisos',function(Blueprint $table){
            $table->json('action');
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('permiso_id');

            $table->foreign('usuario_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('permiso_id')->references('id')->on('permisos')->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('rol_permisos',function(Blueprint $table) {
            $table->unsignedBigInteger('rol_id');
            $table->unsignedBigInteger('permiso_id');
            $table->json('actions');
            $table->foreign('rol_id')->references('id')->on('rols')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('permiso_id')->references('id')->on('permisos')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
        Schema::dropIfExists('rol_permisos');
        Schema::dropIfExists('usuario_permisos');
        Schema::dropIfExists('permisos');
       
    }
}
