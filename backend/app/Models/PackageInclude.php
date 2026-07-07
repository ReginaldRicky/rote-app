<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageInclude extends Model
{
    protected $table = 'package_includes';

    protected $fillable = [
        'package_id',
        'item_name',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }
}
