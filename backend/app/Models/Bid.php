<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    protected $fillable = ['price', 'user_id', 'auction_id'];

    protected $casts = [
        'id' => 'integer',
        'price' => 'double',
        'user_id' => 'integer',
        'auction_id' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
