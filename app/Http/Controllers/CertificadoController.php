<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Negocio;
use App\Models\Negocio\Certificado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CertificadoController extends Controller
{
    

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Certificado::where([
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
            'certificados' => $paginator->items()
        ]);

    }


    public function fetch(Certificado $certificado){
        $certificado->load(['negocio','divisa']);

        return response()->json($certificado);

    }


    public function getAll(Negocio $negocio){

        $certificados = $negocio->certificados->load(['negocio','divisa']);

        return response()->json($certificados);

    }

    private function validar(Request $request): array{

        return $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'condiciones' => 'nullable',
            'restricciones' => 'nullable',
            'imagen' => 'nullable',
            'expide' => 'required',
            'vence' => 'required',
            'disponibles' => 'required',
            'precio' => 'required',
            'divisa_id' => 'required',
            'negocio_id' => 'required',
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
            Storage::disk('negocio_certificados')->put($imagen_name,File::get($imagen));

            $certificado = Certificado::create([...$this->validar($request),...['imagen' => $imagen_name,'activo' => true]]);

            DB::commit();
            $result = true;
            $certificado->load(['negocio','divisa']);

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }
    

        return response()->json(['result' => $result, 'certificado' => $result ? $certificado :null]);


    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Negocio\Certificado  $certificado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Certificado $certificado)
    {
        try {
            DB::beginTransaction();

            $imagen = $request->file('imagen');

            if($imagen){

                Storage::disk('negocio_certificados')->delete($certificado->imagen);

                $imagen = $request->file('imagen');
                $imagen_name = \sha1($imagen->getClientOriginalName()) . '.' . $imagen->getClientOriginalExtension();
                Storage::disk('negocio_certificados')->put($imagen_name, File::get($imagen));

            }

            $certificado->update([
                ...[$this->validar($request)],
                ...['imagen' => isset($imagen_name) ? $imagen_name : $certificado->imagen]
            ]);


           

            DB::commit();
            $result = true;
            $certificado->load(['negocio', 'divisa']);
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'certificado' => $result ? $certificado : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Negocio\Certificado  $certificado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Certificado $certificado)
    {
        try{
            DB::beginTransaction();

                Storage::disk('negocio_certificados')->delete($certificado->imagen);
            
                $certificado->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

}
