<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\{Sistema,User} ;
use App\Notifications\NuevoMensaje;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ApplicationController extends Controller
{

    protected Sistema $sistema;
    public function __construct(){
        
        $this->sistema = Sistema::first();
        $this->sistema->cargar();
    }

    public function index()
    {
        return view('application');
    }


    public function enviarMensajeContacto(Request $request)
    {

        $datos = $request->validate([
            'nombre' => 'required',
            'email' => 'required',
            'asunto' => 'required',
            'mensaje' => 'required|min:30',
            'telefono' => 'required'
        ], [
            'mensaje.min' => 'El mensaje debe tener mas de 30 Caracteres...'
        ]);

        try {
            $usuarios = collect();

            $usuarios->push(User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Desarrollador')
            ->orWhere('nombre', 'Administrador'))->get());

            // if ($this->sistema->usuario) {
            //     $usuarios->push($this->sistema->usuario);
            // }

            Notification::send($usuarios, new NuevoMensaje($this->sistema, $datos));

            $result = true;
        } catch (\Exception $e) {
            $result = false;

            dd($e->getMessage());
        }


        return response()->json(['result' => $result]);
    }
}
