<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Laravel writable storage for Vercel
|--------------------------------------------------------------------------
|
| Filesystem Vercel bersifat read-only. Hanya /tmp yang dapat ditulis.
| Karena itu storage Laravel diarahkan ke /tmp/storage.
|
*/

$storagePath = '/tmp/storage';

$directories = [
    $storagePath . '/app',
    $storagePath . '/app/public',
    $storagePath . '/framework',
    $storagePath . '/framework/cache',
    $storagePath . '/framework/cache/data',
    $storagePath . '/framework/sessions',
    $storagePath . '/framework/testing',
    $storagePath . '/framework/views',
    $storagePath . '/logs',
];

foreach ($directories as $directory) {
    if (! is_dir($directory)) {
        mkdir($directory, 0775, true);
    }
}

putenv("LARAVEL_STORAGE_PATH={$storagePath}");

$_ENV['LARAVEL_STORAGE_PATH'] = $storagePath;
$_SERVER['LARAVEL_STORAGE_PATH'] = $storagePath;

/*
|--------------------------------------------------------------------------
| Start Laravel
|--------------------------------------------------------------------------
*/

require dirname(__DIR__) . '/public/index.php';
