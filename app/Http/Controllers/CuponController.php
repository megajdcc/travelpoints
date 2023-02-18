<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Negocio;
use App\Models\Negocio\Cupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CuponController extends Controller
{
    

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Cupon::where([
            ['nombre','like',"%{$datos['q']}%","OR"],
            ['descripcion', 'like', "%{$datos['q']}%", "OR"],
            ['condiciones', 'like', "%{$datos['q']}%", "OR"],
            ['restricciones', 'like', "%{$datos['q']}%", "OR"],
            ['expide', 'like', "%{$datos['q']}%", "OR"],
            ['vence', 'like', "%{$datos['q']}%", "OR"],
            ['disponibles', 'like', "%{$datos['q']}%", "OR"],
            ['precio', 'like', "%{$datos['q']}%", "OR"],
        ])
        ->where('negocio_id',$datos['negocio_id'])
        ->with(['negocio','divisa'])
        ->orderBy($datos['sortBy'] ?:'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'cupones' => $paginator->items()
        ]);

    }


    public function fetch(Cupon $cupon){
        $cupon->load(['negocio','divisa']);

        return response()->json($cupon);

    }


    public function getAll(Negocio $negocio){

        $cupones = $negocio->cupones->load(['negocio','divisa']);

        return response()->json($cupones);

    }

    private function validar(Request $request): array{

        return $request->validate([
            'nombre'        => 'required',
            'descripcion'   => 'required',
            'condiciones'   => 'nullable',
            'restricciones' => 'nullable',
            'imagen'        => 'nullable',
            'expide'        => 'required',
            'vence'         => 'required',
            'disponibles'   => 'required',
            'precio'        => 'required',
            'divisa_id'     => 'required',
            'negocio_id'    => 'required',
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

            $imagen = $request->file('imagen');

            $imagen_name = \sha1($imagen->getClientOriginalName()).'.'.$imagen->getClientOriginalExtension();
            Storage::disk('negocio_cupones')->put($imagen_name,File::get($imagen));

            $cupon = Cupon::create([...$this->validar($request),...['imagen' => $imagen_name,'activo' => true]]);

            DB::commit();
            $result = true;
            $cupon->load(['negocio','divisa']);

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }
    

        return response()->json(['result' => $result, 'cupon' => $result ? $cupon :null]);


    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Negocio\Cupon  $cupon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cupon $cupon)
    {
        try {
            DB::beginTransaction();

            $imagen = $request->file('imagen');

            if($imagen){

                Storage::disk('negocio_cupones')->delete($cupon->imagen);

                $imagen = $request->file('imagen');
                $imagen_name = \sha1($imagen->getClientOriginalName()) . '.' . $imagen->getClientOriginalExtension();
                Storage::disk('negocio_cupones')->put($imagen_name, File::get($imagen));

            }

            $cupon->update([
                ...[$this->validar($request)],
                ...['imagen' => isset($imagen_name) ? $imagen_name : $cupon->imagen]
            ]);


           

            DB::commit();
            $result = true;
            $cupon->load(['negocio', 'divisa']);
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'cupon' => $result ? $cupon : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Negocio\Cupon  $cupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cupon $cupon)
    {
        try{
            DB::beginTransaction();

                Storage::disk('negocio_cupones')->delete($cupon->imagen);
            
                $cupon->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

}
