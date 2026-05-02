import type { Metadata } from "next";
import { generateHomeMetadata } from "@/lib/seo";
import InputForm from "@/components/InputForm";

export const metadata: Metadata = generateHomeMetadata();

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-red-800/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Gratuito · Sem cadastro · Instantâneo
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            YouTube{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Thumbnail
              </span>
            </span>
            <br />
            Downloader
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Cole a URL de qualquer vídeo do YouTube e baixe a thumbnail em
            múltiplas resoluções — HD, SD, HQ e mais.
          </p>
        </div>

        {/* Main input card */}
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
            <InputForm />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl w-full">
          {[
            { icon: "⚡", label: "Instantâneo", desc: "Sem espera" },
            { icon: "🖼️", label: "5 resoluções", desc: "HD até padrão" },
            { icon: "⬇️", label: "Download direto", desc: "1 clique" },
            { icon: "🔒", label: "Sem dados", desc: "100% privado" },
          ].map((feat) => (
            <div
              key={feat.label}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <span className="text-2xl mb-2">{feat.icon}</span>
              <span className="text-white text-sm font-semibold">{feat.label}</span>
              <span className="text-white/40 text-xs mt-0.5">{feat.desc}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <section className="mt-16 max-w-2xl w-full" aria-label="Como funciona">
          <h2 className="text-center text-white/60 text-sm font-medium uppercase tracking-widest mb-8">
            Como funciona
          </h2>
          <ol className="flex flex-col sm:flex-row gap-4">
            {[
              {
                n: "1",
                title: "Cole a URL",
                desc: "Qualquer link do YouTube: /watch, youtu.be ou embed",
              },
              {
                n: "2",
                title: "Clique em Get",
                desc: "Extraímos automaticamente o ID do vídeo",
              },
              {
                n: "3",
                title: "Baixe",
                desc: "Escolha a resolução e clique em Download",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="flex-1 flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 text-sm font-bold flex items-center justify-center shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{step.title}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-white/20 text-xs text-center">
          YouTube Thumbnail Downloader · Não afiliado ao YouTube ·{" "}
          <span>Imagens são propriedade dos respectivos criadores</span>
        </footer>
      </div>
    </main>
  );
}
