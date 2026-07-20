# Perbaikan Rote App

## Yang sudah diperbaiki

1. **My Profile Admin**
   - Admin dapat mengganti foto profil, nama, email, dan password.
   - Data nama, email, dan foto langsung diperbarui pada topbar admin.
   - Foto disimpan ke `backend/storage/app/public/admins`.

2. **Reload admin dan customer lebih cepat**
   - Validasi sesi customer berjalan di belakang dan tidak lagi menahan tampilan saat data sesi lokal masih tersedia.
   - Request package yang dipanggil beberapa komponen sekaligus sekarang dideduplikasi dan memakai cache singkat.
   - Notifikasi admin memakai cache singkat saat reload.
   - React Strict Mode pada entry development dinonaktifkan agar request tidak berjalan dua kali saat `npm run dev`.

3. **Gambar package tidak muncul di komputer lain**
   - URL gambar baru disimpan sebagai path `/storage/...`, bukan alamat absolut `localhost`.
   - URL lama yang masih memakai `localhost` otomatis diarahkan ke host API yang sedang digunakan.
   - Ditambahkan route fallback `/storage/{path}` agar gambar tetap bisa dibuka walaupun `public/storage` belum menjadi symbolic link.

4. **Harga `RpNaN`**
   - Parser harga sekarang mendukung angka database, `1500000.00`, `1.500.000`, `1,500,000`, dan format yang sudah memakai `Rp`.
   - Nilai tidak valid akan tampil sebagai `Rp0`, bukan `RpNaN`.

## Setelah menimpa folder proyek

Jalankan perintah berikut satu kali dari folder `backend` agar kolom foto profil admin dibuat:

```bash
php artisan migrate
```

Perintah yang disarankan untuk akses file upload secara langsung:

```bash
php artisan storage:link
```

Aplikasi tetap memiliki route fallback jika symbolic link belum tersedia.

## Catatan pemindahan ke komputer lain

SQL hanya memindahkan data database. File gambar package juga harus ikut disalin. Pada ZIP ini, file berada di:

```text
backend/storage/app/public/packages
```

Pastikan folder tersebut tidak dihapus saat menimpa proyek.
