<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Negocio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,Storage,File};
use App\Models\Imagen;

class NegocioController extends Controller
{
   


    public function fetch(Negocio $negocio){
        
        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;

        return response()->json($negocio);
    }


    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Negocio::where([
            ['nombre','LIKE',"%{$datos['q']}%","OR"],
            ['breve', 'LIKE', "%{$datos['q']}%", "OR"],
            ['direccion', 'LIKE', "%{$datos['q']}%", "OR"],
            ['descripcion', 'LIKE', "%{$datos['q']}%", "OR"],
            ['emails', 'LIKE', "%{$datos['q']}%", "OR"],
            ['codigo_postal', 'LIKE', "%{$datos['q']}%", "OR"],

        ])
        ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc' : 'desc')
        ->paginate($datos['perPage']);

        
        $negocios = $paginator->items();

        foreach ($negocios as $key => $negocio) {
            $negocio->telefonos;
            $negocio->imagenes;
            $negocio->cuenta;
            $negocio->categoria;
            $negocio->solicitud;
            $negocio->encargado;
            $negocio->divisa;
            $negocio->ciudad;
            $negocio->estado?->pais;
            $negocio->eventos;
            $negocio->iata;
            $negocio->horarios;
            $negocio->likes;


        }   


        return response()->json([
            'total' => $paginator->total(),
            'negocios' => $negocios
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
        //
    }   


    private function validar(Request $request,Negocio $negocio = null) : array {

        return $request->validate([
            'nombre'          => ['required'],
            'descripcion'     => 'required',
            'breve'           => 'required',
            'categoria_id'    => 'required',
            'comision'        => 'required',
            'tipo_comision'   => 'required', 
            'url'             => 'required',
            'sitio_web'       => 'nullable',
            'emails'          => 'nullable',
            'direccion'       => 'required',
            'codigo_postal'   => 'nullable',
            'ciudad_id'       => 'nullable',
            'estado_id'       => 'required',
            'lat'             => 'nullable',
            'lng'             => 'nullable',
            'floor_plan'      => 'nullable',
            'acepta_reservas' => 'nullable',
            'usuario_id'      => 'required',
            'divisa_id'       => 'required',
            'iata_id' => 'nullable'
        ]);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Negocio $negocio)
    {
        try{
            DB::beginTransaction();

            $negocio->update($this->validar($request,$negocio));

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;



        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio  $negocio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Negocio $negocio)
    {
        try{
            DB::beginTransaction();

            $negocio->delete();
            
            DB::commit();
            $result =true;
        
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    
    }



    public function actualizarLogo(Request $request, Negocio $negocio){

        $logo = $request->file('logotipo');
        try{
            DB::beginTransaction();

            Storage::disk('public')->delete("negocios/logos/{$negocio->logo}");

            $logo_name = \sha1($logo->getClientOriginalName()).'.'.$logo->getClientOriginalExtension();

            Storage::disk('public')->put("negocios/logos/{$logo_name}",File::get($logo));

            $negocio->update(['logo' => $logo_name]);

            $negocio->telefonos;
            $negocio->imagenes;
            $negocio->cuenta;
            $negocio->categoria;
            $negocio->solicitud;
            $negocio->encargado;
            $negocio->divisa;
            $negocio->ciudad;
            $negocio->estado?->pais;
            $negocio->eventos;
            $negocio->iata;
            $negocio->horarios;
            $negocio->likes;


            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'negocio' => $negocio]);
    }


    public function addImagen(Request $request, Negocio $negocio){

        try{
            DB::beginTransaction();
            
            foreach($request->file('imagenes') as $imagen){
                
                $imagen_name = \sha1($imagen->getClientOriginalName()).'.'.$imagen->getClientOriginalExtension();
                Storage::disk('public')->put("negocios/fotos/{$imagen_name}",File::get($imagen));

                $negocio->addImagen([
                   'imagen' => $imagen_name,
                   'portada' => false,
                   'logo' => false
                ]);
            
            }
            

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());

        }

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;



        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    public function eliminarImagen(Imagen $imagen){

        $negocio = $imagen->model;

        try{
            DB::beginTransaction();
                
                $result = Storage::disk('public')->delete("negocios/fotos/{$imagen->imagen}");

                if($result){
                $imagen->delete();
                }
               


            DB::commit();
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;

        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    public function togglePortada(Request $request,Negocio $negocio, Imagen $imagen){

        try{
            
            DB::beginTransaction();
            
            foreach($negocio->imagenes->where('portada',true) as $image){
                $image->portada = false;
                $image->save();
            }

            $imagen->update(['portada' => $request->get('portada')]);
            $negocio->save();
            
            DB::commit();
            $result = true;

        }catch(\Exception $e){

            DB::rollBack();
            $result =false;
        
        }

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;


        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    public function aperturarHorario(Negocio $negocio){
        
        $negocio->aperturarHorario();

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;

        return response()->json(['result' => true, 'negocio' => $negocio]);
    }


    public function addTelefono(Request $request, Negocio $negocio){

        try{
            DB::beginTransaction();

            $datos = $request->all();

            $negocio->addTelefono($datos);


            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }   

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;


        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    public function quitarHorario(Negocio $negocio){

        try{
            DB::beginTransaction();

            $negocio->quitarHorario();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        $negocio->telefonos;
        $negocio->imagenes;
        $negocio->cuenta;
        $negocio->categoria;
        $negocio->solicitud;
        $negocio->encargado;
        $negocio->divisa;
        $negocio->ciudad;
        $negocio->estado?->pais;
        $negocio->eventos;
        $negocio->iata;
        $negocio->horarios;
        $negocio->likes;


        return response()->json(['result' => $result,'negocio' => $negocio]);
    }



}
