<?php

namespace App\Http\Controllers;

use App\Models\Estado;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;



class EstadoController extends Controller
{
    public function getEstados()
    {

        $estados = Estado::get();


        foreach ($estados as $estado) {
            $estado->pais;
            $estado->ciudades;

        }

        return response()->json($estados);
    }

    public function fetchData(Request $request)
    {

        $data = $request->all();


        $pagination = Estado::where([
            ['estado', 'LIKE', "%{$data['q']}%", 'OR'],
            ['pais_id', 'LIKE', "%{$data['q']}%", 'OR'],
            
        ])
        ->orWhereHas('pais',function(Builder $q)  use ($data) {
            $q->where([
                ['pais', 'LIKE', "%{$data['q']}%", 'OR'],
                ['codigo', 'LIKE', "%{$data['q']}%", 'OR'],
                ['lada', 'LIKE', "%{$data['q']}%", 'OR'],
             ]);
        })

            ->orderBy($data['sortBy'] ?: 'id', $data['sortDesc'] ? 'desc' : 'asc')
            ->paginate($data['perPage'] ?: 10000);


        $estados = $pagination->items();

        foreach ($estados as $estado) {
            $estado->pais;
            $estado->ciudades;
        }

        return response()->json([
            'estados' => $estados,
            'total' => $pagination->total()
        ]);
    }

    public function fetchEstado(Estado $estado)
    {

        $estado->pais;
        $estado->ciudades;

        return response()->json($estado);
    }

    private function validar(Request $request, Estado $estado = null): array
    {

        return $request->validate([
            'estado' => ['required', $estado ? Rule::unique('estados', 'estado')->ignore($estado) : 'unique:estados,estado'],
            'pais_id' => 'required',
        ], [
            'estado.required' => 'El Pais es importante no lo olvides',
            'estado.unique' => 'El pais ya está Siendo usado, intente con otro',
            'pais_id.required' => 'El Pais es importante no lo olvides' 
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

        try {
            DB::beginTransaction();


            $estado = Estado::create($this->validar($request));

            $estado->pais;
            $estado->ciudades;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }


        return response()->json(['result' => $result, 'estado' => $result ? $estado : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estado $estado)
    {

        try {
            DB::beginTransaction();

            $estado->update($this->validar($request, $estado));

            $estado->pais;
            $estado->ciudades;


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;


        }

        return response()->json(['result' => $result, 'estado' => $estado]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Estado $estado)
    {
        try {
            DB::beginTransaction();

            $result = $estado->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
