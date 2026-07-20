# Deploy Nick Holiday ke Back4app Containers

Project ini sudah disiapkan agar React/Vite dan Laravel berjalan dalam satu Docker container. Frontend memakai URL API relatif `/api`, sehingga tidak memerlukan pengaturan CORS terpisah.

## 1. Masukkan file ke repository GitHub

Jangan unggah folder `.git`, `node_modules`, `dist`, `backend/vendor`, file `.env`, atau file SQL.

Dari folder project:

```powershell
git add .
git commit -m "prepare deployment for Back4app"
git push origin main
```

## 2. Buat aplikasi Back4app Containers

1. Daftar atau login ke Back4app.
2. Pilih **Containers** atau **Web Deployment**.
3. Hubungkan akun GitHub.
4. Pilih repository project dan branch `main`.
5. Root directory dikosongkan karena `Dockerfile` berada di root repository.
6. Pilih paket **Free**.

## 3. Tambahkan environment variables

Salin nilai koneksi dari halaman TiDB Cloud atau konfigurasi DBeaver.

| Variable | Nilai |
|---|---|
| `APP_NAME` | `Nick Holiday` |
| `APP_ENV` | `production` |
| `APP_KEY` | hasil `php artisan key:generate --show` |
| `APP_DEBUG` | `false` |
| `APP_URL` | URL Back4app setelah aplikasi dibuat |
| `LOG_CHANNEL` | `stderr` |
| `LOG_LEVEL` | `warning` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | host TiDB Cloud |
| `DB_PORT` | `4000` |
| `DB_DATABASE` | nama database TiDB |
| `DB_USERNAME` | username TiDB |
| `DB_PASSWORD` | password TiDB |
| `MYSQL_ATTR_SSL_CA` | `/etc/ssl/certs/ca-certificates.crt` |
| `SESSION_DRIVER` | `database` |
| `CACHE_STORE` | `database` |
| `QUEUE_CONNECTION` | `database` |
| `FILESYSTEM_DISK` | `public` |
| `SESSION_SECURE_COOKIE` | `true` |
| `RUN_MIGRATIONS` | `false` |

Buat APP_KEY di PowerShell dari folder `backend`:

```powershell
php artisan key:generate --show
```

Jangan menaruh password TiDB atau APP_KEY ke GitHub.

## 4. Deploy

Klik **Create App** atau **Deploy**. Build pertama akan melakukan:

1. `npm ci` dan `npm run build` untuk frontend.
2. `composer install --no-dev` untuk backend.
3. Instalasi ekstensi PHP yang dibutuhkan.
4. Menjalankan Laravel melalui Apache dengan frontend React pada domain yang sama.

Tes alamat berikut setelah status aplikasi menjadi Ready:

- Website: `https://DOMAIN-BACK4APP/`
- Health check: `https://DOMAIN-BACK4APP/up`
- API package: `https://DOMAIN-BACK4APP/api/packages`
- Admin login: `https://DOMAIN-BACK4APP/admin/login`

## 5. Catatan file upload

Database tetap tersimpan di TiDB Cloud. File gambar yang sudah ada ikut masuk ke image Docker. Namun file baru yang diunggah melalui halaman admin tersimpan di filesystem container dan dapat hilang saat container dibuat ulang atau di-deploy ulang. Untuk penggunaan tugas atau demo, konfigurasi ini biasanya cukup. Untuk penyimpanan permanen, pindahkan upload ke object storage seperti Cloudinary atau Back4app File Storage.
