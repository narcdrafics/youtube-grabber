"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";

interface VideoData {
  id: string;
  title: string;
  channelName: string;
  tags: string[];
}

export default function TagsPage() {
  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  async function fetchTags(url: string) {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/extract-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        alert(result.error || "Erro ao buscar tags.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  function copyAll() {
    if (!data) return;
    const text = data.tags.join(", ");
    navigator.clipboard.writeText(text);
    alert("Todas as tags copiadas para o clipboard!");
  }

  function downloadTxt() {
    if (!data) return;
    const text = data.tags.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tags-${data.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copySingle(tag: string) {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-red-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20">
        {/* Nav / Logo */}
        <header className="flex flex-col items-center text-center mb-16">
          <a href="/" className="mb-6 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-white font-bold tracking-tight">YouTube Grabber</span>
          </a>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Extrator de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Tags</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl">
            Descubra as palavras-chave ocultas de qualquer vídeo para melhorar seu SEO.
          </p>
        </header>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <InputForm onResult={(id) => fetchTags(`https://youtube.com/watch?v=${id}`)} />
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <a href="/" className="text-white/30 hover:text-white text-xs transition-colors underline underline-offset-4 decoration-white/10">Baixar Thumbnails</a>
            <span className="text-white/10">|</span>
            <span className="text-red-500 text-xs font-semibold">Extrator de Tags</span>
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-white/40 animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin mb-4" />
            <p>Analisando metadados do vídeo...</p>
          </div>
        )}

        {data && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Video Preview */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 mb-8">
              <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-black relative shrink-0">
                <img src={`https://i.ytimg.com/vi/${data.id}/mqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="flex-1 min-w-0 text-center md:text-left">
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1">Vídeo Identificado</p>
                <h2 className="text-white font-bold text-xl truncate mb-1">{data.title}</h2>
                <p className="text-white/40 text-sm">{data.channelName}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                <button onClick={copyAll} className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  Copiar Todas (CSV)
                </button>
                <button onClick={downloadTxt} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Baixar .TXT
                </button>
              </div>
            </div>

            {/* Tags Grid */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold text-lg">Tags Encontradas ({data.tags.length})</h3>
                <span className="text-white/20 text-[10px] uppercase tracking-tighter">Clique em uma tag para copiar</span>
              </div>
              
              {data.tags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {data.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => copySingle(tag)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        copiedTag === tag 
                        ? "bg-green-500/20 border-green-500/50 text-green-400 scale-95" 
                        : "bg-white/5 border-white/10 text-white/70 hover:border-red-500/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tag}
                      {copiedTag === tag && <span className="ml-2 text-[10px] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-white/40 italic">Nenhuma tag encontrada para este vídeo.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ad Space Placeholder */}
        <div className="mt-16 w-full max-w-4xl mx-auto h-32 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/10 text-xs font-bold tracking-widest uppercase">
          Espaço para Anúncio
        </div>

        <footer className="mt-32 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-widest">
          © 2026 YouTube Grabber · Ferramentas Profissionais para YouTubers
        </footer>
      </div>
    </main>
  );
}
