<?php

namespace App\Http\Controllers;

use App\Models\CategoriaFaq;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\{DB};
use Illuminate\Database\Eloquent\Builder;

class CategoriaFaqController extends Controller
{


    public function cargar(Request $request){

        $q = $request->get('q');

        $categorias = DB::table('categoria_faqs','cf')
                    ->select(['f.pregunta','f.respuesta','cf.nombre','cf.icono','cf.id'])
                    ->join('faqs as f','cf.id','f.categoria_id')
                    ->where([
                        ['f.pregunta', 'LIKE', '%' . $q . '%', 'or'],
                        ['f.respuesta', 'LIKE', '%' . $q . '%', 'or'],
                    ])
                    ->get();

                

        $categorias =  $categorias->groupBy('nombre')->all();
        $datos = collect([]);

        foreach ($categorias as $key => $value) {
            $datos->push(['nombre' => $key,'icono' => $value[0]->icono ?: 'ListIcon','faqs' => $value]);

        }
<<<<<<< HEAD
=======

>>>>>>> vite
        // $categorias = CategoriaFaq::where([
        //     ['nombre','LIKE','%'.$q.'%','or']
        // ])
        // ->orWhereHas('faqs', function (Builder $query) use ($q) {
        //     $query->where([
        //         ['pregunta', 'LIKE', '%' . $q . '%', 'or'],
        //         ['respuesta', 'LIKE', '%' . $q . '%', 'or']
        //     ]);
        // })
        // ->get();

        // // dd($categorias);

        // foreach ($categorias as $key => $categoria) {
        //     $categoria->faqs;
        // }
<<<<<<< HEAD
=======
        
>>>>>>> vite
        return response()->json($datos);

    }

    public function fetchData(Request $request)
    {

        $datos = $request->all();

        $paginator = CategoriaFaq::where([
            ['nombre', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
        ])->orderBy($datos['sortBy'], $datos['sortDirDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage']);

        $categorias = $paginator->items();

        foreach ($categorias as $categoria) {
            $categoria->faqs;
        }

        return response()->json([
            'categorias' => $categorias,
            'total' => $paginator->total()
        ]);
    }


    public function get(CategoriaFaq $categoria){
        $categoria->faqs;
        return response()->json($categoria);
    }


    public function getAll(){
        $categorias = CategoriaFaq::all();

        foreach ($categorias as $key => $categoria) {
            $categoria->faqs;
        }

        return response()->json($categorias);
        
    }


    public function validar(Request $request,CategoriaFaq $categoria = null) :array{
        
        return $request->validate([
            'nombre' => ['required', $categoria ?  Rule::unique('categoria_faqs','nombre')->ignore($categoria) : 'unique:categoria_faqs,nombre'],
            'icono' => 'nullable'
        ],[
            'nombre.required' => 'El nombre de la categoría es importante no lo olvides',
            'nombre.unique' => 'El nombre de la categoría ya está siendo usado, intenta con otro.'
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
        
        try{
            DB::beginTransaction();
                $categoria = CategoriaFaq::create($this->validar($request));
                $categoria->faqs;

            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result , 'categoria' => $result ? $categoria : null]);

    }

 

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CategoriaFaq  $categoriaFaq
     * @return \Illuminate\Http\Response
     */
<<<<<<< HEAD
    public function update(Request $request, CategoriaFaq $categoria)
    {
=======
    public function update(Request $request, CategoriaFaq $faqs_categoria)
    {
        $categoria = $faqs_categoria;

>>>>>>> vite
        try {
            DB::beginTransaction();
            $categoria->update($this->validar($request, $categoria));

            $categoria->faqs;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'categoria' => $result ? $categoria : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
<<<<<<< HEAD
     * @param  \App\Models\CategoriaFaq  $categoriaFaq
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaFaq $categoria)
    {
=======
     * @param  \App\Models\CategoriaFaq  $faqs_categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaFaq $faqs_categoria)
    {
        $categoria = $faqs_categoria;


>>>>>>> vite
        try{
            DB::beginTransaction();
                $categoria->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }
}
