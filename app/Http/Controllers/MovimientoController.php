<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use Illuminate\Http\Request;
use App\Models\EstadoCuenta;

use App\Models\User;
use App\Models\Negocio\Negocio;
use App\Models\Divisa;
use App\Models\Sistema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;


class MovimientoController extends Controller
{
    
    public function getMovimientos(EstadoCuenta $cuenta){

        $movimientos = $cuenta->movimientos;
        return response()->json($movimientos);

    }

    public function descargarReport(Request $request){
        $datos = $request->all();
        $fechas = collect([]);

        if ($request->has('fechas') && !is_null($request->get('fechas')) && (Str::length($request->get('fechas')) > 10)) {

            $fechas = collect([
                Str::before($request->input('fechas'), ' '),
                Str::afterLast($request->input('fechas'), ' '),
            ]);
        }


        switch ($datos['model_type']) {

            case 'User':
                $model = User::find($datos['model_id']);
                $model->cargar();
                break;

            case 'Negocio':

                $model = Negocio::find($datos['model_id']);
                break;

            case 'Sistema':
                $rol = $request->user()->rol;
                $model = $request->user();
                if (in_array($rol->nombre, ['Desarrollador', 'Administrador'])) {
                    $model = Sistema::find($datos['model_id']);
                }
                break;
        }
        if (!$model->cuenta) {
            $cuenta = $model->aperturarCuenta();
        } else {
            $cuenta = $model->cuenta;
        }

        $divisa = $cuenta->divisa;

        $pagination = Movimiento::where('estado_cuenta_id', $cuenta->id)
            ->where([
                ['monto', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['balance', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['created_at', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['concepto', 'LIKE', "%{$datos['q']}%", 'OR'],

            ])
            ->when($request->has('fechas') && !empty($request->get('fechas')) && $fechas->count() > 1, function ($query) use ($fechas) {
                $query->whereBetween('created_at', [$fechas->first(), $fechas->last()]);
            })
            ->orderBy($datos['sortBy'], $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 1000, pageName: 'currentPage');


        $movimientos = collect($pagination->items())->each(fn ($val) => $val->cargar());
       
        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));
        $avatar  = "data:image/png;base64," . base64_encode(Storage::disk('img-perfil')->get($model->getImagen() ?: 'default.jpg'));

        $data = [
            'movimientos' => $movimientos,
            'usuario' => $model,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
            'avatar' => $avatar,
            'isLider' => true
        ];


        $pdf = Pdf::loadView('reports.edoCuenta', $data);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Movimientos de cuenta.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url("public/reportes/{$nombre}"),
            'filename' => $nombre]);
    }

    public function fetchData(Request $request){

        $datos = $request->all();
        $fechas = collect([]);

   
        if($request->has('fechas') && !is_null($request->get('fechas')) && (Str::length($request->get('fechas')) > 10)){
           
            $fechas = collect([
                Str::before($request->input('fechas'),' '),
                Str::afterLast($request->input('fechas'),' '),
            ]);
        }


        switch ($datos['model_type']){
            
            case 'User':
                $model = User::find($datos['model_id']);
                break;

            case 'Negocio':

                $model = Negocio::find($datos['model_id']);
                break;

            case 'Sistema':
                $rol = $request->user()->rol;
                $model = $request->user();
                if(in_array($rol->nombre,['Desarrollador','Administrador'])){
                    $model = Sistema::find($datos['model_id']);
                }
                break;

        }

        if(!$model->cuenta){
            $cuenta = $model->aperturarCuenta();
        }else{
            $cuenta = $model->cuenta;
        }

        $divisa = $cuenta->divisa;

        $pagination = Movimiento::where('estado_cuenta_id',$cuenta->id)
                            ->where([
                                ['monto','LIKE',"%{$datos['q']}%",'OR'],
                                ['balance', 'LIKE', "%{$datos['q']}%", 'OR'],
                                ['created_at', 'LIKE', "%{$datos['q']}%", 'OR'],
                                ['concepto', 'LIKE', "%{$datos['q']}%", 'OR'],

                            ])
                            ->when($request->has('fechas') && !empty($request->get('fechas')) && $fechas->count() > 1,function($query)use($fechas){
                                $query->whereBetween('created_at', [$fechas->first(),$fechas->last()]);
                            })
                            ->orderBy($datos['sortBy'],$datos['isSortDirDesc'] ? 'desc' : 'asc')
                            ->paginate($datos['perPage']?: 1000, pageName:'currentPage');

        
                $movimientos = collect($pagination->items())->each(fn($val) => $val->cargar());
                return response()->json([
                    'total' => $pagination->total(),
                    'movimientos' => $movimientos,
                    'divisa' => $divisa ?: null
                ]);

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function show(Movimiento $movimiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function edit(Movimiento $movimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Movimiento $movimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movimiento  $movimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movimiento $movimiento)
    {
        //
    }
}
