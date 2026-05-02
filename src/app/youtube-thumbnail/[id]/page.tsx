import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateThumbnailPageMetadata } from "@/lib/seo";
import { extractVideoId, generateThumbnails } from "@/lib/youtube";
import ThumbnailGrid from "@/components/ThumbnailGrid";
import VideoInfo from "@/components/VideoInfo";
import InputForm from "@/components/InputForm";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const videoId = extractVideoId(id) ?? id;
  return generateThumbnailPageMetadata(videoId);
}

export default async function ThumbnailPage({ params }: PageProps) {
  const { id } = await params;

  // Accept both raw IDs and URL-encoded URLs
  const videoId = extractVideoId(decodeURIComponent(id)) ?? id;

  // Validate ID format
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    notFound();
  }

  const thumbnails = generateThumbnails(videoId);

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-red-800/10 rounded-full blur-3xl" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header nav */}
        <nav className="flex items-center justify-between mb-8" aria-label="Navegação">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nova busca
          </Link>

          <div className="flex items-center gap-2 text-red-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="font-bold text-white text-sm hidden sm:block">Thumbnail Downloader</span>
          </div>
        </nav>

        {/* Page title */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Thumbnails do Vídeo
          </h1>
          <p className="text-white/40 text-sm">
            Clique em <strong className="text-white/60">Download</strong> para salvar,{" "}
            <strong className="text-white/60">Open</strong> para visualizar em nova aba,
            ou <strong className="text-white/60">Copy URL</strong> para copiar o link direto.
          </p>
        </header>

        {/* Video info */}
        <VideoInfo videoId={videoId} />

        {/* Thumbnails grid */}
        <ThumbnailGrid thumbnails={thumbnails} videoId={videoId} />

        {/* Search another */}
        <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10">
          <h2 className="text-white font-bold text-lg mb-4">Buscar outro vídeo</h2>
          <InputForm />
        </section>

        {/* SEO content */}
        <section className="mt-12 text-white/30 text-sm leading-relaxed space-y-3">
          <h2 className="text-white/50 font-semibold">
            Sobre as thumbnails do YouTube
          </h2>
          <p>
            O YouTube disponibiliza thumbnails em múltiplas resoluções para cada vídeo
            através do seu servidor de imagens (<code className="text-white/40">i.ytimg.com</code>).
            A resolução <strong className="text-white/40">maxresdefault</strong> oferece
            1280×720 pixels (HD) quando disponível, sendo ideal para uso em apresentações
            e materiais gráficos.
          </p>
          <p>
            As thumbnails são de propriedade dos criadores de conteúdo e do YouTube.
            Respeite os direitos autorais ao utilizar as imagens.
          </p>
        </section>

        <footer className="mt-10 text-white/20 text-xs text-center">
          YouTube Thumbnail Downloader · Não afiliado ao YouTube
        </footer>
      </div>
    </main>
  );
}
