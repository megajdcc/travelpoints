<?php 
namespace App\Trais;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 */
trait hasLocation
{


   public  function cercanos(array $datos, Int $distancia = 3000): bool
   {

      $theta = $datos['lng'] - $this->lng;
      $dist = sin(deg2rad($datos['lat'])) * sin(deg2rad($this->lat)) +  cos(deg2rad($datos['lat'])) * cos(deg2rad($this->lat)) * cos(deg2rad($theta));
      $dist = acos($dist);
      $dist = rad2deg($dist);
      $miles = $dist * 60 * 1.1515;
      return ($miles * 1.609344) <= $distancia;
   }

   public static function cerca(array $datos,Model $model,Int $distancia = 3000):bool{

      $theta = $datos['lng'] - $model->lng;
      $dist = sin(deg2rad($datos['lat'])) * sin(deg2rad($model->lat)) +  cos(deg2rad($datos['lat'])) * cos(deg2rad($model->lat)) * cos(deg2rad($theta));
      $dist = acos($dist);
      $dist = rad2deg($dist);
      $miles = $dist * 60 * 1.1515;
      return ($miles * 1.609344) <= $distancia;

   }

}

?>