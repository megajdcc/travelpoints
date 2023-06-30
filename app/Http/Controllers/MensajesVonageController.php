<?php

namespace App\Http\Controllers;

use App\Models\MensajesVonage;
use App\Models\Tarjeta;
use App\Models\Telefono;
use App\Notifications\TelefonoInvalido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class MensajesVonageController extends Controller
{

    public function fetchDataSms(Request $request){

        $filtro = $request->all();

        $pagination = MensajesVonage::where([
            ['msisdn','LIKE',"%{$filtro['q']}%",'OR'],
            ['to', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['messageId', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['text', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['type', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['keyword', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['message-timestamp', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['timestamp', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['nonce', 'LIKE', "%{$filtro['q']}%", 'OR'],
            ['data', 'LIKE', "%{$filtro['q']}%", 'OR'],
        ])->orderBy($filtro['sortBy'] ?:'id',$filtro['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($filtro['perPage']?:1000);

        return response()->json([
            'mensajes' => $pagination->items(),
            'total' => $pagination->total(),
        ]);

    }

    public function smsEntrante(Request $request){

        $datos = $request->all();

        try {
            DB::beginTransaction();
            
            $mensaje = MensajesVonage::create($datos);

            $this->validarTarjeta($mensaje);

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }

        return response()->json([],200);

    }


    private function validarTarjeta(MensajesVonage $mensaje) :bool{

        $result = false;
        $texto = $mensaje->text;
        $patron = "/\b\d{8}\b/";
        preg_match($patron, $texto, $coincidencias);

        $numero_telefono = $mensaje->msisdn;

        if(strlen($numero_telefono) > 12){
            $numero_telefono = substr($numero_telefono,2);
        }

        $telefono = Telefono::where([
            ['telefono','LIKE',"%{$numero_telefono}%"]
        ])->first();

        $responder = function(string $mensaje = 'No estás autorizado. Número no asociado. (Travelpoints)') use($numero_telefono){
            $basic  = new \Vonage\Client\Credentials\Basic("14c4ea63", "I35YctljjnDrU4Qt");
            $client = new \Vonage\Client($basic);
            // Notification::send($numero_telefono,new TelefonoInvalido);

            $response = $client->sms()->send(
                new \Vonage\SMS\Message\SMS($numero_telefono, '34683788880',$mensaje)
            );
        };

        if($telefono){


            $model = $telefono->model;

            if($model->model_type == 'App\Models\User'){
                if(\in_array($model->rol->nombre,['Desarrollador','Administrador','Promotor','Lider','Coordinador'])){
                    if ($numero_tarjeta = $coincidencias[0]) {
                        
                        if ($tarjeta = Tarjeta::where('numero', $numero_tarjeta)->first()) {
                            
                            $lote = $tarjeta->lote;

                            if (\in_array($model->rol->nombre, ['Desarrollador', 'Administrador'])) {
                                $tarjeta->validada = true;
                                $tarjeta->save();
                                $result = true;
                                $responder('Tarjeta Validada con éxito; El viajero puede asociar la tarjeta cuando guste, hazlo saber. (Travelpoints)');
                            }else {
                                if ($lote->usuario_id == $model->id) {
                                    $tarjeta->validada = true;
                                    $tarjeta->save();
                                    $result = true;
                                    $responder('Tarjeta Validada con éxito; El viajero puede asociar la tarjeta cuando guste, hazlo saber. (Travelpoints)');
                                }else{
                                    $responder('No estas autorizado para validar este número de tarjeta. (Travelpoints)');
                                }
                            }

                        }else{
                            $responder('El número de tarjeta proporcionado no existe, intente con otro. (Travelpoints)');
                        }

                    }else{
                        $responder('El número de tarjeta proporcionado es invalido, inténte con otro. (Travelpoints)');
                    }
                }else{
                    $responder();
                }
               
            }else{
                $responder();
            }
            
           

        }else{

           $responder();
        }

        

       return $result;

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MensajesVonage  $mensajesVonage
     * @return \Illuminate\Http\Response
     */
    public function show(MensajesVonage $mensajesVonage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MensajesVonage  $mensajesVonage
     * @return \Illuminate\Http\Response
     */
    public function edit(MensajesVonage $mensajesVonage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MensajesVonage  $mensajesVonage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MensajesVonage $mensajesVonage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MensajesVonage  $mensajesVonage
     * @return \Illuminate\Http\Response
     */
    public function destroy(MensajesVonage $mensajesVonage)
    {
        //
    }


    public function eliminarSMS(MensajesVonage $mensaje){

       $result = $mensaje->delete();

       return response()->json(['result' => $result]);

    }
}
