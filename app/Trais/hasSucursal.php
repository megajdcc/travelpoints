<?php

namespace App\Trais;

use App\Models\Sucursal;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * 
 */
trait hasSucursal
{

  public function sucursales(){
    return $this->morphMany(Sucursal::class,'model');
  }


  public function agregarSucursal(array | Collection $datos) : Sucursal | null{
    // dd($datos);
    $sucursal = Sucursal::create([
      ...$datos,
      ...['model_id' => $this->id, 'model_type' => $this->model_type],
    ]);


    return $sucursal;
  }

}

?>