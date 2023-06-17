<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
class RegisterRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|max:254|unique:students',
            'mtr' => 'required|string|max:254|unique:students',
            'password' => 'required|string|min:10',
            'name' => 'required|string|min:3|max:254'
        ];
    }
}
