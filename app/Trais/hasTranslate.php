<?php
namespace App\Trais;
use App\Models\Idioma;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use GoogleTranslate;

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
    $jsonPath = Storage::disk(Idioma::DISK_TRADUCCIONES)->path($name_json);

    $jsonData = json_encode($traduccion, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;
    Storage::disk(Idioma::DISK_TRADUCCIONES)->put($name_json, $jsonData);

    $result = Storage::disk(Idioma::DISK_TRADUCCIONES)->put($this->getNameJson(), $jsonData);

    $langPath = base_path('lang/' . $this->shortLang);

    if (!file_exists($langPath)) {
      mkdir($langPath, 0755, true);
    }

    copy($jsonPath, $langPath . '/' . $this->getNameJson());

    return $result;
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
