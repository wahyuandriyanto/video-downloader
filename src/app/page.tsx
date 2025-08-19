"use client";

import { useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    try {
      window.open(`/api/download?url=${encodeURIComponent(url)}`, "_blank");
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  const platforms = [
    { name: "YouTube", icon: "/logo/youtube.svg", color: "from-red-500 to-red-600", bgColor: "bg-red-50" },
    { name: "Instagram", icon: "/logo/instagram.svg", color: "from-pink-500 to-purple-600", bgColor: "bg-pink-50" },
    { name: "TikTok", icon: "/logo/tiktok.svg", color: "from-gray-800 to-gray-900", bgColor: "bg-gray-50" },
    { name: "Facebook", icon: "/logo/facebook.svg", color: "from-blue-600 to-blue-700", bgColor: "bg-blue-50" },
  ];

  const steps = [
    { step: "01", title: "Copy Link", desc: "Salin URL video dari platform favorit" },
    { step: "02", title: "Paste URL", desc: "Tempel link di kolom input di atas" },
    { step: "03", title: "Download", desc: "Klik tombol download dan tunggu prosesnya" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-20 left-1/4 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-3000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-6">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                VideoDownloader
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold">
                Download video berkualitas tinggi
              </span>
              {' '}dari platform favorit Anda dengan mudah dan cepat. Tanpa registrasi, tanpa batasan!
            </p>
          </div>

          {/* Download Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Masukkan URL video (YouTube, Instagram, TikTok, dll.)"
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 text-lg group-hover:border-white/20"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <button
                  onClick={handleDownload}
                  disabled={isLoading || !url.trim()}
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 md:space-x-3 text-base md:text-lg shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
                      <span className="text-sm md:text-base">Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl md:text-2xl">⚡</span>
                      <span className="text-sm md:text-base font-semibold">Download Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Platform Support */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Platform yang Didukung
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {platforms.map((platform, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:bg-white/10 transform hover:scale-105 hover:shadow-xl">
                  <div className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {platform.icon.startsWith('/logo/') ? (
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain group-hover:opacity-100 transition-opacity duration-300"
                      />
                    ) : (
                      <span className="text-4xl">{platform.icon}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-300 group-hover:text-green-300 transition-colors duration-300">{platform.name}</div>
                </div>
              ))}
            </div>
          </div>


          {/* How to Use */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Cara Menggunakan
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">{step.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                VideoDownloader
              </h4>
              <p className="text-gray-400 max-w-md mx-auto">
                Solusi terbaik untuk download video dari berbagai platform dengan kualitas terbaik.
              </p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-500 text-sm">
                &copy; 2024 VideoDownloader. Dibuat dengan ❤️ untuk kemudahan Anda.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
