<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = ['start_time', 'end_time', 'start_price',  'product_id', 'status', 'user_id', 'best_bid'];

    protected $casts = [
        'id' => 'integer',
        'start_time' => 'timestamp',
        'end_time' => 'timestamp',
        'start_price' => 'double',
        'best_bid' => 'double',
        'product_id' => 'integer',
        'user_id' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
