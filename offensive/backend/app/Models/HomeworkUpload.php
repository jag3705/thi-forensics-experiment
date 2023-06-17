<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Rennokki\QueryCache\Traits\QueryCacheable;

class HomeworkUpload extends Model
{
    use HasFactory; use QueryCacheable;
    public $cacheFor = 3600;
    protected static $flushCacheOnUpdate = true;
    public $cacheDriver = 'redis';
    protected $table = 'homework_uploads';

    protected $fillable = [
        'homework_id',
        'student_id',
        'notes',
        'upload_path',
        'grade'
    ];

}
