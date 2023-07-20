<?php

namespace App\Trais;

use App\Http\Controllers\ProductoController;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;
use App\Jobs\LimpiarCarrito;
use App\Models\CarritoProducto;
use Illuminate\Database\Eloquent\Builder;

trait hasCarrito{

  public function limpiarCarrito(){

      $this->carritoCompra->each(function ($product) {
      
        if(!$product->isChino){
            $product->tiendas()->updateExistingPivot($product->pivot->tienda_id, [
            'cantidad' => $product->tiendas->where('id', $product->pivot->tienda_id)
              ->reduce(fn ($a, $b)  => $a?->pivot?->cantidad + $b?->pivot?->cantidad) + $product->pivot->cantidad,
          ]);
        }
      });

      $this->carritoCompra()->detach();

      return true;

  }

  public function sacarProducto(Producto $producto)
  {

    $this->carritoCompra->where('id', $producto->id)
      ->each(function ($product) {
        $product->tiendas()->updateExistingPivot($product->pivot->tienda_id, [
          'cantidad' => $product->tiendas->where('id', $product->pivot->tienda_id)
            ->reduce(fn ($a, $b)  => $a?->pivot?->cantidad + $b?->pivot?->cantidad) + $product->pivot->cantidad
        ]);
      });

    $this->carritoCompra()->detach($producto->id);

     return true;
  }

  public function addProducto(array $datos) : bool{

    try {

      DB::beginTransaction();

      $this->carritoCompra()
        ->attach($datos['producto_id'], [
          'tienda_id'       => $datos['tienda_id'],
          'monto'           => $datos['monto'],
          'precio_unitario' => $datos['precio_unitario'],
          'cantidad'        => $datos['cantidad'],
          'vid'             => $datos['vid'],
          'isChino'         => $datos['isChino']
        ]);

      $producto = Producto::find($datos['producto_id']);

      if(!$producto->isChino){
        $producto->tiendas()->updateExistingPivot($datos['tienda_id'], [
          'cantidad' => $producto->tiendas->where('id', $datos['tienda_id'])
            ->reduce(fn ($a, $b) => $a?->pivot?->cantidad + $b?->pivot?->cantidad) - $datos['cantidad']
        ]);
      }

      DB::commit();

      $result = true;
      
      // LimpiarCarrito::dispatch($this)->delay(\now()->addHours(2));

    } catch (\Throwable $th) {
      DB::rollBack();
      $result = false;

      dd($th);
    }

    return $result;
  }


  public function fetchDataCarrito($datos){

    $paginator =  CarritoProducto::where([
      ['cantidad','like',"%{$datos['q']}%","OR"],
      ['monto', 'like', "%{$datos['q']}%", "OR"],
      ['precio_unitario', 'like', "%{$datos['q']}%", "OR"],
    ])
    ->where('cliente_id',$this->id)
      ->with(['producto.divisa','tienda','cliente'])
      ->orderBy('producto_id', $datos['isSortDirDesc'] ? 'desc' : 'asc')
      ->paginate($datos['perPage'] ?: 10000);

      $productos = collect($paginator->items());

      $productos->each(function($produc){
          $produc->producto->cargar();
          $produc->monto = (float) $produc->monto;

          if($produc->vid){
              $producto_controller = new ProductoController();
              $produc->variant = $producto_controller->getVariant($produc->vid);
          }
      });

      return [
        'total' => $paginator->total(),
        'productos' => $productos,
      ];

  }

}

?>