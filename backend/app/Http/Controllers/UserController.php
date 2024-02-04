<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function users(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json(UserResource::collection(User::where('admin', false)->get()));
    }
}
