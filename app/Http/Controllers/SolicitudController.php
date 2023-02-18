<?php

namespace App\Http\Controllers;

use App\Models\Negocio\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\{DB,Storage,File,Notification};
use App\Notifications\NuevaSolicitudNegocio;

use App\Models\User;

use App\Notifications\{SolicitudNegocioActualizada,SolicitudEnviada};
<<<<<<< HEAD

class SolicitudController extends Controller
{
    
=======
use App\Models\Negocio\Negocio;
use App\Models\Usuario\Permiso;

class SolicitudController extends Controller
{

    public function getAll(){
        
        $solicitudes = Solicitud::get();


        foreach ($solicitudes as $key => $solicitud) {


            $solicitud->categoria;
            $solicitud->usuario;
            $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
            $solicitud->ciudad;
            $solicitud->estado->pais;
            $solicitud->divisa;
            $solicitud->iata;


            
        }

        return response()->json($solicitudes);
        
    }
>>>>>>> vite

    public function getSolicitud(Solicitud $solicitud){

        $solicitud->categoria;
        $solicitud->usuario;
        $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
        $solicitud->ciudad;
        $solicitud->estado->pais;
<<<<<<< HEAD
=======
        $solicitud->divisa;
        $solicitud->iata;

>>>>>>> vite

        return response()->json($solicitud);

    }


    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Solicitud::where([
            ['nombre','LIKE',"%{$datos['q']}%",'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['breve', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['codigo_postal', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['telefono', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['direccion', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])->orWhereHas('categoria',function(Builder $q) use($datos) {
                $q->where([
                    ['categoria', 'LIKE', "%{$datos['q']}%", 'OR'],
                ]);
        })
        ->orderBy($datos['sortBy'],$datos['sortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);

        $solicitudes = $paginator->items();

        foreach ($solicitudes as $solicitud) {
            $solicitud->categoria;
<<<<<<< HEAD
            $solicitud->usuario;
            $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
            $solicitud->ciudad;
            $solicitud->estado->pais;
=======
            
            if($solicitud->usuario){
                $solicitud->usuario->avatar = $solicitud->usuario->getAvatar();
            }
            
            $solicitud->ciudad;
            $solicitud->estado->pais;
            $solicitud->divisa;
            $solicitud->iata;


>>>>>>> vite
        }

        return response()->json([
            'solicitudes' => $solicitudes,
            'total' => $paginator->total()
        ]);

    }


    private function validar(Request $request,Solicitud $solicitud = null) :array{

<<<<<<< HEAD
=======
       
>>>>>>> vite
        
        $result = $request->validate([
            'id'            => 'nullable',
            'nombre'        => 'required',
            'descripcion'   => 'required',
            'breve'         => 'required',
            'categoria_id'  => 'required',
<<<<<<< HEAD
=======
            'tipo_comision' => 'required',
>>>>>>> vite
            'comision'      => 'required',
            'url'           => 'required',
            'email'         => 'required',
            'telefono'      => 'required',
            'sitio_web'     => 'nullable',
            'direccion'     => 'required',
            'codigo_postal' => 'required',
            'ciudad_id'     => 'nullable',
            'estado_id'     => 'required',
            'lat'           => 'required',
            'lng'           => 'required',
            'situacion' => 'nullable',
<<<<<<< HEAD
            'logo'          => 'required_without:id|nullable|image|max:2048',
            'foto'          => 'required_without:id|nullable|image|max:2048',
            'comentario' => 'nullable'
=======
            'logo'          => 'bail|required_without:id|nullable|max:2048',
            'foto'          => 'bail|required_without:id|nullable|max:2048',
            'comentario' => 'nullable',
            'panel' => 'nullable',
            'divisa_id' => 'required',
            'iata_id' => 'nullable'
>>>>>>> vite
        ],[
            'logo.required_without' => 'El logo es importante no lo olvides',
            'foto.required_without' => 'La foto es importante no lo olvides',
            'logo.image' => 'El logo no es valido',
            'foto.image' => 'La foto del negocio no es valida',
<<<<<<< HEAD
            'logo.max'   => 'El logo no puede ser mayor a 2 kb',
            'logo.mimes' => 'El logo debe estar en formato jpg o png',
            'foto.max'   => 'La foto no puede ser mayor a 2 kb',
=======
            'logo.max'   => 'El logo no puede ser mayor a 2 mb',
            'logo.mimes' => 'El logo debe estar en formato jpg o png',
            'foto.max'   => 'La foto no puede ser mayor a 2 mb',
>>>>>>> vite
            'foto.mimes' => 'La foto debe estar en formato jpg o png'
        ]);

      
        return $result;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
<<<<<<< HEAD
    {
        
=======
    {   

        $datos = $this->validar($request);

        // return response()->json(['result' => false,'request' => $datos]);
>>>>>>> vite
        try{
            DB::beginTransaction();

            $logo = $request->file('logo');
            $foto = $request->file('foto');
            
<<<<<<< HEAD
=======
        
>>>>>>> vite
            $logo_name = \sha1($logo->getClientOriginalName()).'.'.$logo->getClientOriginalExtension();
            
            $foto_name = \sha1($foto->getClientOriginalName()) . '.' . $foto->getClientOriginalExtension();

            Storage::disk('public')->put("negocios/logos/{$logo_name}",File::get($logo));
<<<<<<< HEAD
            Storage::disk('public')->put("negocios/fotos/{$foto_name}", File::get($foto));

            

            $solicitud = Solicitud::create([...$this->validar($request),...[
=======

            Storage::disk('public')->put("negocios/fotos/{$foto_name}", File::get($foto));

            
        
            $solicitud = Solicitud::create([...$datos,...[
>>>>>>> vite
                'usuario_id' => $request->user()->id,
                'logo' => $logo_name,
                'foto' => $foto_name
                ]]);

            DB::commit();
            $result =true;
            
            Notification::send(
                User::whereHas('rol',fn(Builder $q) => $q->where('nombre','Administrador'))->get(),
                new NuevaSolicitudNegocio($solicitud)
            );

            $solicitud->usuario->notify(new SolicitudEnviada($solicitud));


<<<<<<< HEAD
        }catch(\Exception $e){
            DB::rollBack();
            $result =false;
        }

        $solicitud->categoria;
        $solicitud->usuario;
        $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
        $solicitud->ciudad;
        $solicitud->estado->pais;
=======
                $solicitud->categoria;
                $solicitud->usuario;
                $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
                $solicitud->ciudad;
                $solicitud->estado->pais;
                $solicitud->divisa;
                $solicitud->iata;



        }catch(\Exception $e){
            DB::rollBack();
            $result =false;
            dd($e->getMessage());
        }

>>>>>>> vite


        return response()->json(['result' => $result,'solicitud' => $result ? $solicitud : null]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\Solicitud  $solicitud
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Solicitud $solicitud)
    {

        $datos = $this->validar($request);
        $logo_name = null;
        $foto_name = null;
        try {
            DB::beginTransaction();

            if($datos['logo']){
                $img_log = \explode("/",$solicitud->logo)[count(\explode("/", $solicitud->logo)) - 1];

                Storage::disk('public')->delete("negocios/logos/{$img_log}");

                $logo = $request->file('logo');
                $logo_name = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();
                Storage::disk('public')->put("negocios/logos/{$logo_name}", File::get($logo));
            }

            if ($datos['foto']) {
                $img_fot = \explode("/", $solicitud->foto)[count(\explode("/", $solicitud->logo)) - 1];

                Storage::disk('public')->delete("negocios/fotos/{$img_fot}");

                $foto = $request->file('foto');
                $foto_name = \sha1($foto->getClientOriginalName()) . '.' . $foto->getClientOriginalExtension();
                Storage::disk('public')->put("negocios/fotos/{$foto_name}", File::get($foto));

            }
            
            $solicitud->update([...\array_filter($datos, fn ($key)  => !\in_array($key, ['foto', 'logo']), \ARRAY_FILTER_USE_KEY)]);

            if($logo_name){
                $solicitud->logo = $logo_name;
            }

            if ($foto_name) {
                $solicitud->foto = $foto_name;
            }

            $solicitud->save();

            DB::commit();
            $result = true;

            if($solicitud->usuario_id === $request->user()->id){
<<<<<<< HEAD
                
                Notification::send(
                    User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Administrador'))->get(),
                    new NuevaSolicitudNegocio($solicitud)
                );
                
                $solicitud->usuario->notify(new SolicitudEnviada($solicitud));

=======
               
                if(isset($datos['panel']) && $datos['panel'] == 'infochannel'){
                    
                    $solicitud->usuario->notify(new SolicitudNegocioActualizada($solicitud));
                    
                }else{

                    Notification::send( User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Administrador'))->get(), new NuevaSolicitudNegocio($solicitud));

                    $solicitud->usuario->notify(new SolicitudEnviada($solicitud));

                }
>>>>>>> vite

            }else{
                $solicitud->usuario->notify(new SolicitudNegocioActualizada($solicitud));
            }   


            if($solicitud->situacion == 3){
<<<<<<< HEAD
                // Crear negocio
            }
            
        }catch(\Exception $e) {
            dd($e);
            DB::rollBack();
            $result = false;
=======

                // Crear negocio
               
                $negocio = Negocio::create([
                    ...[
                        'status' => true,
                        'emails' => [['email' => $solicitud->email, 'principal' => true]],
                    ],
                    ...\array_filter($solicitud->toArray(),fn($key) => !\in_array($key,['comentario','telefono','situacion','email']) )
                 ]);

                $negocio->aperturarCuenta();

                $negocio->addTelefono([
                    'telefono'=> $solicitud->telefono,
                    'principal' => true,
                ]);

                $negocio->addImagen([
                    'imagen' => $solicitud->foto,
                    'portada' => true,
                    'logo' => false
                ]);
                
                $negocio->asignarEmpleado($negocio->encargado,$negocio->primerCargo());
                $permisos = Permiso::whereHas('panel', fn (Builder $q) => $q->where('panel', 'Negocio'))->get();
                $negocio->encargado->asignarPermisos($permisos);
             
            

            }
            
        }catch(\Exception $e) {
           
            DB::rollBack();
            $result = false;
            dd($e);
>>>>>>> vite
        }

            $solicitud->categoria;
            $solicitud->usuario;
            $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
            $solicitud->ciudad;
            $solicitud->estado->pais;
<<<<<<< HEAD



=======
            $solicitud->divisa;
            $solicitud->iata;
>>>>>>> vite

        return response()->json(['result' => $result, 'solicitud' => $result ? $solicitud : null]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\Solicitud  $solicitud
     * @return \Illuminate\Http\Response
     */
    public function destroy(Solicitud $solicitud)
    {
<<<<<<< HEAD
        //
=======
        try{
            DB::beginTransaction();
            Storage::disk('public')->delete("negocios/logos/{$solicitud->logo}");
            Storage::disk('public')->delete("negocios/fotos/{$solicitud->foto}");

            $solicitud->delete();
            $result = true;
            DB::commit();

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

>>>>>>> vite
    }
}