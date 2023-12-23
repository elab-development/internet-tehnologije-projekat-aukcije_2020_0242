<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuctionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'startPrice' => $this->start_price,
            'user' => $this->user == null ? null : new UserResource($this->user),
            'product' => new ProductResource($this->product)
        ];
    }
}
