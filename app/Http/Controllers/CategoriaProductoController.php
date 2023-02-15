<?php

namespace App\Http\Controllers;

use App\Models\CategoriaProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CategoriaProductoController extends Controller
{

    public function fetch(CategoriaProducto $categoria){
        return response()->json($categoria->load(['productos']));
    }



    public function fetchData(Request $request){
            $datos = $request->all();

            $paginator = CategoriaProducto::where([
                ['nombre','LIKE',"%{$datos['q']}%",'OR'],['descripcion', 'LIKE', "%{$datos['q']}%", 'OR'], 
            ])
            ->with('productos')
            ->orderBy($datos['sortBy'] ?: 'id',$datos['isSortDirDesc'] ? 'desc': 'asc')
            ->paginate($datos['perPage']?:10000);
            
        return response()->json([
            'total' => $paginator->total(),
            'categorias' => $paginator->items(),
        ]);

    }


    private function validar(Request $request,CategoriaProducto $categoria = null) :array{

        return $request->validate([
            'nombre' => ['required', $categoria ? Rule::unique('categoria_productos','nombre')->ignoreModel($categoria) : 'unique:categoria_productos,nombre'],
            'descripcion' => 'nullable'
        ],[
            'nombre.unique' => 'La categoría ya está registrada, intente con otra'
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

        try {
            
            DB::beginTransaction();

            $categoria = CategoriaProducto::create($datos);

            $categoria->load('productos');


            DB::commit();

            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();

            $result = false;

            
        }


        return response()->json(['result' => $result,'categoria' => $result ? $categoria : null]);




    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CategoriaProducto  $categoria_producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoriaProducto $categoria_producto)
    {

        try {
            DB::beginTransaction();

            $categoria_producto->update($this->validar($request, $categoria_producto));

            $categoria_producto->load('productos');


            DB::commit();

            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();

            $result = false;

            dd($th->getMessage());
        }


        return response()->json(['result' => $result, 'categoria' => $result ? $categoria_producto : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CategoriaProducto  $categoria_producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaProducto $categoria_producto)
    {
        try {
            DB::beginTransaction();
            $categoria_producto->delete();
            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);

    }
}
