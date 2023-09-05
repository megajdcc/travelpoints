<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AfiliarNegocioInvitacionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {


        return [
            'usuario.username'   => 'required',
            'usuario.nombre'     => 'required',
            'usuario.apellido'   => 'required',
            'usuario.email'      => 'required',
            'usuario.password'   => 'required',
            'usuario.r_password' => 'required|same:usuario.password',
            'nombre'             => 'required' ,
            'descripcion'        => 'required',
            'breve'              => 'required',
            'categoria_id'       => 'required',
            'comision'           => 'required',
            'tipo_comision'      => 'required',
            'url'                => 'required',
            'email'              => 'required',
            'telefono'           => 'required',
            'sitio_web'          => 'nullable',
            'direccion'          => 'required',
            'codigo_postal'      => 'required',
            'ciudad_id'          => 'nullable',
            'estado_id'          => 'required',
            'lat'                => 'required',
            'lng'                => 'required',
            // 'logo'               => 'bail|required_without:id|nullable|max:2048',
            // 'foto'               => 'bail|required_without:id|nullable|max:2048',
            'situacion'          => 'nullable',
            'comentario'         => 'nullable',
            'divisa_id'          => 'required',
            'iata_id'            => 'required'
        ];
    }

    /**
     * 
     * @return array
     */
    public function messages() : array
    {
        return [
            'usuario.*.username.required' => 'El nombre de usuario es importante, no lo olvides',
            'usuario.*.nombre.required'   => 'El nombre es importante, no lo olvides',
            'usuario.*.apellido.required' => 'El apellido es importante, no lo olvides',
            'usuario.*.password.required' => 'La contraseña es importante, no lo olvides',
            'usuario.*.r_password.same'   => 'Las contraseñas no coinciden',
            'nombre.required'             => 'El Nombre del negocio es importante',
            'descripcion.required'        => 'La descripción del negocio es importante',
            'breve.required'              => 'El Breve del Negocio es importante',
            'categoria_id.required'       => 'LA categoría del Negocio es importante',
            // 'logo.max' => 'El logo no puede superar los 2mb',
            // 'foto.max' => 'La imagen de portada no puede superar los 2mb',

        ] ;       
    }
}
