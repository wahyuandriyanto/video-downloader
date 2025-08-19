# Video Downloader - Railway Deployment Guide

## 📦 Files yang Dibuat untuk Deployment

1. **Dockerfile** - Konfigurasi Docker container
2. **.dockerignore** - File yang diabaikan saat build Docker
3. **railway.json** - Konfigurasi khusus Railway
4. **next.config.js** - Konfigurasi Next.js untuk production
5. **docker-compose.yml** - Untuk testing lokal (opsional)
6. **src/app/api/health/route.ts** - Health check endpoint

## 🚀 Cara Deploy ke Railway

### 1. Persiapan Repository
```bash
# Pastikan semua file sudah di commit
git add .
git commit -m "Add Docker configuration for Railway deployment"
git push origin main
```

### 2. Deploy ke Railway
1. Buka [Railway.app](https://railway.app)
2. Login dengan GitHub account
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"
5. Pilih repository video-downloader ini
6. Railway akan otomatis detect Dockerfile dan mulai build

### 3. Environment Variables (Opsional)
Jika diperlukan, tambahkan environment variables di Railway dashboard:
- `NODE_ENV=production`
- `PORT=3000` (otomatis di-set oleh Railway)

### 4. Custom Domain (Opsional)
- Di Railway dashboard, buka tab "Settings"
- Scroll ke "Domains"
- Tambahkan custom domain jika diperlukan

## 🧪 Testing Lokal dengan Docker

```bash
# Build Docker image
docker build -t video-downloader .

# Run container
docker run -p 3000:3000 video-downloader

# Atau gunakan docker-compose
docker-compose up
```

## 📋 Health Check

Setelah deploy, cek health endpoint:
```
GET https://your-app.railway.app/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "video-downloader"
}
```

## 🔧 Troubleshooting

### Build Gagal
- Pastikan semua dependencies ada di package.json
- Check logs di Railway dashboard

### yt-dlp Error
- Pastikan ffmpeg terinstall (sudah ada di Dockerfile)
- Check apakah yt-dlp versi terbaru

### Memory Issues
- Railway free tier memiliki limit memory
- Pertimbangkan upgrade plan jika diperlukan

## 📝 Notes

- Docker image menggunakan Node.js 18 Alpine untuk ukuran yang lebih kecil
- yt-dlp dan ffmpeg sudah terinstall di container
- Application berjalan sebagai non-root user untuk security
- Health check endpoint tersedia di `/api/health`
- Standalone output diaktifkan untuk optimasi Docker

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
