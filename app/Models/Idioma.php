<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Trais\hasTranslate;
use Illuminate\Support\Facades\App;

class Idioma extends Model
{
    use HasFactory, hasTranslate;

    public const DISK_TRADUCCIONES = 'traducciones';

    protected $fillable = [

        'languaje',
        'shortLang',// example es,en,uk
        'flag',
        'default', 
    ];

    protected $casts= [
        'default' => 'boolean'
    ];



    public function createJson(){
        $data = $this->generateJson($this->getJson());
        $jsonData = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;

        $name_json = Str::slug($this->shortLang).'.json';
        $jsonPath = Storage::disk(Idioma::DISK_TRADUCCIONES)->path($name_json);
        Storage::disk(Idioma::DISK_TRADUCCIONES)->put($name_json, $jsonData);

        // Copia el archivo JSON al directorio lang en el directorio raíz
        $langPath = base_path('lang');
        if (!file_exists($langPath)) {
            mkdir($langPath, 0755, true);
        }
        copy($jsonPath, $langPath . '/' . $name_json);

    }





    private function generateJson($json){

        $data = new Collection();

        foreach ($json as $key => $value) {
            if (is_object($value) || is_array($value)) {
                $data->put($key, $this->generateJson($value));
            } else {
                $data->put($key, $this->shortLang == 'es' ? $value : $this->translate($value,from:'es',to:$this->shortLang));
                // $translatedValue = $this->shortLang == 'es' ? $value : $this->translate($value, from: 'es', to: $this->shortLang);

                // // Eliminar comillas dobles del texto traducido
                // $translatedValue = str_replace(['[',']'], '', $translatedValue);

                // $data->put($key, $translatedValue);
            }
        }

        return $data;

    }

    public function generateCollection($json){
        $data = new Collection();

        foreach ($json as $key => $value) {

            if(is_object($value) || is_array($value)){
                $data->put($key, $this->generateCollection($value));
            } else {
                $data->put($key,$value);
            }

        }

        return $data;
    }


    public function getJson(string $name_json = 'default.json'){
        if($name_json === 'default.json'){
            $archivo = Storage::get('public/default.json');
        }else{
            $archivo = Storage::disk('traducciones')->get($name_json);
        }
        return \json_decode($archivo);
    }

    public function changeJson($json) : bool{

        $jsonData = json_encode(collect($json), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;

        $jsonPath = Storage::disk(Idioma::DISK_TRADUCCIONES)->path($this->getNameJson());

        $result =  Storage::disk(Idioma::DISK_TRADUCCIONES)->put($this->getNameJson(),$jsonData);

        $langPath = base_path('lang');
        
        if (!file_exists($langPath)) {
            mkdir($langPath, 0755, true);
        }
        
        copy($jsonPath, $langPath . '/' . $this->getNameJson());

        return $result;

    }

    public function getNameJson(){
        return $this->shortLang.'.json';
    }
    
}   
