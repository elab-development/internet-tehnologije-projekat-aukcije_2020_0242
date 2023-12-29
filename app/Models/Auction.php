<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = ['start_time', 'end_time', 'start_price',  'product_id', 'status'];

    protected $casts = [
        'id' => 'integer',
        'start_time' => 'timestamp',
        'end_time' => 'timestamp',
        'start_price' => 'double',
        'product_id' => 'integer'
    ];

    public function user()
    {
        $bestBid = $this->bestBid();
        return $bestBid == null ? null : $bestBid->user;
    }

    public function bestBid()
    {
        $bids = $this->bids;
        $bid = null;
        foreach ($bids as $b) {
            if ($bid == null || $b->price > $bid->price) {
                $bid = $b;
            }
        }
        return $bid;
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }
}
