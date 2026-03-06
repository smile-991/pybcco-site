import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JsonLd = Record<string, any>;

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/engineering-insights/cost`;

const COST_REPORTS = [
  {
    title: "تكلفة تشطيب فيلا بالرياض",
    excerpt:
      "شرح منظم للعوامل التي تؤثر على تكلفة تشطيب الفلل في الرياض، وما الذي يرفع السعر، وكيف يحصل العميل على تصور مبدئي منطقي قبل البدء.",
    slug: "/engineering-insights/cost/villa-finishing-cost-riyadh",
    published: true,
  },
  {
    title: "سعر متر التشطيب في الرياض",
    excerpt:
      "ما معنى سعر متر التشطيب فعليًا؟ ومتى يكون الرقم مضللًا؟ وكيف تتم قراءة السعر بشكل صحيح حسب مستوى المواد ونطاق العمل.",
    slug: "/engineering-insights/cost/finishing-price-per-meter-riyadh",
    published: true,
  },
  {
    title: "تشطيب تسليم مفتاح بالرياض: ماذا يشمل؟",
    excerpt:
      "دليل مبسط لفهم مفهوم تسليم المفتاح، وما الذي يدخل ضمنه عادةً، وما البنود التي يجب توضيحها قبل التعاقد.",
    slug: "/engineering-insights/cost/turnkey-finishing-riyadh",
    published: true,
  },
  {
    title: "تكلفة بناء فيلا بالرياض",
    excerpt:
      "نظرة عامة على العوامل الأساسية التي تؤثر على تكلفة بناء الفيلا، من المساحة والتصميم إلى المواد ونطاق التنفيذ.",
    slug: "/engineering-insights/cost/villa-construction-cost-riyadh",
    published: true,
  },
  {
    title: "تكلفة بناء فيلا 300 متر بالرياض",
    excerpt:
      "مثال تطبيقي يساعد العميل على فهم كيفية قراءة التكاليف بشكل أقرب للواقع عند الحديث عن بناء فيلا بمساحة 300 متر.",
    slug: "/engineering-insights/cost/villa-300m-construction-cost-riyadh",
    published: true,
  },
  {
    title: "تكلفة بناء عظم بالرياض",
    excerpt:
      "توضيح معنى مرحلة العظم، وما البنود التي تدخل فيها، وما أبرز المتغيرات التي تؤثر على التكلفة النهائية.",
    slug: "/engineering-insights/cost/gray-structure-cost-riyadh",
    published: true,
  },
  {
    title: "تكلفة تشطيب فيلا عظم بالرياض",
    excerpt:
      "محتوى مخصص للعملاء الذين لديهم فيلا عظم ويريدون تقدير تكلفة التشطيب فقط مع فهم نطاق الأعمال والتفاوت بين المستويات.",
    slug: "/engineering-insights/cost/villa-shell-to-finish-cost-riyadh",
    published: true,
  },
  {
    title: "تكلفة تشطيب شقة بالرياض",
    excerpt:
      "مقال يشرح ما الذي يميز تكلفة تشطيب الشقق عن الفلل، وكيف يختلف التقدير بحسب المساحة والحالة الحالية ونوعية المواد.",
    slug: "/engineering-insights/cost/apartment-finishing-cost-riyadh",
    published: true,
  },
  {
    title: "التشطيب الاقتصادي والمتوسط والفاخر: فرق التكلفة",
    excerpt:
      "مقارنة عملية بين مستويات التشطيب المختلفة، ومتى يكون كل خيار مناسبًا، وكيف ينعكس ذلك على السعر والجودة.",
    slug: "/engineering-insights/cost/economy-vs-standard-vs-luxury-finishing",
    published: true,
  },
  {
    title: "ما الذي يرفع تكلفة التشطيب في الرياض؟",
    excerpt:
      "أهم الأسباب التي تجعل تكلفة التشطيب ترتفع: التعديلات المتأخرة، سوء التخطيط، تغيّر المواد، وضعف وضوح البنود.",
    slug: "/engineering-insights/cost/what-increases-finishing-cost-riyadh",
    published: true,
  },
  {
    title: "تكلفة السباكة والكهرباء ضمن التشطيب",
    excerpt:
      "فهم تكلفة البنود التأسيسية مثل الكهرباء والسباكة، وكيف تؤثر المواصفات ونطاق الأعمال على الميزانية النهائية.",
    slug: "/engineering-insights/cost/plumbing-and-electrical-cost-finishing",
    published: true,
  },
  {
    title: "كيف تحسب تكلفة مشروعك بشكل مبدئي؟",
    excerpt:
      "شرح مبسط لكيفية تقدير تكلفة المشروع قبل طلب عرض السعر التفصيلي، مع توضيح حدود التقدير الأولي وفائدته العملية.",
    slug: "/engineering-insights/cost/how-to-estimate-project-cost-initially",
    published: true,
  },
  {
    title: "الأخطاء التي تجعل عرض السعر مضللًا",
    excerpt:
      "مقال يساعد العميل على اكتشاف العروض غير الواضحة، والتمييز بين السعر الحقيقي والسعر المنخفض ظاهريًا فقط.",
    slug: "/engineering-insights/cost/misleading-quotation-mistakes",
    published: true,
  },
  {
    title: "كيف تقارن بين عرضي سعر لمشروع تشطيب؟",
    excerpt:
      "دليل عملي لمقارنة عروض الأسعار بشكل صحيح بناءً على البنود والمواصفات والضمان والإشراف، وليس على الرقم فقط.",
    slug: "/engineering-insights/cost/how-to-compare-finishing-quotations",
    published: true,
  },
];

function buildCollectionJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection`,
    url: CANONICAL,
    name: "التكلفة والتسعير | رؤى هندسية | PYBCCO",
    description:
      "قسم التكلفة والتسعير من رؤى هندسية في PYBCCO يشرح تكلفة البناء والتشطيب، سعر المتر، تسليم المفتاح، والعوامل التي تؤثر على الأسعار في الرياض.",
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "PYBCCO",
    },
    about: [
      "تكلفة تشطيب فيلا بالرياض",
      "سعر متر التشطيب",
      "تكلفة بناء فيلا بالرياض",
      "تشطيب تسليم مفتاح",
      "عروض أسعار المقاولات",
    ],
    mainEntity: {
      "@type": "ItemList",
      "@id": `${CANONICAL}#itemlist`,
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: COST_REPORTS.length,
      itemListElement: COST_REPORTS.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}${item.slug}`,
        name: item.title,
      })),
    },
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
        item: CANONICAL,
      },
    ],
  };
}

export default function EngineeringInsightsCostPage() {
  const publishedCount = COST_REPORTS.filter((item) => item.published).length;
  const comingSoonCount = COST_REPORTS.length - publishedCount;

  const jsonLd = [buildCollectionJsonLd(), buildBreadcrumbJsonLd()];

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="التكلفة والتسعير | تكلفة تشطيب وبناء الفلل وسعر المتر في الرياض | PYBCCO"
        description="قسم التكلفة والتسعير من PYBCCO يشرح تكلفة تشطيب الفلل، سعر متر التشطيب، تكلفة بناء الفلل، وتسليم المفتاح في الرياض بطريقة واضحة تساعد العميل قبل طلب عرض السعر."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
            قسم متخصص لفهم تكلفة البناء والتشطيب قبل اتخاذ القرار
          </div>

          <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
            التكلفة والتسعير
          </h1>

          <p className="mt-5 text-base md:text-lg opacity-80 leading-relaxed max-w-4xl">
            هذا القسم مخصص لمساعدة العميل على فهم{" "}
            <strong>تكلفة البناء والتشطيب في الرياض</strong> بشكل أوضح، بداية من{" "}
            <strong>سعر متر التشطيب</strong> وتكلفة{" "}
            <strong>تشطيب الفلل وتسليم المفتاح</strong>، وصولًا إلى كيفية قراءة
            عروض الأسعار ومقارنة البنود بشكل صحيح.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl">
              <Link to="/villa-finishing-price-riyadh">احسب التكلفة الآن</Link>
            </Button>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/construction-company-riyadh">خدمات المقاولات</Link>
            </Button>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/engineering-insights">كل الرؤى الهندسية</Link>
            </Button>
          </div>
        </div>

        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border-border/60">
              <CardContent className="p-6">
                <div className="text-sm opacity-70">إجمالي التقارير المخططة</div>
                <div className="mt-2 text-3xl font-bold">{COST_REPORTS.length}</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60">
              <CardContent className="p-6">
                <div className="text-sm opacity-70">تقارير منشورة</div>
                <div className="mt-2 text-3xl font-bold">{publishedCount}</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60">
              <CardContent className="p-6">
                <div className="text-sm opacity-70">تقارير قادمة</div>
                <div className="mt-2 text-3xl font-bold">{comingSoonCount}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-14">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold">
              ماذا ستجد داخل هذا القسم؟
            </h2>
            <p className="mt-3 opacity-80 leading-relaxed">
              تم بناء هذا القسم ليكون مرجعًا منظمًا حول{" "}
              <strong>تكلفة التشطيب والبناء</strong>، وليس مجرد مقالات متفرقة.
              لذلك ستجد تقارير تغطي:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg">تكلفة التشطيب</h3>
                  <p className="mt-2 opacity-80 leading-relaxed text-sm">
                    مقالات عن تكلفة تشطيب الفلل والشقق، سعر المتر، ومستويات
                    التشطيب المختلفة.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg">تكلفة البناء</h3>
                  <p className="mt-2 opacity-80 leading-relaxed text-sm">
                    تقارير عن تكلفة بناء الفلل، العظم، والعوامل التي تؤثر على
                    الميزانية الإجمالية.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg">عروض الأسعار</h3>
                  <p className="mt-2 opacity-80 leading-relaxed text-sm">
                    محتوى يساعد العميل على قراءة عرض السعر، اكتشاف البنود
                    المضللة، ومقارنة العروض باحتراف.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg">الحساب المبدئي</h3>
                  <p className="mt-2 opacity-80 leading-relaxed text-sm">
                    تقارير مرتبطة بالحسابات الأولية والتقديرات المبدئية قبل طلب
                    عرض سعر تفصيلي.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                تقارير التكلفة والتسعير
              </h2>
              <p className="mt-2 opacity-75 leading-relaxed max-w-3xl">
                هذه هي خريطة المحتوى الأساسية لهذا التصنيف، وتم ترتيبها لتغطي
                الأسئلة الأكثر أهمية للعميل قبل طلب عرض السعر أو بدء التنفيذ.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {COST_REPORTS.map((report) => (
              <Card
                key={report.slug}
                className="rounded-2xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-snug">
                      {report.title}
                    </h3>

                    <div
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        report.published
                          ? "border border-emerald-500/30 bg-emerald-500/10"
                          : "border border-yellow-500/30 bg-yellow-500/10"
                      }`}
                    >
                      {report.published ? "منشور" : "قريبًا"}
                    </div>
                  </div>

                  <p className="mt-4 opacity-80 leading-relaxed min-h-[120px]">
                    {report.excerpt}
                  </p>

                  <div className="mt-6">
                    {report.published ? (
                      <Button asChild className="rounded-2xl w-full">
                        <Link to={report.slug}>قراءة التقرير</Link>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="rounded-2xl w-full opacity-70 cursor-not-allowed"
                      >
                        قريبًا
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <Card className="rounded-2xl border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-6 md:p-8">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold leading-snug">
                  لماذا يبدأ المحتوى من قسم التكلفة؟
                </h2>

                <p className="mt-4 opacity-85 leading-relaxed">
                  لأن الأسئلة المرتبطة بـ <strong>التكلفة والسعر</strong> هي من
                  أكثر ما يبحث عنه العملاء قبل اتخاذ قرار البناء أو التشطيب.
                  وعندما يتم تنظيم هذا المحتوى بشكل احترافي، فإنه يخدم ثلاث
                  وظائف في الوقت نفسه:
                </p>

                <ul className="mt-4 list-disc pr-6 space-y-2 opacity-85 leading-relaxed">
                  <li>توعية العميل قبل البدء بمشروعه.</li>
                  <li>مساعدة العميل على فهم المشروع قبل طلب عرض السعر.</li>
                  <li>انشاء محتوى مفيد يغني عن اخطاء متكررة بعالم الانشاء و التشطيب.</li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-2xl">
                    <Link to="/villa-finishing-price-riyadh">الانتقال إلى الحاسبة</Link>
                  </Button>

                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/projects">مشاريعنا</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold">
              روابط داخلية مفيدة
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold">حاسبة تكلفة التشطيب</h3>
                  <p className="mt-2 text-sm opacity-80 leading-relaxed">
                    للحصول على تصور مبدئي سريع حول تكلفة مشروع التشطيب قبل طلب
                    عرض سعر تفصيلي.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="rounded-2xl">
                      <Link to="/villa-finishing-price-riyadh">افتح الحاسبة</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <h3 className="font-bold">شركة مقاولات بالرياض</h3>
                  <p className="mt-2 text-sm opacity-80 leading-relaxed">
                    صفحة الخدمات الرئيسية لفهم نطاق الأعمال والخدمات التي تقدمها
                    الشركة في البناء والتشطيب.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="rounded-2xl">
                      <Link to="/construction-company-riyadh">عرض الصفحة</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
       
      </div>
    </main>
  );
}