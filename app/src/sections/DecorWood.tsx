import { useMemo, useState } from "react";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

type OrderType = "supply" | "supply_install";

type Product = {
  code: string;          // مثل N006
  title: string;         // مثل بديل خشب PVC - لون أسود (اختياري)
  imgMain: string;       // صورة اللوح / أوضح صورة للمنتج
  imgScene: string;      // صورة التطبيق/الغرفة
};

const WA_NUMBER = "966550604837";

const PRICE_SAR = 22; // شامل الضريبة
const INSTALL_SAR = 25; // تركيب/لوح
const SIZE_TEXT = "290×20 سم";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function DecorWood() {
  // ✅ عدّل القائمة حسب أسماء صورك الفعلية (صورتين لكل منتج)
  const PRODUCTS: Product[] = [
  // N000 (استثناء: الأساسي فيه -1- حسب كلامك)
  {
    code: "N000",
    title: "بديل خشب PVC",
    imgMain: "/decor/wood/N000-1-150-10-768x768.webp",
    imgScene: "/decor/wood/N000-150-10-768x768.webp",
  },

  // من N001 إلى N018: الأساسي = بدون 150
  { code: "N001", title: "بديل خشب PVC", imgMain: "/decor/wood/N001-768x768.webp", imgScene: "/decor/wood/N001-150-768x768.webp" },

  { code: "N002", title: "بديل خشب PVC", imgMain: "/decor/wood/N002-1-768x768.webp", imgScene: "/decor/wood/N002-150-768x768.webp" },

  { code: "N003", title: "بديل خشب PVC", imgMain: "/decor/wood/N003-768x768.webp", imgScene: "/decor/wood/N003-150-768x768.webp" },

  { code: "N004", title: "بديل خشب PVC", imgMain: "/decor/wood/N004-768x768.webp", imgScene: "/decor/wood/N004-150-768x768.webp" },

  { code: "N005", title: "بديل خشب PVC", imgMain: "/decor/wood/N005-683x1024.webp", imgScene: "/decor/wood/N005-150-768x768.webp" },

  { code: "N006", title: "بديل خشب PVC", imgMain: "/decor/wood/N006-683x1024.webp", imgScene: "/decor/wood/N006-150-768x768.webp" },

  { code: "N007", title: "بديل خشب PVC", imgMain: "/decor/wood/N007-768x768.webp", imgScene: "/decor/wood/N007-150-768x768.webp" },

  { code: "N008", title: "بديل خشب PVC", imgMain: "/decor/wood/N008-683x1024.webp", imgScene: "/decor/wood/N008-150-768x768.webp" },

  { code: "N009", title: "بديل خشب PVC", imgMain: "/decor/wood/N009-768x768.webp", imgScene: "/decor/wood/N009-150-768x768.webp" },

  { code: "N010", title: "بديل خشب PVC", imgMain: "/decor/wood/N010-768x768.webp", imgScene: "/decor/wood/N010-150-768x768.webp" },

  { code: "N011", title: "بديل خشب PVC", imgMain: "/decor/wood/N011-768x768.webp", imgScene: "/decor/wood/N011-150-768x768.webp" },

  { code: "N012", title: "بديل خشب PVC", imgMain: "/decor/wood/N012-683x1024.webp", imgScene: "/decor/wood/N012-150-768x768.webp" },

  { code: "N013", title: "بديل خشب PVC", imgMain: "/decor/wood/N013-683x1024.webp", imgScene: "/decor/wood/N013-150-768x768.webp" },

  { code: "N014", title: "بديل خشب PVC", imgMain: "/decor/wood/N014-768x768.webp", imgScene: "/decor/wood/N014-150-768x768.webp" },

  { code: "N015", title: "بديل خشب PVC", imgMain: "/decor/wood/N015-683x1024.webp", imgScene: "/decor/wood/N015-150-768x768.webp" },

  { code: "N016", title: "بديل خشب PVC", imgMain: "/decor/wood/N016-683x1024.webp", imgScene: "/decor/wood/N016-150-768x768.webp" },

  { code: "N017", title: "بديل خشب PVC", imgMain: "/decor/wood/N017-768x512.webp", imgScene: "/decor/wood/N017-150-768x768.webp" },

  { code: "N018", title: "بديل خشب PVC", imgMain: "/decor/wood/N018-683x1024.webp", imgScene: "/decor/wood/N018-150-768x768.webp" },

  // ===== F series =====
  // F006 واضح: بدون 150 = أساسي
  { code: "F006", title: "بديل خشب PVC", imgMain: "/decor/wood/F006-768x768.webp", imgScene: "/decor/wood/F006-150-768x768.webp" },

  // F008-16 واضح
  { code: "F008-16", title: "بديل خشب PVC", imgMain: "/decor/wood/F008-16-768x768.webp", imgScene: "/decor/wood/F008-16-150-768x768.webp" },

  // F025 واضح
  { code: "F025", title: "بديل خشب PVC", imgMain: "/decor/wood/F025-683x1024.webp", imgScene: "/decor/wood/F025-150-683x1024.webp" },

  // F029 واضح
  { code: "F029", title: "بديل خشب PVC", imgMain: "/decor/wood/F029-683x1024.webp", imgScene: "/decor/wood/F029-150-768x768.webp" },

  // F0 و F011: عندك الملفين الاثنين فيهم 150 (ما في “بدون 150”) → ما في طريقة آمنة نعرف الأساسي.
  // رح أضعهم مؤقتًا كما هم، وأفضل حل: تعيد تسميتهم لتحديد main/scene.
  { code: "F0", title: "بديل خشب PVC", imgMain: "/decor/wood/F0-150-156-768x768.webp", imgScene: "/decor/wood/F0-156-150-768x768.webp" },

  { code: "F011", title: "بديل خشب PVC", imgMain: "/decor/wood/F011-8-150-768x768.webp", imgScene: "/decor/wood/F011-150-8-768x768.webp" },
];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);

  const [qty, setQty] = useState<number>(10);
  const [orderType, setOrderType] = useState<OrderType>("supply");

  const total = useMemo(() => {
    const supply = qty * PRICE_SAR;
    const install = orderType === "supply_install" ? qty * INSTALL_SAR : 0;
    return supply + install;
  }, [qty, orderType]);

  const openModal = (p: Product) => {
    setActive(p);
    setQty(10);
    setOrderType("supply");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

  const message = useMemo(() => {
    if (!active) return "";
    const typeText = orderType === "supply" ? "توريد فقط" : "توريد + تركيب";
    const base =
      `السلام عليكم، أريد بديل خشب PVC (كود ${active.code}).\n` +
      `الكمية: ${qty} لوح.\n` +
      `الطلب: ${typeText}.\n` +
      `المقاس: ${SIZE_TEXT}.\n` +
      `السعر: ${PRICE_SAR} ريال/لوح (شامل الضريبة).\n` +
      `التركيب: ${INSTALL_SAR} ريال/لوح.\n` +
      `الموقع: الرياض.\n` +
      `فضلاً أرسلوا لي المدة المتاحة للتوريد/التركيب.`;
    return base;
  }, [active, qty, orderType]);

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="بديل الخشب بالرياض | المتجر - بنيان الهرم للمقاولات"
        description="بديل خشب PVC بالرياض — مقاس 290×20 سم — 22 ريال/لوح شامل الضريبة — تركيب 25 ريال/لوح — طلب سريع عبر واتساب."
        canonical="https://pybcco.com/decor/wood"
      />

      {/* Hero */}
      <section className="pt-28 pb-10">
        <div className="container-custom">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              بديل الخشب (PVC) بالرياض
            </h1>
            <p className="text-gray-600 max-w-3xl leading-relaxed">
              ألواح بديل خشب بمظهر فاخر ومتانة عالية — مناسبة للجدران الداخلية وخلف الشاشات والمداخل.
              <span className="font-semibold text-gray-900"> الأسعار واضحة</span> وطلب سريع عبر واتساب، مع خيار{" "}
              <span className="font-semibold text-gray-900">توريد + تركيب بإشراف مقاول</span>.
            </p>

            {/* Trust Bar */}
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm text-gray-500">السعر</div>
                <div className="font-bold text-gray-900">{PRICE_SAR} ريال/لوح</div>
                <div className="text-xs text-gray-500 mt-1">شامل الضريبة</div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm text-gray-500">التركيب</div>
                <div className="font-bold text-gray-900">{INSTALL_SAR} ريال/لوح</div>
                <div className="text-xs text-gray-500 mt-1">عند الطلب</div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm text-gray-500">المقاس</div>
                <div className="font-bold text-gray-900">{SIZE_TEXT}</div>
                <div className="text-xs text-gray-500 mt-1">لكل الألوان</div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="text-sm text-gray-500">الضمان</div>
                <div className="font-bold text-gray-900">5 سنوات</div>
                <div className="text-xs text-gray-500 mt-1">ضد عيوب التصنيع وتغيّر اللون</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">كل الألوان المتوفرة</h2>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              اضغط على أي منتج للتفاصيل والطلب
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRODUCTS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => openModal(p)}
                className="text-right rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition bg-white"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img
                    src={p.imgMain}
                    alt={`بديل خشب PVC ${p.code}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-bold text-gray-900">بديل خشب PVC</div>
                    <div className="text-xs text-gray-500">{p.code}</div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="font-extrabold text-gray-900">
                      {PRICE_SAR} ر.س <span className="text-xs text-gray-500 font-normal">/ لوح (شامل)</span>
                    </div>
                    <div className="text-xs text-gray-500">{SIZE_TEXT}</div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    تركيب متوفر: <span className="font-semibold text-gray-800">{INSTALL_SAR} ر.س/لوح</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA bottom */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between rounded-2xl border border-gray-200 p-5">
            <div>
              <div className="font-bold text-gray-900">تريد توريد + تركيب لمشروع كامل؟</div>
              <div className="text-sm text-gray-600 mt-1">
                ارسل لنا المساحة أو عدد الألواح وسنرجع لك بتأكيد الكميات والموعد.
              </div>
            </div>

            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-black font-bold whitespace-nowrap"
            >
              <a href={waLink("السلام عليكم، أريد عرض سعر بديل خشب (توريد أو توريد + تركيب) بالرياض.")} target="_blank" rel="noopener noreferrer">
                طلب عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && active && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <div className="font-extrabold text-gray-900">بديل خشب PVC — {active.code}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {PRICE_SAR} ريال/لوح (شامل الضريبة) — تركيب {INSTALL_SAR} ريال/لوح — {SIZE_TEXT}
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-2">
              {/* Images */}
              <div className="bg-gray-50 p-4">
                <div className="grid gap-3">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                    <img
                      src={active.imgMain}
                      alt={`بديل خشب ${active.code} - المنتج`}
                      className="w-full h-[280px] object-cover"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                    <img
                      src={active.imgScene}
                      alt={`بديل خشب ${active.code} - تطبيق`}
                      className="w-full h-[280px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Order */}
              <div className="p-5">
                <div className="font-bold text-gray-900 text-lg">طلب سريع</div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  اختر نوع الطلب وأدخل الكمية (بعدد الألواح). سيتم إرسال رسالة جاهزة عبر واتساب.
                </p>

                <div className="mt-5 grid gap-4">
                  {/* Order Type */}
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-3">نوع الطلب</div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="orderType"
                          checked={orderType === "supply"}
                          onChange={() => setOrderType("supply")}
                        />
                        <span className="text-sm text-gray-800">توريد فقط</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="orderType"
                          checked={orderType === "supply_install"}
                          onChange={() => setOrderType("supply_install")}
                        />
                        <span className="text-sm text-gray-800">توريد + تركيب</span>
                      </label>
                    </div>
                  </div>

                  {/* Qty */}
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-3">الكمية (لوح)</div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                        className="w-28 rounded-xl border border-gray-200 px-3 py-2 text-gray-900"
                      />
                      <div className="text-sm text-gray-600">لوح</div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900 mb-1">تقدير سريع</div>
                    <div className="text-sm text-gray-600">
                      توريد: {qty} × {PRICE_SAR} = <span className="font-bold text-gray-900">{qty * PRICE_SAR} ر.س</span>
                    </div>
                    {orderType === "supply_install" && (
                      <div className="text-sm text-gray-600 mt-1">
                        تركيب: {qty} × {INSTALL_SAR} = <span className="font-bold text-gray-900">{qty * INSTALL_SAR} ر.س</span>
                      </div>
                    )}
                    <div className="mt-2 text-lg font-extrabold text-gray-900">
                      الإجمالي: {total} ر.س
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gold hover:bg-gold/90 text-black font-bold whitespace-nowrap"
                  >
                    <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
                      إرسال الطلب عبر واتساب
                    </a>
                  </Button>

                  <div className="text-xs text-gray-500 leading-relaxed">
                    * الأسعار المعروضة شاملة ضريبة القيمة المضافة.  
                    * التوريد داخل الرياض، وموعد التركيب حسب الجدولة وتأكيد الموقع.
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t bg-white">
              <div className="text-sm text-gray-600">
                استخدامات مقترحة: غرف النوم — خلف الشاشات — المداخل — الصالات — المطاعم والمقاهي — الأعمدة.
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}