<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuctionCollection;
use App\Http\Resources\AuctionResource;
use App\Models\Auction;
use Illuminate\Http\Request;

class AuctionController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 20);
        $where = [];
        $from = $request->query('from', null);
        $to = $request->query('to', null);
        $userId = $request->query('userId', null);
        if ($userId != null) {
            $where[] = ['user_id', '=', $userId];
        }
        if ($from != null) {
            $where[] = ['start_time', '>', strtotime($from)];
        }
        if ($to != null) {
            $where[] = ['start_time', '<', strtotime($to)];
        }
        $auctions = Auction::where($where)->paginate($size, ['*'], 'page', $page);
        return response()->json(new AuctionCollection($auctions));
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $auction = Auction::create([
            'start_time' => strtotime($request->start_time),
            'end_time' => strtotime($request->end_time),
            'start_price' => $request->start_price,
            'product_id' => $request->product_id,
            'status' => 'inactive',
            'user_id' => null
        ]);
        return response()->json(new AuctionResource($auction));
    }
}
