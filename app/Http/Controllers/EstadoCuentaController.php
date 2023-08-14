<?php

namespace App\Http\Controllers;

use App\Models\EstadoCuenta;
use App\Models\Movimiento;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB, Storage};

use Illuminate\Database\Eloquent\Builder;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as PDFB;

class EstadoCuentaController extends Controller
{
   

    public function getCuentas(){
        
        $cuentas = EstadoCuenta::all();

        foreach($cuentas as $cuenta){

            $cuenta->model;
            $cuenta->divisa;
            $cuenta->movimientos;
        
        }


        return response()->json($cuentas);

    
    }   


    public function fetchData(Request $request){

        $datos = $request->all();


        $pagination = EstadoCuenta::where([
            ['saldo','LIKE',"%{$datos['q']}%",'OR'],
        ])->whereHas('divisa', function(Builder $q) use($datos){
            $q->orWhere([
                ['nombre','LIKE',"%{$datos['q']}%",'OR'],
                ['iso', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['simbolo', 'LIKE', "%{$datos['q']}%", 'OR'],
            ]);
        })->orderBy($datos['sortBy'],$datos['isSortDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


        $cuentas = $pagination->items();

        foreach($cuentas as $cuenta){
            $cuenta->model;
            $cuenta->divisa;
            $cuenta->movimientos;
        }

        return response()->json([
            'cuentas' => $cuentas,
            'total' => $pagination->total(),
        ]);


    }

    private function validar(Request $request, EstadoCuenta $cuenta = null) : array{

        return $request->validate([
            'saldo'      => 'nullable',
            'model_type' => 'required',
            'model_id'   => 'required',
            'divisa_id'  => 'required'
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
        try{
            DB::beginTransaction();

            $cuenta = EstadoCuenta::create($this->validar($request));
            $cuenta->movimientoApertura();

            $cuenta->divisa;
            $cuenta->model;
            $cuenta->movimientos;

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'cuenta' => $result ? $cuenta : null]);

    }
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EstadoCuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EstadoCuenta $cuenta)
    {
        try{
            DB::beginTransaction();

            $cuenta->update($this->validar($request,$cuenta));

            $cuenta->divisa;
            $cuenta->model;
            $cuenta->movimientos;

            DB::commit();

            $result = true;
            
        }catch(\Exception $e){
            DB::rollback();
            $result = false;
        }

        return response()->json(['cuenta' => $cuenta,'result' => $result]);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EstadoCuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function destroy(EstadoCuenta $cuenta)
    {
        try{

            DB::beginTransaction();
            $cuenta->delete();
            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }

    public function descargar(Request $request){
        $usuario = $request->user();
        $movimientos = Movimiento::whereHas('cuenta', function (Builder $q) use ($usuario) {
            $q->where('model_type', $usuario->model_type)->where('model_id', $usuario->id);
        })->orderBy('id', 'desc')
        ->get();
        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        
        $pdf = Pdf::loadView('reports.movimientos',[
            'cuenta' => $usuario->cuenta,
            'movimientos' => $movimientos,
            'usuario' => $usuario,
            'logotipo' => $imagenBase64,
            'divisa' => $usuario->cuenta->divisa

        ]);
        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);
        
        $pdf->setPaper('a4', 'landscape');
        return $pdf->download('Estado de Cuenta.pdf');
    

    }
}
