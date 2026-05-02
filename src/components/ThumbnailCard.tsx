"use client";

import { useState } from "react";
import type { Thumbnail } from "@/lib/youtube";

interface ThumbnailCardProps {
  thumbnail: Thumbnail;
  videoId: string;
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    notAvailable: "não disponível",
    openTab: "Abrir em nova aba",
    copyUrl: "Copiar URL",
    copied: "Copiado!",
    imgAlt: (label: string, id: string) => `Thumbnail ${label} do vídeo ${id}`,
  },
  en: {
    notAvailable: "not available",
    openTab: "Open in new tab",
    copyUrl: "Copy URL",
    copied: "Copied!",
    imgAlt: (label: string, id: string) => `Thumbnail ${label} from video ${id}`,
  },
};

export default function ThumbnailCard({
  thumbnail,
  videoId,
  lang = "pt",
}: ThumbnailCardProps) {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  async function handleDownload() {
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${videoId}-${thumbnail.quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open in new tab
      window.open(thumbnail.url, "_blank");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(thumbnail.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = thumbnail.url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (imgError) {
    return (
      <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center gap-2 text-white/40 min-h-[200px]">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm text-center">
          <span className="font-semibold text-white/60">{thumbnail.label}</span>
          <br />{t.notAvailable}
        </span>
      </div>
    );
  }

  return (
    <div
      id={`thumbnail-card-${thumbnail.quality}`}
      className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-black aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail.url}
          alt={t.imgAlt(thumbnail.label, videoId)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info & Actions */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold text-sm leading-tight">
              {thumbnail.label}
            </h3>
            <p className="text-white/40 text-xs mt-0.5">{thumbnail.resolution}</p>
          </div>
          <span className="text-xs text-red-400 font-mono bg-red-500/10 px-2 py-0.5 rounded-full">
            {thumbnail.quality === "maxresdefault" ? "HD" :
             thumbnail.quality === "sddefault" ? "SD" :
             thumbnail.quality === "hqdefault" ? "HQ" :
             thumbnail.quality === "mqdefault" ? "MQ" : "STD"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            id={`download-${thumbnail.quality}`}
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all duration-200 hover:shadow-md hover:shadow-red-600/30 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>

          <button
            id={`open-${thumbnail.quality}`}
            onClick={() => window.open(thumbnail.url, "_blank")}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all duration-200 active:scale-95"
            title={t.openTab}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open
          </button>

          <button
            id={`copy-${thumbnail.quality}`}
            onClick={handleCopy}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
              copied
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title={t.copyUrl}
          >
            {copied ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            {copied ? t.copied : "Copy URL"}
          </button>
        </div>
      </div>
    </div>
  );
}
