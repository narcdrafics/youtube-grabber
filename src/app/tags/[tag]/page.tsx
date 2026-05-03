import { Metadata } from "next";
import InputForm from "@/components/InputForm";
import Link from "next/link";

interface Props {
  params: Promise<{ tag: string }>;
}

// Sugestões de tags por nicho (simplificado para PSEO)
const TAG_SUGGESTIONS: Record<string, string[]> = {
  "minecraft": ["minecraft", "gameplay", "survival", "building", "gaming"],
  "musica": ["musica", "clipe oficial", "lançamento", "vibe", "sucesso"],
  "lofi": ["lofi", "chill", "study music", "relax", "beats"],
  "asmr": ["asmr", "relaxing", "sleep", "tingles", "triggers"],
  "tutorial": ["tutorial", "como fazer", "passo a passo", "dicas", "aprenda"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  
  return {
    title: `Tags de YouTube para ${capitalizedTag} - Melhores Tags 2026`,
    description: `Descubra as melhores tags de YouTube para o nicho ${tag}. Use nosso extrator de tags e downloader de thumbnails gratuito para crescer seu canal.`,
    alternates: {
      canonical: `https://thumbnailsgrabber.web.app/tags/${tagParam}`,
    }
  };
}

export default async function TagNichePage({ params }: Props) {
  const { tag: tagParam } = await params;
  const tag = decodeURIComponent(tagParam);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const suggestions = TAG_SUGGESTIONS[tag.toLowerCase()] || [tag, "youtube", "video", "creator", "viral"];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tighter hover:text-red-500 transition-colors">
            THUMBNAILS<span className="text-red-600">GRABBER</span>
          </Link>
          <div className="flex gap-6 text-sm font-medium text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/tags" className="text-white">Tags</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
          Melhores Tags para <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
            {capitalizedTag}
          </span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto">
          Turbine o SEO do seu vídeo de {tag} com as tags mais pesquisadas. 
          Abaixo estão algumas sugestões ideais para o seu canal.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">Sugestões de Tags</h2>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:border-red-500/50 transition-colors">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-white/30 text-xs italic">
            Dica: Use essas tags no campo "Tags" do seu YouTube Studio para melhorar o alcance.
          </p>
        </div>

        <div className="bg-red-600/5 border border-red-500/20 rounded-3xl p-8 mb-20">
          <h2 className="text-xl font-bold mb-4">Precisa da Thumbnail de um vídeo de {tag}?</h2>
          <p className="text-white/50 mb-8 text-sm">Cole o link abaixo para extrair a thumbnail em HD.</p>
          <InputForm />
        </div>

        <footer className="mt-32 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-widest">
          © 2026 YouTube Grabber · Estratégia de SEO Programático Ativada
        </footer>
      </div>
    </main>
  );
}
