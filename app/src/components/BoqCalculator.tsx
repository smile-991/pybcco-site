import { useEffect, useMemo, useRef, useState } from "react";
import { BOQ_UNIFIED, type BoqItem } from "@/data/boqUnified";
import { Button } from "@/components/ui/button";

type Level = "commercial" | "standard" | "luxury";

const LEVEL_FACTOR: Record<Level, number> = {
  commercial: 0.9, // -10%
  standard: 1.0, // baseline
  luxury: 1.15, // +15%
};

const WA_NUMBER = "966550604837"; // رقم واتساب (بدون +)

function formatSAR(value: number) {
  return new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
}

function groupByCategory(items: BoqItem[]) {
  const map = new Map<string, BoqItem[]>();
  for (const it of items) {
    const key = it.category?.trim() || "غير مصنف";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  }
  return Array.from(map.entries()).map(([category, list]) => ({
    category,
    items: list,
  }));
}

// ✅ لا نخزّن amount نهائي حتى ما يضل ثابت عند تغيير المستوى
type CartLine = {
  name: string;
  unit: string;
  qty: number;
  basePrice: number;
};

export default function BoqCalculator({
  level,
  onTotalChange,
}: {
  level: Level;
  onTotalChange: (total: number) => void; // إجمالي البنود بالكامل
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [qtyByKey, setQtyByKey] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [showSummary, setShowSummary] = useState(false);

  // لتفعيل الإضافة التلقائية بدون تكرار مزعج أثناء الكتابة
  const timersRef = useRef<Record<string, number>>({});

  const factor = LEVEL_FACTOR[level];

  const grouped = useMemo(() => groupByCategory(BOQ_UNIFIED), []);
  const categories = useMemo(
    () => ["الكل", ...grouped.map((g) => g.category)],
    [grouped]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      activeCategory === "الكل"
        ? BOQ_UNIFIED
        : BOQ_UNIFIED.filter((x) => (x.category || "").trim() === activeCategory);

    if (!q) return base;
    return base.filter((x) => (x.name || "").toLowerCase().includes(q));
  }, [activeCategory, query]);

  const rows = useMemo(() => filtered, [filtered]);

  // للعرض تحت الحقل (Preview)
  const calcPreviewAmount = (item: BoqItem, qty: number) =>
    qty * item.basePrice * factor;

  // ✅ حساب مبلغ سطر من السلة حسب المستوى الحالي دائماً
  const calcLineAmount = (line: CartLine) => line.qty * line.basePrice * factor;

  const cartCount = useMemo(() => Object.keys(cart).length, [cart]);

  const cartTotal = useMemo(() => {
    return Object.values(cart).reduce((sum, x) => sum + calcLineAmount(x), 0);
  }, [cart, factor]);

  // ✅ أهم سطر: كل ما تغيّر level أو السلة → حدّث إجمالي الإضافات في الصفحة الأم
  useEffect(() => {
    onTotalChange(cartTotal);
  }, [cartTotal, onTotalChange]);

  // تنظيف التايمرز عند الخروج
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => window.clearTimeout(t));
      timersRef.current = {};
    };
  }, []);

  const buildWhatsAppText = () => {
    const levelText =
      level === "commercial" ? "تجاري" : level === "standard" ? "قياسي" : "فاخر";

    const lines = Object.values(cart)
      .sort((a, b) => a.name.localeCompare(b.name, "ar"))
      .map(
        (x) =>
          `- ${x.name} | الكمية: ${x.qty} ${x.unit} | الإجمالي: ${formatSAR(
            calcLineAmount(x)
          )} ريال`
      );

    return [
      "عرض سعر تقديري – بنيان الهرم للمقاولات (PYBCCO)",
      `المستوى: ${levelText}`,
      "",
      "البنود:",
      ...(lines.length ? lines : ["(لا يوجد بنود)"]),
      "",
      `إجمالي البنود: ${formatSAR(cartTotal)} ريال`,
    ].join("\n");
  };

  const waLink = useMemo(() => {
    const text = encodeURIComponent(buildWhatsAppText());
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }, [cart, cartTotal, level]);

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="text-lg font-bold">تفصيل البنود (اختياري)</div>
      </div>

      {/* Filters */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <div className="text-sm text-white/70 mb-2">القسم</div>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-3 outline-none focus:border-white/30"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-black">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <div className="text-sm text-white/70 mb-2">بحث عن بند</div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: جبس مقاوم للرطوبة / إنارة / انترلوك..."
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
          />
          <div className="mt-2 text-xs text-white/50">
            {filtered.length} بند مطابق • عرض {rows.length} بند
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="mt-5 rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 bg-black/40 px-3 py-2 text-xs text-white/70">
          <div className="col-span-7">البند</div>
          <div className="col-span-2">الوحدة</div>
          <div className="col-span-3">الكمية (تُضاف تلقائياً)</div>
        </div>

        {rows.map((it) => {
          const key = `${it.category}|${it.name}`;
          const qtyStr = qtyByKey[key] ?? "";
          const qty = Number(qtyStr) || 0;
          const amountPreview = qty > 0 ? calcPreviewAmount(it, qty) : 0;

          return (
            <div
              key={key}
              className="grid grid-cols-12 gap-2 px-3 py-3 border-t border-white/10 items-center"
            >
              <div className="col-span-7 text-sm leading-relaxed">{it.name}</div>
              <div className="col-span-2 text-xs text-white/70">{it.unit}</div>

              <div className="col-span-3">
                <input
                  value={qtyStr}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^\d.]/g, "");
                    setQtyByKey((s) => ({ ...s, [key]: clean }));

                    // ✅ إضافة تلقائية بعد توقّف المستخدم عن الكتابة 500ms
                    const prevTimer = timersRef.current[key];
                    if (prevTimer) window.clearTimeout(prevTimer);

                    timersRef.current[key] = window.setTimeout(() => {
                      const q = Number(clean) || 0;

                      setCart((prev) => {
                        const next = { ...prev };

                        if (q <= 0) {
                          delete next[key];
                        } else {
                          next[key] = {
                            name: it.name,
                            unit: it.unit,
                            qty: q,
                            basePrice: it.basePrice,
                          };
                        }

                        return next;
                      });
                    }, 500);
                  }}
                  inputMode="decimal"
                  placeholder="0"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
                />

                {amountPreview > 0 && (
                  <div className="mt-1 text-xs text-white/60">
                    تقديري لهذا البند:{" "}
                    <span className="text-gold font-bold">
                      {formatSAR(amountPreview)} ريال
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary controls */}
      <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Button
            className="bg-gold text-black font-bold"
            onClick={() => setShowSummary(true)}
          >
            احسب إجمالي البنود
          </Button>

          <div className="text-xs text-white/60">
            عدد البنود المضافة: <span className="font-bold">{cartCount}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="bg-white/10 border border-white/15 text-white hover:bg-white/15"
          onClick={() => {
            setCart({});
            setQtyByKey({});
            setShowSummary(false);
            onTotalChange(0);
          }}
        >
          تصفير البنود
        </Button>
      </div>

      {/* Summary output + WhatsApp */}
      {showSummary &&
        (cartCount > 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-lg font-bold">ملخص البنود المضافة</div>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
              >
                إرسال الملخص عبر واتساب
              </a>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-white/70">
                  <tr className="border-b border-white/10">
                    <th className="py-2 text-right">البند</th>
                    <th className="py-2 text-center">الكمية</th>
                    <th className="py-2 text-center">الوحدة</th>
                    <th className="py-2 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cart).map(([id, x]) => (
                    <tr key={id} className="border-b border-white/10">
                      <td className="py-2 text-right">{x.name}</td>
                      <td className="py-2 text-center">{x.qty}</td>
                      <td className="py-2 text-center text-white/70">{x.unit}</td>
                      <td className="py-2 text-left font-bold">
                        {formatSAR(calcLineAmount(x))} ريال
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-sm text-white/80">
              إجمالي جميع البنود:{" "}
              <span className="text-gold font-extrabold">
                {formatSAR(cartTotal)} ريال
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            ما أضفت أي بند بعد.
            <div className="mt-2 text-xs text-white/60">
              ✅ فقط اكتب الكمية داخل أي بند، وسيُضاف تلقائياً.
            </div>
          </div>
        ))}

      <div className="mt-3 text-xs text-white/60">
        ملاحظة: هذه البنود لتفصيل إضافي اختياري فوق “المقطوعية”. يمكن لاحقاً تحويلها إلى “حساب شامل”
        حسب نموذج العمل الذي تختاره.
      </div>
    </div>
  );
}
