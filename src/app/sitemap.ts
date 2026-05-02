import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thumbnailsgrabber.web.app";

  // Páginas Estáticas
  const routes = ["", "/en", "/tags", "/en/tags"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Seed de IDs populares para começar a indexação (PSEO)
  // Em um sistema real, aqui você buscaria do seu banco de dados de buscas recentes
  const popularVideoIds = [
    { id: "dQw4w9WgXcQ", slug: "rick-astley-never-gonna-give-you-up-official-music-video" },
    { id: "9bZkp7q19f0", slug: "psy-gangnam-style-mv" },
    { id: "kJQP7kiw5Fk", slug: "luis-fonsi-despacito-ft-daddy-yankee" },
    { id: "M7lc1UVf-VE", slug: "youtube-developers-live-at-google-io-2012" },
    { id: "jNQXAC9IVRw", slug: "me-at-the-zoo" }
  ];

  const popularNiches = ["minecraft", "musica", "lofi", "asmr", "tutorial", "gaming", "music"];

  const seoPages = popularVideoIds.flatMap((v) => [
    {
      url: `${baseUrl}/thumbnail/${v.slug}-${v.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/thumbnail/${v.slug}-${v.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }
  ]);

  const nichePages = popularNiches.flatMap((n) => [
    {
      url: `${baseUrl}/tags/${n}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/tags/${n}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }
  ]);

  return [...routes, ...seoPages, ...nichePages];
}
