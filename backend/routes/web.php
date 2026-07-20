<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

// Fallback agar file upload tetap dapat dibuka walaupun public/storage belum
// dibuat sebagai symbolic link pada komputer baru atau Windows.
Route::get('/storage/{path}', function (string $path) {
    $cleanPath = ltrim(str_replace('..', '', $path), '/');
    $disk = Storage::disk('public');

    abort_unless($cleanPath !== '' && $disk->exists($cleanPath), 404);

    return response()->file($disk->path($cleanPath), [
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where('path', '.*');
