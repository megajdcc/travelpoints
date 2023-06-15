<?php

namespace App\Http\Controllers;

use App\Models\Tarjeta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TarjetaController extends Controller
{
    public function getTarjetas()
    {

        $tarjetas = Tarjeta::all();

        $tarjetas->each(fn ($tarjeta) => $tarjeta->cargar());

        return response()->json($tarjetas);
    }


    public function fetchData(Request $request)
    {

        $filtro = $request->all();

        $paginator = Tarjeta::where([
            ['numero', "LIKE", "%{$filtro['q']}%", 'OR'],
        ])
            ->whereHas('lote', function (Builder $q) use ($filtro) {
                $q->where([['fecha_llegada', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['cantidad', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['numero_inicial', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['codigo_lada', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['monto', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['tps', "LIKE", "%{$filtro['q']}%", 'OR'],
                ]);
            })
            ->when($filtro['lote'] && !empty($filtro['lote']),function($q) use($filtro){
                $q->where('lote_id',$filtro['lote']);
            })
            ->orderBy($filtro['sortBy'] ?: 'id', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($filtro['perPage'] ?: 10000);


        $tarjetas = collect($paginator->items())->each(fn ($tarjeta) => $tarjeta->cargar());

        return response()->json([
            'tarjetas' => $tarjetas,
            'total' => $paginator->total()
        ]);
    }


    public function fetch(Tarjeta $tarjeta)
    {

        $tarjeta->cargar();

        return response()->json($tarjeta);
    }


    private function validar(Request $request, Tarjeta $tarjeta = null)
    {

        return $request->validate([
            'numero'  => 'required',
            'lote_id'    => 'required',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $tarjeta = Tarjeta::create($datos);
            $tarjeta->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'tarjeta' => $result ? $tarjeta : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tarjeta  $tarjeta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tarjeta $tarjeta)
    {
        $datos = $this->validar($request, $tarjeta);

        try {
            DB::beginTransaction();

            $tarjeta->update($datos);

            $tarjeta->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'tarjeta' => $result ? $tarjeta : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tarjeta  $tarjeta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tarjeta $tarjeta)
    {
        try {
            DB::beginTransaction();
            $tarjeta->delete();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
