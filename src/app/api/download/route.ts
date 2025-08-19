import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

// API untuk download video via yt-dlp
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Jalankan yt-dlp (stream stdout langsung ke response)
  const ytdlp = spawn("yt-dlp", ["-f", "best", "-o", "-", url]);

  const headers = new Headers();
  headers.set("Content-Disposition", "attachment; filename=video.mp4");
  headers.set("Content-Type", "video/mp4");

  return new Response(ytdlp.stdout as any, { headers });
}
