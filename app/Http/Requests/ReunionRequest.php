<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReunionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'titulo'           => 'required',
            'descripcion'      => 'nullable',
            'usuario_id'       => 'required',
            'model_id'         => 'nullable',
            'model_type'       => 'nullable',
            'fecha_inicio'     => 'required',
            'fecha_fin'        => 'nullable',
            'status'           => 'nullable',
            'recurrente'       => 'required',
            'recurrencia'      => 'nullable',
            'all_dia'          => 'nullable',
            'tipo_recurrencia' => 'nullable',
            'archivo'          => 'nullable',
            'nota'             => 'nullable',
            'estado'           => 'nullable', 
            'participantes'    => 'nullable',
            'recordatorio'     => 'nullable', 
            'tipo'             => 'required',
        ];
    }
}
