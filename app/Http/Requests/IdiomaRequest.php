<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IdiomaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->tokenCan('idioma:write');

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {

        return [
            'id' => 'nullable',
            'languaje' => ['required' ,$this->idioma ? Rule::unique('idiomas','languaje')->ignore($this->idioma) : 'unique:idiomas,languaje'],
            'shortLang' => ['required', $this->idioma ? Rule::unique('idiomas', 'shortLang')->ignore($this->idioma) : 'unique:idiomas,shortLang'],
            'default' => ['required'],
            'flag' => ['bail','required_with:id'], 
        ];
    }


    public function messages()
    {
        return [
            'languaje.required' => 'El nombre del idioma es importante',
            'languaje.unique' => 'El nombre del idioma ya se ha creado, inténte con otro',
            'flag.imagen' => 'El archivo debe ser una imagen',
            'shortLang.unique' => 'El iso ya está registrado, inténte con otro' 
        ];
    }
}
