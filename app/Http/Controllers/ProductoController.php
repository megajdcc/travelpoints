<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Producto;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{


    public function __construct()
    {
        // $this->middleware('convertir.null')->only(['store','update']);

    }

    public function fetchData(Request $request){
        
        $datos  = $request->all();

        $is_categorias = count($datos['categoria_id']) > 0;
        $paginator = Producto::where([
            ['nombre','like',"%{$datos['q']}%","OR"],
            ['breve', 'like', "%{$datos['q']}%", "OR"],
            ['descripcion','like', "%{$datos['q']}%", "OR"],
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
        

        ->when($is_categorias,function($q) use($datos){
            $q->whereIn('categoria_id',$datos['categoria_id']);
        })
        ->whereBetween('precio',$datos['precios'])
        ->with(['categoria','imagenes','opinions','tiendas','consumos','divisa'])
        ->orderBy('precio', $datos['sortBy'] == 'price-asc' ? 'asc' : 'desc')
        ->paginate($datos['perPage'] ?: 10000);

        $productos = collect($paginator->items());


        return response()->json(['total' => $paginator->total(), 'productos' => $productos]);


    }

    public function fetch(Producto $producto){

        $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa','opinions']);
        return response()->json($producto);
        
    }


    private function validar(Request $request) : Collection {
        return collect($request->validate([
            'id'              => 'nullable',
            'nombre'          => 'required',
            'breve'           => 'nullable',
            'categoria_id'    => 'required',
            'tiendas'         => 'nullable',
            'precio'          => 'required',
            'descripcion'     => 'nullable',
            'caracteristicas' => 'nullable',
            'envio'           => 'nullable',
            'tipo_producto'   => 'required',
            'divisa_id'       => 'required',
            'imagenes'        => 'nullable'

        ],[
            'archivo.required_without' => 'El archivo es importante, no debe faltar'
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

            $producto = Producto::create($datos->except(['tiendas','id','imagenes'])->toArray());

            if(isset($datos['tiendas'])){

                foreach($datos['tiendas'] as $tienda){
                    $producto->tiendas()->attach($tienda['tienda_id'],['cantidad' => $tienda['cantidad']]);
                }

            }

            if (isset($datos['imagenes']) && count($datos['imagenes']) > 0) {
                foreach($datos['imagenes'] as $imagen){

                    $img = Imagen::find($imagen);

                    Storage::copy("/public/multimedias/{$img->imagen}", "/public/productos/{$img->imagen}");

                    $producto->addImagen([
                        'imagen' => $img->imagen,
                    ]);

                }
                
            }
           

            $producto->envio;
            $producto->caracteristicas;
            $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa', 'opinions']);

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th);
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

            $producto->update($datos->except(['tiendas'])->toArray());

            if (isset($datos['tiendas'])) {
                $producto->tiendas()->detach();

                foreach ($datos['tiendas'] as $tienda) {
                    $producto->tiendas()->attach($tienda['tienda_id'], ['cantidad' => $tienda['cantidad']]);
                }
            }


            $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos','divisa','opinions']);

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


    public function cargarArchivo(Request $request, Producto $producto){
        $archivo = $request->file('archivo');
        $archivo_name = sha1($archivo->getClientOriginalName()) . '.' . $archivo->getClientOriginalExtension();
        Storage::disk('archivo_productos')->put($archivo_name, File::get($archivo));

        $producto->archivo = $archivo_name; 

        $result = $producto->save();
        

        $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa','opinions']);


        return response()->json(['result' => $result,'producto' => $producto]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        
        if($producto->tipo_producto == 2){
            Storage::disk('archivo_productos')->delete($producto->archivo);
        }

        $result = $producto->delete();

        return response()->json(['result' => $result]);
    }

    public function rangoPrecios(){

        $precios = collect([
            Producto::count() < 2 ? 0 : (double) Producto::min('precio'),
            (double) Producto::max('precio') ?: 20000
        ]);

        // dd($precios);

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
            $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa','opinions']);

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
