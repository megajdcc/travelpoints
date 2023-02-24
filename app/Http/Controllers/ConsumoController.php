<?php

namespace App\Http\Controllers;

use App\Models\Consumo;
use App\Models\Movimiento;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\NuevoConsumo;
use Illuminate\Support\Facades\Mail;
use App\Mail\NuevoConsumo as newConsumo;
use App\Models\Divisa;

class ConsumoController extends Controller
{
   
    public function fetchData(Request $request){
        $datos = $request->all();


        $paginator = Consumo::where([
            ['total',"LIKE","%{$datos['q']}%","OR"],
            ['tps', "LIKE", "%{$datos['q']}%", "OR"],
            ['paypal_id', "LIKE", "%{$datos['q']}%", "OR"],
        ])
        ->whereHas('cliente',function(Builder $q) use($datos){
            $q->orWhere([
                ['nombre',"like","%{$datos['q']}%","OR"],
                ['apellido', "like", "%{$datos['q']}%", "OR"],
                ['username', "like", "%{$datos['q']}%", "OR"],
                ['email', "like", "%{$datos['q']}%", "OR"],
            ]);
        })
        ->whereHas('empleado', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['nombre', "like", "%{$datos['q']}%", "OR"],
                ['apellido', "like", "%{$datos['q']}%", "OR"],
                ['username', "like", "%{$datos['q']}%", "OR"],
                ['email', "like", "%{$datos['q']}%", "OR"],
            ]);
        })
        ->when($datos['usuario_id'],function($q) use($datos){
                $q->where('cliente_id',$datos['usuario_id']);
        })
        ->with(['divisa','productos','cliente','empleado'])
        ->orderBy($datos['sortBy'] ?: 'id', $datos['isSortDirDesc'] ? 'desc' :'asc')
        ->paginate($datos['perPage'] ?: 10000);
    
        $consumos = collect($paginator->items());

        foreach($consumos as $consumo){
            $consumo->cliente->avatar = $consumo->cliente->getAvatar();

            if($consumo->empleado){
                $consumo->empleado->avatar = $consumo->empleado->getAvatar();
            }

            $consumo->productos->load(['opinions']);
        }

        return response()->json([

            'total' => $paginator->total(),
            'consumos' => $consumos
        ]);


    }


    public function fetch(Consumo  $consumo){
        $consumo->cliente->avatar = $consumo->cliente->getAvatar();

        if ($consumo->empleado) {
            $consumo->empleado->avatar = $consumo->empleado->getAvatar();
        }

        $consumo->load(['divisa','imagenes','productos']);

        return response()->json($consumo);

    }

    private function validar(Request $request,Consumo $consumo = null): array{
        return $request->validate([
            'cliente_id'  => 'required',
            'empleado_id' => 'nullable',
            'total'       => 'nullable',
            'paypal_id'   => 'nullable',
            'tps'         => 'nullable',
            'comentado'   => 'nullable',
            'divisa_id'   => 'nullable',
            'productos'   => 'required',
            'paypal'      => 'nullable',
            'tienda_id'   => 'nullable',
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
        $datos = $this->validar($request);

        // dd($datos);
        try {
            DB::beginTransaction();
            
            $consumo = Consumo::create([
                'cliente_id'  => $datos['cliente_id'],
                'empleado_id' => $datos['empleado_id'],
                'total'       => $datos['total'],
                'paypal_id'   => $datos['paypal_id'],
                'paypal'      => $datos['paypal'],
                'comentado'   => false,
                'divisa_id'   => Divisa::where('iso','Tp')->first()->id
            ]);


            foreach($datos['productos'] as $producto){
                
                $consumo->productos()->attach($producto['producto_id'],['cantidad' => $producto['cantidad'],'monto' => $producto['monto']]); 
            }
            $consumo->tienda_id = $datos['productos'][0]['tienda_id'];
            $consumo->tps = $this->getTpsConsumidos($consumo);
            $consumo->save();

            $consumo->cliente->avatar = $consumo->cliente->getAvatar();
           
            if ($consumo->empleado) {
                $consumo->empleado->avatar = $consumo->empleado->getAvatar();
            }

            $consumo->load(['divisa','productos','empleado']);

            DB::commit();
            $result = true;

            // Descontamos la disponibiblidad
            // foreach($consumo->productos as $producto){
            //     $producto->disponibles -= $producto->pivot->cantidad;
            //     $producto->save();
            // }

            // Limpiamos el Carrito 
            $consumo->cliente->carritoCompra()->detach();

            // Descontamos los tps consumidos al usuario generando un movimiento a su billetera por la compra
            $consumo->cliente->cargar();

            $movimiento = Movimiento::add($consumo->cliente->cuenta,$consumo->tps,'Compra de productos en tienda Travel',2);

            // Notificar al Cliente y TravelPoints de la Nueva Compra

            $consumo->cliente->notify(new NuevoConsumo($consumo));
            Mail::to($consumo->cliente)->send(new newConsumo($consumo));

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th);

        }

        return response()->json(['result' => $result,'consumo' => $result ? $consumo : null]);
    }

    private function getTpsConsumidos(Consumo $consumo){
        $cliente = $consumo->cliente;
        $cliente->cuenta;

        if($consumo->paypal_id){
            $consumo->tps = $consumo->total - $consumo->paypal['transactions'][0]['amount']['total'];
        }else{
            $consumo->tps = $consumo->total();
        }

        return $consumo->tps;

    }


    public function marcarComentada(Consumo $consumo){


        $result = $consumo->update(['comentado' => true]);

        return response()->json(['result' => $result]);
        
    }



}