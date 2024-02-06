<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PublicController extends Controller
{
    public function btcToUsd()
    {
        $res = Http::get('https://api-pub.bitfinex.com/v2/ticker/tBTCUSD');

        return response()->json($res->body());
    }
}
