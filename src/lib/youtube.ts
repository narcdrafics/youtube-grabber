export type ThumbnailQuality =
  | "maxresdefault"
  | "sddefault"
  | "hqdefault"
  | "mqdefault"
  | "default";

export interface Thumbnail {
  quality: ThumbnailQuality;
  label: string;
  resolution: string;
  url: string;
}

export interface VideoInfo {
  id: string;
  thumbnails: Thumbnail[];
}

const THUMBNAIL_BASE = "https://i.ytimg.com/vi";

const THUMBNAIL_DEFINITIONS: {
  quality: ThumbnailQuality;
  label: string;
  resolution: string;
}[] = [
  { quality: "maxresdefault", label: "Max Resolution", resolution: "1280×720" },
  { quality: "sddefault", label: "Standard Definition", resolution: "640×480" },
  { quality: "hqdefault", label: "High Quality", resolution: "480×360" },
  { quality: "mqdefault", label: "Medium Quality", resolution: "320×180" },
  { quality: "default", label: "Default", resolution: "120×90" },
];

export function extractVideoId(input: string): string | null {
  const trimmed = input.trim();

  // youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/embed/ID
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

export function getThumbnailUrl(videoId: string, quality: ThumbnailQuality): string {
  return `${THUMBNAIL_BASE}/${videoId}/${quality}.jpg`;
}

export function generateThumbnails(videoId: string): Thumbnail[] {
  return THUMBNAIL_DEFINITIONS.map((def) => ({
    ...def,
    url: getThumbnailUrl(videoId, def.quality),
  }));
}

export async function checkMaxResExists(videoId: string): Promise<boolean> {
  try {
    const res = await fetch(getThumbnailUrl(videoId, "maxresdefault"), {
      method: "HEAD",
    });
    return res.ok;
  } catch {
    return false;
  }
}
