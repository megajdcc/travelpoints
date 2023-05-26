<?php
namespace App\Trais;
use App\Models\Sistema;
use Illuminate\Support\Facades\Http;

trait cjProduct{

  public function getDetailsProduct(String $producto_id)
  {

    $sistema = Sistema::first();

    $response = Http::withHeaders([
      'CJ-Access-Token' => $sistema->cjdropshipping['accessToken']
    ])->get('https://developers.cjdropshipping.com/api2.0/v1/product/query', [
      'pid' => $producto_id
    ]);

    $producto = null;

    if ($response->ok()) {

      $data = $response->object();

      if ($data->result) {
        $producto = $data->data;
      }
    }

    return $producto;
  }


  public function fetchDataCj(array $filtro) : array{

    $sistema = Sistema::first();

    $productos = collect([]);
    $total = 0;
    $response = Http::withHeaders([
      'CJ-Access-Token' => $sistema->cjdropshipping['accessToken']
    ])
      ->get('https://developers.cjdropshipping.com/api2.0/v1/product/list', [
        'pageNum'            => $filtro['page'],
        'pageSize'        => $filtro['perPage'],
        'categoryId'      => $filtro['categoria_id'] ?: '',
        'categoryKeyword' => $filtro['q'] ?: '',
        'productoSku' => $filtro['q'] ?: '',
        'pid' => $filtro['q'] ?: ''
      ]);

    if ($response->ok()) {

      $data  = $response->object();

      if ($data->result) {
        $productos = collect($data->data->list);
        $total = $data->data->total;
      }
    }

    return ['productos' => $productos, 'total' => $total];

  }

  public function obtenerLogistic(array $data) : array {

    $result = [];
    $sistema = Sistema::first();

    $response = Http::withHeaders([
      'CJ-Access-Token' => $sistema->cjdropshipping['accessToken']
    ])->post('https://developers.cjdropshipping.com/api2.0/v1/logistic/freightCalculate',[
       
        'startCountryCode' => $data['startCountryCode'],
        'endCountryCode' => $data['endCountryCode'],
        'products' => [
          [
            'vid' => $data['vid'],
            'quantity' => $data['quantity'],
          ]
        ]

      ]);
   

    if($response->ok()){
      
      $data = $response->object();
      
      // dd($data);

      if($data->result){
          $result = $data->data;
      }
      
    }


    return $result;

  }

  public function stockProduc(string $vid) : int{

    $result = 0;

    $sistema = Sistema::first();

    $response = Http::withHeaders([
      'CJ-Access-Token' => $sistema->cjdropshipping['accessToken']
    ])
      ->get('https://developers.cjdropshipping.com/api2.0/v1/product/stock/queryByVid', [
        'vid' => $vid,
      ]);

    if ($response->ok()) {

      $data = $response->object();

      // dd($data);

      if ($data->result) {
        $result = $data->data[0]->storageNum;
      }
    } 

    return $result;

  }


}

?>

