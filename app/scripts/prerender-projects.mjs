import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const sourceIndex = path.join(distDir, "index.html");
const projectsDir = path.join(distDir, "projects");
const projectsIndex = path.join(projectsDir, "index.html");

const PROJECTS_TITLE = "معرض مشاريع بنيان الهرم | تشطيب وعظم وترفيه بالرياض";
const PROJECTS_DESCRIPTION =
  "شاهد معرض مشاريع بنيان الهرم للمقاولات بالرياض: تشطيب فلل وشقق، بناء عظم، وأعمال ترفيه من مشاريع منفذة فعليًا.";
const PROJECTS_URL = "https://pybcco.com/projects";
const PROJECTS_OG_IMAGE = "https://pybcco.com/og.jpg";

if (!fs.existsSync(sourceIndex)) {
  console.error("dist/index.html not found");
  process.exit(1);
}

let html = fs.readFileSync(sourceIndex, "utf-8");

// قراءة بيانات المعرض
const galleryPath = path.join(process.cwd(), "src/data/gallery.json");
const gallery = JSON.parse(fs.readFileSync(galleryPath, "utf-8"));

function buildCategoryImages(category) {
  if (!category?.items?.length) return "";

  const imagesHtml = category.items
    .map((item) => {
      return `<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" class="w-full h-44 md:h-52 lg:h-56 object-cover rounded-2xl border border-gray-100 shadow-sm" />`;
    })
    .join("\n");

  return `
    <div class="mt-10">
      <div class="text-center text-sm text-gray-600 mb-4">${category.title}</div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${imagesHtml}
      </div>
    </div>
  `;
}

const categoriesHtml = Object.values(gallery)
  .map(buildCategoryImages)
  .join("\n");

const staticProjectsHtml = `
<main dir="rtl" class="bg-white">
  <section class="pt-28 pb-10">
    <div class="container-custom px-4">
      <div class="text-center">
        <span class="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
          معرض الأعمال
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
          عظم / تشطيب / <span class="text-gold">ترفيه</span>
        </h1>

        <p class="mt-3 text-gray-600 max-w-2xl mx-auto">
          اختر القسم وشاهد نماذج حقيقية من أعمال بنيان الهرم.
        </p>
      </div>

      ${categoriesHtml}
    </div>
  </section>
</main>
`;

// استبدال محتوى الصفحة
html = html.replace(
  /<div id="root">[\s\S]*?<\/div>/,
  `<div id="root">${staticProjectsHtml}</div>`
);

// تخصيص SEO Head لصفحة /projects داخل النسخة المولّدة
html = html
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${PROJECTS_TITLE}</title>`)
  .replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${PROJECTS_DESCRIPTION}" />`
  )
  .replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${PROJECTS_URL}" />`
  )
  .replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${PROJECTS_TITLE}" />`
  )
  .replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${PROJECTS_DESCRIPTION}" />`
  )
  .replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${PROJECTS_URL}" />`
  )
  .replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${PROJECTS_OG_IMAGE}" />`
  )
  .replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${PROJECTS_TITLE}" />`
  )
  .replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${PROJECTS_DESCRIPTION}" />`
  )
  .replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${PROJECTS_OG_IMAGE}" />`
  );

fs.mkdirSync(projectsDir, { recursive: true });
fs.writeFileSync(projectsIndex, html, "utf-8");

console.log("✅ Pre-rendered /projects from gallery.json with correct SEO head");