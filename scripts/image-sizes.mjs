import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { imageSize } from "image-size";

const exts = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);
const root = path.resolve("app/public");

const results = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!exts.has(ext)) continue;

    try {
      const buf = fs.readFileSync(fullPath);
      const { width, height, type } = imageSize(buf);
      const sizeKB = (fs.statSync(fullPath).size / 1024).toFixed(1);

      results.push({
        file: fullPath
          .replace(process.cwd() + path.sep, "")
          .replace(/\\/g, "/"),
        type,
        width,
        height,
        sizeKB,
      });
    } catch (err) {
      console.log("❌ Error reading:", fullPath);
    }
  }
}

walk(root);

// ترتيب حسب الحجم (الأكبر أولاً) لتعرف المشكلة فورًا
results.sort((a, b) => Number(b.sizeKB) - Number(a.sizeKB));

const csv =
  "file,type,width,height,sizeKB\n" +
  results
    .map((r) => `${r.file},${r.type},${r.width},${r.height},${r.sizeKB}`)
    .join("\n");

fs.writeFileSync("image-sizes.csv", csv, "utf8");
console.log(`✅ Done! Wrote ${results.length} images to image-sizes.csv`);