import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

type Product = {
  id: string;        // A / B / C ...
  name: string;      // بديل الرخام – A
  code: string;      // A
  texture: string;   // خشن / ملمس بارز / أملس
  images: string[];  // [1,2,3] (1 الرئيسي)
  popular?: boolean; // الأكثر طلباً
};

const SITE_URL = "https://pybcco.com";

const WHATSAPP =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent(
    "السلام عليكم، أريد الاستفسار عن بديل الرخام (لوح 290×120) + التركيب (يحسب بالمتر المربع). الرجاء إرسال المتوفر والأسعار."
  );

const PRICE_BOARD_SAR = 95;   // سعر اللوح شامل الضريبة
const INSTALL_PER_M2_SAR = 60; // التركيب بالمتر المربع شامل الضريبة

const DIMENSIONS = "290 × 120 سم";
const THICKNESS = "3 مم";
const WARRANTY = "5 سنوات ضد عيوب التصنيع";

const LOOK =
  "عروق ظاهرة تُحاكي الرخام الطبيعي، تضفي لمسة جميلة وجذابة لأي مساحة.";
const FEATURES =
  "سهل التنظيف، مقاوم للماء، يوفر سطحًا متينًا لا يتأثر بالبقع أو الرطوبة.";
const INSTALL_METHOD =
  "يُركب على الجدار باستخدام السيليكون مع الفواصل والقفلات لضمان ثبات محكم.";

// ✅ FAQ (مطابق للنص الظاهر)
const FAQS = [
  {
    q: "هل بديل الرخام مقاوم للماء والرطوبة؟",
    a: "نعم، مقاوم للماء ومناسب للجدران الداخلية مع تركيب صحيح ومعالجة الزوايا والفواصل.",
  },
  {
    q: "هل السعر شامل الضريبة؟",
    a: `نعم، سعر اللوح ${PRICE_BOARD_SAR} ريال شامل الضريبة. وسعر التركيب ${INSTALL_PER_M2_SAR} ريال لكل متر مربع شامل الضريبة.`,
  },
  {
    q: "كيف يتم احتساب التركيب؟",
    a: `التركيب يُحسب بالمتر المربع. مثال: تركيب 5 م² = 5 × ${INSTALL_PER_M2_SAR} = ${5 * INSTALL_PER_M2_SAR} ريال.`,
  },
  {
    q: "ما هي الأبعاد والسماكة؟",
    a: `الأبعاد القياسية ${DIMENSIONS}، والسماكة ${THICKNESS}.`,
  },
  {
    q: "كيف تتم طريقة التثبيت؟",
    a: INSTALL_METHOD,
  },
  {
    q: "هل يوجد ضمان؟",
    a: `نعم، ضمان ${WARRANTY} وفق شروط الاستخدام والتركيب الصحيح.`,
  },
];

/** ✅ تنظيف/إزالة تكرار + تجاهل القيم الفاضية */
function uniqClean(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean)));
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
      <div
        className={`bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 ${className}`}
      >
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
      onError={() => setIdx((p) => p + 1)}
    />
  );
}

export default function DecorMarble() {
  // ✅ المنتجات (1 الرئيسي، 2 ثانوي، 3 آخر)
  const products: Product[] = useMemo(
    () => [
      // ✅ الأكثر طلباً (حماس)
      {
        id: "A",
        code: "A",
        name: "بديل الرخام – A",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/A1.webp",
          "/decor/marble/A2.webp",
          "/decor/marble/A3.webp",
        ]),
        popular: true,
      },
      {
        id: "B",
        code: "B",
        name: "بديل الرخام – B",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/B1.webp",
          "/decor/marble/B2.webp",
          "/decor/marble/B3.webp",
        ]),
        popular: true,
      },
      {
        id: "C",
        code: "C",
        name: "بديل الرخام – C",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/C1.webp",
          "/decor/marble/C2.webp",
          // C3 غير موجود حسب قائمتك
        ]),
        popular: true,
      },

      // باقي الموديلات
      {
        id: "D",
        code: "D",
        name: "بديل الرخام – D",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/D1.webp",
          "/decor/marble/D2.webp",
          "/decor/marble/D3.webp",
        ]),
      },
      {
        id: "E",
        code: "E",
        name: "بديل الرخام – E",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/E1.webp",
          "/decor/marble/E2.webp",
          "/decor/marble/E3.webp",
        ]),
      },
      {
        id: "F",
        code: "F",
        name: "بديل الرخام – F",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/F1.webp",
          "/decor/marble/F2.webp",
        ]),
      },
      {
        id: "G",
        code: "G",
        name: "بديل الرخام – G",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/G1.webp",
          "/decor/marble/G2.webp",
        ]),
      },
      {
        id: "H",
        code: "H",
        name: "بديل الرخام – H",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/H1.webp",
          "/decor/marble/H2.webp",
          "/decor/marble/H3.webp",
        ]),
      },
      {
        id: "I",
        code: "I",
        name: "بديل الرخام – I",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/I1.webp",
          "/decor/marble/I2.webp",
          "/decor/marble/I3.webp",
        ]),
      },
      {
        id: "J",
        code: "J",
        name: "بديل الرخام – J",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/J1.webp",
          "/decor/marble/J2.webp",
        ]),
      },
      {
        id: "K",
        code: "K",
        name: "بديل الرخام – K",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/K1.webp",
          "/decor/marble/K2.webp",
          "/decor/marble/K3.webp",
        ]),
      },
      {
        id: "L",
        code: "L",
        name: "بديل الرخام – L",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/L1.webp",
          "/decor/marble/L2.webp",
        ]),
      },
      {
        id: "M",
        code: "M",
        name: "بديل الرخام – M",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/M1.webp",
          "/decor/marble/M2.webp",
          "/decor/marble/M3.webp",
        ]),
      },
      {
        id: "N",
        code: "N",
        name: "بديل الرخام – N",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/N1.webp",
          "/decor/marble/N2.webp",
          "/decor/marble/N3.webp",
        ]),
      },
      {
        id: "O",
        code: "O",
        name: "بديل الرخام – O",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/O1.webp",
          "/decor/marble/O2.webp",
        ]),
      },
      {
        id: "Q",
        code: "Q",
        name: "بديل الرخام – Q",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/Q1.webp",
          "/decor/marble/Q2.webp",
          "/decor/marble/Q3.webp",
        ]),
      },
      {
        id: "R",
        code: "R",
        name: "بديل الرخام – R",
        texture: "ملمس بارز",
        images: uniqClean([
          "/decor/marble/R1.webp",
          "/decor/marble/R2.webp",
        ]),
      },
      {
        id: "S",
        code: "S",
        name: "بديل الرخام – S",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/S1.webp",
          "/decor/marble/S2.webp",
          "/decor/marble/S3.webp",
        ]),
      },
      {
        id: "T",
        code: "T",
        name: "بديل الرخام – T",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/T1.webp",
          "/decor/marble/T2.webp",
          "/decor/marble/T3.webp",
        ]),
      },
      {
        id: "U",
        code: "U",
        name: "بديل الرخام – U",
        texture: "خشن",
        images: uniqClean([
          "/decor/marble/U1.webp",
          "/decor/marble/U2.webp",
          "/decor/marble/U3.webp",
        ]),
      },
      {
        id: "Z",
        code: "Z",
        name: "بديل الرخام – Z",
        texture: "أملس",
        images: uniqClean([
          "/decor/marble/Z1.webp",
          "/decor/marble/Z2.webp",
          "/decor/marble/Z3.webp",
        ]),
      },
    ],
    []
  );

  // ===== Lightbox =====
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (imgs: string[], startIndex = 0) => {
    setLightboxImages(uniqClean(imgs));
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
      if (e.key === "ArrowLeft") nextImg();  // RTL: يسار = التالي
      if (e.key === "ArrowRight") prevImg(); // RTL: يمين = السابق
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages.length]);

  // ✅ JSON-LD (بدون dangerouslySetInnerHTML) عبر SeoHead
  const breadcrumbJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "المتجر", item: `${SITE_URL}/decor` },
        { "@type": "ListItem", position: 3, name: "بديل الرخام", item: `${SITE_URL}/decor/marble` },
      ],
    };
  }, []);

  const collectionJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "بديل الرخام | متجر PYBCCO",
      url: `${SITE_URL}/decor/marble`,
      isPartOf: { "@type": "WebSite", name: "PYBCCO", url: SITE_URL },
    };
  }, []);

  const itemListJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "بديل الرخام – متجر PYBCCO",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: products.length,
      itemListElement: products.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/decor/marble#${p.id}`,
        item: {
          "@type": "Product",
          name: p.name,
          sku: p.code,
          image: `${SITE_URL}${p.images[0] || "/decor/marble/K1.webp"}`,
          description: `بديل رخام بمقاس ${DIMENSIONS} وسماكة ${THICKNESS}. الملمس: ${p.texture}. سعر اللوح ${PRICE_BOARD_SAR} ريال شامل الضريبة. التركيب ${INSTALL_PER_M2_SAR} ريال/م² شامل الضريبة.`,
          brand: { "@type": "Brand", name: "PYBCCO" },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/decor/marble#${p.id}`,
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

  return (
    <>
      <SeoHead
        title={`بديل الرخام بالرياض | سعر اللوح ${PRICE_BOARD_SAR} ريال + تركيب ${INSTALL_PER_M2_SAR} ريال/م² – PYBCCO`}
        description={`بديل رخام بمظهر عروق طبيعية وملمس أنيق. المقاس ${DIMENSIONS} والسماكة ${THICKNESS}. سعر اللوح ${PRICE_BOARD_SAR} ريال شامل الضريبة. التركيب ${INSTALL_PER_M2_SAR} ريال لكل متر مربع. توصيل داخل الرياض + توريد أو توريد + تركيب بإشراف مقاول.`}
        canonical="https://pybcco.com/decor/marble"
        jsonLd={[breadcrumbJsonLd, collectionJsonLd, itemListJsonLd, faqJsonLd]}
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
        {/* ✅ خلفية الصفحة (K1.webp) */}
        <div className="absolute inset-0 -z-10">
          <div
            className="h-[560px] w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/decor/marble/K1.webp')" }}
          />
          <div className="h-[560px] w-full -mt-[560px] bg-white/85 backdrop-blur-[2px]" />
          <div className="h-full w-full bg-white" />
        </div>

        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-800">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/decor" className="hover:text-gray-800">المتجر</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold">بديل الرخام</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">بديل الرخام</h1>
              <p className="text-gray-700 mt-2 leading-relaxed max-w-2xl">
                {LOOK} {FEATURES}
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <span className="font-bold">الضمان:</span> {WARRANTY} •{" "}
                <span className="font-bold">المقاس:</span> {DIMENSIONS} •{" "}
                <span className="font-bold">السماكة:</span> {THICKNESS} •{" "}
                <span className="font-bold">متوفر داخل الرياض</span>
              </div>

              <div className="mt-2 text-xs text-gray-600">
                ملاحظة: <span className="font-bold">التركيب يُحسب بالمتر المربع</span>.
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="font-bold">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  استفسار واتساب
                </a>
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
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
              <div className="text-xs text-gray-500">سعر اللوح (شامل الضريبة)</div>
              <div className="text-xl font-extrabold mt-1">{PRICE_BOARD_SAR} ريال</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
              <div className="text-xs text-gray-500">التركيب (بالمتر المربع)</div>
              <div className="text-xl font-extrabold mt-1">{INSTALL_PER_M2_SAR} ريال/م²</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
              <div className="text-xs text-gray-500">المقاس</div>
              <div className="text-xl font-extrabold mt-1">{DIMENSIONS}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
              <div className="text-xs text-gray-500">السماكة</div>
              <div className="text-xl font-extrabold mt-1">{THICKNESS}</div>
            </div>
          </div>

          {/* Quality bullets */}
          <div className="rounded-2xl bg-white/80 border border-gray-200 p-6 mb-10">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">مواصفات الجودة</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {[
                "مقاوم للماء والرطوبة",
                "سهل التنظيف (مسح فقط)",
                "سطح متين لا يتأثر بالبقع",
                `الأبعاد: ${DIMENSIONS}`,
                `السماكة: ${THICKNESS}`,
                `طريقة التثبيت: ${INSTALL_METHOD}`,
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
            {products.map((p) => {
              const imgs = p.images;

              return (
                <article
                  key={p.id}
                  id={p.id}
                  className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-[4/3] bg-gray-100 cursor-zoom-in">
                    <SmartImg
                      sources={imgs}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onClick={() => openLightbox(imgs, 0)}
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-extrabold text-gray-900">{p.name}</h3>

                      <div className="flex items-center gap-2">
                        {p.popular && (
                          <span className="text-[11px] px-2 py-1 rounded-full bg-gold/15 text-gold font-bold whitespace-nowrap">
                            الأكثر طلباً
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-gray-700 whitespace-nowrap">
                          {p.code}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mt-2">
                      المقاس: {DIMENSIONS} • الملمس: <span className="font-bold">{p.texture}</span>
                    </div>

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
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                          طلب/استفسار
                        </a>
                      </Button>

                      <Button asChild variant="outline" className="font-bold">
                        <a href="/villa-finishing-price-riyadh">
                          <Calculator className="w-4 h-4 ml-2" />
                          احسب
                        </a>
                      </Button>
                    </div>

                    {/* صور إضافية */}
                    {imgs.length > 1 && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {imgs.slice(1, 3).map((img, i) => (
                          <div
                            key={img}
                            className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in"
                          >
                            <SmartImg
                              sources={[img]}
                              alt={`${p.name} - صورة إضافية`}
                              className="w-full h-full object-cover"
                              onClick={() => openLightbox(imgs, i + 1)}
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
{/* دليل الشراء والتركيب */}
<section className="mt-16 bg-white rounded-2xl shadow-sm border p-6 md:p-8">
  <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
    بديل الرخام بالرياض – دليل الشراء والتركيب
  </h2>

  <p className="text-gray-700 leading-8">
    بديل الرخام PVC يمنح شكل الرخام الطبيعي بعروق واضحة ولمسة أنيقة تناسب
    الجدران الداخلية وخلف الشاشات والمداخل وغرف المعيشة. يتميز بخفة الوزن
    وسهولة التنظيف ومقاومة الرطوبة، ما يجعله خيارًا عمليًا وأنيقًا في نفس الوقت.
  </p>

  <p className="text-gray-700 leading-8 mt-4">
    سعر اللوح <strong>95 ريال</strong> شامل الضريبة، وسعر التركيب
    <strong> 60 ريال للمتر المربع</strong>. المقاس القياسي
    <strong> 290 × 120 سم</strong> بسماكة <strong>3 مم</strong> مع ضمان
    <strong> 5 سنوات</strong> ضد عيوب التصنيع.
  </p>

  <div className="mt-6 space-y-3 text-gray-800">
    <h3 className="font-bold">هل بديل الرخام مناسب للحمامات والمطابخ؟</h3>
    <p className="text-gray-600">
      نعم، مقاوم للماء وسهل التنظيف عند تركيبه بطريقة صحيحة مع معالجة الفواصل.
    </p>

    <h3 className="font-bold mt-4">ما الفرق بينه وبين الرخام الطبيعي؟</h3>
    <p className="text-gray-600">
      أخف وزنًا وأسهل تركيبًا وأقل تكلفة، مع مظهر قريب جدًا من الرخام الحقيقي.
    </p>

    <h3 className="font-bold mt-4">متى أختار ملمس خشن أو بارز؟</h3>
    <p className="text-gray-600">
      الملمس الخشن يعطي طابع فخم ويخفي آثار اللمس، أما الملمس البارز فيعطي عمقًا
      أكبر لعروق الرخام.
    </p>
  </div>
</section>
          {/* FAQ (غير مزعج: details) */}
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold text-gray-900">أسئلة شائعة عن بديل الرخام</h2>
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