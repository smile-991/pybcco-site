import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Calculator, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

type Product = {
  id: string;          // مثل N006 أو F1
  name: string;        // اسم يظهر للعميل
  code: string;        // كود داخلي
  main: string;        // صورة أساسية
  thumb?: string;      // صورة مصغرة (اختياري)
  second?: string;     // صورة ثانية (اختياري)
};

const WHATSAPP =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent("السلام عليكم، أريد الاستفسار عن بديل الخشب (لوح 290×20) + التركيب.");

const PRICE_BOARD_SAR = 22; // شامل الضريبة
const INSTALL_BOARD_SAR = 25; // شامل الضريبة
const DIMENSIONS = "290 × 20 سم";
const MATERIAL = "PVC عالي الكثافة";
const ORIGIN = "صناعة صينية ممتازة";
const WARRANTY = "5 سنوات ضد عيوب التصنيع وتغيّر اللون";

function Img({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
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
      onError={() => setFailed(true)}
    />
  );
}

export default function DecorWood() {
  const products: Product[] = useMemo(
    () => [
      // ===== N Series (الأساسي: اللي ما فيه 150) =====
      { id: "N002", name: "بديل الخشب – N002", code: "N002", main: "/decor/wood/N002-150-768x768.webp", thumb: "/decor/wood/N002-1-768x768.webp" },
      { id: "N003", name: "بديل الخشب – N003", code: "N003", main: "/decor/wood/N003-768x768.webp", thumb: "/decor/wood/N003-150-768x768.webp" },
      { id: "N004", name: "بديل الخشب – N004", code: "N004", main: "/decor/wood/N004-768x768.webp", thumb: "/decor/wood/N004-150-768x768.webp" },
      { id: "N005", name: "بديل الخشب – N005", code: "N005", main: "/decor/wood/N005-683x1024.webp", thumb: "/decor/wood/N005-150-768x768.webp" },
      { id: "N006", name: "بديل الخشب – N006 (أسود)", code: "N006", main: "/decor/wood/N006-683x1024.webp", thumb: "/decor/wood/N006-150-768x768.webp" },
      { id: "N007", name: "بديل الخشب – N007", code: "N007", main: "/decor/wood/N007-768x768.webp", thumb: "/decor/wood/N007-150-768x768.webp" },
      { id: "N008", name: "بديل الخشب – N008", code: "N008", main: "/decor/wood/N008-683x1024.webp", thumb: "/decor/wood/N008-150-768x768.webp" },
      { id: "N009", name: "بديل الخشب – N009", code: "N009", main: "/decor/wood/N009-768x768.webp", thumb: "/decor/wood/N009-150-768x768.webp" },
      { id: "N010", name: "بديل الخشب – N010", code: "N010", main: "/decor/wood/N010-768x768.webp", thumb: "/decor/wood/N010-150-768x768.webp" },
      { id: "N011", name: "بديل الخشب – N011", code: "N011", main: "/decor/wood/N011-768x768.webp", thumb: "/decor/wood/N011-150-768x768.webp" },
      { id: "N012", name: "بديل الخشب – N012", code: "N012", main: "/decor/wood/N012-683x1024.webp", thumb: "/decor/wood/N012-150-768x768.webp" },
      { id: "N013", name: "بديل الخشب – N013", code: "N013", main: "/decor/wood/N013-683x1024.webp", thumb: "/decor/wood/N013-150-768x768.webp" },
      { id: "N014", name: "بديل الخشب – N014", code: "N014", main: "/decor/wood/N014-768x768.webp", thumb: "/decor/wood/N014-150-768x768.webp" },
      { id: "N015", name: "بديل الخشب – N015", code: "N015", main: "/decor/wood/N015-683x1024.webp", thumb: "/decor/wood/N015-150-768x768.webp" },
      { id: "N016", name: "بديل الخشب – N016", code: "N016", main: "/decor/wood/N016-683x1024.webp", thumb: "/decor/wood/N016-150-768x768.webp" },
      { id: "N017", name: "بديل الخشب – N017", code: "N017", main: "/decor/wood/N017-768x512.webp", thumb: "/decor/wood/N017-150-768x768.webp" },
      { id: "N018", name: "بديل الخشب – N018", code: "N018", main: "/decor/wood/N018-683x1024.webp", thumb: "/decor/wood/N018-150-768x768.webp" },

      // ===== F Series (B هو الأساسي) =====
      { id: "F1", name: "بديل الخشب – F1", code: "F1", main: "/decor/wood/F1B.webp", second: "/decor/wood/F1A.webp" },
      { id: "F2", name: "بديل الخشب – F2", code: "F2", main: "/decor/wood/F2B.webp", second: "/decor/wood/F2A.webp" },
      { id: "F3", name: "بديل الخشب – F3", code: "F3", main: "/decor/wood/F3B.webp", second: "/decor/wood/F3A.webp" },
      { id: "F4", name: "بديل الخشب – F4", code: "F4", main: "/decor/wood/F4B.webp", second: "/decor/wood/F4A.webp" },
      { id: "F5", name: "بديل الخشب – F5", code: "F5", main: "/decor/wood/F5B.webp", second: "/decor/wood/F5A.webp" },
      { id: "F6", name: "بديل الخشب – F6", code: "F6", main: "/decor/wood/F6B.webp", second: "/decor/wood/F6A.webp" },
      { id: "F7", name: "بديل الخشب – F7", code: "F7", main: "/decor/wood/F7B.webp", second: "/decor/wood/F7A.webp" },
      { id: "F8", name: "بديل الخشب – F8", code: "F8", main: "/decor/wood/F8B.webp", second: "/decor/wood/F8A.webp" },
    ],
    []
  );

  return (
    <>
      <SeoHead
        title="متجر الديكور – بديل الخشب | بنيان الهرم للمقاولات (PYBCCO)"
        description="بديل الخشب PVC عالي الجودة بمقاس 290×20 سم. سعر اللوح 22 ريال شامل الضريبة، وسعر التركيب 25 ريال شامل الضريبة."
        canonical="https://pybcco.com/decor/wood"
      />

      <main className="pt-28 pb-16">
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
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">سعر اللوح (شامل الضريبة)</div>
              <div className="text-xl font-extrabold mt-1">{PRICE_BOARD_SAR} ريال</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">سعر التركيب (شامل الضريبة)</div>
              <div className="text-xl font-extrabold mt-1">{INSTALL_BOARD_SAR} ريال</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">المقاس</div>
              <div className="text-xl font-extrabold mt-1">{DIMENSIONS}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">الضمان</div>
              <div className="text-xl font-extrabold mt-1">{WARRANTY}</div>
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
            {products.map((p) => (
              <article key={p.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                <div className="aspect-[4/3] bg-gray-100">
                  <Img
                    src={p.main}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-extrabold text-gray-900">{p.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-gray-700 whitespace-nowrap">
                      {p.code}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    المقاس: {DIMENSIONS}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="text-xs text-gray-500">سعر اللوح</div>
                      <div className="text-lg font-extrabold">{PRICE_BOARD_SAR} ريال</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">التركيب</div>
                      <div className="text-lg font-extrabold">{INSTALL_BOARD_SAR} ريال</div>
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

                  {(p.thumb || p.second) && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {p.thumb && (
                        <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                          <Img src={p.thumb} alt={`${p.name} - صورة إضافية`} className="w-full h-full object-cover" />
                        </div>
                      )}
                      {p.second && (
                        <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                          <Img src={p.second} alt={`${p.name} - صورة إضافية`} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}