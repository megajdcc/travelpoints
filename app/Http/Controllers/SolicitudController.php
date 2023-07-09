<?php

namespace App\Http\Controllers;

use App\Models\Divisa;
use App\Models\Negocio\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\{DB, Storage, File, Notification};
use App\Notifications\NuevaSolicitudNegocio;

use App\Models\User;

use App\Notifications\{SolicitudNegocioActualizada, SolicitudEnviada};
use App\Models\Negocio\Negocio;
use App\Models\Sistema;
use App\Models\Usuario\Permiso;

class SolicitudController extends Controller
{

    public function getAll(Request $request)
    {
        $usuario = $request->user();
        $solicitudes = Solicitud::get();

        $solicitudes->each(fn ($val) => $val->cargar());


        return response()->json($solicitudes);
    }

    public function misSolicitudes(Request $request){

        $usuario = $request->user();

        $solicitudes = Solicitud::where('usuario_id',$usuario->id)->get();
        
        $solicitudes->each(fn($val) => $val->cargar());

        return response()->json($solicitudes);
    }

    public function getSolicitud(Solicitud $solicitud)
    {

        $solicitud->categoria;
        $solicitud->usuario;
        $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
        $solicitud->ciudad;
        $solicitud->estado->pais;
        $solicitud->divisa;
        $solicitud->iata;


        return response()->json($solicitud);
    }

    public function fetchDataAdmin(Request $request)
    {
        $datos = $request->all();
        $paginator = Solicitud::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['breve', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['codigo_postal', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['telefono', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['direccion', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])->whereHas('categoria', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['categoria', 'LIKE', "%{$datos['q']}%", 'OR'],
            ]);
        })
            ->orderBy($datos['sortBy'], $datos['sortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);

        $solicitudes = collect($paginator->items())->each(fn ($val) => $val->cargar());

        return response()->json([
            'solicitudes' => $solicitudes,
            'total' => $paginator->total()
        ]);
    }

    public function fetchData(Request $request)
    {

        $datos = $request->all();
        $paginator = Solicitud::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['breve', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['codigo_postal', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['telefono', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['direccion', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])->whereHas('categoria', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['categoria', 'LIKE', "%{$datos['q']}%", 'OR'],
            ]);
        })
            ->where('usuario_id', $request->user()->id)
            ->orderBy($datos['sortBy'], $datos['sortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


        $solicitudes = collect($paginator->items())->each(fn ($val) => $val->cargar());

        return response()->json([
            'solicitudes' => $solicitudes,
            'total' => $paginator->total()
        ]);
    }


    private function validar(Request $request, Solicitud $solicitud = null): array
    {



        $result = $request->validate([
            'id'            => 'nullable',
            'nombre'        => 'required',
            'descripcion'   => 'required',
            'breve'         => 'required',
            'categoria_id'  => 'required',
            'tipo_comision' => 'required',
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
            'logo'          => 'bail|required_without:id|nullable|max:2048',
            'foto'          => 'bail|required_without:id|nullable|max:2048',
            'comentario' => 'nullable',
            'panel' => 'nullable',
            'divisa_id' => 'required',
            'iata_id' => 'nullable'
        ], [
            'logo.required_without' => 'El logo es importante no lo olvides',
            'foto.required_without' => 'La foto es importante no lo olvides',
            'logo.image' => 'El logo no es valido',
            'foto.image' => 'La foto del negocio no es valida',
            'logo.max'   => 'El logo no puede ser mayor a 2 mb',
            'logo.mimes' => 'El logo debe estar en formato jpg o png',
            'foto.max'   => 'La foto no puede ser mayor a 2 mb',
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
    {

        $datos = $this->validar($request);

        // return response()->json(['result' => false,'request' => $datos]);
        try {
            DB::beginTransaction();

            $logo = $request->file('logo');
            $foto = $request->file('foto');


            $logo_name = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();

            $foto_name = \sha1($foto->getClientOriginalName()) . '.' . $foto->getClientOriginalExtension();

            Storage::disk('public')->put("negocios/logos/{$logo_name}", File::get($logo));

            Storage::disk('public')->put("negocios/fotos/{$foto_name}", File::get($foto));



            $solicitud = Solicitud::create([...$datos, ...[
                'usuario_id' => $request->user()->id,
                'logo' => $logo_name,
                'foto' => $foto_name
            ]]);

            DB::commit();
            $result = true;

            Notification::send(
                User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Administrador'))->get(),
                new NuevaSolicitudNegocio($solicitud)
            );

            $solicitud->usuario->notify(new SolicitudEnviada($solicitud));


            $solicitud->categoria;
            $solicitud->usuario;
            $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
            $solicitud->ciudad;
            $solicitud->estado->pais;
            $solicitud->divisa;
            $solicitud->iata;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
            dd($e->getMessage());
        }



        return response()->json(['result' => $result, 'solicitud' => $result ? $solicitud : null]);
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

            if ($datos['logo']) {
                $img_log = \explode("/", $solicitud->logo)[count(\explode("/", $solicitud->logo)) - 1];

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

            if ($logo_name) {
                $solicitud->logo = $logo_name;
            }

            if ($foto_name) {
                $solicitud->foto = $foto_name;
            }

            $solicitud->save();

            DB::commit();
            $result = true;

            if ($solicitud->usuario_id === $request->user()->id) {

                if (isset($datos['panel']) && $datos['panel'] == 'infochannel') {

                    $solicitud->usuario->notify(new SolicitudNegocioActualizada($solicitud));
                } else {

                    Notification::send(User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Administrador'))->get(), new NuevaSolicitudNegocio($solicitud));

                    $solicitud->usuario->notify(new SolicitudEnviada($solicitud));
                }
            } else {
                $solicitud->usuario->notify(new SolicitudNegocioActualizada($solicitud));
            }


            if ($solicitud->situacion == 3) {

                // Crear negocio
                $negocio = Negocio::create([
                    ...[
                        'status' => true,
                        'emails' => [['email' => $solicitud->email, 'principal' => true]],
                    ],
                    ...\array_filter($solicitud->toArray(), fn ($key) => !\in_array($key, ['comentario', 'telefono', 'situacion', 'email']))
                ]);

                $sistema = Sistema::first();
                $divisa_credito = Divisa::find($sistema->negocio['divisa_id']);
                $tps_referido = Divisa::convertirToTravel($negocio->comision, $negocio->divisa);

                $negocio->tps_referido = $tps_referido;
                $negocio->save();

                $saldo_apertura = $divisa_credito->convertir($negocio->divisa, $sistema['negocio']['credito']);

                $negocio->aperturarCuenta($saldo_apertura);

                $negocio->addTelefono([
                    'telefono' => $solicitud->telefono,
                    'principal' => true,
                ]);

                $negocio->addImagen([
                    'imagen' => $solicitud->foto,
                    'portada' => true,
                    'logo' => false
                ]);

                $negocio->asignarEmpleado($negocio->encargado, $negocio->primerCargo());
                $permisos = Permiso::whereHas('panel', fn (Builder $q) => $q->where('panel', 'Negocio'))->get();
                $negocio->encargado->asignarPermisos($permisos);
                
            }
        } catch (\Exception $e) {

            DB::rollBack();
            $result = false;
            dd($e);
        }

        $solicitud->categoria;
        $solicitud->usuario;
        $solicitud->usuario->avatar = $solicitud->usuario->getUrlAvatar();
        $solicitud->ciudad;
        $solicitud->estado->pais;
        $solicitud->divisa;
        $solicitud->iata;

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
        try {
            DB::beginTransaction();
            Storage::disk('public')->delete("negocios/logos/{$solicitud->logo}");
            Storage::disk('public')->delete("negocios/fotos/{$solicitud->foto}");

            $solicitud->delete();
            $result = true;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function solicitudesSinAceptar()
    {
        return response()->json(23);
    }
}
