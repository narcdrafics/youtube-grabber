interface VideoInfoProps {
  videoId: string;
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    label: "ID do Vídeo",
    watch: "Assistir",
  },
  en: {
    label: "Video ID",
    watch: "Watch",
  },
};

export default function VideoInfo({ videoId, lang = "pt" }: VideoInfoProps) {
  const t = translations[lang];
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
      <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/50 text-xs uppercase tracking-wide font-medium mb-0.5">{t.label}</p>
        <p className="text-white font-mono font-semibold text-sm truncate">{videoId}</p>
      </div>
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
      >
        {t.watch}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
