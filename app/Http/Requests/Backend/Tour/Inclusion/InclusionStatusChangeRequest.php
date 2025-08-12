<?php

namespace App\Http\Requests\Backend\Tour\Inclusion;

use Illuminate\Foundation\Http\FormRequest;

class InclusionStatusChangeRequest extends FormRequest
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
        return [
            'id'     => 'required|string|exists:inclusions,id',
            'status' => 'required|in:'.implode(',', [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_PENDING]),
        ];
    }
}
