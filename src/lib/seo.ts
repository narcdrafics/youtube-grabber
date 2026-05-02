import type { Metadata } from "next";

export function generateHomeMetadata(): Metadata {
  return {
    title: "YouTube Thumbnail Downloader – Baixe Thumbnails em Alta Resolução",
    description:
      "Cole a URL de qualquer vídeo do YouTube e baixe a thumbnail em múltiplas resoluções: HD (1280×720), SD, HQ e mais. Gratuito e sem cadastro.",
    keywords: [
      "youtube thumbnail downloader",
      "baixar thumbnail youtube",
      "thumbnail hd youtube",
      "download thumbnail",
    ],
    openGraph: {
      title: "YouTube Thumbnail Downloader",
      description: "Baixe thumbnails do YouTube em alta resolução gratuitamente.",
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "YouTube Thumbnail Downloader",
      description: "Baixe thumbnails do YouTube em alta resolução gratuitamente.",
    },
    alternates: {
      canonical: "https://youtube-grabber.vercel.app",
    },
  };
}

export function generateThumbnailPageMetadata(videoId: string): Metadata {
  return {
    title: `Thumbnails do vídeo ${videoId} – YouTube Thumbnail Downloader`,
    description: `Visualize e baixe as thumbnails do vídeo ${videoId} em múltiplas resoluções: maxres (1280×720), SD, HQ, MQ e padrão.`,
    keywords: [
      `thumbnail ${videoId}`,
      "youtube thumbnail",
      "download thumbnail youtube",
      "thumbnail hd",
    ],
    openGraph: {
      title: `Thumbnails – ${videoId}`,
      description: `Baixe as thumbnails do vídeo ${videoId} do YouTube.`,
      type: "website",
      images: [
        {
          url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          width: 480,
          height: 360,
          alt: `Thumbnail do vídeo ${videoId}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Thumbnails – ${videoId}`,
      description: `Baixe as thumbnails do vídeo ${videoId} do YouTube.`,
      images: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
    },
    alternates: {
      canonical: `https://youtube-grabber.vercel.app/youtube-thumbnail/${videoId}`,
    },
  };
}
