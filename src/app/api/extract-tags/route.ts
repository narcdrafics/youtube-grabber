import { NextRequest, NextResponse } from "next/server";
import { extractVideoId } from "@/lib/youtube";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const videoId = extractVideoId(url);

    if (!videoId) {
      return NextResponse.json({ error: "URL do YouTube inválida." }, { status: 400 });
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await fetch(youtubeUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Não foi possível acessar o YouTube." }, { status: 500 });
    }

    const html = await response.text();

    // 1. Extração via Meta Keywords
    let tags: string[] = [];
    const keywordsMatch = html.match(/<meta name="keywords" content="([^"]+)">/i);
    if (keywordsMatch) {
      tags = keywordsMatch[1].split(",").map(t => t.trim());
    }

    // 2. Extração via ytInitialPlayerResponse (mais confiável)
    if (tags.length === 0) {
      const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
      if (playerResponseMatch) {
        try {
          const data = JSON.parse(playerResponseMatch[1]);
          tags = data.videoDetails?.keywords || [];
        } catch (e) {
          console.error("Erro ao parsear ytInitialPlayerResponse", e);
        }
      }
    }

    // 3. Extração de Título e Canal para a UI
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(" - YouTube", "") : "Vídeo do YouTube";
    
    const channelMatch = html.match(/"author":"([^"]+)"/i) || html.match(/<link itemprop="name" content="([^"]+)">/i);
    const channelName = channelMatch ? channelMatch[1] : "Canal desconhecido";

    return NextResponse.json({
      id: videoId,
      title,
      channelName,
      tags: Array.from(new Set(tags)), // Remove duplicatas
    });

  } catch (error) {
    console.error("Erro na API de Tags:", error);
    return NextResponse.json({ error: "Erro interno ao processar as tags." }, { status: 500 });
  }
}
