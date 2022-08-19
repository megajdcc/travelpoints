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
        Schema::create('negocios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion');
            $table->string('breve');

            $table->foreignId('categoria_id')->nullable()->constrained('negocio_categorias')->onDelete('set null')->cascadeOnUpdate();

            $table->decimal('comision');
            $table->tinyInteger('tipo_comision')->default(1); // 1 => Porcentaje, 2 => Monto fijo por persona 
            $table->string('url');
            $table->string('email');
            $table->string('telefono');
            $table->string('sitio_web')->nullable();
            $table->text('direccion');
            $table->string('codigo_postal');

            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->onDelete('set null')
            ->cascadeOnUpdate();

            $table->foreignId('estado_id')->nullable()->constrained('estados')->onDelete('set null')
            ->cascadeOnUpdate();

            $table->string('lat');
            $table->string('lng');
            $table->string('logo');
            $table->string('foto');

            $table->string('situacion')->default(1); // 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
            $table->text('comentario')->nullable();

            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            
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
        Schema::dropIfExists('negocios');
    }
};
