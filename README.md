# 🎥 VideoDownloader

A modern web application for downloading videos from various social media platforms like YouTube, Instagram, TikTok, and Facebook with ease and speed.

## ✨ Features

- 🚀 **Fast Download** - Download videos in seconds
- 🎯 **HD Quality** - Choose quality from 480p to 4K
- 🔒 **100% Safe** - No logging, no ads, free forever
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🌟 **Modern UI** - Elegant dark mode design with smooth animations
- 🎨 **Platform Support** - YouTube, Instagram, TikTok, Facebook

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Video Processing**: yt-dlp, FFmpeg
- **Deployment**: Docker, Railway

## 📋 Prerequisites

Before running this project, make sure you have installed:

### Required Dependencies:
1. **Node.js** (v18 or newer)
2. **Python 3** (v3.7 or newer)
3. **yt-dlp** - Video downloader
4. **FFmpeg** - Video processing (optional but recommended)

### Installation Commands:

#### Windows:
```bash
# Install Python from python.org
# Install yt-dlp
pip install yt-dlp

# Install FFmpeg (using chocolatey)
choco install ffmpeg
```

#### macOS:
```bash
# Install Python (if not already installed)
brew install python

# Install yt-dlp
pip3 install yt-dlp

# Install FFmpeg
brew install ffmpeg
```

#### Linux (Ubuntu/Debian):
```bash
# Update package list
sudo apt update

# Install Python and pip
sudo apt install python3 python3-pip

# Install yt-dlp
pip3 install yt-dlp

# Install FFmpeg
sudo apt install ffmpeg
```

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone <repository-url>
cd video-downloader
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Verify yt-dlp Installation
```bash
yt-dlp --version
```
If command not found, make sure Python and yt-dlp are installed correctly.

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Open Browser
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
video-downloader/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── download/route.ts    # Download API endpoint
│   │   │   └── health/route.ts      # Health check endpoint
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Main page component
│   └── ...
├── public/
│   └── logo/                        # Platform logos (SVG)
├── Dockerfile                       # Docker configuration
├── docker-compose.yml              # Docker Compose for local dev
├── railway.json                     # Railway deployment config
├── next.config.js                  # Next.js configuration
└── README.md                       # This file
```

## 🔧 API Endpoints

### Download Video
```
GET /api/download?url=<video_url>
```

**Parameters:**
- `url` (required): Video URL to download

**Response:**
- File download stream with appropriate headers
- Content-Disposition: attachment with filename
- Content-Type: video/mp4 or image/jpeg (depending on content)

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "video-downloader"
}
```

## 🐳 Docker Deployment

### Local Development with Docker
```bash
# Build image
docker build -t video-downloader .

# Run container
docker run -p 3000:3000 video-downloader

# Or use docker-compose
docker-compose up
```

### Deploy to Railway
1. Push code to GitHub
2. Connect repository to Railway
3. Railway will automatically detect Dockerfile and deploy

See [README-DEPLOYMENT.md](./README-DEPLOYMENT.md) for complete deployment guide.

## 🎨 UI Features

- **Dark Mode Theme** - Elegant dark theme with green accents
- **Animated Background** - Smooth animated blob background
- **Glass Morphism** - Transparent glass effect on card components
- **Responsive Grid** - Layout adapts to screen size
- **Hover Effects** - Interactive animations on all elements
- **Loading States** - Spinner and visual feedback during processing

## 🔍 Supported Platforms

| Platform | Status | Format Support |
|----------|--------|-----------------|
| YouTube | ✅ | MP4, WebM |
| Instagram | ✅ | MP4, JPG |
| TikTok | ✅ | MP4 |
| Facebook | ✅ | MP4 |

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables
Create `.env.local` file if needed:
```bash
# Example environment variables
NODE_ENV=development
PORT=3000
```

## 🐛 Troubleshooting

### Common Issues:

1. **"yt-dlp command not found"**
   - Make sure Python and yt-dlp are installed
   - Check PATH environment variable

2. **"Download failed"**
   - Make sure URL is valid and accessible
   - Check internet connection
   - Some platforms might block access

3. **"FFmpeg not found"**
   - Install FFmpeg for certain video formats
   - Not required but recommended

### Debug Mode:
```bash
# Run with debug logging
DEBUG=* npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

- Create an issue on GitHub repository
- Check yt-dlp documentation: [yt-dlp documentation](https://github.com/yt-dlp/yt-dlp)
- Check Next.js documentation: [Next.js docs](https://nextjs.org/docs)

---

**Made with ❤️ using Next.js and yt-dlp**
