<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $fileName = $request->file('file')->store('local');
        return response()->json(['fileName' => $fileName]);
    }

    public function getFile($fileName)
    {
        return response(Storage::disk('local')->get($fileName));
    }
}
