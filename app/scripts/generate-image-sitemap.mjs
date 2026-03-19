import fs from "fs";
import path from "path";

const SITE_URL = "https://pybcco.com";

// ✅ الصحيح: داخل public مباشرة
const OUTPUT = path.join(process.cwd(), "public", "image-sitemap.xml");

// ✅ قراءة البيانات من المصدر الموحد
const galleryPath = path.join(process.cwd(), "src", "data", "gallery.json");
const gallery = JSON.parse(fs.readFileSync(galleryPath, "utf-8"));

// 🧠 توزيع الصفحات
const PAGE_MAP = {
  finishing: `${SITE_URL}/villa-finishing-riyadh`,
  concrete: `${SITE_URL}/construction-company-riyadh`,
  entertainment: `${SITE_URL}/projects`,
};

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildImageTags(items = []) {
  return items
    .map((item) => {
      const title = escapeXml(item.alt);

      return `    <image:image>
      <image:loc>${SITE_URL}${item.src}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${title}</image:caption>
    </image:image>`;
    })
    .join("\n");
}

function buildUrlBlock(pageUrl, items = []) {
  return `  <url>
    <loc>${pageUrl}</loc>
${buildImageTags(items)}
  </url>`;
}

const urls = Object.entries(gallery)
  .map(([key, category]) => {
    const pageUrl = PAGE_MAP[key] || `${SITE_URL}/projects`;
    return buildUrlBlock(pageUrl, category.items || []);
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

// ✅ تأكد أن المجلد موجود
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

// ✅ حفظ الملف
fs.writeFileSync(OUTPUT, xml.trim(), "utf-8");

console.log("✅ image-sitemap.xml generated from gallery.json");