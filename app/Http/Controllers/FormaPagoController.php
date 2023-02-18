<?php

namespace App\Http\Controllers;

use App\Models\FormaPago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class FormaPagoController extends Controller
{

    public function getAll()
    {

        return response()->json(FormaPago::with('negocios')->get());
    }


    public function fetchData(Request $request)
    {

        $datos = $request->all();

        $paginator = FormaPago::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
            ->with('negocios')
            ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'formas' => $paginator->items()
        ]);
    }

    private function validar(Request $request, FormaPago $forma = null): array
    {
        return $request->validate([
            'nombre' => ['required', $forma ? Rule::unique('forma_pagos', 'nombre')->ignore($forma) : 'unique:forma_pagos,nombre']
        ], [
            'nombre.unique' => 'El nombre ya está siendo usado, inténte con otro'
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
            $FormaPago = FormaPago::create($datos);

            $FormaPago->negocios;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        return response()->json(['result' => $result, 'forma' => $result ? $FormaPago : null]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FormaPago  $formas_pago
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FormaPago $formas_pago)
    {
        $datos = $this->validar($request, $formas_pago);

        try {
            DB::beginTransaction();
            $formas_pago->update($datos);

            $formas_pago->negocios;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'forma' => $result ? $formas_pago : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FormaPago  $forma
     * @return \Illuminate\Http\Response
     */
    public function destroy(FormaPago $formas_pago)
    {
        try {
            DB::beginTransaction();
            $formas_pago->delete();
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function fetch(FormaPago $forma)
    {
        return response()->json($forma->load('negocios'));
    }

}
