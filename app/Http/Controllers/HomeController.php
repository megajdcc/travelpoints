<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\{Atraccion, Destino, User};

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
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
 
        if($usuario->roles->first()){
            $usuario->roles->first()->permissions;
        } 
        
        $usuario->avatar = $usuario->getAvatar();


        return view('home', compact('usuario'));

    }


    public function getDataApp(Request $request){

        $usuario = $request->user();
        $usuario->rol = $usuario->rol;

        if($usuario->roles->first()){
            $usuario->roles->first()->permissions;
        } 
        
        $usuario->avatar = $usuario->getAvatar();

        return response()->json($usuario);
        
    }


 


    public function tableroAdmin(){

        $result = collect([
            'cantidad_usuarios' => User::get()->count()
        ]);

        return response()->json($result);
    }

     public function tableroUser(){

        $result = [];
        return response()->json($result);
    }

    public function searchPublic(request $request){

       
        $q = $request->get('q');
        
        $destinos = Destino::where([
            ['nombre','LIKE',"%{$q}%","OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['titulo', 'LIKE', "%{$q}%", "OR"],
        ])->get();

        foreach ($destinos as $key => $destino) {
            $destino->ruta ="/Destinos?q={$destino->nombre}";;
            $destino->tipo = 'Destino';
            $destino->imagenes;
            $destino->imagen = $destino->imagenes[0] ? "/storage/destinos/imagenes/{$destino->imagenes[0]->imagen}" : '';

        }

        $atracciones = Atraccion::where([
            ['nombre', 'LIKE', "%{$q}%", "OR"],
            ['descripcion', 'LIKE', "%{$q}%", "OR"],
            ['incluye', 'LIKE', "%{$q}%", "OR"],
        ])->get();

        foreach ($atracciones as $key => $atraccion) {
            $atraccion->ruta = "/Atraccions?q={$atraccion->nombre}";
            $atraccion->tipo = 'Atracción';
            $atraccion->imagenes;
            $atraccion->imagen = $atraccion->imagenes[0] ? "/storage/atracciones/imagenes/{$atraccion->imagenes[0]->imagen}" : '';
        }
        

        $resultados = collect([...$destinos,...$atracciones]);

        return response()->json($resultados);
    }


    public function searchLocation(Request $request){

        $datos = $request->all();
        return response()->json(collect([...Destino::getLocation($datos),...Atraccion::getLocation($datos)]));

    }




}
