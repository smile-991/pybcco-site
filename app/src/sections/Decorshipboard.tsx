import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Calculator, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

type Product = {
  id: string; // SB01...
  name: string;
  code: string; // 1..24
  mainCandidates: string[];
  extraCandidates?: string[];
};

const SITE_URL = "https://pybcco.com";

// ✅ واتساب مخصص لبديل الشيبورد
const WHATSAPP =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent(
    "السلام عليكم، أريد الاستفسار عن بديل الشيبورد WPC (لوح 290×120 سم) + التركيب (يحسب بالمتر المربع). الرجاء إرسال المتوفر والأسعار."
  );

// ✅ الأسعار (حسب كلامك)
const PRICE_BOARD_SAR = 125; // سعر اللوح (شامل الضريبة)
const INSTALL_PER_M2_SAR = 60; // التركيب بالمتر المربع (شامل الضريبة)

// ✅ مواصفات عامة
const DIMENSIONS = "290 × 120 سم";
const MATERIAL = "WPC عالي التحمل";
const ORIGIN = "صناعة صينية ممتازة";
const WARRANTY = "5 سنوات ضد عيوب التصنيع وتغيّر اللون";

const THICKNESS = "متوفر: 3 مم / 8 مم";
const LOOKS = "مظهر خشبي / مظهر قماشي";

// ✅ FAQ لازم يطابق النص الظاهر 100%
const FAQS = [
  {
    q: "هل بديل الشيبورد WPC مناسب للرطوبة؟",
    a: "نعم، مقاوم للماء والرطوبة ومناسب للأماكن الداخلية، ويمكن استخدامه في المطابخ والحمامات حسب أسلوب التنفيذ والعزل.",
  },
  {
    q: "هل السعر شامل الضريبة؟",
    a: "نعم، سعر اللوح 125 ريال شامل الضريبة. وسعر التركيب 60 ريال لكل متر مربع شامل الضريبة.",
  },
  {
    q: "كيف يتم احتساب التركيب؟",
    a: "التركيب يُحسب بالمتر المربع. يتم تحديد التكلفة النهائية حسب مساحة الجدار/السطح وعدد الألواح المطلوبة.",
  },
  {
    q: "هل يتوفر أكثر من سماكة؟",
    a: "نعم، متوفر بسماكتين: 3 مم و 8 مم حسب نوع الاستخدام والمتانة المطلوبة.",
  },
  {
    q: "هل يوجد ضمان؟",
    a: "نعم، ضمان 5 سنوات ضد عيوب التصنيع وتغيّر اللون وفق شروط الاستخدام والتركيب الصحيح.",
  },
];

function candidates(...paths: string[]) {
  const clean = paths.filter(Boolean);
  return Array.from(new Set(clean));
}

/** ✅ صورة ذكية: تحاول عدة روابط بالتسلسل */
function SmartImg({
  sources,
  alt,
  className,
  onClick,
}: {
  sources: string[];
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const src = sources[idx];

  if (!src) {
    return (
      <div className={`bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 ${className}`}>
        صورة غير متاحة
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onClick={onClick}
      onError={() => setIdx((prev) => prev + 1)}
    />
  );
}

export default function DecorShipboard() {
  const products: Product[] = useMemo(() => {
    // ✅ عندك ملفات: 1A/1B ... 23A/23B + 24.webp + 24A.webp
    const list: Product[] = [];

    for (let i = 1; i <= 23; i++) {
      const id = `SB${String(i).padStart(2, "0")}`;
      list.push({
        id,
        name: `بديل الشيبورد – ${i}`,
        code: String(i),
        mainCandidates: candidates(`/decor/shipboard/${i}A.webp`),
        extraCandidates: candidates(`/decor/shipboard/${i}B.webp`),
      });
    }

    // ✅ 24: عندك 24.webp + 24A.webp (بدون B)
    list.push({
      id: "SB24",
      name: "بديل الشيبورد – 24",
      code: "24",
      mainCandidates: candidates("/decor/shipboard/24A.webp", "/decor/shipboard/24.webp"),
      extraCandidates: candidates("/decor/shipboard/24.webp"),
    });

    return list;
  }, []);

  // ===== Lightbox =====
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (imgs: string[], startIndex = 0) => {
    setLightboxImages(imgs.filter(Boolean));
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const prevImg = () =>
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const nextImg = () =>
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") nextImg(); // RTL: سهم يسار = التالي
      if (e.key === "ArrowRight") prevImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages.length]);

  // ✅ Product Schema (ItemList)
  const productItemListJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "بديل الشيبورد WPC – متجر PYBCCO",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: products.length,
      itemListElement: products.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/decor/shipboard#${p.id}`,
        item: {
          "@type": "Product",
          name: p.name,
          sku: p.code,
          image: `${SITE_URL}${p.mainCandidates[0]}`,
          description: `لوح بديل الشيبورد WPC بمقاس ${DIMENSIONS}. ${THICKNESS}. سعر اللوح ${PRICE_BOARD_SAR} ريال شامل الضريبة. التركيب ${INSTALL_PER_M2_SAR} ريال لكل متر مربع شامل الضريبة.`,
          brand: { "@type": "Brand", name: "PYBCCO" },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/decor/shipboard#${p.id}`,
            price: String(PRICE_BOARD_SAR),
            priceCurrency: "SAR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "بنيان الهرم للمقاولات (PYBCCO)",
              url: SITE_URL,
            },
          },
        },
      })),
    };
  }, [products]);

  // ✅ FAQ Schema
  const faqJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
  }, []);

  // ✅ Breadcrumb Schema
  const breadcrumbJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "المتجر", item: `${SITE_URL}/decor` },
        { "@type": "ListItem", position: 3, name: "بديل الشيبورد", item: `${SITE_URL}/decor/shipboard` },
      ],
    };
  }, []);

  // ✅ WebPage Schema (خفيف)
  const webPageJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "بديل الشيبورد WPC بالرياض | متجر PYBCCO",
      url: `${SITE_URL}/decor/shipboard`,
    };
  }, []);

  return (
    <>
      <SeoHead
        title="بديل الشيبورد WPC بالرياض | لوح 125 ريال شامل الضريبة + تركيب 60 ريال/م² – PYBCCO"
        description="بديل الشيبورد WPC بمقاس 290×120 سم. متوفر بسماكتين 3مم و8مم وبمظهر خشبي أو قماشي. سعر اللوح 125 ريال شامل الضريبة. التركيب 60 ريال/م² شامل الضريبة. توصيل داخل الرياض + توريد أو توريد + تركيب."
        canonical="https://pybcco.com/decor/shipboard"
        jsonLd={[productItemListJsonLd, faqJsonLd, breadcrumbJsonLd, webPageJsonLd]}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/90 hover:text-white flex items-center gap-2"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
              <span className="text-sm">إغلاق</span>
            </button>

            {lightboxImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/10 hover:bg-white/20 text-white rounded-xl p-2"
                  aria-label="السابق"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/10 hover:bg-white/20 text-white rounded-xl p-2"
                  aria-label="التالي"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="bg-black rounded-2xl overflow-hidden border border-white/10">
              <img
                src={lightboxImages[lightboxIndex]}
                alt="صورة المنتج"
                className="w-full h-[75vh] object-contain"
              />
            </div>

            {lightboxImages.length > 1 && (
              <div className="mt-3 text-center text-white/70 text-sm">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="pt-28 pb-28">
        <div className="container-custom">
          {/* Breadcrumb UI */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-800">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/decor" className="hover:text-gray-800">المتجر</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold">بديل الشيبورد</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">بديل الشيبورد (WPC)</h1>
              <p className="text-gray-600 mt-2 leading-relaxed">
                لوح متين يحل محل الشيبورد التقليدي، متوفر بمظهر خشبي أو قماشي، مناسب للغرف والصالات والمداخل.
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <span className="font-bold">ضمان:</span> {WARRANTY} •{" "}
                <span className="font-bold">المقاس:</span> {DIMENSIONS} •{" "}
                <span className="font-bold">السماكة:</span> {THICKNESS}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                ملاحظة: <span className="font-bold">التركيب يُحسب بالمتر المربع</span>.
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="font-bold">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">استفسار واتساب</a>
              </Button>
              <Button asChild className="bg-gold hover:bg-gold/90 text-black font-bold">
                <a href="tel:+966550604837">
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال
                </a>
              </Button>
            </div>
          </div>

          {/* Specs strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">سعر اللوح (شامل الضريبة)</div>
              <div className="text-xl font-extrabold mt-1">{PRICE_BOARD_SAR} ريال</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">التركيب (يُحسب بالمتر المربع)</div>
              <div className="text-xl font-extrabold mt-1">{INSTALL_PER_M2_SAR} ريال/م²</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">المقاس</div>
              <div className="text-xl font-extrabold mt-1">{DIMENSIONS}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">المظهر</div>
              <div className="text-base font-extrabold mt-1 leading-snug">{LOOKS}</div>
            </div>
          </div>

          {/* Quality bullets */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 mb-10">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">مواصفات الجودة</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {[
                `الخامة: ${MATERIAL} (${ORIGIN})`,
                "مقاوم للماء والرطوبة",
                "سهل التنظيف (مسح فقط)",
                "مناسب للغرف والصالونات والمداخل",
                "مظهر خشبي أو قماشي حسب المتوفر",
                "ثبات لون وملمس مع تنفيذ صحيح",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, idx) => {
              const allImgs = candidates(...p.mainCandidates, ...(p.extraCandidates || []));

              return (
                <article
                  key={p.id}
                  id={p.id}
                  className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-[4/3] bg-gray-100 cursor-zoom-in">
                    <SmartImg
                      sources={p.mainCandidates}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onClick={() => openLightbox(allImgs, 0)}
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-extrabold text-gray-900">{p.name}</h3>

                      <div className="flex items-center gap-2">
                        {idx < 3 && (
                          <span className="text-[11px] px-2 py-1 rounded-full bg-gold/15 text-gold font-bold whitespace-nowrap">
                            الأكثر طلباً
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-gray-700 whitespace-nowrap">
                          SB{p.code}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mt-2">المقاس: {DIMENSIONS}</div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-xs text-gray-500">سعر اللوح</div>
                        <div className="text-lg font-extrabold">{PRICE_BOARD_SAR} ريال</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">التركيب</div>
                        <div className="text-lg font-extrabold">{INSTALL_PER_M2_SAR} ريال/م²</div>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Button asChild className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold">
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">طلب/استفسار</a>
                      </Button>

                      <Button asChild variant="outline" className="font-bold">
                        <a href="/villa-finishing-price-riyadh">
                          <Calculator className="w-4 h-4 ml-2" />
                          احسب
                        </a>
                      </Button>
                    </div>

                    {allImgs.length > 1 && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {allImgs.slice(1, 3).map((img, i) => (
                          <div
                            key={img}
                            className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in"
                          >
                            <SmartImg
                              sources={[img]}
                              alt={`${p.name} - صورة إضافية`}
                              className="w-full h-full object-cover"
                              onClick={() => openLightbox(allImgs, i + 1)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* FAQ */}
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold text-gray-900">أسئلة شائعة عن بديل الشيبورد</h2>
            <div className="mt-6 grid gap-4">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <summary className="font-bold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
{/* Shipboard SEO Guide (Collapsible) */}
<section className="mt-14">
  <h2 className="text-2xl font-extrabold text-gray-900">
    بديل الشيبورد WPC بالرياض – دليل الشراء والتركيب
  </h2>
  <p className="mt-3 text-gray-600 leading-relaxed">
    هذا الدليل يساعدك تختار النوع المناسب وتفهم الفروقات وطريقة احتساب السعر قبل الطلب.
    المحتوى موجود داخل الصفحة ليُفهم سياق المنتج بشكل أوضح.
  </p>

  <div className="mt-5">
    <details className="rounded-2xl border border-gray-200 bg-white p-5">
      <summary className="cursor-pointer select-none font-bold text-gray-900">
        اضغط لعرض الدليل الكامل
      </summary>

      <div className="mt-4 space-y-5 text-gray-700 leading-relaxed">
        <p>
          يُعتبر <strong>بديل الشيبورد WPC</strong> من الخيارات العملية لتكسية الجدران والأسقف
          داخل الفلل والشقق والمشاريع التجارية في <strong>الرياض</strong>، لأنه يجمع بين شكل خشبي
          عصري وسهولة في التنظيف مع ثبات أفضل من بعض البدائل الخفيفة. ويُستخدم بكثرة في
          جدار التلفزيون، المداخل، الممرات، الصالات، وغرف النوم، وأحيانًا في أماكن شبه خارجية
          بشرط أن تكون محمية من التعرض المباشر للماء والشمس.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          ما هو بديل الشيبورد WPC؟ ولماذا يفضّله الناس في الرياض؟
        </h3>
        <p>
          ألواح WPC هي مادة مركبة (Composite) تجمع عناصر خشبية مع مواد بوليمرية معالجة،
          وهذا يعطيها <strong>صلابة أعلى</strong> وشعور أقرب للخشب من ناحية المظهر والملمس، مع
          مقاومة أفضل للرطوبة مقارنة بالخشب الطبيعي. في الرياض تحديداً، كثير من العملاء يركزون
          على المواد التي تعطي شكل أنيق بدون صيانة مزعجة، لذلك بديل الشيبورد صار خيار شائع
          في التشطيبات الحديثة والديكور الداخلي.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          الفرق بين بديل الخشب PVC وبديل الشيبورد WPC
        </h3>
        <p>
          بشكل مبسّط: <strong>PVC</strong> غالباً أخف وأسهل في بعض التركيبات الداخلية الخفيفة،
          بينما <strong>WPC</strong> عادةً <strong>أقوى وأصلب</strong> ويُفضّل عندما نحتاج سماكة أعلى
          وثبات أكبر ونتيجة نهائية “أفخم” من ناحية الشكل. الاختيار الصحيح يعتمد على مكان
          الاستخدام، مساحة الجدار، وطريقة التركيب المطلوبة.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          كيف تختار بديل الشيبورد المناسب للمكان؟
        </h3>
        <p>
          قبل الشراء، ركّز على 4 نقاط:
          <br />• <strong>مكان الاستخدام</strong>: داخلي / شبه خارجي (مدخل محمي، شرفة مغلقة).
          <br />• <strong>السماكة والمقاس</strong>: كلما زادت السماكة زادت الصلابة وثبات الشكل.
          <br />• <strong>جودة التشطيب</strong>: ثبات اللون ونظافة سطح اللوح والقصّات.
          <br />• <strong>طريقة التركيب</strong>: تركيب مباشر بمواد تثبيت مناسبة أو عبر شاسيه لضمان الاستقامة.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          هل بديل الشيبورد يتحمّل حرارة الرياض والرطوبة؟
        </h3>
        <p>
          نعم، للاستخدامات الداخلية في الرياض يكون مناسب جداً عند اختيار نوعية جيدة وتنفيذ
          احترافي. العامل الحاسم عادة ليس اللوح وحده، بل <strong>جودة التركيب</strong> ومعالجة الزوايا
          والفواصل واستقامة السطح. إذا كان الجدار غير مستوٍ، الأفضل استخدام شاسيه لضمان
          نتيجة نهائية نظيفة.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          كيف يتم حساب السعر والكمية؟ (توريد أو توريد + تركيب)
        </h3>
        <p>
          سعر بديل الشيبورد في الرياض يتحدد حسب:
          <strong> مساحة الجدار/السقف</strong>، <strong>عدد الألواح المطلوبة حسب المقاس</strong>،
          <strong> نوع اللوح والسماكة</strong>، ثم <strong>التركيب</strong> (حسب طبيعة التنفيذ والتفاصيل).
          أفضل طريقة للحصول على رقم دقيق: أرسل الأبعاد أو صورة واضحة للجدار + القياسات
          ونحدّد لك الكمية المناسبة مع <strong>عرض سعر واضح</strong>.
        </p>

        <h3 className="text-lg font-extrabold text-gray-900">
          هل تحتاج فني متخصص للتركيب؟
        </h3>
        <p>
          التركيب قد يبدو بسيطاً، لكن النتيجة الاحترافية تعتمد على ضبط الميزان، قص الزوايا،
          إنهاء الحواف، وتوزيع الفواصل بشكل متوازن. لذلك ننصح دائماً بفني تركيب محترف
          خصوصاً في جدران التلفزيون والمداخل لأنها تظهر فيها العيوب بسرعة.
        </p>

        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">روابط قد تهمك داخل الموقع:</p>
          <ul className="space-y-2">
            <li>
              <a className="text-gold underline" href="/decor">
                المتجر – كل الأقسام
              </a>
            </li>
            <li>
              <a className="text-gold underline" href="/decor/wood">
                بديل الخشب PVC بالرياض
              </a>
            </li>
            <li>
              <a className="text-gold underline" href="/decor/marble">
                بديل الرخام بالرياض
              </a>
            </li>
            <li>
              <a className="text-gold underline" href="/villa-finishing-price-riyadh">
                احسب التكلفة – حاسبة تشطيب الفلل
              </a>
            </li>
          </ul>
        </div>

        <p className="text-gray-700">
          إذا عندك مقاس الجدار أو صورة + أبعاد، تواصل معنا ونرسل لك توصية بالنوع المناسب
          والكمية التقريبية، مع خيار <strong>توريد</strong> أو <strong>توريد + تركيب</strong> داخل الرياض.
        </p>
      </div>
    </details>
  </div>
</section>
        {/* Sticky CTA mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-gray-200 lg:hidden">
          <div className="container-custom py-3 flex gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gold text-black font-extrabold rounded-xl py-3 text-center"
            >
              طلب عبر واتساب
            </a>
            <a
              href="tel:+966550604837"
              className="w-14 rounded-xl border border-gray-300 flex items-center justify-center"
              aria-label="اتصال"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}