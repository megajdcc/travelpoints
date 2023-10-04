<?php

namespace App\Http\Controllers;

use App\Http\Requests\IdiomaRequest;
use App\Models\Idioma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use GoogleTranslate;

class IdiomaController extends Controller
{
    
    public function getLang(string $lang){

        $idioma = Idioma::where('shortLang', $lang)->first();

        $json = collect($idioma->getJson($idioma->getNameJson()));

        return response()->json($json);

    }
    
    public function fetch(Idioma $idioma){
        return response()->json($idioma);
    }

    public function getLocales(){

        $idiomas = Idioma::get();

        return response()->json($idiomas->map(fn($val) => [
            'locale' => $val->shortLang,
            'img' =>"/storage/flags/{$val->flag}",
            'name' => $val->languaje
        ]));
        
    }
    public function fetchData(Request $request){

        $filtro = $request->all();
        $searchs = collect(['languaje','shortLang']);
      
        $paginations = Idioma::where($searchs->map(fn ($v) => [$v, 'LIKE', "%{$filtro['q']}%", 'OR'])->toArray())
                        ->orderBy($filtro['sortBy'] ?? 'id',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
                        ->paginate($filtro['perPage'] ?? 10);
        
        return response()->json([
            'total' => $paginations->total(),
            'idiomas' => $paginations->items()
        ]);
    }

    public function store(IdiomaRequest $request){

        try {
            DB::beginTransaction();

            if($request->hasFile('flag')){
                $path = $request->flag->store('public/flags');
            }  
            
            if($request->boolean('default')){
                (Idioma::where('default',true)->first())->update(['default' => false]);
            }

            $idioma = Idioma::create([  
                ...$request->collect()->except('flag','default')->toArray(),
                ...['flag' => $path ? Str::afterLast($path, '/') : null,
                    'default' => $request->boolean('default')
                ]
            ]);
            DB::commit();
            // crear archivo json
            $idioma->createJson();

         
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

        return response()->json(['result' => $result, 'idioma' => $idioma ?? null]);
    }


    public function update(IdiomaRequest $request,Idioma $idioma){

        try {
            DB::beginTransaction();
            $path = null;
            if ($request->hasFile('flag')) {
                $path = $request->flag->store('public/flags');
            }

            if ($request->boolean('default')) {
                $idioma_por_defecto = Idioma::where('default', true)->first();
                if($idioma_por_defecto){
                    $idioma_por_defecto->update(['default' => false]);
                }
             
            }

            $idioma->update([
                ...$request->collect()->except('default','flag')->toArray(),
                ...[
                    'flag' => $path ? Str::afterLast($path,'/') :  $idioma->flag,
                    'default' => $request->boolean('default')
                ]
            ]);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'idioma' => $idioma ?? null]);
    }

    public function destroy(Idioma $idioma){


        if($idioma->flag){
            Storage::delete("flags/$idioma->flag");
        }

        $result = $idioma->delete();
        return response()->json(['result' => $result]);

    }


    public function fetchForShortLang(string $lang){
        $idioma = Idioma::where('shortLang',$lang)->first();
        
        $json = collect($idioma->getJson($idioma->getNameJson()));

        return response()->json([
            'idioma' => $idioma,
            'json' => $json
        ]);


    }

    public function changeJson(Request $request,Idioma $idioma){
        $result = $idioma->changeJson($request->input('json'));

        $json = collect($idioma->getJson($idioma->getNameJson()));

         return response()->json([
            'result' => $result,
            'json' => $json
        ]);


    }

    public function traslate(Request $request){
      
        $traslate = GoogleTranslate::translate($request->input('msg'),to:$request->input('locale','en'));

        return response()->json(['traslate' => $traslate]);
    }


}
