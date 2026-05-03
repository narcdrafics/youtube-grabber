"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface InputFormProps {
  defaultValue?: string;
  onResult?: (videoId: string) => void;
  compact?: boolean;
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    placeholder: "https://www.youtube.com/watch?v=...",
    button: "Get Thumbnail",
    loading: "Buscando...",
    errorEmpty: "Cole uma URL do YouTube para continuar.",
    errorInvalid: "URL inválida. Tente novamente.",
    errorConnection: "Erro de conexão. Verifique sua internet.",
    paste: "Colar da área de transferência",
    ariaLabel: "URL do vídeo do YouTube",
  },
  en: {
    placeholder: "https://www.youtube.com/watch?v=...",
    button: "Get Thumbnail",
    loading: "Searching...",
    errorEmpty: "Paste a YouTube URL to continue.",
    errorInvalid: "Invalid URL. Please try again.",
    errorConnection: "Connection error. Check your internet.",
    paste: "Paste from clipboard",
    ariaLabel: "YouTube Video URL",
  },
};

export default function InputForm({
  defaultValue = "",
  onResult,
  compact,
  lang = "pt",
}: InputFormProps) {
  const t = translations[lang];
  const [url, setUrl] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError(t.errorEmpty);
      inputRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/extract-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.id) {
        setError(data.error || t.errorInvalid);
        setLoading(false);
        return;
      }

      if (onResult) {
        onResult(data.id);
      } else {
        const path = lang === "en" ? `/en/thumbnail/${data.id}` : `/thumbnail/${data.id}`;
        router.push(path);
      }
    } catch {
      setError(t.errorConnection);
    } finally {
      setLoading(false);
    }
  }

  function handlePaste() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then((text) => {
          if (text) setUrl(text);
        })
        .catch(() => {});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex flex-col sm:flex-row gap-3 ${compact ? "" : "gap-4"}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            id="youtube-url-input"
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(null); }}
            placeholder={t.placeholder}
            className={`
              w-full pl-12 pr-12 py-4 rounded-2xl
              bg-white/10 backdrop-blur-sm
              border-2 ${error ? "border-red-500" : "border-white/20 focus:border-red-500"}
              text-white placeholder-white/40
              text-base outline-none
              transition-all duration-200
              ${compact ? "py-3 text-sm" : ""}
            `}
            aria-label={t.ariaLabel}
            autoComplete="off"
            spellCheck={false}
          />
          {typeof navigator !== "undefined" && navigator.clipboard && (
            <button
              type="button"
              onClick={handlePaste}
              title={t.paste}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          id="get-thumbnail-btn"
          type="submit"
          disabled={loading}
          className={`
            relative overflow-hidden
            px-8 py-4 rounded-2xl font-semibold text-base
            bg-gradient-to-r from-red-600 to-red-500
            hover:from-red-500 hover:to-red-400
            disabled:from-red-900 disabled:to-red-800
            text-white shadow-lg shadow-red-600/30
            transition-all duration-200
            flex items-center justify-center gap-2
            whitespace-nowrap
            ${compact ? "py-3 text-sm px-6" : ""}
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t.loading}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t.button}
            </>
          )}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </form>
  );
}
