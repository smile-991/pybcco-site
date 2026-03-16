import { useMemo } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  Youtube,
  Clapperboard,
  Building2,
  ArrowLeft,
  Clock3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type JsonLd = Record<string, any>;

type VideoItem = {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  keywords: string[];
  category: "تشطيب" | "ترميم" | "عظم" | "نصائح";
};

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/videos`;
const PAGE_TITLE =
  "فيديوهات مشاريع البناء والتشطيب في الرياض | مكتبة الفيديو | بنيان الهرم للمقاولات";
const PAGE_DESCRIPTION =
  "شاهد فيديوهات مشاريع البناء والتشطيب والترميم في الرياض، وتعرّف على مستوى التنفيذ وجودة التفاصيل في نماذج مختارة تساعدك على تقييم الأعمال واختيار الخدمة المناسبة لمشروعك.";

const PAGE_OG_IMAGE = `${SITE_URL}/assets/logo.webp`;

const VIDEOS: VideoItem[] = [
  {
    id: "luxury-bathroom-finishing-riyadh",
    title:
      "تشطيب حمامات فاخرة في الرياض | تصميم ملهم وتنفيذ راقٍ في معرض الصقور والأسلحة",
    description:
      "فيديو قصير يعرض نموذجًا ملهمًا لتشطيب حمام فاخر في الرياض، مع إبراز جودة التفاصيل النهائية والهوية التنفيذية الراقية المناسبة للمشاريع السكنية والمجالس والمعارض الفاخرة.",
    embedUrl: "https://www.youtube.com/embed/RXlu9puTA-o",
    watchUrl: "https://youtube.com/shorts/RXlu9puTA-o?si=onQayNi8gpfN6Kf7",
    thumbnailUrl: `${SITE_URL}/vedio cover/laxury-bathroom.webp`,
    uploadDate: "2026-03-16",
    duration: "PT30S",
    keywords: [
      "تشطيب حمامات فاخرة بالرياض",
      "مقاول تشطيب حمامات",
      "تشطيبات داخلية فاخرة",
      "شركة مقاولات بالرياض",
    ],
    category: "تشطيب",
  },
  {
    id: "villa-renovation-yasmin-riyadh",
    title:
      "ترميم فيلا سكنية في حي الياسمين بالرياض | تجديد عملي وتحسين جودة المساحات",
    description:
      "مقطع يوضح جانبًا من أعمال ترميم فيلا سكنية في حي الياسمين بالرياض، ويعكس مستوى التنفيذ والاهتمام بإعادة التأهيل وتحسين الحالة الوظيفية والجمالية للمسكن قبل التسليم.",
    embedUrl: "https://www.youtube.com/embed/qaKZukA1534",
    watchUrl: "https://youtube.com/shorts/qaKZukA1534?si=DUDzbA2_8TsSVQ8a",
    thumbnailUrl: `${SITE_URL}/vedio cover/villa-renuvation.webp`,
    uploadDate: "2026-03-16",
    duration: "PT30S",
    keywords: [
      "ترميم فيلا بالرياض",
      "ترميم حي الياسمين",
      "تجديد فلل سكنية",
      "مقاولات ترميم الرياض",
    ],
    category: "ترميم",
  },
  {
    id: "before-after-roof-finishing-riyadh",
    title: "قبل وبعد تشطيب سطح شقة سكنية فاخرة | تحويل بصري عملي في الرياض",
    description:
      "فيديو قبل وبعد يبرز التحول الواضح في تشطيب سطح شقة سكنية فاخرة بالرياض، ويُظهر كيف تؤثر المعالجة الصحيحة للتشطيب على الشكل النهائي والاستفادة من المساحة وجودة الاستخدام.",
    embedUrl: "https://www.youtube.com/embed/re44BUTtHUk",
    watchUrl: "https://youtube.com/shorts/re44BUTtHUk?si=Wn-LTsc1_zHgsdro",
    thumbnailUrl: `${SITE_URL}/vedio cover/befor-after.webp`,
    uploadDate: "2026-03-16",
    duration: "PT30S",
    keywords: [
      "قبل وبعد تشطيب سطح",
      "تشطيب سطح شقة بالرياض",
      "تشطيب فاخر",
      "مقاول تشطيب أسطح",
    ],
    category: "تشطيب",
  },
];

const FAQS = [
  {
    q: "هل هذه الفيديوهات مرتبطة بأعمال حقيقية؟",
    a: "نعم، تعرض الصفحة مقاطع مرتبطة بأعمال تنفيذ ونماذج مشاريع ومحتوى بصري يعكس نوع الخدمات التي نقدمها داخل الرياض.",
  },
  {
    q: "هل يمكنني طلب تنفيذ مشروع مشابه لما شاهدته؟",
    a: "نعم، يمكنك التواصل معنا مباشرة أو إرسال طلب مشروع مشابه، وسنراجع نطاق العمل ونقترح عليك المسار المناسب للتنفيذ.",
  },
  {
    q: "هل يمكنني استخدام الحاسبة بعد مشاهدة الفيديوهات؟",
    a: "نعم، يمكنك الانتقال إلى حاسبة تكلفة التشطيب أو حاسبة تكلفة البناء للحصول على تقدير أولي يساعدك على فهم الميزانية المتوقعة.",
  },
  {
    q: "هل تقدمون خدمات التشطيب والترميم داخل الرياض؟",
    a: "نعم، نقدم خدمات التشطيب والترميم وأعمال المقاولات داخل الرياض، مع إمكانية مراجعة نوع المشروع وتحديد الخدمة المناسبة حسب الاحتياج.",
  },
];

function buildPageSchema(): JsonLd[] {
  const itemListElements = VIDEOS.map((video, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${CANONICAL}#${video.id}`,
    name: video.title,
  }));

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection-page`,
    url: CANONICAL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
    },
    mainEntity: {
      "@id": `${CANONICAL}#itemlist`,
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${CANONICAL}#itemlist`,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: VIDEOS.length,
    itemListElement: itemListElements,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${CANONICAL}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "مكتبة الفيديو",
        item: CANONICAL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${CANONICAL}#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const videoSchemas = VIDEOS.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${CANONICAL}#${video.id}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    contentUrl: video.watchUrl,
    url: `${CANONICAL}#${video.id}`,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: video.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    publisher: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.webp`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: [video.watchUrl, video.embedUrl],
    },
  }));

  return [collectionPage, itemList, breadcrumb, faqSchema, ...videoSchemas];
}

export default function VideosLibraryPage() {
  const schemas = useMemo(() => buildPageSchema(), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<VideoItem["category"], number> = {
      تشطيب: 0,
      ترميم: 0,
      عظم: 0,
      نصائح: 0,
    };

    VIDEOS.forEach((video) => {
      counts[video.category] += 1;
    });

    return counts;
  }, []);

  return (
    <>
      <SeoHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow"
        ogImage={VIDEOS[0]?.thumbnailUrl || PAGE_OG_IMAGE}
        ogType="website"
        jsonLd={schemas}
      />

      <main className="bg-black text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-[#111111] to-black">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top,rgba(255,215,0,0.18),transparent_35%)]" />

          <div className="container mx-auto px-4 py-14 md:py-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#f5deb3]">
                <Youtube className="h-4 w-4" />
                مكتبة فيديوهات PYBCCO
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                فيديوهات مشاريع البناء والتشطيب في الرياض
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
                شاهد نماذج مرئية من أعمال التشطيب والترميم والتحولات قبل وبعد في
                الرياض، وتعرّف على مستوى التنفيذ وجودة التفاصيل في مشاريع مختارة.
                يمكنك بعد المشاهدة الانتقال مباشرة إلى الخدمة المناسبة أو طلب
                مشروع مشابه.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  className="bg-[#D4AF37] text-black hover:bg-[#e5c158]"
                >
                  <a href="#videos">شاهد الفيديوهات الآن</a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                  <Link to="/villa-finishing-price-riyadh">حاسبة التشطيب</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                  <Link to="/villa-construction-cost-calculator-riyadh">
                    حاسبة البناء
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {VIDEOS.length}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    إجمالي الفيديوهات
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {categoryCounts["تشطيب"]}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    مقاطع التشطيب
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {categoryCounts["ترميم"]}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    مقاطع الترميم
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">
                    {VIDEOS.length}
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    نماذج مرئية أولية
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#0d0d0d]">
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Clapperboard className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">شاهد نماذج تنفيذ حقيقية</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  استعرض مقاطع مختارة من أعمال التشطيب والترميم والتحولات قبل
                  وبعد، لتأخذ فكرة أوضح عن أسلوب التنفيذ وجودة التفاصيل النهائية.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">فيديوهات مختصرة وواضحة</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  تعرض المقاطع لقطات سريعة ومباشرة تساعدك على تقييم النتيجة
                  البصرية، وفهم نوع الأعمال المناسبة لمشروعك قبل طلب المعاينة أو
                  عرض السعر.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Building2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">اختر الخدمة المناسبة بسهولة</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  بعد مشاهدة الفيديوهات يمكنك الانتقال مباشرة إلى خدمة التشطيب أو
                  الترميم أو الحاسبة المناسبة، ثم طلب مشروع مشابه حسب احتياجك.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="videos" className="container mx-auto px-4 py-14 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#D4AF37]">مكتبة الفيديو</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                أحدث الفيديوهات
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@pybcco"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-white/70 transition hover:text-white md:inline-flex"
            >
              زيارة القناة على يوتيوب
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {VIDEOS.map((video, index) => (
              <article
                key={video.id}
                id={video.id}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_10px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <iframe
                    className="relative z-10 h-full w-full"
                    src={video.embedUrl}
                    title={video.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[#f5deb3]">
                      {video.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-white/60">
                      <Clock3 className="h-3.5 w-3.5" />
                      فيديو قصير
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-8 text-white">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {video.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {video.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="bg-[#D4AF37] text-black hover:bg-[#e5c158]"
                    >
                      <a
                        href={video.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PlayCircle className="me-2 h-4 w-4" />
                        مشاهدة على يوتيوب
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="border-white/15 bg-transparent text-white hover:bg-white/5"
                    >
                      <Link to="/request-project">اطلب مشروع مشابه</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0d0d0d]">
          <div className="container mx-auto px-4 py-14 md:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm text-[#D4AF37]">لماذا تشاهد هذه الفيديوهات؟</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                شاهد مستوى التنفيذ قبل اتخاذ قرارك
              </h2>
              <p className="mt-5 text-base leading-8 text-white/75">
                تساعدك هذه الفيديوهات على تكوين تصور أسرع عن جودة التنفيذ، ونوع
                التشطيبات، وطريقة عرض النتيجة النهائية في المشاريع السكنية
                والتجارية. بدل الاكتفاء بالصور فقط، يمكنك مشاهدة نماذج مرئية
                تعطيك انطباعًا أوضح قبل طلب المعاينة أو عرض السعر.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
              {[
                "مشاهدة تفاصيل التنفيذ بشكل أوضح من الصور الثابتة.",
                "تكوين تصور عملي عن مستوى التشطيب قبل بدء المشروع.",
                "مقارنة أنواع الأعمال بين الترميم والتشطيب والتحولات قبل وبعد.",
                "فهم النتيجة النهائية المتوقعة للمساحات المشابهة لمشروعك.",
                "الوصول السريع إلى الخدمة أو الحاسبة المناسبة بعد المشاهدة.",
                "اتخاذ قرار أولي بثقة أكبر قبل طلب المعاينة أو عرض السعر.",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
                    <p className="text-sm leading-7 text-white/75">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm text-[#D4AF37]">روابط مفيدة</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                الخطوة التالية بعد مشاهدة الفيديو
              </h2>
              <p className="mt-4 text-sm leading-8 text-white/70">
                إذا شاهدت مقطعًا قريبًا من نوع مشروعك، يمكنك الانتقال إلى الخدمة
                المناسبة أو استخدام الحاسبة التقديرية أو إرسال طلب مشروع لنراجع
                احتياجك بشكل أدق.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  {
                    to: "/construction-company-riyadh",
                    label: "شركة مقاولات بالرياض",
                  },
                  {
                    to: "/villa-finishing-riyadh",
                    label: "تشطيب فلل بالرياض",
                  },
                  {
                    to: "/villa-renovation-riyadh",
                    label: "ترميم فلل بالرياض",
                  },
                  {
                    to: "/villa-finishing-price-riyadh",
                    label: "حاسبة تكلفة التشطيب",
                  },
                  {
                    to: "/villa-construction-cost-calculator-riyadh",
                    label: "حاسبة تكلفة البناء",
                  },
                  {
                    to: "/engineering-insights",
                    label: "الرؤى الهندسية",
                  },
                  {
                    to: "/request-project",
                    label: "طلب تنفيذ مشروع",
                  },
                  {
                    to: "/",
                    label: "العودة إلى الرئيسية",
                  },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/80 transition hover:border-[#D4AF37]/30 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-black p-6 md:p-8">
              <p className="text-sm text-[#D4AF37]">أسئلة شائعة</p>
              <h2 className="mt-2 text-2xl font-extrabold">FAQ</h2>

              <div className="mt-6 space-y-4">
                {FAQS.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <h3 className="text-sm font-bold leading-7 text-white">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}