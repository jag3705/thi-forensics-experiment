<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Class ForceJson
 *
 * Responsible for always use JSON when communication. Especially, when an Exception is thrown. Otherwise, Laravel
 * would output the Exception Details as HTML
 *
 * @package App\Http\Middleware
 */
class ForceJson
{

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param  Closure  $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $request->headers->add(['Accept' => 'application/json']);
        return $next($request);
    }
}
