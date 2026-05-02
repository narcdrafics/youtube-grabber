import { NextRequest, NextResponse } from "next/server";
import { extractVideoId } from "@/lib/youtube";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL é obrigatória." },
        { status: 400 }
      );
    }

    const id = extractVideoId(url);

    if (!id) {
      return NextResponse.json(
        {
          error:
            "URL inválida. Use um link do YouTube como: youtube.com/watch?v=... ou youtu.be/...",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao processar a URL." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Parâmetro 'url' ausente." }, { status: 400 });
  }

  const id = extractVideoId(url);

  if (!id) {
    return NextResponse.json(
      { error: "URL do YouTube inválida." },
      { status: 422 }
    );
  }

  return NextResponse.json({ id });
}
