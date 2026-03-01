import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve("app/public");

// قواعد ريسايز حسب المجلد
function getMaxWidth(filePath) {
  const p = filePath.replace(/\\/g, "/");

  // Hero / صور كبيرة
  if (p.includes("/public/images/")) return 1600;

  // مشاريع (غالباً عرض كبير بس مو 3K)
  if (p.includes("/public/projects/")) return 1600;

  // Case Study
  if (p.includes("/public/casestudy/")) return 1600;

  // Certificates (عادة نصوص، نخليها أكبر شوي)
  if (p.includes("/public/certificates/")) return 2000;

  // متجر ديكور (صور منتجات)
  if (p.includes("/public/decor/")) return 1200;

  // افتراضي
  return 1600;
}

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

let changed = 0;
let scanned = 0;

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!exts.has(ext)) continue;

    scanned++;

    const maxW = getMaxWidth(fullPath);

    try {
      const img = sharp(fullPath);
      const meta = await img.metadata();

      // إذا ما في width أو ملف غريب تجاهله
      if (!meta.width) continue;

      // ما نكبّر صور صغيرة
      const targetW = Math.min(meta.width, maxW);

      // إعدادات ضغط حسب النوع
      const isPng = ext === ".png";
      const isJpg = ext === ".jpg" || ext === ".jpeg";
      const isWebp = ext === ".webp";
      const isAvif = ext === ".avif";

      let pipeline = sharp(fullPath).rotate().resize({
        width: targetW,
        withoutEnlargement: true,
      });

      // نثبت الفورمات الحالي (بدون تغيير امتداد)
      if (isWebp) pipeline = pipeline.webp({ quality: 78 });
      else if (isAvif) pipeline = pipeline.avif({ quality: 55 });
      else if (isJpg) pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
      else if (isPng) pipeline = pipeline.png({ compressionLevel: 9 });

      const before = fs.statSync(fullPath).size;
      const buf = await pipeline.toBuffer();
      const after = buf.length;

      // إذا صار أكبر (نادر) لا تستبدل
      if (after >= before) continue;

      fs.writeFileSync(fullPath, buf);
      changed++;

      const kb = (before / 1024).toFixed(1);
      const kb2 = (after / 1024).toFixed(1);

      console.log(
        `✅ ${fullPath.replace(process.cwd() + path.sep, "")} | ${meta.width}→${targetW}px | ${kb}KB → ${kb2}KB`
      );
    } catch (e) {
      console.log("⚠️ Failed:", fullPath, e.message);
    }
  }
}

await walk(ROOT);

console.log(`\nDone. Scanned: ${scanned}, Optimized: ${changed}`);