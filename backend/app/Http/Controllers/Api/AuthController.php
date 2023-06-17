<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function getMe(): JsonResponse
    {
        $me = Student::findOrFail(["id" => Auth::id() ]);
        $me->makeVisible(['mtr']);

        return response()->json([
            'status' => true,
            'data' => $me
        ], 200);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $student = new Student();
        $student->name = $validated['name'];
        $student->mtr = $validated['mtr'];
        $student->email = $validated['email'];
        $student->password = bcrypt($validated['password']);
        $student->save();

        $token = $student->createToken('THI-App-Token')->plainTextToken;

        return response()->json([
            'status' => true,
            'data' => [
                'message' => 'User successfully registered',
                'user' => $student,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (!Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            return response()->json([
                'status' => false,
                'data' => [
                    'message' => 'Invalid Inputs',
                    'error' => 'Invalid Credentials',
                ]
            ], 400);
        }

        $user = Auth::user();
        $token = $user->createToken('THI-App-Token')->plainTextToken;

        return response()->json([
            'status' => true,
            'data' => [
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 201);

    }

}
