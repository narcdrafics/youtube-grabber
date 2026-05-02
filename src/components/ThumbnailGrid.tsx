import type { Thumbnail } from "@/lib/youtube";
import ThumbnailCard from "./ThumbnailCard";

interface ThumbnailGridProps {
  thumbnails: Thumbnail[];
  videoId: string;
}

export default function ThumbnailGrid({ thumbnails, videoId }: ThumbnailGridProps) {
  return (
    <section aria-label="Thumbnails disponíveis">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Thumbnails disponíveis
        </h2>
        <span className="text-sm text-white/40">
          {thumbnails.length} resoluções
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
          />
        ))}
      </div>

      <p className="mt-6 text-center text-white/30 text-xs">
        Thumbnails servidas diretamente pelo YouTube (i.ytimg.com) • Sem armazenamento de dados
      </p>
    </section>
  );
}
