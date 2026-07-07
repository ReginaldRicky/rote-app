<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingReview extends Model
{
    protected $table = 'booking_reviews';

    protected $fillable = [
        'booking_id',
        'user_id',
        'package_id',
        'rating',
        'comment',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(
            Pelanggan::class,
            'user_id'
        );
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }
}
