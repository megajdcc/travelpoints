<?php

namespace App\Models;

use App\Models\Negocio\Empleado;
use App\Models\Negocio\Negocio;
use App\Models\Negocio\Reservacion;
use App\Trais\hasOpinion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Venta extends Model
{
    use HasFactory,hasOpinion;

    // public string $model_type = 'App\Models\Venta';

    protected $fillable = [
        'divisa_id',
        'monto',
        'comision', // Monto de la comisión para el momento
        'tipo_comision', // 1 => Porcentaje por venta 2 => Monto por personas
        'tps',
        'tps_referente',
        'certificado',
        'model_id',
        'model_type',
        'empleado_id',
        'cliente_id',
        'personas',
        'reservacion_id',
        'cantidad',
        'tps_bonificados'
    ];


    public $casts = [
        'certificado' => 'boolean'
    ];

    public function model(){
        return $this->morphTo();
    }

    public function cliente(){
        return $this->belongsTo(User::class,'cliente_id','id');
    }

    public function empleado(){
        return $this->belongsTo(Empleado::class,'empleado_id','id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function reservacion(){
        return $this->belongsTo(Reservacion::class,'reservacion_id','id');
        
    }


    public function cargar(){
        $this->reservacion;
        $this->divisa;
        
        if($this->empleado){
            $this->empleado->usuario;
            $this->empleado->usuario->avatar = $this->empleado->usuario->getAvatar();
        }

        $this->cliente->avatar = $this->cliente->getAvatar();

        if($this->model->model_type == 'App\Models\Producto'){
            $this->model?->tienda?->divisa;
        }

        $this->cliente;
        $this->model;
        $this->opinions->load(['usuario','model'])->each(function($opinion) {
            $opinion->usuario->avatar = $opinion->usuario->getAvatar();
        });
        return $this;
    }


    public static function totalOperacionesRegistradas($filtro,$rango_fecha = null){

        $sq1 =  DB::table('ventas', 'v')
            ->selectRaw('count(v.id) as ventas')
            ->join('negocios as n', 'v.model_id', 'n.id')
                ->join('estados as es', 'n.estado_id', 'es.id')
                ->join('pais as p', 'es.pais_id', 'p.id')
                ->when(isset($filtro['negocio_id']) && !empty($filtro['negocio_id']), function ($query) use ($filtro) {
                    $query->where('n.id', $filtro['negocio_id']);
                })

                ->when(isset($filtro['pais_id']) && !empty($filtro['pais_id']), function ($query) use ($filtro) {
                    $query->where('p.id', $filtro['pais_id']);
                })
                ->when(isset($filtro['destino_id']), function ($query) use ($filtro) {
                    $query->where('n.iata_id', Destino::find($filtro['destino_id'])->iata_id);
                })
                ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                    $q->whereBetween('v.created_at', $rango_fecha);
                })


                ->where('v.model_type', "App\\Models\\Negocio\\Negocio")
                ->first();

                

        return $sq1;
    }


    public static function montoPromedioPorOperacion($filtro, $rango_fecha){

        $promedios = DB::table('ventas','v')
            ->selectRaw('avg(v.monto) as promedio,d.nombre as divisa')
            ->join('divisas as d','v.divisa_id','d.id')
            ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                $q->whereBetween('v.created_at', $rango_fecha);
            })
            ->where('v.model_type', "App\\Models\\Negocio\\Negocio")
            ->groupBy('divisa')
            ->get();
        
            $divisa = Divisa::where('iso','USD')->first();
        foreach($promedios as $promedio){
            $divi = Divisa::where('nombre', $promedio->divisa)->first();
            $promedio->promedio = $divisa->convertir($divi,$promedio->promedio);
        }
        $promedio = 0;

        if($promedios->count() > 0){
            $promedio = $promedios->sum(fn ($val) => $val->promedio) / $promedios->count();
        }
       
        return round($promedio,2);

    }

    public static function montoPromedioPorUsuario($filtro , $rango_fecha = null){
        $promedioPorUsuario = DB::table('ventas','v')
            ->select('v.cliente_id', DB::raw('AVG(v.monto) as promedio'), 'd.nombre as divisa')
            ->join('divisas as d','v.divisa_id','d.id')
            ->where('v.model_type',"App\\Models\\Negocio\\Negocio")
            ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                $q->whereBetween('v.created_at', $rango_fecha);
            })
            ->groupBy('cliente_id','divisa')
            ->get();

        $divisa = Divisa::where('iso', 'USD')->first();

        foreach ($promedioPorUsuario as $promedio) {
            $divi = Divisa::where('nombre', $promedio->divisa)->first();
            $promedio->promedio = $divisa->convertir($divi, $promedio->promedio);
        }

        $promedio = 0;

        if($promedioPorUsuario->count() > 0){
            $promedio = $promedioPorUsuario->sum(fn ($val) => $val->promedio) / $promedioPorUsuario->count();
        }
    
        

        return $promedio;
    }


    public static function registroPorUsuario($filtro, $rango_fecha = null){
        $totalVentasPorUsuario = DB::table('ventas','v')
            ->select('v.cliente_id', DB::raw('count(v.id) as ventas'))
            ->where('v.model_type', "App\\Models\\Negocio\\Negocio")
            ->when(is_iterable($rango_fecha) && count($rango_fecha) > 1, function ($q) use ($rango_fecha) {
                $q->whereBetween('v.created_at', $rango_fecha);
            })
            ->groupBy('v.cliente_id')
            ->get();
        

        $promedio = 0;

        if ($totalVentasPorUsuario->count() > 0) {
            $promedio = $totalVentasPorUsuario->sum(fn ($val) => $val->ventas) / $totalVentasPorUsuario->count();
        }

        return $promedio;

    }

    public static function travelpointsGenerados(){
        return Venta::get()->sum('tps');
    }

    public static function travelpointsConsumados(){
        return Consumo::sum('tps');
    }

    public static function totalIngresosTienda(){
        return Consumo::sum('total');
    }

    public function getComisionTravel(){

        $negocio = $this->model;
        $comision_travel = 0;
        if($negocio->tipo_comision == 1){
            $comision_travel = $this->monto * $negocio->comision / 100;
        }else{
            $comision_travel = $negocio->comision * $this->personas;
        }
        return $comision_travel;
    }

}
