import { NextRequest, NextResponse } from "next/server";
import { extractVideoId, generateThumbnails } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const url = req.nextUrl.searchParams.get("url");

  let videoId: string | null = id;

  if (!videoId && url) {
    videoId = extractVideoId(url);
  }

  if (!videoId) {
    return NextResponse.json(
      { error: "Informe 'id' ou 'url' como parâmetro." },
      { status: 400 }
    );
  }

  const thumbnails = generateThumbnails(videoId);

  return NextResponse.json({ videoId, thumbnails });
}
