<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Rennokki\QueryCache\Traits\QueryCacheable;

class Homework extends Model
{
    use HasFactory;
    use QueryCacheable;

    public $cacheFor = 3600;
    protected static $flushCacheOnUpdate = true;
    public $cacheDriver = 'redis';
    protected $table = 'homeworks';

    protected $fillable = [
        'name',
        'instruction',
        'deadline',
    ];
    protected $casts = [
        'deadline' => 'datetime',
    ];
}
