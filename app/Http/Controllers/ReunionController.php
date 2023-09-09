<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReunionRequest;
use App\Jobs\CambiarFechaReunion;
use App\Models\Reunion;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ReunionController extends Controller
{


    public function getAll(User $usuario){
        return response()->json($usuario->reunions->each(fn($reunion) => $reunion->cargar())); 
    }



    public function fetchData(Request $request){
        $filtro = $request->all();
        $paginator = Reunion::where([
            ['titulo','LIKE',"%{$filtro['q']}%",'OR'],
            ['descripcion', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['nota', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_inicio', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['fecha_fin', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])
        ->when(isset($filtro['usuario']) && !empty($filtro['usuario']), function($q) use($filtro){
            $q->where('usuario_id',$filtro['usuario']);
        })
        ->orderBy($filtro['sortBy'],$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage'] ?: '10000');

        $reunions = collect($paginator->items())->each(fn($reunion) => $reunion->cargar());

        return response()->json([
            'reunions' => $reunions,
            'total' => $paginator->total()
        ]);

    }

    public function fetch(Request $request, Reunion $reunion){
        return response()->json($reunion->cargar());
    }


    

    /**
     * Store a newly created resource in storage.
     *
     * @param  ReunionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReunionRequest $request)
    {
        $datos =  collect($request->validated());

        try {
            DB::beginTransaction();
            $reunion = Reunion::create([
                ...$datos->except('archivo')->toArray(),
                ...[
                    'fecha_inicio' => (new Carbon($datos['fecha_inicio'])),
                    'fecha_fin' => $datos['fecha_fin'] ? (new Carbon($datos['fecha_fin'])) : null,
                    'status' => 1
                    ]

            ]);

            if($reunion->tipo_recurrencia == 3){
                // $reunion->recurrente = false;
                // $reunion->save();
                $nueva_fecha = $reunion->fecha_inicio->addYear();
                CambiarFechaReunion::dispatch($reunion,$nueva_fecha)->delay(now()->addYear()->setDay(1)->setMonth(1));
            }

            $reunion->cargar();
            DB::commit();
            $result = true;

            // Verificar si quiere recordatorio
            if($reunion->recordatorio['email'] && !empty($reunion->recordatorio['email'])){
                $reunion->usuario->recordarme($reunion);
            }

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

        return response()->json(['result' => $result,'reunion' => $result ? $reunion : null]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function update(ReunionRequest $request, Reunion $reunion)
    {
        $datos =  collect($request->validate());

        try {
            DB::beginTransaction();
            $reunion->update($datos->except('archivo')->toArray());
            $reunion->cargar();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'reunion' => $result ? $reunion : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reunion $reunion)
    {
        try {
            DB::beginTransaction();
            
            if($reunion->archivo){
                Storage::disk('archivos_reunion')->delete($reunion->archivo);
            }
            
            $reunion->delete();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function guardarArchivo(Request $request, Reunion $reunion){
        
        if($request->hasFile('archivo')){
            $archivo = $request->file('archivo');
            $archivo_name = \sha1($archivo->getClientOriginalName()) . '.' . $archivo->getClientOriginalExtension();
            Storage::disk('archivos_reunion')->put($archivo_name, File::get($archivo));
        }

        try{
            DB::beginTransaction();

            $reunion->archivo = $archivo_name;
            $reunion->save();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }
        $reunion->cargar();

        return response()->json(['result' => $result,'reunion' => $reunion]);
    }

    public function fetchReunions(Request $request){
        $filtro = $request->all();
        $reunions = Reunion::when(isset($filtro['usuario']) && !empty($filtro['usuario']), function ($q) use ($filtro) {
                $q->where('usuario_id', $filtro['usuario']);
            })
            ->orderBy('fecha_inicio', 'asc')
            ->get()->each(fn($reunion) => $reunion->cargar());

        return response()->json($reunions);
    }

}
