<?php

namespace App\Http\Controllers;

use App\Models\Panel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\{DB};

class PanelController extends Controller
{


    public function getAll(){

    
        return response()->json(Panel::with('permisos')->get());

    }

    public function fetchData(Request $request){
        $datos = $request->all();

        $paginator = Panel::where([
            ['panel','LIKE',"%{$datos['q']}%",'OR'],

        ])
        ->with('permisos')
        ->orderBy($datos['sortBy'] ?:'id',$datos['isSortDirDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] ?: 10000);


        return response()->json([
            'total' => $paginator->total(),
            'panels' => $paginator->items()
        ]);



    }

    public function fetch(Request $request, Panel $panel){

        $panel->permisos;

        return response()->json($panel);

    }


    private function validar(Request $request,Panel $panel = null) : array{
        return $request->validate([
            'panel' => ['required',$panel ? Rule::unique('panels','panel')->ignore($panel) : 'unique:panels,panel']
        ],['panel.unique' => 'El panel ya está registrado, inténte con otro']
             );
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
            $panel  = Panel::create($this->validar($request));
            $panel->permisos;
            DB::commit();

            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'panel' => $result ? $panel : null]);
       

        
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Panel  $panel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Panel $panel)
    {
        try {
            DB::beginTransaction();
            $panel->update($this->validar($request,$panel));

            $panel->permisos;
            DB::commit();

            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'panel' => $result ? $panel : null]);
    }


    public function getPermisosPanel(string $panel_name){
        
        $panel = Panel::where('panel',$panel_name)->first();
        
        $permisos = $panel->permisos;

        foreach($permisos as $permiso){
            $permiso->usuarios;
            $permiso->roles;
            $permiso->modelos;
        }

        return response()->json($permisos);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Panel  $panel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Panel $panel)
    {
        try{
            DB::beginTransaction();

            $panel->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);


    }
}
