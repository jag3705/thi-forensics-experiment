<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Rennokki\QueryCache\Traits\QueryCacheable;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; use QueryCacheable;
    public $cacheFor = 3600;
    protected static $flushCacheOnUpdate = true;
    public $cacheDriver = 'redis';
    protected $table = 'students';

    protected $fillable = [
        'name',
        'email',
        'password',
        'mtr',
        'bio',
        'avatar'
    ];
    protected $hidden = [
        'password',
        'remember_token',
        "mtr"
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
