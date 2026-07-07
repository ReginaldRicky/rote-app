<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    protected $table = 'packages';

    protected $fillable = [
        'title',
        'location',
        'description',
        'start_date',
        'end_date',
        'duration',
        'price',
        'currency',
        'participant_limit',
        'rating',
        'image',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'price' => 'decimal:2',
            'rating' => 'decimal:1',
            'participant_limit' => 'integer',
            'is_published' => 'boolean',
        ];
    }

    public function includes(): HasMany
{
    return $this->hasMany(
        PackageInclude::class
    );
}

public function schedules(): HasMany
{
    return $this->hasMany(
        PackageSchedule::class
    );
}

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(BookingReview::class);
    }
}
