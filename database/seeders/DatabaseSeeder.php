<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
<<<<<<< HEAD
        	UserSeeder::class,
            PaisSeed::class,
            EstadoSeed::class,
            CiudadSeed::class
        ]);
    }
}
=======
            DivisaSeed::class,
        	UserSeeder::class,
            PaisSeed::class,
            EstadoSeed::class,
            CiudadSeed::class,
            SistemaSeed::class
        ]);
    }
}
 
>>>>>>> vite
