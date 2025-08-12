<?php

namespace App\Http\Requests\Backend\Tour\Tour;

use Illuminate\Foundation\Http\FormRequest;

class TourStoreRequest extends FormRequest
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
        $data = [
            'title' => 'required|unique:tours,title',
            'destination_id' => 'required|exists:destinations,id',
            'tag_ids.*' => 'required|exists:tags,id',
            'location' => 'required',
            'min_person' => 'required',
            'max_person' => 'required',
            'price_per_person' => 'required',
            'booking_type' => 'required',
            'discount_type' => 'nullable',
            'discount' => 'required',
            'inclusion_ids.*' => 'required|exists:inclusions,id',
           ' exclusion_ids.*' => 'required|exists:exclusions,id',
            'description' => 'required',
            'policy' => 'required',
            'additional_info' => 'required',
            'travel_tips' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'pickup_time' => 'required',
            'images.*.file' => 'required|mimes:jpg,jpeg,png,webp,gif,svg|max:5000',
        ];

        if($this->itineraries->count() > 0){
            foreach ($this->itineraries as $itinerary) {
                if(!empty($itinerary['name'])){
                    $data['itineraries.*.items.*.title']            = 'required';
                    $data['itineraries.*.items.*.description']      = 'required';
                    $data['itineraries.*.items.*.image']            = 'nullable|mimes:jpg,jpeg,png,webp,gif,svg|max:5000';
                    $data['itineraries.*.items.*.location']         = 'required';
                    $data['itineraries.*.items.*.scheduled_time']   = 'required';
                }
            }
        }

        return $data;
    }
}
