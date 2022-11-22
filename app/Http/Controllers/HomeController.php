<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\{User};

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

}
