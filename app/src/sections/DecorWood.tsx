import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Calculator, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

type Product = {
  id: string; // مثل N006 أو F1
  name: string;
  code: string;
  // بدل main ثابت: نخليها قائمة خيارات (الأذكى)
  mainCandidates: string[];
  extraCandidates?: string[]; // صور إضافية (اختياري)
};

const SITE_URL = "https://pybcco.com";

const WHATSAPP =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent(
    "السلام عليكم، أريد الاستفسار عن بديل الخشب PVC (لوح 290×20) + التركيب (يحسب بالمتر الطولي). الرجاء إرسال المتوفر والأسعار."
  );

const PRICE_BOARD_SAR = 22; // سعر اللوح (شامل الضريبة)
const INSTALL_PER_METER_SAR = 25; // ✅ التركيب بالمتر الطولي (شامل الضريبة)

const DIMENSIONS = "290 × 20 سم";
const MATERIAL = "PVC عالي الكثافة";
const ORIGIN = "صناعة صينية ممتازة";
const WARRANTY = "5 سنوات ضد عيوب التصنيع وتغيّر اللون";

// ✅ FAQ (لازم يطابق النص الظاهر 100%)
const FAQS = [
  {
    q: "هل بديل الخشب PVC مناسب للرطوبة؟",
    a: "نعم، مناسب للأماكن الداخلية ويقاوم الرطوبة بشكل ممتاز، مع الالتزام بتركيب صحيح ومعالجة الزوايا.",
  },
  {
    q: "هل السعر شامل الضريبة؟",
    a: "نعم، سعر اللوح 22 ريال شامل الضريبة. وسعر التركيب 25 ريال لكل متر طولي شامل الضريبة.",
  },
  {
    q: "كيف يتم احتساب التركيب؟",
    a: "التركيب يُحسب بالمتر الطولي من اللوح. مثال: إذا تم تركيب 2 متر طولي من لوح طوله 2.9م، تكون تكلفة التركيب 2 × 25 = 50 ريال.",
  },
  {
    q: "هل يمكن طلب توريد فقط بدون تركيب؟",
    a: "نعم، متوفر توريد فقط أو توريد + تركيب بإشراف مقاول حسب رغبتك.",
  },
  {
    q: "كم مدة التركيب عادة؟",
    a: "تختلف حسب المساحة، وغالبًا يتم التنفيذ خلال يوم إلى يومين للمساحات المتوسطة بعد المعاينة.",
  },
  {
    q: "هل يوجد ضمان؟",
    a: "نعم، ضمان 5 سنوات ضد عيوب التصنيع وتغيّر اللون وفق شروط الاستخدام والتركيب الصحيح.",
  },
];

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
      onError={() => {
        // جرّب الصورة اللي بعدها
        setIdx((prev) => prev + 1);
      }}
    />
  );
}

/** ✅ مساعد: يبني قائمة مرشحات للصور حسب وجود أكثر من مقاس */
function candidates(...paths: string[]) {
  // نشيل أي قيم فاضية + نتأكد ما في تكرار
  const clean = paths.filter(Boolean);
  return Array.from(new Set(clean));
}

export default function DecorWood() {
  const products: Product[] = useMemo(
    () => [
      // ===== N Series =====
      {
        id: "N002",
        name: "بديل الخشب – N002",
        code: "N002",
        mainCandidates: candidates(
          "/decor/wood/N002-1-768x768.webp",
          "/decor/wood/N002-150-768x768.webp"
        ),
      },
      {
        id: "N003",
        name: "بديل الخشب – N003",
        code: "N003",
        mainCandidates: candidates(
          "/decor/wood/N003-768x768.webp",
          "/decor/wood/N003-150-768x768.webp"
        ),
      },
      {
        id: "N004",
        name: "بديل الخشب – N004",
        code: "N004",
        mainCandidates: candidates(
          "/decor/wood/N004-768x768.webp",
          "/decor/wood/N004-150-768x768.webp"
        ),
      },
      {
        id: "N005",
        name: "بديل الخشب – N005",
        code: "N005",
        mainCandidates: candidates(
          "/decor/wood/N005-683x1024.webp",
          "/decor/wood/N005-150-768x768.webp"
        ),
      },
      {
        id: "N006",
        name: "بديل الخشب – N006 (أسود)",
        code: "N006",
        mainCandidates: candidates(
          "/decor/wood/N006-683x1024.webp",
          "/decor/wood/N006-150-768x768.webp"
        ),
      },
      {
        id: "N007",
        name: "بديل الخشب – N007",
        code: "N007",
        mainCandidates: candidates(
          "/decor/wood/N007-768x768.webp",
          "/decor/wood/N007-150-768x768.webp"
        ),
      },
      {
        id: "N008",
        name: "بديل الخشب – N008",
        code: "N008",
        mainCandidates: candidates(
          "/decor/wood/N008-683x1024.webp",
          "/decor/wood/N008-150-768x768.webp"
        ),
      },
      {
        id: "N009",
        name: "بديل الخشب – N009",
        code: "N009",
        mainCandidates: candidates(
          "/decor/wood/N009-768x768.webp",
          "/decor/wood/N009-150-768x768.webp"
        ),
      },
      {
        id: "N010",
        name: "بديل الخشب – N010",
        code: "N010",
        mainCandidates: candidates(
          "/decor/wood/N010-768x768.webp",
          "/decor/wood/N010-150-768x768.webp"
        ),
      },
      {
        id: "N011",
        name: "بديل الخشب – N011",
        code: "N011",
        mainCandidates: candidates(
          "/decor/wood/N011-768x768.webp",
          "/decor/wood/N011-150-768x768.webp"
        ),
      },
      {
        id: "N012",
        name: "بديل الخشب – N012",
        code: "N012",
        mainCandidates: candidates(
          "/decor/wood/N012-683x1024.webp",
          "/decor/wood/N012-150-768x768.webp"
        ),
      },
      {
        id: "N013",
        name: "بديل الخشب – N013",
        code: "N013",
        mainCandidates: candidates(
          "/decor/wood/N013-683x1024.webp",
          "/decor/wood/N013-150-768x768.webp"
        ),
      },
      {
        id: "N014",
        name: "بديل الخشب – N014",
        code: "N014",
        mainCandidates: candidates(
          "/decor/wood/N014-768x768.webp",
          "/decor/wood/N014-150-768x768.webp"
        ),
      },
      {
        id: "N015",
        name: "بديل الخشب – N015",
        code: "N015",
        mainCandidates: candidates(
          "/decor/wood/N015-683x1024.webp",
          "/decor/wood/N015-150-768x768.webp"
        ),
      },
      {
        id: "N016",
        name: "بديل الخشب – N016",
        code: "N016",
        mainCandidates: candidates(
          "/decor/wood/N016-683x1024.webp",
          "/decor/wood/N016-150-768x768.webp"
        ),
      },
      {
        id: "N017",
        name: "بديل الخشب – N017",
        code: "N017",
        mainCandidates: candidates(
          "/decor/wood/N017-768x512.webp",
          "/decor/wood/N017-150-768x768.webp"
        ),
      },
      {
        id: "N018",
        name: "بديل الخشب – N018",
        code: "N018",
        mainCandidates: candidates(
          "/decor/wood/N018-683x1024.webp",
          "/decor/wood/N018-150-768x768.webp"
        ),
      },

      // ===== F Series (B = main, A = extra) =====
      {
        id: "F1",
        name: "بديل الخشب – F1",
        code: "F1",
        mainCandidates: candidates("/decor/wood/F1B.webp", "/decor/wood/F1A.webp"),
        extraCandidates: candidates("/decor/wood/F1A.webp"),
      },
      {
        id: "F2",
        name: "بديل الخشب – F2",
        code: "F2",
        mainCandidates: candidates("/decor/wood/F2B.webp", "/decor/wood/F2A.webp"),
        extraCandidates: candidates("/decor/wood/F2A.webp"),
      },
      {
        id: "F3",
        name: "بديل الخشب – F3",
        code: "F3",
        mainCandidates: candidates("/decor/wood/F3B.webp", "/decor/wood/F3A.webp"),
        extraCandidates: candidates("/decor/wood/F3A.webp"),
      },
      {
        id: "F4",
        name: "بديل الخشب – F4",
        code: "F4",
        mainCandidates: candidates("/decor/wood/F4B.webp", "/decor/wood/F4A.webp"),
        extraCandidates: candidates("/decor/wood/F4A.webp"),
      },
      {
        id: "F5",
        name: "بديل الخشب – F5",
        code: "F5",
        mainCandidates: candidates("/decor/wood/F5B.webp", "/decor/wood/F5A.webp"),
        extraCandidates: candidates("/decor/wood/F5A.webp"),
      },
      {
        id: "F6",
        name: "بديل الخشب – F6",
        code: "F6",
        mainCandidates: candidates("/decor/wood/F6B.webp", "/decor/wood/F6A.webp"),
        extraCandidates: candidates("/decor/wood/F6A.webp"),
      },
      {
        id: "F7",
        name: "بديل الخشب – F7",
        code: "F7",
        mainCandidates: candidates("/decor/wood/F7B.webp", "/decor/wood/F7A.webp"),
        extraCandidates: candidates("/decor/wood/F7A.webp"),
      },
      {
        id: "F8",
        name: "بديل الخشب – F8",
        code: "F8",
        mainCandidates: candidates("/decor/wood/F8B.webp", "/decor/wood/F8A.webp"),
        extraCandidates: candidates("/decor/wood/F8A.webp"),
      },
    ],
    []
  );

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
      name: "بديل الخشب PVC – متجر PYBCCO",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: products.length,
      itemListElement: products.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/decor/wood#${p.id}`,
        item: {
          "@type": "Product",
          name: p.name,
          sku: p.code,
          image: `${SITE_URL}${p.mainCandidates[0]}`,
          description: `لوح بديل خشب PVC عالي الجودة بمقاس ${DIMENSIONS}. سعر اللوح ${PRICE_BOARD_SAR} ريال شامل الضريبة. التركيب ${INSTALL_PER_METER_SAR} ريال لكل متر طولي شامل الضريبة.`,
          brand: { "@type": "Brand", name: "PYBCCO" },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/decor/wood#${p.id}`,
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

  return (
    <>
      <SeoHead
        title="بديل الخشب PVC بالرياض | سعر اللوح 22 ريال شامل الضريبة + تركيب 25 ريال/م ط – PYBCCO"
        description="بديل الخشب PVC عالي الجودة بمقاس 290×20 سم. سعر اللوح 22 ريال شامل الضريبة. التركيب 25 ريال لكل متر طولي. توصيل داخل الرياض + خيار توريد أو توريد + تركيب بإشراف مقاول."
        canonical="https://pybcco.com/decor/wood"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productItemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
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
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-800">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/decor" className="hover:text-gray-800">المتجر</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold">بديل الخشب</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">بديل الخشب (PVC)</h1>
              <p className="text-gray-600 mt-2 leading-relaxed">
                لوح ديكور يحاكي الخشب الطبيعي بدقة عالية، مناسب للصالات والغرف والمداخل وخلف الشاشات.
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <span className="font-bold">ضمان:</span> {WARRANTY} •{" "}
                <span className="font-bold">المقاس:</span> {DIMENSIONS} •{" "}
                <span className="font-bold">متوفر داخل الرياض</span>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                ملاحظة: <span className="font-bold">التركيب يُحسب بالمتر الطولي</span> (مثال: تركيب 2م = 50 ريال).
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
              <div className="text-xs text-gray-500">التركيب (يُضاف على المتر الطولي)</div>
              <div className="text-xl font-extrabold mt-1">{INSTALL_PER_METER_SAR} ريال/م ط</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">المقاس</div>
              <div className="text-xl font-extrabold mt-1">{DIMENSIONS}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">الضمان</div>
              <div className="text-base font-extrabold mt-1 leading-snug">{WARRANTY}</div>
            </div>
          </div>

          {/* Quality bullets */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 mb-10">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">مواصفات الجودة</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              {[
                `الخامة: ${MATERIAL} (${ORIGIN})`,
                "مقاوم للرطوبة والخدوش",
                "تنظيف سهل (مسح فقط)",
                "تركيب بالسيلكون بدون مسامير",
                "مناسب للغرف والصالونات والمداخل وخلف الشاشات",
                "ثبات لون وملمس مع طبقة حماية سطحية",
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
              const allImgs = candidates(
                ...p.mainCandidates,
                ...(p.extraCandidates || [])
              );

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
                          {p.code}
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
                        <div className="text-lg font-extrabold">{INSTALL_PER_METER_SAR} ريال/م ط</div>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-gray-500">
                      * التركيب يُحسب بالمتر الطولي من اللوح.
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

                    {/* Thumbs/Extras */}
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
            <h2 className="text-2xl font-extrabold text-gray-900">أسئلة شائعة عن بديل الخشب</h2>
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