<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Divisa;

class DivisaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Divisa::create([
            'nombre'    => 'TravelPoints',
            'iso'       => 'Tp',
            'simbolo'   => '$',
            'principal' => true,
            'tasa'      => null
        ]);

    }
}
