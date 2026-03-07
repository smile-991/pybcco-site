import { useEffect } from "react";
import { Link } from "react-router-dom";

type ArticleCard = {
  title: string;
  description: string;
  href?: string;
  tags: string[];
  published?: boolean;
};

const publishedArticles: ArticleCard[] = [
  {
    title: "كيف تختار شركة مقاولات في الرياض؟",
    description:
      "دليل عملي يساعدك على تقييم شركة المقاولات قبل التعاقد، وفهم الفروقات بين الشركات المنظمة والعشوائية، وما الذي يجب أن تبحث عنه قبل اتخاذ القرار.",
    href: "/engineering-insights/how-to-choose-construction-company-riyadh",
    tags: ["اختيار شركة مقاولات", "شركة مقاولات بالرياض", "تقييم المقاول"],
    published: true,
  },

  {
    title: "أهم 10 أسئلة يجب طرحها على شركة المقاولات قبل التعاقد",
    description:
      "أسئلة عملية تكشف لك مستوى الاحتراف والتنظيم والوضوح قبل توقيع أي عقد أو دفع أي دفعة.",
    tags: ["قبل التعاقد", "أسئلة مهمة", "اختيار المقاول"],
  },


];

const upcomingArticles: ArticleCard[] = [
  {
    title: "أهم 10 أسئلة يجب طرحها على شركة المقاولات قبل التعاقد",
    description:
      "أسئلة عملية تكشف لك مستوى الاحتراف والتنظيم والوضوح قبل توقيع أي عقد أو دفع أي دفعة.",
    tags: ["قبل التعاقد", "أسئلة مهمة", "اختيار المقاول"],
  },
  {
    title: "ما الفرق بين المقاول العام ومقاول التشطيب؟",
    description:
      "متى تحتاج إلى مقاول عام، ومتى يكون مقاول التشطيب هو الخيار الأنسب لطبيعة مشروعك ومرحلة التنفيذ.",
    tags: ["مقاول عام", "مقاول تشطيب", "مراحل التنفيذ"],
  },
  {
    title: "كيف تتأكد من جودة شركة المقاولات قبل توقيع العقد؟",
    description:
      "خطوات واضحة لفحص الجودة والالتزام والتنظيم والخبرة قبل تسليم المشروع لأي جهة تنفيذية.",
    tags: ["جودة التنفيذ", "فحص الشركة", "الثقة"],
  },
  {
    title: "ما العلامات التي تدل على أن شركة المقاولات غير احترافية؟",
    description:
      "علامات تحذيرية يجب الانتباه لها مبكرًا حتى لا تدخل مشروعك مع جهة غير منظمة أو غير واضحة.",
    tags: ["أخطاء الاختيار", "علامات الخطر", "شركة غير احترافية"],
  },
  {
    title: "هل الأفضل التعامل مع شركة مقاولات واحدة أم عدة مقاولين؟",
    description:
      "مقارنة عملية بين التعاقد مع جهة واحدة تدير المشروع بالكامل وبين توزيع الأعمال على عدة مقاولين.",
    tags: ["إدارة المشروع", "مقاول واحد", "عدة مقاولين"],
  },
  {
    title: "كيف تقرأ عرض السعر من شركة المقاولات بشكل صحيح؟",
    description:
      "شرح البنود التي يجب فحصها داخل عرض السعر حتى لا تقارن بالأرقام فقط وتغفل التفاصيل المؤثرة فعليًا.",
    tags: ["عرض السعر", "تحليل التسعير", "مقارنة العروض"],
  },
  {
    title: "ما الذي يجب أن يتضمنه عقد المقاولات الواضح؟",
    description:
      "أهم البنود التي يجب أن تكون واضحة داخل العقد لحماية جميع الأطراف وتقليل الخلافات أثناء التنفيذ.",
    tags: ["عقد المقاولات", "بنود العقد", "تنظيم العمل"],
  },
  {
    title: "كيف تقارن بين شركتين مقاولات قبل اتخاذ القرار؟",
    description:
      "طريقة عملية للمقارنة بين شركتين بناءً على التنظيم والجودة والوضوح والخبرة، وليس السعر فقط.",
    tags: ["مقارنة شركات", "اتخاذ القرار", "اختيار الشركة"],
  },
  {
    title: "متى يكون السعر المنخفض من شركة المقاولات إشارة خطر؟",
    description:
      "لماذا قد يكون السعر الأرخص مكلفًا لاحقًا، وكيف تميّز بين السعر التنافسي والسعر المضلل.",
    tags: ["السعر المنخفض", "خطر التوفير", "العروض المضللة"],
  },
];

export default function EngineeringInsightsChooseContractorPage() {
  useEffect(() => {
    const title =
      "اختيار شركة مقاولات | مقالات هندسية تساعدك قبل التعاقد | بنيان الهرم للمقاولات";
    const description =
      "تصنيف مقالات متخصص يساعدك على اختيار شركة مقاولات في الرياض بشكل أوضح، وفهم معايير الجودة، وقراءة عرض السعر، ومقارنة الشركات قبل التعاقد.";
    const canonical =
      "https://pybcco.com/engineering-insights/choose-contractor";

    document.title = title;

    function setMeta(
      name: string,
      content: string,
      attr: "name" | "property" = "name"
    ) {
      let tag = document.head.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    }

    function setLink(rel: string, href: string) {
      let tag = document.head.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement | null;

      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }

      tag.setAttribute("href", href);
    }

    setMeta("description", description);
    setMeta("robots", "index, follow");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    setLink("canonical", canonical);

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": canonical,
          url: canonical,
          name: "اختيار شركة مقاولات",
          description,
          inLanguage: "ar",
          isPartOf: {
            "@type": "WebSite",
            name: "بنيان الهرم للمقاولات",
            url: "https://pybcco.com",
          },
        },
        {
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
              name: "رؤى هندسية",
              item: "https://pybcco.com/engineering-insights",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "اختيار شركة مقاولات",
              item: canonical,
            },
          ],
        },
        {
          "@type": "ItemList",
          name: "مقالات اختيار شركة مقاولات",
          itemListElement: [
            ...publishedArticles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: article.title,
              url: `https://pybcco.com${article.href}`,
            })),
          ],
        },
      ],
    };

    const scriptId = "choose-contractor-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // نترك البيانات موجودة لأن الصفحة جزء من التنقل داخل التطبيق
    };
  }, []);

  return (
    <main className="bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/"
              className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600 transition hover:border-yellow-500 hover:text-neutral-900"
            >
              الرئيسية
            </Link>
            <span className="text-neutral-400">/</span>
            <Link
              to="/engineering-insights"
              className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-600 transition hover:border-yellow-500 hover:text-neutral-900"
            >
              رؤى هندسية
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="rounded-full bg-yellow-400 px-3 py-1 font-semibold text-neutral-900">
              اختيار شركة مقاولات
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-yellow-300 bg-yellow-50 px-4 py-1 text-sm font-semibold text-yellow-700">
                تصنيف هندسي متخصص
              </span>

              <h1 className="mb-5 text-3xl font-extrabold leading-tight md:text-5xl">
                اختيار شركة مقاولات
              </h1>

              <p className="max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
                هذا التصنيف مخصص لمساعدة العميل قبل التعاقد، وليس فقط قبل طلب
                السعر. الهدف منه أن يعرف صاحب المشروع كيف يقيّم شركة المقاولات،
                وكيف يقرأ عرض السعر، وما الأسئلة التي يجب طرحها، وما العلامات
                التي تدل على الاحتراف أو العشوائية، حتى يكون القرار مبنيًا على
                وضوح وتنظيم وثقة.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/construction-company-riyadh"
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:translate-y-[-1px] hover:shadow-lg"
                >
                  خدمة شركة المقاولات
                </Link>

                <Link
                  to="/villa-finishing-price-riyadh"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:border-yellow-500"
                >
                  احسب التكلفة التقديرية
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-extrabold">
                لماذا هذا التصنيف مهم؟
              </h2>

              <div className="space-y-3 text-sm leading-7 text-neutral-700">
                <p>
                  كثير من مشاكل المشاريع لا تبدأ أثناء التنفيذ، بل تبدأ من
                  <strong> اختيار الجهة المنفذة بشكل خاطئ</strong>.
                </p>
                <p>
                  لذلك هذا المسار يركز على:
                </p>
                <ul className="space-y-2 pr-5 list-disc marker:text-yellow-500">
                  <li>فهم طريقة تقييم شركة المقاولات قبل التعاقد.</li>
                  <li>تجنب الاختيار المبني على السعر فقط.</li>
                  <li>التفريق بين الشركة المنظمة وغير المنظمة.</li>
                  <li>تقليل احتمالات الخلافات والتأخير وضعف الجودة.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-yellow-700">
              المقال المنشور الآن
            </p>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              ابدأ من المقال الرئيسي
            </h2>
          </div>
        </div>

        <div className="grid gap-6">
          {publishedArticles.map((article) => (
            <article
              key={article.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  منشور
                </span>

                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-3 text-2xl font-extrabold leading-tight">
                {article.title}
              </h3>

              <p className="mb-6 max-w-4xl text-base leading-8 text-neutral-700">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={article.href!}
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:translate-y-[-1px] hover:shadow-lg"
                >
                  قراءة المقال
                </Link>

                <Link
                  to="/villa-finishing-price-riyadh"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:border-yellow-500"
                >
                  احسب تكلفة مشروعك
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-yellow-700">
            التقارير القادمة
          </p>
          <h2 className="text-2xl font-extrabold md:text-3xl">
            مواضيع سنكملها داخل هذا التصنيف
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-neutral-700">
            هذه المقالات تم اختيارها لأنها قريبة من نية التعاقد الفعلية، وتخدم
            العميل الذي يريد أن يقارن ويفهم ويتأكد قبل أن يسلم مشروعه لشركة
            مقاولات.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {upcomingArticles.map((article) => (
            <article
              key={article.title}
              className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
                  قريبًا
                </span>

                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-50 px-3 py-1 text-xs text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-3 text-xl font-extrabold leading-8">
                {article.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-7 text-neutral-700">
                {article.description}
              </p>

              <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
                سيتم نشر هذا التقرير ضمن نفس المسار مع ربط داخلي بصفحات الخدمات
                والحاسبة.
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-extrabold">
                متى يكون هذا التصنيف مناسبًا لك؟
              </h2>

              <ul className="space-y-3 pr-5 text-base leading-8 text-neutral-700 list-disc marker:text-yellow-500">
                <li>إذا كنت في مرحلة مقارنة أكثر من شركة مقاولات.</li>
                <li>إذا وصلك أكثر من عرض سعر ولا تعرف كيف تقرأه.</li>
                <li>إذا كنت تخطط لتشطيب أو بناء أو ترميم وتريد قرارًا أوضح.</li>
                <li>إذا كنت تريد تقليل احتمالات الخلافات والأخطاء قبل التنفيذ.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-extrabold">
                روابط مهمة داخل الموقع
              </h2>

              <div className="grid gap-3">
                <Link
                  to="/construction-company-riyadh"
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-yellow-500"
                >
                  شركة مقاولات في الرياض
                </Link>

                <Link
                  to="/villa-finishing-riyadh"
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-yellow-500"
                >
                  تشطيب فلل في الرياض
                </Link>

                <Link
                  to="/villa-finishing-price-riyadh"
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-yellow-500"
                >
                  حاسبة تكلفة التشطيب
                </Link>

                <Link
                  to="/engineering-insights/cost"
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:border-yellow-500"
                >
                  تصنيف التكلفة والتسعير
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-yellow-700">FAQ</p>
          <h2 className="text-2xl font-extrabold md:text-3xl">
            أسئلة شائعة قبل اختيار شركة مقاولات
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 p-6">
            <h3 className="mb-3 text-lg font-extrabold">
              هل الأفضل اختيار الشركة الأرخص؟
            </h3>
            <p className="text-sm leading-7 text-neutral-700">
              ليس دائمًا. السعر المنخفض قد يكون مناسبًا أحيانًا، لكنه قد يكون
              أيضًا ناقص التفاصيل أو لا يشمل بنودًا مهمة ستظهر لاحقًا كتكاليف
              إضافية. لذلك يجب قراءة العرض كاملًا وليس الرقم النهائي فقط.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <h3 className="mb-3 text-lg font-extrabold">
              ما أول شيء أفحصه قبل التعاقد؟
            </h3>
            <p className="text-sm leading-7 text-neutral-700">
              افحص وضوح العرض، طريقة التواصل، تنظيم الشركة، وجود بنود واضحة،
              وآلية التنفيذ والإشراف. هذه المؤشرات تعكس غالبًا مستوى الشركة داخل
              المشروع.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <h3 className="mb-3 text-lg font-extrabold">
              هل المقالات هنا بديلة عن طلب عرض سعر؟
            </h3>
            <p className="text-sm leading-7 text-neutral-700">
              لا، هذه المقالات تساعدك على اتخاذ قرار أوضح وفهم المعايير الأساسية،
              لكنها لا تغني عن دراسة مشروعك فعليًا ومعرفة نطاق العمل المطلوب قبل
              إعطاء عرض مناسب.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6">
            <h3 className="mb-3 text-lg font-extrabold">
              هل هذا التصنيف يفيد فقط أصحاب الفلل؟
            </h3>
            <p className="text-sm leading-7 text-neutral-700">
              لا. يفيد أصحاب الفلل والشقق والمجالس والملاحق ومشاريع الترميم
              والتشطيب عمومًا، لأن منطق اختيار الجهة المنفذة يبقى مهمًا في جميع
              الحالات.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold text-yellow-400">
                الخطوة التالية
              </p>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight">
                قبل أن تطلب التنفيذ، افهم السعر، وقارن بشكل صحيح، ثم اختر الجهة
                المنظمة
              </h2>
              <p className="max-w-3xl text-base leading-8 text-neutral-300">
                هذا التصنيف جزء من بنية محتوى تساعد العميل على اتخاذ قرار أكثر
                وعيًا قبل التعاقد. وإذا كنت تريد نقطة بداية عملية، يمكنك الانتقال
                إلى صفحة الخدمة أو استخدام الحاسبة التقديرية.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/construction-company-riyadh"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:translate-y-[-1px]"
              >
                صفحة الخدمة
              </Link>

              <Link
                to="/villa-finishing-price-riyadh"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-yellow-400"
              >
                احسب التكلفة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}