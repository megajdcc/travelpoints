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
            $table->string('url');
            $table->decimal('comision');
            $table->json('emails');
            $table->string('sitio_web')->nullable();

            $table->text('direccion');
            $table->string('codigo_postal')->nullable();
            $table->bigInteger('vistas')->default(0);
            $table->dateTime('ultima_recarga')->nullable();
            
            $table->boolean('floor_plan')->default(false);
            $table->boolean('acepta_reservas')->default(false);

            $table->string('lat');
            $table->string('lng');

            $table->string('logo');

            
            $table->tinyInteger('tipo_comision')->default(1); // 1 => Porcentaje, 2 => Monto fijo por persona 

            $table->string('status')->default(1); // 1 => negocio activo, 2 => de vacaciones 3 => negocio fuera de servicio

            $table->foreignId('categoria_id')->nullable()->constrained('negocio_categorias')->onDelete('set null')->cascadeOnUpdate();
            
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->onDelete('set null')
                ->cascadeOnUpdate();

            $table->foreignId('estado_id')->nullable()->constrained('estados')->onDelete('set null')
                ->cascadeOnUpdate();

            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('solicitud_id')->nullable()->constrained('solicituds')->onDelete('set null')->cascadeOnUpdate();
            $table->foreignId('divisa_id')->nullable()->constrained('divisas')->onDelete('set null')->cascadeOnUpdate();


            $table->foreignId('iata_id')->nullable()->constrained('iatas')->cascadeOnUpdate()->onDelete('set null');

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
