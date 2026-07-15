import fs from "fs";
import path from "path";

const SITE_URL = "https://pybcco.com";

// ✅ نكتب الملف داخل public للنسخة المصدرية، وداخل dist إذا كان موجودًا بعد build
const OUTPUTS = [
  path.join(process.cwd(), "public", "image-sitemap.xml"),
  path.join(process.cwd(), "dist", "image-sitemap.xml"),
];

// ✅ قراءة البيانات من المصدر الموحد
const galleryPath = path.join(process.cwd(), "src", "data", "gallery.json");
const gallery = JSON.parse(fs.readFileSync(galleryPath, "utf-8"));

const videosPath = path.join(process.cwd(), "src", "data", "videos.json");
const videos = JSON.parse(fs.readFileSync(videosPath, "utf-8"));

// 🧠 توزيع الصفحات
const PAGE_MAP = {
  finishing: `${SITE_URL}/villa-finishing-riyadh`,
  concrete: `${SITE_URL}/construction-company-riyadh`,
  entertainment: `${SITE_URL}/projects`,
};

// 🗺 كل صور صفحة خريطة المشاريع
const RIYADH_PROJECTS_MAP_IMAGES = [
  {
    title: "مشروع تشطيب 136 فيلا في خشم العان بالرياض",
    images: [
      "/projects/riyadh-project-ceramic/painting-and-finishing-labor.webp",
      "/projects/riyadh-project-ceramic/ceramic-tiles-lebors.webp",
      "/projects/riyadh-project-ceramic/ceramic-tiles.webp",
      "/projects/riyadh-project-ceramic/khashm-alaan-project.webp",
      "/projects/riyadh-project-ceramic/finishing-contract_.webp",
    ],
  },
  {
    title: "تشطيب مكاتب إدارية في حي السلي بالرياض",
    images: [
      "/projects/al-sulay/office-fitout-al-sulay-riyadh-01.webp",
      "/projects/al-sulay/office-fitout-al-sulay-riyadh-02.webp",
    ],
  },
  {
    title: "تشطيب مطعم في حي الفاروق بالرياض",
    images: [
      "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-01.webp",
      "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-02.webp",
      "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-03.webp",
      "/projects/al-farouq/restaurant-fitout-al-farouq-riyadh-04.webp",
    ],
  },
  {
    title: "ترميم وتصميم فيلا في حي الملقا بالرياض",
    images: [
      "/projects/al-malqa/villa-renovation-design-al-malqa-riyadh-01.webp",
    ],
  },
  {
    title: "تنفيذ مكاتب إدارية وترميم حمامات في منطقة المطار بالرياض",
    images: [
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-11.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-01.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-02.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-03.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-04.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-05.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-06.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-07.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-08.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-09.webp",
      "/projects/airport-admin-offices/airport-admin-offices-renovation-riyadh-10.webp",
    ],
  },
  {
    title: "تشطيب مكاتب تجارية في برج 303 بمدينة الملك عبدالله المالية بالرياض",
    images: [
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-01.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-02.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-03.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-04.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-05.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-06.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-07.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-09.webp",
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-10.webp",
    ],
  },
  {
    title: "ترميم فيلا داخلي وخارجي في حي الحمراء بالرياض",
    images: [
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-01.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-02.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-03.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-04.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-05.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-06.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-07.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-08.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-09.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-10.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-11.webp",
      "/projects/alhamra/villa-renovation-al-hamra-riyadh-12.webp",
    ],
  },
  {
    title: "ترميم وإعادة تأهيل واجهة عمارة سكنية في حي الملز بالرياض",
    images: [
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-01.webp",
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-02.webp",
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-03.webp",
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-04.webp",
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-05.webp",
      "/projects/al-malaz-facade/al-malaz-facade-under-construction-06.webp",
    ],
  },
  {
    title: "تشطيب جلسات خارجية لمطعم في حي المربع بالرياض",
    images: [
      "/projects/restaurant-outdoor/13-restaurant-outdoor-area-after-construction-riyadh.webp",
      "/projects/restaurant-outdoor/14-restaurant-yard-finishing-after-riyadh.webp",
      "/projects/restaurant-outdoor/15-restaurant-exterior-seating-after-renovation-riyadh.webp",
      "/projects/restaurant-outdoor/16-outdoor-dining-area-after-finishing-riyadh.webp",
      "/projects/restaurant-outdoor/17-restaurant-courtyard-after-work-riyadh.webp",
      "/projects/restaurant-outdoor/18-restaurant-outdoor-space-after-finishing-riyadh.webp",
      "/projects/restaurant-outdoor/10-restaurant-outdoor-seating-after-riyadh.webp",
      "/projects/restaurant-outdoor/11-restaurant-courtyard-design-after-riyadh.webp",
      "/projects/restaurant-outdoor/12-modern-restaurant-outdoor-finishing-riyadh.webp",
      "/projects/restaurant-outdoor/01-restaurant-outdoor-seating-before-riyadh.webp",
      "/projects/restaurant-outdoor/02-restaurant-courtyard-finishing-before-riyadh.webp",
      "/projects/restaurant-outdoor/03-outdoor-restaurant-renovation-before-riyadh.webp",
      "/projects/restaurant-outdoor/04-restaurant-outdoor-area-before-construction-riyadh.webp",
      "/projects/restaurant-outdoor/05-restaurant-yard-finishing-before-riyadh.webp",
      "/projects/restaurant-outdoor/06-restaurant-exterior-seating-before-renovation-riyadh.webp",
      "/projects/restaurant-outdoor/07-outdoor-dining-area-before-finishing-riyadh.webp",
      "/projects/restaurant-outdoor/08-restaurant-courtyard-before-work-riyadh.webp",
      "/projects/restaurant-outdoor/09-restaurant-outdoor-space-before-finishing-riyadh.webp",
    ],
  },
  {
    title: "تشطيب معرض درعه للعطور في حي الروضة بالرياض",
    images: [
      "/projects/finishing/finishing-19.webp",
      "/projects/finishing/finishing-22.webp",
      "/projects/finishing/finishing-17.webp",
      "/projects/finishing/finishing-18.webp",
    ],
  },
  {
    title: "تشطيب شقة وإضافة ملحق علوي في حي الياسمين بالرياض",
    images: [
      "/projects/finishing/finishing-11.webp",
      "/projects/finishing/finishing-13.webp",
      "/projects/finishing/finishing-14.webp",
      "/projects/finishing/finishing-06.webp",
      "/projects/finishing/finishing-09.webp",
      "/projects/finishing/finishing-10.webp",
      "/video-covers/roof-finishing-before-after.webp",
    ],
  },
  {
    title: "بناء عظم فلل سكنية في حي العارض بالرياض",
    images: [
      "/projects/concrete/concrete-14.webp",
      "/projects/concrete/concrete-1.webp",
      "/projects/concrete/concrete-2.webp",
      "/projects/concrete/concrete-3.webp",
      "/projects/concrete/concrete-4.webp",
    ],
  },
  {
    title: "بناء عظم فلل سكنية في حي القيروان بالرياض",
    images: [
      "/projects/concrete/concrete-15.webp",
      "/projects/concrete/concrete-13.webp",
    ],
  },
  {
    title: "ترميم حمامات في حي طويق بالرياض",
    images: [
      "/projects/toaiq/toaiq-bathroom-renovation-01.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-02.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-03.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-04.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-05.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-06.webp",
      "/projects/toaiq/toaiq-bathroom-renovation-07.webp",
    ],
  },
].flatMap((project) =>
  project.images.map((src, index) => ({
    src,
    alt: `${project.title} - صورة ${index + 1}`,
  }))
);



// 🎁 صورة صفحة العروض
const CONSTRUCTION_OFFERS_IMAGES = [
  {
    src: "/images/construction-offers.webp",
    alt: "عروض مقاولات وتشطيب في الرياض من بنيان الهرم للمقاولات",
  },
];

// 🎨 صور خدمة التصميم المبدئي المجاني للديكور
const FREE_DECOR_DESIGN_IMAGES = [
  {
    src: "/decor/free-design/tv-wall-before.webp",
    alt: "جدار تلفزيون قبل التصميم المبدئي - بنيان الهرم للمقاولات",
  },
  {
    src: "/decor/free-design/tv-wall-concept.webp",
    alt: "تصور تصميمي مبدئي لجدار تلفزيون باستخدام بديل الخشب وبديل الرخام",
  },
];

// 🎬 أغلفة مكتبة الفيديو من المصدر الموحد
const VIDEO_LIBRARY_IMAGES = videos.map((video) => ({
  src: video.cover,
}));

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteImageUrl(src) {
  const absoluteUrl = src.startsWith("http") ? src : `${SITE_URL}${src}`;
  return encodeURI(absoluteUrl);
}

function buildImageTags(items = []) {
  return items
    .map((item) => {
      const imageUrl = escapeXml(toAbsoluteImageUrl(item.src));

      return `    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>`;
    })
    .join("\n");
}

function buildUrlBlock(pageUrl, items = []) {
  return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${buildImageTags(items)}
  </url>`;
}

const galleryUrls = Object.entries(gallery)
  .map(([key, category]) => {
    const pageUrl = PAGE_MAP[key] || `${SITE_URL}/projects`;
    return buildUrlBlock(pageUrl, category.items || []);
  })
  .join("\n");

// ✅ إضافة صفحة خريطة المشاريع إلى Image Sitemap بكل صور المشاريع
const projectsMapUrl = buildUrlBlock(
  `${SITE_URL}/projects-in-riyadh`,
  RIYADH_PROJECTS_MAP_IMAGES
);

const decorUrl = buildUrlBlock(`${SITE_URL}/decor`, FREE_DECOR_DESIGN_IMAGES);
const decorWoodUrl = buildUrlBlock(`${SITE_URL}/decor/wood`, FREE_DECOR_DESIGN_IMAGES);
const decorMarbleUrl = buildUrlBlock(`${SITE_URL}/decor/marble`, FREE_DECOR_DESIGN_IMAGES);
const decorShipboardUrl = buildUrlBlock(`${SITE_URL}/decor/shipboard`, FREE_DECOR_DESIGN_IMAGES);
const offersUrl = buildUrlBlock(`${SITE_URL}/offers`, CONSTRUCTION_OFFERS_IMAGES);
const videosUrl = buildUrlBlock(`${SITE_URL}/videos`, VIDEO_LIBRARY_IMAGES);

const urls = [
  galleryUrls,
  projectsMapUrl,
  offersUrl,
  videosUrl,
  decorUrl,
  decorWoodUrl,
  decorMarbleUrl,
  decorShipboardUrl,
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

for (const output of OUTPUTS) {
  const outputDir = path.dirname(output);

  // لا ننشئ dist من الصفر؛ نكتب داخله فقط إذا كان موجودًا بعد vite build
  if (output.includes(`${path.sep}dist${path.sep}`) && !fs.existsSync(outputDir)) {
    continue;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(output, xml.trim(), "utf-8");
}

console.log("✅ image-sitemap.xml generated in public and dist when available");