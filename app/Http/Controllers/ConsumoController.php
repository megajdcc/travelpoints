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
use App\Models\User;
use App\Notifications\OrdenCancelada;
use Illuminate\Support\Facades\Notification;

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
            'monto_envio' => 'nullable'
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
                'divisa_id'   => Divisa::where('iso','Tp')->first()->id,
                'monto_envio' => $datos['monto_envio']
            ]);

            foreach($datos['productos'] as $producto){
                $consumo->productos()->attach($producto['producto_id'],['cantidad' => $producto['cantidad'],'monto' => $producto['monto'],
                'vid' => $producto['vid']]); 
            }


            $user = $request->user();

            $consumo->tienda_id = $datos['productos'][0]['tienda_id'];
            $consumo->tps = $this->getTpsConsumidos($consumo);
            $consumo->save();

            $producto_controller = new ProductoController();

            $logistic = $producto_controller->obtenerLogistica([
                'startCountryCode' => 'CN',
                'endCountryCode'   => $user->ciudad->estado->pais->codigo,
                'products' => $consumo->productos
                    ->filter(fn ($val) => $val->isChino)
                    ->map(fn ($val) => [
                        'vid' => $val->pivot['vid'],
                        'quantity' => $val->pivot['cantidad']
                    ])
            ]);

            $orden_id = $producto_controller->crearOrden([
                'shippingZip'          => $user->codigo_postal,
                'shippingCountryCode'  => $user->ciudad->estado->pais->codigo,
                'shippingCountry'      => $user->ciudad->estado->pais->pais,
                'shippingProvince'     => $user->ciudad->estado->estado,
                'shippingCity'         => $user->ciudad->ciudad,
                'shippingAddress'      => $user->direccion,
                'shippingCustomerName' => $user->getNombreCompleto(),
                'shippingPhone'        => $user->telefonos->where('principal',true)?->first()?->telefono || '+584128505504',
                'remark'               => '',
                'fromCountryCode'      => 'CN',
                'logisticName'         => count($logistic) > 0 ? $logistic[0]->logisticName : null,
                'products' =>  $consumo->productos
                    ->filter(fn ($val) => $val->isChino)
                    ->map(fn ($val) => [
                        'vid'          => $val->pivot['vid'],
                        'quantity'     => $val->pivot['cantidad'],
                        'shippingName' => $val->id
                    ])
            ]);
            
            if($orden_id){
                $consumo->ordencj = $orden_id;
                $consumo->save();
            }
           

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
            
            $movimiento = Movimiento::add($consumo->cliente->cuenta,$consumo->tps,'Compra de productos en tienda Travel',Movimiento::TIPO_EGRESO);

            // Notificar al Cliente y TravelPoints de la Nueva Compra

            $consumo->cliente->notify((new NuevoConsumo($consumo))->locale($consumo->cliente->locale));
            Mail::to($consumo->cliente)->locale($consumo->cliente->locale)->send(new newConsumo($consumo));

            $consumo->cliente->cargar();


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
            $consumo->tps = $consumo->total - ($consumo->paypal['transactions'][0]['amount']['total'] - $consumo->monto_envio);
        }else{
            $consumo->tps = $consumo->total;
        }

        return $consumo->tps;

    }


    public function marcarComentada(Consumo $consumo){


        $result = $consumo->update(['comentado' => true]);

        return response()->json(['result' => $result]);
        
    }

    public function getOrdenDetailsCj(string $orden_id){

        $producto_controller = new ProductoController();

        $orden_details  = $producto_controller->getOrden($orden_id);

        return response()->json(['orden' => $orden_details]);

    }

    public function confirmarOrdenCj(string $orden_id)
    {

        $producto_controller = new ProductoController();

        $result  = $producto_controller->confirmarOrden($orden_id);

        return response()->json($result);

    }

    public function eliminarOrdenCj(Request $request,Consumo $consumo,string $orden){

        $producto_controller = new ProductoController();

        $result  = $producto_controller->eliminarOrden($orden);

        if($result['result']){

          
            $cliente = $consumo->cliente;

            $movimiento = Movimiento::add($cliente->cuenta, $consumo->tps, "Devolución de compra por cancelación de Orden {$consumo->ordencj}", Movimiento::TIPO_INGRESO);

            $usuarios = collect([
                $cliente,
                ...User::whereHas('rol', fn (Builder $q) => $q->whereIn('nombre', ['Administrador', 'Desarrollador']))->get()
            ]);

            
            Notification::send(
                $usuarios,
                new OrdenCancelada($request->url(),$consumo)
            );

        }

        return response()->json($result);
    }

    public function pagarOrdenCj(string $orden){
        $producto_controller = new ProductoController();

        $result  = $producto_controller->pagarOrden($orden);

        if ($result['result']){
            if ($consumo = Consumo::where('ordencj', $orden)->first()) {
                
            }
        }

        return response()->json($result);
    }




}