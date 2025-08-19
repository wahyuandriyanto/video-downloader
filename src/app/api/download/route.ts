import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

// Interface untuk metadata yt-dlp
interface YtDlpMetadata {
  url: string;
  ext?: string;
  title?: string;
  entries?: YtDlpMetadata[];
}

// Helper ambil metadata
async function getMetadata(url: string): Promise<YtDlpMetadata> {
  return new Promise<YtDlpMetadata>((resolve, reject) => {
    const args = [
      "--dump-json",
      "--no-warnings",
      "--no-check-certificate",
      "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      url
    ];

    const proc = spawn("yt-dlp", args);

    let data = "";
    proc.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    let stderr = "";
    proc.stderr.on("data", (err) => {
      stderr += err.toString();
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`yt-dlp exited with code ${code}: ${stderr}`));
      }
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // ambil metadata yt-dlp
    const metadata = await getMetadata(url);
    console.log("Metadata received:", !!metadata);

    // kalau carousel Instagram → metadata.entries
    const item = metadata.entries ? metadata.entries[0] : metadata;

    if (!item.url) {
      return NextResponse.json(
        { error: "No downloadable media found" },
        { status: 404 }
      );
    }

    // dapatkan link langsung
    const fileUrl = item.url;
    const ext = item.ext || "mp4";
    const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext);

    // fetch file asli
    const response = await fetch(fileUrl);

    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `attachment; filename="${(item.title || "download").replace(/[^\w]/g, "_")}.${ext}"`
    );
    headers.set("Content-Type", isImage ? `image/${ext}` : "video/mp4");

    return new Response(response.body, { headers });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        error: `Failed to download: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
