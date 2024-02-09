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
        $user = $this->user;
        return [
            'id' => $this->id,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'bestBid' => $this->best_bid,
            'startPrice' => $this->start_price,
            'bids' => BidResource::collection($this->bids),
            'user' => $user == null ? null : new UserResource($user),
            'product' => new ProductResource($this->product),
            'status' => $this->status
        ];
    }
}
