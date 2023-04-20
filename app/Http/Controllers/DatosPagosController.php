<?php

namespace App\Http\Controllers;

use App\Models\DatosPagos;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DatosPagosController extends Controller
{
    

    public function fetch(Request $request,User $usuario){
        
        $datos = $usuario->datosPago?->load(['divisa','pais','ciudad.estado']);

        return response()->json($datos);

    }



    private function validar(Request $request,DatosPagos $datos = null) : Collection{

        return collect($request->validate(
            ['metodo_pago' => 'required',
            'pais_id'             => 'nullable',
            'ciudad_id'           => 'nullable',
            'nombre_banco'        => 'required_if:metodo_pago,1',
                'direccion_banco' => 'nullable',
                'titular'         => 'required_if:metodo_pago,1',
                'iban'            => 'required_if:metodo_pago,1',
                'swift'           => 'required_if:metodo_pago,1',
                'numero_cuenta' => 'required_if:metodo_pago,1',
                'email'           => 'required_if:metodo_pago,2,3',
                'usuario_id'      => 'required'
        ],[
            'metodo_pago.required'         => 'El metodo de pago es importante no debe falta, seleccione un metodo',
            'nombre_banco.required_if' => 'El nombre del banco es importante',
            'titular.required_if'      => 'El titular de la cuenta es importante',
            'iban.required_if'         => 'Este campo es obligatorio',
            'swift.required_if'        => 'Este campo es obligatorio',
                'numero_cuenta.required_if' => 'Este campo es obligatorio',
            'email.required_if'        => 'Este campo es importante, no lo olvides',
            'usuario_id.required'          => 'El usuario siempre debe estar presente, no lo olvides',
        ]
        ));
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

            $datosPago = DatosPagos::create($datos->toArray());
            $datosPago->load(['divisa','usuario','pais','ciudad.estado']);

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());

        }

        return response()->json([
            'result' => $result,
            'datos' => $datosPago
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DatosPagos  $datosPagos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DatosPagos $datos_pago)
    {
        $datos = $this->validar($request, $datos_pago);

        try {
            DB::beginTransaction();

            $datos_pago->update($datos->toArray());

            $datos_pago->load(['divisa', 'usuario', 'pais', 'ciudad.estado']);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'datos' => $datos_pago
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DatosPagos  $datosPagos
     * @return \Illuminate\Http\Response
     */
    public function destroy(DatosPagos $datos_pago)
    {
        $result = $datos_pago->delete();

        return response()->json(['result' => $result]);

    }
}
