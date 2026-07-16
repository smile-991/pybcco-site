import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const DIST_INDEX = path.join(DIST_DIR, "index.html");
const VIDEOS_FILE = path.join(ROOT, "src", "data", "videos.json");

const SITE_URL = "https://pybcco.com";
const COMPANY_NAME = "PYBCCO – شركة بنيان الهرم للمقاولات";
const LOGO_URL = `${SITE_URL}/logo.webp`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

if (!fs.existsSync(DIST_INDEX)) {
  fail("dist/index.html is missing. Run vite build before prerender-videos.mjs");
}

if (!fs.existsSync(VIDEOS_FILE)) {
  fail("src/data/videos.json is missing");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function absoluteUrl(value) {
  if (typeof value !== "string" || !value) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function replaceOrInsertMeta(html, attribute, key, replacement) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\s+${attribute}=["']${escapedKey}["'][^>]*>`,
    "i",
  );

  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `  ${replacement}\n  </head>`);
}

function replaceOrInsertCanonical(html, href) {
  const replacement = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;

  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `  ${replacement}\n  </head>`);
}

function removeHomepageOnlyPreload(html) {
  return html.replace(
    /\s*<!-- Preload homepage LCP image -->[\s\S]*?fetchpriority=["']high["'][\s\S]*?\/>/i,
    "",
  );
}

function insertBeforeHeadClose(html, markup) {
  return html.replace("</head>", `${markup}\n  </head>`);
}

function buildFallbackContent(video, pageUrl) {
  const cover = absoluteUrl(video.cover);
  const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.youtubeId)}`;

  return `<main dir="rtl" style="padding:24px;font-family:'Cairo',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;background:#07080b;color:#fff;min-height:100vh"><article style="max-width:760px;margin:0 auto"><p style="margin:0 0 18px"><a href="/videos" style="color:#d4af37;text-decoration:none">مكتبة الفيديوهات</a></p><img src="${escapeHtml(cover)}" alt="${escapeHtml(video.title)}" width="720" height="1280" fetchpriority="high" style="display:block;width:min(100%,430px);height:auto;margin:0 auto 24px;border-radius:24px" /><h1 style="margin:0 0 16px;font-size:32px;line-height:1.45">${escapeHtml(video.title)}</h1><p style="margin:0;color:#d7d7d7;line-height:1.9">${escapeHtml(video.description)}</p><p style="margin:24px 0 0"><a href="${escapeHtml(youtubeUrl)}" style="display:inline-block;padding:12px 18px;border-radius:14px;background:#d4af37;color:#000;font-weight:700;text-decoration:none">مشاهدة الفيديو</a> <a href="${escapeHtml(video.relatedPage)}" style="display:inline-block;margin-right:8px;padding:12px 18px;border-radius:14px;border:1px solid #555;color:#fff;font-weight:700;text-decoration:none">${escapeHtml(video.relatedLabel)}</a></p><link itemprop="url" href="${escapeHtml(pageUrl)}" /></article></main>`;
}

function buildSchemas(video, pageUrl) {
  const cover = absoluteUrl(video.cover);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}`;
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.youtubeId)}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    telephone: "+966550604837",
    email: "info@pybcco.com",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "PYBCCO",
    inLanguage: "ar",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: video.title,
    description: video.description,
    inLanguage: "ar",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: cover,
    },
    mainEntity: {
      "@id": `${pageUrl}#video`,
    },
  };

  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [cover],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl,
    url: pageUrl,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: Array.isArray(video.keywords) ? video.keywords.join(", ") : "",
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "WatchAction",
      target: watchUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مكتبة الفيديو",
        item: `${SITE_URL}/videos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.shortTitle || video.title,
        item: pageUrl,
      },
    ],
  };

  return [organization, website, webPage, videoObject, breadcrumb];
}

function customizeHtml(template, video) {
  const routePath = `/videos/${video.slug}`;
  const pageUrl = `${SITE_URL}${routePath}`;
  const pageTitle = `${video.title} | فيديو مشاريع PYBCCO`;
  const pageDescription = `${video.description} شاهد الفيديو وتعرّف على الخدمة المرتبطة من شركة بنيان الهرم للمقاولات في الرياض.`;
  const cover = absoluteUrl(video.cover);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}`;

  const title = escapeHtml(pageTitle);
  const description = escapeHtml(pageDescription);
  const image = escapeHtml(cover);
  const imageAlt = escapeHtml(video.title);
  const canonical = escapeHtml(pageUrl);
  const robots = "index,follow,max-image-preview:large,max-video-preview:-1";

  let html = removeHomepageOnlyPreload(template);

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsertMeta(
    html,
    "name",
    "description",
    `<meta name="description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "robots",
    `<meta name="robots" content="${robots}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "googlebot",
    `<meta name="googlebot" content="${robots}" />`,
  );
  html = replaceOrInsertCanonical(html, pageUrl);

  html = replaceOrInsertMeta(
    html,
    "property",
    "og:title",
    `<meta property="og:title" content="${title}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:description",
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:url",
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:type",
    `<meta property="og:type" content="video.other" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:image",
    `<meta property="og:image" content="${image}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:image:alt",
    `<meta property="og:image:alt" content="${imageAlt}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:video",
    `<meta property="og:video" content="${escapeHtml(embedUrl)}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:video:secure_url",
    `<meta property="og:video:secure_url" content="${escapeHtml(embedUrl)}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "property",
    "og:video:type",
    `<meta property="og:video:type" content="text/html" />`,
  );

  html = replaceOrInsertMeta(
    html,
    "name",
    "twitter:card",
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "twitter:title",
    `<meta name="twitter:title" content="${title}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "twitter:description",
    `<meta name="twitter:description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "twitter:image",
    `<meta name="twitter:image" content="${image}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    "name",
    "twitter:image:alt",
    `<meta name="twitter:image:alt" content="${imageAlt}" />`,
  );

  html = insertBeforeHeadClose(
    html,
    `  <link rel="preload" as="image" href="${image}" fetchpriority="high" />`,
  );

  const schemas = buildSchemas(video, pageUrl)
    .map(
      (schema, index) =>
        `  <script id="seo-jsonld-prerender-${index}" type="application/ld+json">${jsonForHtml(schema)}</script>`,
    )
    .join("\n");

  html = insertBeforeHeadClose(html, schemas);

  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script type="module"/i,
    `<div id="root">${buildFallbackContent(video, pageUrl)}</div>\n\n    <script type="module"`,
  );

  return html;
}

let videos;
try {
  videos = JSON.parse(fs.readFileSync(VIDEOS_FILE, "utf8"));
} catch (error) {
  fail(`Unable to parse videos.json: ${error instanceof Error ? error.message : String(error)}`);
}

if (!Array.isArray(videos) || videos.length === 0) {
  fail("videos.json must contain at least one video");
}

const requiredFields = [
  "slug",
  "youtubeId",
  "title",
  "shortTitle",
  "description",
  "cover",
  "uploadDate",
  "duration",
  "relatedPage",
  "relatedLabel",
];

const seenSlugs = new Set();
for (const [index, video] of videos.entries()) {
  if (!video || typeof video !== "object") {
    fail(`Video at index ${index} is not an object`);
  }

  for (const field of requiredFields) {
    if (typeof video[field] !== "string" || !video[field].trim()) {
      fail(`Video at index ${index} has an invalid ${field}`);
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(video.slug)) {
    fail(`Invalid video slug: ${video.slug}`);
  }

  if (seenSlugs.has(video.slug)) {
    fail(`Duplicate video slug: ${video.slug}`);
  }
  seenSlugs.add(video.slug);

  if (Number.isNaN(Date.parse(video.uploadDate))) {
    fail(`Invalid uploadDate for ${video.slug}: ${video.uploadDate}`);
  }

  if (!/^PT(?:(?:\d+)H)?(?:(?:\d+)M)?(?:(?:\d+)S)?$/.test(video.duration)) {
    fail(`Invalid ISO 8601 duration for ${video.slug}: ${video.duration}`);
  }
}

const template = fs.readFileSync(DIST_INDEX, "utf8");

for (const video of videos) {
  const outputPath = path.join(DIST_DIR, "videos", video.slug, "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, customizeHtml(template, video), "utf8");
}

console.log(`✅ Pre-rendered ${videos.length} standalone video pages`);
