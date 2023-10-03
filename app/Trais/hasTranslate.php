<?php
namespace App\Trais;
use App\Models\Idioma;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use GoogleTranslate;

use function PHPUnit\Framework\isInstanceOf;

trait hasTranslate
{

  public function traducirPropiedades(array $props): void
  {
    $idiomas = Idioma::get();

    foreach ($idiomas as $idioma) {
      $data_collection = $idioma->generateCollection($idioma->getJson($idioma->getNameJson()));

      if ($data_collection instanceof Collection) {
        $modified_collection = clone $data_collection;

        foreach ($props as $prop) {
          if ($idioma->shortLang == 'es') {
            $modified_collection->put($this[$prop], $this[$prop]);
          } else {
            $modified_collection->put($this[$prop], $this->translate($this[$prop], from: 'es', to: $idioma->shortLang));
          }
        }

        // Actualiza la colección en el idioma con la colección modificada
        $this->guardarTraduccion($modified_collection,$idioma->getNameJson());
      }
    }
  }

  public function translate($text,$from = 'es',string $to) : string|null{
      $result = '';
      $traduccion = GoogleTranslate::translate($text,from:$from,to:$to);
      $result = $traduccion['translated_text'];
     return $result ?? '';

  }


  public function guardarTraduccion(Collection $traduccion,$name_json){
    // Convertir la colección a formato JSON y agregar un salto de línea al final
    // $jsonData = $traduccion->toJson(JSON_PRETTY_PRINT) . PHP_EOL;
    // $jsonData = $traduccion->toJson(JSON_UNESCAPED_UNICODE) . PHP_EOL;
    $jsonData = json_encode($traduccion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;
    Storage::disk(Idioma::DISK_TRADUCCIONES)->put($name_json, $jsonData);
  }

  public function quitarTraduccion(array $props) : void{
     $idiomas = Idioma::get();

      foreach($idiomas as $idioma){
          if($data_collection = $idioma->generateCollection($idioma->getJson($idioma->getNameJson()))){
              foreach($props as $prop){
                $data_collection->pull($this[$prop]);
              }
              $this->guardarTraduccion($data_collection,$idioma->getNameJson());
           
          }
      }
  }

}
