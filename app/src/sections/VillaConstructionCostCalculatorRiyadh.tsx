import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

type ServiceType = "bone" | "finishing" | "turnkey";
type Level = "commercial" | "standard" | "luxury";
type StreetWidthCategory = "lt15" | "15to30" | "gt30";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
};

type QuoteRow = {
  title: string;
  quantity: number | string;
  unit: string;
  unitPrice: number;
  total: number;
};

const ACTIVATED_USER_STORAGE_KEY = "pybcco_activated_user";

const BONE_RATE = 550;

const FINISHING_RATES: Record<Level, number> = {
  commercial: 700,
  standard: 900,
  luxury: 1300,
};

const TURNKEY_RATES: Record<Level, number> = {
  commercial: 1250,
  standard: 1450,
  luxury: 1850,
};

const ELEVATOR_PRICES: Record<Level, number> = {
  commercial: 70000,
  standard: 85000,
  luxury: 120000,
};

const POOL_FINISHING_PRICES: Record<Level, number> = {
  commercial: 22000,
  standard: 25000,
  luxury: 35000,
};

const ROOF_SEATING_RATES: Record<Level, number> = {
  commercial: 190,
  standard: 250,
  luxury: 320,
};

const BASE_BUILD_RATIO_BY_STREETS: Record<string, number> = {
  "1": 75,
  "2": 70,
  "3": 70,
};

const STREET_WIDTH_ADJUSTMENT: Record<StreetWidthCategory, number> = {
  lt15: 0,
  "15to30": -2,
  gt30: -3,
};

const POOL_AREA_STANDARD = 10; // 2.5 x 4
const ELEVATOR_SHAFT_AREA = 10; // تقديري للعظم

function formatSAR(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getLevelLabel(level: Level) {
  if (level === "commercial") return "تجاري";
  if (level === "standard") return "قياسي";
  return "فاخر";
}

function getServiceLabel(serviceType: ServiceType) {
  if (serviceType === "bone") return "عظم";
  if (serviceType === "finishing") return "تشطيب";
  return "تسليم مفتاح";
}

function getStreetWidthLabel(streetWidth: StreetWidthCategory) {
  if (streetWidth === "lt15") return "أقل من 15م";
  if (streetWidth === "15to30") return "بين 15م و 30م";
  return "أكثر من 30م";
}

export default function VillaConstructionCostCalculatorRiyadh() {
  const title = "حاسبة تكلفة بناء فيلا في الرياض 2026 | بنيان الهرم";
  const description =
    "حاسبة تفاعلية لتقدير تكلفة بناء فيلا في الرياض حسب مساحة الأرض وعدد الشوارع وعرض الشارع الرئيسي ونوع الخدمة والبدروم والمصعد والمسبح وجلسات السطح. احصل على عرض سعر تقديري واضح قابل للطباعة والحفظ.";
  const canonical =
    "https://pybcco.com/villa-construction-cost-calculator-riyadh";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "هل هذه الحاسبة تعطي سعرًا نهائيًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لا، هذه الحاسبة تعطي تقديرًا أوليًا سريعًا حسب المدخلات المختارة، بينما السعر النهائي يعتمد على المخططات والموقع والمعاينة.",
        },
      },
      {
        "@type": "Question",
        name: "هل الحاسبة تشمل البدروم والمصعد والمسبح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يمكن احتساب البدروم والمصعد والمسبح ضمن النتيجة التقديرية حسب الخيارات التي يحددها المستخدم.",
        },
      },
      {
        "@type": "Question",
        name: "هل الحفر يظهر داخل النتيجة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يظهر الحفر كبند مستقل في العظم وتسليم المفتاح، ولا يظهر في التشطيب فقط.",
        },
      },
      {
        "@type": "Question",
        name: "كيف يتم احتساب البدروم في الحاسبة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتم احتساب البدروم بنسبة افتراضية تعادل 60% من مساحة الدور الأرضي مع إمكانية تعديلها حسب المشروع.",
        },
      },
      {
        "@type": "Question",
        name: "كيف يتم احتساب جلسات السطح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتم احتساب جلسات السطح على المساحة المتبقية من السطح بعد خصم مساحة الملحق العلوي، وتختلف قيمة المتر حسب المستوى التجاري أو القياسي أو الفاخر.",
        },
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "حاسبة تكلفة بناء فيلا في الرياض",
    url: canonical,
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة تكلفة بناء فيلا في الرياض",
    url: canonical,
    applicationCategory: "Calculator",
    operatingSystem: "All",
    description:
      "أداة تفاعلية لحساب تكلفة بناء الفيلا في الرياض حسب مساحة الأرض وعدد الشوارع وعرض الشارع الرئيسي ونوع الخدمة والبدروم والمصعد والمسبح وجلسات السطح.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SAR",
    },
  };

  const [activatedUser, setActivatedUser] = useState<ActivatedUser | null>(null);

  const [serviceType, setServiceType] = useState<ServiceType>("turnkey");
  const [level, setLevel] = useState<Level>("standard");

  const [landArea, setLandArea] = useState<string>("");
  const [streetCount, setStreetCount] = useState<string>("1");
  const [streetWidth, setStreetWidth] = useState<StreetWidthCategory>("lt15");
  const [buildRatio, setBuildRatio] = useState<number>(75);

  const [hasBasement, setHasBasement] = useState(false);
  const [basementRatio, setBasementRatio] = useState<string>("60");

  const [hasElevator, setHasElevator] = useState(false);
  const [hasPool, setHasPool] = useState(false);

  const [governmentFees, setGovernmentFees] = useState<string>("");

  const [hasRoofSeating, setHasRoofSeating] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [isSavingEstimate, setIsSavingEstimate] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>("");

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

  useEffect(() => {
    const baseRatio = BASE_BUILD_RATIO_BY_STREETS[streetCount] ?? 75;
    const widthAdjustment = STREET_WIDTH_ADJUSTMENT[streetWidth] ?? 0;
    const finalRatio = Math.max(baseRatio + widthAdjustment, 60);
    setBuildRatio(finalRatio);
  }, [streetCount, streetWidth]);

  const landAreaNumber = useMemo(() => {
    const n = Number(landArea);
    return Number.isFinite(n) ? n : 0;
  }, [landArea]);

  const governmentFeesNumber = useMemo(() => {
    const n = Number(governmentFees);
    return Number.isFinite(n) ? n : 0;
  }, [governmentFees]);

  const basementRatioNumber = useMemo(() => {
    const n = Number(basementRatio);
    return Number.isFinite(n) ? n : 60;
  }, [basementRatio]);

  const isValid = landAreaNumber > 0 && buildRatio > 0;

  const groundFloorArea = useMemo(() => {
    if (!isValid) return 0;
    return landAreaNumber * (buildRatio / 100);
  }, [isValid, landAreaNumber, buildRatio]);

  const firstFloorArea = groundFloorArea;
  const penthouseArea = groundFloorArea * 0.7;

  const mainBuiltArea = useMemo(() => {
    return groundFloorArea + firstFloorArea + penthouseArea;
  }, [groundFloorArea, firstFloorArea, penthouseArea]);

  const roofRemainingArea = useMemo(() => {
    return Math.max(groundFloorArea - penthouseArea, 0);
  }, [groundFloorArea, penthouseArea]);

  const basementArea = useMemo(() => {
    if (!hasBasement) return 0;
    return groundFloorArea * (basementRatioNumber / 100);
  }, [hasBasement, groundFloorArea, basementRatioNumber]);

  const activeRate = useMemo(() => {
    if (serviceType === "bone") return BONE_RATE;
    if (serviceType === "finishing") return FINISHING_RATES[level];
    return TURNKEY_RATES[level];
  }, [serviceType, level]);

  const roofSeatingRate = useMemo(() => {
    if (serviceType === "bone") return 0;
    return ROOF_SEATING_RATES[level];
  }, [serviceType, level]);

  const mainAreaCost = useMemo(() => {
    return mainBuiltArea * activeRate;
  }, [mainBuiltArea, activeRate]);

  const basementCost = useMemo(() => {
    if (!hasBasement) return 0;
    return basementArea * activeRate * 1.5;
  }, [hasBasement, basementArea, activeRate]);

  const excavationCost = useMemo(() => {
    if (serviceType === "finishing") return 0;
    const baseExcavation = mainBuiltArea * 1.7 * 45;

    if (!hasBasement) return baseExcavation;

    return baseExcavation + basementArea * 3.5 * 45;
  }, [serviceType, hasBasement, mainBuiltArea, basementArea]);

  const elevatorCost = useMemo(() => {
    if (!hasElevator) return 0;

    if (serviceType === "bone") {
      return ELEVATOR_SHAFT_AREA * BONE_RATE * 1.5;
    }

    return ELEVATOR_PRICES[level];
  }, [hasElevator, serviceType, level]);

  const poolCost = useMemo(() => {
    if (!hasPool) return 0;

    if (serviceType === "bone") {
      return POOL_AREA_STANDARD * BONE_RATE * 1.5;
    }

    return POOL_FINISHING_PRICES[level];
  }, [hasPool, serviceType, level]);

  const roofSeatingCost = useMemo(() => {
    if (!hasRoofSeating || serviceType === "bone") return 0;
    return roofRemainingArea * roofSeatingRate;
  }, [hasRoofSeating, serviceType, roofRemainingArea, roofSeatingRate]);

  const totalCost = useMemo(() => {
    return (
      mainAreaCost +
      basementCost +
      excavationCost +
      elevatorCost +
      poolCost +
      governmentFeesNumber +
      roofSeatingCost
    );
  }, [
    mainAreaCost,
    basementCost,
    excavationCost,
    elevatorCost,
    poolCost,
    governmentFeesNumber,
    roofSeatingCost,
  ]);

  const averageCostPerM2 = useMemo(() => {
    const totalBuiltForAverage = mainBuiltArea + basementArea;
    if (totalBuiltForAverage <= 0) return 0;
    return totalCost / totalBuiltForAverage;
  }, [totalCost, mainBuiltArea, basementArea]);

  const marketValueRange = useMemo(() => {
    const low = totalCost * 1.18;
    const high = totalCost * 1.35;
    return { low, high };
  }, [totalCost]);

  const serviceLabel = getServiceLabel(serviceType);
  const levelLabel = getLevelLabel(level);
  const streetWidthLabel = getStreetWidthLabel(streetWidth);

  const detailedCalculatorLink = "/villa-finishing-price-riyadh";

  const whatsappText = encodeURIComponent(
    `السلام عليكم، أريد مراجعة هذا التقدير من بنيان الهرم (PYBCCO).\n` +
      `نوع الخدمة: ${serviceLabel}\n` +
      `${serviceType !== "bone" ? `المستوى: ${levelLabel}\n` : ""}` +
      `مساحة الأرض: ${formatNumber(landAreaNumber)} م²\n` +
      `عدد الشوارع: ${streetCount}\n` +
      `عرض الشارع الرئيسي: ${streetWidthLabel}\n` +
      `نسبة البناء التقديرية: ${formatNumber(buildRatio)}%\n` +
      `مساحة البناء الكلية: ${formatNumber(mainBuiltArea)} م²\n` +
      `${hasBasement ? `مساحة البدروم: ${formatNumber(basementArea)} م²\n` : ""}` +
      `${
        hasRoofSeating && serviceType !== "bone"
          ? `مساحة جلسات السطح: ${formatNumber(roofRemainingArea)} م²\n`
          : ""
      }` +
      `الإجمالي التقديري: ${formatSAR(totalCost)} ريال\n` +
      `رابط الحاسبة: ${canonical}`
  );

  const waLink = `https://wa.me/966550604837?text=${whatsappText}`;

  const quoteRows = useMemo(() => {
    const rows: QuoteRow[] = [];

    if (serviceType === "bone") {
      rows.push({
        title: "أعمال العظم",
        quantity: mainBuiltArea,
        unit: "م²",
        unitPrice: BONE_RATE,
        total: mainBuiltArea * BONE_RATE,
      });
    }

    if (serviceType === "finishing") {
      rows.push({
        title: `أعمال التشطيب (${levelLabel})`,
        quantity: mainBuiltArea,
        unit: "م²",
        unitPrice: FINISHING_RATES[level],
        total: mainAreaCost,
      });
    }

    if (serviceType === "turnkey") {
      rows.push({
        title: `تسليم مفتاح (${levelLabel})`,
        quantity: mainBuiltArea,
        unit: "م²",
        unitPrice: TURNKEY_RATES[level],
        total: mainAreaCost,
      });
    }

    if (serviceType !== "finishing") {
      const excavationQty = hasBasement
        ? mainBuiltArea * 1.7 + basementArea * 3.5
        : mainBuiltArea * 1.7;

      rows.push({
        title: "أعمال الحفر",
        quantity: excavationQty,
        unit: "م³",
        unitPrice: 45,
        total: excavationCost,
      });
    }

    if (hasBasement) {
      rows.push({
        title: "أعمال البدروم",
        quantity: basementArea,
        unit: "م²",
        unitPrice: activeRate * 1.5,
        total: basementCost,
      });
    }

    if (hasElevator) {
      rows.push({
        title: serviceType === "bone" ? "بيت المصعد" : "توريد وتركيب المصعد",
        quantity: 1,
        unit: "بند",
        unitPrice: elevatorCost,
        total: elevatorCost,
      });
    }

    if (hasPool) {
      rows.push({
        title: serviceType === "bone" ? "مسبح خرساني قياسي" : "مسبح قياسي",
        quantity: 1,
        unit: "بند",
        unitPrice: poolCost,
        total: poolCost,
      });
    }

    if (hasRoofSeating && serviceType !== "bone") {
      rows.push({
        title: `تشطيب جلسات السطح (${levelLabel})`,
        quantity: roofRemainingArea,
        unit: "م²",
        unitPrice: roofSeatingRate,
        total: roofSeatingCost,
      });
    }

    if (governmentFeesNumber > 0) {
      rows.push({
        title: "أوراق حكومية ورسوم تقديرية",
        quantity: 1,
        unit: "بند",
        unitPrice: governmentFeesNumber,
        total: governmentFeesNumber,
      });
    }

    return rows;
  }, [
    serviceType,
    level,
    levelLabel,
    mainBuiltArea,
    mainAreaCost,
    excavationCost,
    hasBasement,
    basementArea,
    basementCost,
    hasElevator,
    elevatorCost,
    hasPool,
    poolCost,
    hasRoofSeating,
    roofRemainingArea,
    roofSeatingRate,
    roofSeatingCost,
    governmentFeesNumber,
    activeRate,
  ]);

  const baseTotalForSave = useMemo(() => {
    return mainAreaCost + basementCost;
  }, [mainAreaCost, basementCost]);

  const extrasTotalForSave = useMemo(() => {
    return (
      excavationCost +
      elevatorCost +
      poolCost +
      governmentFeesNumber +
      roofSeatingCost
    );
  }, [
    excavationCost,
    elevatorCost,
    poolCost,
    governmentFeesNumber,
    roofSeatingCost,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveEstimate = async () => {
    if (!activatedUser?.phone) {
      setSaveMessage("يجب إنشاء حساب أو تسجيله أولًا حتى يتم حفظ التقدير.");
      return;
    }

    try {
      setIsSavingEstimate(true);
      setSaveMessage("");

      const items_json = quoteRows.map((row) => ({
        title: row.title,
        quantity:
          typeof row.quantity === "number"
            ? Number(row.quantity.toFixed(2))
            : row.quantity,
        unit: row.unit,
        total: row.total,
      }));

      const response = await fetch("/api/save-calculator-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: activatedUser.phone,
          work_type: serviceType,
          area: Number((mainBuiltArea + basementArea).toFixed(2)),
          finishing_level: level,
          base_total: Math.round(baseTotalForSave),
          extras_total: Math.round(extrasTotalForSave),
          grand_total: Math.round(totalCost),
          estimated_cost: Math.round(totalCost),
          items_json,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "تعذر حفظ التقدير داخل الحساب في الوقت الحالي."
        );
      }

      setSaveMessage("تم حفظ التقدير داخل حسابك بنجاح.");
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء حفظ التقدير."
      );
    } finally {
      setIsSavingEstimate(false);
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

      <style>{`
  @page {
    size: A4;
    margin: 6mm;
  }

  @media print {
    html,
body {
  width: 210mm !important;
  height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background: #fff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body * {
      visibility: hidden !important;
    }

    #quote-pdf,
    #quote-pdf * {
      visibility: visible !important;
    }

    #quote-pdf {
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  left: 0 !important;
  width: 190mm !important;
  max-width: 190mm !important;
  height: auto !important;
  max-height: 270mm !important;
  margin: 0 auto !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: #fff !important;
  color: #111 !important;
  box-shadow: none !important;
  border: 0 !important;
  page-break-after: avoid !important;
  break-after: avoid !important;
}

    .no-print {
      display: none !important;
    }

    .print-page-break-avoid {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
  }
`}</style>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/images/VillaFinishingPriceRiyadh.webp"
          alt="حاسبة تكلفة بناء فيلا في الرياض – بنيان الهرم للمقاولات"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 158, 11, 0.25), transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
            حاسبة تكلفة بناء فيلا في الرياض
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            حاسبة تفاعلية سريعة لحساب تكلفة البناء التقديرية حسب مساحة الأرض وعدد
            الشوارع وعرض الشارع الرئيسي ونوع الخدمة والبدروم والمصعد والمسبح
            وجلسات السطح.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="bg-black/40 border border-white/10 rounded-lg px-4 py-2">
              ✔ حساب تقديري خلال ثوانٍ
            </div>

            <div className="bg-black/40 border border-white/10 rounded-lg px-4 py-2">
              ✔ يشمل البدروم والمصعد والمسبح وجلسات السطح
            </div>

            <div className="bg-black/40 border border-white/10 rounded-lg px-4 py-2">
              ✔ مناسب لمشاريع الفلل في الرياض
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                const el = document.getElementById("calc");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ابدأ حساب تكلفة مشروعك
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>
          </div>
        </div>
      </section>

      <section id="calc" className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 md:p-5 no-print">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-sm md:text-base font-bold text-gold">
                  تريد معرفة تكلفة البنود التفصيلية بدل الحساب المقطوعي؟
                </div>
                <div className="mt-1 text-sm text-white/75 leading-7">
                  هذه الصفحة مخصصة للحساب السريع للمشروع بالكامل. أما إذا كنت تريد
                  تفصيل البنود والكميات، فانتقل إلى الحاسبة التفصيلية.
                </div>
              </div>

              <Link
                to={detailedCalculatorLink}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition"
              >
                فتح الحاسبة التفصيلية
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7 no-print">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/70">
                حاسبة تفاعلية
              </div>

              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold">
                احسب <span className="text-gold">تكلفة المشروع التقريبية</span>
              </h2>

              <p className="mt-3 text-white/70 max-w-3xl mx-auto">
                أدخل بيانات المشروع ثم احصل على عرض سعر تقديري واضح داخل الصفحة
                وقابل للطباعة، مع توضيح المسطحات والحفر والبدروم والمصعد والمسبح
                وجلسات السطح.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                <div className="text-sm text-white/70 mb-2">نوع الخدمة</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setServiceType("bone");
                      setShowResult(false);
                      setHasRoofSeating(false);
                      setSaveMessage("");
                    }}
                    className={`rounded-lg px-3 py-3 text-sm border ${
                      serviceType === "bone"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    عظم
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceType("finishing");
                      setShowResult(false);
                      setSaveMessage("");
                    }}
                    className={`rounded-lg px-3 py-3 text-sm border ${
                      serviceType === "finishing"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    تشطيب
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceType("turnkey");
                      setShowResult(false);
                      setSaveMessage("");
                    }}
                    className={`rounded-lg px-3 py-3 text-sm border ${
                      serviceType === "turnkey"
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-transparent hover:bg-white/5"
                    }`}
                  >
                    تسليم مفتاح
                  </button>
                </div>
              </div>

              {serviceType !== "bone" && (
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                  <div className="text-sm text-white/70 mb-2">المستوى</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLevel("commercial");
                        setShowResult(false);
                        setSaveMessage("");
                      }}
                      className={`rounded-lg px-3 py-3 text-sm border ${
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
                        setSaveMessage("");
                      }}
                      className={`rounded-lg px-3 py-3 text-sm border ${
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
                        setSaveMessage("");
                      }}
                      className={`rounded-lg px-3 py-3 text-sm border ${
                        level === "luxury"
                          ? "border-white/30 bg-white/10"
                          : "border-white/10 bg-transparent hover:bg-white/5"
                      }`}
                    >
                      فاخر
                    </button>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">مساحة الأرض (م²)</div>
                <input
                  value={landArea}
                  onChange={(e) => {
                    setLandArea(e.target.value.replace(/[^\d.]/g, ""));
                    setShowResult(false);
                    setSaveMessage("");
                  }}
                  inputMode="decimal"
                  placeholder="مثال: 500"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">عدد الشوارع</div>
                <select
                  value={streetCount}
                  onChange={(e) => {
                    setStreetCount(e.target.value);
                    setShowResult(false);
                    setSaveMessage("");
                  }}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                >
                  <option value="1">شارع واحد</option>
                  <option value="2">شارعين</option>
                  <option value="3">ثلاثة شوارع</option>
                </select>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">
                  عرض الشارع الرئيسي
                </div>
                <select
                  value={streetWidth}
                  onChange={(e) => {
                    setStreetWidth(e.target.value as StreetWidthCategory);
                    setShowResult(false);
                    setSaveMessage("");
                  }}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                >
                  <option value="lt15">أقل من 15م</option>
                  <option value="15to30">بين 15م و 30م</option>
                  <option value="gt30">أكثر من 30م</option>
                </select>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">
                  نسبة البناء التقديرية (%)
                </div>
                <input
                  value={String(buildRatio)}
                  readOnly
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 outline-none text-white/90"
                />
                <div className="mt-2 text-xs text-white/55 leading-6">
                  تُحسب تلقائيًا حسب عدد الشوارع وعرض الشارع الرئيسي بافتراض أن
                  الأرض مربعة.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                <div className="text-sm text-white/70 mb-2">
                  الأوراق الحكومية (اختياري)
                </div>
                <input
                  value={governmentFees}
                  onChange={(e) => {
                    setGovernmentFees(e.target.value.replace(/[^\d.]/g, ""));
                    setShowResult(false);
                    setSaveMessage("");
                  }}
                  inputMode="decimal"
                  placeholder="مثال: 12000"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                <div className="text-sm text-white/70 mb-3">إضافات المشروع</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                    <span>يوجد بدروم</span>
                    <input
                      type="checkbox"
                      checked={hasBasement}
                      onChange={(e) => {
                        setHasBasement(e.target.checked);
                        setShowResult(false);
                        setSaveMessage("");
                      }}
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                    <span>يوجد مصعد</span>
                    <input
                      type="checkbox"
                      checked={hasElevator}
                      onChange={(e) => {
                        setHasElevator(e.target.checked);
                        setShowResult(false);
                        setSaveMessage("");
                      }}
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                    <span>يوجد مسبح</span>
                    <input
                      type="checkbox"
                      checked={hasPool}
                      onChange={(e) => {
                        setHasPool(e.target.checked);
                        setShowResult(false);
                        setSaveMessage("");
                      }}
                    />
                  </label>

                  {serviceType !== "bone" && (
                    <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                      <span>تشطيب جلسات سطح</span>
                      <input
                        type="checkbox"
                        checked={hasRoofSeating}
                        onChange={(e) => {
                          setHasRoofSeating(e.target.checked);
                          setShowResult(false);
                          setSaveMessage("");
                        }}
                      />
                    </label>
                  )}
                </div>

                {hasBasement && (
                  <div className="mt-4">
                    <div className="text-sm text-white/70 mb-2">
                      نسبة البدروم من مساحة الأرضي (%)
                    </div>
                    <input
                      value={basementRatio}
                      onChange={(e) => {
                        setBasementRatio(e.target.value.replace(/[^\d.]/g, ""));
                        setShowResult(false);
                        setSaveMessage("");
                      }}
                      inputMode="decimal"
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    />
                  </div>
                )}

                {hasRoofSeating && serviceType !== "bone" && (
                  <div className="mt-4 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-white/80 leading-7">
                    سيتم احتساب جلسات السطح تلقائيًا على المساحة المتبقية من
                    السطح بعد خصم مساحة الملحق العلوي:
                    <span className="block mt-2 text-gold font-bold">
                      مساحة السطح المتبقية = مساحة الدور الأرضي - مساحة الملحق
                      العلوي = {formatNumber(roofRemainingArea)} م²
                    </span>
                    <span className="block mt-1">
                      سعر المتر الحالي حسب المستوى المختار:{" "}
                      {formatSAR(roofSeatingRate)} ريال / م²
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <Button
                className="w-full md:w-auto bg-gold text-black font-bold"
                onClick={() => setShowResult(true)}
                disabled={!isValid}
              >
                احسب التكلفة التقديرية
              </Button>

              <div className="text-xs text-white/60">
                النتائج تقريبية وتعتمد على المدخلات المعتمدة داخل الحاسبة.
              </div>
            </div>
          </div>

          {showResult && isValid && (
            <>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 no-print">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/70">
                      الملخص التقديري للمشروع
                    </div>
                    <div className="mt-2 text-3xl md:text-4xl font-extrabold">
                      {formatSAR(totalCost)}{" "}
                      <span className="text-lg font-semibold text-white/80">
                        ريال
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-white/75 leading-7">
                    عرض سعر تقديري واضح داخل الصفحة، ويمكنك طباعته مباشرة أو
                    حفظه داخل حسابك.
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">نوع الخدمة</div>
                    <div className="mt-1 font-bold">{serviceLabel}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">المستوى</div>
                    <div className="mt-1 font-bold">
                      {serviceType === "bone" ? "عظم" : levelLabel}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">عدد الشوارع</div>
                    <div className="mt-1 font-bold">{streetCount}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">عرض الشارع الرئيسي</div>
                    <div className="mt-1 font-bold">{streetWidthLabel}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">نسبة البناء التقديرية</div>
                    <div className="mt-1 font-bold text-gold">
                      {formatNumber(buildRatio)}%
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60">مساحة البناء الكلية</div>
                    <div className="mt-1 font-bold text-gold">
                      {formatNumber(mainBuiltArea)} م²
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                    <div className="text-white/60">متوسط تكلفة المتر</div>
                    <div className="mt-1 font-bold">
                      {formatSAR(averageCostPerM2)} ريال / م²
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/25">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-4 py-3 text-right">#</th>
                        <th className="px-4 py-3 text-right">البند</th>
                        <th className="px-4 py-3 text-center">الكمية</th>
                        <th className="px-4 py-3 text-center">الوحدة</th>
                        <th className="px-4 py-3 text-center">سعر الوحدة</th>
                        <th className="px-4 py-3 text-center">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quoteRows.map((row, index) => (
                        <tr
                          key={`${row.title}-${index}`}
                          className="border-t border-white/10"
                        >
                          <td className="px-4 py-3 text-right">{index + 1}</td>
                          <td className="px-4 py-3 text-right">{row.title}</td>
                          <td className="px-4 py-3 text-center">
                            {typeof row.quantity === "number"
                              ? formatNumber(row.quantity)
                              : row.quantity}
                          </td>
                          <td className="px-4 py-3 text-center">{row.unit}</td>
                          <td className="px-4 py-3 text-center">
                            {formatSAR(row.unitPrice)} ريال
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-gold">
                            {formatSAR(row.total)} ريال
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="font-bold text-gold mb-3">
                      المساحات المعتمدة
                    </div>
                    <div className="space-y-2 text-sm text-white/80">
                      <div>الدور الأرضي: {formatNumber(groundFloorArea)} م²</div>
                      <div>الدور الأول: {formatNumber(firstFloorArea)} م²</div>
                      <div>الملحق العلوي: {formatNumber(penthouseArea)} م²</div>
                      {hasBasement && (
                        <div>البدروم: {formatNumber(basementArea)} م²</div>
                      )}
                      {hasRoofSeating && serviceType !== "bone" && (
                        <div>
                          جلسات السطح: {formatNumber(roofRemainingArea)} م²
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="font-bold text-gold mb-3">الإجمالي</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/75">الإجمالي النهائي</span>
                      <span className="font-extrabold text-2xl text-gold">
                        {formatSAR(totalCost)} ريال
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-white/70">
                      متوسط تكلفة المتر: {formatSAR(averageCostPerM2)} ريال / م²
                    </div>
                    <div className="text-sm text-white/70">
                      القيمة السوقية المتوقعة: {formatSAR(marketValueRange.low)} –
                      {` ${formatSAR(marketValueRange.high)} ريال`}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-5 md:p-6">
                  <div className="text-xl md:text-2xl font-extrabold text-gold">
                    احفظ هذا التقدير داخل حسابك
                  </div>

                  <p className="mt-2 text-sm md:text-base text-white/85 leading-8">
                    للاستفادة من حفظ التقدير داخل حسابك وطباعة PDF والحصول على
                    خصم خاص وميزة ضمان أعمال إضافي عند بدء التنفيذ، احفظ التقدير
                    مباشرة إذا كنت مسجلًا، أو أنشئ حسابًا جديدًا.
                  </p>

                  <div className="mt-4 flex flex-col md:flex-row gap-3">
                    {activatedUser?.phone ? (
                      <Button
                        className="bg-gold text-black font-extrabold"
                        onClick={handleSaveEstimate}
                        disabled={isSavingEstimate}
                      >
                        {isSavingEstimate
                          ? "جارٍ حفظ التقدير..."
                          : "حفظ التقدير داخل حسابي"}
                      </Button>
                    ) : (
                      <Link
                        to="/create-account"
                        className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition"
                      >
                        إنشاء حساب لحفظ التقدير
                      </Link>
                    )}

                    <Button
                      className="bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15"
                      onClick={handlePrint}
                    >
                      طباعة PDF
                    </Button>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                    >
                      طلب عرض سعر عبر واتساب
                    </a>

                    <Link
                      to={detailedCalculatorLink}
                      className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                    >
                      لمعرفة الأسعار التفصيلية للبنود اضغط هنا
                    </Link>
                  </div>

                  {saveMessage && (
                    <div className="mt-4 text-sm font-medium text-white/90">
                      {saveMessage}
                    </div>
                  )}
                </div>
              </div>

              <div id="quote-pdf" className="hidden">
                <div className="w-full bg-white text-[#111] p-3 text-[10px] leading-4">
                  <div className="flex items-start justify-between gap-4 print-page-break-avoid">
                    <div className="text-right flex-1">
                      <h1 className="text-[22px] font-extrabold leading-tight">
                        عرض سعر تقديري
                      </h1>
                      <div className="mt-1 text-[12px] text-[#555]">
                        بنيان الهرم للمقاولات
                      </div>
                      <div className="mt-1 text-[11px] text-[#444]">
                        التاريخ: {new Date().toLocaleDateString("ar-SA")}
                      </div>
                      <div className="text-[11px] text-[#444]">الموقع: الرياض</div>
                      <div className="text-[11px] text-[#444]">
                        الموقع الإلكتروني: pybcco.com
                      </div>
                      <div className="text-[11px] text-[#444]">
                        الجوال: 0550604837
                      </div>
                    </div>

                    <div className="shrink-0">
                      <img
                        src="/favicon.webp"
                        alt="شعار بنيان الهرم للمقاولات"
                        className="w-[64px] h-[64px] object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-3 border-t-2 border-[#d4a017]" />

                  <div className="mt-3 grid grid-cols-2 gap-2 print-page-break-avoid">
                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">نوع الخدمة</div>
                      <div className="font-bold text-[13px] mt-1">
                        {serviceLabel}
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">المستوى</div>
                      <div className="font-bold text-[13px] mt-1">
                        {serviceType === "bone" ? "عظم" : levelLabel}
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">مساحة الأرض</div>
                      <div className="font-bold text-[13px] mt-1">
                        {formatNumber(landAreaNumber)} م²
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">عدد الشوارع</div>
                      <div className="font-bold text-[13px] mt-1">
                        {streetCount}
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">
                        عرض الشارع الرئيسي
                      </div>
                      <div className="font-bold text-[13px] mt-1">
                        {streetWidthLabel}
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2">
                      <div className="text-[#777] text-[10px]">
                        نسبة البناء التقديرية
                      </div>
                      <div className="font-bold text-[13px] mt-1">
                        {formatNumber(buildRatio)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 print-page-break-avoid">
                    <table className="w-full border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-[#f7f7f7]">
                          <th className="border border-[#222] px-2 py-1.5 text-right">
                            #
                          </th>
                          <th className="border border-[#222] px-2 py-1.5 text-right">
                            البند
                          </th>
                          <th className="border border-[#222] px-2 py-1.5 text-center">
                            الكمية
                          </th>
                          <th className="border border-[#222] px-2 py-1.5 text-center">
                            الوحدة
                          </th>
                          <th className="border border-[#222] px-2 py-1.5 text-center">
                            سعر الوحدة
                          </th>
                          <th className="border border-[#222] px-2 py-1.5 text-center">
                            الإجمالي
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {quoteRows.map((row, index) => (
                          <tr key={`${row.title}-${index}`}>
                            <td className="border border-[#bbb] px-2 py-1.5 text-right">
                              {index + 1}
                            </td>
                            <td className="border border-[#bbb] px-2 py-1.5 text-right">
                              {row.title}
                            </td>
                            <td className="border border-[#bbb] px-2 py-1.5 text-center">
                              {typeof row.quantity === "number"
                                ? formatNumber(row.quantity)
                                : row.quantity}
                            </td>
                            <td className="border border-[#bbb] px-2 py-1.5 text-center">
                              {row.unit}
                            </td>
                            <td className="border border-[#bbb] px-2 py-1.5 text-center">
                              {formatSAR(row.unitPrice)} ريال
                            </td>
                            <td className="border border-[#bbb] px-2 py-1.5 text-center font-bold">
                              {formatSAR(row.total)} ريال
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 print-page-break-avoid">
                    <div className="border border-[#ddd] rounded-lg p-2.5">
                      <div className="font-bold text-[12px] mb-1.5">
                        المساحات المعتمدة
                      </div>
                      <div>الدور الأرضي: {formatNumber(groundFloorArea)} م²</div>
                      <div>الدور الأول: {formatNumber(firstFloorArea)} م²</div>
                      <div>الملحق العلوي: {formatNumber(penthouseArea)} م²</div>
                      {hasBasement && (
                        <div>البدروم: {formatNumber(basementArea)} م²</div>
                      )}
                      {hasRoofSeating && serviceType !== "bone" && (
                        <div>جلسات السطح: {formatNumber(roofRemainingArea)} م²</div>
                      )}
                      <div className="mt-1.5 font-bold text-[#d4a017]">
                        مساحة البناء الكلية: {formatNumber(mainBuiltArea)} م²
                      </div>
                    </div>

                    <div className="border border-[#ddd] rounded-lg p-2.5">
                      <div className="font-bold text-[12px] mb-1.5">الإجمالي</div>
                      <div className="flex items-center justify-between gap-2">
                        <span>الإجمالي النهائي</span>
                        <span className="font-extrabold text-[16px] text-[#d4a017]">
                          {formatSAR(totalCost)} ريال
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-[#555]">
                        متوسط تكلفة المتر: {formatSAR(averageCostPerM2)} ريال / م²
                      </div>
                      <div className="text-[10px] text-[#555]">
                        القيمة السوقية المتوقعة: {formatSAR(marketValueRange.low)} –{" "}
                        {formatSAR(marketValueRange.high)} ريال
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border border-[#e6d28a] rounded-lg p-3 text-[10px] text-[#444] print-page-break-avoid">
                    <div className="font-bold text-[12px] mb-1.5">ملاحظات</div>
                    <div>• الأسعار تقديرية وتعتمد على المدخلات المختارة داخل الحاسبة.</div>
                    <div>
                      • السعر النهائي يعتمد على المخططات التنفيذية والمعاينة ونطاق
                      العمل.
                    </div>
                    <div>
                      • تم اعتماد نسبة البناء التقديرية بناءً على عدد الشوارع
                      وعرض الشارع الرئيسي بافتراض أن الأرض مربعة.
                    </div>
                    <div>
                      • تم اعتماد نسبة البدروم الافتراضية 60% من مساحة الدور الأرضي
                      مع إمكانية التعديل.
                    </div>
                    <div>
                      • تم اعتماد مسبح قياسي بمقاس 2.5 × 4 م لأغراض الحساب التقديري.
                    </div>
                    {hasRoofSeating && serviceType !== "bone" && (
                      <div>
                        • تشطيب جلسات السطح محسوب على المساحة المتبقية من السطح
                        بعد خصم مساحة الملحق العلوي، ويشمل مظلة حديد ديكورية
                        وبحرة وحجر أو تكسية/تفنيش جدران بمنظر جيد وبلاط خارجي
                        بمستوى جيد.
                      </div>
                    )}
                    <div>
                      • مدة التنفيذ التقريبية:
                      {serviceType === "bone"
                        ? " 4 إلى 6 أشهر."
                        : serviceType === "finishing"
                        ? " 3 إلى 5 أشهر."
                        : " 8 إلى 12 شهرًا."}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <section className="max-w-5xl mx-auto text-right no-print space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gold">
                كم تكلفة بناء فيلا في الرياض؟
              </h2>

              <p className="mt-4 text-white/80 leading-8">
                تختلف تكلفة بناء الفيلا في الرياض حسب مساحة الأرض، وعدد الشوارع،
                وعرض الشارع الرئيسي، ونسبة البناء التقديرية، ونوع الخدمة المطلوبة،
                سواء كانت عظم أو تشطيب أو تسليم مفتاح. كما تؤثر عناصر إضافية مثل
                البدروم والمصعد والمسبح وجلسات السطح على إجمالي التكلفة النهائية.
                تساعدك هذه الحاسبة التفاعلية على تكوين تصور سريع وعملي عن تكلفة
                المشروع قبل طلب العرض النهائي أو بدء مراجعة المخططات.
              </p>

              <p className="mt-4 text-white/80 leading-8">
                في المشاريع السكنية الخاصة يتم عادة احتساب المسطحات بناءً على
                المساحة المتوقعة القابلة للبناء، ثم يتم احتساب تكلفة التنفيذ حسب
                نوع الخدمة والمستوى المختار. لذلك تعتبر هذه الصفحة أداة مفيدة لكل
                من يبحث عن حاسبة تكلفة بناء فيلا في الرياض أو يريد معرفة تكلفة
                العظم أو التشطيب أو تسليم المفتاح بشكل أولي وواضح.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-xl font-bold text-gold mb-4">
                  توزيع تكلفة بناء الفيلا عادةً
                </h3>

                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-right text-white/70">
                        الهيكل الخرساني
                      </td>
                      <td className="py-2 text-left font-bold text-white">40%</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-right text-white/70">
                        أعمال التشطيب
                      </td>
                      <td className="py-2 text-left font-bold text-white">40%</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 text-right text-white/70">
                        كهرباء وميكانيك
                      </td>
                      <td className="py-2 text-left font-bold text-white">10%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-right text-white/70">
                        أعمال خارجية وملاحق
                      </td>
                      <td className="py-2 text-left font-bold text-white">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-xl font-bold text-gold mb-4">
                  ماذا يشمل السعر عادة؟
                </h3>

                <div className="space-y-2 text-white/80 leading-7 text-sm">
                  <div>✔️ أعمال الحفر والأساسات</div>
                  <div>✔️ الهيكل الخرساني والعظم</div>
                  <div>✔️ التمديدات الأساسية حسب نوع الخدمة</div>
                  <div>✔️ التشطيب حسب المستوى المختار</div>
                  <div>
                    ✔️ البنود الإضافية مثل البدروم والمصعد والمسبح وجلسات السطح عند
                    تفعيلها
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-xl font-bold text-gold mb-4">
                البدروم والمسبح والمصعد وجلسات السطح في مشاريع الفلل
              </h3>

              <p className="text-white/80 leading-8">
                في كثير من مشاريع الفلل في السعودية يتم اعتماد البدروم بنسبة
                تقريبية تعادل 60% من مساحة الدور الأرضي، مع إمكانية تعديل هذه
                النسبة حسب تصميم المشروع. كما يتم احتساب البدروم بمعامل أعلى من
                المسطح العادي بسبب زيادة أعمال الحفر والعزل والخرسانة.
              </p>

              <p className="mt-4 text-white/80 leading-8">
                كذلك يمكن أن يؤثر وجود المصعد أو المسبح أو جلسات السطح بشكل واضح
                على إجمالي التكلفة، ولهذا تتيح لك الحاسبة اختيار هذه العناصر ضمن
                النتيجة النهائية. ويتم احتساب جلسات السطح على المساحة المتبقية من
                السطح بعد خصم مساحة الملحق العلوي، مع تسعير يختلف حسب المستوى
                التجاري أو القياسي أو الفاخر.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-xl font-bold text-gold mb-4">
                جدول مراحل تنفيذ بناء فيلا
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 text-right text-white/70">
                      الحفر والأساسات
                    </td>
                    <td className="py-3 text-left font-bold text-white">
                      2 – 3 أسابيع
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 text-right text-white/70">
                      الهيكل الخرساني
                    </td>
                    <td className="py-3 text-left font-bold text-white">
                      2 – 3 أشهر
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 text-right text-white/70">
                      التمديدات الأساسية
                    </td>
                    <td className="py-3 text-left font-bold text-white">
                      1 – 2 شهر
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-right text-white/70">
                      التشطيبات والتسليم
                    </td>
                    <td className="py-3 text-left font-bold text-white">
                      3 – 5 أشهر
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 text-white/80 text-sm leading-7">
                مدة التنفيذ الإجمالية التقريبية لفيلا سكنية غالبًا تتراوح بين 8
                إلى 12 شهرًا، حسب حجم المشروع ومستوى التشطيب ونطاق الأعمال
                الإضافية.
              </div>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
              <h3 className="text-xl font-bold text-gold mb-4">
                هل تريد معرفة أسعار البنود التفصيلية؟
              </h3>

              <p className="text-white/85 leading-8">
                إذا كنت تريد معرفة تكلفة البنود والكميات بشكل تفصيلي، يمكنك
                الانتقال إلى الحاسبة التفصيلية الخاصة بالتشطيب والبنود، والتي
                تساعدك على تسعير الأعمال التفصيلية بشكل أوضح.
              </p>

              <div className="mt-4">
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-3 text-sm font-extrabold text-black hover:opacity-90 transition"
                >
                  فتح الحاسبة التفصيلية
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6">
                أسئلة شائعة حول تكلفة بناء الفلل في الرياض
              </h2>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <div>
                  <h3 className="font-bold text-white mb-2">
                    هل هذه الحاسبة تعطي سعرًا نهائيًا؟
                  </h3>
                  <p>
                    لا، الحاسبة تعطي تقديرًا أوليًا سريعًا بناءً على المدخلات التي
                    يحددها المستخدم، بينما السعر النهائي يعتمد على المخططات
                    والموقع والمعاينة.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-2">
                    هل تشمل الحاسبة البدروم والمصعد والمسبح؟
                  </h3>
                  <p>
                    نعم، يمكن احتساب البدروم والمصعد والمسبح ضمن النتيجة التقديرية
                    حسب الخيارات المختارة داخل الحاسبة.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-2">
                    كيف تُحسب جلسات السطح؟
                  </h3>
                  <p>
                    يتم احتساب جلسات السطح على المساحة المتبقية من السطح بعد خصم
                    مساحة الملحق العلوي، وتختلف قيمة المتر حسب المستوى التجاري أو
                    القياسي أو الفاخر.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <h3 className="text-xl font-bold text-gold mb-4">ملاحظات مهمة</h3>

              <ul className="space-y-2 text-white/80 leading-7 text-sm">
                <li>✔️ النتيجة التقديرية ليست عرض سعر نهائي.</li>
                <li>✔️ تعتمد الدقة النهائية على المخططات والموقع ونطاق العمل.</li>
                <li>
                  ✔️ تم اعتماد نسبة البناء التقديرية حسب عدد الشوارع وعرض الشارع
                  الرئيسي بافتراض أن الأرض مربعة.
                </li>
                <li>✔️ يمكن تعديل نسبة البدروم حسب مشروعك.</li>
                <li>
                  ✔️ تم اعتماد الصفحة كحاسبة تفاعلية مخصصة لتقدير تكلفة البناء في
                  الرياض.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}