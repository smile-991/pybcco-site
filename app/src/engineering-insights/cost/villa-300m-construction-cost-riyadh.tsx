import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardCheck,
  ExternalLink,
  HardHat,
  Home,
  Info,
  Layers3,
  MapPinned,
  MessageCircle,
  PhoneCall,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type JsonLd = Record<string, any>;
type ScenarioKey = "built" | "land";
type FinishLevel = "commercial" | "standard" | "luxury";

type Scenario = {
  key: ScenarioKey;
  title: string;
  shortTitle: string;
  description: string;
  mainArea: number;
  excavation: number;
  bone: number;
  finishing: Record<FinishLevel, number>;
  turnkey: Record<FinishLevel, number>;
  formulaLines: string[];
};

const SITE_URL = "https://pybcco.com";
const CANONICAL =
  "https://pybcco.com/engineering-insights/cost/villa-300m-construction-cost-riyadh";
const CALCULATOR_URL = "/villa-construction-cost-calculator-riyadh";
const PROJECTS_MAP_URL = "/projects-in-riyadh";
const PROJECTS_GALLERY_URL = "/projects";
const COMPANY_URL = "/construction-company-riyadh";
const HERO_IMAGE = "/projects/concrete/concrete-14.webp";

const DATE_PUBLISHED = "2026-03-06";
const DATE_MODIFIED = "2026-07-11";
const VIDEO_UPLOAD_DATE = "2026-03-14T12:00:00+03:00";
const VIDEO_DURATION = "PT29S";
const YOUTUBE_VIDEO_ID = "re44BUTtHUk";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;
const YOUTUBE_THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

// الأسعار نفسها المعتمدة داخل حاسبة الموقع، لضمان عدم تعارض المقال مع الأداة.
const BONE_RATE = 550;
const FINISHING_RATES: Record<FinishLevel, number> = {
  commercial: 700,
  standard: 900,
  luxury: 1300,
};
const TURNKEY_RATES: Record<FinishLevel, number> = {
  commercial: 1250,
  standard: 1450,
  luxury: 1850,
};
const EXCAVATION_RATE = 45;
const EXCAVATION_FACTOR = 1.7;

const BUILT_AREA_300 = 300;
const LAND_AREA_300 = 300;
const DEFAULT_BUILD_RATIO = 0.75;
const FLOORS_FACTOR = 2.7; // أرضي + أول + ملحق 70% وفق نموذج الحاسبة
const LAND_SCENARIO_BUILT_AREA =
  LAND_AREA_300 * DEFAULT_BUILD_RATIO * FLOORS_FACTOR;

function formatSAR(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function excavationCost(area: number) {
  return area * EXCAVATION_FACTOR * EXCAVATION_RATE;
}

function calculateScenario(
  key: ScenarioKey,
  mainArea: number,
  title: string,
  shortTitle: string,
  description: string,
  formulaLines: string[]
): Scenario {
  const excavation = excavationCost(mainArea);

  return {
    key,
    title,
    shortTitle,
    description,
    mainArea,
    excavation,
    bone: mainArea * BONE_RATE + excavation,
    finishing: {
      commercial: mainArea * FINISHING_RATES.commercial,
      standard: mainArea * FINISHING_RATES.standard,
      luxury: mainArea * FINISHING_RATES.luxury,
    },
    turnkey: {
      commercial: mainArea * TURNKEY_RATES.commercial + excavation,
      standard: mainArea * TURNKEY_RATES.standard + excavation,
      luxury: mainArea * TURNKEY_RATES.luxury + excavation,
    },
    formulaLines,
  };
}

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  built: calculateScenario(
    "built",
    BUILT_AREA_300,
    "300 م² إجمالي مسطحات بناء",
    "300 متر مسطحات",
    "هذا السيناريو مناسب عندما يكون مجموع مساحات الأدوار المبنية كلها 300 م²، وليس مساحة الأرض.",
    [
      "إجمالي المسطحات: 300 م²",
      "العظم: 300 × 550 ريال + حفر تقديري",
      "التسليم القياسي: 300 × 1,450 ريال + حفر تقديري",
    ]
  ),
  land: calculateScenario(
    "land",
    LAND_SCENARIO_BUILT_AREA,
    "أرض مساحتها 300 م²",
    "300 متر أرض",
    "مثال افتراضي لأرض على شارع واحد، بنسبة بناء تقديرية 75%، ودور أرضي وأول وملحق علوي 70%.",
    [
      "الدور الأرضي: 300 × 75% = 225 م²",
      "الدور الأول: 225 م²",
      "الملحق: 225 × 70% = 157.5 م²",
      "إجمالي المسطحات التقريبي: 607.5 م²",
    ]
  ),
};

const WHATSAPP_TEXT = encodeURIComponent(
  "السلام عليكم، اطلعت على صفحة تكلفة بناء فيلا 300 متر في موقع PYBCCO وأرغب في استفسار وتسعير مبدئي لمشروعي."
);
const WHATSAPP_URL = `https://wa.me/966550604837?text=${WHATSAPP_TEXT}`;

function buildArticleJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${CANONICAL}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    inLanguage: "ar",
    headline: "تكلفة بناء فيلا 300 متر بالرياض 2026 | عظم وتشطيب",
    description:
      "تعرف بالأرقام على تكلفة بناء فيلا 300 متر بالرياض، مع التفريق بين 300 متر أرض و300 متر مسطحات، وأمثلة للعظم والتشطيب وتسليم المفتاح.",
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: {
      "@type": "Organization",
      name: "شركة بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "شركة بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    image: [
      `${SITE_URL}${HERO_IMAGE}`,
      YOUTUBE_THUMBNAIL_URL,
    ],
    about: [
      "تكلفة بناء فيلا 300 متر بالرياض",
      "تكلفة بناء العظم",
      "تكلفة التشطيب",
      "تسليم مفتاح",
      "حاسبة تكلفة البناء",
    ],
  };
}

function buildVideoJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${CANONICAL}#video`,
    name: "قبل وأثناء وبعد تشطيب فيلا في الرياض | بنيان الهرم للمقاولات",
    description:
      "فيديو قصير يوضح مراحل تنفيذ مشروع فيلا في الرياض من قبل التنفيذ وأثناء العمل وحتى النتيجة النهائية.",
    thumbnailUrl: [YOUTUBE_THUMBNAIL_URL],
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: VIDEO_DURATION,
    embedUrl: YOUTUBE_EMBED_URL,
    isFamilyFriendly: true,
    inLanguage: "ar",
    publisher: {
      "@type": "Organization",
      name: "شركة بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
  };
}

function buildFaqJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${CANONICAL}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة بناء فيلا 300 متر بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "إذا كان المقصود 300 متر إجمالي مسطحات، فالتقدير القياسي لتسليم المفتاح في نموذج حاسبة PYBCCO يقارب 458 ألف ريال قبل الإضافات. أما إذا كان المقصود أرضًا مساحتها 300 متر، فقد تصبح المسطحات التقريبية 607.5 متر ويقارب التسليم القياسي 927 ألف ريال وفق افتراضات النموذج.",
        },
      },
      {
        "@type": "Question",
        name: "هل المقصود بـ300 متر مساحة الأرض أم مسطحات البناء؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يجب تحديد ذلك قبل أي حساب. مساحة الأرض لا تساوي إجمالي المسطحات المبنية؛ لأن عدد الأدوار ونسبة البناء والملحقات قد ترفع المسطحات إلى أكثر من ضعف مساحة الأرض.",
        },
      },
      {
        "@type": "Question",
        name: "كم تكلفة عظم فيلا بمسطحات 300 متر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "وفق سعر العظم المعتمد في حاسبة الموقع وهو 550 ريالًا للمتر، ومع إضافة حفر تقديري، تبلغ النتيجة التقريبية نحو 188 ألف ريال لمساحة مبنية إجمالية قدرها 300 متر.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأسعار تشمل المصعد والمسبح والبدروم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لا، الأرقام المعروضة في المثال الأساسي لا تشمل المصعد أو المسبح أو البدروم أو الرسوم الحكومية أو جلسات السطح. يمكن إضافة هذه الخيارات داخل الحاسبة للحصول على تقدير أقرب للمشروع.",
        },
      },
      {
        "@type": "Question",
        name: "هل التقدير الموجود عرض سعر نهائي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لا، هو تقدير مبدئي يساعد على فهم حدود الميزانية. السعر النهائي يحتاج إلى مخططات واضحة، وتحديد نطاق الأعمال والمواد، ومعاينة الموقع عند الحاجة.",
        },
      },
    ],
  };
}

function buildBreadcrumbJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${CANONICAL}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "رؤى هندسية",
        item: `${SITE_URL}/engineering-insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "التكلفة والتسعير",
        item: `${SITE_URL}/engineering-insights/cost`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "تكلفة بناء فيلا 300 متر بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

function PriceCell({ value, emphasized = false }: { value: number; emphasized?: boolean }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 text-center ${
        emphasized
          ? "border-amber-400 bg-amber-50 shadow-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className={`text-xl font-black ${emphasized ? "text-amber-700" : "text-slate-900"}`}>
        {formatSAR(value)}
      </div>
      <div className="mt-1 text-xs font-medium text-slate-500">ريال تقريبًا</div>
    </div>
  );
}

function ResourceCard({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: typeof Calculator;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 transition group-hover:bg-amber-500 group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-amber-700">
            افتح الصفحة <ChevronLeft className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Villa300mConstructionCostRiyadh() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("built");
  const scenario = SCENARIOS[scenarioKey];

  const jsonLd = useMemo(
    () => [
      buildArticleJsonLd(),
      buildVideoJsonLd(),
      buildFaqJsonLd(),
      buildBreadcrumbJsonLd(),
    ],
    []
  );

  return (
    <>
      <SeoHead
        title="تكلفة بناء فيلا 300 متر بالرياض 2026 | عظم وتشطيب | PYBCCO"
        description="تعرف بالأرقام على تكلفة بناء فيلا 300 متر بالرياض، مع توضيح الفرق بين 300 متر أرض و300 متر مسطحات، وأمثلة للعظم والتشطيب وتسليم المفتاح."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="article"
        ogImage={`${SITE_URL}${HERO_IMAGE}`}
        ogImageAlt="مشاريع بناء عظم فلل في الرياض - شركة بنيان الهرم للمقاولات"
        jsonLd={jsonLd}
      />

      <main dir="rtl" className="overflow-hidden bg-slate-50 text-slate-950">
        <section
          className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 pt-20 text-white"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(2,6,23,.97) 0%, rgba(2,6,23,.91) 48%, rgba(2,6,23,.45) 100%), url('${HERO_IMAGE}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,.22),transparent_36%)]" />
          <div className="container mx-auto px-4 py-14 md:py-20">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="مسار الصفحة">
              <Link to="/" className="transition hover:text-amber-300">الرئيسية</Link>
              <ChevronLeft className="h-4 w-4" />
              <Link to="/engineering-insights" className="transition hover:text-amber-300">رؤى هندسية</Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-white">تكلفة فيلا 300 متر</span>
            </nav>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_370px]">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200 backdrop-blur">
                    <CalendarDays className="h-4 w-4" />
                    محدّث في يوليو 2026
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                    <BadgeCheck className="h-4 w-4 text-amber-300" />
                    أرقام متطابقة مع حاسبة الموقع
                  </span>
                </div>

                <h1 className="mt-7 text-4xl font-black leading-[1.25] sm:text-5xl lg:text-6xl">
                  تكلفة بناء فيلا 300 متر بالرياض
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78 md:text-xl">
                  الجواب لا يبدأ برقم واحد، بل بسؤال حاسم: هل الـ300 متر هي مساحة الأرض أم إجمالي المسطحات؟ هنا تجد الحالتين بالأرقام، مع مثال حساب واضح وروابط مباشرة للحاسبة والمشاريع والتسعير.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="h-13 rounded-2xl bg-amber-500 px-6 font-bold text-slate-950 hover:bg-amber-400">
                    <Link to={CALCULATOR_URL}>
                      <Calculator className="ml-2 h-5 w-5" />
                      احسب مشروعك الآن
                    </Link>
                  </Button>

                  <Button asChild size="lg" variant="outline" className="h-13 rounded-2xl border-white/30 bg-white/5 px-6 font-bold text-white hover:bg-white hover:text-slate-950">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      استفسار وتسعير واتساب
                    </a>
                  </Button>

                  <Button asChild size="lg" variant="ghost" className="h-13 rounded-2xl px-5 font-bold text-white hover:bg-white/10 hover:text-amber-200">
                    <Link to={PROJECTS_MAP_URL}>
                      <MapPinned className="ml-2 h-5 w-5" />
                      خريطة مشاريعنا
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-amber-200">الجواب السريع</p>
                    <h2 className="mt-1 text-xl font-black">تسليم مفتاح قياسي</h2>
                  </div>
                  <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300">
                    <Banknote className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-sm text-white/65">إذا كانت 300 م² إجمالي المسطحات</p>
                    <p className="mt-1 text-3xl font-black text-amber-300">{formatSAR(SCENARIOS.built.turnkey.standard)} ريال</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-sm text-white/65">إذا كانت أرضًا 300 م² وفق المثال</p>
                    <p className="mt-1 text-3xl font-black text-amber-300">{formatSAR(SCENARIOS.land.turnkey.standard)} ريال</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  تقديرات مبدئية قبل البدروم والمصعد والمسبح والرسوم والإضافات الخاصة بالمشروع.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="quick-answer" className="relative z-10 -mt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl md:p-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-700">
                    <Ruler className="h-5 w-5" />
                    اختر معنى مساحة 300 متر
                  </span>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">الأرقام تتغير جذريًا حسب نوع المساحة</h2>
                  <p className="mt-3 max-w-3xl leading-8 text-slate-600">
                    اختر السيناريو الأقرب لحالتك، وستتغير الجداول والمثال الحسابي مباشرة.
                  </p>
                </div>

                <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5">
                  {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setScenarioKey(key)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition md:px-6 ${
                        scenarioKey === key
                          ? "bg-slate-950 text-white shadow-lg"
                          : "text-slate-600 hover:text-slate-950"
                      }`}
                    >
                      {SCENARIOS[key].shortTitle}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.8fr]">
                <div className="rounded-3xl bg-slate-950 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300">
                      {scenarioKey === "built" ? <Layers3 className="h-7 w-7" /> : <Home className="h-7 w-7" />}
                    </div>
                    <div>
                      <p className="text-sm text-white/60">السيناريو المختار</p>
                      <h3 className="font-black">{scenario.title}</h3>
                    </div>
                  </div>

                  <p className="mt-5 leading-8 text-white/70">{scenario.description}</p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/55">المسطحات المستخدمة في الحساب</p>
                    <p className="mt-1 text-3xl font-black text-amber-300">{formatSAR(scenario.mainArea)} م²</p>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm text-white/70">
                    {scenario.formulaLines.map((line) => (
                      <li key={line} className="flex gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-500">العظم مع الحفر التقديري</p>
                          <p className="mt-2 text-3xl font-black text-slate-950">{formatSAR(scenario.bone)}</p>
                          <p className="text-sm font-medium text-slate-500">ريال تقريبًا</p>
                        </div>
                        <HardHat className="h-9 w-9 text-amber-600" />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-amber-300 bg-amber-50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-amber-700">تسليم مفتاح قياسي</p>
                          <p className="mt-2 text-3xl font-black text-amber-800">{formatSAR(scenario.turnkey.standard)}</p>
                          <p className="text-sm font-medium text-amber-700/70">ريال تقريبًا</p>
                        </div>
                        <Sparkles className="h-9 w-9 text-amber-600" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black">تكلفة التشطيب فقط</h3>
                        <p className="mt-1 text-sm text-slate-500">بعد اكتمال العظم، بحسب مستوى المواد والتفاصيل.</p>
                      </div>
                      <Building2 className="h-8 w-8 text-slate-400" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-slate-600">تجاري</p>
                        <PriceCell value={scenario.finishing.commercial} />
                      </div>
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-amber-700">قياسي</p>
                        <PriceCell value={scenario.finishing.standard} emphasized />
                      </div>
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-slate-600">فاخر</p>
                        <PriceCell value={scenario.finishing.luxury} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5">
                    <h3 className="text-xl font-black">تكلفة تسليم المفتاح</h3>
                    <p className="mt-1 text-sm text-slate-500">العظم والتشطيب مع الحفر التقديري في النموذج الأساسي.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-slate-600">تجاري</p>
                        <PriceCell value={scenario.turnkey.commercial} />
                      </div>
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-amber-700">قياسي</p>
                        <PriceCell value={scenario.turnkey.standard} emphasized />
                      </div>
                      <div>
                        <p className="mb-2 text-center text-sm font-bold text-slate-600">فاخر</p>
                        <PriceCell value={scenario.turnkey.luxury} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:flex-row md:items-center">
                <div className="flex gap-3">
                  <Info className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
                  <p className="text-sm leading-7 text-amber-950/75">
                    الأرقام مبنية على أسعار الحاسبة الحالية: العظم 550 ريال/م²، والتشطيب 700–1,300 ريال/م²، وتسليم المفتاح 1,250–1,850 ريال/م². النتيجة ليست عرض سعر نهائيًا.
                  </p>
                </div>
                <Button asChild className="shrink-0 rounded-xl bg-slate-950 font-bold hover:bg-slate-800">
                  <Link to={CALCULATOR_URL}>خصص الحساب لمشروعك</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="min-w-0 space-y-14">
              <section id="example" className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-9">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-700">
                  <ClipboardCheck className="h-5 w-5" />
                  مثال حساب عملي
                </span>
                <h2 className="mt-3 text-2xl font-black md:text-3xl">
                  كيف وصلنا إلى تكلفة فيلا على أرض 300 متر؟
                </h2>
                <p className="mt-4 leading-8 text-slate-600">
                  في هذا المثال نستخدم الافتراض الأساسي داخل الحاسبة: أرض مساحتها 300 م²، شارع واحد، نسبة بناء تقديرية 75%، ودور أرضي وأول وملحق علوي يعادل 70% من مساحة الدور.
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-4">
                  {[
                    ["الأرضي", "225 م²"],
                    ["الأول", "225 م²"],
                    ["الملحق", "157.5 م²"],
                    ["الإجمالي", "607.5 م²"],
                  ].map(([label, value], index) => (
                    <div key={label} className={`rounded-2xl p-5 ${index === 3 ? "bg-amber-500 text-slate-950" : "bg-slate-100"}`}>
                      <p className={`text-sm font-bold ${index === 3 ? "text-slate-800" : "text-slate-500"}`}>{label}</p>
                      <p className="mt-2 text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-3xl bg-slate-950 p-6 text-white md:p-8">
                  <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                    <div>
                      <p className="text-sm text-white/55">المسطحات</p>
                      <p className="mt-1 text-2xl font-black">607.5 م²</p>
                    </div>
                    <div className="hidden text-2xl text-amber-300 md:block">×</div>
                    <div>
                      <p className="text-sm text-white/55">سعر التسليم القياسي</p>
                      <p className="mt-1 text-2xl font-black">1,450 ريال/م²</p>
                    </div>
                    <div className="hidden text-2xl text-amber-300 md:block">+</div>
                    <div>
                      <p className="text-sm text-white/55">الحفر التقديري</p>
                      <p className="mt-1 text-2xl font-black">{formatSAR(SCENARIOS.land.excavation)} ريال</p>
                    </div>
                  </div>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-sm font-bold text-amber-300">الإجمالي المبدئي</p>
                      <p className="mt-1 text-4xl font-black text-white">{formatSAR(SCENARIOS.land.turnkey.standard)} ريال</p>
                    </div>
                    <p className="max-w-sm text-sm leading-7 text-white/55">
                      قبل البدروم والمصعد والمسبح والرسوم والاشتراطات أو التعديلات الخاصة بالمخطط.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-2xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-400">
                    <Link to={CALCULATOR_URL}>
                      <Calculator className="ml-2 h-5 w-5" />
                      غيّر المساحة والخيارات بالحاسبة
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl font-bold">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      راجع التقدير معنا
                    </a>
                  </Button>
                </div>
              </section>

              <section id="scope" className="scroll-mt-28">
                <div className="max-w-3xl">
                  <span className="text-sm font-bold text-amber-700">قبل اعتماد الميزانية</span>
                  <h2 className="mt-2 text-3xl font-black">ما الذي يشمله الرقم وما الذي قد يضاف عليه؟</h2>
                  <p className="mt-4 leading-8 text-slate-600">
                    أكبر خطأ في قراءة تكلفة بناء فيلا 300 متر هو التعامل مع الإجمالي كأنه يشمل كل التفاصيل تلقائيًا. السعر الصحيح يبدأ من نطاق مكتوب وواضح.
                  </p>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                    <div className="flex items-center gap-3 text-emerald-800">
                      <CheckCircle2 className="h-6 w-6" />
                      <h3 className="text-xl font-black">داخل المثال الأساسي</h3>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-emerald-950/75">
                      <li>• المسطحات الأساسية حسب السيناريو المختار.</li>
                      <li>• سعر العظم أو التشطيب أو تسليم المفتاح حسب المستوى.</li>
                      <li>• الحفر التقديري في العظم وتسليم المفتاح.</li>
                      <li>• نموذج أولي للمقارنة وبناء الميزانية.</li>
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
                    <div className="flex items-center gap-3 text-rose-800">
                      <AlertTriangle className="h-6 w-6" />
                      <h3 className="text-xl font-black">إضافات تحتاج اختيارًا أو دراسة</h3>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-rose-950/75">
                      <li>• البدروم والحفر والعزل الإضافي المرتبط به.</li>
                      <li>• المصعد والمسبح وجلسات السطح.</li>
                      <li>• الرسوم الحكومية والاستشارات والمخططات.</li>
                      <li>• تعقيد الواجهات والتربة والمواد الخاصة والتغييرات أثناء التنفيذ.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="differences" className="scroll-mt-28 rounded-[2rem] bg-slate-900 p-6 text-white md:p-9">
                <span className="text-sm font-bold text-amber-300">لماذا تتغير التكلفة؟</span>
                <h2 className="mt-2 text-3xl font-black">ستة عوامل تصنع الفرق بين مشروع وآخر</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    [Building2, "التصميم والكتل", "البروزات والفراغات والواجهات المعقدة تزيد العمالة والمواد."],
                    [Layers3, "عدد الأدوار", "مساحة الأرض وحدها لا توضح حجم المسطحات الفعلية."],
                    [Sparkles, "مستوى التشطيب", "تجاري أو قياسي أو فاخر يغيّر تكلفة كل بند متكرر."],
                    [ShieldCheck, "نوعية المواد", "الأرضيات والأبواب والصحيات والإضاءة تصنع فروقًا كبيرة."],
                    [ClipboardCheck, "وضوح النطاق", "العرض الناقص قد يبدو أرخص لأنه يستبعد بنودًا أساسية."],
                    [HardHat, "ظروف الموقع", "التربة والوصول والحفر والتعديلات تؤثر على التنفيذ."],
                  ].map(([Icon, title, text]) => (
                    <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <Icon className="h-7 w-7 text-amber-300" />
                      <h3 className="mt-4 font-black">{String(title)}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{String(text)}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="proof" className="scroll-mt-28">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                    <div className="p-6 md:p-7">
                      <span className="text-sm font-bold text-amber-700">شاهد التنفيذ</span>
                      <h2 className="mt-2 text-2xl font-black">المراحل الحقيقية أهم من الرقم وحده</h2>
                      <p className="mt-3 leading-8 text-slate-600">
                        هذا الفيديو يعرض جانبًا من التنفيذ قبل العمل وأثناءه وبعده. وضعناه بعد الأرقام حتى يبقى جواب التكلفة أولًا، ثم يأتي دليل التنفيذ والثقة.
                      </p>
                    </div>
                    <div className="mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden bg-slate-950">
                      <iframe
                        className="h-full w-full"
                        src={YOUTUBE_EMBED_URL}
                        title="قبل وأثناء وبعد تشطيب فيلا في الرياض - شركة بنيان الهرم للمقاولات"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-sm">
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url('${HERO_IMAGE}')`, backgroundPosition: "center", backgroundSize: "cover" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/55" />
                    <div className="relative flex h-full min-h-[520px] flex-col justify-end">
                      <div className="w-fit rounded-2xl bg-amber-400/15 p-3 text-amber-300">
                        <MapPinned className="h-8 w-8" />
                      </div>
                      <h2 className="mt-5 text-3xl font-black">لا تعتمد على الكلام فقط؛ شاهد مواقع المشاريع</h2>
                      <p className="mt-4 leading-8 text-white/68">
                        استعرض خريطة مشاريع PYBCCO داخل أحياء الرياض، ونماذج من أعمال العظم والتشطيب والترميم والمشاريع التجارية.
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button asChild className="rounded-2xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-400">
                          <Link to={PROJECTS_MAP_URL}>
                            افتح خريطة المشاريع <ArrowLeft className="mr-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-2xl border-white/25 bg-white/5 font-bold text-white hover:bg-white hover:text-slate-950">
                          <Link to={PROJECTS_GALLERY_URL}>معرض الأعمال</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="quotation" className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-9">
                <span className="text-sm font-bold text-amber-700">من التقدير إلى التعاقد</span>
                <h2 className="mt-2 text-3xl font-black">كيف تقرأ عرض سعر فيلا 300 متر؟</h2>
                <p className="mt-4 leading-8 text-slate-600">
                  لا تقارن الإجماليات قبل التأكد أن العروض تتحدث عن النطاق نفسه. استخدم هذه القائمة قبل اتخاذ القرار:
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    "هل الرقم للعظم فقط أم التشطيب أم تسليم المفتاح؟",
                    "هل المساحة أرض أم مسطحات بناء فعلية؟",
                    "ما المواد والماركات والمستويات المشمولة؟",
                    "ما البنود المستثناة والرسوم والإضافات المحتملة؟",
                    "كيف تُحسب التعديلات أثناء التنفيذ؟",
                    "ما الدفعات والمدة وآلية الاستلام ومعالجة الملاحظات؟",
                  ].map((item, index) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 font-black text-slate-950">{index + 1}</span>
                      <p className="pt-1 text-sm font-semibold leading-7 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 leading-8 text-slate-600">
                  للمقارنة المتعمقة راجع دليلنا عن{" "}
                  <Link to="/engineering-insights/cost/how-to-compare-finishing-quotations" className="font-bold text-amber-700 underline decoration-amber-300 underline-offset-4">
                    كيفية مقارنة عروض الأسعار
                  </Link>{" "}
                  ومقال{" "}
                  <Link to="/engineering-insights/cost/misleading-quotation-mistakes" className="font-bold text-amber-700 underline decoration-amber-300 underline-offset-4">
                    الأخطاء التي تجعل العرض مضللًا
                  </Link>
                  .
                </p>
              </section>

              <section id="resources" className="scroll-mt-28">
                <div className="max-w-3xl">
                  <span className="text-sm font-bold text-amber-700">الخطوة التالية</span>
                  <h2 className="mt-2 text-3xl font-black">انتقل من الرقم العام إلى قرار مبني على مشروعك</h2>
                </div>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <ResourceCard
                    to={CALCULATOR_URL}
                    icon={Calculator}
                    title="حاسبة تكلفة بناء الفيلا"
                    description="غيّر المساحة ونوع الخدمة والمستوى، وأضف البدروم أو المصعد أو المسبح للوصول إلى تقدير أقرب."
                  />
                  <ResourceCard
                    to={PROJECTS_MAP_URL}
                    icon={MapPinned}
                    title="خريطة مشاريعنا في الرياض"
                    description="استعرض المشاريع المنفذة حسب الحي ونوع العمل، وشاهد الصور والتفاصيل في مكان واحد."
                  />
                  <ResourceCard
                    to="/engineering-insights/cost/villa-construction-cost-riyadh"
                    icon={Building2}
                    title="دليل تكلفة بناء فيلا بالرياض"
                    description="الصورة الأشمل للعوامل التي تؤثر في الميزانية قبل تخصيص الحساب لمساحة 300 متر."
                  />
                  <ResourceCard
                    to="/engineering-insights/cost/villa-shell-to-finish-cost-riyadh"
                    icon={Sparkles}
                    title="تكلفة تشطيب فيلا عظم"
                    description="مفيد لمن انتهى من الهيكل ويريد فهم ميزانية مرحلة التشطيب فقط ومستوياتها المختلفة."
                  />
                </div>
              </section>

              <section id="faq" className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-9">
                <span className="text-sm font-bold text-amber-700">إجابات مباشرة</span>
                <h2 className="mt-2 text-3xl font-black">الأسئلة الشائعة عن تكلفة فيلا 300 متر</h2>
                <Accordion type="single" collapsible className="mt-7 w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>كم تكلفة بناء فيلا 300 متر بالرياض؟</AccordionTrigger>
                    <AccordionContent className="leading-8 text-slate-600">
                      إذا كان المقصود 300 م² إجمالي مسطحات، فالتسليم القياسي في النموذج يقارب {formatSAR(SCENARIOS.built.turnkey.standard)} ريال. أما أرض 300 م² وفق افتراض 75% ودورين وملحق، فيقارب {formatSAR(SCENARIOS.land.turnkey.standard)} ريال قبل الإضافات.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger>هل 300 متر تعني الأرض أم المسطحات؟</AccordionTrigger>
                    <AccordionContent className="leading-8 text-slate-600">
                      قد تعني أيًا منهما، والفرق كبير. أرض 300 م² قد تنتج أكثر من 600 م² مسطحات عند تعدد الأدوار، لذلك يجب تحديد المعنى قبل مقارنة الأسعار.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger>كم تكلفة العظم لمساحة مبنية 300 متر؟</AccordionTrigger>
                    <AccordionContent className="leading-8 text-slate-600">
                      وفق سعر 550 ريالًا للمتر مع حفر تقديري، تبلغ النتيجة قرابة {formatSAR(SCENARIOS.built.bone)} ريال، قبل الإضافات الخاصة بالمشروع.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q4">
                    <AccordionTrigger>هل الأرقام تشمل المصعد والبدروم والمسبح؟</AccordionTrigger>
                    <AccordionContent className="leading-8 text-slate-600">
                      لا. المثال الأساسي لا يشمل البدروم أو المصعد أو المسبح أو الرسوم الحكومية أو جلسات السطح، ويمكن إضافتها داخل الحاسبة.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q5">
                    <AccordionTrigger>هل يمكن الاعتماد على سعر المتر وحده؟</AccordionTrigger>
                    <AccordionContent className="leading-8 text-slate-600">
                      يفيد سعر المتر في التصور الأولي، لكنه لا يغني عن عرض تفصيلي يحدد المواد والنطاق والاستثناءات والدفعات والمدة.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section className="relative overflow-hidden rounded-[2.25rem] bg-amber-500 p-7 text-slate-950 shadow-xl md:p-10">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/10 px-4 py-2 text-sm font-bold">
                      <PhoneCall className="h-4 w-4" />
                      تسعير واستفسار مباشر
                    </span>
                    <h2 className="mt-5 text-3xl font-black md:text-4xl">عندك أرض أو مخططات؟ أرسلها لنراجع المشروع</h2>
                    <p className="mt-4 max-w-3xl leading-8 text-slate-900/70">
                      ابدأ بالحاسبة لمعرفة النطاق المبدئي، ثم تواصل معنا عبر واتساب لتوضيح المساحة والموقع ومستوى التشطيب والموعد المتوقع للتنفيذ.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <Button asChild size="lg" className="rounded-2xl bg-slate-950 px-7 font-bold text-white hover:bg-slate-800">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="ml-2 h-5 w-5" />
                        تواصل واتساب الآن
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-2xl border-slate-950/25 bg-white/35 px-7 font-bold hover:bg-white">
                      <Link to={COMPANY_URL}>
                        خدمات الشركة <ExternalLink className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-amber-700">داخل هذا الدليل</p>
                  <nav className="mt-4 space-y-1 text-sm font-semibold text-slate-600">
                    {[
                      ["#quick-answer", "الأسعار السريعة"],
                      ["#example", "مثال حساب عملي"],
                      ["#scope", "المشمول والإضافات"],
                      ["#differences", "عوامل اختلاف التكلفة"],
                      ["#proof", "الفيديو والمشاريع"],
                      ["#quotation", "قراءة عرض السعر"],
                      ["#faq", "الأسئلة الشائعة"],
                    ].map(([href, label]) => (
                      <a key={href} href={href} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-amber-50 hover:text-amber-800">
                        {label}
                        <ChevronLeft className="h-4 w-4" />
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-lg">
                  <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300 w-fit">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-black">لا تكتفِ بمثال 300 متر</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">أدخل مساحة مشروعك وخياراته الفعلية واحصل على نتيجة مخصصة.</p>
                  <Button asChild className="mt-5 w-full rounded-xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-400">
                    <Link to={CALCULATOR_URL}>افتح الحاسبة</Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-3 w-full rounded-xl border-white/20 bg-white/5 font-bold text-white hover:bg-white hover:text-slate-950">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">واتساب مباشر</a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
