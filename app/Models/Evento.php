<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trais\{hasImages};
use App\Jobs\VerificarEvento;

class Evento extends Model
{

    use HasFactory;
    use hasImages;

    public readonly string $model_type;

    public function __construct()
    {
        $this->model_type = 'App\Models\evento';
    }

    protected $fillable = [
        'titulo',
        'contenido',
        'fecha_inicio',
        'fecha_fin',
        'status', // 1 > activo 2 > vencido 3 > destiempo
        'model_id',
        'model_type',
        'recurrente',
        'url'
    ];

    public $casts = [
        'recurrente' => 'boolean',
        'fecha_inicio' => 'datetime:Y-m-d H:i:s',
        'fecha_fin' => 'datetime:Y-m-d H:i:s'
    ];


    public $attributes = [
        'status' => 1,
    ];

    public function model(){
        return $this->morphTo();
    }

    public function establecerEstaus(){

        if($this->recurrente){

            if(now()->isAfter($this->fecha_fin)){
                $this->status = 3;
                $this->fecha_inicio = $this->fecha_inicio->addYear();
                $this->fecha_fin = $this->fecha_fin->addYear();
                $this->save();
                VerificarEvento::dispatch($this)->delay($this->fecha_inicio->addMinute());

            }


            if(now()->between($this->fecha_inicio, $this->fecha_fin)) {
                $this->status = 1;
                $this->save();
                VerificarEvento::dispatch($this)->delay($this->fecha_fin->addMinute());
            }

            if (now()->isBefore($this->fecha_inicio)) {
                $this->status = 3;
                $this->save();

                VerificarEvento::dispatch($this)->delay($this->fecha_inicio->addMinute());
            }



        }else{

            if(now()->isAfter($this->fecha_fin)){
                $this->status = 2;
                $this->save();
            }

            if(now()->between($this->fecha_inicio,$this->fecha_fin)){
                $this->status = 1;
                $this->save();
                VerificarEvento::dispatch($this)->delay($this->fecha_fin->addMinute());
            }

            if(now()->isBefore($this->fecha_inicio)){
                $this->status = 3;
                $this->save();
                VerificarEvento::dispatch($this)->delay($this->fecha_inicio->addMinute());
            }

           
        }



    }


}
