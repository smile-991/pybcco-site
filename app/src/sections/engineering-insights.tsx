import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JsonLd = Record<string, any>;

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/engineering-insights`;

const CATEGORIES = [
  {
    title: "التكلفة والتسعير",
    description:
      "تقارير ومقالات تشرح تكلفة التشطيب، سعر المتر، تكلفة البناء، وتسليم المفتاح بطريقة منظمة تساعد العميل على تكوين تصور مبدئي قبل اتخاذ القرار.",
    slug: "/engineering-insights/cost",
    articleCount: 14,
    keywords: [
      "تكلفة تشطيب فيلا بالرياض",
      "سعر متر التشطيب",
      "تكلفة بناء فيلا",
      "تشطيب تسليم مفتاح",
    ],
  },
  {
    title: "اختيار شركة المقاولات",
    description:
      "محتوى عملي يساعد العميل على اختيار شركة مقاولات في الرياض بناءً على وضوح العقد، الإشراف الهندسي، الشفافية، وسابقة الأعمال.",
    slug: "/engineering-insights/choose-contractor",
    articleCount: 11,
    keywords: [
      "شركة مقاولات بالرياض",
      "اختيار المقاول",
      "عقد تشطيب",
      "ضمان التشطيب",
    ],
  },
  {
  title: "مراحل البناء والتشطيب",
  description:
    "مقالات تشرح ترتيب الأعمال، مدة التنفيذ، مراحل التشطيب، والاستلامات الأساسية حتى يكون العميل على دراية أوضح بمسار المشروع.",
  slug: "/engineering-insights/construction-and-finishing-stages",
  articleCount: 10,
  keywords: [
    "مراحل التشطيب",
    "مدة بناء فيلا",
    "ترتيب أعمال التشطيب",
    "استلامات البناء",
  ],
},
  {
    title: "الأخطاء الشائعة",
    description:
      "دروس عملية حول أخطاء اختيار المقاول، أخطاء التشطيب، والمشاكل التنفيذية التي قد ترفع التكلفة أو تؤثر على جودة المشروع لاحقًا.",
    slug: "/engineering-insights/mistakes",
    articleCount: 8,
    keywords: [
      "أخطاء تشطيب الفلل",
      "أخطاء اختيار المقاول",
      "عيوب التشطيب",
      "مشاكل التنفيذ",
    ],
  },
  {
    title: "المقارنات والخيارات",
    description:
      "مقارنات تساعد العميل على اتخاذ قرار أفضل بين المواد والأنظمة ومستويات التشطيب، مثل الاقتصادي مقابل الفاخر، والسيراميك مقابل البورسلان.",
    slug: "/engineering-insights/comparisons",
    articleCount: 8,
    keywords: [
      "تشطيب اقتصادي أو فاخر",
      "سيراميك أم بورسلان",
      "مقارنة مواد التشطيب",
      "خيارات التشطيب",
    ],
  },
];

const FEATURED_ARTICLES = [
  {
    title: "كيف تختار أفضل شركة مقاولات في الرياض؟",
    excerpt:
      "دليل عملي قبل توقيع العقد: نطاق العمل، العقد التفصيلي، الإشراف الهندسي، الشفافية، وضمان التشطيب لمدة سنتين.",
    slug: "/engineering-insights/how-to-choose-construction-company-riyadh",
    categoryTitle: "اختيار شركة المقاولات",
  },
];

function buildCollectionJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection`,
    url: CANONICAL,
    name: "رؤى هندسية | PYBCCO",
    description:
      "قسم رؤى هندسية من PYBCCO يضم تصنيفات ومقالات تساعد العملاء على فهم تكلفة البناء والتشطيب، اختيار شركة المقاولات، مراحل التنفيذ، والأخطاء الشائعة في الرياض.",
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "PYBCCO",
    },
    about: [
      "شركة مقاولات بالرياض",
      "تشطيب فلل بالرياض",
      "تكلفة البناء والتشطيب",
      "اختيار المقاول",
      "مراحل البناء",
    ],
    mainEntity: {
      "@type": "ItemList",
      "@id": `${CANONICAL}#categories`,
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: CATEGORIES.length,
      itemListElement: CATEGORIES.map((category, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}${category.slug}`,
        name: category.title,
      })),
    },
    hasPart: FEATURED_ARTICLES.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `${SITE_URL}${article.slug}`,
    })),
  };
}

function buildItemListJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${CANONICAL}#featured-articles`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: FEATURED_ARTICLES.length,
    itemListElement: FEATURED_ARTICLES.map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${post.slug}`,
      name: post.title,
    })),
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
        item: CANONICAL,
      },
    ],
  };
}

export default function EngineeringInsightsSection() {
  const jsonLd = [
    buildCollectionJsonLd(),
    buildItemListJsonLd(),
    buildBreadcrumbJsonLd(),
  ];

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="رؤى هندسية | مقالات وتقييمات عن تكلفة البناء والتشطيب واختيار المقاول في الرياض | PYBCCO"
        description="اكتشف أقسام رؤى هندسية من PYBCCO: التكلفة والتسعير، اختيار شركة المقاولات، مراحل البناء والتشطيب، الأخطاء الشائعة، والمقارنات العملية للعملاء في الرياض."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
            مركز معرفي منظم للعملاء قبل بدء المشروع
          </div>

          <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
            رؤى هندسية
          </h1>

          <p className="mt-5 text-base md:text-lg opacity-80 leading-relaxed max-w-3xl">
            قسم معرفي منظم يساعد العملاء على فهم{" "}
            <strong>تكلفة البناء والتشطيب</strong>، وطريقة{" "}
            <strong>اختيار شركة مقاولات في الرياض</strong>، ومراحل التنفيذ،
            والأخطاء الشائعة قبل توقيع العقد أو بدء المشروع.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl">
              <Link to="/villa-finishing-price-riyadh">احسب التكلفة</Link>
            </Button>

            <Button asChild variant="outline" className="rounded-2xl">
              <Link to="/construction-company-riyadh">خدمات المقاولات</Link>
            </Button>
          </div>
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                تصنيفات الرؤى الهندسية
              </h2>
              <p className="mt-2 opacity-75 leading-relaxed max-w-3xl">
                تم تنظيم المحتوى إلى تصنيفات واضحة لرفع جودة التصفح، وتقوية
                البنية الموضوعية للموقع، وتسهيل التوسع لاحقًا بمقالات مترابطة
                داخل كل مجال.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Card
                key={category.slug}
                className="rounded-2xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-snug">
                      {category.title}
                    </h3>

                    <div className="shrink-0 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold">
                      {category.articleCount} مقال
                    </div>
                  </div>

                  <p className="mt-4 opacity-80 leading-relaxed min-h-[96px]">
                    {category.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-muted px-3 py-1 text-xs opacity-85"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button asChild className="rounded-2xl w-full">
                      <Link to={category.slug}>استعراض التقارير</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                تقارير مميزة منشورة
              </h2>
              <p className="mt-2 opacity-75 leading-relaxed max-w-3xl">
                هذه التقارير تمثل بداية القسم، وسيتم توسيع كل تصنيف لاحقًا
                بمحتوى متخصص يخدم العميل ويدعم صفحات الخدمات والحاسبة.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FEATURED_ARTICLES.map((post) => (
              <Card
                key={post.slug}
                className="rounded-2xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold">
                    {post.categoryTitle}
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 opacity-80 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild className="rounded-2xl">
                      <Link to={post.slug}>قراءة التقرير</Link>
                    </Button>

                    <Button asChild variant="outline" className="rounded-2xl">
                      <Link to="/engineering-insights/choose-contractor">
                        عرض هذا التصنيف
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <Card className="rounded-2xl border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-6 md:p-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold leading-snug">
                  لماذا تم تنظيم هذا القسم بهذه الطريقة؟
                </h2>

                <p className="mt-4 opacity-85 leading-relaxed">
                  الهدف ليس إنشاء مدونة تقليدية، بل بناء{" "}
                  <strong>مركز محتوى هندسي منظم</strong> يخدم العميل قبل اتخاذ
                  القرار، ويدعم ظهور الموقع في Google بكلمات مفتاحية مرتبطة
                  بالبناء والتشطيب في الرياض، مع ربط واضح بين المحتوى، صفحات
                  الخدمات، وحاسبة التكلفة.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/projects">مشاريعنا</Link>
                  </Button>

                  <Button asChild variant="outline" className="rounded-2xl">
                    <Link to="/case-study-villa-renovation-riyadh">
                      دراسة حالة
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="mt-10 text-sm opacity-65 leading-relaxed">
          ملاحظة تنظيمية: تم إعداد هذه الصفحة كبوابة رئيسية للتصنيفات الهندسية،
          بحيث يكون لكل فئة صفحة مستقلة قابلة للتوسع الداخلي لاحقًا بمقالات
          مترابطة، وهو ما يدعم تجربة المستخدم والبنية الموضوعية للموقع معًا.
        </div>
      </div>
    </main>
  );
}