<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;

class CiudadController extends Controller
{
    public function getCiudades()
    {

        $ciudades = Ciudad::get();


        foreach ($ciudades as $ciudad) {
            $ciudad->estado?->pais;
        }

        return response()->json($ciudades);

    }

    public function fetchData(Request $request)
    {

        $data = $request->all();


        $pagination = Ciudad::where([
            ['ciudad', 'LIKE', "%{$data['q']}%", 'OR'],
            ['estado_id', 'LIKE', "%{$data['q']}%", 'OR'],

        ])
            ->orWhereHas('estado', function (Builder $q)  use ($data) {
                $q->where([
                    ['estado', 'LIKE', "%{$data['q']}%", 'OR'],
                    ['pais_id', 'LIKE', "%{$data['q']}%", 'OR'],
                ])
                ->orWhereHas('pais',function(Builder $query) use ($data) {
                    $query->where([
                        ['pais', 'LIKE', "%{$data['q']}%", 'OR'],
                        ['codigo', 'LIKE', "%{$data['q']}%", 'OR'],
                        ['lada', 'LIKE', "%{$data['q']}%", 'OR'],
                    ]);
                });
            })

            ->orderBy($data['sortBy'] ?: 'id', $data['sortDesc'] ? 'desc' : 'asc')
            ->paginate($data['perPage'] ?: 10000);


        $ciudades = $pagination->items();

        foreach ($ciudades as $ciudad) {
            $ciudad->estado?->pais;
        }

        return response()->json([
            'ciudades' => $ciudades,
            'total' => $pagination->total()
        ]);
    }

    public function fetchCiudad(Ciudad $ciudad)
    {

        $ciudad->estado->pais;

        return response()->json($ciudad);
    }

    private function validar(Request $request, Ciudad $ciudad = null): array
    {

        return $request->validate([
            'ciudad' => ['required'],
            'estado_id' => 'required',
        ], [
            'ciudad.required' => 'El Municipio es importante no lo olvides',
            'ciudad.unique' => 'El Municipio ya está Siendo usado, intente con otro',
            'estado_id.required' => 'El Estado es importante no lo olvides'
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


            $ciudad = Ciudad::create($this->validar($request));

            $ciudad->estado->pais;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }


        return response()->json(['result' => $result, 'ciudad' => $result ? $ciudad : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ciudad  $ciudad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ciudad $ciudad)
    {

        try {
            DB::beginTransaction();

            $ciudad->update($this->validar($request, $ciudad));
            $ciudad->estado->pais;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'ciudad' => $ciudad]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ciudad  $ciudad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ciudad $ciudad)
    {
        try {
            DB::beginTransaction();

            $result = $ciudad->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
