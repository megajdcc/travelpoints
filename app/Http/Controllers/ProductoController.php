<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    

    public function fetchData(Request $request){
        
        $datos  = $request->all();

        $is_categorias = count($datos['categoria_id']) > 0;

        $paginator = Producto::where([
            ['nombre','like',"%{$datos['q']}%","OR"],
            ['breve', 'like', "%{$datos['q']}%", "OR"],
            ['descripcion', 'like', "%{$datos['q']}%", "OR"],
            ['disponibles', 'like', "%{$datos['q']}%", "OR"],
            ['precio', 'like', "%{$datos['q']}%", "OR"],
            ['caracteristicas', 'like', "%{$datos['q']}%", "OR"],
            ['envio', 'like', "%{$datos['q']}%", "OR"],
        ])
        ->whereHas('categoria',function(Builder $q) use($datos){
            $q->orWhere([
                ['nombre','LIKE',"%{$datos['q']}%","OR"],
                ['descripcion', 'LIKE', "%{$datos['q']}%", "OR"]
            ]);
        })
        
        ->whereHas('tienda', function (Builder $q) use ($datos) {
            $q->orWhere([
                ['nombre', 'LIKE', "%{$datos['q']}%", "OR"],
            ]);
        })
        ->when($is_categorias,function($q) use($datos){
            $q->whereIn('categoria_id',$datos['categoria_id']);
        })
        ->whereBetween('precio',$datos['precios'])
        ->with(['categoria','imagenes','opinions','tienda.divisa'])
        ->orderBy('precio', $datos['sortBy'] == 'price-asc' ? 'asc' : 'desc')
        ->paginate($datos['perPage'] ?: 10000);

        return response()->json(['total' => $paginator->total(), 'productos' => $paginator->items()]);


    }

    public function fetch(Producto $producto){

        $producto->load(['categoria', 'imagenes', 'opinions', 'tienda.divisa']);

        return response()->json($producto);
        
    }


    private function validar(Request $request){
        return $request->validate([
            'nombre'          => 'required',
            'breve' => 'nullable',
            'categoria_id'    => 'required',
            'tienda_id'       => 'required',
            'precio'          => 'required',
            'disponibles'     => 'required',
            'descripcion'     => 'nullable',
            'caracteristicas' => 'nullable',
            'envio'           => 'nullable',

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

            $producto = Producto::create($datos);

            $producto->load(['categoria','tienda']);
            $producto->envio;
            $producto->caracteristicas;

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'producto' => $result ? $producto : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $producto->update($datos);


            $producto->load(['categoria', 'tienda']);
            $producto->envio;
            $producto->caracteristicas;

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'producto' => $result ? $producto : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        $result = $producto->delete();

        return response()->json(['result' => $result]);
    }

    public function rangoPrecios(){

        $precios = collect([
            Producto::min('precio') ?: 0,
            Producto::max('precio') ?: 20000
        ]);

        return response()->json($precios);
        
    }

    public function cargarImagen(Request $request, Producto $producto)
    {

        $files = $request->file('imagen');

        try {
            DB::beginTransaction();

            foreach ($files as $file) {

                $file_name = \sha1($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

                Storage::disk('imagenes_productos')->put($file_name, File::get($file));

                $producto->addImagen([
                    'imagen' => $file_name,
                ]);
            }

            $producto->refresh();

            $producto->imagenes;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'producto' => $producto]);
    }



    public function eliminarImagen(Producto $producto, Imagen $imagen)
    {

        try {
            DB::beginTransaction();
            Storage::disk('imagenes_productos')->delete($imagen->imagen);
            $imagen->delete();
            
            
            $producto->imagenes;
            $producto->model;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'producto' => $producto]);
    }
    
}
