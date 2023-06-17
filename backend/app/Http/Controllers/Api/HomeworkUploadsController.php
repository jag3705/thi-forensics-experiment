<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\HomeworkUploadRequest;
use App\Models\HomeworkUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HomeworkUploadsController extends Controller
{
    public function index(): JsonResponse
    {
        $uploads = DB::table('homework_uploads')
            ->where('student_id', '=', Auth::id())
            ->get();

        return response()->json([
            "status" => true,
            'data' => $uploads
        ]);
    }

    public function getNotGraded(): JsonResponse
    {
        $uploads = DB::table('homework_uploads')
            ->where('student_id', '=', Auth::id())
            ->where('grade', '=', "0")
            ->get();

        return response()->json([
            "status" => true,
            'data' => $uploads
        ]);
    }

    public function getGraded(): JsonResponse
    {
        $uploads = DB::table('homework_uploads')
            ->where('student_id', '=', Auth::id())
            ->where('grade', '<>', "0")
            ->get();

        return response()->json([
            "status" => true,
            'data' => $uploads
        ]);
    }

    public function uploadHomework(HomeworkUploadRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $uploads = DB::table('homework_uploads')
            ->where('student_id', '=', Auth::id())
            ->where('homework_id', '=', $validated['homework_id'])
            ->count();

        if($uploads > 0){
            return response()->json(
                [
                    "status" => false,
                    "error" => [
                        "message" => "Forbidden to change submitted homework",
                    ]
                ], 403);
        }

        $file = $validated['homework'];
        $path = $file->storeAs('homework_' . $validated['homework_id'],
            Str::random(40) . "." . $file->getClientOriginalExtension(),
            'homework');

        $url = Storage::disk('homework')->url($path);

        $homeworkUpl = new HomeworkUpload();
        $homeworkUpl->student_id = Auth::id();
        $homeworkUpl->homework_id = $validated['homework_id'];
        $homeworkUpl->notes = $validated['notes'];
        $homeworkUpl->upload_path = $path;
        $homeworkUpl->save();

        $homework = DB::table('homeworks')
            ->where('id', '=', $validated['homework_id'])
            ->get();

        return response()->json(
            [
                "status" => true,
                "data" => [
                    "url" => $url,
                    "homework" => $homework,
                    "upload" => $homeworkUpl,
                ]
            ], 201);
    }
}
