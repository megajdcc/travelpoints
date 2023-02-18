<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{User};
use App\Models\Usuario\{Rol,Permiso};
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


            $permisos = [
                'all',
                'home',
                'perfil',
                'roles',
                'permisos',
                "notificaciones",
                "usuarios",
                'Auth'
            ];

            $actions = ['manage','read','write','delete','update'];

            $permisos_registrados = collect([]);

            
            foreach ($permisos as $key => $value) {
                $permisos_registrados->push(Permiso::create(['nombre' => $value]));        
            }

            
            $roles = ["Desarrollador",'Administrador',"Usuario"];

            foreach ($roles as $key => $value) {
                $rol = Rol::create(['nombre'=> $value]);

                if($rol->nombre == 'Desarrollador'){
                    foreach ($permisos_registrados as $k => $v) {
                     $rol->permisos()->attach($v->id, ['actions' => json_encode($actions)]);
                    }
                }
<<<<<<< HEAD
=======
                
>>>>>>> vite
                if($rol->nombre == 'Usuario'){

                    $permisos_filtrados = $permisos_registrados->filter(function($v,$i){
                        return $v->nombre == 'perfil' || $v->nombre == 'notificaciones' || $v->nombre == 'Auth';
                    });

                    foreach ($permisos_filtrados as $k => $v) {
                        $rol->permisos()->attach($v->id, ['actions' => json_encode(($v->nombre == 'home') ? ['read'] :  ['read','write','delete','update'])]);
                    }
                }
               
            }
            

    		$usuario = User::create([
                'username' => '@megajdcc',
				'nombre'   => 'Jhonatan Deivyth',
				'apellido' => 'Crespo Colmenarez',
<<<<<<< HEAD
				'telefono' => '+584128505504',
				'email' => 'megajdcc2009@gmail.com',
				'password' => Hash::make('20464273jd'),
                'is_password' => true,
=======
				'email' => 'megajdcc2009@gmail.com',
				'password' => '20464273jd',
                'is_password' => true,
                'activo' => true,
>>>>>>> vite
                'rol_id' => Rol::where('nombre','Desarrollador')->first()->id
    		]);

            $usuario->asignarPermisosPorRol();

            $textToken = ($usuario->createToken($usuario->nombre.'-'.$usuario->id))->plainTextToken;

            $usuario->token = $textToken;

            $usuario->save();
    }
}
