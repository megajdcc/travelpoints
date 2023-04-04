<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    


    public function totalViajeros(Request $request){
        $filtro  = $request->all();

        $totalViajeros = DB::table('users','u')
            ->join('ciudads as c','u.ciudad_id','c.id')
            ->join('estados as e', 'c.estado_id', 'e.id')
            ->join('pais as p', 'e.pais_id', 'p.id')
            ->selectRaw("count(u.id) as viajeros,p.pais as pais")

            ->when(isset($filtro['genero']), function($q) use($filtro){
                $q->where('u.genero',$filtro['genero']);
            })

            ->when(isset($filtro['edades']), function ($q) use ($filtro) {
                $q->whereRaw('timestampdiff(year,u.fecha_nacimiento,CURDATE()) between :first and :second',
                [':first' => $filtro['edades'][0], ':second' => $filtro['edades'][1]]);
            })

            ->when(isset($filtro['pais']), function ($q) use ($filtro) {
                $q->where('p.id',$filtro['pais']);
            })
            ->groupBy('pais')
            ->get();
            
        $categorias  = $totalViajeros->map(fn($val) => $val->pais);

        $data = collect([]);

        // dd($totalViajeros->where('pais', 'Venezuela')->map(fn($val) => $val->viajeros));

        $categorias->each(function($categoria) use($data,$totalViajeros){
            
            $totalViajeros->where('pais',$categoria)
            ->each(function($val) use($data){
                $data->push($val->viajeros);
            });
          
        });


        return response()->json(['data' => $data, 'categorias' => $categorias]);

    }
}
