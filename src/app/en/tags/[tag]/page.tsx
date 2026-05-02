import { Metadata } from "next";
import InputForm from "@/components/InputForm";
import Link from "next/link";

interface Props {
  params: { tag: string };
}

const TAG_SUGGESTIONS: Record<string, string[]> = {
  "minecraft": ["minecraft gameplay", "minecraft survival", "minecraft mod", "gaming"],
  "music": ["music video", "official audio", "lyrics", "vibe", "new song"],
  "lofi": ["lofi beats", "chillhop", "study music", "relaxing music"],
  "asmr": ["asmr sleep", "asmr triggers", "asmr tingles", "relaxation"],
  "tutorial": ["how to", "tutorial 2026", "step by step", "guide", "tips"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  
  return {
    title: `YouTube Tags for ${capitalizedTag} - Best Keywords 2026`,
    description: `Find the best YouTube keywords and tags for the ${tag} niche. Use our free tag extractor and thumbnail downloader to grow your channel.`,
    alternates: {
      canonical: `https://thumbnailsgrabber.web.app/en/tags/${params.tag}`,
    }
  };
}

export default function EnglishTagNichePage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const suggestions = TAG_SUGGESTIONS[tag.toLowerCase()] || [tag, "youtube", "video", "creator", "viral"];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/en" className="font-black text-xl tracking-tighter hover:text-red-500 transition-colors">
            THUMBNAILS<span className="text-red-600">GRABBER</span>
          </Link>
          <div className="flex gap-6 text-sm font-medium text-white/40">
            <Link href="/en" className="hover:text-white transition-colors">Home</Link>
            <Link href="/en/tags" className="text-white">Tags</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
          Best Tags for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
            {capitalizedTag}
          </span>
        </h1>
        <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto">
          Boost your {tag} video SEO with the most searched keywords. 
          Below are some ideal suggestions for your channel.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">Tag Suggestions</h2>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:border-red-500/50 transition-colors">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-white/30 text-xs italic">
            Tip: Use these tags in your YouTube Studio "Tags" field to improve your reach.
          </p>
        </div>

        <div className="bg-red-600/5 border border-red-500/20 rounded-3xl p-8 mb-20">
          <h2 className="text-xl font-bold mb-4">Need a Thumbnail for a {tag} video?</h2>
          <p className="text-white/50 mb-8 text-sm">Paste the link below to extract the HD thumbnail.</p>
          <InputForm lang="en" />
        </div>

        <footer className="mt-32 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-widest">
          © 2026 YouTube Grabber · Programmatic SEO Strategy Active
        </footer>
      </div>
    </main>
  );
}
