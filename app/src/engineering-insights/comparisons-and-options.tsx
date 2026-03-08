import { useEffect } from "react";
import { Link } from "react-router-dom";

type ComparisonArticle = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  readTime: string;
};

const articles: ComparisonArticle[] = [
  {
    title: "التشطيب الاقتصادي أم الفاخر: أيهما أنسب لفيلا في الرياض؟",
    description:
      "مقارنة عملية بين التشطيب الاقتصادي والتشطيب الفاخر من حيث التكلفة، الجودة، عمر المواد، وقيمة العقار النهائية، لمساعدة المالك على اتخاذ قرار واقعي يناسب ميزانيته.",
    href: "/engineering-insights/comparisons-options/economic-vs-luxury-finishing-riyadh",
    tags: ["تشطيب اقتصادي أو فاخر", "تكلفة التشطيب", "خيارات التشطيب"],
    readTime: "8 دقائق",
  },
  {
    title: "السيراميك أم البورسلان: ما الأفضل للأرضيات والجدران؟",
    description:
      "مقارنة واضحة بين السيراميك والبورسلان من حيث المتانة، الامتصاص، الشكل، السعر، وأفضل استخدام لكل منهما في الفلل والشقق بالرياض.",
    href: "/engineering-insights/comparisons-options/ceramic-vs-porcelain-riyadh",
    tags: ["سيراميك أم بورسلان", "مقارنة مواد التشطيب", "أرضيات وتشطيب"],
    readTime: "7 دقائق",
  },
  {
    title: "الجبس بورد أم الأسمنت بورد: ما الأفضل في الحمامات والمطابخ؟",
    description:
      "مقال يوضح الفرق بين الجبس بورد والأسمنت بورد في البيئات الرطبة، من حيث التحمل، الاستخدام الصحيح، العمر الافتراضي، والأخطاء الشائعة عند التنفيذ.",
    href: "/engineering-insights/comparisons-options/gypsum-board-vs-cement-board-wet-areas",
    tags: ["جبس بورد أم أسمنت بورد", "تشطيب الحمامات", "مواد مقاومة للرطوبة"],
    readTime: "7 دقائق",
  },
  {
    title: "التكييف المركزي أم السبليت: أيهما أفضل للفلل في الرياض؟",
    description:
      "مقارنة بين التكييف المركزي والسبليت من ناحية التكلفة الأولية، الاستهلاك، الصيانة، المرونة، والتوزيع، خصوصًا في المناخ الحار للرياض.",
    href: "/engineering-insights/comparisons-options/central-ac-vs-split-ac-villas-riyadh",
    tags: ["تكييف مركزي أم سبليت", "فلل الرياض", "مقارنة الأنظمة"],
    readTime: "8 دقائق",
  },
  {
    title: "الرخام الطبيعي أم الكوارتز أم البورسلان: ما الأفضل للكاونترات؟",
    description:
      "مقارنة مفصلة بين أشهر الخيارات المستخدمة في الكاونترات والمطابخ من حيث الشكل، التحمل، الصيانة، التكلفة، ومدى ملاءمتها للاستخدام اليومي.",
    href: "/engineering-insights/comparisons-options/marble-vs-quartz-vs-porcelain-countertops",
    tags: ["رخام أم كوارتز", "كاونترات مطابخ", "مقارنة خامات"],
    readTime: "8 دقائق",
  },
  {
    title: "الألمنيوم أم uPVC: ما الأفضل للنوافذ والأبواب؟",
    description:
      "مقارنة تساعدك على اختيار النظام الأنسب للنوافذ والأبواب من حيث العزل، المتانة، الشكل، السعر، والأداء في أجواء الرياض.",
    href: "/engineering-insights/comparisons-options/aluminum-vs-upvc-windows-riyadh",
    tags: ["ألمنيوم أم uPVC", "نوافذ وأبواب", "عزل حراري"],
    readTime: "7 دقائق",
  },
  {
    title: "تسليم مفتاح أم التعاقد المنفصل مع المقاولين: أيهما أفضل؟",
    description:
      "مقارنة بين نموذج المقاول الواحد ونموذج التعاقد المنفصل مع عدة جهات، مع توضيح مزايا وعيوب كل خيار من حيث الجودة، الوقت، الإدارة، والتكلفة.",
    href: "/engineering-insights/comparisons-options/turnkey-vs-separate-contractors-riyadh",
    tags: ["تسليم مفتاح", "إدارة مشروع البناء", "اختيار نموذج التنفيذ"],
    readTime: "9 دقائق",
  },
  {
    title: "المطبخ المفتوح أم المغلق: أي خيار أنسب للبيت السعودي؟",
    description:
      "مقارنة واقعية بين المطبخ المفتوح والمغلق من ناحية الاستخدام اليومي، الروائح، الخصوصية، التصميم، والملاءمة لطبيعة الأسرة ونمط المعيشة.",
    href: "/engineering-insights/comparisons-options/open-vs-closed-kitchen-saudi-home",
    tags: ["مطبخ مفتوح أم مغلق", "تصميم داخلي", "خيارات المنزل"],
    readTime: "6 دقائق",
  },
];

const internalLinks = [
  {
    title: "حاسبة تشطيب الفيلا في الرياض",
    description:
      "احسب تقديرًا أوليًا لتكلفة التشطيب حسب المساحة والمستوى والمجالات التي تريد تنفيذها.",
    href: "/villa-finishing-cost-calculator-riyadh",
    cta: "فتح الحاسبة",
  },
  {
    title: "خدمة تشطيب فلل في الرياض",
    description:
      "تعرف على منهجية التنفيذ، مراحل العمل، وما الذي يميز شركة المقاولات المنظمة عن التنفيذ العشوائي.",
    href: "/villa-finishing-riyadh",
    cta: "عرض الخدمة",
  },
  {
    title: "شركة مقاولات في الرياض",
    description:
      "صفحة تعريفية بالخدمات، آلية العمل، ونوعية المشاريع التي ننفذها داخل الرياض.",
    href: "/construction-company-riyadh",
    cta: "زيارة الصفحة",
  },
];

export default function ComparisonsAndOptions() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "المقارنات والخيارات | رؤى هندسية ومقالات تشطيب وبناء في الرياض | PYBCCO";
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-[#fff8e7] via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-[#d4af37]/40 bg-[#fff3cd] px-4 py-2 text-sm font-semibold text-[#7a5a00]">
              المقارنات والخيارات
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zinc-950 md:text-5xl">
              مقالات تساعدك على المقارنة قبل اتخاذ قرار البناء أو التشطيب
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-700 md:text-lg">
              هذا القسم مخصص للمقارنات العملية بين المواد والأنظمة وخيارات التنفيذ،
              حتى لا يبقى قرارك مبنيًا على الانطباع أو السعر فقط. ستجد هنا مقالات
              تشرح الفروقات الحقيقية بين الخيارات الشائعة في التشطيب والبناء في
              الرياض، مع ربط مباشر بما يؤثر على التكلفة والجودة والعمر التشغيلي.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/villa-finishing-cost-calculator-riyadh"
                className="inline-flex items-center justify-center rounded-2xl bg-[#f7b500] px-6 py-3 text-base font-bold text-black transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                احسب تكلفة التشطيب
              </Link>

              <Link
                to="/engineering-insights"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-bold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                العودة إلى الرؤى الهندسية
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Why this section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-zinc-950">لماذا هذا القسم مهم؟</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              لأن كثيرًا من أخطاء المشاريع تبدأ من اختيار غير واضح بين مادتين أو
              نظامين أو مستويين مختلفين من التشطيب، ثم تظهر الفروقات بعد التنفيذ
              حين يصبح التعديل مكلفًا.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-zinc-950">ماذا ستستفيد؟</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              ستفهم متى يكون الخيار الأرخص منطقيًا، ومتى يكون الأعلى تكلفة أوفر
              على المدى الطويل، وما الحالات التي يناسبها كل حل من الناحية العملية.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-zinc-950">كيف تقرأ المقالات؟</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              اقرأ المقارنة أولًا، ثم انتقل مباشرة إلى{" "}
              <Link
                to="/villa-finishing-cost-calculator-riyadh"
                className="font-bold text-[#9a7400] underline decoration-[#d4af37]/60 underline-offset-4"
              >
                حاسبة التشطيب
              </Link>{" "}
              لتربط الفكرة النظرية بميزانيتك الفعلية.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#9a7400]">8 مقالات</p>
            <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 md:text-3xl">
              أفضل مقارنات عملية للبناء والتشطيب
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.href}
              className="group flex h-full flex-col rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#d4af37]/40 bg-[#fff6da] px-3 py-1 text-xs font-bold text-[#7a5a00]">
                  {article.readTime}
                </span>
                <span className="text-xs font-medium text-zinc-500">مقال مقارن</span>
              </div>

              <h3 className="text-xl font-extrabold leading-8 text-zinc-950">
                <Link
                  to={article.href}
                  className="transition group-hover:text-[#8a6500]"
                >
                  {article.title}
                </Link>
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-700">
                {article.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to={article.href}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#f7b500] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-[#e7ab00]"
                >
                  استعراض المقال
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Conversion / Internal Links */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#9a7400]">روابط مهمة</p>
            <h2 className="mt-2 text-2xl font-extrabold text-zinc-950 md:text-3xl">
              بعد المقارنة، انتقل مباشرة إلى الخطوة العملية
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              بعض القرارات لا يكفي فيها الجانب الفني فقط، بل تحتاج أيضًا إلى ربطها
              بالميزانية، نوع المشروع، ومستوى التشطيب المستهدف. لذلك وضعنا لك هذه
              الصفحات المكملة لتسهيل القرار.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {internalLinks.map((item) => (
              <div
                key={item.href}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-extrabold text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-700">
                  {item.description}
                </p>
                <Link
                  to={item.href}
                  className="mt-5 inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="rounded-[32px] border border-[#d4af37]/25 bg-gradient-to-r from-[#fff4cc] via-white to-[#fff9eb] p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold leading-tight text-zinc-950 md:text-4xl">
              هل تريد تحويل المقارنة إلى تقدير تكلفة فعلي؟
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-700">
              ابدأ من الحاسبة لتكوين تصور أولي، ثم انتقل إلى صفحات الخدمات أو
              تواصل معنا إذا كنت تريد عرضًا أكثر دقة حسب طبيعة المشروع في الرياض.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/villa-finishing-cost-calculator-riyadh"
                className="inline-flex items-center justify-center rounded-2xl bg-[#f7b500] px-6 py-3 text-base font-extrabold text-black transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                الذهاب إلى الحاسبة
              </Link>

              <Link
                to="/construction-company-riyadh"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-base font-bold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                استعراض خدمات الشركة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}