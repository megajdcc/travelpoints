<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Retiro extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'monto',
        'status', // 1 => Solicitado , 2 => En proceso,3 => Procesado , 4 => Rechazado
        'comprobante',
        'nota',
        'divisa_id',
        'recibo'
    ];

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function divisa(){
        return $this->belongsTo(Divisa::class,'divisa_id','id');
    }

    public function impuestos(){
        return $this->belongsToMany(Impuesto::class, 'retiros_impuesto','retiro_id','impuesto_id')->withPivot(['monto','cuota']);
    }   


    public function generarRecibo() :bool{

        $logotipo = "data:image/png;base64," . base64_encode(Storage::disk('public')->get('logotipo.png'));
        $result = false;

        $sistema = Sistema::first();
        try {

            $destino_usuario = $this->usuario->destino->load('estado.pais');
            $impuestos = Impuesto::whereHas('divisa',fn(Builder $q) => $q->where('id',$this->divisa_id))->withCasts(['estado.autonomo' => 'boolean'])->with('estado.pais')->get();
            if($impuestos->count() > 0 && $destino_usuario->estado->autonomo){
                if($impuestos->contains(fn($v,$k) => $v->estado->autonomo && $v->estado->id === $destino_usuario->estado_id)){

                    // $impuesto_asignado = $impuestos->whereHas('estado',fn($q) => $q->where('autonomo',true)->where('id',$destino_usuario->estado_id))->first();
                    $impuesto_asignado = $impuestos->filter(function ($impuesto) use($destino_usuario) {
                        return $impuesto->estado->autonomo && $impuesto->estado_id === $destino_usuario->estado_id;
                    })->first();

                    $impuesto =  $this->monto * $impuesto_asignado->cuota / 100;
                    $cuota = $impuesto_asignado->cuota;

                    $this->impuestos()->attach($impuesto_asignado->id,[
                        'cuota' => $cuota,
                        'monto' => $impuesto
                    ]);

                    $pdf = Pdf::loadView("pdfs.recibo", [
                        ...$this->toArray(),
                        ...[
                            'logotipo' => $logotipo,
                            'solicitante' => $this->usuario,
                            'items' => [['fecha' => $this->created_at, 'concepto' => 'Servicios de Promoción', 'total' => $this->monto, 'divisa' => $this->divisa]],
                            'abrev' => $impuesto_asignado->abrev,
                            'cuota' => $cuota,
                            'impuesto' => $impuesto,
                            'divisa_impuesto' => $impuesto_asignado->divisa,
                            'pagar' => $this->monto + $impuesto,
                            'divisa' => $this->divisa,
                            'sistema' => $sistema

                        ]
                    ]);


                    $pdf->setPaper('a4', 'landscape');
                    $pdf->setOption([
                        'dpi' => 150,
                        'isHtml5ParserEnabled' => true,
                        'default_font' => 'MYRIADPRO-COND.OTF'
                    ]);
                    $this->recibo  = "factura-{$this->id}.pdf";
                    $pdf->save($this->recibo, 'recibo_retiro');
                    $result = $this->save();

                    // ->stream($this->recibo);
                // $pdf->save($this->recibo, 'recibo_retiro');
                }
              
            
            }else if($impuestos->count() > 0 && !$destino_usuario->estado->autonomo){
                $impuesto_asignado = $impuestos->first();
                
                $impuesto =  $this->monto * $impuesto_asignado->cuota / 100;
                $cuota = $impuesto_asignado->cuota;

                $this->impuestos()->attach($impuesto_asignado->id, [
                    'cuota' => $cuota,
                    'monto' => $impuesto
                ]);
                

                $pdf = Pdf::loadView("pdfs.recibo", [
                    ...$this->toArray(),
                    ...[
                        'logotipo' => $logotipo,
                        'solicitante' => $this->usuario,
                        'items' => [['fecha' => $this->created_at, 'concepto' => 'Servicios de Promoción', 'total' => $this->monto, 'divisa' => $this->divisa]],
                        'abrev' => $impuesto_asignado->abrev,
                        'cuota' => $cuota,
                        'impuesto' => $impuesto,
                        'divisa_impuesto' => $impuesto_asignado->divisa,
                        'pagar' => $this->monto + $impuesto,
                        'divisa' => $this->divisa,
                        'sistema' => $sistema

                    ]
                ]);


                $pdf->setPaper('a4', 'landscape');
                $pdf->setOption([
                    'dpi' => 150,
                    'isHtml5ParserEnabled' => true,
                    'default_font' => 'MYRIADPRO-COND.OTF'
                ]);
                $this->recibo  = "factura-{$this->id}.pdf";



                $pdf->save($this->recibo, 'recibo_retiro');

                $result = $this->save();
                // ->stream($this->recibo);

            }

           
           
        } catch (\Throwable $th) {
            throw new \Exception("No se pudo generar el recibo: {$th->getMessage()}", 1);
        }
        return $result;
    }


    
}
