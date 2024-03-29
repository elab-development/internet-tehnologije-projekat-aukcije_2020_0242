<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuctionCollection;
use App\Http\Resources\AuctionResource;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuctionController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 20);
        $from = $request->query('from', null);
        $to = $request->query('to', null);
        $userId = $request->query('userId', null);
        $search = $request->query('search', '');
        $onlyActive = $request->query('onlyActive', 0);
        $query = Auction::query()->join('products', 'products.id', '=', 'auctions.product_id');
        if ($search) {
            $query = $query->whereRaw("(products.name like ? OR products.description like ?)", ["%" . $search . "%", "%" . $search . "%"]);
        }
        if ($userId != null) {
            $query = $query->where('user_id', $userId);
        }
        if ($from != null) {
            $query = $query->where('start_time', '>', $from);
        }
        if ($to != null) {
            $query = $query->where('start_time', '<', $to);
        }
        if (intval($onlyActive) == 1) {
            $now = now();
            $query = $query->where('status', 'active')->where('start_time', '<', $now)
                ->where('end_time', '>', $now);
        }
        $auctions =  $query->select('auctions.*')->paginate($size, ['*'], 'page', $page);
        return response()->json(new AuctionCollection($auctions));
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $product = Product::find($request->productId);
        if (!$product || !$product->canCreateAuction()) {
            return response()->json(['message' => 'Invalid product'], 400);
        }
        $auction = Auction::create([
            'start_time' => $request->startTime,
            'end_time' => $request->endTime,
            'start_price' => $request->startPrice,
            'product_id' => $request->productId,
            'status' => 'active'
        ]);
        return response()->json(new AuctionResource($auction));
    }

    public function show($id)
    {
        $auction = Auction::find($id);
        return response()->json(new AuctionResource($auction));
    }

    public function changeStatus(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $auction = Auction::find($id);
        if (!$auction) {
            return response()->json(['message' => 'Missing auction'], 404);
        }
        if ($auction->status != 'active') {
            return response()->json(['message' => 'Cannot change status'], 400);
        }
        $auction->update(['status' => $request->status]);
        if ($request->status == 'success') {
            $auction->product->update(['sold' => true]);
        }
        return response()->json(new AuctionResource($auction));
    }

    public function createBid(Request $request, $id)
    {
        DB::beginTransaction();
        $auction = Auction::lockForUpdate()->find($id);
        if (!$auction) {
            DB::rollBack();
            return response()->json(['message' => 'Missing auction'], 404);
        }
        $now = time();
        if ($auction->start_time > $now || $auction->end_time < $now) {
            DB::rollBack();
            return response()->json(['message' => 'Auction is not active'], 400);
        }
        $minAmount = $auction->best_bid == null ? $auction->start_price : ($auction->best_bid + 1);
        $amount = $request->amount;
        $user = $request->user();
        if ($minAmount > $amount) {
            DB::rollBack();
            return response()->json(['message' => 'Small bid'], 400);
        }
        Bid::create([
            'price' => $amount,
            'user_id' => $user->id,
            'auction_id' => $id,
        ]);
        $auction->update(['user_id' => $user->id, 'best_bid' => $amount]);
        DB::commit();
        return response()->json(new AuctionResource(Auction::find($auction->id)));
    }
}
