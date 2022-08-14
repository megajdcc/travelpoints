<?php

namespace App\Http\Controllers;

use App\Models\Negocio\NegocioCategoria;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\{Storage,DB,File};



class NegocioCategoriaController extends Controller
{
    
    
    public function getAll(){
        
        $categorias = NegocioCategoria::all();
        return response()->json($categorias);

    }
    
    public function getCategoria(NegocioCategoria $categoria){
        return response()->json($categoria);
    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = NegocioCategoria::where([
            ['categoria','LIKE','%'.$datos['q'].'%','OR'],
            ['descripcion', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
        ])
        ->orderBy($datos['sortBy'],$datos['sortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


    
        $categorias = $paginator->items();

        // dd($categorias);

        // foreach ($categorias as $categoria) {
        //     $categoria->imagen;
        // }

        return response()->json([
            'categorias' => $categorias,
            'total' => $paginator->total()
        ]);

    }


    private function validar(Request $request,NegocioCategoria $categoria = null) :array{

        return $request->validate([
            'categoria' => ['required',$categoria ? Rule::unique('negocio_categorias','categoria')->ignore($categoria) : 'unique:negocio_categorias,categoria'],
            'descripcion' => 'nullable',
            'imagen' => 'nullable'
        ],[
            'categoria.unique' => 'La categoría ya está registrada'
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

        $file = $request->file('imagen');
        $file_name = null;

        if($file){
            $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->put("negocios/categorias/{$file_name}", File::get($file));
        }

        $categoria = NegocioCategoria::create([...$this->validar($request),...['imagen' => $file_name]]);

        return response()->json(['result' => true,'categoria' => $categoria]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Negocio\NegocioCategoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NegocioCategoria $categoria)
    {

        $datos = $this->validar($request,$categoria);
        $file = $request->file('imagen');
        $file_name = null;
        
        if ($file && $categoria->imagen) {
            Storage::disk('public')->delete($categoria->imagen);
            $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->put("negocios/categorias/{$file_name}", File::get($file));

        }else if($file){ 
            $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->put("negocios/categorias/{$file_name}", File::get($file));
        }

        try{
            DB::beginTransaction();
                $categoria->categoria = $datos['categoria'];
                $categoria->descripcion = $datos['descripcion'];
                if($file_name){
                    $categoria->imagen = $file_name;
                }
                $categoria->save();
            DB::commit();
            $result = true;
        }catch(\Exception $e){

            dd($e->getMessage());
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'categoria' => $categoria]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Negocio\NegocioCategoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy(NegocioCategoria $categoria)
    {
        try{
            DB::beginTransaction();


            Storage::disk('negocio-categoria')->delete($categoria->imagen);

            $categoria->delete();

            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result =false;
        }

        return response()->json(['result' => $result]);
    }
}
