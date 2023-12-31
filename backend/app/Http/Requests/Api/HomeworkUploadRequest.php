<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
class HomeworkUploadRequest extends FormRequest
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
            'homework' => 'required|mimes:zip,tar|max:10240',
            'homework_id' => 'required|exists:homeworks,id',
            'notes' => 'required|string|min:10|max:254'
        ];
    }
}
