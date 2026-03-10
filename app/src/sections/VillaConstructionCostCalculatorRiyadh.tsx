import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

type ServiceType = "bone" | "finishing" | "turnkey";
type Level = "commercial" | "standard" | "luxury";

type ActivatedUser = {
  phone: string;
  activatedAt: string;
  hasProject: boolean;
  clientId: string | null;
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

const DEFAULT_BUILD_RATIO_BY_STREETS: Record<string, number> = {
  "1": 70,
  "2": 60,
  "3": 50,
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

export default function VillaConstructionCostCalculatorRiyadh() {
  const title = "حاسبة تكلفة بناء فيلا في الرياض 2026 | بنيان الهرم";
  const description =
    "حاسبة تفاعلية لتقدير تكلفة بناء فيلا في الرياض حسب مساحة الأرض وعدد الشوارع ونوع الخدمة والبدروم والمصعد والمسبح. احصل على ملخص تقديري سريع قابل للطباعة.";
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
      "أداة تفاعلية لحساب تكلفة بناء الفيلا في الرياض حسب مساحة الأرض وعدد الشوارع ونوع الخدمة والبدروم والمصعد والمسبح.",
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
  const [buildRatio, setBuildRatio] = useState<number>(
    DEFAULT_BUILD_RATIO_BY_STREETS["1"]
  );

  const [hasBasement, setHasBasement] = useState(false);
  const [basementRatio, setBasementRatio] = useState<string>("60");

  const [hasElevator, setHasElevator] = useState(false);
  const [hasPool, setHasPool] = useState(false);

  const [governmentFees, setGovernmentFees] = useState<string>("");

  const [hasRoofSeating, setHasRoofSeating] = useState(false);
  const [roofSeatingAmount, setRoofSeatingAmount] = useState<string>("0");

  const [showResult, setShowResult] = useState(false);

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
    setBuildRatio(DEFAULT_BUILD_RATIO_BY_STREETS[streetCount] ?? 70);
  }, [streetCount]);

  const landAreaNumber = useMemo(() => {
    const n = Number(landArea);
    return Number.isFinite(n) ? n : 0;
  }, [landArea]);

  const governmentFeesNumber = useMemo(() => {
    const n = Number(governmentFees);
    return Number.isFinite(n) ? n : 0;
  }, [governmentFees]);

  const roofSeatingAmountNumber = useMemo(() => {
    const n = Number(roofSeatingAmount);
    return Number.isFinite(n) ? n : 0;
  }, [roofSeatingAmount]);

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

  const basementArea = useMemo(() => {
    if (!hasBasement) return 0;
    return groundFloorArea * (basementRatioNumber / 100);
  }, [hasBasement, groundFloorArea, basementRatioNumber]);

  const activeRate = useMemo(() => {
    if (serviceType === "bone") return BONE_RATE;
    if (serviceType === "finishing") return FINISHING_RATES[level];
    return TURNKEY_RATES[level];
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

  const totalCost = useMemo(() => {
    return (
      mainAreaCost +
      basementCost +
      excavationCost +
      elevatorCost +
      poolCost +
      governmentFeesNumber +
      (hasRoofSeating ? roofSeatingAmountNumber : 0)
    );
  }, [
    mainAreaCost,
    basementCost,
    excavationCost,
    elevatorCost,
    poolCost,
    governmentFeesNumber,
    hasRoofSeating,
    roofSeatingAmountNumber,
  ]);

  const averageCostPerM2 = useMemo(() => {
    const totalBuiltForAverage = mainBuiltArea + basementArea;
    if (totalBuiltForAverage <= 0) return 0;
    return totalCost / totalBuiltForAverage;
  }, [totalCost, mainBuiltArea, basementArea]);

  const distribution = useMemo(() => {
    if (totalCost <= 0) {
      return {
        structure: 0,
        finishing: 0,
        external: 0,
        misc: 0,
      };
    }

    if (serviceType === "bone") {
      return {
        structure: 78,
        finishing: 0,
        external: 10,
        misc: 12,
      };
    }

    if (serviceType === "finishing") {
      return {
        structure: 0,
        finishing: 72,
        external: 12,
        misc: 16,
      };
    }

    return {
      structure: 40,
      finishing: 42,
      external: 8,
      misc: 10,
    };
  }, [serviceType, totalCost]);

  const marketValueRange = useMemo(() => {
    const low = totalCost * 1.18;
    const high = totalCost * 1.35;
    return { low, high };
  }, [totalCost]);

  const serviceLabel = getServiceLabel(serviceType);
  const levelLabel = getLevelLabel(level);

  const detailedCalculatorLink = "/villa-finishing-price-riyadh";

  const whatsappText = encodeURIComponent(
    `السلام عليكم، أريد مراجعة هذا التقدير من بنيان الهرم (PYBCCO).\n` +
      `نوع الخدمة: ${serviceLabel}\n` +
      `${serviceType !== "bone" ? `المستوى: ${levelLabel}\n` : ""}` +
      `مساحة الأرض: ${formatNumber(landAreaNumber)} م²\n` +
      `عدد الشوارع: ${streetCount}\n` +
      `نسبة البناء: ${formatNumber(buildRatio)}%\n` +
      `مساحة البناء الكلية: ${formatNumber(mainBuiltArea)} م²\n` +
      `${hasBasement ? `مساحة البدروم: ${formatNumber(basementArea)} م²\n` : ""}` +
      `الإجمالي التقديري: ${formatSAR(totalCost)} ريال\n` +
      `رابط الحاسبة: ${canonical}`
  );

  const waLink = `https://wa.me/966550604837?text=${whatsappText}`;

  const handlePrint = () => {
    window.print();
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
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-estimate, #print-estimate * {
            visibility: visible !important;
          }
          #print-estimate {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 24px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/VillaFinishingPriceRiyadh.webp"
          alt="حاسبة تكلفة بناء فيلا في الرياض – بنيان الهرم للمقاولات"
          className="absolute inset-0 h-full w-full object-cover"
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
            الشوارع ونوع الخدمة والبدروم والمصعد والمسبح.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                const el = document.getElementById("calc");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              ابدأ الحساب الآن
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
                أدخل بيانات المشروع ثم احصل على ملخص تقديري واضح قابل للطباعة،
                مع توضيح المسطحات والحفر والبدروم والمصعد والمسبح.
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
                  نسبة البناء (%)
                </div>
                <input
                  value={String(buildRatio)}
                  onChange={(e) => {
                    const n = Number(e.target.value.replace(/[^\d.]/g, ""));
                    setBuildRatio(Number.isFinite(n) ? n : 0);
                    setShowResult(false);
                  }}
                  inputMode="decimal"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm text-white/70 mb-2">
                  الأوراق الحكومية (اختياري)
                </div>
                <input
                  value={governmentFees}
                  onChange={(e) => {
                    setGovernmentFees(e.target.value.replace(/[^\d.]/g, ""));
                    setShowResult(false);
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
                      }}
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                    <span>تشطيب جلسات سطح</span>
                    <input
                      type="checkbox"
                      checked={hasRoofSeating}
                      onChange={(e) => {
                        setHasRoofSeating(e.target.checked);
                        setShowResult(false);
                      }}
                    />
                  </label>
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
                      }}
                      inputMode="decimal"
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    />
                  </div>
                )}

                {hasRoofSeating && (
                  <div className="mt-4">
                    <div className="text-sm text-white/70 mb-2">
                      تكلفة جلسات السطح (اختياري)
                    </div>
                    <input
                      value={roofSeatingAmount}
                      onChange={(e) => {
                        setRoofSeatingAmount(
                          e.target.value.replace(/[^\d.]/g, "")
                        );
                        setShowResult(false);
                      }}
                      inputMode="decimal"
                      placeholder="مثال: 25000"
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
                    />
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
            <div id="print-estimate" className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="text-sm text-white/70">الملخص التقديري للمشروع</div>

              <div className="mt-2 text-3xl md:text-4xl font-extrabold">
                {formatSAR(totalCost)}{" "}
                <span className="text-lg font-semibold text-white/80">
                  ريال
                </span>
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
                  <div className="text-white/60">مساحة الأرض</div>
                  <div className="mt-1 font-bold">{formatNumber(landAreaNumber)} م²</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-white/60">نسبة البناء المعتمدة</div>
                  <div className="mt-1 font-bold">{formatNumber(buildRatio)}%</div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="text-lg font-extrabold text-gold">
                  المساحات المعتمدة
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/60">الدور الأرضي</div>
                    <div className="mt-1 font-bold">
                      {formatNumber(groundFloorArea)} م²
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/60">الدور الأول</div>
                    <div className="mt-1 font-bold">
                      {formatNumber(firstFloorArea)} م²
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/60">الملحق العلوي</div>
                    <div className="mt-1 font-bold">
                      {formatNumber(penthouseArea)} م²
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-white/60">مساحة البناء الكلية</div>
                    <div className="mt-1 font-bold text-gold">
                      {formatNumber(mainBuiltArea)} م²
                    </div>
                  </div>

                  {hasBasement && (
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:col-span-2">
                      <div className="text-white/60">مساحة البدروم</div>
                      <div className="mt-1 font-bold">
                        {formatNumber(basementArea)} م²
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="text-lg font-extrabold text-gold">
                  التكلفة التفصيلية
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-white/70">
                      <tr className="border-b border-white/10">
                        <th className="py-2 text-right">البند</th>
                        <th className="py-2 text-center">القيمة</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-3 text-right">
                          تكلفة المسطحات الأساسية
                        </td>
                        <td className="py-3 text-center font-bold">
                          {formatSAR(mainAreaCost)} ريال
                        </td>
                      </tr>

                      {hasBasement && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">تكلفة البدروم</td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(basementCost)} ريال
                          </td>
                        </tr>
                      )}

                      {serviceType !== "finishing" && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">الحفر التقديري</td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(excavationCost)} ريال
                          </td>
                        </tr>
                      )}

                      {hasElevator && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">
                            {serviceType === "bone"
                              ? "بيت المصعد التقديري"
                              : "المصعد"}
                          </td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(elevatorCost)} ريال
                          </td>
                        </tr>
                      )}

                      {hasPool && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">
                            {serviceType === "bone"
                              ? "مسبح خرساني تقديري"
                              : "المسبح"}
                          </td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(poolCost)} ريال
                          </td>
                        </tr>
                      )}

                      {hasRoofSeating && roofSeatingAmountNumber > 0 && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">جلسات السطح</td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(roofSeatingAmountNumber)} ريال
                          </td>
                        </tr>
                      )}

                      {governmentFeesNumber > 0 && (
                        <tr className="border-b border-white/10">
                          <td className="py-3 text-right">الأوراق الحكومية</td>
                          <td className="py-3 text-center font-bold">
                            {formatSAR(governmentFeesNumber)} ريال
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td className="py-3 text-right font-extrabold text-gold">
                          الإجمالي النهائي
                        </td>
                        <td className="py-3 text-center font-extrabold text-gold">
                          {formatSAR(totalCost)} ريال
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-gold font-bold mb-3">
                    معلومات إضافية عن المشروع
                  </div>

                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2 text-right text-white/70">
                          متوسط تكلفة المتر
                        </td>
                        <td className="py-2 text-left font-bold">
                          {formatSAR(averageCostPerM2)} ريال / م²
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-right text-white/70">
                          القيمة السوقية المتوقعة
                        </td>
                        <td className="py-2 text-left font-bold">
                          {formatSAR(marketValueRange.low)} –{" "}
                          {formatSAR(marketValueRange.high)} ريال
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-gold font-bold mb-3">
                    توزيع التكلفة داخل المشروع
                  </div>

                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2 text-right text-white/70">
                          الهيكل والخرسانة
                        </td>
                        <td className="py-2 text-left font-bold">
                          {distribution.structure}%
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 text-right text-white/70">
                          التشطيب
                        </td>
                        <td className="py-2 text-left font-bold">
                          {distribution.finishing}%
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 text-right text-white/70">
                          الأعمال الخارجية
                        </td>
                        <td className="py-2 text-left font-bold">
                          {distribution.external}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-right text-white/70">
                          بنود أخرى
                        </td>
                        <td className="py-2 text-left font-bold">
                          {distribution.misc}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-5 text-sm leading-8 text-white/80">
                يشمل التقدير الأعمال الأساسية حسب نوع الخدمة المختار. وتظهر تكلفة
                الحفر ضمن العظم وتسليم المفتاح فقط. مدة التنفيذ التقريبية:
                {serviceType === "bone"
                  ? " 4 إلى 6 أشهر."
                  : serviceType === "finishing"
                  ? " 3 إلى 5 أشهر."
                  : " 8 إلى 12 شهرًا."}
              </div>

              <div className="mt-4 text-xs text-white/60 leading-7">
                تم اعتماد نسبة البدروم الافتراضية 60% من مساحة الدور الأرضي مع
                إمكانية التعديل. تم اعتماد مسبح قياسي بمقاس 2.5 × 4 م لأغراض
                الحساب التقديري. هذا التقدير تم إنشاؤه عبر حاسبة تكلفة البناء على
                موقع pybcco.com
              </div>

              <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-5 md:p-6 no-print">
                <div className="text-base md:text-lg font-extrabold text-gold">
                  للاستفادة من خصم 3% على مشاريعك معنا
                </div>

                <p className="mt-2 text-sm md:text-base text-white/85 leading-8">
                  سجّل حسابك أو أنشئ حسابًا جديدًا للاستفادة من خصم 3%، وحفظ
                  التقدير، والانتقال لاحقًا إلى مسار الطلب والمتابعة بشكل أسهل.
                </p>

                <div className="mt-4 flex flex-col md:flex-row gap-3">
                  <Button
                    className="bg-gold text-black font-extrabold"
                    onClick={handlePrint}
                  >
                    طباعة PDF
                  </Button>

                  {!activatedUser?.phone && (
                    <Link
                      to="/create-account"
                      className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15 transition"
                    >
                      إنشاء حساب
                    </Link>
                  )}

                  <Link
                    to={detailedCalculatorLink}
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                  >
                    لمعرفة الأسعار التفصيلية للبنود اضغط هنا
                  </Link>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                  >
                    إرسال التقدير إلى واتساب
                  </a>
                </div>
              </div>
            </div>
          )}

          <section className="max-w-4xl mx-auto text-right no-print">
            <h2 className="text-2xl md:text-3xl font-bold text-gold">
              كيف تعمل حاسبة تكلفة البناء هذه؟
            </h2>

            <p className="mt-4 text-white/80 leading-relaxed">
              تعتمد هذه الحاسبة التفاعلية على مساحة الأرض، وعدد الشوارع، ونسبة
              البناء، ونوع الخدمة، ثم تضيف البنود الاختيارية مثل البدروم والمصعد
              والمسبح لتكوين ملخص سريع يساعدك على فهم التكلفة التقريبية قبل طلب
              العرض النهائي.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-white/80 text-sm leading-relaxed">
              <div className="font-bold text-white mb-2">مهم:</div>
              <ul className="space-y-2">
                <li>✔️ النتيجة تقديرية وليست عرض سعر نهائي.</li>
                <li>✔️ تعتمد الدقة النهائية على المخططات والموقع ونطاق العمل.</li>
                <li>✔️ يمكن تعديل نسبة البناء ونسبة البدروم حسب مشروعك.</li>
                <li>✔️ تم تعريف الصفحة لجوجل كحاسبة تفاعلية وليست مقالًا عاديًا.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}