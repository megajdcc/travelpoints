<?php

namespace App\Http\Controllers;

use App\Http\Requests\AfiliarNegocioInvitacionRequest;
use App\Http\Requests\InvitacionRequest;
use App\Mail\InvitacionNegocio;
use App\Models\Invitacion;
use App\Models\Negocio\Solicitud;
use App\Models\User;
use App\Models\Usuario\Rol;
use App\Notifications\NuevaSolicitudNegocio;
use App\Notifications\SolicitudEnviada;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class InvitacionController extends Controller
{

    public function fetchData(Request $request){

        $filtro = $request->all();
        $searchs = collect(['email','mensaje']);
        $paginator = Invitacion::where(fn(Builder $v) => $searchs->each(fn($s) => $v->orWhere($s,"LIKE","%{$filtro['q']}%")))
                    ->when(\in_array($request->user()->rol->nombre,['Coordinador']),fn(Builder $q) => $q->where('usuario_id', $filtro['usuario']))
                    ->orderBy($filtro['sortBy'] ?: 'id' , $filtro['isSortDirDesc'] ? 'desc' : 'asc')
                    ->paginate($filtro['perPage'] ?: 1000);

        return response()->json([
            'total' => $paginator->total(),
            'invitaciones' => $paginator->items(),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InvitacionRequest $request)
    {
        try {
            DB::beginTransaction();

            $invitacion = Invitacion::create([
                ...$request->all(),
                ...[
                    'status' => 1
                ]
            ]);

            Mail::to($invitacion->email)->locale($request->user()->locale)->send(new InvitacionNegocio($invitacion));
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }
        return response()->json(['result' => $result,'invitacion' => $invitacion ?? null]);
    }



    public function recordar(Request $request, Invitacion $invitacion){

        Mail::to($invitacion->email)->locale($request->user()->locale)->send(new InvitacionNegocio($invitacion));


        return response()->json([
            'result' => true
        ]);

    }


    public function fetch(Invitacion $invitacion){

        $invitacion->cargar();
        
        return response()->json($invitacion->status == 1 ? $invitacion : null, $invitacion->status == 2 ? 204 : 200);
    }


    public function destroy(Invitacion $invitacion){

        try {
            DB::beginTransaction();
            $result = false;
            if($invitacion->status == 1){
               $result =  $invitacion->delete();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
    
    public function assetsPostNegocioSolicitud(Request $request,Solicitud $solicitud){
        $datos = $request->validate([
            'logo'               => 'bail|max:2048',
            'foto'               => 'bail|max:2048',
        ],[
            'logo.max' => 'El logo no puede superar los 2mb',
            'foto.max' => 'La imagen de portada no puede superar los 2mb',
        ]);
        try {
            DB::beginTransaction();

            $logo = $request->file('logo');
            $foto = $request->file('foto');

            $logo_name = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();
            $foto_name = \sha1($foto->getClientOriginalName()) . '.' . $foto->getClientOriginalExtension();

            Storage::disk('logo_negocios')->put($logo_name,File::get($logo));
            Storage::disk('public')->put("negocios/fotos/{$foto_name}", File::get($foto));


            $solicitud->update([
                'logo' => $logo_name,
                'foto' => $foto_name
            ]);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function AfiliarNegocio(AfiliarNegocioInvitacionRequest $request){

        $datos = collect($request->all());
        try {
            DB::beginTransaction();
            $datos_usuario = collect($datos->only('usuario')->get('usuario'));

            $datos_invitacion = $datos->except('usuario','invitacion_id','foto','logo');
            $usuario = User::create([
                ...$datos_usuario->except('r_password'),
                ...[
                    'rol_id' => (Rol::where('nombre','Viajero')->first())->id,
                    'is_password' => true,
                    'activo' => true,
                    
                ]
            ]);
            $usuario->postCreate();
            $solicitud = Solicitud::create([
                ...$datos_invitacion,
                ...[
                    'usuario_id' => $usuario->id,
                    'logo' => Str::random(23),
                    'foto' => Str::random(23),

                ]
            ]);

            $invitacion = Invitacion::find($request->get('invitacion_id'));
            $invitacion->update(['status' => 2]);
            
            DB::commit();
            $result = true;

            Notification::send(
                User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Administrador'))->get(),
                new NuevaSolicitudNegocio($request->url(),$solicitud)
            );

            $solicitud->usuario->notify(new SolicitudEnviada($solicitud));
            $solicitud->cargar();

        } catch (\Throwable $th) {  
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }
    
        return response()->json(['result' => $result,'solicitud' => $solicitud ?? null]);
    }
 

}
