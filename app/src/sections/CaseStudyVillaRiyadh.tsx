import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

const SITE_URL = "https://pybcco.com";
const PAGE_PATH = "/case-study-villa-renovation-riyadh";
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;

const IMAGES = [
  { src: "/casestudy/a6.webp", alt: "النتيجة النهائية للمجلس بعد التشطيب" },
  { src: "/casestudy/main.webp", alt: "قبل وبعد تنفيذ الواجهة" },

  { src: "/casestudy/a1.webp", alt: "الحالة قبل التطوير - مساحة داخلية" },
  { src: "/casestudy/b1.webp", alt: "الحالة قبل التطوير - ممر داخلي" },
  { src: "/casestudy/c1.webp", alt: "الحالة قبل التطوير - مساحة خارجية" },

  { src: "/casestudy/x1.webp", alt: "مرحلة الهدم وإعادة التشكيل - فتح وتعديل جدار" },
  { src: "/casestudy/x2.webp", alt: "مرحلة الهدم - إزالة التشطيبات القديمة" },
  { src: "/casestudy/a3.webp", alt: "تجهيز النيشات والتشكيلات الجدارية" },
  { src: "/casestudy/b4.webp", alt: "أعمال تكسير وإعادة تشكيل داخلي" },

  { src: "/casestudy/b5.webp", alt: "تنفيذ الأعمال الفنية ومعالجات الجدران" },
  { src: "/casestudy/b3.webp", alt: "تنفيذ الأعمال الداخلية وتجهيزات الموقع" },

  { src: "/casestudy/c2.webp", alt: "أعمال خارجية - تجهيزات أولية" },
  { src: "/casestudy/c3.webp", alt: "أعمال خارجية - بدء تركيب الهيكل" },
  { src: "/casestudy/c4.webp", alt: "أعمال خارجية - تقدم تركيب الهيكل" },
  // ملاحظة: انت ما ذكرت c5.webp ضمن القائمة النهائية. إذا موجود عندك وأضفته لاحقًا ضيفه هون.
  { src: "/casestudy/c6.webp", alt: "النتيجة النهائية للأعمال الخارجية" },

  { src: "/casestudy/b2.webp", alt: "تشطيبات الممر الداخلي - مرحلة متقدمة" },
  { src: "/casestudy/b6.webp", alt: "النتيجة النهائية لمساحة داخلية" },
  { src: "/casestudy/a5.webp", alt: "النتيجة النهائية - زاوية إضافية للمجلس" },
];

export default function CaseStudyVillaRiyadh() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
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
          name: "مشاريعنا",
          item: `${SITE_URL}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "دراسة حالة: تشطيب وتجديد فيلا بالرياض",
          item: CANONICAL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "دراسة حالة: تشطيب وتجديد فيلا سكنية في الرياض (قبل وبعد)",
      mainEntityOfPage: CANONICAL,
      author: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات – PYBCCO",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "بنيان الهرم للمقاولات – PYBCCO",
        url: SITE_URL,
      },
      about: ["تشطيب فلل", "ترميم فلل", "تجديد واجهات", "تصميم داخلي", "مقاولات الرياض"],
      image: [`${SITE_URL}/casestudy/main.webp`],
      inLanguage: "ar",
    },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="دراسة حالة: تشطيب وتجديد فيلا بالرياض (قبل/بعد) | PYBCCO"
        description="دراسة حالة لمشروع تشطيب وتجديد فيلا سكنية بالرياض: قبل/بعد الواجهة، مراحل الهدم والتنفيذ، وأعمال التشطيب النهائي بجودة عالية وإشراف هندسي."
        canonical={CANONICAL}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="pt-28 pb-10">
        <div className="container-custom">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              دراسة حالة: تشطيب وتجديد فيلا سكنية – الرياض (قبل/بعد)
            </h1>
            <p className="text-gray-600 max-w-3xl">
              مشروع تطوير متكامل شمل تحديث الواجهة، إعادة تشكيل بعض الفراغات الداخلية، تنفيذ
              أعمال هدم ومعالجات، ثم تشطيبات نهائية بجودة عالية مع التزام بالجدول الزمني
              وإشراف هندسي.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="tel:+966550604837">
                <Button className="rounded-2xl">اتصال مباشر</Button>
              </a>
              <a
                href="https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%20%D9%88%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF%20%D9%81%D9%8A%D9%84%D8%A7%20%D8%A8%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="rounded-2xl">
                  واتساب (حجز معاينة)
                </Button>
              </a>
              <a href="/villa-finishing-price-riyadh">
                <Button variant="secondary" className="rounded-2xl">
                  حاسبة التشطيب
                </Button>
              </a>
            </div>

            {/* Hero images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src="/casestudy/a6.webp"
                alt="النتيجة النهائية للمجلس بعد التشطيب"
                className="w-full rounded-2xl border border-gray-200 object-cover"
                loading="eager"
              />
              <img
                src="/casestudy/main.webp"
                alt="قبل وبعد تنفيذ الواجهة"
                className="w-full rounded-2xl border border-gray-200 object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">الحالة قبل التطوير</h2>
              <p className="mt-2 text-gray-600 max-w-3xl">
                كانت الحاجة الأساسية تحديث الهوية المعمارية وتحسين الانطباع العام للواجهة
                ورفع جودة الفراغات الداخلية قبل البدء بالتشطيبات النهائية.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["/casestudy/a1.webp", "/casestudy/b1.webp", "/casestudy/c1.webp"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="صورة قبل التطوير"
                    className="w-full rounded-2xl border border-gray-200 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">مرحلة الهدم وإعادة التشكيل</h2>
              <p className="mt-2 text-gray-600 max-w-3xl">
                تم تنفيذ أعمال هدم مدروسة وإعادة تشكيل لبعض العناصر لضمان حل المشاكل من
                الجذر وليس تجميلاً سطحياً.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {["/casestudy/x1.webp", "/casestudy/x2.webp", "/casestudy/a3.webp", "/casestudy/b4.webp"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="مرحلة الهدم وإعادة التشكيل"
                    className="w-full rounded-2xl border border-gray-200 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">التنفيذ الفني والتفاصيل</h2>
              <p className="mt-2 text-gray-600 max-w-3xl">
                شملت هذه المرحلة أعمال المعالجات، الجبس، التجهيزات، وتنفيذ التفاصيل
                التي تُظهر جودة العمل على أرض الواقع.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "/casestudy/b5.webp",
                  "/casestudy/b3.webp",
                  "/casestudy/c2.webp",
                  "/casestudy/c3.webp",
                  "/casestudy/c4.webp",
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="التنفيذ الفني"
                    className="w-full rounded-2xl border border-gray-200 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">النتيجة النهائية</h2>
              <p className="mt-2 text-gray-600 max-w-3xl">
                النتيجة النهائية تعكس هدف المشروع: مظهر عصري، تفاصيل نظيفة، وإحساس فاخر
                يرفع من قيمة العقار واستثماره.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["/casestudy/a5.webp", "/casestudy/b6.webp", "/casestudy/c6.webp", "/casestudy/b2.webp"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="النتيجة النهائية"
                    className="w-full rounded-2xl border border-gray-200 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">هل تريد تحويل فيلتك بنفس المستوى؟</h2>
              <p className="mt-2 text-gray-600 max-w-3xl">
                احجز معاينة داخل الرياض، وسنقترح خطة تطوير عملية مع تقدير مبدئي واضح.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="tel:+966550604837">
                  <Button className="rounded-2xl">اتصال الآن</Button>
                </a>
                <a
                  href="https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%20%D9%88%D8%AA%D8%AC%D8%AF%D9%8A%D8%AF%20%D9%81%D9%8A%D9%84%D8%A7%20%D8%A8%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline" className="rounded-2xl">
                    واتساب
                  </Button>
                </a>
                <a href="/projects">
                  <Button variant="secondary" className="rounded-2xl">
                    مشاهدة مشاريع أخرى
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}