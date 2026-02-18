import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import BoqCalculator from "@/components/BoqCalculator";

type WorkType = "finishing" | "bone";
type Level = "commercial" | "standard" | "luxury";

const PRICES_PER_M2: Record<WorkType, Record<Level, number>> = {
  finishing: { commercial: 450, standard: 550, luxury: 800 },
  bone: { commercial: 520, standard: 550, luxury: 600 },
};

function formatSAR(value: number) {
  return new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
}

export default function VillaFinishingPriceRiyadh() {
  useEffect(() => {
    document.title = "حاسبة تكلفة التشطيب بالرياض 2026 | بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "احسب تكلفة التشطيب التقديرية في الرياض 2026 عبر حاسبة تفاعلية حسب المساحة والمستوى ونوع العمل (تشطيب/عظم). الأسعار تقديرية وقد تختلف حسب المعاينة.";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const [workType, setWorkType] = useState<WorkType>("finishing");
  const [level, setLevel] = useState<Level>("standard");
  const [area, setArea] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const [extrasTotal, setExtrasTotal] = useState<number>(0);
  const [boqResetKey, setBoqResetKey] = useState(0);

  const areaNumber = useMemo(() => {
    const n = Number(area);
    if (!Number.isFinite(n)) return 0;
    return n;
  }, [area]);

  const canCalculate = areaNumber > 0;

  const baseTotal = useMemo(() => {
    if (!canCalculate) return 0;
    return areaNumber * PRICES_PER_M2[workType][level];
  }, [areaNumber, canCalculate, level, workType]);

  const grandTotal = useMemo(
    () => baseTotal + extrasTotal,
    [baseTotal, extrasTotal]
  );

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/images/VillaFinishingPriceRiyadh.jpg"
          alt="حاسبة تكلفة التشطيب بالرياض"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div
          className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 158, 11, 0.25), transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
            حاسبة تكلفة التشطيب بالرياض 2026
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            أدخل بيانات مشروعك واحصل على رقم تقديري سريع حسب المساحة والمستوى ونوع العمل —{" "}
            <span className="text-gold font-bold">بدون عرض سعر المتر</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => {
                const el = document.getElementById("calc");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              احسب الآن
            </Button>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="container mx-auto px-4 py-14">
        {/* ✅ فصلناها لقسمين واضحين */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* ✅ القسم الأساسي: المقطوعية */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/70">
                القسم الأساسي
              </div>

              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold">
                احسب <span className="text-gold">التكلفة التقديرية (للمقطوعة)</span>
              </h2>

              <p className="mt-3 text-white/70">
                اختر نوع العمل والمستوى، ثم أدخل المساحة واضغط “احسب”.
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("boq");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-white/60 hover:text-white underline underline-offset-4"
                >
                  عندك إضافات؟ انتقل للبنود التفصيلية ↓
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* نوع العمل */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">نوع العمل</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setWorkType("finishing");
                      setShowResult(false);
                    }}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm border ${
                      workType === "finishing"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    تشطيب
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWorkType("bone");
                      setShowResult(false);
                    }}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm border ${
                      workType === "bone"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    عظم
                  </button>
                </div>
              </div>

              {/* المستوى */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">المستوى</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLevel("commercial");
                      setShowResult(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm border ${
                      level === "commercial"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    تجاري
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLevel("standard");
                      setShowResult(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm border ${
                      level === "standard"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    قياسي
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLevel("luxury");
                      setShowResult(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm border ${
                      level === "luxury"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    فاخر
                  </button>
                </div>
              </div>

              {/* المساحة */}
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                <div className="text-sm text-white/70 mb-2">المساحة (م²)</div>
                <input
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value.replace(/[^\d.]/g, ""));
                    setShowResult(false);
                  }}
                  inputMode="decimal"
                  placeholder="مثال: 350"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                />
                {!canCalculate && area.length > 0 && (
                  <div className="mt-2 text-xs text-red-300">
                    أدخل مساحة صحيحة أكبر من صفر.
                  </div>
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/60">إجمالي المقطوعية</div>
                <div className="mt-1 text-lg font-extrabold">
                  {formatSAR(baseTotal)} ريال
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/60">إضافات البنود</div>
                <div className="mt-1 text-lg font-extrabold">
                  {formatSAR(extrasTotal)} ريال
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/60">الإجمالي النهائي</div>
                <div className="mt-1 text-lg font-extrabold text-gold">
                  {formatSAR(grandTotal)} ريال
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <Button
                className="w-full md:w-auto bg-gold text-black font-bold"
                onClick={() => setShowResult(true)}
                disabled={!canCalculate}
              >
                احسب التكلفة التقديرية
              </Button>

              <div className="text-xs text-white/60">
                الأسعار تقديرية وقد تختلف حسب الموقع والمعاينة النهائية.
              </div>
            </div>

            {showResult && canCalculate && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5">
                <div className="text-sm text-white/70">
                  النتيجة النهائية التقديرية
                </div>
                <div className="mt-2 text-3xl md:text-4xl font-extrabold">
                  {formatSAR(grandTotal)}{" "}
                  <span className="text-lg font-semibold text-white/80">
                    ريال
                  </span>
                </div>

                {extrasTotal > 0 && (
                  <div className="mt-2 text-xs text-white/60">
                    (يشمل إضافات البنود: {formatSAR(extrasTotal)} ريال)
                  </div>
                )}

                <div className="mt-4 text-xs text-white/60 leading-relaxed">
                  * الرقم أعلاه تقديري ويعتمد على البيانات المُدخلة فقط. السعر النهائي يُحدد بعد المعاينة.
                </div>

                <div className="mt-5 flex flex-col md:flex-row gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                  >
                    اطلب معاينة / تواصل معنا
                  </a>
                  <a
                    href="https://wa.me/966550604837"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    واتساب مباشر
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Divider واضح */}
          <div className="flex items-center gap-3 px-1">
            <div className="h-px flex-1 bg-white/10" />
            <div className="text-xs text-white/60">
              قسم منفصل: البنود التفصيلية (اختياري)
            </div>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* ✅ قسم البنود التفصيلية */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7"
            id="boq"
          >
            <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/70">
                  اختياري
                </div>
                <div className="mt-2 text-xl font-extrabold">
                  بنود تفصيلية وإضافات فوق المقطوعية
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={() => {
                  setExtrasTotal(0);
                  setBoqResetKey((k) => k + 1); // remount BoqCalculator (clears summary + inputs)
                  setShowResult(true);
                }}
                className="bg-white/10 border border-white/15 text-white hover:bg-white/15"
              >
                تصفير إضافات البنود
              </Button>
            </div>

            <div className="mt-5">
              <BoqCalculator
                key={boqResetKey}
                level={level}
                onTotalChange={(total) => {
                  setExtrasTotal(total);
                  setShowResult(true);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRICE DETAILS */}
      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl font-bold text-gold mb-4">
          ما الذي يؤثر على تكلفة التشطيب؟
        </h2>

        <ul className="space-y-3 text-white/80">
          <li>✔️ نوع الأرضيات (بورسلان – رخام – باركيه)</li>
          <li>✔️ نوع الدهانات والعزل</li>
          <li>✔️ مستوى الأسقف الجبسية والإضاءة</li>
          <li>✔️ عدد دورات المياه والمطابخ</li>
          <li>✔️ مستوى التشطيب المطلوب</li>
        </ul>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صفحات مهمة <span className="text-gold">لخدماتنا</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          إذا بدك تشطيب أو ترميم أو بناء عظم في الرياض، تفضل صفحاتنا التالية:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "مقاول ترميم منازل بالرياض", href: "/home-renovation-company-riyadh" },
          ].map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-1 text-white/70 text-sm">اضغط لعرض التفاصيل</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
