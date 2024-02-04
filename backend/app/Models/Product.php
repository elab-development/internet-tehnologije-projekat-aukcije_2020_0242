<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'sold'];

    protected $casts = [
        'id' => 'integer',
        'sold' => 'boolean'
    ];

    public function auctions()
    {
        return $this->hasMany(Auction::class);
    }

    public function canCreateAuction()
    {
        if ($this->sold) {
            return false;
        }
        foreach ($this->auctions as $auction) {
            if ($auction->status != 'failed') {
                return false;
            }
        }
        return true;
    }
}
