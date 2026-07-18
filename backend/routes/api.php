<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminBookingController;
use App\Http\Controllers\Api\AdminNotificationController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\BookingReviewController;
use App\Http\Controllers\Api\CustomerAuthController;
use App\Http\Controllers\Api\PackageController;
use Illuminate\Support\Facades\Route;

Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{package}', [PackageController::class, 'show']);
Route::get('/packages/{package}/reviews', [BookingReviewController::class, 'packageReviews']);
Route::post('/forgot-password/verify', [CustomerAuthController::class, 'verifyResetEmail']);
Route::post('/forgot-password/reset', [CustomerAuthController::class, 'resetPassword']);

Route::prefix('customer')->group(function () {
    Route::post('/register', [CustomerAuthController::class, 'register']);
    Route::post('/login', [CustomerAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [CustomerAuthController::class, 'me']);
        Route::put('/profile', [CustomerAuthController::class, 'updateProfile']);
        Route::post('/logout', [CustomerAuthController::class, 'logout']);

        Route::get('/bookings', [BookingController::class, 'index']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings/{booking}', [BookingController::class, 'show']);
        Route::post('/bookings/{booking}/review', [BookingReviewController::class, 'store']);
    });
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::get('/profile', [AdminAuthController::class, 'profile']);
        Route::post('/profile', [AdminAuthController::class, 'updateProfile']);
        Route::put('/profile', [AdminAuthController::class, 'updateProfile']);
        Route::get('/notifications', [AdminNotificationController::class, 'index']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::get('/bookings', [AdminBookingController::class, 'index']);
        Route::post('/bookings', [AdminBookingController::class, 'store']);
        Route::get('/bookings/{booking}', [AdminBookingController::class, 'show']);
        Route::put('/bookings/{booking}', [AdminBookingController::class, 'update']);

        Route::post('/packages', [PackageController::class, 'store']);
        Route::post('/packages/{package}', [PackageController::class, 'update']);
        Route::put('/packages/{package}', [PackageController::class, 'update']);
        Route::delete('/packages/{package}', [PackageController::class, 'destroy']);
    });
});

// Backward-compatible package write endpoints for older frontend links.
Route::post('/packages', [PackageController::class, 'store']);
Route::post('/packages/{package}', [PackageController::class, 'update']);
Route::put('/packages/{package}', [PackageController::class, 'update']);
Route::delete('/packages/{package}', [PackageController::class, 'destroy']);
