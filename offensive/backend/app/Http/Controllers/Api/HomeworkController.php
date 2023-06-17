<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Homework;
use Illuminate\Http\JsonResponse;

class HomeworkController extends Controller
{
    public function index(): JsonResponse
    {
        $homeWorks = Homework::all();
        return response()->json([
            "status" => true,
            'data' => $homeWorks
        ]);
    }

    public function getById($id): JsonResponse
    {
        return response()->json([
            "status" => true,
            'data' => Homework::findOrFail(["id" => $id ])
        ]);
    }

}
