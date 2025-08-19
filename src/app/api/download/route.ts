import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

// Interface untuk metadata yt-dlp
interface YtDlpMetadata {
  url: string;
  ext?: string;
  title?: string;
  entries?: YtDlpMetadata[];
}

// Helper ambil metadata dengan berbagai strategi
async function getMetadata(url: string, strategy = 0): Promise<YtDlpMetadata> {
  return new Promise<YtDlpMetadata>((resolve, reject) => {
    let args: string[] = [];
    
    // Strategi berbeda untuk bypass bot detection
    switch (strategy) {
      case 0: // Strategi dasar
        args = [
          "--dump-json",
          "--no-warnings",
          "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          url
        ];
        break;
      case 1: // Dengan extractor args
        args = [
          "--dump-json",
          "--no-warnings",
          "--extractor-args", "youtube:skip=dash,hls",
          "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          url
        ];
        break;
      case 2: // Dengan format spesifik
        args = [
          "--dump-json",
          "--no-warnings", 
          "--format", "best[height<=720]",
          "--user-agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
          url
        ];
        break;
      default:
        reject(new Error("All strategies failed"));
        return;
    }

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
    // Coba berbagai strategi untuk bypass bot detection
    let metadata: YtDlpMetadata | null = null;
    let lastError: Error | null = null;
    
    for (let strategy = 0; strategy <= 2; strategy++) {
      try {
        console.log(`Trying strategy ${strategy} for URL: ${url}`);
        metadata = await getMetadata(url, strategy);
        console.log(`Strategy ${strategy} succeeded`);
        break;
      } catch (error) {
        console.log(`Strategy ${strategy} failed:`, error instanceof Error ? error.message : error);
        lastError = error instanceof Error ? error : new Error(String(error));
        if (strategy === 2) {
          throw lastError; // Semua strategi gagal
        }
      }
    }
    
    if (!metadata) {
      throw new Error("Failed to get metadata with all strategies");
    }

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
