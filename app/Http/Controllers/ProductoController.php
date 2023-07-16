<?php

namespace App\Http\Controllers;

use App\Models\CategoriaProducto;
use App\Models\Divisa;
use App\Models\Imagen;
use App\Models\Producto;
use App\Models\Sistema;
use App\Models\Tienda;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Trais\cjProduct;
use GuzzleHttp\Client;

class ProductoController extends Controller
{
    use cjProduct;


    public function __construct()
    {
        // $this->middleware('convertir.null')->only(['store','update']);

    }

    public function fetchData(Request $request){
        
        $datos  = $request->all();

        $is_categorias = count($datos['categoria_id']) > 0;
        $is_tiendas = count($datos['tienda_id']) > 0;

        $paginator = Producto::where([
            ['nombre','like',"%{$datos['q']}%","OR"],
            ['breve', 'like', "%{$datos['q']}%", "OR"],
            ['descripcion','like', "%{$datos['q']}%", "OR"],
            ['precio', 'like', "%{$datos['q']}%", "OR"],
            ['caracteristicas', 'like', "%{$datos['q']}%", "OR"],
            ['envio', 'like', "%{$datos['q']}%", "OR"],
        ])
        ->when($is_categorias,function($q) use($datos,$is_tiendas){

            if(CategoriaProducto::whereIn('id',$datos['categoria_id'])->where('nombre','Km 0')->first()?->nombre == 'Km 0'){
                $q->whereIn('categoria_id', $datos['categoria_id'])
                ->when($is_tiendas, function($que) use($datos){

                    $que->whereHas('tiendas',function(Builder $query) use($datos){
                        $query->whereIn('id',$datos['tienda_id']);
                    });

                });
            }else{
                $q->whereIn('categoria_id', $datos['categoria_id']);
            }
            
        })
        ->when($is_tiendas, function($q) use($datos){
                $q->whereHas('tiendas',function(Builder $query) use($datos){
                    $query->whereIn('id',$datos['tienda_id']);
                });
        })
        ->whereBetween('precio',$datos['precios'])
        ->with(['categoria','imagenes','opinions','tiendas','consumos','divisa'])
        ->orderBy('precio', $datos['sortBy'] == 'price-asc' ? 'asc' : 'desc')
        ->paginate($datos['perPage'] ?: 10000,pageName: 'currentPage');

        $productos = collect($paginator->items());


        return response()->json(['total' => $paginator->total(), 'productos' => $productos]);

    }


    public function fetchDataCjDropshipping(Request $request){
        $filtro = $request->all();
        return response()->json($this->fetchDataCj($filtro));
    }


    public function fetch(Producto $producto){

        $producto->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa','opinions']);
        return response()->json($producto);
        
    }


    private function validar(Request $request,Producto $producto = null) : Collection {
        return collect($request->validate([
            'id'              => 'nullable',
            'nombre'          => 'required',
            'breve'           => 'nullable',
            'categoria_id'    => 'required',
            'tiendas'         => 'nullable',
            'precio'          => ['required',function(string $attribute, mixed $value,$fail) use($producto){

                if ($producto && $producto->isChino) {
                    $divisa_producto = Divisa::where('iso','USD')->first();
                    $precio  = $producto->cj['variants'][0]['variantSellPrice'] * 5 ;

                    $precio = $precio / $divisa_producto->tasa;
                    
                    if ((float) $precio > $value) {
                        $fail("El precio del producto no puede ser menor que el precio mínimo establecido");
                    }
                }
            }],
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
        $datos = $this->validar($request,$producto);

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

    public function getDetailsProductoCj(String $producto_id){

        return response()->json(['producto' => $this->getDetailsProduct($producto_id)]);

    }

    

    public function agregarToTravelProductCj(String $pid){

        $producto = $this->getDetailsProduct($pid);

        $categoria = CategoriaProducto::where('nombre','Souvenirs')->first();
        $new_product = null;

        $caracteristicas = collect([
            [
                'nombre' => 'Atributos',
                'valor' => implode(',', $producto->productProEnSet)
            ],
            [
                'nombre' => 'Peso',
                'valor' => $producto->productWeight.' G (Gramos)',
            ],
            [
                'nombre' => 'Sku',
                'valor' => $producto->productSku,
            ],
            [
                'nombre' => 'Embalaje',
                'valor' => implode(',', $producto->packingNameEnSet)
            ],
            [
                'nombre' => 'Enviado por?',
                'valor' => !$producto->addMarkStatus ? 'Por Logística' : 'Por correo, (sin costo)'
            ]
        ]);

        $primer_variant = $producto->variants[0];

        
        $logistic = $this->obtenerLogistic([
                'vid'              => $primer_variant->vid,
                'quantity'         => 2,
                'startCountryCode' => 'CN',
                'endCountryCode'   => 'ES'  
        ]);

        $stock = $this->stockProduc($primer_variant->vid);



        $divisa_principal = Divisa::where('principal',true)->first();

        $divisa_producto = Divisa::where('iso','USD')->first();
        $precio_producto = $producto->variants[0]->variantSellPrice * 5;

        if($divisa_producto){
            $precio_producto = $precio_producto / $divisa_producto->tasa; // para obtener el precio en tps
        }

        $precio_envio = $logistic[0]->logisticPrice;

        if($stock > 0){

            // dd($logistic);

            if ($categoria) {

                try {

                    if ($exist_product = Producto::where('pid', $producto->pid)->first()) {
                        $result = false;
                        $mensaje = 'El producto, que intentas agregar a tus productos travel, ya lo tienes asignado, no lo puedes agregar mas de una vez';
                    } else {

                        // dd($producto);

                        $new_product = Producto::create([
                            'nombre'          => $producto->productNameEn,
                            'breve'           => $producto->entryNameEn,
                            'categoria_id'    => $categoria->id,
                            'precio'          => $precio_producto,
                            'descripcion'     => $producto->description,
                            'caracteristicas' => $caracteristicas,
                            'tipo_producto'   => 1,
                            'divisa_id'       => $divisa_principal->id,
                            'isChino'         => true,
                            'pid'             => $producto->pid,
                            'cj'              => $producto,
                            'variants'        => $producto->variants,
                            'enviable'        => true
                        ]);

                        if($producto->addMarkStatus == 0){
                                
                            $new_product->update([
                                'envio' => [
                                    'precio' => $precio_envio,
                                    'condiciones' => 'Los Precios de envíos pueden variar en relación al peso,cantidad y destino. Tomar en consideración'
                                ],
                            ]);
                            
                        }else{
                            
                            $new_product->update([
                                'envio' => [
                                    'precio' => 0,
                                    'condiciones' => 'Este producto, se envía por correo, totalmente Gratis.'
                                ],
                            ]);
                            
                        }

                        foreach (Tienda::get() as $tienda) {
                            $new_product->tiendas()->attach($tienda->id, ['cantidad' => $stock]);
                        }

                        if (isset($producto->productImageSet) && count($producto->productImageSet) > 0) {

                            foreach ($producto->productImageSet as $key =>  $imagen) {

                                $url = $imagen; // URL de la imagen a descargar

                                $client = new Client();
                                $response = $client->get($url);

                                $nombreArchivo = basename($url); // Obtiene el nombre del archivo de la URL

                                Storage::disk('imagenes_productos')->put($nombreArchivo, $response->getBody()->getContents());

                                // Storage::copy("/public/multimedias/{$img->imagen}", "/public/productos/{$img->imagen}");

                                $new_product->addImagen([
                                    'imagen' => $nombreArchivo,
                                    'portada' => $key == 0 ? true : false
                                ]);
                            }
                        }


                        $new_product->envio;
                        $new_product->caracteristicas;
                        $result = true;
                        $new_product->load(['categoria', 'imagenes', 'tiendas', 'consumos', 'divisa', 'opinions']);
                        $mensaje = 'Se ha agregado con éxito el producto a los productos de la tienda de travelpoints';
                    }

                } catch (\Throwable $th) {
                    $result = false;
                    $mensaje = 'No se pudo agregar el producto, tiene el siguiente error: ' . $th->getMessage();

                    dd($th->getMessage());
                }

            } else {
                $result = false;
                $mensaje = 'No se pudo agregar el producto a la tienda de Travelpoints porque la categoría Souvenir no existe, agregala y vuelva a intentar ';
            }
        }else{
            $result = false;
            $mensaje = 'No se pudo agregar el producto a la tienda de Travelpoints porque no hemos podido obtener la cantidad en el almacen del proveedor';
        }

        
        
        return response()->json(['result' => $result, 'mensaje' => $mensaje, 'producto' => $result ? $new_product : null]);
    }   

    public function cjProductStock(string $vid){

        $stock = $this->stockProduc($vid);

        $divisa_producto = Divisa::where('iso','USD')->first();

        return response()->json(['cantidad' => $stock,'tasa' => $divisa_producto->tasa]);
    }


    
}
