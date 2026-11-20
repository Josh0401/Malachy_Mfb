import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = [
  {
    "filename": "photo-1454165804606-c3d57bc86b40.webp",
    "url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1454165804606-c3d57bc86b40"
  },
  {
    "filename": "photo-1460925895917-afdab827c52f.webp",
    "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1460925895917-afdab827c52f"
  },
  {
    "filename": "photo-1497366754035-f200968a6e72.webp",
    "url": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1497366754035-f200968a6e72"
  },
  {
    "filename": "photo-1497366811353-6870744d04b2.webp",
    "url": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?fm=webp&fit=crop&w=1600&q=72",
    "photoId": "photo-1497366811353-6870744d04b2"
  },
  {
    "filename": "photo-1516321318423-f06f85e504b3.webp",
    "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fm=webp&fit=crop&w=1200&q=72",
    "photoId": "photo-1516321318423-f06f85e504b3"
  },
  {
    "filename": "photo-1521737711867-e3b97375f902.webp",
    "url": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?fm=webp&fit=crop&w=1600&q=72",
    "photoId": "photo-1521737711867-e3b97375f902"
  },
  {
    "filename": "photo-1521791136064-7986c2920216.webp",
    "url": "https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=webp&fit=crop&w=1600&q=72",
    "photoId": "photo-1521791136064-7986c2920216"
  },
  {
    "filename": "photo-1525186402429-b4ff38bedec6.webp",
    "url": "https://images.unsplash.com/photo-1525186402429-b4ff38bedec6?fm=webp&fit=crop&w=1200&q=72",
    "photoId": "photo-1525186402429-b4ff38bedec6"
  },
  {
    "filename": "photo-1554224155-6726b3ff858f.webp",
    "url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1554224155-6726b3ff858f"
  },
  {
    "filename": "photo-1556740749-887f6717d7e4.webp",
    "url": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1556740749-887f6717d7e4"
  },
  {
    "filename": "photo-1556742049-0cfed4f6a45d.webp",
    "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?fm=webp&fit=crop&w=1600&q=72",
    "photoId": "photo-1556742049-0cfed4f6a45d"
  },
  {
    "filename": "photo-1556761175-4b46a572b786.webp",
    "url": "https://images.unsplash.com/photo-1556761175-4b46a572b786?fm=webp&fit=crop&w=1200&q=72",
    "photoId": "photo-1556761175-4b46a572b786"
  },
  {
    "filename": "photo-1556761175-b413da4baf72.webp",
    "url": "https://images.unsplash.com/photo-1556761175-b413da4baf72?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1556761175-b413da4baf72"
  },
  {
    "filename": "photo-1563013544-824ae1b704d3.webp",
    "url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1563013544-824ae1b704d3"
  },
  {
    "filename": "photo-1579621970563-ebec7560ff3e.webp",
    "url": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?fm=webp&fit=crop&w=1400&q=72",
    "photoId": "photo-1579621970563-ebec7560ff3e"
  },
  {
    "filename": "photo-1734255026082-82fdc81991f0.webp",
    "url": "https://images.unsplash.com/photo-1734255026082-82fdc81991f0?fit=crop&fm=webp&w=1800&q=72",
    "photoId": "photo-1734255026082-82fdc81991f0"
  }
];
const outputDir = path.resolve("public/images");
await mkdir(outputDir, { recursive: true });
let failed = [];
for (const asset of assets) {
  const destination = path.join(outputDir, asset.filename);
  try {
    try { const info = await stat(destination); if (info.size > 1024) { console.log(`Already present: ${asset.filename}`); continue; } } catch {}
    console.log(`Downloading ${asset.filename}...`);
    const response = await fetch(asset.url, { headers: { "User-Agent": "MalachyMFB-Website-Asset-Setup/1.0" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type = response.headers.get("content-type") || "";
    if (!type.startsWith("image/")) throw new Error(`Unexpected content type: ${type}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1024) throw new Error("Downloaded file is unexpectedly small");
    const webp = await sharp(bytes).rotate().webp({ quality: 74, effort: 5 }).toBuffer();
    await writeFile(destination, webp);
    console.log(`Saved ${asset.filename} (${Math.round(webp.length / 1024)} KB WebP)`);
  } catch (error) {
    failed.push({ file: asset.filename, error: String(error) });
    console.error(`FAILED ${asset.filename}: ${error}`);
  }
}
if (failed.length) {
  console.error(`\n${failed.length} image(s) could not be downloaded. Check your internet connection and rerun: npm run images:download`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${assets.length} image assets are now stored locally in public/images/.`);
}
