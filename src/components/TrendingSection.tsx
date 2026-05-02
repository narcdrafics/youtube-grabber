import Link from "next/link";

const TRENDING_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", slug: "rick-astley-never-gonna-give-you-up-official-music-video" },
  { id: "9bZkp7q19f0", title: "Gangnam Style", slug: "psy-gangnam-style-mv" },
  { id: "kJQP7kiw5Fk", title: "Despacito", slug: "luis-fonsi-despacito-ft-daddy-yankee" },
  { id: "M7lc1UVf-VE", title: "YouTube Developers", slug: "youtube-developers-live-at-google-io-2012" },
  { id: "jNQXAC9IVRw", title: "Me at the zoo", slug: "me-at-the-zoo" },
];

export default function TrendingSection({ lang = "pt" }: { lang?: "pt" | "en" }) {
  const title = lang === "pt" ? "Thumbnails Populares" : "Trending Thumbnails";
  
  return (
    <section className="mt-20 w-full max-w-4xl px-4 animate-in fade-in duration-1000 delay-500">
      <h2 className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {TRENDING_VIDEOS.map((video) => (
          <Link
            key={video.id}
            href={lang === "pt" ? `/thumbnail/${video.slug}-${video.id}` : `/en/thumbnail/${video.slug}-${video.id}`}
            className="group relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300"
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-[10px] text-white font-medium truncate w-full">
                {video.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
