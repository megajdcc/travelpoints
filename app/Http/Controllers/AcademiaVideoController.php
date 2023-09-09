<?php

namespace App\Http\Controllers;

use App\Models\AcademiaVideo;
use App\Models\Video;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AcademiaVideoController extends Controller
{
    
    
    public function fetchData(Request $request){
        
        $filtro = $request->all();
        $usuario = $request->user();
        $rolName = $usuario->rol->nombre;


        $pagination = AcademiaVideo::where([
            ['titulo','LIKE',"%{$filtro['q']}%",'OR'],
            ['descripcion', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])
        ->when(\in_array($rolName,['Promotor','Lider','Coordinador']), function($q) use($rolName){
            $q->whereHas('roles',function(Builder $qu) use($rolName) {
                $qu->where('nombre',$rolName);
            });
        })
        ->with(['videos','roles'])
        ->orderBy($filtro['sortBy']?:'id',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage'] ?: 10000);


        return response()->json([
            'videos' => $pagination->items(),
            'total' => $pagination->total()
        ]);

    }

    public function fetch(AcademiaVideo $video){
        
        $video->load(['videos','roles']);

        return response()->json($video);

    }

    private function validar(Request $request, AcademiaVideo $video = null) : Collection{
        return collect($request->validate([
            'titulo'      => 'required',
            'roles'      => 'required',
            'descripcion' => 'nullable',
            'videos'      => 'nullable'
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

       

        try {
            DB::beginTransaction();

                $video = AcademiaVideo::create([
                    ...$datos->except(['videos','roles'])->toArray()
                ]);

                foreach($datos['videos'] as $v){
                    $video->videos()->attach($v);
                }

                foreach ($datos['roles'] as $r) {
                    $video->roles()->attach($r);
                }

                $video->load('videos','roles');

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();

            $result = false;

            dd($th->getMessage());

        }

        return response()->json(['result' => $result,'video' => $result ? $video : null]);
    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademiaVideo  $academia_video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademiaVideo $academia_video)
    {
        $datos = $this->validar($request,$academia_video);

        try {
            DB::beginTransaction();

            $academia_video->update([
                    ...$datos->except(['videos','roles'])->toArray()
            ]);

            $academia_video->roles()->detach();

            $academia_video->videos()->detach();
            
            foreach ($datos['videos'] as $v) {
                $academia_video->videos()->attach($v);
            }

            foreach ($datos['roles'] as $r) {
                $academia_video->roles()->attach($r);
            }

            $academia_video->load('videos', 'roles');

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result, 'video' => $result ? $academia_video : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademiaVideo  $academia_video
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademiaVideo $academia_video)
    {
        try{
            DB::beginTransaction();

            $academia_video->delete();

            // No eliminamos los videos , ya que se pueden usar poss... 

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }


    public function getPanelNegocio(){

        $academia = AcademiaVideo::whereHas('roles',function(Builder $q) {
            $q->where('nombre','Negocio');
        })->get()->load(['roles','videos']);


        return response()->json(['videos' => $academia]);

    }
}
