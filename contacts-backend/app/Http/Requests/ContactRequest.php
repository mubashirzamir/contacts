<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => 'required|max:255',
            'surname' => 'required|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|array',
            'phone.countryCode' => 'required|numeric',
            'phone.areaCode' => 'required|numeric',
            'phone.phoneNumber' => 'required|numeric',
            'address_line_01' => 'nullable|max:255',
            'address_line_02' => 'nullable|max:255',
            'address_line_03' => 'nullable|max:255',
            'city' => 'nullable|max:255',
            'postcode' => 'nullable|max:255',
        ];

        if ($this->isMethod('put')) {
            $rules['id'] = 'required|numeric|exists:contacts,id';
        }

        return $rules;
    }
}
