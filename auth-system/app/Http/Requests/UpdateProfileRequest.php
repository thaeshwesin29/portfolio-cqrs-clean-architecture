<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $this->user()->id,
            'password' => 'nullable|string|min:6|confirmed',
            'township_id' => 'required|exists:townships,id',
            'ward_id' => 'required|exists:wards,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.string' => 'Name must be a string.',
            'name.max' => 'Name cannot exceed 255 characters.',

            'email.required' => 'Please enter your email.',
            'email.email' => 'Invalid email format.',
            'email.max' => 'Email cannot exceed 255 characters.',
            'email.unique' => 'This email is already taken.',

            'township_id.required' => 'Please select a township.',
            'township_id.exists' => 'The selected township is invalid.',

            'ward_id.required' => 'Please select a ward.',
            'ward_id.exists' => 'The selected ward is invalid.',

            'password.min' => 'Password must be at least 6 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
        ];
    }
}
