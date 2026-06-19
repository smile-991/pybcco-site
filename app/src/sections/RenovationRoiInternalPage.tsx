import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

type PropertyType = "villa" | "apartment";
type Condition = "good" | "average" | "poor";
type Priority = "high" | "medium" | "low" | "avoid";
type Group = "general" | "interior" | "exterior" | "protection";

type RenovationItem = {
  id: string;
  title: string;
  subtitle: string;
  group: Group;
  quantity: number;
  unit: string;
  costLow: number;
  costHigh: number;
  impactLow: number;
  impactHigh: number;
  visualImpact: "مرتفع جدًا" | "مرتفع" | "متوسط" | "منخفض";
  negotiationImpact: "مرتفع جدًا" | "مرتفع" | "متوسط" | "منخفض";
  priority: Priority;
  note: string;
  enabledByDefault: boolean;
  visible: boolean;
};

const INTERNAL_PATH = "/internal/renovation-roi-test";
const WHATSAPP_NUMBER = "966550604837";

function clampNumber(value: number, fallback: number, min = 0) {
  if (!Number.isFinite(value) || value < min) return fallback;
  return value;
}

function formatSAR(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function conditionMultiplier(condition: Condition) {
  if (condition === "poor") return 1.25;
  if (condition === "average") return 1;
  return 0.75;
}

function conditionImpactBoost(condition: Condition) {
  if (condition === "poor") return 1.25;
  if (condition === "average") return 1;
  return 0.65;
}

function priorityLabel(priority: Priority) {
  if (priority === "high") return "أولوية عالية";
  if (priority === "medium") return "أولوية متوسطة";
  if (priority === "low") return "حسب الحالة";
  return "لا ننصح غالبًا";
}

function priorityClass(priority: Priority) {
  if (priority === "high") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (priority === "medium") return "bg-yellow-50 text-yellow-800 border-yellow-200";
  if (priority === "low") return "bg-slate-50 text-slate-700 border-slate-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function applyOverlapReduction(value: number) {
  if (value <= 1) return value;
  if (value <= 2.5) return 1 + (value - 1) * 0.65;
  return 1.975 + (value - 2.5) * 0.45;
}

export default function RenovationRoiInternalPage() {
  const [propertyType, setPropertyType] = useState<PropertyType>("villa");
  const [builtArea, setBuiltArea] = useState(600);
  const [landArea, setLandArea] = useState(500);
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [age, setAge] = useState(15);
  const [bathrooms, setBathrooms] = useState(5);
  const [isCorner, setIsCorner] = useState(true);
  const [facadeCount, setFacadeCount] = useState<1 | 2>(2);
  const [paintCondition, setPaintCondition] = useState<Condition>("average");
  const [bathCondition, setBathCondition] = useState<Condition>("average");
  const [exteriorCondition, setExteriorCondition] = useState<Condition>("average");
  const [yardCondition, setYardCondition] = useState<Condition>("average");
  const [hasMoisture, setHasMoisture] = useState(false);

  const normalized = useMemo(() => {
    const safeBuiltArea = clampNumber(builtArea, 600, 50);
    const safeLandArea = clampNumber(landArea, 500, 100);
    const safeValue = clampNumber(propertyValue, 2000000, 100000);
    const safeBathrooms = clampNumber(bathrooms, 1, 0);
    const safeAge = clampNumber(age, 10, 0);
    const floorsFactor = propertyType === "villa" ? 2.5 : 1;
    const estimatedFootprint = safeBuiltArea / floorsFactor;
    const estimatedYardArea = Math.max(0, safeLandArea - estimatedFootprint);
    const estimatedWallLm = propertyType === "villa" ? Math.sqrt(safeLandArea) * 4 : 0;
    const visibleWallLm = estimatedWallLm * (isCorner ? 0.75 : 0.45);

    return {
      safeBuiltArea,
      safeLandArea,
      safeValue,
      safeBathrooms,
      safeAge,
      estimatedFootprint,
      estimatedYardArea,
      estimatedWallLm,
      visibleWallLm,
    };
  }, [age, bathrooms, builtArea, isCorner, landArea, propertyType, propertyValue]);

  const items = useMemo<RenovationItem[]>(() => {
    const {
      safeBuiltArea,
      safeBathrooms,
      safeAge,
      estimatedYardArea,
      visibleWallLm,
    } = normalized;

    const ageBoost = safeAge >= 20 ? 1.15 : safeAge >= 10 ? 1 : 0.8;
    const paintQty = safeBuiltArea * (paintCondition === "poor" ? 5.8 : paintCondition === "average" ? 5 : 4.2);
    const exteriorBoost = conditionMultiplier(exteriorCondition);
    const exteriorImpact = conditionImpactBoost(exteriorCondition) * (isCorner ? 1.15 : 1);
    const yardBoost = conditionMultiplier(yardCondition);
    const yardImpact = conditionImpactBoost(yardCondition) * (estimatedYardArea > 120 ? 1.15 : 0.9);
    const bathBoost = conditionMultiplier(bathCondition);
    const bathImpact = conditionImpactBoost(bathCondition);

    return [
      {
        id: "deep-clean-staging",
        title: "تنظيف عميق وتجهيز للتصوير",
        subtitle: "تنظيف، إزالة مخلفات، ترتيب بصري قبل الإعلان والمعاينة.",
        group: "general",
        quantity: safeBuiltArea,
        unit: "م² مسطحات",
        costLow: 2500 + safeBuiltArea * 6,
        costHigh: 4500 + safeBuiltArea * 14,
        impactLow: 0.1,
        impactHigh: 0.35,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: "high",
        note: "من أعلى البنود عائدًا لأنه قليل التكلفة ويرفع جودة الصور والانطباع الأول.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "interior-paint",
        title: "دهان داخلي محايد",
        subtitle: "دهان نظيف بألوان حيادية بدون زخرفة شخصية.",
        group: "interior",
        quantity: paintQty,
        unit: "م² دهان تقديري",
        costLow: paintQty * 12 * conditionMultiplier(paintCondition),
        costHigh: paintQty * 22 * conditionMultiplier(paintCondition),
        impactLow: 0.35 * conditionImpactBoost(paintCondition),
        impactHigh: 0.95 * conditionImpactBoost(paintCondition) * ageBoost,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: "high",
        note: "الدهان لا يضمن رفع السعر وحده، لكنه يقلل إحساس أن العقار متعب ويقوي صور الإعلان.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "bathrooms-light-renovation",
        title: "تحسين الحمامات بدون تكسير كامل",
        subtitle: "خلاطات، مرايا، إكسسوارات، سيليكون، فواصل، إنارة ومعالجة شكلية.",
        group: "interior",
        quantity: safeBathrooms,
        unit: "حمام",
        costLow: safeBathrooms * 6000 * bathBoost,
        costHigh: safeBathrooms * 11000 * bathBoost,
        impactLow: Math.min(1.2, safeBathrooms * 0.18 * bathImpact),
        impactHigh: Math.min(2.2, safeBathrooms * 0.38 * bathImpact),
        visualImpact: "مرتفع",
        negotiationImpact: "مرتفع",
        priority: "high",
        note: "قبل البيع نوصي بتحسين خفيف أو متوسط، وليس ترميم حمام فاخر كامل إلا عند الضرورة.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "moisture-leaks",
        title: "معالجة رطوبة أو تسربات ظاهرة",
        subtitle: "إصلاح مصدر المشكلة ومعالجة الأثر الظاهر قبل المعاينة.",
        group: "protection",
        quantity: 1,
        unit: "بند",
        costLow: hasMoisture ? 12000 : 0,
        costHigh: hasMoisture ? 55000 : 0,
        impactLow: hasMoisture ? 0.7 : 0,
        impactHigh: hasMoisture ? 1.8 : 0,
        visualImpact: hasMoisture ? "مرتفع" : "منخفض",
        negotiationImpact: hasMoisture ? "مرتفع جدًا" : "منخفض",
        priority: hasMoisture ? "high" : "low",
        note: hasMoisture
          ? "هذا بند حماية للسعر أكثر من كونه بند تجميلي؛ الرطوبة تعطي المشتري سببًا قويًا للتفاوض.": "لا يتم احتساب هذا البند إذا لم توجد رطوبة أو تسربات ظاهرة.",
        enabledByDefault: hasMoisture,
        visible: hasMoisture,
      },
      {
        id: "external-wall-gate",
        title: "السور الخارجي والبوابة",
        subtitle: "معالجة تشققات، دهان خارجي، تنظيف بوابة ولمسات إنارة بسيطة.",
        group: "exterior",
        quantity: visibleWallLm,
        unit: "م طولي ظاهر",
        costLow: visibleWallLm * 180 * exteriorBoost + 4000,
        costHigh: visibleWallLm * 420 * exteriorBoost + 14000,
        impactLow: 0.25 * exteriorImpact,
        impactHigh: 0.9 * exteriorImpact,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "high" : "avoid",
        note: "السور والبوابة أول ما يراه المشتري من الشارع؛ التحسين الذكي أفضل من كسوة فاخرة مكلفة.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "facade-main",
        title: "الواجهة الرئيسية",
        subtitle: "دهان/تنظيف/معالجة شكل الواجهة الظاهرة بدون مبالغة في الكسوة.",
        group: "exterior",
        quantity: safeBuiltArea * (facadeCount === 2 ? 0.34 : 0.22),
        unit: "م² واجهة تقديرية",
        costLow: safeBuiltArea * (facadeCount === 2 ? 52 : 36) * exteriorBoost,
        costHigh: safeBuiltArea * (facadeCount === 2 ? 135 : 82) * exteriorBoost,
        impactLow: (facadeCount === 2 ? 0.45 : 0.3) * exteriorImpact,
        impactHigh: (facadeCount === 2 ? 1.45 : 1.0) * exteriorImpact,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "high" : "avoid",
        note: "الأفضل قبل البيع واجهة نظيفة ومحايدة، وليس تصميمًا فاخرًا بذوق شخصي.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "yard-sale-prep",
        title: "تجهيز الحوش للبيع",
        subtitle: "تنظيف، إصلاح بلاط مختار، إنارة، تصريف ولمسات زراعة خفيفة منخفضة الصيانة.",
        group: "exterior",
        quantity: estimatedYardArea,
        unit: "م² حوش تقديري",
        costLow: Math.max(6000, estimatedYardArea * 55 * yardBoost),
        costHigh: Math.max(16000, estimatedYardArea * 165 * yardBoost),
        impactLow: 0.2 * yardImpact,
        impactHigh: 1.1 * yardImpact,
        visualImpact: "مرتفع",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "medium" : "avoid",
        note: "الحوش يستاهل إذا كان ظاهرًا ومؤثرًا بالصور؛ لا ننصح بجلسات فاخرة أو تصميم شخصي قبل البيع.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "exterior-lighting",
        title: "إنارة خارجية للسور والمدخل",
        subtitle: "إنارة بسيطة تعطي إحساس حداثة وأمان في الصور والمعاينة المسائية.",
        group: "exterior",
        quantity: propertyType === "villa" ? visibleWallLm : 0,
        unit: "م طولي ظاهر",
        costLow: propertyType === "villa" ? Math.max(5000, visibleWallLm * 80) : 0,
        costHigh: propertyType === "villa" ? Math.max(18000, visibleWallLm * 180) : 0,
        impactLow: propertyType === "villa" ? 0.15 * exteriorImpact : 0,
        impactHigh: propertyType === "villa" ? 0.55 * exteriorImpact : 0,
        visualImpact: "مرتفع",
        negotiationImpact: "منخفض",
        priority: propertyType === "villa" ? "medium" : "avoid",
        note: "تكلفتها غالبًا أقل من أثرها البصري، خصوصًا للفلل ذات المدخل الواضح.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "interior-lighting-switches",
        title: "إنارة ومفاتيح داخلية",
        subtitle: "تحديث إنارة ومفاتيح ظاهرة بدون إعادة كهرباء شاملة.",
        group: "interior",
        quantity: safeBuiltArea,
        unit: "م² مسطحات",
        costLow: safeBuiltArea * 25,
        costHigh: safeBuiltArea * 55,
        impactLow: 0.2,
        impactHigh: 0.65,
        visualImpact: "مرتفع",
        negotiationImpact: "منخفض",
        priority: "medium",
        note: "يعطي إحساسًا أن العقار أحدث، لكنه لا يغني عن إصلاح الأعطال الحقيقية.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "floor-repair-polish",
        title: "إصلاح وتلميع أرضيات مختارة",
        subtitle: "معالجة المناطق المتعبة والفواصل والتلميع بدل تغيير الأرضيات كاملة.",
        group: "interior",
        quantity: safeBuiltArea,
        unit: "م² مسطحات",
        costLow: safeBuiltArea * 18,
        costHigh: safeBuiltArea * 55,
        impactLow: 0.15,
        impactHigh: 0.55,
        visualImpact: "متوسط",
        negotiationImpact: "متوسط",
        priority: "low",
        note: "لا ننصح بتغيير الأرضيات كاملة قبل البيع إلا إذا كانت مكسرة أو منفرة بوضوح.",
        enabledByDefault: false,
        visible: true,
      },
    ];
  }, [bathCondition, facadeCount, hasMoisture, isCorner, normalized, exteriorCondition, paintCondition, propertyType, yardCondition]);

  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "deep-clean-staging": true,
    "interior-paint": true,
    "bathrooms-light-renovation": true,
    "moisture-leaks": false,
    "external-wall-gate": true,
    "facade-main": true,
    "yard-sale-prep": true,
    "exterior-lighting": true,
    "interior-lighting-switches": true,
    "floor-repair-polish": false,
  });

  const visibleItems = items.filter((item) => item.visible);
  const selectedItems = visibleItems.filter((item) => enabled[item.id]);

  const result = useMemo(() => {
    const costLow = selectedItems.reduce((sum, item) => sum + item.costLow, 0);
    const costHigh = selectedItems.reduce((sum, item) => sum + item.costHigh, 0);

    const groups: Record<Group, { low: number; high: number }> = {
      general: { low: 0, high: 0 },
      interior: { low: 0, high: 0 },
      exterior: { low: 0, high: 0 },
      protection: { low: 0, high: 0 },
    };

    selectedItems.forEach((item) => {
      groups[item.group].low += item.impactLow;
      groups[item.group].high += item.impactHigh;
    });

    const adjustedLow = Math.min(
      propertyType === "villa" ? 4.5 : 2.8,
      Object.values(groups).reduce((sum, group) => sum + applyOverlapReduction(group.low), 0)
    );

    const adjustedHigh = Math.min(
      propertyType === "villa" ? 5.2 : 3.4,
      Object.values(groups).reduce((sum, group) => sum + applyOverlapReduction(group.high), 0)
    );

    const valueLow = normalized.safeValue * (adjustedLow / 100);
    const valueHigh = normalized.safeValue * (adjustedHigh / 100);
    const avgCost = (costLow + costHigh) / 2 || 1;
    const avgValue = (valueLow + valueHigh) / 2;
    const efficiency = avgValue / avgCost;

    const score = Math.max(
      0,
      Math.min(100, Math.round(efficiency * 38 + selectedItems.length * 3 + (hasMoisture ? 8 : 0)))
    );

    return {
      costLow,
      costHigh,
      adjustedLow,
      adjustedHigh,
      valueLow,
      valueHigh,
      score,
      efficiency,
      groups,
    };
  }, [hasMoisture, normalized.safeValue, propertyType, selectedItems]);

  const recommendedItems = useMemo(() => {
    return [...visibleItems]
      .map((item) => {
        const avgImpact = (item.impactLow + item.impactHigh) / 2;
        const avgCost = (item.costLow + item.costHigh) / 2 || 1;
        const valueImpact = normalized.safeValue * (avgImpact / 100);
        return { ...item, efficiency: valueImpact / avgCost };
      })
      .filter((item) => item.priority !== "avoid")
      .sort((a, b) => b.efficiency - a.efficiency)
      .slice(0, 5);
  }, [normalized.safeValue, visibleItems]);

  const waText = encodeURIComponent(
    `السلام عليكم، أريد تجربة تقييم ترميم عقار قبل البيع من PYBCCO.\n` +
      `نوع العقار: ${propertyType === "villa" ? "فيلا" : "شقة"}\n` +
      `مساحة المسطحات: ${formatNumber(normalized.safeBuiltArea)} م²\n` +
      `قيمة العقار التقريبية: ${formatSAR(normalized.safeValue)} ريال\n` +
      `البنود المختارة: ${selectedItems.map((item) => item.title).join("، ")}\n` +
      `التكلفة التقريبية: ${formatSAR(result.costLow)} - ${formatSAR(result.costHigh)} ريال\n` +
      `الأثر المحتمل: ${formatPercent(result.adjustedLow)} - ${formatPercent(result.adjustedHigh)}\n` +
      `رابط الصفحة التجريبية: https://pybcco.com${INTERNAL_PATH}`
  );

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-950">
      <SeoHead
        title="حاسبة عائد الترميم قبل البيع | صفحة داخلية تجريبية"
        description="صفحة داخلية تجريبية لتقدير البنود التي قد تحسن جاذبية العقار قبل البيع وتقلل تفاوض المشتري."
        canonical={`https://pybcco.com${INTERNAL_PATH}`}
        robots="noindex,nofollow"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "حاسبة عائد الترميم قبل البيع - نسخة تجريبية داخلية",
          applicationCategory: "Calculator",
          operatingSystem: "All",
          url: `https://pybcco.com${INTERNAL_PATH}`,
        }}
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-extrabold text-yellow-300">
                صفحة داخلية تجريبية — Noindex
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
                لا تظهر للزوار إلا بالرابط المباشر
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              ماذا ترمم قبل بيع العقار؟
              <span className="block text-yellow-400">أقل تكلفة لأعلى أثر على قرار المشتري</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
              هذه نسخة تجريبية لحاسبة تساعد مالك الفيلا أو الشقة على اختيار البنود التي قد ترفع جاذبية العقار قبل البيع وتقلل تفاوض المشتري، بدون الدخول في ترميم فاخر أو ذوق شخصي قد لا يسترد تكلفته.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">فلسفة الصفحة</p>
                <p className="mt-1 font-black text-yellow-300">لا ترمم كل شيء</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">التركيز</p>
                <p className="mt-1 font-black text-yellow-300">الانطباع + تقليل التفاوض</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">ملاحظة</p>
                <p className="mt-1 font-black text-yellow-300">بدون مطبخ افتراضيًا</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl lg:p-6">
            <h2 className="text-xl font-black">بيانات العقار</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              أدخل أرقام تقريبية للتجربة. جميع النتائج تقديرية وليست تثمينًا عقاريًا رسميًا.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-bold">نوع العقار</span>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400"
                >
                  <option value="villa">فيلا</option>
                  <option value="apartment">شقة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">قيمة العقار التقريبية</span>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">مساحة المسطحات م²</span>
                <input
                  type="number"
                  value={builtArea}
                  onChange={(e) => setBuiltArea(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">مساحة الأرض م²</span>
                <input
                  type="number"
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                  disabled={propertyType !== "villa"}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">عمر العقار</span>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">عدد الحمامات</span>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400"
                />
              </label>
            </div>

            {propertyType === "villa" && (
              <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={isCorner}
                    onChange={(e) => {
                      setIsCorner(e.target.checked);
                      setFacadeCount(e.target.checked ? 2 : 1);
                    }}
                    className="h-5 w-5 accent-yellow-500"
                  />
                  العقار على زاوية
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-bold">عدد الواجهات الظاهرة</span>
                  <select
                    value={facadeCount}
                    onChange={(e) => setFacadeCount(Number(e.target.value) as 1 | 2)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400"
                  >
                    <option value={1}>واجهة واحدة</option>
                    <option value={2}>واجهتان</option>
                  </select>
                </label>
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-bold">حالة الدهان الداخلي</span>
                <select value={paintCondition} onChange={(e) => setPaintCondition(e.target.value as Condition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة الحمامات</span>
                <select value={bathCondition} onChange={(e) => setBathCondition(e.target.value as Condition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة السور/الواجهة</span>
                <select value={exteriorCondition} onChange={(e) => setExteriorCondition(e.target.value as Condition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة الحوش</span>
                <select value={yardCondition} onChange={(e) => setYardCondition(e.target.value as Condition)} disabled={propertyType !== "villa"} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400 disabled:bg-slate-100 disabled:text-slate-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>
            </div>

            <label className="mt-5 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-800">
              <input
                type="checkbox"
                checked={hasMoisture}
                onChange={(e) => {
                  setHasMoisture(e.target.checked);
                  setEnabled((prev) => ({ ...prev, "moisture-leaks": e.target.checked }));
                }}
                className="h-5 w-5 accent-red-600"
              />
              يوجد رطوبة أو تسربات ظاهرة
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">اختر البنود التي تريد اختبارها</h2>
            <p className="mt-3 max-w-3xl leading-8 text-slate-600">
              كل بند يمكن تفعيله أو إلغاؤه. لا يوجد مطبخ ضمن البنود المقترحة لأن كثيرًا من المشترين في السعودية يفضلون تفصيل مطبخ جديد بعد الشراء.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm shadow-sm">
            <span className="font-bold text-slate-500">البنود المختارة: </span>
            <span className="font-black text-slate-950">{selectedItems.length}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {visibleItems.map((item) => {
            const checked = Boolean(enabled[item.id]);
            return (
              <div key={item.id} className={`rounded-3xl border bg-white p-5 shadow-sm transition ${checked ? "border-yellow-300 ring-2 ring-yellow-100" : "border-slate-200"}`}>
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setEnabled((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                    className="mt-1 h-6 w-6 accent-yellow-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black">{item.title}</h3>
                      <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${priorityClass(item.priority)}`}>
                        {priorityLabel(item.priority)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.subtitle}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">الكمية التقديرية</p>
                    <p className="mt-1 font-black">{formatNumber(item.quantity)} {item.unit}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">تكلفة التنفيذ</p>
                    <p className="mt-1 font-black">{formatSAR(item.costLow)} – {formatSAR(item.costHigh)} ريال</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold text-slate-500">الأثر المحتمل</p>
                    <p className="mt-1 font-black">{formatPercent(item.impactLow)} – {formatPercent(item.impactHigh)}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-500">الأثر على الصور والانطباع</p>
                    <p className="mt-1 font-black text-slate-900">{item.visualImpact}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-xs font-bold text-slate-500">الأثر على تفاوض المشتري</p>
                    <p className="mt-1 font-black text-slate-900">{item.negotiationImpact}</p>
                  </div>
                </div>

                <p className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold leading-7 text-yellow-900">
                  {item.note}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl lg:p-8">
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-black text-black">النتيجة التجريبية</span>
            <h2 className="mt-5 text-2xl font-black md:text-3xl">خطة الترميم المختارة</h2>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">التكلفة التقريبية المختارة</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatSAR(result.costLow)} – {formatSAR(result.costHigh)} ريال
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">الأثر المحتمل بعد احتساب تداخل البنود</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatPercent(result.adjustedLow)} – {formatPercent(result.adjustedHigh)}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  لا يتم جمع النسب بشكل مباشر لأن الواجهة والسور والحوش والإنارة كلها تؤثر على نفس الانطباع الخارجي.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">قيمة الأثر التقريبية على عقار بقيمة {formatSAR(normalized.safeValue)} ريال</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatSAR(result.valueLow)} – {formatSAR(result.valueHigh)} ريال
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">مؤشر جدوى الترميم قبل البيع</p>
                <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${result.score}%` }} />
                </div>
                <p className="mt-2 text-2xl font-black text-yellow-300">{result.score} / 100</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center rounded-2xl bg-yellow-400 px-6 py-4 text-center text-sm font-black text-black transition hover:bg-yellow-300">
                إرسال النتيجة على واتساب
              </a>
              <Link to="/home-renovation-company-riyadh" className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/20 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white hover:text-black">
                صفحة ترميم المنازل
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 lg:p-8">
            <h2 className="text-2xl font-black">أفضل البنود حسب الجدوى</h2>
            <p className="mt-3 leading-8 text-slate-600">
              هذه قائمة ترتيب داخلية تساعدنا نقرر ما الذي يجب أن نعرضه للعميل أولًا. ليست وعدًا بزيادة سعر البيع.
            </p>

            <div className="mt-6 space-y-3">
              {recommendedItems.map((item, index) => (
                <div key={item.id} className="flex gap-4 rounded-3xl bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 font-black text-black">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{item.note}</p>
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      تكلفة: {formatSAR(item.costLow)} – {formatSAR(item.costHigh)} ريال
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-5">
              <h3 className="font-black text-red-800">بنود غير مفضلة قبل البيع</h3>
              <ul className="mt-3 space-y-2 text-sm font-bold leading-7 text-red-800">
                <li>• المطبخ: لا يدخل في الحاسبة لأن كثيرًا من المشترين يفضلون تفصيل مطبخهم الخاص.</li>
                <li>• المسبح الجديد: مكلف ومشتريه محدود وقد لا يسترد تكلفته.</li>
                <li>• الديكورات الفاخرة أو الشخصية: قد لا تناسب ذوق المشتري.</li>
                <li>• تغيير الأرضيات كاملًا: لا ننصح به إلا إذا كانت الأرضيات منفرة أو مكسرة بوضوح.</li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="font-black">تنبيه قانوني/تسويقي مهم</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                هذه الحاسبة تقديرية لمساعدة المالك على اختيار بنود تجهيز العقار قبل البيع. لا تعتبر تثمينًا عقاريًا رسميًا، ولا تضمن رفع سعر البيع. الهدف هو تحسين الجاذبية، تقليل ملاحظات المشتري، وربما تسريع قرار الشراء.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 lg:p-8">
          <h2 className="text-2xl font-black">ملاحظات تنفيذ V1</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">الصفحة داخلية</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">لا تضفها للنافبار أو الفوتر أو السايت ماب الآن. اتركها noindex للتجربة.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">الأرقام قابلة للتعديل</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">المعادلات الحالية تقديرية. بعد التجربة نضبط أسعار الدهان، الحمامات، السور، الواجهة والحوش حسب أسعارك الفعلية.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">المرحلة التالية</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">نضيف حفظ lead في Supabase، تقرير PDF، وربط النتيجة بطلب معاينة تجهيز عقار للبيع.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
