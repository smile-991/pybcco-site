import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const sourceIndex = path.join(distDir, "index.html");
const projectsDir = path.join(distDir, "projects");
const projectsIndex = path.join(projectsDir, "index.html");

if (!fs.existsSync(sourceIndex)) {
  console.error("dist/index.html not found");
  process.exit(1);
}

const html = fs.readFileSync(sourceIndex, "utf-8");

const publicProjectsDir = path.resolve("public", "projects");

const CATEGORIES = [
  { key: "finishing", label: "مشاريع التشطيب" },
  { key: "concrete", label: "مشاريع العظم" },
  { key: "entertainment", label: "مشاريع الترفيه" },
];

function isImageFile(fileName) {
  return /\.(webp|jpg|jpeg|png)$/i.test(fileName);
}

function buildAlt(categoryLabel, fileName) {
  const cleanName = fileName
    .replace(/\.(webp|jpg|jpeg|png)$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return cleanName
    ? `${categoryLabel} - ${cleanName} - بنيان الهرم للمقاولات`
    : `${categoryLabel} في الرياض - بنيان الهرم للمقاولات`;
}

function buildCategoryImages(category) {
  const dir = path.join(publicProjectsDir, category.key);

  if (!fs.existsSync(dir)) return "";

  const files = fs
    .readdirSync(dir)
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (!files.length) return "";

  const imagesHtml = files
    .map((fileName) => {
      const src = `/projects/${category.key}/${fileName}`;
      const alt = buildAlt(category.label, fileName);

      return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" class="w-full h-44 md:h-52 lg:h-56 object-cover rounded-2xl border border-gray-100 shadow-sm" />`;
    })
    .join("\n");

  return `
    <div class="mt-10">
      <div class="text-center text-sm text-gray-600 mb-4">${category.label}</div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${imagesHtml}
      </div>
    </div>
  `;
}

const categoriesHtml = CATEGORIES.map(buildCategoryImages).join("\n");

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

const updatedHtml = html.replace(
  /<div id="root">[\s\S]*?<\/div>/,
  `<div id="root">${staticProjectsHtml}</div>`
);

fs.mkdirSync(projectsDir, { recursive: true });
fs.writeFileSync(projectsIndex, updatedHtml, "utf-8");

console.log("Pre-rendered /projects -> dist/projects/index.html");