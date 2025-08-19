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
    const proc = spawn("yt-dlp", ["--dump-json", url]);
    let data = "";

    proc.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    proc.stderr.on("data", (err) => {
      console.error("yt-dlp error:", err.toString());
    });

    proc.on("close", () => {
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
    console.log("Metadata:", metadata);

    // kalau carousel Instagram → metadata.entries
    const item = metadata.entries ? metadata.entries[0] : metadata;

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
      { error: `Failed to download: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
