import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const APP_FILE = path.join(ROOT, "src", "App.tsx");
const SITE_URL = "https://pybcco.com";

const errors = [];
const warnings = [];

function error(message) {
  errors.push(message);
}

function warning(message) {
  warnings.push(message);
}

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath, predicate));
    else if (predicate(fullPath)) files.push(fullPath);
  }
  return files;
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractAppRoutes() {
  const source = read(APP_FILE);
  return [...source.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
}

function routeFile(routePath) {
  if (routePath === "/") return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

function extractAssets(html) {
  const results = new Set();
  for (const match of html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)) {
    results.add(match[1]);
  }
  return [...results];
}

if (!fs.existsSync(DIST_DIR)) error("dist directory does not exist");
if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) error("dist/index.html is missing");
if (!fs.existsSync(path.join(DIST_DIR, "404.html"))) error("dist/404.html is missing");
if (!fs.existsSync(path.join(DIST_DIR, "portal-project-details.html"))) {
  error("dist/portal-project-details.html is missing");
}

const redirectsPath = path.join(DIST_DIR, "_redirects");
if (!fs.existsSync(redirectsPath)) {
  error("dist/_redirects is missing");
} else {
  const redirects = read(redirectsPath);
  if (/^\/\*\s+\/index\.html\s+200\s*$/m.test(redirects)) {
    error("Catch-all SPA rewrite is still present: /* /index.html 200");
  }
}

const staticRoutes = extractAppRoutes().filter(
  (routePath) => routePath !== "*" && !routePath.includes(":"),
);
for (const routePath of staticRoutes) {
  const filePath = routeFile(routePath);
  if (!fs.existsSync(filePath)) {
    error(`Missing static route shell for ${routePath}: ${path.relative(ROOT, filePath)}`);
    continue;
  }

  const html = read(filePath);
  const expectedCanonical = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    error(`No canonical in ${routePath}`);
  } else {
    const actual = canonicalMatch[1].replace(/\/$/, routePath === "/" ? "/" : "");
    const expected = expectedCanonical.replace(/\/$/, routePath === "/" ? "/" : "");
    if (actual !== expected) {
      error(`Canonical mismatch for ${routePath}: ${canonicalMatch[1]}`);
    }
  }
}

const htmlFiles = walk(DIST_DIR, (filePath) => filePath.endsWith(".html"));
for (const htmlFile of htmlFiles) {
  const html = read(htmlFile);
  for (const assetUrl of extractAssets(html)) {
    const cleanUrl = assetUrl.split("?")[0].split("#")[0];
    const assetPath = path.join(DIST_DIR, cleanUrl.replace(/^\//, ""));
    if (!fs.existsSync(assetPath)) {
      error(`${path.relative(DIST_DIR, htmlFile)} references missing asset ${cleanUrl}`);
      continue;
    }

    const firstBytes = fs.readFileSync(assetPath).subarray(0, 100).toString("utf8").trimStart();
    if (/^<!doctype html>|^<html/i.test(firstBytes)) {
      error(`${cleanUrl} contains HTML instead of an asset`);
    }
  }
}

const timelineSourceFiles = [
  path.join(
    ROOT,
    "src",
    "engineering-insights",
    "construction-and-finishing-stages",
    "HowLongDoesItTakeToBuildVillaRiyadh.tsx",
  ),
  path.join(ROOT, "scripts", "generate-image-sitemap.mjs"),
];
const timelineFeatureEnabled = timelineSourceFiles.some(
  (filePath) => fs.existsSync(filePath) && read(filePath).includes("villa-stage-01.webp"),
);

if (timelineFeatureEnabled) {
  const timelineImages = Array.from({ length: 6 }, (_, index) =>
    path.join(
      DIST_DIR,
      "images",
      "timeline",
      `villa-stage-${String(index + 1).padStart(2, "0")}.webp`,
    ),
  );
  for (const imagePath of timelineImages) {
    if (!fs.existsSync(imagePath)) {
      error(`Missing timeline image: ${path.relative(ROOT, imagePath)}`);
    }
  }

  const imageSitemapPath = path.join(DIST_DIR, "image-sitemap.xml");
  if (!fs.existsSync(imageSitemapPath)) {
    error("dist/image-sitemap.xml is missing");
  } else {
    const imageSitemap = read(imageSitemapPath);
    for (let index = 1; index <= 6; index += 1) {
      const fileName = `villa-stage-${String(index).padStart(2, "0")}.webp`;
      if (!imageSitemap.includes(fileName)) {
        error(`Image sitemap is missing ${fileName}`);
      }
    }
  }
}

const rssPath = path.join(DIST_DIR, "rss.xml");
if (!fs.existsSync(rssPath)) {
  error("dist/rss.xml is missing");
} else {
  const sourceRssPath = path.join(ROOT, "public", "rss.xml");
  if (fs.existsSync(sourceRssPath)) {
    const sourceRss = read(sourceRssPath);
    const builtRss = read(rssPath);
    if (sourceRss !== builtRss) {
      error("dist/rss.xml does not match public/rss.xml");
    }
  }
}

if (warnings.length) {
  for (const message of warnings) console.warn(`⚠️ ${message}`);
}

if (errors.length) {
  for (const message of errors) console.error(`❌ ${message}`);
  console.error(`\nBuild verification failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(
  `✅ Build verified: ${htmlFiles.length} HTML files, ${staticRoutes.length} static routes, all referenced assets exist`,
);
