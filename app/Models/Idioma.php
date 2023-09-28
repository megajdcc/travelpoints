<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
class Idioma extends Model
{
    use HasFactory;

    protected const DISK_TRADUCCIONES = 'traducciones';

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

        $jsonData = $data->toJson();

        $name_json = Str::slug($this->shortLang).'.json';

        Storage::disk(Idioma::DISK_TRADUCCIONES)->put($name_json, $jsonData);
        // Storage::put(resource_path('/js/libs/i18n/idiomas').$name_json, $jsonData);
    }





    private function generateJson($json){

        $data = new Collection();

        foreach ($json as $key => $value) {
            if (is_object($value) || is_array($value)) {
                $data->put($key, $this->generateJson($value));
            } else {
                $data->put($key, $this->shortLang == 'es' ? $value : '');
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
        return Storage::disk(Idioma::DISK_TRADUCCIONES)->put($this->getNameJson(), collect($json)->toJson());
    }

    public function getNameJson(){
        return $this->shortLang.'.json';
    }
    
}   
