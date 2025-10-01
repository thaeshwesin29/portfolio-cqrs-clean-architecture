<?php

namespace App\Models;

use App\Observers\CacheObserver;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectTechnology extends Pivot
{
    // If you need custom pivot behavior, define it here.
    protected $table = 'project_technology';
    public $timestamps = true;
    protected static function booted()
    {
        static::observe(CacheObserver::class);
    }
}
