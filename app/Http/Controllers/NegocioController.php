<?php

namespace App\Http\Controllers;

use App\Jobs\ModelTraslate;
use App\Models\Atraccion;
use App\Models\Destino;
use App\Models\Divisa;
use App\Models\Negocio\Negocio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,Storage,File};
use App\Models\Imagen;
use App\Models\Movimiento;
use App\Models\Negocio\HorarioReservacion;
use App\Models\Pais;
use App\Models\Red;
use App\Models\User;
use App\Models\Usuario\Permiso;
use App\Models\Video;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use DateTime;

use Illuminate\Database\Eloquent\Builder;

class NegocioController extends Controller
{

    public function fetch(Negocio $negocio){
        $negocio->cargar();
        return response()->json($negocio);
    }

    public function getNegocios(){
        $negocios = Negocio::all();

        $negocios->each(fn($val) => $val->cargar());
        return response()->json($negocios);
        
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
        ->when(isset($datos['destinoId']) && !empty($datos['destinoId']),function(Builder $q) use($datos){
            $q->whereHas('iata',function(Builder $query) use($datos){
                    $destino = Destino::find($datos['destinoId']);
                    $query->where('id',$destino->iata->id);
            })->where('publicado', true);
        })
        ->when(isset($datos['isReserva']) && $datos['isReserva'],function($q){
                $q->where('publicado',true);
        })
        ->with(['cuenta.divisa'])
        ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc' : 'desc')
        ->paginate($datos['perPage']?: 10000,pageName:'currentPage');

        
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

            if($datos['divisa_id'] != $negocio->cuenta->divisa->id){
                    $negocio->changeDivisa(
                     Divisa::find($datos['divisa_id'])
                    );
            }
           
            
            $negocio->update($datos);
            ModelTraslate::dispatch($negocio,['nombre','descripcion','breve', 'direccion']);

           
            // if($negocio->tps_referido != $datos[]){

                $tps_referido = Divisa::convertirToTravel($negocio->comision,$negocio->divisa);

                $negocio->tps_referido = $tps_referido;
                $negocio->save();
            // }

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


        if(!$negocio->empleados->contains($negocio->encargado)){
            $negocio->asignarEmpleado($negocio->encargado, $negocio->primerCargo());
            $permisos = Permiso::whereHas('panel', fn (Builder $q) => $q->where('panel', 'Negocio'))->get();
            $negocio->encargado->asignarPermisos($permisos);
        }

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

            $negocio->quitarTraduccion(['nombre', 'descripcion', 'breve', 'direccion']);
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

        if(\in_array($request->user()->rol->nombre, ['Desarrollador', 'Administrador'])){
            $negocio = $ultimoNegocio ? Negocio::where('id', $ultimoNegocio)->first() : Negocio::first();
        }else{
            
            if ($ultimoNegocio) {
                $negocio = Negocio::where('id', $ultimoNegocio)->first();
            } else {
                $negocio = $request->user()->negocios->first();
            }

        }
        
        $negocio?->cargar();
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

    public function guardarVideo(Request $request, Negocio $negocio){

        
        if($request->get('id')){
         
            $video = Video::find((integer) $request->get('id'));
            // dd($video);
            try {
                DB::beginTransaction();
                $negocio->updateVideo($request,$video);
                DB::commit();
                $result = true;
            } catch (\Exception $e) {
                DB::rollBack();
                $result = false;

                dd($e->getMessage());
            }
        }else{
            $negocio->quitarVideos();
            try {
                DB::beginTransaction();
                $negocio->agregarVideo($request);
                DB::commit();
                $result = true;
            } catch (\Exception $e) {
                DB::rollBack();
                $result = false;
            }

        }

        $negocio = Negocio::find($negocio->id);
        $negocio->cargar();
        $negocio->videos = $negocio->videos;

        return response()->json(['result' => $result,'negocio' => $negocio]);
    }

    public function consultarHoras(Request $request, Negocio $negocio){

        $fecha = new Carbon(new \DateTime($request->get('fecha')));

        $dia_fecha = $fecha->dayOfWeekIso;
        // dd($dia_fecha);
        $horarios = HorarioReservacion::where('negocio_id' ,$negocio->id)->where('dia' , $dia_fecha)->get();

        return response()->json($horarios);
 
        

    }


    public function agregarSaldo(Request $request,Negocio $negocio){


        try {

            DB::beginTransaction();
                $negocio->generarMovimiento($request->get('monto'), $request->get('concepto'));
                $negocio->cargar();
            DB::commit();
            
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result ,'negocio' => $negocio]);

    }

    public function datosHome(Negocio $negocio){

        $reservaciones_mes = $negocio->reservaciones->filter(
            fn($value) => (new Carbon(new DateTime($value->fecha)))->month == Carbon::now()->month )->count();

        $tps_bonificados = $negocio->ventas->sum('tps_bonificados');

        return response()->json([
            'reservasMes' => $reservaciones_mes,
            'tps' => $tps_bonificados,
            'seguidores' => $negocio->seguidores->count(),
            'recomendaciones' => $negocio->recomendaciones->count(),

        ]);

        
    }


    public function capturarPorUrl(Request $request){

        $url = $request->get('url');

        $negocio = Negocio::where('url',$url)->where('publicado',true)->first();

        if($negocio){
            $negocio->cargar();
            $result = true;
        }else{
            $result = false;
        }

        return response()->json(['result' => $result, 'negocio' => $result ? $negocio : null]);

    }

    public function togleRecomendacion(Negocio $negocio, User $usuario){

         $negocio->toggleRecomendacion($usuario);

        return response()->json(['negocio' => $negocio]);

    }

    public function toggleSeguidor(Negocio $negocio, User $usuario)
    {

        $negocio->toggleSeguidor($usuario);

        return response()->json(['negocio' => $negocio]);
    }

    public function fetchDataPublic(Request $request){

        $datos = $request->all();
       
        $paginator = Negocio::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", "OR"],
            ['breve', 'LIKE', "%{$datos['q']}%", "OR"],
            ['direccion', 'LIKE', "%{$datos['q']}%", "OR"],
            ['descripcion', 'LIKE', "%{$datos['q']}%", "OR"],
            ['emails', 'LIKE', "%{$datos['q']}%", "OR"],
            ['codigo_postal', 'LIKE', "%{$datos['q']}%", "OR"],

        ])
            ->when(isset($datos['destino']) && !empty($datos['destino']), function($query) use($datos){
                $query->whereHas('iata', function (Builder $q) use ($datos) {
                    $q->whereHas('destinos', function (Builder $query) use ($datos) {
                        $query->where('id', $datos['destino']);
                    });
                });
            })
            
            ->where('publicado',true)
            ->orderBy('tipo_comision', 'desc')
            ->orderBy('comision','desc')
            ->paginate($datos['perPage']?:1000, pageName:'currentPage');


        $negocios = collect($paginator->items());

        if($datos['atraccion'] && !is_null($datos['atraccion'])){
            $atraccion = Atraccion::find($datos['atraccion']);

            $negocios = $negocios->filter(function($negocio) use($atraccion){
                return $negocio->cercanos(['lat' => $atraccion->lat,'lng' => $atraccion->lng],80);
            });
            
        }   

        $negocios->each(fn($negocio) =>  $negocio->cargar());

        return response()->json([
            'total' => $paginator->total(),
            'negocios' => $negocios
        ]);
      
    }

    public function negociosAsociados(Request $request){
        
        $datos = $request->all();
        
        if($datos['sigo'] || $datos['recomendado']){
            $paginator = Negocio::where([
                ['nombre', 'LIKE', "%{$datos['q']}%", "OR"],
                ['breve', 'LIKE', "%{$datos['q']}%", "OR"],
                ['direccion', 'LIKE', "%{$datos['q']}%", "OR"],
                ['descripcion', 'LIKE', "%{$datos['q']}%", "OR"],
                ['emails', 'LIKE', "%{$datos['q']}%", "OR"],
                ['codigo_postal', 'LIKE', "%{$datos['q']}%", "OR"],

            ])
               
                ->when($datos['sigo'], function ($query) use($request){
                   
                    $query->whereHas('seguidores',fn(Builder $q) => $q->where('usuario_id', $request->user()->id));
                })

                ->when($datos['recomendado'], function ($query) use($request) {
                    $query->whereHas('recomendaciones', fn (Builder $q) => $q->where('usuario_id', $request->user()->id));
                })

                ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'desc')
                ->paginate($datos['perPage']);

          
        }else{
            $paginator = Negocio::where([
                ['nombre', 'LIKE', "%{$datos['q']}%", "OR"],
                ['breve', 'LIKE', "%{$datos['q']}%", "OR"],
                ['direccion', 'LIKE', "%{$datos['q']}%", "OR"],
                ['descripcion', 'LIKE', "%{$datos['q']}%", "OR"],
                ['emails', 'LIKE', "%{$datos['q']}%", "OR"],
                ['codigo_postal', 'LIKE', "%{$datos['q']}%", "OR"],

            ])
                ->whereHas('empleados', function (Builder $q) use ($datos) {
                    $q->where('usuario_id', $datos['usuario']);
                })
                ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' : 'desc')
                ->paginate($datos['perPage']);
        }

        

        $negocios = collect($paginator->items());

        $negocios->each(fn($neg) => $neg->cargar());

        return response()->json(['total' => $paginator->total(),'negocios' => $negocios]);
    }

    public function updateMenu(Request $request,Negocio $negocio){


        $datos = $request->validate([
            'tipo_menu' => 'required',
            'menu' => 'required'
        ]);

        try {
            DB::beginTransaction();

            if($datos['tipo_menu'] == 2 || $datos['tipo_menu'] == 3){
                $archivo = $request->file('menu');
                $archivo_name = \sha1($archivo->getClientOriginalName()).'.'.$archivo->getClientOriginalExtension();
                Storage::disk('negocio_menu')->put($archivo_name,File::get($archivo));
            }
            
            $negocio->update([
                'tipo_menu' => $datos['tipo_menu'],
                'menu' => ($datos['tipo_menu'] == 2 || $datos['tipo_menu'] == 3) ? $archivo_name : $datos['menu'],
            ]);

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
            // dd($th->getMessage());
        }

        $negocio->refresh();
        $negocio->cargar();

        return response()->json(['result' => $result, 'negocio' => $negocio]);

    }


    public function gestionSaldo(Request $request,Negocio $negocio){

        $datos = $request->all();

        try {
            DB::beginTransaction();
            Movimiento::add($negocio->cuenta,$datos['monto'], $datos['concepto'],$datos['tipo'] == 1 ? Movimiento::TIPO_INGRESO : Movimiento::TIPO_EGRESO);
            $negocio->cargar();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }
        
        $negocio->refresh();

        return response()->json(['result' => $result, 'negocio' => $negocio]);
    }


    public function aumentarVistas(Request $request, Negocio $negocio){

        try {
            DB::beginTransaction();

            $negocio->vistas++;
            $negocio->save();
            DB::commit();
            $result =true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function togglePublicado(Negocio $negocio){

        try {
            DB::beginTransaction();
                $negocio->publicado = !$negocio->publicado;
                $negocio->save();
            DB::commit();
           
            $negocio->cargar();
           
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'negocio' => $negocio
        ]);

    }


    public function invitar(Request $request, User $usuario){

        return response()->json();
    }

    public function fetchDataNegocioReport(Request $request){

        $filtro = $request->all();

        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if($request->has('pais') && !empty($request->get('pais'))){
            $paginations = Destino::selectRaw('nombre as destino')
                            ->addSelect([
                                'negocios' => Negocio::selectRaw('count(*)')
                                                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                })
                                                ->whereColumn('iata_id','destinos.iata_id'),
                                'pais' => Pais::select('pais')
                                        
                                            ->whereHas('estados',fn($q) => $q->whereColumn('id','destinos.estado_id'))
                            ])
                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                            })
                            ->whereHas('estado.pais' ,fn($q) => $q->where('pais',$filtro['pais']))
                            ->where([
                                ['nombre', 'like', "%{$filtro['q']}%", 'OR'],
                                ['titulo', 'like', "%{$filtro['q']}%", 'OR'],
                                ['about_travel', 'like', "%{$filtro['q']}%", 'OR'],
                            ])
                            ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                            ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());
        }else if($request->has('destino') && !empty($request->get('destino'))){
           
            $paginations = Negocio::selectRaw('nombre as negocio,direccion')
                                ->addSelect([
                                    'destino' => Destino::selectRaw('nombre as destino')
                                                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                    })
                                                    ->whereColumn('estado_id','negocios.estado_id')
                                                    ->limit(1),
                                    'pais' => Pais::select('pais')->whereHas('estados',fn($q) => $q->whereColumn('id','negocios.estado_id'))
                                ])
                                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                })
                                ->whereHas('estado',function($q) use($filtro){
                                    $q->whereHas('destinos',fn($query) => $query->where('nombre',$filtro['destino']));
                                })
                                ->where([
                                    ['nombre','like',"%{$filtro['q']}%",'OR'],
                                    ['direccion', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['sitio_web', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['breve', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['descripcion', 'like', "%{$filtro['q']}%", 'OR'],
                                ])
                                ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                                ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());


        }else{
             $paginations = Pais::select('pais')
                        ->addSelect([
                            'negocios' => Negocio::selectRaw('count(distinct(id))')
                             ->when(isset($filtro['mes']) && !empty($filtro['mes']),function($q) use($mes){
                                $q->whereBetween('created_at',[$mes->firstOfMonth(),(new Carbon($mes))->lastOfMonth()]);
                            })
                            ->whereHas('estado',fn($q) => $q->whereColumn('pais_id','pais.id')),
                            'activos' => Negocio::selectRaw('count(distinct(id))')
                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                            })->whereHas('estado', fn ($q) => $q->where('publicado',true)->whereColumn('pais_id', 'pais.id')),
                            'desactivados' => Negocio::selectRaw('count(distinct(id))')->when(isset($filtro['mes']) && !empty($filtro['mes']),function($q) use($mes){
                                $q->whereBetween('created_at',[$mes->firstOfMonth(),(new Carbon($mes))->lastOfMonth()]);
                            })->whereHas('estado', fn ($q) => $q->where('publicado', false)->whereColumn('pais_id', 'pais.id')),
                        ])
                        ->where([
                            ['pais','LIKE',"%{$filtro['q']}%",'OR']
                        ])
                        // ->groupBy('pais')
                        ->havingRaw('negocios > 0')
                        ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                        ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());
        }


        return response()->json([
            'total' => $paginations->total(),
            'negocios' => $negocios
        ]);
       
    }

    public function descargarFetchDataNegocioReport(Request $request){

         $filtro = $request->all();

        $mes = (new Carbon(new \DateTime($filtro['mes'])));

        if($request->has('pais') && !empty($request->get('pais'))){
            $paginations = Destino::selectRaw('nombre as destino')
                            ->addSelect([
                                'negocios' => Negocio::selectRaw('count(*)')
                                                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                })
                                                ->whereColumn('iata_id','destinos.iata_id'),
                                'pais' => Pais::select('pais')
                                        
                                            ->whereHas('estados',fn($q) => $q->whereColumn('id','destinos.estado_id'))
                            ])
                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                            })
                            ->whereHas('estado.pais' ,fn($q) => $q->where('pais',$filtro['pais']))
                            ->where([
                                ['nombre', 'like', "%{$filtro['q']}%", 'OR'],
                                ['titulo', 'like', "%{$filtro['q']}%", 'OR'],
                                ['about_travel', 'like', "%{$filtro['q']}%", 'OR'],
                            ])
                            ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                            ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());
        }else if($request->has('destino') && !empty($request->get('destino'))){
           
            $paginations = Negocio::selectRaw('nombre as negocio,direccion')
                                ->addSelect([
                                    'destino' => Destino::selectRaw('nombre as destino')
                                                    ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                                        $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                                    })
                                                    ->whereColumn('estado_id','negocios.estado_id'),
                                    'pais' => Pais::select('pais')->whereHas('estados',fn($q) => $q->whereColumn('id','negocios.estado_id'))
                                ])
                                ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                    $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                                })
                                ->whereHas('estado',function($q) use($filtro){
                                    $q->whereHas('destinos',fn($query) => $query->where('nombre',$filtro['destino']));
                                })
                                ->where([
                                    ['nombre','like',"%{$filtro['q']}%",'OR'],
                                    ['direccion', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['sitio_web', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['breve', 'like', "%{$filtro['q']}%", 'OR'],
                                    ['descripcion', 'like', "%{$filtro['q']}%", 'OR'],
                                ])
                                ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                                ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());


        }else{
             $paginations = Pais::select('pais')
                        ->addSelect([
                            'negocios' => Negocio::selectRaw('count(distinct(id))')
                             ->when(isset($filtro['mes']) && !empty($filtro['mes']),function($q) use($mes){
                                $q->whereBetween('created_at',[$mes->firstOfMonth(),(new Carbon($mes))->lastOfMonth()]);
                            })
                            ->whereHas('estado',fn($q) => $q->whereColumn('pais_id','pais.id')),
                            'activos' => Negocio::selectRaw('count(distinct(id))')
                            ->when(isset($filtro['mes']) && !empty($filtro['mes']), function ($q) use ($mes) {
                                $q->whereBetween('created_at', [$mes->firstOfMonth(), (new Carbon($mes))->lastOfMonth()]);
                            })->whereHas('estado', fn ($q) => $q->where('publicado',true)->whereColumn('pais_id', 'pais.id')),
                            'desactivados' => Negocio::selectRaw('count(distinct(id))')->when(isset($filtro['mes']) && !empty($filtro['mes']),function($q) use($mes){
                                $q->whereBetween('created_at',[$mes->firstOfMonth(),(new Carbon($mes))->lastOfMonth()]);
                            })->whereHas('estado', fn ($q) => $q->where('publicado', false)->whereColumn('pais_id', 'pais.id')),
                        ])
                        ->where([
                            ['pais','LIKE',"%{$filtro['q']}%",'OR']
                        ])
                        // ->groupBy('pais')
                        ->havingRaw('negocios > 0')
                        ->orderBy($filtro['sortBy'] ?? 'pais', $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                        ->paginate($filtro['perPage'] ?? 100);

            $negocios = collect($paginations->items());
        }


        $imagenBase64 = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $logowhite = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipoblancohorizontal.png'));

        $datos = [
            'filtro' => $filtro,
            'negocios' => $negocios,
            'logotipo' => $imagenBase64,
            'logotipoblanco' => $logowhite,
        ];

        $pdf = Pdf::loadView('reports.negocios', $datos);

        $pdf->setOption([
            'dpi' => 150,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        $pdf->setPaper('a4', 'landscape');

        $nombre = 'Negocios.pdf';
        $pdf->save($nombre, 'reportes');

        return response()->json([
            'url' => Storage::url('public/reportes/' . $nombre),
            'filename' => $nombre
        ]);


    }


}
