<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            "CREATE VIEW pais_origen_viajero AS 
                SELECT 
                p.pais AS pais,p.codigo, COUNT(v.id) AS ventas
            FROM
                pais p
                JOIN estados e ON p.id = e.pais_id
                JOIN ciudads c ON e.id = c.estado_id
                JOIN users u ON c.id = u.ciudad_id
                JOIN rols r ON u.rol_id = r.id
                JOIN ventas v ON u.id = v.cliente_id
            WHERE
                r.nombre = 'Viajero'
            GROUP BY p.pais,p.codigo
            ORDER BY ventas DESC
            LIMIT 5"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW pais_origen_viajero');
    }
};
