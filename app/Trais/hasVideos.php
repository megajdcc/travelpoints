<?php 
namespace App\Trais;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB,Storage,File};

/**
 * 
 */
trait hasVideos
{
      public function videos(){
         return $this->morphMany(Video::class,'model');
      }


      public function agregarVideo(Request $request) : Video {
         
         $datos = $request->all();
     
         if($datos['youtube'] != 'false'){
            return Video::create([
               ...$datos,
               ...['model_id' => $this->id, 'model_type' => $this->model_type],
            ]);
         
         }else{

            $video = $request->file('url');
            
               $video_name = \sha1($video->getClientOriginalName()) . '.' . $video->getClientOriginalExtension();
               Storage::disk('videos_negocios')->put($video_name, File::get($video));

            return Video::create([
               ...[
                  'nombre' => $datos['nombre'],
                  'url' => $video_name ,
                  'youtube' => false,
                  'model_type' => $this->model_type,
                  'model_id' => $this->id
               ]
            ]);

         }
      }

      public function updateVideo(Request $request, Video $video){

         $datos = $request->all();
  


       
         if ($datos['youtube'] == 'true'){


            return $video->update([
               ...$datos,
               ...['youtube' => true,'model_id' => $this->id, 'model_type' => $this->model_type],
            ]);

         } else {
  
            $vid = $request->file('url');

            if($vid){
               Storage::disk('videos_negocios')->delete($video->url);
               $video_name = \sha1($vid->getClientOriginalName()) . '.' . $vid->getClientOriginalExtension();
               Storage::disk('videos_negocios')->put($video_name, File::get($vid));
            }

         
            return $video->update([
               ...[
                  'nombre' => $datos['nombre'],
                  'url' => isset($video_name) ? $video_name : $video->url,
                  'youtube' => false,

               ]
            ]);
         


         }

      }



      public function quitarVideo(Video $video ) : bool | null{ 
         return $video->delete();
      }

      public function quitarVideos() {
        foreach($this->videos as $video){
         
            if($video->youtube){
               Storage::disk('videos_negocio')->delete($video->url);
            }

          $video->delete();
        }

      } 

}

?>