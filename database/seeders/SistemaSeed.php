<?php

namespace Database\Seeders;

use App\Models\Divisa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Sistema;

class SistemaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
       $sistema =  Sistema::create([
            'nombre' => 'TravelPoints',
            'divisa_id' => Divisa::where('principal',true)->first()->id
        ]);

        $sistema->aperturarCuenta();
        
    }
}
