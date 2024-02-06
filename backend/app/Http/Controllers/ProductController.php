<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = $request->query('page', 0);
        $size = $request->query('size', 20);
        $where = [];
        $name = $request->query('name', '');
        $sold = $request->query('sold', null);
        if ($name != '') {
            $where[] = ['name', 'like', '%' . $name . '%'];
        }
        if ($sold != null) {
            $where[] = ['sold', '=', boolval($sold)];
        }
        $products = Product::where($where)->paginate($size, ['*'], 'page', $page);
        return response()->json(new ProductCollection($products));
    }

    public function allProducts(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(ProductResource::collection(Product::all()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $body = $request->all();
        $product = Product::create([
            "sold" => $body['sold'],
            "name" => $body['name'],
            'category_id' => $body['categoryId'],
            "description" => $body['description'],
            "image" => $body['image']
        ]);
        return response()->json(new ProductResource($product));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json(new ProductResource($product));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $body = $request->all();
        $product->update([
            "sold" => $body['sold'],
            "name" => $body['name'],
            'category_id' => $body['categoryId'],
            "description" => $body['description'],
            "image" => $body['image']
        ]);
        return response()->json(new ProductResource($product));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $product->delete();
        return response()->noContent();
    }

    public function statistics(Request $request,)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $res = DB::table('products', 'p')
            ->leftJoin('auctions', 'auctions.product_id', '=', 'p.id')
            ->select(
                'p.id',
                'p.name',
                DB::raw("SUM(case when auctions.status='active' then 1 else 0 end) as active"),
                DB::raw("SUM(case when auctions.status='success' then 1 else 0 end) as success"),
                DB::raw("SUM(case when auctions.status='failed' then 1 else 0 end) as failed")
            )
            ->groupBy('p.id', 'p.name')->get();
        return response()->json($res);
    }
}
