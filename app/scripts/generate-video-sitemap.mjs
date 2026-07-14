import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://pybcco.com";
const PAGE_URL = `${SITE_URL}/videos`;

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..");
const videosFile = path.join(projectRoot, "src", "data", "videos.json");
const outputFile = path.join(projectRoot, "public", "video-sitemap.xml");

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function durationToSeconds(isoDuration) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(isoDuration);

  if (!match) {
    throw new Error(`صيغة مدة الفيديو غير صحيحة: ${isoDuration}`);
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const total = hours * 3600 + minutes * 60 + seconds;

  if (total < 1 || total > 28800) {
    throw new Error(`مدة الفيديو خارج النطاق المدعوم: ${isoDuration}`);
  }

  return total;
}

function validateVideo(video, index) {
  const requiredStringFields = [
    "youtubeId",
    "title",
    "description",
    "cover",
    "uploadDate",
    "duration",
  ];

  for (const field of requiredStringFields) {
    if (typeof video[field] !== "string" || video[field].trim() === "") {
      throw new Error(`الفيديو رقم ${index + 1}: الحقل ${field} ناقص أو غير صحيح.`);
    }
  }

  if (!Array.isArray(video.keywords)) {
    throw new Error(`الفيديو رقم ${index + 1}: حقل keywords غير صحيح.`);
  }
}

const raw = await readFile(videosFile, "utf8");
const videos = JSON.parse(raw);

if (!Array.isArray(videos) || videos.length === 0) {
  throw new Error("ملف videos.json فارغ أو غير صحيح.");
}

videos.forEach(validateVideo);

const videoEntries = videos
  .map((video) => {
    const thumbnailUrl = video.cover.startsWith("http")
      ? video.cover
      : `${SITE_URL}${video.cover}`;

    const tags = video.keywords
      .slice(0, 32)
      .map((keyword) => `      <video:tag>${escapeXml(keyword)}</video:tag>`)
      .join("\n");

    return `    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc>${escapeXml(
        `https://www.youtube.com/embed/${video.youtubeId}`,
      )}</video:player_loc>
      <video:duration>${durationToSeconds(video.duration)}</video:duration>
      <video:publication_date>${escapeXml(video.uploadDate)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
${tags}
    </video:video>`;
  })
  .join("\n\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${PAGE_URL}</loc>
${videoEntries}
  </url>
</urlset>
`;

await writeFile(outputFile, xml, "utf8");
console.log(`✓ Generated video sitemap with ${videos.length} videos: ${outputFile}`);
