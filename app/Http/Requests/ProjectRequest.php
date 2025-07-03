<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'topic_id' => 'required|exists:topics,id',
            'link_demo' => 'nullable|url|max:255',
            'link_repo' => 'nullable|url|max:255',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:pending,progress,completed',
            'priority' => 'nullable|in:low,medium,high',
            'target_date' => 'required|date',
        ];
    }
}
