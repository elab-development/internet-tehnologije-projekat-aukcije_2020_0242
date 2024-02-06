<?php

use App\Http\Controllers\AuctionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::apiResource('/products', ProductController::class)->only(['index', 'show']);
Route::get('auctions', [AuctionController::class, 'index']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('auctions/{id}', [AuctionController::class, 'show']);
Route::get('btc-usd', [PublicController::class, 'btcToUsd']);
Route::get('/files/{fileName}', [FileController::class, 'getFile']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);
    Route::get('products-all', [ProductController::class, 'allProducts']);
    Route::get('users', [UserController::class, 'users']);
    Route::post('auctions', [AuctionController::class, 'store']);
    Route::post('files', [FileController::class, 'store']);
    Route::put('auctions/{id}', [AuctionController::class, 'changeStatus']);
    Route::post('auctions/{id}/bids', [AuctionController::class, 'createBid']);
    Route::get('/product-statistics', [ProductController::class, 'statistics']);
    Route::apiResource('/products', ProductController::class)->only(['store', 'update', 'destroy']);
});
