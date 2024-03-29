<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public $collects = ProductResource::class;
    public function toArray($request)
    {
        return [
            "data" => $this->collection,
            'page' => $this->currentPage(),
            "total" => $this->total()
        ];
    }
}
