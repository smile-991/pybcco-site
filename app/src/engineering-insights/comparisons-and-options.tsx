import { useEffect } from "react";
import { Link } from "react-router-dom";

type Article = {
  title: string;
  description: string;
  href: string;
  readTime: string;
  tags: string[];
};

const articles: Article[] = [
  {
    title: "التشطيب الاقتصادي أم الفاخر: أيهما أنسب لفيلا في الرياض؟",
    description:
      "مقارنة عملية بين التشطيب الاقتصادي والتشطيب الفاخر من حيث التكلفة، الجودة، العمر الافتراضي، وتأثير كل خيار على قيمة العقار.",
    href: "/engineering-insights/comparisons-options/economic-vs-luxury-finishing-riyadh",
    readTime: "8 دقائق",
    tags: ["تشطيب اقتصادي", "تشطيب فاخر", "تكلفة التشطيب"],
  },

  {
    title: "السيراميك أم البورسلان: ما الأفضل للأرضيات والجدران؟",
    description:
      "شرح الفروقات بين السيراميك والبورسلان من حيث المتانة، الامتصاص، الشكل، والسعر، ومتى يفضل استخدام كل نوع.",
    href: "/engineering-insights/comparisons-options/ceramic-vs-porcelain-riyadh",
    readTime: "7 دقائق",
    tags: ["سيراميك", "بورسلان", "أرضيات"],
  },

  {
    title: "الجبس بورد أم الأسمنت بورد: أيهما أفضل في الحمامات؟",
    description:
      "مقارنة مهمة بين الجبس بورد والأسمنت بورد في المناطق الرطبة مثل الحمامات والمطابخ.",
    href: "/engineering-insights/comparisons-options/gypsum-board-vs-cement-board-wet-areas",
    readTime: "8 دقائق",
    tags: ["جبس بورد", "أسمنت بورد"],
  },

  {
    title: "التكييف المركزي أم السبليت: أيهما أفضل للفلل في الرياض؟",
    description:
      "مقارنة بين أنظمة التكييف المختلفة من حيث التكلفة، الصيانة، الراحة، واستهلاك الطاقة.",
    href: "/engineering-insights/comparisons-options/central-ac-vs-split-ac-villas-riyadh",
    readTime: "9 دقائق",
    tags: ["تكييف مركزي", "سبليت"],
  },

  {
    title: "الرخام أم الكوارتز أم البورسلان: ما الأفضل للكاونترات؟",
    description:
      "تحليل الخيارات الأكثر استخدامًا في المطابخ والكاونترات من حيث الشكل والتحمل والصيانة.",
    href: "/engineering-insights/comparisons-options/marble-vs-quartz-vs-porcelain-countertops",
    readTime: "9 دقائق",
    tags: ["رخام", "كوارتز", "كاونترات"],
  },

  {
    title: "الألمنيوم أم uPVC: ما الأفضل للنوافذ؟",
    description:
      "مقارنة بين أنظمة النوافذ من حيث العزل الحراري، المتانة، السعر، والعمر الافتراضي.",
    href: "/engineering-insights/comparisons-options/aluminum-vs-upvc-windows-riyadh",
    readTime: "8 دقائق",
    tags: ["ألمنيوم", "UPVC"],
  },

  {
    title: "تسليم مفتاح أم التعاقد مع عدة مقاولين؟",
    description:
      "مقارنة بين نموذج المقاول الواحد ونموذج إدارة المشروع عبر عدة مقاولين.",
    href: "/engineering-insights/comparisons-options/turnkey-vs-separate-contractors-riyadh",
    readTime: "10 دقائق",
    tags: ["تسليم مفتاح", "إدارة مشروع"],
  },

  {
    title: "المطبخ المفتوح أم المغلق: أيهما أنسب للبيت السعودي؟",
    description:
      "مقارنة بين المطبخ المفتوح والمغلق من حيث الخصوصية والروائح والتصميم.",
    href: "/engineering-insights/comparisons-options/open-vs-closed-kitchen-saudi-home",
    readTime: "8 دقائق",
    tags: ["مطبخ مفتوح", "تصميم داخلي"],
  },
];

export default function ComparisonsOptions() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      "المقارنات والخيارات في البناء والتشطيب | رؤى هندسية";
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* HERO */}

      <section className="border-b bg-[#fffaf0]">
        <div className="mx-auto max-w-6xl px-4 py-16">

          <span className="text-sm font-semibold text-[#a67c00]">
            8 مقالات مقارنة عملية
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight">
            المقارنات والخيارات في البناء والتشطيب
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-zinc-700 leading-8">
            هذا القسم يجمع مقالات مقارنة بين المواد والأنظمة وخيارات التنفيذ
            في مشاريع البناء والتشطيب. الهدف هو مساعدة المالك على اتخاذ
            قرارات واقعية مبنية على الفروقات الحقيقية بين الخيارات المختلفة.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">

            <Link
              to="/villa-finishing-cost-calculator-riyadh"
              className="rounded-xl bg-[#f7b500] px-6 py-3 font-bold"
            >
              احسب تكلفة التشطيب
            </Link>

            <Link
              to="/engineering-insights"
              className="rounded-xl border px-6 py-3 font-semibold"
            >
              جميع الرؤى الهندسية
            </Link>

          </div>

        </div>
      </section>


      {/* ARTICLES */}

      <section className="mx-auto max-w-6xl px-4 py-16">

        <h2 className="text-3xl font-extrabold mb-10">
          تصفح مقالات المقارنات
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {articles.map((article) => (
            <article
              key={article.href}
              className="border rounded-2xl p-6 hover:shadow-lg transition"
            >

              <div className="text-sm text-[#a67c00] font-semibold mb-2">
                {article.readTime}
              </div>

              <h3 className="text-xl font-bold leading-8">
                <Link to={article.href}>{article.title}</Link>
              </h3>

              <p className="mt-3 text-zinc-700 leading-7 text-sm">
                {article.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-zinc-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}

              </div>

              <Link
                to={article.href}
                className="mt-6 inline-block text-sm font-bold text-[#a67c00]"
              >
                قراءة المقال →
              </Link>

            </article>
          ))}

        </div>
      </section>


      {/* INTERNAL LINKS */}

      <section className="bg-[#0e0e0e] text-white py-16">

        <div className="mx-auto max-w-5xl px-4">

          <h2 className="text-3xl font-extrabold">
            انتقل من المقارنة إلى تقدير التكلفة
          </h2>

          <p className="mt-4 text-zinc-300 leading-8">
            بعد فهم الفروقات بين المواد والأنظمة المختلفة،
            يمكنك استخدام الحاسبة لتكوين تصور أولي عن تكلفة التشطيب
            حسب مساحة المشروع ومستوى التشطيب.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">

            <Link to="/villa-finishing-cost-calculator-riyadh">
              حاسبة تكلفة التشطيب
            </Link>

            <Link to="/villa-finishing-riyadh">
              خدمة تشطيب الفلل
            </Link>

            <Link to="/construction-company-riyadh">
              شركة مقاولات في الرياض
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}