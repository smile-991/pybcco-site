import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import BoqCalculator from "@/components/BoqCalculator";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

type WorkType = "finishing" | "bone";
type Level = "commercial" | "standard" | "luxury";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type SavedEstimateItem = {
  title: string;
  quantity: number;
  unit: string;
  total: number;
};

const ACTIVATED_USER_STORAGE_KEY = "pybcco_activated_user";

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
  const title = "حاسبة تكلفة التشطيب التفصيلية بالرياض 2026 | بنيان الهرم";
  const description =
    "احسب تكلفة التشطيب التفصيلية في الرياض 2026 عبر حاسبة تفاعلية تعتمد على البنود والكميات والإضافات، مع حفظ التقدير وطباعة PDF وطلب عرض سعر مباشر.";
  const canonical = "https://pybcco.com/villa-finishing-price-riyadh";
  const lumpsumCalculatorUrl = "PASTE_NEW_LUMPSUM_URL_HERE";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم سعر تشطيب المتر في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "سعر تشطيب المتر في الرياض يبدأ من 450 ريال للمستوى التجاري ويصل إلى 800 ريال للمستوى الفاخر حسب نوع المواد ونطاق العمل.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأسعار في الحاسبة نهائية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الأسعار تقديرية لتكوين تصور واضح، ويتم اعتماد السعر النهائي بعد المعاينة وتثبيت نطاق العمل والمواد.",
        },
      },
      {
        "@type": "Question",
        name: "هل السعر شامل المواد والعمالة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الحاسبة التفصيلية الحالية مخصصة لتقدير البنود والكميات والإضافات، أما السعر النهائي وشمولية المواد والعمالة فيتم تثبيتهما بعد المعاينة واعتماد نطاق العمل.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين التشطيب التجاري والقياسي والفاخر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الفرق يكون في جودة المواد وتفاصيل التنفيذ ونوعية التشطيبات والإكسسوارات، وكل مستوى يناسب ميزانية مختلفة.",
        },
      },
      {
        "@type": "Question",
        name: "كم مدة تشطيب فيلا في الرياض عادة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "مدة تشطيب الفيلا غالباً تتراوح بين 4 إلى 12 أسبوع حسب المساحة ونوع التشطيب وتوفر المواد.",
        },
      },
      {
        "@type": "Question",
        name: "هل تقدمون معاينة مجانية داخل الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، نوفر معاينة مجانية داخل مدينة الرياض لتقييم المشروع وتحديد السعر النهائي بدقة.",
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "حاسبة تكلفة التشطيب التفصيلية بالرياض 2026",
    url: canonical,
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة تكلفة التشطيب التفصيلية بالرياض 2026",
    url: canonical,
    applicationCategory: "Calculator",
    operatingSystem: "All",
    description:
      "حاسبة مجانية لتقدير تكلفة التشطيب التفصيلية في الرياض مع إمكانية إضافة البنود والكميات وحساب الإجمالي النهائي.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SAR",
    },
  };

  const [workType] = useState<WorkType>("finishing");
  const [level] = useState<Level>("standard");
  const [area] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const [extrasTotal, setExtrasTotal] = useState<number>(0);
  const [boqResetKey, setBoqResetKey] = useState(0);

  const [activatedUser, setActivatedUser] = useState<ActivatedUser | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [boqItems, setBoqItems] = useState<SavedEstimateItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ACTIVATED_USER_STORAGE_KEY);

      if (!raw) {
        setActivatedUser(null);
        return;
      }

      const parsed = JSON.parse(raw) as ActivatedUser;

      if (parsed?.phone) {
        setActivatedUser(parsed);
      } else {
        setActivatedUser(null);
      }
    } catch {
      setActivatedUser(null);
    }
  }, []);

  const areaNumber = useMemo(() => {
    const n = Number(area);
    if (!Number.isFinite(n)) return 0;
    return n;
  }, [area]);

  const baseTotal = 0;

  const grandTotal = useMemo(() => extrasTotal, [extrasTotal]);

  const levelLabel =
    level === "commercial" ? "تجاري" : level === "standard" ? "قياسي" : "فاخر";

  const workLabel = workType === "finishing" ? "تشطيب" : "عظم";

  const itemsForSaving = useMemo(() => {
    return boqItems
      .map((item) => ({
        title: String(item?.title || "").trim(),
        quantity: Number(item?.quantity || 0),
        unit: String(item?.unit || "").trim(),
        total: Number(item?.total || 0),
      }))
      .filter((item) => item.title && item.total > 0);
  }, [boqItems]);

  const waText = encodeURIComponent(
    `السلام عليكم، أريد عرض سعر من بنيان الهرم (PYBCCO).\n` +
      `نوع العمل: ${workLabel}\n` +
      `المستوى: ${levelLabel}\n` +
      `المساحة المرجعية: ${areaNumber || 0} م²\n` +
      `إجمالي البنود التفصيلية: ${formatSAR(extrasTotal)} ريال\n` +
      `الإجمالي الحالي: ${formatSAR(grandTotal)} ريال\n` +
      `رابط الحاسبة: ${canonical}`
  );

  const waLink = `https://wa.me/966550604837?text=${waText}`;

  const handleSaveEstimate = async () => {
    setSaveMessage("");

    if (!activatedUser?.phone) {
      setSaveMessage("يجب تفعيل الحساب أولًا حتى تتمكن من حفظ التقدير.");
      return;
    }

    if (grandTotal <= 0) {
      setSaveMessage("أدخل بيانات صحيحة أولًا قبل حفظ التقدير.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/save-calculator-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: activatedUser.phone,
          area: areaNumber,
          finishing_level: level,
          estimated_cost: grandTotal,
          grand_total: grandTotal,
          work_type: workType,
          extras_total: extrasTotal,
          base_total: baseTotal,
          items_json: itemsForSaving,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setSaveMessage(data?.error || "تعذر حفظ التقدير.");
        return;
      }

      setSaveMessage("تم حفظ التقدير داخل حسابك بنجاح.");
    } catch {
      setSaveMessage("حدث خطأ في الاتصال أثناء الحفظ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage="https://pybcco.com/images/VillaFinishingPriceRiyadh.webp"
        jsonLd={[webPageSchema, webApplicationSchema, faqSchema]}
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/images/VillaFinishingPriceRiyadh.webp"
          alt="حاسبة تكلفة التشطيب التفصيلية بالرياض"
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
            حاسبة تكلفة التشطيب التفصيلية بالرياض 2026
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            استخدم الحاسبة التفصيلية لإضافة البنود والكميات وحساب تكلفة التشطيب بشكل
            أوضح، وإذا كنت تبحث عن{" "}
            <span className="text-gold font-bold">حساب مقطوعي سريع</span> للمشروع
            بالكامل فستجده في الصفحة المخصصة لذلك.
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

      <section id="calc" className="container mx-auto px-4 py-14">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 md:p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-sm md:text-base font-bold text-gold">
                  تريد حسابًا مقطوعيًا سريعًا للمشروع بالكامل؟
                </div>
                <div className="mt-1 text-sm text-white/75 leading-7">
                  هذه الصفحة مخصصة للحساب التفصيلي حسب البنود والكميات. أما إذا كنت
                  تريد تقديرًا سريعًا لمشروع كامل، فانتقل إلى حاسبة المقطوعية.
                </div>
              </div>

              <a
                href={lumpsumCalculatorUrl}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition"
              >
                فتح حاسبة المقطوعية
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7"
            id="boq"
          >
            <div className="md:hidden">
              <div className="text-center mb-4">
                <div className="text-xl font-extrabold">
                  البنود التفصيلية <span className="text-gold">(اختياري)</span>
                </div>
                <div className="mt-2 text-xs text-white/60">
                  أدخل الكميات المطلوبة لكل بند لتحصل على تقدير تفصيلي أوضح لتكلفة
                  مشروعك.
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={() => {
                  setExtrasTotal(0);
                  setBoqItems([]);
                  setBoqResetKey((k) => k + 1);
                  setShowResult(true);
                }}
                className="w-full bg-white/10 border border-white/15 text-white hover:bg-white/15"
              >
                تصفير إضافات البنود
              </Button>

              <div className="mt-5">
                <BoqCalculator
                  key={boqResetKey}
                  level={level}
                  onTotalChange={(total) => {
                    setExtrasTotal(total);
                    setShowResult(true);
                  }}
                  onItemsChange={(items) => {
                    setBoqItems(items);
                  }}
                />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/70">
                    اختياري
                  </div>
                  <div className="mt-2 text-xl font-extrabold">
                    احسب تكلفة التشطيب التفصيلية حسب البنود والكميات
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    أدخل الكميات المطلوبة لكل بند لتحصل على تقدير تفصيلي أوضح لتكلفة
                    مشروعك.
                  </div>
                </div>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setExtrasTotal(0);
                    setBoqItems([]);
                    setBoqResetKey((k) => k + 1);
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
                  onItemsChange={(items) => {
                    setBoqItems(items);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {(showResult || extrasTotal > 0) && (
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5 md:p-6">
              <div className="text-base md:text-lg font-extrabold text-gold">
                احفظ هذا التقدير داخل حسابك
              </div>

              <p className="mt-2 text-sm md:text-base text-white/85 leading-8">
                للاستفادة من <span className="font-bold text-gold">حفظ التقدير</span>{" "}
                داخل حسابك، والحصول على{" "}
                <span className="font-bold text-gold">خصم خاص</span> وميزة{" "}
                <span className="font-bold text-gold">ضمان أعمال إضافي</span> عند
                بدء التنفيذ، احفظ التقدير مباشرة إذا كنت مسجلًا، أو أنشئ حسابًا
                جديدًا.
              </p>

              <div className="mt-4 flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSaveEstimate}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition disabled:opacity-60"
                >
                  {saving ? "جاري حفظ التقدير..." : "حفظ التقدير داخل حسابي"}
                </button>

                {!activatedUser?.phone && (
                  <Link
                    to="/create-account"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
                  >
                    إنشاء حساب
                  </Link>
                )}

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                >
                  طلب عرض سعر عبر واتساب
                </a>
              </div>

              {saveMessage && (
                <div className="mt-3 text-sm text-white/85">{saveMessage}</div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gold">
          متى تستخدم الحاسبة التفصيلية ومتى تستخدم حاسبة المقطوعية؟
        </h2>

        <p className="mt-4 text-white/80 leading-relaxed">
          الحاسبة الموجودة في هذه الصفحة مخصصة لمن يريد معرفة تكلفة البنود
          التفصيلية والكميات بشكل أوضح. أما إذا كنت تبحث عن تقدير سريع لمشروع كامل
          بالمقطوعية، فيمكنك الانتقال إلى حاسبة المقطوعية المخصصة لذلك.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { a: 250, label: "فيلا 250م²" },
            { a: 300, label: "فيلا 300م²" },
            { a: 400, label: "فيلا 400م²" },
          ].map((x, i) => {
            const commercial = x.a * PRICES_PER_M2.finishing.commercial;
            const standard = x.a * PRICES_PER_M2.finishing.standard;
            const luxury = x.a * PRICES_PER_M2.finishing.luxury;

            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-lg font-extrabold text-white">{x.label}</div>
                <div className="mt-3 text-sm text-white/70 space-y-2">
                  <div>
                    تجاري:{" "}
                    <span className="text-white font-bold">
                      {formatSAR(commercial)} ريال
                    </span>
                  </div>
                  <div>
                    قياسي:{" "}
                    <span className="text-white font-bold">
                      {formatSAR(standard)} ريال
                    </span>
                  </div>
                  <div>
                    فاخر:{" "}
                    <span className="text-white font-bold">
                      {formatSAR(luxury)} ريال
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/50">
                  * تقديري وقد يختلف حسب المواد ونطاق العمل والمعاينة.
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold text-gold">
          سعر المتر لتشطيب الفلل في الرياض 2026
        </h2>

        <p className="mt-4 text-white/80 leading-relaxed">
          كثير من العملاء يبحثون عن “سعر المتر”، لكن السعر الحقيقي يتغير حسب نوع
          المواد، مستوى التشطيب، وعدد دورات المياه والمطابخ، ومستوى الجبس
          والإضاءة، وحجم الأعمال الإضافية. لذلك نعتمد في PYBCCO على الحسبة
          الإجمالية لإعطائك رقم أقرب للواقع مع الحفاظ على الشفافية.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-white/80 text-sm leading-relaxed">
          <div className="font-bold text-white mb-2">متى يزيد السعر عادة؟</div>
          <ul className="space-y-2">
            <li>✔️ عند اختيار مواد أعلى جودة (أرضيات/دهانات/أبواب/رخام...)</li>
            <li>✔️ زيادة الأعمال المخفية: عزل، تمديدات، معالجة عيوب، إعادة تأهيل</li>
            <li>✔️ التفاصيل: جبس مع إضاءة معقدة، أعمال خشب ديكوري، رخام/ستون</li>
            <li>✔️ كثرة دورات المياه والمطابخ والتجهيزات</li>
          </ul>
        </div>
      </section>

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

      <section className="container mx-auto px-4 pb-6 text-right max-w-4xl">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gold">
            بعد ما تحدد الميزانية… تابع التنفيذ بشفافية كاملة
          </h2>

          <p className="mt-4 text-white/80 leading-relaxed">
            في PYBCCO لا نكتفي بحساب التكلفة فقط، بل ندير مشروعك عبر{" "}
            <Link
              to="/project-tracking-system-riyadh"
              className="text-gold font-bold hover:underline"
            >
              نظام متابعة رقمي احترافي
            </Link>{" "}
            يتيح لك متابعة نسبة الإنجاز، مراجعة الدفعات، تحميل العقود، والاطلاع
            على التحديثات بالصور ضمن حساب العميل — لحفظ حقوقك ووضوح كل مرحلة.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/5 p-5">
          <div className="text-lg font-extrabold text-gold">
            تريد معرفة التكلفة المقطوعية للمشروع بالكامل؟
          </div>

          <p className="mt-2 text-white/80 leading-7">
            إذا كنت تريد حسابًا سريعًا يشمل المشروع بشكل إجمالي، فانتقل إلى حاسبة
            المقطوعية.
          </p>

          <div className="mt-4">
            <a
              href={lumpsumCalculatorUrl}
              className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition"
            >
              فتح حاسبة المقطوعية
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6">
          الأسئلة الشائعة حول تكلفة التشطيب في الرياض
        </h2>

        <div className="space-y-6 text-white/80 leading-relaxed">
          <div>
            <h3 className="font-bold text-white mb-2">
              كم سعر تشطيب المتر في الرياض؟
            </h3>
            <p>
              يبدأ سعر تشطيب المتر في الرياض من 450 ريال للمستوى التجاري ويصل إلى
              800 ريال للمستوى الفاخر حسب نوع المواد ونطاق العمل.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل الأسعار في الحاسبة نهائية؟
            </h3>
            <p>
              الأسعار تقديرية لتكوين تصور أولي، ويتم اعتماد السعر النهائي بعد
              المعاينة وتحديد التفاصيل الفنية بدقة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل السعر شامل المواد والعمالة؟
            </h3>
            <p>
              الحاسبة التفصيلية الحالية مخصصة لتقدير البنود والكميات والإضافات،
              أما شمولية المواد والعمالة فيتم تثبيتها ضمن عرض السعر النهائي بعد
              المعاينة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              ما الفرق بين التشطيب التجاري والقياسي والفاخر؟
            </h3>
            <p>
              الفرق يكون في جودة المواد وتفاصيل التنفيذ ونوعية التشطيبات
              والإكسسوارات، وكل مستوى يناسب ميزانية مختلفة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              كم مدة تشطيب فيلا في الرياض؟
            </h3>
            <p>
              غالباً تتراوح مدة تشطيب الفيلا بين 4 إلى 12 أسبوع حسب المساحة ونوع
              التشطيب وتوفر المواد.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل تقدمون معاينة مجانية داخل الرياض؟
            </h3>
            <p>
              نعم، نوفر معاينة مجانية داخل مدينة الرياض لتقييم المشروع وتقديم عرض
              سعر نهائي واضح.
            </p>
          </div>
        </div>
      </section>

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
            {
              title: "مقاول ترميم منازل بالرياض",
              href: "/home-renovation-company-riyadh",
            },
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

      {extrasTotal > 0 && (
        <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
          <div className="rounded-2xl border border-white/10 bg-black/75 backdrop-blur-md p-3 flex items-center justify-between gap-3">
            <div className="text-xs text-white/70">
              الإجمالي الحالي
              <div className="text-base font-extrabold text-gold">
                {formatSAR(grandTotal)} ريال
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gold px-4 py-3 text-sm font-extrabold text-black"
            >
              واتساب عرض السعر
            </a>
          </div>
        </div>
      )}
    </div>
  );
}