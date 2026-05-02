import type { Thumbnail } from "@/lib/youtube";
import ThumbnailCard from "./ThumbnailCard";

interface ThumbnailGridProps {
  thumbnails: Thumbnail[];
  videoId: string;
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    title: "Thumbnails disponíveis",
    resolutions: "resoluções",
    footer: "Thumbnails servidas diretamente pelo YouTube (i.ytimg.com) • Sem armazenamento de dados",
    ariaLabel: "Thumbnails disponíveis",
  },
  en: {
    title: "Available Thumbnails",
    resolutions: "resolutions",
    footer: "Thumbnails served directly by YouTube (i.ytimg.com) • No data stored",
    ariaLabel: "Available Thumbnails",
  },
};

export default function ThumbnailGrid({
  thumbnails,
  videoId,
  lang = "pt",
}: ThumbnailGridProps) {
  const t = translations[lang];
  return (
    <section aria-label={t.ariaLabel}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {t.title}
        </h2>
        <span className="text-sm text-white/40">
          {thumbnails.length} {t.resolutions}
        </span>
      </div>

      <div
        id="thumbnail-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {thumbnails.map((thumb) => (
          <ThumbnailCard
            key={thumb.quality}
            thumbnail={thumb}
            videoId={videoId}
            lang={lang}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-white/30 text-xs">
        {t.footer}
      </p>
    </section>
  );
}
