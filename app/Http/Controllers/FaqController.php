<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;


class FaqController extends Controller
{
    

    public function get(Faq $faq){

        $faq->categoria;
        $faq->usuario;

        return response()->json($faq);
        
    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $paginator = Faq::where([
            ['pregunta','LIKE','%'.$datos['q'].'%','OR'],
            ['respuesta', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
        ])->whereHas('categoria',function(Builder $q) use ($datos){
            $q->where('nombre','LIKE','%'.$datos['q'].'%','OR');
        })
        ->orderBy($datos['sortBy'],$datos['sortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage']);

        $faqs = $paginator->items();

        foreach ($faqs as $faq) {
            $faq->usuario;
            $faq->categoria;
        }

        return response()->json([
            'faqs' => $faqs,
            'total' => $paginator->total()
        ]);

    }


    private function validar(Request $request,Faq $faq = null){

        return $request->validate([
            'pregunta' => ['required', $faq ? Rule::unique('faqs','pregunta')->ignore($faq) : 'unique:faqs,pregunta'],
            'respuesta' => 'required',
            'categoria_id' => 'required'
        ],[
            'pregunta.required'  => 'La pregunta es importate no lo olvides',
            'pregunta.unique'    => 'La pregunta ya está registrado intente con otro',
            'respuesta.required' => 'La respuesta es importante no lo olvides',
            'categoria_id'       => 'La categoríá es importante no lo olvides'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // dd([...$this->validar($request),...['usuario_id' => $request->user()->id]]);


        $faq = Faq::create([...$this->validar($request),...['usuario_id' => $request->user()->id]]);

        $faq->categoria;
        $faq->usuario;

        return response()->json(['result' => true, 'faq' => $faq]);

    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Faq $faq)
    {
        
<<<<<<< HEAD
        $result = $faq->update($this->validar($request,$faq));
=======
        $result = $faq->update([...$this->validar($request,$faq), ...['usuario_id' => $request->user()->id]]);
>>>>>>> vite

        $faq->categoria;
        $faq->usuario;

        return response()->json(['result' => $result,'faq' => $faq]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function destroy(Faq $faq)
    {
        try{
            DB::beginTransaction();
                $faq->delete();
            DB::commit();
            $result =true;

        }catch(\Exception $e){
            DB::rollBack();
            $result =true;
            
        }
        
        return response()->json(['result' => $result]);


    }
}
