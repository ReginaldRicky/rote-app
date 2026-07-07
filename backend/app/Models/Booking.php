<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    protected $table = 'bookings';

    protected $fillable = [
        'user_id',
        'package_id',
        'handled_by_admin_id',
        'full_name',
        'email',
        'phone',
        'trip_date',
        'guest_count',
        'price_per_person',
        'total_price',
        'currency',
        'note',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'trip_date' => 'date',
            'guest_count' => 'integer',
            'price_per_person' => 'decimal:2',
            'total_price' => 'decimal:2',
        ];
    }

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(
            Pelanggan::class,
            'user_id'
        );
    }

    public function review(): HasOne
{
    return $this->hasOne(BookingReview::class);
}

    public function package(): BelongsTo
    {
        return $this->belongsTo(
            Package::class,
            'package_id'
        );
    }

    public function handledByAdmin(): BelongsTo
    {
        return $this->belongsTo(
            Admin::class,
            'handled_by_admin_id'
        );
    }
}
