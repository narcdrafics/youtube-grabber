import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getThumbnails } from "@/lib/youtube";
import VideoInfo from "@/components/VideoInfo";
import ThumbnailGrid from "@/components/ThumbnailGrid";
import InputForm from "@/components/InputForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Download YouTube Thumbnail - ${id} | Free HD Grabber`,
    description: `Download thumbnails for YouTube video ID ${id} in high quality. HD, SD, HQ resolutions available.`,
  };
}

export default async function EnglishDownloadPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const thumbnails = getThumbnails(id);

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-red-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <Link
            href="/en"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-sm font-medium">Back to search</span>
          </Link>

          <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Ready to download</span>
          </div>
        </nav>

        {/* Content Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Results for <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">Thumbnail</span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl">
            Choose the resolution that fits your project. All images are retrieved directly from official YouTube servers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Area */}
          <div className="space-y-8">
            <VideoInfo videoId={id} lang="en" />
            <ThumbnailGrid thumbnails={thumbnails} videoId={id} lang="en" />
          </div>

          {/* Sidebar / New Search */}
          <aside className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 sticky top-8">
              <h3 className="text-white font-bold text-lg mb-4">New Search</h3>
              <InputForm compact lang="en" />
              
              <div className="mt-8 space-y-4 pt-6 border-t border-white/5">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-white/30 leading-normal">
                    <strong className="text-white/60 block mb-0.5">High Definition</strong>
                    Available in 1280x720 if provided by the author.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-white/30 leading-normal">
                    <strong className="text-white/60 block mb-0.5">Safe to Use</strong>
                    Images are original from YouTube CDN.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-white/10 text-[10px] uppercase tracking-widest mb-4">© 2026 YouTube Thumbnail Downloader</p>
          <div className="flex justify-center gap-6">
             <Link href={`/youtube-thumbnail/${id}`} className="text-white/30 hover:text-white text-xs transition-colors underline decoration-white/10 underline-offset-4">Versão em Português</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
