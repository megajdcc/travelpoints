<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Sistema;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,File,Storage};

use function PHPUnit\Framework\isNull;

class SistemaController extends Controller
{
   
    public function fetch(){

        $sistema = Sistema::with(['cuenta','divisa','imagenes','videos'])->first();
        return response()->json($sistema);

    }

    private function validar(Request $request,Sistema $sistema){
        
        return $request->validate([
            'nombre'            => 'required',
            'terminos'          => 'nullable',
            'paypal_id'         => 'nullable',
            'paypal_secrect'    => 'nullable',
            'production_paypal' => 'nullable',
            'paypal'            => 'nullable',
            'divisa_id' => 'required'
        ]);
        
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
        
        try {
            DB::beginTransaction();

                $sistema->update($this->validar($request,$sistema));
                $sistema->cuenta;
                $sistema->divisa;
                $sistema->load(['imagenes','videos']);

            DB::commit();
            $result = true;

        } catch (\Throwable $th) {
            DB::rollBack();
            $result = false;
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

        $sistema->load(['cuenta', 'divisa', 'imagenes', 'videos']);

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
        $sistema->load(['cuenta', 'divisa', 'imagenes', 'videos']);

        return response()->json([
            'result' => $result,
            'sistema' => $sistema,
        ]);

    }

}
