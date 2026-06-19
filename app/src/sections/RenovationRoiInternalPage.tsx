import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

type PropertyType = "villa" | "apartment";
type ItemCondition = "good" | "average" | "poor";
type OverallCondition = "good" | "average" | "tired" | "deteriorated";
type Priority = "essential" | "high" | "medium" | "low" | "avoid";
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

function conditionCostMultiplier(condition: ItemCondition) {
  if (condition === "poor") return 1.28;
  if (condition === "average") return 1;
  return 0.82;
}

function conditionImpactMultiplier(condition: ItemCondition) {
  if (condition === "poor") return 1.35;
  if (condition === "average") return 1;
  return 0.55;
}

function overallConditionLabel(condition: OverallCondition) {
  if (condition === "good") return "جيد — يحتاج لمسات فقط";
  if (condition === "average") return "متوسط — قديم بصريًا";
  if (condition === "tired") return "متعب — يحتاج تجهيز قبل البيع";
  return "متهالك بصريًا — سعره الحالي متأثر بالحالة";
}

function overallConditionCap(condition: OverallCondition, hasMoisture: boolean, propertyType: PropertyType) {
  const villaCaps: Record<OverallCondition, number> = {
    good: 2.5,
    average: 5.5,
    tired: 9,
    deteriorated: hasMoisture ? 15 : 12.5,
  };

  const apartmentCaps: Record<OverallCondition, number> = {
    good: 2,
    average: 4.5,
    tired: 7,
    deteriorated: hasMoisture ? 10.5 : 9,
  };

  return propertyType === "villa" ? villaCaps[condition] : apartmentCaps[condition];
}

function overallImpactMultiplier(condition: OverallCondition) {
  if (condition === "good") return 0.42;
  if (condition === "average") return 0.78;
  if (condition === "tired") return 1.12;
  return 1.42;
}

function priorityLabel(priority: Priority) {
  if (priority === "essential") return "ضروري إذا المشكلة موجودة";
  if (priority === "high") return "أولوية عالية";
  if (priority === "medium") return "أولوية متوسطة";
  if (priority === "low") return "حسب الحالة";
  return "لا ننصح غالبًا";
}

function priorityClass(priority: Priority) {
  if (priority === "essential") return "bg-red-50 text-red-800 border-red-200";
  if (priority === "high") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (priority === "medium") return "bg-yellow-50 text-yellow-800 border-yellow-200";
  if (priority === "low") return "bg-slate-50 text-slate-700 border-slate-200";
  return "bg-red-50 text-red-700 border-red-200";
}

function groupLabel(group: Group) {
  if (group === "general") return "تجهيز عام";
  if (group === "interior") return "داخل العقار";
  if (group === "exterior") return "الانطباع الخارجي";
  return "حماية السعر";
}

function applyOverlapReduction(value: number) {
  if (value <= 1) return value;
  if (value <= 3) return 1 + (value - 1) * 0.68;
  if (value <= 7) return 2.36 + (value - 3) * 0.48;
  return 4.28 + (value - 7) * 0.32;
}

function resultLabel(score: number, netHigh: number, netLow: number) {
  if (score >= 75 && netHigh > 0) return "خطة ترميم عالية الجدوى";
  if (score >= 55 && netHigh > 0) return "خطة جيدة لكن تحتاج ضبط ميزانية";
  if (netHigh > 0 || netLow > -25000) return "خطة لتحسين البيع أكثر من كونها ربحًا مضمونًا";
  return "الخطة الحالية مكلفة مقارنة بالعائد المتوقع";
}

function resultText(score: number, netHigh: number, netLow: number) {
  if (score >= 75 && netHigh > 0) {
    return "الخطة تبدو مناسبة لعقار قيمته الحالية متأثرة بالحالة، وقد تستعيد جزءًا من القيمة الضائعة إذا كانت البنود المختارة تعالج عيوبًا ظاهرة فعلًا.";
  }

  if (score >= 55 && netHigh > 0) {
    return "الخطة قد تكون جيدة، لكن الأفضل تقليل البنود ذات التكلفة العالية والتركيز على البنود التي تظهر في الصور والمعاينة الأولى.";
  }

  if (netHigh > 0 || netLow > -25000) {
    return "هذه الخطة قد تساعد على تقليل تفاوض المشتري وتسريع البيع، لكنها ليست بالضرورة ربحًا ماليًا مباشرًا. راقب سقف سعر العقارات المجددة المشابهة.";
  }

  return "التكلفة المختارة مرتفعة مقارنة بالأثر المالي المتوقع. لا ننصح بتنفيذ كل البنود؛ اختر خطة أخف وأعلى عائدًا.";
}

function safeRange(low: number, high: number) {
  return high < low ? { low: high, high: low } : { low, high };
}

export default function RenovationRoiInternalPage() {
  const [propertyType, setPropertyType] = useState<PropertyType>("villa");
  const [builtArea, setBuiltArea] = useState(600);
  const [landArea, setLandArea] = useState(500);
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [renovatedComparableValue, setRenovatedComparableValue] = useState(2160000);
  const [overallCondition, setOverallCondition] = useState<OverallCondition>("tired");
  const [age, setAge] = useState(15);
  const [bathrooms, setBathrooms] = useState(5);
  const [isCorner, setIsCorner] = useState(true);
  const [facadeCount, setFacadeCount] = useState<1 | 2>(2);
  const [yardVisible, setYardVisible] = useState(true);
  const [paintCondition, setPaintCondition] = useState<ItemCondition>("average");
  const [bathCondition, setBathCondition] = useState<ItemCondition>("average");
  const [exteriorCondition, setExteriorCondition] = useState<ItemCondition>("average");
  const [yardCondition, setYardCondition] = useState<ItemCondition>("average");
  const [hasMoisture, setHasMoisture] = useState(false);

  const normalized = useMemo(() => {
    const safeBuiltArea = clampNumber(builtArea, 600, 50);
    const safeLandArea = clampNumber(landArea, 500, 100);
    const safeValue = clampNumber(propertyValue, 2000000, 100000);
    const safeComparable = clampNumber(renovatedComparableValue, 0, 0);
    const safeBathrooms = clampNumber(bathrooms, 1, 0);
    const safeAge = clampNumber(age, 10, 0);
    const floorsFactor = propertyType === "villa" ? 2.45 : 1;
    const estimatedFootprint = safeBuiltArea / floorsFactor;
    const estimatedYardArea = propertyType === "villa" ? Math.max(0, safeLandArea - estimatedFootprint) : 0;
    const estimatedWallLm = propertyType === "villa" ? Math.sqrt(safeLandArea) * 4 : 0;
    const visibleWallLm = estimatedWallLm * (isCorner ? 0.78 : 0.48);
    const comparableGapPercent = safeComparable > safeValue ? ((safeComparable - safeValue) / safeValue) * 100 : null;

    return {
      safeBuiltArea,
      safeLandArea,
      safeValue,
      safeComparable,
      safeBathrooms,
      safeAge,
      estimatedFootprint,
      estimatedYardArea,
      estimatedWallLm,
      visibleWallLm,
      comparableGapPercent,
    };
  }, [age, bathrooms, builtArea, isCorner, landArea, propertyType, propertyValue, renovatedComparableValue]);

  const items = useMemo<RenovationItem[]>(() => {
    const { safeBuiltArea, safeBathrooms, safeAge, estimatedYardArea, visibleWallLm } = normalized;

    const ageBoost = safeAge >= 25 ? 1.18 : safeAge >= 15 ? 1.08 : safeAge >= 8 ? 0.92 : 0.72;
    const overallBoost = overallImpactMultiplier(overallCondition);
    const paintQty = safeBuiltArea * (paintCondition === "poor" ? 6.2 : paintCondition === "average" ? 5.2 : 4.4);
    const exteriorCostBoost = conditionCostMultiplier(exteriorCondition);
    const exteriorImpact = conditionImpactMultiplier(exteriorCondition) * overallBoost * (isCorner ? 1.16 : 1);
    const yardCostBoost = conditionCostMultiplier(yardCondition);
    const yardImpact = conditionImpactMultiplier(yardCondition) * overallBoost * (yardVisible ? 1.15 : 0.68) * (estimatedYardArea > 120 ? 1.08 : 0.92);
    const bathCostBoost = conditionCostMultiplier(bathCondition);
    const bathImpact = conditionImpactMultiplier(bathCondition) * overallBoost;
    const paintImpact = conditionImpactMultiplier(paintCondition) * overallBoost * ageBoost;

    return [
      {
        id: "deep-clean-staging",
        title: "تنظيف عميق وتجهيز للتصوير",
        subtitle: "تنظيف، إزالة مخلفات، غسيل، ترتيب بصري وتجهيز العقار للصور والمعاينة.",
        group: "general",
        quantity: safeBuiltArea,
        unit: "م² مسطحات",
        costLow: 2500 + safeBuiltArea * 7,
        costHigh: 5500 + safeBuiltArea * 16,
        impactLow: 0.35 * overallBoost,
        impactHigh: 1.15 * overallBoost,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: "high",
        note: "من أعلى البنود عائدًا لأنه قليل التكلفة ويغيّر صور الإعلان والانطباع الأول بسرعة.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "interior-paint",
        title: "دهان داخلي محايد",
        subtitle: "دهان داخلي بألوان حيادية مع معالجة تشققات خفيفة حسب الحالة.",
        group: "interior",
        quantity: paintQty,
        unit: "م² دهان تقديري",
        costLow: paintQty * 14 * conditionCostMultiplier(paintCondition),
        costHigh: paintQty * 34 * conditionCostMultiplier(paintCondition),
        impactLow: 0.8 * paintImpact,
        impactHigh: 2.7 * paintImpact,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: "high",
        note: "الدهان يستعيد جزءًا من القيمة الضائعة عندما يكون العقار قديمًا بصريًا، لكنه ليس حلًا لعيوب إنشائية أو تسربات.",
        enabledByDefault: true,
        visible: true,
      },
      {
        id: "bathrooms-light-renovation",
        title: "تحسين الحمامات بدون تكسير كامل",
        subtitle: "خلاطات، مرايا، إكسسوارات، سيليكون، فواصل، إنارة ومعالجة شكلية. ليس ترميمًا فاخرًا كاملًا.",
        group: "interior",
        quantity: safeBathrooms,
        unit: "حمام",
        costLow: safeBathrooms * 6500 * bathCostBoost,
        costHigh: safeBathrooms * 14500 * bathCostBoost,
        impactLow: Math.min(4.2, safeBathrooms * 0.32 * bathImpact),
        impactHigh: Math.min(6.5, safeBathrooms * 0.92 * bathImpact),
        visualImpact: "مرتفع",
        negotiationImpact: "مرتفع",
        priority: "high",
        note: "قبل البيع الأفضل تحسين خفيف أو متوسط. التكسير الكامل لا ننصح به إلا إذا الحمام منفّر جدًا أو فيه مشاكل واضحة.",
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
        costLow: hasMoisture ? 15000 : 0,
        costHigh: hasMoisture ? 70000 : 0,
        impactLow: hasMoisture ? 2.0 * overallBoost : 0,
        impactHigh: hasMoisture ? 5.2 * overallBoost : 0,
        visualImpact: hasMoisture ? "مرتفع" : "منخفض",
        negotiationImpact: hasMoisture ? "مرتفع جدًا" : "منخفض",
        priority: hasMoisture ? "essential" : "low",
        note: hasMoisture
          ? "هذا بند استعادة قيمة وحماية سعر؛ الرطوبة تعطي المشتري سببًا قويًا لكسر السعر بأكثر من تكلفة الإصلاح أحيانًا."
          : "لا يتم احتساب هذا البند إذا لم توجد رطوبة أو تسربات ظاهرة.",
        enabledByDefault: hasMoisture,
        visible: hasMoisture,
      },
      {
        id: "external-wall-gate",
        title: "السور الخارجي والبوابة",
        subtitle: "معالجة تشققات، دهان خارجي، تنظيف بوابة، تحسين مدخل ولمسات إنارة بسيطة.",
        group: "exterior",
        quantity: visibleWallLm,
        unit: "م طولي ظاهر",
        costLow: visibleWallLm * 200 * exteriorCostBoost + 5000,
        costHigh: visibleWallLm * 520 * exteriorCostBoost + 18000,
        impactLow: 0.7 * exteriorImpact,
        impactHigh: 2.6 * exteriorImpact,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "high" : "avoid",
        note: "السور والبوابة أول ما يراه المشتري من الشارع. التحسين الذكي أفضل من كسوة فاخرة لا تناسب كل الأذواق.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "facade-main",
        title: "الواجهة الرئيسية",
        subtitle: "تنظيف، دهان/بروفايل بسيط، معالجة تشققات ورفع الانطباع الخارجي بدون مبالغة.",
        group: "exterior",
        quantity: safeBuiltArea * (facadeCount === 2 ? 0.36 : 0.23),
        unit: "م² واجهة تقديرية",
        costLow: safeBuiltArea * (facadeCount === 2 ? 58 : 40) * exteriorCostBoost,
        costHigh: safeBuiltArea * (facadeCount === 2 ? 155 : 95) * exteriorCostBoost,
        impactLow: (facadeCount === 2 ? 0.9 : 0.62) * exteriorImpact,
        impactHigh: (facadeCount === 2 ? 3.4 : 2.25) * exteriorImpact,
        visualImpact: "مرتفع جدًا",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "high" : "avoid",
        note: "الواجهة ترفع الانطباع الأول، خصوصًا إذا العقار على زاوية. الهدف تجهيز للبيع وليس تصميم واجهة فاخرة بذوق شخصي.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "yard-sale-prep",
        title: "تجهيز الحوش للبيع",
        subtitle: "تنظيف، إصلاح بلاط مختار، إنارة، تصريف، ولمسات زراعة خفيفة منخفضة الصيانة.",
        group: "exterior",
        quantity: estimatedYardArea,
        unit: "م² حوش تقديري",
        costLow: Math.max(7000, estimatedYardArea * 55 * yardCostBoost),
        costHigh: Math.max(18000, estimatedYardArea * 185 * yardCostBoost),
        impactLow: 0.45 * yardImpact,
        impactHigh: 2.15 * yardImpact,
        visualImpact: "مرتفع",
        negotiationImpact: "متوسط",
        priority: propertyType === "villa" ? "medium" : "avoid",
        note: "الحوش يستاهل إذا كان ظاهرًا في الصور أو عند الدخول. لا ننصح بجلسات فاخرة أو تصميم شخصي قبل البيع.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "exterior-lighting",
        title: "إنارة خارجية للسور والمدخل",
        subtitle: "إنارة بسيطة للسور والبوابة والمدخل تعطي إحساس حداثة وأمان في الصور والمعاينة المسائية.",
        group: "exterior",
        quantity: propertyType === "villa" ? visibleWallLm : 0,
        unit: "م طولي ظاهر",
        costLow: propertyType === "villa" ? Math.max(6000, visibleWallLm * 90) : 0,
        costHigh: propertyType === "villa" ? Math.max(22000, visibleWallLm * 220) : 0,
        impactLow: propertyType === "villa" ? 0.3 * exteriorImpact : 0,
        impactHigh: propertyType === "villa" ? 1.05 * exteriorImpact : 0,
        visualImpact: "مرتفع",
        negotiationImpact: "منخفض",
        priority: propertyType === "villa" ? "medium" : "avoid",
        note: "تكلفتها غالبًا أقل من أثرها البصري، خصوصًا للفلل ذات السور والمدخل الواضح.",
        enabledByDefault: propertyType === "villa",
        visible: propertyType === "villa",
      },
      {
        id: "interior-lighting-switches",
        title: "إنارة ومفاتيح داخلية",
        subtitle: "تحديث الإنارة والمفاتيح الظاهرة بدون إعادة كهرباء شاملة.",
        group: "interior",
        quantity: safeBuiltArea,
        unit: "م² مسطحات",
        costLow: safeBuiltArea * 30,
        costHigh: safeBuiltArea * 75,
        impactLow: 0.45 * overallBoost,
        impactHigh: 1.45 * overallBoost,
        visualImpact: "مرتفع",
        negotiationImpact: "منخفض",
        priority: "medium",
        note: "يعطي إحساسًا أن العقار أحدث، لكنه لا يغني عن إصلاح أعطال الكهرباء الحقيقية إن وجدت.",
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
        costHigh: safeBuiltArea * 68,
        impactLow: 0.25 * overallBoost,
        impactHigh: 1.15 * overallBoost,
        visualImpact: "متوسط",
        negotiationImpact: "متوسط",
        priority: "low",
        note: "لا ننصح بتغيير الأرضيات كاملة قبل البيع إلا إذا كانت مكسرة أو منفرة بوضوح.",
        enabledByDefault: false,
        visible: true,
      },
    ];
  }, [
    bathCondition,
    facadeCount,
    hasMoisture,
    isCorner,
    normalized,
    overallCondition,
    exteriorCondition,
    paintCondition,
    propertyType,
    yardCondition,
    yardVisible,
  ]);

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

    const rawLow = Object.values(groups).reduce((sum, group) => sum + group.low, 0);
    const rawHigh = Object.values(groups).reduce((sum, group) => sum + group.high, 0);

    const overlapLow = Object.values(groups).reduce((sum, group) => sum + applyOverlapReduction(group.low), 0);
    const overlapHigh = Object.values(groups).reduce((sum, group) => sum + applyOverlapReduction(group.high), 0);

    const conditionCap = overallConditionCap(overallCondition, hasMoisture, propertyType);
    const marketCap = normalized.comparableGapPercent ?? conditionCap;
    const finalCap = Math.max(0, Math.min(conditionCap, marketCap));

    const adjustedLow = Math.min(finalCap, overlapLow);
    const adjustedHigh = Math.min(finalCap, Math.max(overlapHigh, adjustedLow));

    const valueLow = normalized.safeValue * (adjustedLow / 100);
    const valueHigh = normalized.safeValue * (adjustedHigh / 100);
    const avgCost = (costLow + costHigh) / 2 || 1;
    const avgValue = (valueLow + valueHigh) / 2;
    const recoveryRatio = avgValue / avgCost;
    const netLow = valueLow - costHigh;
    const netHigh = valueHigh - costLow;
    const avgNet = ((netLow + netHigh) / 2);
    const roiOnSpendLow = costHigh > 0 ? (netLow / costHigh) * 100 : 0;
    const roiOnSpendHigh = costLow > 0 ? (netHigh / costLow) * 100 : 0;

    const score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          recoveryRatio * 36 +
            Math.max(0, avgNet / Math.max(avgCost, 1)) * 18 +
            selectedItems.filter((item) => item.priority === "essential" || item.priority === "high").length * 4 +
            (hasMoisture ? 8 : 0) -
            selectedItems.filter((item) => item.priority === "low").length * 2
        )
      )
    );

    return {
      costLow,
      costHigh,
      rawLow,
      rawHigh,
      overlapLow,
      overlapHigh,
      conditionCap,
      marketCap,
      finalCap,
      adjustedLow,
      adjustedHigh,
      valueLow,
      valueHigh,
      netLow,
      netHigh,
      roiOnSpendLow,
      roiOnSpendHigh,
      score,
      recoveryRatio,
      groups,
    };
  }, [hasMoisture, normalized.comparableGapPercent, normalized.safeValue, overallCondition, propertyType, selectedItems]);

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
      .slice(0, 6);
  }, [normalized.safeValue, visibleItems]);

  const suggestedLeanPlan = useMemo(() => {
    return recommendedItems
      .filter((item) => item.priority === "essential" || item.priority === "high" || item.id === "exterior-lighting")
      .slice(0, 4);
  }, [recommendedItems]);

  const waText = encodeURIComponent(
    `السلام عليكم، أريد تجربة تقييم ترميم عقار قبل البيع من PYBCCO.\n` +
      `نوع العقار: ${propertyType === "villa" ? "فيلا" : "شقة"}\n` +
      `حالة العقار: ${overallConditionLabel(overallCondition)}\n` +
      `مساحة المسطحات: ${formatNumber(normalized.safeBuiltArea)} م²\n` +
      `قيمة العقار الحالية وهو على وضعه: ${formatSAR(normalized.safeValue)} ريال\n` +
      `قيمة عقار مشابه مجدد: ${normalized.safeComparable > 0 ? formatSAR(normalized.safeComparable) : "غير محددة"} ريال\n` +
      `البنود المختارة: ${selectedItems.map((item) => item.title).join("، ")}\n` +
      `التكلفة التقريبية: ${formatSAR(result.costLow)} - ${formatSAR(result.costHigh)} ريال\n` +
      `استعادة القيمة المحتملة: ${formatPercent(result.adjustedLow)} - ${formatPercent(result.adjustedHigh)}\n` +
      `صافي الفرق التقريبي: ${formatSAR(result.netLow)} - ${formatSAR(result.netHigh)} ريال\n` +
      `رابط الصفحة التجريبية: https://pybcco.com${INTERNAL_PATH}`
  );

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  const netRange = safeRange(result.netLow, result.netHigh);
  const roiRange = safeRange(result.roiOnSpendLow, result.roiOnSpendHigh);
  const currentResultLabel = resultLabel(result.score, result.netHigh, result.netLow);
  const currentResultText = resultText(result.score, result.netHigh, result.netLow);

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-slate-950">
      <SeoHead
        title="حاسبة عائد الترميم قبل البيع | صفحة داخلية تجريبية"
        description="صفحة داخلية تجريبية لتقدير البنود التي قد تستعيد جزءًا من قيمة العقار الحالية قبل البيع."
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
                نموذج مالي مبني على قيمة العقار وهو على وضعه الحالي
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              ماذا ترمم قبل بيع العقار؟
              <span className="block text-yellow-400">أقل تكلفة لاستعادة أعلى قيمة مفقودة</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
              هذه النسخة تحسب الفرق بين قيمة العقار الحالية وهو متعب أو غير مجهز للبيع، وبين الزيادة المحتملة بعد ترميم ذكي. الهدف ليس إضافة رفاهية، بل استعادة جزء من القيمة التي خسرها العقار بسبب الحالة البصرية أو العيوب الظاهرة.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">المدخل المالي</p>
                <p className="mt-1 font-black text-yellow-300">As-is → Renovated</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">السقف الواقعي</p>
                <p className="mt-1 font-black text-yellow-300">حسب عقار مشابه مجدد</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-slate-300">بنود مستبعدة</p>
                <p className="mt-1 font-black text-yellow-300">المطبخ والديكور الشخصي</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-slate-950 shadow-2xl lg:p-6">
            <h2 className="text-xl font-black">بيانات العقار</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              القيمة الأولى هي قيمة العقار الحالية وهو على وضعه. القيمة الثانية اختيارية لكنها مهمة لوضع سقف للعائد حسب السوق.
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
                <span className="text-sm font-bold">حالة العقار الحالية</span>
                <select
                  value={overallCondition}
                  onChange={(e) => setOverallCondition(e.target.value as OverallCondition)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400"
                >
                  <option value="good">جيد — يحتاج لمسات فقط</option>
                  <option value="average">متوسط — قديم بصريًا</option>
                  <option value="tired">متعب — يحتاج تجهيز قبل البيع</option>
                  <option value="deteriorated">متهالك بصريًا — سعره الحالي متأثر بالحالة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">قيمة العقار الحالية وهو على وضعه</span>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-yellow-400"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">قيمة عقار مشابه مجدد في نفس الحي</span>
                <input
                  type="number"
                  value={renovatedComparableValue}
                  onChange={(e) => setRenovatedComparableValue(Number(e.target.value))}
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

                <label className="flex items-center gap-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={yardVisible}
                    onChange={(e) => setYardVisible(e.target.checked)}
                    className="h-5 w-5 accent-yellow-500"
                  />
                  الحوش ظاهر في الصور أو عند الدخول
                </label>

                <label className="space-y-2 sm:col-span-2">
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
                <select value={paintCondition} onChange={(e) => setPaintCondition(e.target.value as ItemCondition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة الحمامات</span>
                <select value={bathCondition} onChange={(e) => setBathCondition(e.target.value as ItemCondition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة السور/الواجهة</span>
                <select value={exteriorCondition} onChange={(e) => setExteriorCondition(e.target.value as ItemCondition)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400">
                  <option value="good">جيدة</option>
                  <option value="average">متوسطة</option>
                  <option value="poor">سيئة</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-bold">حالة الحوش</span>
                <select value={yardCondition} onChange={(e) => setYardCondition(e.target.value as ItemCondition)} disabled={propertyType !== "villa"} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold outline-none focus:border-yellow-400 disabled:bg-slate-100 disabled:text-slate-400">
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
              كل بند يمكن تفعيله أو إلغاؤه. الأثر هنا يعني استعادة محتملة من قيمة العقار الحالية إذا كانت حالته تسبب خصمًا في السوق. لا يوجد مطبخ ضمن البنود المقترحة لأن كثيرًا من المشترين في السعودية يفضلون تفصيل مطبخ جديد بعد الشراء.
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
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                        {groupLabel(item.group)}
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
                    <p className="text-xs font-bold text-slate-500">استعادة محتملة من قيمته الحالية</p>
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
            <h2 className="mt-5 text-2xl font-black md:text-3xl">{currentResultLabel}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{currentResultText}</p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">التكلفة التقريبية المختارة</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatSAR(result.costLow)} – {formatSAR(result.costHigh)} ريال
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">الأثر الخام قبل سقف الحالة والسوق</p>
                <p className="mt-2 text-xl font-black text-slate-100">
                  {formatPercent(result.rawLow)} – {formatPercent(result.rawHigh)}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  هذا الرقم لا يُستخدم مباشرة، لأنه يحتوي تداخلًا بين البنود مثل السور والواجهة والحوش والإنارة.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">استعادة القيمة المحتملة بعد التداخل والسقف الواقعي</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatPercent(result.adjustedLow)} – {formatPercent(result.adjustedHigh)}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  سقف الحالة: {formatPercent(result.conditionCap)} — سقف السوق حسب العقار المجدد المشابه: {formatPercent(result.marketCap)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">قيمة الزيادة المحتملة على عقار قيمته الحالية {formatSAR(normalized.safeValue)} ريال</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">
                  {formatSAR(result.valueLow)} – {formatSAR(result.valueHigh)} ريال
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  نحتسب الزيادة من قيمة العقار الحالية وهو على وضعه، وليس من قيمة عقار مجدد مسبقًا.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm text-slate-300">صافي الفرق التقريبي بعد خصم تكلفة الترميم</p>
                <p className={`mt-2 text-2xl font-black ${result.netHigh >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                  {formatSAR(netRange.low)} – {formatSAR(netRange.high)} ريال
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  العائد على مبلغ الترميم نفسه: {formatPercent(roiRange.low)} – {formatPercent(roiRange.high)} تقريبًا.
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
              الترتيب مبني على تكلفة البند مقارنة بقيمة الأثر المحتمل على العقار الحالي. الأرقام تقديرية وتحتاج ضبطًا من بيانات فعلية لاحقًا.
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

            <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <h3 className="font-black text-emerald-900">الخطة الأخف المقترحة</h3>
              <p className="mt-2 text-sm leading-7 text-emerald-800">
                عند ضعف الجدوى، نبدأ بهذه البنود فقط بدل تنفيذ كل شيء:
              </p>
              <ul className="mt-3 space-y-2 text-sm font-bold leading-7 text-emerald-900">
                {suggestedLeanPlan.map((item) => (
                  <li key={item.id}>• {item.title}</li>
                ))}
              </ul>
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
              <h3 className="font-black">تنبيه مهم</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                هذه الحاسبة تقديرية وليست تثمينًا عقاريًا رسميًا. يجب مقارنة النتيجة بسعر عقارات مشابهة مجددة في نفس الحي، لأن سقف السوق أهم من أي معادلة داخلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 lg:p-8">
          <h2 className="text-2xl font-black">منهجية الأرقام في هذه النسخة</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">١. قيمة العقار الحالية</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">هي قيمة العقار وهو على وضعه الحالي. إذا كان متعبًا، فالترميم الذكي قد يستعيد قيمة ضائعة.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">٢. سقف الحالة والسوق</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">لا نسمح للنسب أن تتجاوز سقف حالة العقار أو الفرق بينه وبين عقار مشابه مجدد في نفس الحي.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="font-black">٣. منع جمع النسب بشكل مباشر</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">السور والواجهة والحوش والإنارة تخدم نفس الانطباع، لذلك يتم تخفيض أثر التداخل بينها.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
