<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'sold', 'category_id'];

    protected $casts = [
        'id' => 'integer',
        'sold' => 'boolean',
        'category_id' => 'integer'
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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
