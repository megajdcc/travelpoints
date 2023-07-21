<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use App\Models\Negocio\Negocio;
use App\Models\Negocio\Cupon;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CuponController extends Controller
{
    

    public function fetchDataPublic(Request $request){
        $filtro = $request->all();

        $destinoId = $request->get('destino');
        $usuario_id = $request->get('usuario');

        if($usuario_id){
            $paginator = Cupon::where([
                ['nombre',"LIKE","%{$filtro['q']}%","OR"],
                ['descripcion', "LIKE", "%{$filtro['q']}%", "OR"],
            ])->whereHas('usuarios',function(Builder $q) use($usuario_id){
                $q->where('id',$usuario_id);
            })
                ->orderBy('expide', 'asc')
                ->paginate($filtro['perPage'] ?: 1000);

        }else{
            $paginator = Cupon::where(function ($query) use ($destinoId) {

                $query->whereHas('negocio', function (Builder $query) use ($destinoId) {
                    $query->where('publicado',true)->whereHas('iata', function (Builder $q) use ($destinoId) {
                        $q->where('id', (Destino::find($destinoId))?->iata->id);
                    });
                });
            })
                ->where('activo', true)
                ->whereDate('expide', '<=', Carbon::now())
                ->whereDate('vence', '>=', Carbon::now())
                ->orderBy('expide', 'asc')
                ->paginate($filtro['perPage'] ?: 1000);
        }
       

        $cupones = collect($paginator->items())->each(fn ($val) => $val->cargar());

        return response()->json(['total' => $paginator->total(), 'cupones' => $cupones]);

    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Cupon::where([
            ['nombre','like',"%{$datos['q']}%","OR"],
            ['descripcion', 'like', "%{$datos['q']}%", "OR"],
            ['condiciones', 'like', "%{$datos['q']}%", "OR"],
            ['restricciones', 'like', "%{$datos['q']}%", "OR"],
            ['expide', 'like', "%{$datos['q']}%", "OR"],
            ['vence', 'like', "%{$datos['q']}%", "OR"],
            ['disponibles', 'like', "%{$datos['q']}%", "OR"],
            ['precio', 'like', "%{$datos['q']}%", "OR"],
        ])
        ->where('negocio_id',$datos['negocio_id'])
        ->with(['negocio','divisa'])
        ->orderBy($datos['sortBy'] ?:'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'cupones' => $paginator->items()
        ]);

    }

    public function fetchDataReservas(Request $request){

        $filtro = $request->all();


        $paginator = DB::table('cupon_usuario','cu')
                        ->join('users as u','cu.usuario_id','u.id')
                        ->when($filtro['cupon'] && !empty($filtro['cupon']), function($q) use($filtro){
                            $q->where('cupon_id',$filtro['cupon']);
                        })
                        ->whereIn('status',[1,2])
                        ->orderBy('usuario_id','asc')
                        ->paginate($filtro['perPage']?: 10000);


        $reservas = collect($paginator->items())->each(function($reserva,$key){
            $reserva->id = $key;
            $reserva->usuario = User::find($reserva->usuario_id);
            $reserva->usuario->cargar();
        });


        return response()->json([
            'reservas' => $reservas,
            'total' => $paginator->total()
        ]);
    }



    public function fetch(Cupon $cupon){

        $cupon->load(['negocio','divisa']);
        return response()->json($cupon);

    }


    public function getAll(Negocio $negocio){

        $cupones = $negocio->cupones->load(['negocio','divisa']);

        return response()->json($cupones);

    }

    private function validar(Request $request): array{

        return $request->validate([
            'nombre'        => 'required',
            'descripcion'   => 'required',
            'condiciones'   => 'nullable',
            'restricciones' => 'nullable',
            'imagen'        => 'nullable',
            'expide'        => 'required',
            'vence'         => 'required',
            'disponibles'   => 'required',
            'precio'        => 'required',
            'divisa_id'     => 'required',
            'negocio_id'    => 'required',
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
        try{
            DB::beginTransaction();

            $imagen = $request->file('imagen');

            $imagen_name = \sha1($imagen->getClientOriginalName()).'.'.$imagen->getClientOriginalExtension();
            Storage::disk('negocio_cupones')->put($imagen_name,File::get($imagen));

            $cupon = Cupon::create([...$this->validar($request),...['imagen' => $imagen_name,'activo' => true]]);

            DB::commit();
            $result = true;
            $cupon->load(['negocio','divisa']);

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }
    

        return response()->json(['result' => $result, 'cupon' => $result ? $cupon :null]);


    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Negocio\Cupon  $cupon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cupon $cupon)
    {

        $datos = $this->validar($request,$cupon);
        try {
            DB::beginTransaction();

            $imagen = $request->file('imagen');

            if($imagen){

                Storage::disk('negocio_cupones')->delete($cupon->imagen);

                $imagen = $request->file('imagen');
                $imagen_name = \sha1($imagen->getClientOriginalName()) . '.' . $imagen->getClientOriginalExtension();
                Storage::disk('negocio_cupones')->put($imagen_name, File::get($imagen));

            }
           
            $cupon->update([
                ...$datos,
                ...['imagen' => isset($imagen_name) ? $imagen_name : $cupon->imagen]
            ]);
            
            $cupon->refresh();
           
            DB::commit();
            $result = true;
            $cupon->load(['negocio', 'divisa']);
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'cupon' => $result ? $cupon : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Negocio\Cupon  $cupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cupon $cupon)
    {
        try{
            DB::beginTransaction();

                Storage::disk('negocio_cupones')->delete($cupon->imagen);
            
                $cupon->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function reservarCupon(Cupon $cupon,User $usuario){

        try {
            DB::beginTransaction();
            $result = false;
            
            if($cupon->usuarios->where('id',$usuario->id)->where('pivot.status',1)->count() > 0){
                $message = "Ya tienes un cupón a tu nombre, no puedes reservar otro";
            }else{
                if ($cupon->disponibles > 0) {
                    $cupon->usuarios()->attach($usuario->id, ['status' => 1]);
                    $cupon->disponibles--;
                    $cupon->save();
                    $result = true;
                    $message = "Cupón Reservado con éxito";
                }else{
                    $message = "Cupón Agotado, no puedes reservar un cupón sin disponibilidad";

                }
            }

           
            DB::commit();
           
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
            $message = "Cupón no reservado, inténte de nuevo mas tarde";

        }

        return response()->json(['result' => $result,'cupon' => $cupon,'mensaje' => $message]);
    }
    public function reservar(Request $request){


        $datos = $request->validate([
            'cupon_id' => 'required',
            'usuario_id' => ['required',function($attributo,$valor,$fail) use($request){
                $cupon = Cupon::find($request->get('cupon_id'));

                if($cupon->disponibles == 0){
                    $fail('Este cupón no puede reservarse, no hay disponibilidad');
                }
            }],
        ]);

        try {
            DB::beginTransaction();
                $cupon = Cupon::find($datos['cupon_id']);

                $cupon->usuarios()->attach($datos['usuario_id'],['status' => 1]);
                $cupon->disponibles--;
                $cupon->save();
            DB::commit();
            $result =true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result ]);

    }

    public function cancelarReserva(Cupon $cupon,User $usuario){

        try {
            DB::beginTransaction();
            $usuario->cupones()->wherePivot('status',1)->updateExistingPivot($cupon->id,['status' => 3]);
            $cupon->disponibles++;
            $cupon->save();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

}
