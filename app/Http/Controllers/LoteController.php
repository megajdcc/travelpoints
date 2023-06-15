<?php

namespace App\Http\Controllers;

use App\Jobs\newLoteTarjeta;
use App\Models\Lote;
use App\Models\Tarjeta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LoteController extends Controller
{
    
    public function getLotes(){
        
        $lotes = Lote::all();

        $lotes->each(fn($lote) => $lote->cargar());

        return response()->json($lotes);

        
    }


    public function fetchData(Request $request){

        $filtro = $request->all();

        $paginator = Lote::where([
            ['fecha_llegada',"LIKE","%{$filtro['q']}%",'OR'],
            ['cantidad', "LIKE", "%{$filtro['q']}%", 'OR'],
            ['numero_inicial', "LIKE", "%{$filtro['q']}%", 'OR'],
            ['codigo_lada', "LIKE", "%{$filtro['q']}%", 'OR'],
            ['monto', "LIKE", "%{$filtro['q']}%", 'OR'],
            ['tps', "LIKE", "%{$filtro['q']}%", 'OR'],
        ])
        ->whereHas('divisa',function(Builder $q) use($filtro){
            $q->where([
                ['nombre', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['iso', "LIKE", "%{$filtro['q']}%", 'OR'],
                ['simbolo', "LIKE", "%{$filtro['q']}%", 'OR'],
            ]);
        })
        ->orderBy($filtro['sortBy']?:'id',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage'] ?: 10000);


        $lotes = collect($paginator->items())->each(fn($lote) => $lote->cargar());

        return response()->json([
            'lotes' => $lotes,
            'total' => $paginator->total()
        ]);

    }


    public function fetch(Lote $lote){

        $lote->cargar();

        return response()->json($lote);
    }


    private function validar(Request $request,Lote $lote = null){

        return $request->validate([
            'fecha_llegada'  => 'required',
            'codigo_lada'    => 'required',
            'cantidad'       => 'required',
            'numero_inicial' => ['required', $lote ? Rule::unique('lotes','numero_inicial')->ignore($lote) : 'unique:lotes,numero_inicial',function( $atr,$value,$fail) use($request){
                $cantidad = $request->get('cantidad');
                $numero_inicial = $value;
                $codigo_lada = $request->get('codigo_lada');

                for ($i = 0; $i < $cantidad; $i++) {
                    $correlativo = str_pad($numero_inicial, 5, '0', STR_PAD_LEFT);

                    $numero_tarjeta = $codigo_lada . $correlativo;

                    if($tarjeta = Tarjeta::where('numero',$numero_tarjeta)->first()){
                        $fail('Una de las tarjetas ya estan registrada en el sistema, verifica los números iniciales y finales');
                    }

                    $numero_inicial++;
                }
            }], 
            'numero_final'   => ['required', $lote ? Rule::unique('lotes', 'numero_final')->ignore($lote) : 'unique:lotes,numero_final'],
            'monto'          => 'required',
            'divisa_id'      => 'required',
            'tps'           => 'required'
        ],[
            'numero_inicial.unique' => 'El número inicial de la tarjeta en este lote, es repetido , ya hay uno en nuestro servidor con el mismo número, intente con otro',
            'numero_final.unique' => 'El número final de la tarjeta en este lote, es repetido , ya hay uno en nuestro servidor con el mismo número, intente con otro',
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

            $lote = Lote::create($datos);
            // registramos la tarjetas
            newLoteTarjeta::dispatch($lote);
            $lote->cargar();

            
           

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result,'lote' => $result ? $lote : null]);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lote $lote)
    {
        $datos = $this->validar($request,$lote);

        try {
            DB::beginTransaction();

            $lote->update($datos);

            $lote->cargar();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'lote' => $result ? $lote : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lote  $lote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lote $lote)
    {
        try {
            DB::beginTransaction();

            $lote->delete();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result]);
    }
}
