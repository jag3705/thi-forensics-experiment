<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AvatarUploadRequest;
use App\Http\Requests\Api\UpdateStudentMetaRequest;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StudentProfileController extends Controller
{
    public function index(): JsonResponse
    {
        $students = Student::all();
        return response()->json([
            "status" => true,
            'data' => $students
        ]);
    }

    public function setStudentMetaData(UpdateStudentMetaRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $student = Student::where(["id" => Auth::id()])->first();

        $student->bio = $validated['bio'];
        $student->save();


        return response()->json(
            [
                "status" => true,
                "data" => $student
            ], 200);
    }

    public function setAvatar(AvatarUploadRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $file = $validated['avatar'];


        $path = $file->storeAs('avatars',
            Str::random(40) . "." . $file->getClientOriginalExtension(),
            'user');

        $url = Storage::disk('user')->url($path);

        $student = Student::where(["id" => Auth::id()])->first();

        $student->avatar = $path;
        $student->save();


        return response()->json(
            [
                "status" => true,
                "data" => [
                    "student" => $student,
                    "url" => $url,
                ]
            ], 201);
    }

}
