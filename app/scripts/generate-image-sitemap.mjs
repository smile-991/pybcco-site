import fs from "fs";
import path from "path";

const SITE_URL = "https://pybcco.com";
const OUTPUT = path.resolve("public/image-sitemap.xml");

const gallery = {
  concrete: {
    page: `${SITE_URL}/projects`,
    items: Array.from({ length: 15 }, (_, i) => ({
      src: `/projects/concrete/concrete-${i + 1}.webp`,
      title: `مشروع عظم فيلا سكنية في الرياض — صورة ${i + 1}`,
    })),
  },
  finishing: {
    page: `${SITE_URL}/projects`,
    items: Array.from({ length: 22 }, (_, i) => ({
      src: `/projects/finishing/finishing-${String(i + 1).padStart(2, "0")}.webp`,
      title: `مشروع تشطيب فيلا سكنية في الرياض — صورة ${i + 1}`,
    })),
  },
  entertainment: {
    page: `${SITE_URL}/projects`,
    items: Array.from({ length: 19 }, (_, i) => ({
      src: `/projects/entertainment/entertainment-${String(i + 1).padStart(2, "0")}.webp`,
      title: `مشروع ترفيهي (تنفيذ وتجهيز) في الرياض — صورة ${i + 1}`,
    })),
  },
};

const allImages = Object.values(gallery).flatMap((cat) =>
  cat.items.map((item) => ({
    page: cat.page,
    loc: `${SITE_URL}${item.src}`,
    title: escapeXml(item.title),
  }))
);

const groupedByPage = allImages.reduce((acc, item) => {
  if (!acc[item.page]) acc[item.page] = [];
  acc[item.page].push(item);
  return acc;
}, {});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${Object.entries(groupedByPage)
  .map(([page, images]) => {
    const imageTags = images
      .map(
        (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`
      )
      .join("\n");

    return `  <url>
    <loc>${page}</loc>
${imageTags}
  </url>`;
  })
  .join("\n")}
</urlset>`;

fs.writeFileSync(OUTPUT, xml, "utf8");
console.log(`✅ image-sitemap.xml generated at ${OUTPUT}`);

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}