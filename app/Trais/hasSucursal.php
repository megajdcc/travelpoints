<?php

namespace App\Trais;

use App\Models\Sucursal;
use Illuminate\Support\Facades\DB;

/**
 * 
 */
trait hasSucursal
{

  public function sucursales(){
    return $this->morphMany(Sucursal::class,'model');
  }


  public function agregarSucursal(array $datos) : bool{

    try {
      DB::beginTransaction();
      $sucursal = Sucursal::create([
        ...[
          'model_id' => $this->id,
          'model_type' => $this->model_type
        ],
        ...$datos
      ]);
      
      DB::commit();
      $result = true;
    } catch (\Throwable $th) {
      DB::rollBack();
      $result = false;
    }

    return $result;
  }

}

?>