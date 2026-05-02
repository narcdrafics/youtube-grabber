import type { Metadata } from "next";
import InputForm from "@/components/InputForm";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - Free HD Thumbnail Grabber",
  description: "Download YouTube thumbnails in high resolution (1280x720, HD, SD, HQ) for free. Fast and easy YouTube thumbnail grabber tool.",
};

export default function EnglishHomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-red-800/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 sm:py-32 flex flex-col items-center text-center">
        {/* Logo/Badge */}
        <div className="mb-8 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Professional Tool
          </div>
        </div>

        {/* Hero Section */}
        <header className="mb-12 space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.1]">
            YouTube Thumbnail <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              Downloader
            </span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Get high-quality thumbnails from any YouTube video in seconds.
            Completely free, no registration required.
          </p>
        </header>

        {/* Main Input Form */}
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <InputForm lang="en" />
        </div>

        {/* Features / SEO Content */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Maximum Quality</h3>
            <p className="text-white/40 text-sm">Download thumbnails in 1280x720 (HD) for crystal clear previews.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Ultra Fast</h3>
            <p className="text-white/40 text-sm">Instant results. Just paste the URL and get all resolutions immediately.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">100% Secure</h3>
            <p className="text-white/40 text-sm">No ads, no tracking, no registration. Your privacy is our priority.</p>
          </div>
        </div>

        <footer className="mt-20 text-white/20 text-xs flex gap-4">
          <span>© 2026 YouTube Thumbnail Downloader</span>
          <span className="text-white/10">|</span>
          <a href="/" className="hover:text-white/40 transition-colors">Português</a>
        </footer>
      </div>
    </main>
  );
}
