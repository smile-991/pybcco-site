import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Clock3,
  FileText,
  Hammer,
  Home,
  ShieldCheck,
} from "lucide-react";

type ArticleItem = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  readTime: string;
};

const CALCULATOR_PATH = "/villa-finishing-price-riyadh"; // عدّل فقط إذا كان مسار الحاسبة مختلفًا
const SERVICES_PATH = "/villa-finishing-riyadh";
const COMPANY_PATH = "/construction-company-riyadh";
const ENGINEERING_INSIGHTS_PATH = "/engineering-insights";

export default function ConstructionAndFinishingStagesPage() {
  const pageTitle =
    "مراحل البناء والتشطيب: 10 مقالات تشرح التنفيذ خطوة بخطوة | بنيان الهرم للمقاولات";

  const pageDescription =
    "دليل عملي منظم يشرح مراحل البناء والتشطيب في السعودية، من العظم إلى التسليم، مع مقالات تفصيلية تساعدك على فهم الترتيب الصحيح للأعمال، المدة، الاستلام، والجودة.";

  const canonical =
    "https://pybcco.com/engineering-insights/construction-and-finishing-stages";

  const articles = useMemo<ArticleItem[]>(
    () => [
      {
        title: "مراحل بناء الفيلا في السعودية خطوة بخطوة",
        description:
          "شرح واضح لتسلسل البناء من الحفر والقواعد وحتى العظم، مع توضيح الصورة الكاملة للمالك قبل بدء التنفيذ.",
        href: "/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia",
        tags: ["مراحل البناء", "بناء فيلا", "خطوات التنفيذ"],
        readTime: "7 دقائق",
      },
      {
        title: "ترتيب مراحل التشطيب الداخلي للفلل بالشكل الصحيح",
        description:
          "دليل عملي لترتيب أعمال التشطيب الداخلي لتجنب التضارب بين البنود وتقليل الهدر والأخطاء.",
        href: "/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas",
        tags: ["مراحل التشطيب", "تشطيب داخلي", "ترتيب الأعمال"],
        readTime: "8 دقائق",
      },
      {
        title: "كم تستغرق مدة بناء فيلا في الرياض؟",
        description:
          "نظرة واقعية على المدة المتوقعة لكل مرحلة من مراحل البناء والتشطيب والعوامل التي قد تؤخر المشروع.",
        href: "/engineering-insights/construction-and-finishing-stages/how-long-does-it-take-to-build-a-villa-in-riyadh",
        tags: ["مدة البناء", "جدول زمني", "بناء فيلا بالرياض"],
        readTime: "6 دقائق",
      },
      {
        title: "استلام مراحل البناء بالتفصيل قبل اعتماد الدفعات",
        description:
          "كيف تفحص كل مرحلة من مراحل التنفيذ قبل الدفع للمقاول، وما أهم نقاط الاستلام التي يجب الانتباه لها.",
        href: "/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist",
        tags: ["استلام الأعمال", "فحص التنفيذ", "دفعات المقاول"],
        readTime: "9 دقائق",
      },
      {
        title: "مراحل العظم في البناء من القواعد حتى السقف",
        description:
          "شرح مركز لأعمال الهيكل الإنشائي: القواعد، الميدات، الأعمدة، الأسقف، والبلوك، وماذا يجب متابعته في كل جزء.",
        href: "/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages",
        tags: ["العظم", "الهيكل الإنشائي", "قواعد وأعمدة"],
        readTime: "7 دقائق",
      },
      {
        title: "أخطاء ترتيب أعمال التشطيب التي تسبب مشاكل لاحقًا",
        description:
          "أشهر الأخطاء العملية في ترتيب التشطيب وكيفية تفاديها حتى لا تتلف الأعمال أو تتكرر التعديلات المكلفة.",
        href: "/engineering-insights/construction-and-finishing-stages/common-finishing-sequence-mistakes",
        tags: ["أخطاء التشطيب", "تنفيذ", "تفادي المشاكل"],
        readTime: "8 دقائق",
      },
      {
        title: "متى تبدأ أعمال التشطيب بعد انتهاء العظم؟",
        description:
          "التوقيت الصحيح للانتقال من العظم إلى التشطيب، وما المتطلبات التي يجب التأكد منها قبل البدء.",
        href: "/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure",
        tags: ["بعد العظم", "بداية التشطيب", "جاهزية المشروع"],
        readTime: "5 دقائق",
      },
      {
        title: "الفرق بين العظم والتشطيب في البناء",
        description:
          "شرح مبسط للفرق بين مرحلتي العظم والتشطيب، وما الذي يدخل ضمن كل مرحلة من ناحية التنفيذ والتكلفة.",
        href: "/engineering-insights/construction-and-finishing-stages/difference-between-shell-and-finishing",
        tags: ["العظم والتشطيب", "شرح مبسط", "تكلفة ومراحل"],
        readTime: "5 دقائق",
      },
      {
        title: "كيف تضع جدول تنفيذ لمشروع بناء فيلا بدون ارتباك",
        description:
          "خطوات عملية لتنظيم الجدول التنفيذي ومتابعة البنود والتوريدات والدفعات بشكل يقلل التأخير.",
        href: "/engineering-insights/construction-and-finishing-stages/villa-construction-execution-schedule",
        tags: ["جدول التنفيذ", "تنظيم المشروع", "إدارة الوقت"],
        readTime: "7 دقائق",
      },
      {
        title: "كيف تراقب جودة التشطيب خطوة بخطوة",
        description:
          "معايير عملية لمراقبة جودة التنفيذ في مراحل التشطيب والتأكد من أن النتيجة النهائية مطابقة للمستوى المطلوب.",
        href: "/engineering-insights/construction-and-finishing-stages/how-to-monitor-finishing-quality",
        tags: ["جودة التشطيب", "مراقبة التنفيذ", "ضبط الجودة"],
        readTime: "8 دقائق",
      },
    ],
    []
  );

  useEffect(() => {
    document.title = pageTitle;

    const setMeta = (
      attr: "name" | "property",
      key: string,
      content: string
    ) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "بنيان الهرم للمقاولات");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);

    setLink("canonical", canonical);

    const oldSchemas = document.querySelectorAll(
      'script[data-seo="construction-finishing-stages"]'
    );
    oldSchemas.forEach((node) => node.remove());

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
          name: "مراحل البناء والتشطيب",
          item: canonical,
        },
      ],
    };

    const collectionPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "مراحل البناء والتشطيب",
      url: canonical,
      description: pageDescription,
      inLanguage: "ar-SA",
      isPartOf: {
        "@type": "WebSite",
        name: "بنيان الهرم للمقاولات",
        url: "https://pybcco.com",
      },
      about: [
        "مراحل بناء الفيلا",
        "مراحل التشطيب",
        "استلام الأعمال",
        "مدة البناء",
        "جودة التشطيب",
      ],
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مقالات مراحل البناء والتشطيب",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://pybcco.com${article.href}`,
        name: article.title,
      })),
    };

    [breadcrumbSchema, collectionPageSchema, itemListSchema].forEach(
      (schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "construction-finishing-stages");
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    );

    return () => {
      const schemas = document.querySelectorAll(
        'script[data-seo="construction-finishing-stages"]'
      );
      schemas.forEach((node) => node.remove());
    };
  }, [articles, canonical, pageDescription, pageTitle]);

  return (
    <main className="bg-white text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-b from-[#fff8e7] via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
          >
            <Link
              to="/"
              className="transition hover:text-[#b98a00]"
            >
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              to={ENGINEERING_INSIGHTS_PATH}
              className="transition hover:text-[#b98a00]"
            >
              الرؤى الهندسية
            </Link>
            <span>/</span>
            <span className="text-zinc-900">مراحل البناء والتشطيب</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <span className="mb-4 inline-flex items-center rounded-full border border-[#e6d3a0] bg-[#fff8e7] px-4 py-2 text-sm font-semibold text-[#8a6400]">
                10 مقالات عملية ومنظمة
              </span>

              <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                مراحل البناء والتشطيب
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 md:text-lg">
                هذا القسم يجمع أهم المقالات التي تشرح تسلسل البناء والتشطيب من
                البداية حتى التسليم، بطريقة واضحة تساعد المالك على فهم ترتيب
                الأعمال، المدة المتوقعة، نقاط الاستلام، ومراقبة الجودة خلال
                التنفيذ.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={CALCULATOR_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7bf00] px-6 py-3 text-sm font-bold text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Calculator className="h-4 w-4" />
                  احسب تكلفة التشطيب
                </Link>

                <Link
                  to={SERVICES_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-[#f7bf00] hover:text-[#8a6400]"
                >
                  <Home className="h-4 w-4" />
                  خدمات التشطيب
                </Link>

                <Link
                  to={COMPANY_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-[#f7bf00] hover:text-[#8a6400]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  عن شركة المقاولات
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  "ترتيب الأعمال بشكل صحيح",
                  "مدة البناء والتشطيب",
                  "استلام المراحل",
                  "مراقبة الجودة",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-[#f1e1af] bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
                <div className="mb-3 inline-flex rounded-full bg-[#fff8e7] p-3 text-[#b98a00]">
                  <Hammer className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold">لماذا هذا القسم مهم؟</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  لأن أكثر المشاكل في المشاريع لا تأتي من بند واحد فقط، بل من
                  سوء ترتيب التنفيذ، ضعف الاستلام، وعدم وضوح المراحل منذ البداية.
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "يفيد المالك الذي يبني لأول مرة",
                    "يرتب الصورة الكاملة قبل التعاقد",
                    "يربط بين الفهم الفني والقرار المالي",
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b98a00]" />
                      <span className="text-sm leading-6 text-zinc-700">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={CALCULATOR_PATH}
                className="rounded-[28px] border border-zinc-100 bg-zinc-900 p-6 text-white shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#f7bf00] p-3 text-black">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold">
                      ابدأ بالحاسبة مباشرة
                    </div>
                    <div className="mt-1 text-sm text-zinc-300">
                      إذا كنت في مرحلة التخطيط المالي أو مقارنة الأسعار.
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#8a6400]">
              مقالات مترابطة داخليًا
            </p>
            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
              تصفح مقالات مراحل البناء والتشطيب
            </h2>
          </div>

          <Link
            to={ENGINEERING_INSIGHTS_PATH}
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-800 transition hover:text-[#8a6400]"
          >
            العودة إلى الرؤى الهندسية
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.href}
              className="group flex h-full flex-col rounded-[28px] border border-zinc-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.09)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex rounded-full border border-[#ecdca9] bg-[#fff8e7] px-4 py-2 text-sm font-bold text-[#8a6400]">
                  مقال {index + 1}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-zinc-500">
                  <Clock3 className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-xl font-extrabold leading-snug text-zinc-900">
                <Link
                  to={article.href}
                  className="transition group-hover:text-[#8a6400]"
                >
                  {article.title}
                </Link>
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">
                {article.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
                <Link
                  to={article.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 transition hover:text-[#8a6400]"
                >
                  قراءة المقال
                  <ArrowLeft className="h-4 w-4" />
                </Link>

                <Link
                  to={CALCULATOR_PATH}
                  className="text-sm font-semibold text-[#8a6400] transition hover:text-black"
                >
                  الحاسبة
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 md:pb-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-zinc-100 bg-zinc-50 p-6 md:p-8">
            <div className="mb-3 inline-flex rounded-full bg-white p-3 text-[#b98a00] shadow-sm">
              <FileText className="h-5 w-5" />
            </div>

            <h2 className="text-2xl font-extrabold">
              كيف تستفيد من هذا القسم عمليًا؟
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "قبل التعاقد",
                  text: "افهم المراحل الأساسية حتى تعرف ما الذي ستطلبه من المقاول وما الذي يجب أن يكون واضحًا في العرض والعقد.",
                },
                {
                  title: "أثناء التنفيذ",
                  text: "راجع المقالات المرتبطة بكل مرحلة حتى يكون لديك تصور أفضل عن الترتيب، الاستلام، ومواطن الخطأ الشائعة.",
                },
                {
                  title: "عند مقارنة الأسعار",
                  text: "استخدم الحاسبة مع قراءتك للمقالات حتى تربط الفهم الفني بالتكلفة المتوقعة للمشروع.",
                },
                {
                  title: "قبل اعتماد الدفعات",
                  text: "ارجع إلى مقالات الاستلام والجودة للتأكد من أن المرحلة المنفذة تستحق الاعتماد المالي فعلًا.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 text-white md:p-8">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#f7d24e]">
              روابط داخلية مهمة
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-tight">
              انتقل من الفهم النظري إلى تقدير التكلفة والخدمة المناسبة
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-300">
              هذه الصفحة لا تهدف فقط لشرح المعلومات، بل لتقريب الزائر من اتخاذ
              قرار مدروس عبر ربط المقالات بالخدمات الفعلية والحاسبة والصفحات
              التعريفية.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to={CALCULATOR_PATH}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 transition hover:bg-white/10"
              >
                <span className="font-bold">حاسبة تكلفة التشطيب في الرياض</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <Link
                to={SERVICES_PATH}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 transition hover:bg-white/10"
              >
                <span className="font-bold">خدمة تشطيب الفلل</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <Link
                to={COMPANY_PATH}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 transition hover:bg-white/10"
              >
                <span className="font-bold">صفحة شركة المقاولات</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <Link
                to={ENGINEERING_INSIGHTS_PATH}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 transition hover:bg-white/10"
              >
                <span className="font-bold">جميع الرؤى الهندسية</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8">
              <Link
                to={CALCULATOR_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7bf00] px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
              >
                <Calculator className="h-4 w-4" />
                ابدأ بالحاسبة الآن
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}