<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

// Menyajikan file upload tanpa bergantung pada symbolic link public/storage.
Route::get('/storage/{path}', function (string $path) {
    $cleanPath = ltrim(str_replace('..', '', $path), '/');
    $disk = Storage::disk('public');

    abort_unless($cleanPath !== '' && $disk->exists($cleanPath), 404);

    return response()->file($disk->path($cleanPath), [
        'Cache-Control' => 'public, max-age=86400',
    ]);
})->where('path', '.*');

// React Router fallback. API routes tetap ditangani oleh routes/api.php.
Route::get('/{path?}', function () {
    $index = public_path('index.html');

    abort_unless(is_file($index), 404);

    return response()->file($index, [
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
    ]);
})->where('path', '^(?!api(?:/|$)|storage(?:/|$)|up$).*$');
