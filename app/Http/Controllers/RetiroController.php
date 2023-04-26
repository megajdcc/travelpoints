<?php

namespace App\Http\Controllers;

use App\Models\Movimiento;
use App\Models\Retiro;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

use App\Notifications\NotificarRetiro;
use App\Notifications\RetiroUpdateStatus;
use Illuminate\Support\Facades\Notification;

class RetiroController extends Controller
{
    
    public function __construct()
    {
        $this->middleware(['convertir.null'])->only(['store','update']);
    }
    public function getAll(Request $request){

        $retiros = Retiro::all()->load('usuario');
        
        $retiros->each(fn($val) => $val->usuario->cargar());

        
        return response()->json($retiros);

    }   


    public function fetchData(Request $request){

        $datos = $request->all();

        $paginate = Retiro::where([
            ['monto','LIKE',"%{$datos['q']}%",'OR'],
            ['nota','LIKE',"%{$datos['q']}%",'OR'],
            ['status','LIKE',"%{$datos['q']}%",'OR'],

        ])
        ->whereHas('usuario',function(Builder $q) use($datos){

            $q->where([
                ['nombre','LIKE',"%{$datos['q']}%",'OR'],
                ['apellido', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['username', 'LIKE', "%{$datos['q']}%", 'OR'],
                ['email', 'LIKE', "%{$datos['q']}%", 'OR'],
            ]);

        })

        ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->with('usuario.cuenta.divisa')
        ->paginate($datos['perPage']?:10000);

        collect($paginate->items())->each(fn($val) => $val->usuario->cargar());

        return response()->json([
            'total' => $paginate->total(),
            'retiros' => $paginate->items(),
        ]);


    }

    public function fetch(Request $request , Retiro $retiro){

        $retiro->load('usuario');
        $retiro->usuario->cargar();

        return response()->json($retiro);

    }


    private function validar(Request $request, Retiro $retiro = null): Collection {
        return collect($request->validate([
            'id' => 'nullable',
            'usuario_id'  => 'required',
            'monto'       => ['required', function (string $attribute, mixed $value,$fail) use($request,$retiro){
                
                if(is_null($retiro)){
                    $usuario = User::find($request->get('usuario_id'));

                    if ($usuario->cuenta->saldo < $value) {
                        $fail("El {$attribute} no puede ser mayor al saldo en cuenta, el saldo que tiene este usuario es de {$usuario->cuenta->saldo}");
                    }
                }
               
            },],
            'status'      => 'required',
            'comprobante' => 'nullable',
            'nota' => 'nullable',
        ]));


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
        
        try{
            DB::beginTransaction();

            if(isset($datos['comprobante'])){

                $comprobante = $request->file('comprobante');
                $comprobante_name = \sha1($comprobante->getClientOriginalName()).'.'.$comprobante->getClientOriginalExtension();
                Storage::disk('comprobante_retiro')->put($comprobante_name,File::get($comprobante));
            }

            $retiro  = Retiro::create([
                ...$datos->toArray(),
                ...[
                    'comprobante' => isset($comprobante_name) ? $comprobante_name : null
                ]
            ]);

            $retiro->load('usuario');
            $retiro->fresh();

            // Notificar Usuario y Administradores
            $users = User::whereHas('rol',fn(Builder $q) => $q->whereIn('nombre',['Desarrollador','Administrador']))->get();
            $users->push($retiro->usuario);
            Notification::sendNow($users,new NotificarRetiro($retiro));


            // Generar movimiento de cuenta;

            $retiro->usuario->generarMovimiento($retiro->monto,'Retiro de comisiones', Movimiento::TIPO_EGRESO);

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result =false;

        }

        return response()->json(['result' => $result, 'retiro' => $result ? $retiro : null ]);

    }


    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Retiro  $retiro
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Retiro $retiro)
    {
        $datos = $this->validar($request,$retiro);

        try {
            DB::beginTransaction();

            if (isset($datos['comprobante'])) {

                $comprobante = $request->file('comprobante');
                $comprobante_name = \sha1($comprobante->getClientOriginalName()) . '.' . $comprobante->getClientOriginalExtension();
                Storage::disk('comprobante_retiro')->put($comprobante_name, File::get($comprobante));
            }

            $retiro->update([
                ...$datos->toArray(),
                ...[
                    'comprobante' => isset($comprobante_name) ? $comprobante_name : null
                ]
            ]);

            $retiro->load('usuario');
            $retiro->fresh();

            // notificar al usuario del cambio de status
            $retiro->usuario->notify(new RetiroUpdateStatus($retiro));

            if($retiro->status == 4){
                $retiro->usuario->generarMovimiento($retiro->monto, 'Retribución de retiro de comisión', Movimiento::TIPO_INGRESO);
            }

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'retiro' => $result ? $retiro : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Retiro  $retiro
     * @return \Illuminate\Http\Response
     */
    public function destroy(Retiro $retiro)
    {
        try{
            DB::beginTransaction();

            if($retiro->comprobante){
                Storage::disk('comprobante_retiro')->delete($retiro->comprobante);
            }

            $retiro->usuario->generarMovimiento($retiro->monto, 'Retribución de retiro de comisión', Movimiento::TIPO_INGRESO);

            $retiro->delete();

            DB::commit();
            $result =true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result]);


    }

}
