import { useMemo } from "react";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HardHat,
  SearchCheck,
  ShieldAlert,
  Wrench,
  Zap,
  Droplets,
  Layers3,
} from "lucide-react";

type ArticleCard = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  icon: React.ReactNode;
};

const articles: ArticleCard[] = [
  {
    title: "أخطاء اختيار المقاول",
    description:
      "أخطاء التعاقد مع المقاول بناءً على السعر فقط، وعدم التحقق من الخبرة، وسوابق الأعمال، وآلية الإدارة والتنفيذ.",
    href: "/engineering-insights/common-mistakes/mistakes-choosing-contractor-riyadh",
    tags: ["اختيار المقاول", "عروض الأسعار", "إدارة المشروع"],
    icon: <HardHat className="h-5 w-5" />,
  },
  {
    title: "أخطاء مقارنة عروض الأسعار",
    description:
      "كيف تؤدي المقارنة السطحية بين العروض إلى قرارات خاطئة بسبب البنود الناقصة، واختلاف المواصفات، واستثناء الأعمال المخفية.",
    href: "/engineering-insights/common-mistakes/mistakes-comparing-quotations",
    tags: ["مقارنة العروض", "بنود ناقصة", "تكلفة التشطيب"],
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "أخطاء عقد التشطيب",
    description:
      "أهم الثغرات التي تسبب النزاعات: غموض نطاق العمل، مواد غير محددة، دفعات غير مدروسة، وعدم توضيح الضمان والمدة.",
    href: "/engineering-insights/common-mistakes/mistakes-finishing-contract",
    tags: ["عقد التشطيب", "الدفعات", "الضمان"],
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    title: "أخطاء الإشراف والمتابعة",
    description:
      "لماذا يؤدي ضعف الإشراف إلى تراكم العيوب، وتأخر الإنجاز، وزيادة الهدر في المواد والوقت أثناء التنفيذ.",
    href: "/engineering-insights/common-mistakes/mistakes-site-supervision",
    tags: ["إشراف هندسي", "متابعة الموقع", "جودة التنفيذ"],
    icon: <SearchCheck className="h-5 w-5" />,
  },
  {
    title: "أخطاء السباكة قبل الإقفال",
    description:
      "الأخطاء الشائعة في تمديدات السباكة، واختبارات الضغط، ومواقع النقاط، والعزل قبل إقفال الجدران والأرضيات.",
    href: "/engineering-insights/common-mistakes/plumbing-mistakes-before-closing-walls",
    tags: ["سباكة", "اختبار الضغط", "أعمال مخفية"],
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    title: "أخطاء الكهرباء قبل التشطيب",
    description:
      "تمديدات غير مدروسة، أحمال غير محسوبة، مواقع أفياش غير عملية، وضعف التنسيق مع المخطط الداخلي قبل الإغلاق.",
    href: "/engineering-insights/common-mistakes/electrical-mistakes-before-finishing",
    tags: ["كهرباء", "الأحمال", "الأفياش والإنارة"],
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "أخطاء العزل المائي والحراري",
    description:
      "كيف تتحول أخطاء العزل في الأسطح، والحمامات، والخزانات، والجدران الخارجية إلى مشاكل رطوبة وتلف وتكاليف لاحقة.",
    href: "/engineering-insights/common-mistakes/waterproofing-and-insulation-mistakes",
    tags: ["عزل مائي", "عزل حراري", "رطوبة وتسرب"],
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    title: "أخطاء اختيار مواد التشطيب",
    description:
      "الفرق بين التوفير الذكي والتوفير الخاسر عند اختيار الدهانات، الأرضيات، الإكسسوارات، والأعمال المعدنية والخشبية.",
    href: "/engineering-insights/common-mistakes/mistakes-choosing-finishing-materials",
    tags: ["مواد التشطيب", "جودة المواد", "توفير ذكي"],
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "أخطاء الجدول الزمني والتنفيذ",
    description:
      "كيف يؤدي غياب التسلسل الصحيح للأعمال، وسوء التنسيق بين التخصصات، إلى إعادة العمل وتأخير التسليم.",
    href: "/engineering-insights/common-mistakes/scheduling-and-execution-mistakes",
    tags: ["جدول زمني", "تسلسل الأعمال", "تأخير المشروع"],
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "أخطاء الاستلام النهائي",
    description:
      "قائمة عملية لفحص المشروع قبل الاستلام النهائي واكتشاف العيوب التي يجب معالجتها قبل إقفال الأعمال والدفعة الأخيرة.",
    href: "/engineering-insights/common-mistakes/final-handover-mistakes-checklist",
    tags: ["الاستلام النهائي", "فحص المشروع", "قائمة التحقق"],
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
];

const PAGE_TITLE =
  "الأخطاء الشائعة في البناء والتشطيب | 10 مقالات مهمة قبل التنفيذ | بنيان الهرم للمقاولات";
const PAGE_DESCRIPTION =
  "دليل منظم يضم أهم المقالات حول الأخطاء الشائعة في البناء والتشطيب، من اختيار المقاول ومقارنة العروض إلى أعمال السباكة والكهرباء والعزل والاستلام النهائي.";
const CANONICAL = "https://pybcco.com/engineering-insights/common-mistakes";

export default function CommonMistakesPage() {
  const jsonLd = useMemo(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://pybcco.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "الرؤى الهندسية",
          item: "https://pybcco.com/engineering-insights",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "الأخطاء الشائعة",
          item: CANONICAL,
        },
      ],
    };

    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "الأخطاء الشائعة في البناء والتشطيب",
      url: CANONICAL,
      description: PAGE_DESCRIPTION,
      isPartOf: {
        "@type": "WebSite",
        name: "بنيان الهرم للمقاولات",
        url: "https://pybcco.com/",
      },
      about: [
        "أخطاء البناء",
        "أخطاء التشطيب",
        "اختيار المقاول",
        "مقارنة عروض الأسعار",
        "أعمال السباكة والكهرباء",
        "العزل المائي والحراري",
      ],
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مقالات الأخطاء الشائعة",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `https://pybcco.com${article.href}`,
      })),
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما أهم الأخطاء التي يرتكبها أصحاب المشاريع قبل بدء التشطيب؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "أكثر الأخطاء شيوعًا تشمل اختيار المقاول بناءً على السعر فقط، توقيع عقد غير واضح، ضعف مقارنة عروض الأسعار، وعدم مراجعة الأعمال المخفية مثل السباكة والكهرباء والعزل قبل الإقفال.",
          },
        },
        {
          "@type": "Question",
          name: "هل أرخص عرض سعر في التشطيب يعني أفضل صفقة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ليس بالضرورة. كثير من العروض المنخفضة تستبعد بنودًا مهمة أو تستخدم مواد أقل جودة أو لا توضح نطاق العمل بدقة، ما يؤدي لاحقًا إلى طلبات إضافية وارتفاع التكلفة الفعلية.",
          },
        },
        {
          "@type": "Question",
          name: "متى تظهر أخطاء التشطيب المكلفة عادة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "كثير من الأخطاء المكلفة لا تظهر أثناء التنفيذ مباشرة، بل بعد السكن أو بعد إقفال الجدران والأسقف، خصوصًا أخطاء السباكة والكهرباء والعزل وضعف التنسيق بين التخصصات.",
          },
        },
      ],
    };

    return [breadcrumbSchema, collectionSchema, itemListSchema, faqSchema];
  }, []);

  return (
    <>
      <SeoHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="website"
        jsonLd={jsonLd}
      />
    <main className="min-h-screen bg-[#faf8f3] text-[#1f1f1f]">
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-[#111111] via-[#181818] to-[#222222]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#d4a017] blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-60px] h-72 w-72 rounded-full bg-[#d4a017] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a017]/30 bg-[#d4a017]/10 px-4 py-2 text-sm font-semibold text-[#f3d77a]">
              <AlertTriangle className="h-4 w-4" />
              قسم معرفي عملي قبل التعاقد والتنفيذ
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              الأخطاء الشائعة في البناء والتشطيب
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
              عشر مقالات مركزة تساعدك على تجنب الأخطاء التي ترفع التكلفة،
              تؤخر التنفيذ، أو تترك عيوبًا لا تظهر إلا بعد السكن. هذا القسم
              مناسب لكل من يخطط للبناء أو التشطيب في الرياض ويريد اتخاذ قرارات
              أدق قبل التعاقد.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/villa-finishing-price-riyadh"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d4a017] px-6 py-3 text-base font-extrabold text-[#111111] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,160,23,0.35)]"
              >
                <Calculator className="h-5 w-5" />
                احسب تكلفة التشطيب
              </Link>

              <Link
                to="/engineering-insights"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-base font-bold text-white transition hover:bg-white/10"
              >
                العودة إلى الرؤى الهندسية
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-[#d4a017]/20 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="mb-3 text-sm font-bold text-[#b78a00]">
              لماذا هذا القسم مهم؟
            </div>
            <p className="text-sm leading-7 text-[#4b4b4b]">
              لأن كثيرًا من المشاكل لا تبدأ من التنفيذ نفسه، بل من قرار خاطئ
              قبل التنفيذ: مقاول غير مناسب، عرض سعر غير واضح، أو عقد ناقص.
            </p>
          </div>

          <div className="rounded-3xl border border-[#d4a017]/20 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="mb-3 text-sm font-bold text-[#b78a00]">
              ماذا ستجد هنا؟
            </div>
            <p className="text-sm leading-7 text-[#4b4b4b]">
              مقالات عملية تغطي التعاقد، مقارنة الأسعار، الأعمال المخفية،
              العزل، المواد، الجدول الزمني، والاستلام النهائي للمشروع.
            </p>
          </div>

          <div className="rounded-3xl border border-[#d4a017]/20 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            <div className="mb-3 text-sm font-bold text-[#b78a00]">
              قبل البدء
            </div>
            <p className="text-sm leading-7 text-[#4b4b4b]">
              يمكنك الانتقال إلى{" "}
              <Link
                to="/villa-finishing-price-riyadh"
                className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
              >
                حاسبة تكلفة التشطيب
              </Link>{" "}
              للحصول على تقدير أولي، ثم العودة لقراءة المقالات المرتبطة بالأخطاء
              التي يجب تجنبها.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#111111] sm:text-3xl">
              10 مقالات أساسية
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#5b5b5b] sm:text-base">
              عناوين مختارة لتغطية أكثر الأخطاء شيوعًا قبل وأثناء وبعد التشطيب.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.href}
              className="group rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f8f2dc] px-4 py-2 text-sm font-extrabold text-[#6b5300]">
                  {article.icon}
                  مقال {index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold leading-tight text-[#111111]">
                <Link
                  to={article.href}
                  className="transition group-hover:text-[#b78a00]"
                >
                  {article.title}
                </Link>
              </h3>

              <p className="mt-4 text-base leading-8 text-[#5a5a5a]">
                {article.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f5f3ee] px-3 py-2 text-sm font-medium text-[#666]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to={article.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d4a017] px-5 py-3 text-base font-extrabold text-[#111111] transition hover:bg-[#c59600]"
                >
                  استعراض المقال
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="rounded-[32px] border border-[#d4a017]/20 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-[#111111] sm:text-3xl">
                قبل قراءة المقالات أو بعدها: ابدأ بتقدير التكلفة
              </h2>
              <p className="mt-4 text-base leading-8 text-[#565656]">
                إذا كنت في مرحلة تخطيط الميزانية، فالأفضل أن تبدأ من{" "}
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="font-extrabold text-[#111111] underline decoration-[#d4a017] underline-offset-4"
                >
                  حاسبة تشطيب الفلل في الرياض
                </Link>{" "}
                للحصول على تصور أولي، ثم تقرأ المقالات المناسبة لتفهم أين تقع
                الأخطاء التي تغيّر التكلفة أو تسبب مشاكل لاحقة.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#111111] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#222222]"
                >
                  <Calculator className="h-5 w-5" />
                  افتح الحاسبة
                </Link>

                <Link
                  to="/engineering-insights/how-to-compare-finishing-quotations"
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-6 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#faf8f3]"
                >
                  مقال مقارنة عروض الأسعار
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#111111] p-6 text-white">
              <div className="mb-4 inline-flex rounded-full bg-[#d4a017] px-3 py-1 text-sm font-extrabold text-[#111111]">
                روابط داخلية مفيدة
              </div>

              <div className="space-y-3 text-sm leading-7 text-white/85">
                <div>
                  <Link
                    to="/construction-company-riyadh"
                    className="font-bold text-white hover:text-[#f3d77a]"
                  >
                    شركة مقاولات في الرياض
                  </Link>
                </div>
                <div>
                  <Link
                    to="/villa-finishing-riyadh"
                    className="font-bold text-white hover:text-[#f3d77a]"
                  >
                    تشطيب فلل بالرياض
                  </Link>
                </div>
                <div>
                  <Link
                    to="/engineering-insights/how-to-choose-construction-company-riyadh"
                    className="font-bold text-white hover:text-[#f3d77a]"
                  >
                    كيف تختار شركة مقاولات في الرياض
                  </Link>
                </div>
                <div>
                  <Link
                    to="/engineering-insights/cost/how-to-estimate-project-cost-initially"
                    className="font-bold text-white hover:text-[#f3d77a]"
                  >
                    كيف تقدّر تكلفة المشروع مبدئيًا
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-4 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="text-2xl font-extrabold text-[#111111]">
            أسئلة شائعة
          </h2>

          <div className="mt-6 space-y-4">
            <details className="group rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                ما أول شيء يجب مراجعته قبل اختيار المقاول؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                أول ما يجب مراجعته هو وضوح نطاق العمل، الخبرة الفعلية في مشاريع
                مشابهة، جودة الأعمال السابقة، وآلية الإدارة والإشراف، وليس السعر
                وحده.
              </p>
            </details>

            <details className="group rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                ما أكثر الأخطاء التي تسبب زيادة مفاجئة في التكلفة؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                غالبًا تكون بسبب البنود غير الواضحة في العقد، استبعاد الأعمال
                المخفية من العرض، ضعف التنسيق بين التخصصات، أو إعادة التنفيذ بعد
                اكتشاف أخطاء متأخرة.
              </p>
            </details>

            <details className="group rounded-2xl border border-black/5 bg-[#faf8f3] p-5">
              <summary className="cursor-pointer list-none text-base font-extrabold text-[#111111]">
                هل هذه المقالات مناسبة فقط للفلل؟
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#5b5b5b]">
                معظم المبادئ مناسبة للفلل والمشاريع السكنية والتشطيبات الداخلية
                عمومًا، مع تركيز أكبر على واقع التنفيذ والتشطيب السكني في الرياض.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}