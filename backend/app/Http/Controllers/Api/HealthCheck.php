<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HealthCheck extends Controller
{
    public function isAlive(): JsonResponse
    {
        return response()->json(["status" => true, 'data' => ['system_status' => "Nominal"]], 200);

    }
}
