<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Atraccion, Destino, User};
use App\Models\Negocio\Negocio;
use Illuminate\Database\Eloquent\Builder;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth')->except(['searchPublic', 'searchLocation', 'getTravels']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {

        $usuario = $request->user();

        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();


        return view('home', compact('usuario'));
    }


    public function getDataApp(Request $request)
    {

        $usuario = $request->user();
        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();

        return response()->json($usuario);
    }





    public function tableroAdmin()
    {

        $result = collect([
            'cantidad_usuarios' => User::get()->count()
        ]);

        return response()->json($result);
    }

    public function tableroUser()
    {

        $result = [];
        return response()->json($result);
    }

    public function searchPublic(request $request)
    {
        $q = $request->get('q');
        $destino = $request->get('destino');
        $destinos = Destino::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['titulo', 'LIKE', "%{$q}%", "OR"],
        ])->where('activo', true)->when($destino, function ($query) use ($destino) {
            $query->where('id', $destino);
        })
            ->get();

        foreach ($destinos as $key => $destino) {
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->tipo = 'Destino';
            $destino->imagenes;
            $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';
        }

        $atracciones = Atraccion::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['incluye', 'LIKE', "%{$q}%", "OR"],
        ])->when($destino, function ($query) use ($destino) {
                $query->where('destino_id', $destino);
            })->get();

        foreach ($atracciones as $key => $atraccion) {
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->tipo = 'Atracción';
            $atraccion->imagenes;
            $atraccion->opinions;
            $atraccion->imagen = $atraccion->imagenes[0] ? "/storage/atracciones/imagenes/{$atraccion->imagenes[0]->imagen}" : '';
        }

        $negocios = Negocio::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['breve', 'LIKE', "%{$q}%", "OR"],
        ])->when($destino && !empty($destino), function ($query) use ($destino) {
            $query->whereHas('iata', function (Builder $q) use ($destino) {
                $q->whereHas('destinos', function (Builder $query) use ($destino) {
                    $query->where('id', $destino);
                });
            });
        })->where('publicado',true)
        ->get();

        foreach ($negocios as $key => $negocio) {
            $negocio->ruta = "/negocio/{$negocio->url}";
            $negocio->tipo = 'Negocio';
            $negocio->imagenes;
            $negocio->opinions;
            $negocio->imagen = $negocio->imagenes[0] ? "/storage/negocios/fotos/{$negocio->imagenes[0]->imagen}" : '';
            $negocio->cargar();
        }


        $resultados = collect([...$destinos, ...$atracciones, ...$negocios]);

        return response()->json($resultados);
    }


    public function searchLocation(Request $request)
    {
        $datos = $request->all();
        return response()->json(collect([...Destino::getLocation($datos), ...Atraccion::getLocation($datos)]));
    }


    public function getTravels(Destino $destino)
    {


        $destinos = Destino::where('activo', true)
            // ->when($destino,function($query) use($destino){
            //         $query->where('id', $destino->id);
            // })
            ->get();

        foreach ($destinos as $key => $destino) {
            $destino->ruta = "/Destinos?q={$destino->nombre}";
            $destino->tipo = 'Destino';
            // $destino->descripcion = '';
            $destino->about_travel = '';
            // $destino->imagenes;
            // $destino->cargar();
            // $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';
        }

        $atracciones = Atraccion::get();
        foreach ($atracciones as $key => $atraccion) {
            // $atraccion->cargar();
            $atraccion->tipo = 'Atracción';

        }

        $negocios = Negocio::where('status', 1)->get();

        foreach ($negocios as $key => $negocio) {
            $negocio->ruta = "/{$negocio->url}";
            $negocio->tipo = 'Negocio';
            // $negocio->opinions;
            // $negocio->imagen = count($negocio->imagenes) > 0 ? "/storage/negocios/fotos/{$negocio->imagenes[0]->imagen}" : '';

            // $negocio->cargar();
        }


        $travels = collect([...$destinos, ...$atracciones, ...$negocios]);

        return response()->json($travels);
    }
}
