import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const APP_FILE = path.join(ROOT, "src", "App.tsx");
const DIST_INDEX = path.join(DIST_DIR, "index.html");
const SITE_URL = "https://pybcco.com";

const DEFAULT_TITLE = "بنيان الهرم للمقاولات | PYBCCO";
const DEFAULT_DESCRIPTION =
  "شركة بنيان الهرم للمقاولات بالرياض: بناء عظم وتشطيب وترميم وتسليم مفتاح بإشراف هندسي.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;

const FORCE_NOINDEX_PATHS = new Set([
  "/account",
  "/portal",
  "/create-account",
  "/activate-account",
  "/request-project",
  "/admin",
]);

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

if (!fs.existsSync(DIST_INDEX)) fail("dist/index.html is missing");
if (!fs.existsSync(APP_FILE)) fail("src/App.tsx is missing");

function scriptKind(filePath) {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (filePath.endsWith(".ts")) return ts.ScriptKind.TS;
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}

function parseSource(filePath) {
  return ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    scriptKind(filePath),
  );
}

function unwrap(node) {
  let current = node;
  while (
    current &&
    (ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isNonNullExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function readLiteral(node, constants, seen = new Set()) {
  if (!node) return undefined;
  const value = unwrap(node);

  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text;
  }

  if (ts.isNumericLiteral(value)) return value.text;

  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (value.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isIdentifier(value)) {
    if (seen.has(value.text)) return undefined;
    seen.add(value.text);
    return readLiteral(constants.get(value.text), constants, seen);
  }

  if (
    ts.isBinaryExpression(value) &&
    value.operatorToken.kind === ts.SyntaxKind.PlusToken
  ) {
    const left = readLiteral(value.left, constants, new Set(seen));
    const right = readLiteral(value.right, constants, new Set(seen));
    if (left === undefined || right === undefined) return undefined;
    return `${left}${right}`;
  }

  if (ts.isTemplateExpression(value)) {
    let output = value.head.text;
    for (const span of value.templateSpans) {
      const expression = readLiteral(span.expression, constants, new Set(seen));
      if (expression === undefined) return undefined;
      output += `${expression}${span.literal.text}`;
    }
    return output;
  }

  if (ts.isConditionalExpression(value)) {
    const whenTrue = readLiteral(value.whenTrue, constants, new Set(seen));
    const whenFalse = readLiteral(value.whenFalse, constants, new Set(seen));
    return whenTrue === whenFalse ? whenTrue : undefined;
  }

  return undefined;
}

function collectConstants(sourceFile) {
  const constants = new Map();

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      // Prefer the last declaration in the component file; this lets local SEO
      // variables override generic module-level constants with the same name.
      constants.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return constants;
}

function resolveModulePath(specifier, fromFile) {
  let candidate;
  if (specifier.startsWith("@/")) {
    candidate = path.join(ROOT, "src", specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    candidate = path.resolve(path.dirname(fromFile), specifier);
  } else {
    return undefined;
  }

  const possibilities = [
    candidate,
    `${candidate}.tsx`,
    `${candidate}.ts`,
    `${candidate}.jsx`,
    `${candidate}.js`,
    path.join(candidate, "index.tsx"),
    path.join(candidate, "index.ts"),
    path.join(candidate, "index.jsx"),
    path.join(candidate, "index.js"),
  ];

  return possibilities.find((filePath) => {
    try {
      return fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  });
}

function findImportSpecifier(node) {
  let found;
  function visit(current) {
    if (found) return;
    if (
      ts.isCallExpression(current) &&
      current.expression.kind === ts.SyntaxKind.ImportKeyword &&
      current.arguments.length === 1 &&
      ts.isStringLiteral(current.arguments[0])
    ) {
      found = current.arguments[0].text;
      return;
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  return found;
}

function getJsxTagName(tagName) {
  if (ts.isIdentifier(tagName)) return tagName.text;
  if (ts.isPropertyAccessExpression(tagName)) return tagName.name.text;
  return tagName.getText();
}

function getAttribute(opening, name) {
  const attribute = opening.attributes.properties.find(
    (prop) => ts.isJsxAttribute(prop) && prop.name.text === name,
  );
  if (!attribute || !ts.isJsxAttribute(attribute)) return undefined;
  if (!attribute.initializer) return true;
  if (ts.isStringLiteral(attribute.initializer)) return attribute.initializer.text;
  if (ts.isJsxExpression(attribute.initializer)) return attribute.initializer.expression;
  return undefined;
}

function collectRoutesAndComponents() {
  const source = parseSource(APP_FILE);
  const imports = new Map();
  const lazyImports = new Map();

  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      if (clause?.name) {
        const resolved = resolveModulePath(statement.moduleSpecifier.text, APP_FILE);
        if (resolved) imports.set(clause.name.text, resolved);
      }
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
        const specifier = findImportSpecifier(declaration.initializer);
        if (!specifier) continue;
        const resolved = resolveModulePath(specifier, APP_FILE);
        if (resolved) lazyImports.set(declaration.name.text, resolved);
      }
    }
  }

  const routes = [];
  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && getJsxTagName(node.tagName) === "Route") {
      const pathValue = getAttribute(node, "path");
      const elementValue = getAttribute(node, "element");
      if (typeof pathValue !== "string" || !elementValue || elementValue === true) {
        ts.forEachChild(node, visit);
        return;
      }

      let component;
      const expression = unwrap(elementValue);
      if (ts.isJsxElement(expression)) {
        component = getJsxTagName(expression.openingElement.tagName);
      } else if (ts.isJsxSelfClosingElement(expression)) {
        component = getJsxTagName(expression.tagName);
      }

      routes.push({
        routePath: pathValue,
        component,
        sourceFile: imports.get(component) || lazyImports.get(component),
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  return routes;
}

function findFirstSeoHead(sourceFile) {
  let found;
  function visit(node) {
    if (found) return;
    if (ts.isJsxSelfClosingElement(node) && getJsxTagName(node.tagName) === "SeoHead") {
      found = node;
      return;
    }
    if (ts.isJsxElement(node) && getJsxTagName(node.openingElement.tagName) === "SeoHead") {
      found = node.openingElement;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

function readSeoMetadata(sourceFilePath, routePath) {
  const fallbackCanonical = `${SITE_URL}${routePath === "/" ? "" : routePath}`;
  const fallback = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical: fallbackCanonical,
    robots: FORCE_NOINDEX_PATHS.has(routePath)
      ? "noindex,follow"
      : "index,follow,max-image-preview:large",
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "بنيان الهرم للمقاولات - PYBCCO",
    twitterCard: "summary_large_image",
  };

  if (!sourceFilePath) return fallback;

  const source = parseSource(sourceFilePath);
  const constants = collectConstants(source);
  const seo = findFirstSeoHead(source);
  if (!seo) return fallback;

  const read = (name) => {
    const attribute = getAttribute(seo, name);
    if (typeof attribute === "string" || typeof attribute === "boolean") {
      return attribute;
    }
    return readLiteral(attribute, constants);
  };

  return {
    title: read("title") || fallback.title,
    description: read("description") || fallback.description,
    canonical: read("canonical") || fallback.canonical,
    robots:
      (FORCE_NOINDEX_PATHS.has(routePath) ? "noindex,follow" : read("robots")) ||
      fallback.robots,
    ogType: read("ogType") || fallback.ogType,
    ogImage: read("ogImage") || fallback.ogImage,
    ogImageAlt: read("ogImageAlt") || fallback.ogImageAlt,
    twitterCard: read("twitterCard") || fallback.twitterCard,
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeCanonical(value, routePath) {
  try {
    const url = new URL(value || `${SITE_URL}${routePath}`);
    url.protocol = "https:";
    url.hostname = "pybcco.com";
    url.search = "";
    url.hash = "";
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }
    return url.toString();
  } catch {
    return `${SITE_URL}${routePath === "/" ? "" : routePath}`;
  }
}

function replaceOrInsertMeta(html, selector, replacement) {
  const [kind, key] = selector;
  const pattern = new RegExp(
    `<meta\\s+${kind}=["']${key.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}["'][^>]*>`,
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

function removeHomepageOnlyPreload(html, routePath) {
  if (routePath === "/") return html;
  return html.replace(
    /\s*<!-- Preload homepage LCP image -->[\s\S]*?fetchpriority=["']high["'][\s\S]*?\/>/i,
    "",
  );
}

function buildFallbackContent(metadata) {
  return `<main dir="rtl" style="padding:24px;font-family:'Cairo',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif"><h1 style="margin:0 0 12px;font-size:28px;line-height:1.45">${escapeHtml(metadata.title)}</h1><p style="margin:0;max-width:760px;color:#444;line-height:1.9">${escapeHtml(metadata.description)}</p></main>`;
}

function customizeHtml(template, routePath, metadata) {
  const canonical = normalizeCanonical(metadata.canonical, routePath);
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const robots = escapeHtml(metadata.robots);
  const ogImage = escapeHtml(metadata.ogImage || DEFAULT_OG_IMAGE);
  const ogImageAlt = escapeHtml(metadata.ogImageAlt || "بنيان الهرم للمقاولات - PYBCCO");
  const ogType = escapeHtml(metadata.ogType || "website");
  const twitterCard = escapeHtml(metadata.twitterCard || "summary_large_image");

  let html = template;
  html = removeHomepageOnlyPreload(html, routePath);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsertMeta(
    html,
    ["name", "description"],
    `<meta name="description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "robots"],
    `<meta name="robots" content="${robots}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "googlebot"],
    `<meta name="googlebot" content="${robots}" />`,
  );
  html = replaceOrInsertCanonical(html, canonical);

  html = replaceOrInsertMeta(
    html,
    ["property", "og:title"],
    `<meta property="og:title" content="${title}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["property", "og:description"],
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["property", "og:url"],
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["property", "og:type"],
    `<meta property="og:type" content="${ogType}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["property", "og:image"],
    `<meta property="og:image" content="${ogImage}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["property", "og:image:alt"],
    `<meta property="og:image:alt" content="${ogImageAlt}" />`,
  );

  html = replaceOrInsertMeta(
    html,
    ["name", "twitter:card"],
    `<meta name="twitter:card" content="${twitterCard}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "twitter:title"],
    `<meta name="twitter:title" content="${title}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "twitter:description"],
    `<meta name="twitter:description" content="${description}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "twitter:image"],
    `<meta name="twitter:image" content="${ogImage}" />`,
  );
  html = replaceOrInsertMeta(
    html,
    ["name", "twitter:image:alt"],
    `<meta name="twitter:image:alt" content="${ogImageAlt}" />`,
  );

  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script type="module"/i,
    `<div id="root">${buildFallbackContent(metadata)}</div>\n\n    <script type="module"`,
  );

  return html;
}

function routeOutputPath(routePath) {
  if (routePath === "/") return DIST_INDEX;
  return path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

function writeHtml(filePath, html) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf8");
}

const routes = collectRoutesAndComponents();
const staticRoutes = routes.filter(
  ({ routePath }) => routePath !== "*" && !routePath.includes(":"),
);
const template = fs.readFileSync(DIST_INDEX, "utf8");

let generatedCount = 0;
for (const route of staticRoutes) {
  const metadata = readSeoMetadata(route.sourceFile, route.routePath);
  const html = customizeHtml(template, route.routePath, metadata);
  writeHtml(routeOutputPath(route.routePath), html);
  generatedCount += 1;
}

// Dynamic project details route: one reusable noindex shell.
const dynamicPortalMetadata = {
  title: "تفاصيل المشروع | بوابة عملاء PYBCCO",
  description: "صفحة خاصة لعرض تفاصيل مشروع العميل داخل بوابة PYBCCO.",
  canonical: `${SITE_URL}/portal`,
  robots: "noindex,follow",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: "بوابة عملاء PYBCCO",
  twitterCard: "summary_large_image",
};
writeHtml(
  path.join(DIST_DIR, "portal-project-details.html"),
  customizeHtml(template, "/portal/projects", dynamicPortalMetadata),
);

// A real top-level 404 disables Cloudflare Pages' implicit SPA fallback.
const notFoundMetadata = {
  title: "الصفحة غير موجودة | بنيان الهرم للمقاولات",
  description: "الرابط المطلوب غير موجود. يمكنك العودة إلى الصفحة الرئيسية أو تصفح خدمات ومشاريع بنيان الهرم للمقاولات.",
  canonical: `${SITE_URL}/404`,
  robots: "noindex,follow",
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: "بنيان الهرم للمقاولات - PYBCCO",
  twitterCard: "summary_large_image",
};
writeHtml(
  path.join(DIST_DIR, "404.html"),
  customizeHtml(template, "/404", notFoundMetadata),
);

console.log(
  `✅ Generated ${generatedCount} static route shells + dynamic portal shell + 404.html`,
);
