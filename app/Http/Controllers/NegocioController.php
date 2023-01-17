<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Negocio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,Storage,File};
use App\Models\Imagen;
use App\Models\Red;
class NegocioController extends Controller
{

    public function fetch(Negocio $negocio){
        $negocio->cargar();
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
            $negocio->cargar();


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
            'telefonos' => 'nullable',
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
            'iata_id' => 'nullable',
            'precios' => 'nullable'
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

        $datos = $this->validar($request, $negocio);

        try{
            DB::beginTransaction();

            $negocio->update($datos);
            

            foreach($datos['telefonos'] as $telefono){
                $negocio->actualizarTelefono($telefono);
            }
            

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }

        $negocio->cargar();

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

            $negocio->cargar();



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

        $negocio->cargar();

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

        $negocio->cargar();

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

        $negocio->cargar();


        return response()->json(['result' => $result,'negocio' => $negocio]);

    }

    public function aperturarHorario(Negocio $negocio){
        
        $negocio->aperturarHorario();

        $negocio->cargar();

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

        $negocio->cargar();


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

        $negocio->cargar();


        return response()->json(['result' => $result,'negocio' => $negocio]);
    }


    public function cargarNegocioEmpleado(Request $request, int|string $ultimoNegocio = null){


        if($ultimoNegocio){
            $negocio = $request->user()->negocios->where('id',$ultimoNegocio)->first();
        }else{
            $negocio = $request->user()->negocios->first();
        }

        $negocio->cargar();

        return response()->json($negocio);
        
    }

    public function cambiarNegocioEmpleado(Negocio $negocio){
        $negocio->cargar();
        return response()->json(['result' => $negocio->id ? true : false , 'negocio' => $negocio]);
    }

    public function guardarAmenidad(Request $request,Negocio $negocio){

        $amenidades = $request->get('amenidads');

            try{
                DB::beginTransaction();
                    $negocio->amenidades()->detach();

                    foreach($amenidades as $amenidad){
                        $negocio->amenidades()->attach(is_array($amenidad) ? $amenidad['id'] : $amenidad);
                    }

                DB::commit();
                $result =    true; 
            }catch(\Exception $e){
                DB::rollBack();
                $result = false;

            }
        $negocio->cargar();


        return response()->json(['result' => $result,'negocio' => $negocio]);
        
    }

    public function guardarFormasPagos(Request $request, Negocio $negocio){
        $formas_pago = $request->get('formas');

        try {
            DB::beginTransaction();
            $negocio->formasPago()->detach();

            foreach ($formas_pago as $forma) {
                $negocio->formasPago()->attach(is_array($forma) ? $forma['id'] : $forma);
            }

            DB::commit();
            $result =    true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }
        $negocio->cargar();


        return response()->json(['result' => $result, 'negocio' => $negocio]);
    }

    public function agregarRed(Request $request, Negocio $negocio){

        try{
            DB::beginTransaction();
            $negocio->agregarRed($request->all());

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }
        
        $negocio->cargar();

        return response()->json(['result' => $result, 'negocio' => $negocio]);

    }

    public function quitarRed(Negocio $negocio,Red $red){
        try {
            DB::beginTransaction();
            $negocio->quitarRed($red);
            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        $negocio->cargar();

        return response()->json(['result' => $result, 'negocio' => $negocio]);
        
    }

    public function quitarRedes(Negocio $negocio){
        try {
            DB::beginTransaction();
                $negocio->quitarRedes();
            DB::commit();
            
                $result = true;
        } catch (\Exception $e) {
            
            DB::rollBack();
            $result = false;
          
        }

        $negocio->cargar();

        return response()->json(['result' => $result, 'negocio' => $negocio]);
    }


}
