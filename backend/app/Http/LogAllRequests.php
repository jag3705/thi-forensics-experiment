<?php

namespace App\Http;

use Illuminate\Http\Request;
use Spatie\HttpLogger\LogProfile;

class LogAllRequests implements LogProfile
{
    public function shouldLogRequest(Request $request): bool
    {
        return true;
    }
}
