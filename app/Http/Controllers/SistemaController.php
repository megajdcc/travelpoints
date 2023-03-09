<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Red;
use App\Models\Sistema;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\{DB,File,Storage};
use ParagonIE\Sodium\Compat;

use function PHPUnit\Framework\isNull;

class SistemaController extends Controller
{
   
    public function fetch(){

        $sistema = Sistema::first();
        $sistema->cargar();
        return response()->json($sistema);

    }

    private function validar(Request $request,Sistema $sistema) : Collection {
        
        return collect($request->validate([
            'nombre'            => 'required',
            'terminos'          => 'nullable',
            'paypal_id'         => 'nullable',
            'paypal_secrect'    => 'nullable',
            'production_paypal' => 'nullable',
            'paypal'            => 'nullable',
            'divisa_id'         => 'required',
            'empresa_digital'   => 'nullable',
            'redes'             => 'nullable',
            'negocio' => 'nullable'
        ]));
        
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sistema  $sistema
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sistema $sistema)
    {
        $datos = $this->validar($request,$sistema);
        try {
            DB::beginTransaction();

              
                $sistema->update($datos->except(['redes'])->toArray());
                
                if(isset($datos['redes'])){
                    foreach($datos['redes'] as $red){
                    $sistema->agregarRed($red);
                    }
                }

                $sistema->cargar();
            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

        return response()->json(['result' => $result,'sistema' => $sistema]);

    }

    public function crearCuenta(Sistema $sistema){

        try {
            DB::beginTransaction();
            if(isNull($sistema->cuenta)){
                $cuentaNueva = $sistema->aperturarCuenta();
            }

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
        }
        
        $sistema->load(['cuenta','divisa']);

        return response()->json(['result' => $result,'sistema' => $sistema]);
    }


    public function uploadArchivos(Request $request){
        
        $archivos  = $request->file('archivos');

        try {
            DB::beginTransaction();
            $sistema = Sistema::find($request->get('model_id'));

            foreach ($archivos as $key => $archivo) {

                $archivo_name = \sha1($archivo->getClientOriginalName()) . '.' . $archivo->getClientOriginalExtension();

                Storage::disk('archivos_multimedias')->put($archivo_name, File::get($archivo));
                switch (\explode('/', $archivo->getClientMimeType())[0]) {
                    case 'image':

                        $sistema->addImagen([
                            'imagen' => $archivo_name,
                        ]);
                        break;

                    case 'video':
                        $sistema->addVideo([
                            'nombre' => $archivo->getClientOriginalName(),
                            'url' => $archivo_name
                        ]);
                        break;
                }
            }

            DB::commit();

            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

       

        $sistema->refresh();

        $sistema->cargar();

        return response()->json([
            'result' => $result,
            'sistema' => $sistema
        ]);


        
    }



    public function eliminarArchivo(Request $request, Sistema $sistema){

        $datos = $request->all();

        try {
            DB::beginTransaction();

            switch ($datos['tipo_archivo']) {
                case 'imagen':
                    $imagen = Imagen::find($datos['archivo_id']);
                    Storage::disk('archivos_multimedias')->delete($imagen->imagen);
                    $result = $sistema->quitarImagen($imagen);
                    break;

                case 'video':
                    $video = Video::find($datos['archivo_id']);
                    Storage::disk('archivos_multimedias')->delete($video->url);
                    $result = $sistema->quitarVideo($video);
                    break;
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;

            dd($th->getMessage());
        }

        $sistema->refresh();
        $sistema->cargar();

        return response()->json([
            'result' => $result,
            'sistema' => $sistema,
        ]);

    }

    public function updateBanner(Request $request, Sistema $sistema){

        try {

            $archivo = $request->file('banner');

            $archivo_name = \sha1($archivo->getClientOriginalName()).'.'.$archivo->getClientOriginalExtension();
            $result = Storage::disk('public')->put($archivo_name,File::get($archivo));
            if($result){
                if($sistema->banner_principal){
                    Storage::disk('public')->delete($sistema->banner_principal);
                }
               
            }
            $sistema->update([
                'banner_principal' => $archivo_name
            ]);

            $sistema->refresh();
            $sistema->cargar();

            
        } catch (\Throwable $th) {

            $result = false;
        }

        return response()->json(compact('sistema','result'));

    }

    public function eliminarRedSocial(Sistema $sistema, Red $red){

        try {
            DB::beginTransaction();
                $red->delete();

            DB::commit();
            $result = true;
        } catch (\Throwable $th) {
            Db::rollBack();
            $result = false;
        }   

        $sistema->refresh();
        $sistema->cargar();

        return response()->json(['result' => $result,'sistema' => $sistema]);
    }

}
