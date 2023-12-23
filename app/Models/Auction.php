<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = ['start_time', 'end_time', 'start_price', 'user_id', 'product_id', 'status'];

    protected $casts = [
        'id' => 'integer',
        'start_time' => 'timestamp',
        'end_time' => 'timestamp',
        'start_price' => 'double',
        'user_id' => 'integer',
        'product_id' => 'integer'
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
