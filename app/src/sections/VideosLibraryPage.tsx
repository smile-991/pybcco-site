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
const PAGE_TITLE = "فيديوهات مشاريع البناء والتشطيب في الرياض | مكتبة الفيديو | بنيان الهرم للمقاولات";
const PAGE_DESCRIPTION =
  "شاهد مكتبة فيديوهات بنيان الهرم للمقاولات في الرياض: تشطيب حمامات فاخرة، ترميم فلل سكنية، وتحويلات قبل وبعد في التشطيب، مع صفحة مهيأة لجوجل عبر VideoObject و CollectionPage وروابط داخلية تخدم السيو والتحويل.";

const VIDEOS: VideoItem[] = [
  {
    id: "luxury-bathroom-finishing-riyadh",
    title: "تشطيب حمامات فاخرة في الرياض | تصميم ملهم وتنفيذ راقٍ في معرض الصقور والأسلحة",
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
    title: "ترميم فيلا سكنية في حي الياسمين بالرياض | تجديد عملي وتحسين جودة المساحات",
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
    q: "هل هذه الفيديوهات مرتبطة بمشاريع حقيقية في الرياض؟",
    a: "نعم، الصفحة مخصصة لعرض فيديوهات مرتبطة بأعمال ومشاريع ونماذج تنفيذ ومحتوى بصري يخدم خدمات الشركة داخل الرياض وما حولها.",
  },
  {
    q: "هل أستطيع طلب عرض سعر بعد مشاهدة الفيديوهات؟",
    a: "نعم، يمكنك الانتقال مباشرة إلى حاسبة التكلفة أو صفحة طلب مشروع أو التواصل معنا بعد مشاهدة المقاطع المناسبة لنوع مشروعك.",
  },
  {
    q: "هل صفحة الفيديو مفيدة لجوجل والسيو؟",
    a: "نعم، تم بناء الصفحة كمكتبة فيديو فعلية تتضمن VideoObject وCollectionPage وItemList وFAQ وروابط داخلية وسياقًا نصيًا واضحًا يساعد جوجل على فهم المحتوى بشكل أفضل.",
  },
  {
    q: "هل الفيديوهات مرتبطة بخدمات الموقع؟",
    a: "نعم، كل الصفحة مصممة لربط المحتوى المرئي بالخدمات والحاسبات والمقالات الهندسية لتقوية الربط الداخلي وتحسين رحلة الزائر داخل الموقع.",
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
      target: [video.watchUrl],
    },
  }));

  return [collectionPage, itemList, breadcrumb, faqSchema, ...videoSchemas];
}

export default function VideosLibraryPage() {
  const schemas = useMemo(() => buildPageSchema(), []);

  const categoryCounts = useMemo(() => {
    const counts = {
      "تشطيب": 0,
      "ترميم": 0,
      "عظم": 0,
      "نصائح": 0,
    } as Record<VideoItem["category"], number>;

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
        ogImage={`${SITE_URL}/assets/logo.webp`}
        ogType="website"
        jsonLd={schemas}
      />

      <main className="bg-black text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-black via-[#111111] to-black">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top,rgba(255,215,0,0.18),transparent_35%)]" />

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
                شاهد نماذج مرئية من أعمال التشطيب والترميم والتحولات قبل وبعد داخل الرياض، ضمن
                صفحة فيديو احترافية تخدم جوجل، تدعم الثقة، وتربط المحتوى المرئي مباشرة بصفحات
                الخدمات والحاسبات وطلب المشروع.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#e5c158]">
                  <a href="#videos">شاهد الفيديوهات الآن</a>
                </Button>

                <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/5">
                  <Link to="/villa-finishing-price-riyadh">حاسبة التشطيب</Link>
                </Button>

                <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/5">
                  <Link to="/villa-construction-cost-calculator-riyadh">حاسبة البناء</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">{VIDEOS.length}</div>
                  <div className="mt-1 text-sm text-white/70">إجمالي الفيديوهات</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">{categoryCounts["تشطيب"]}</div>
                  <div className="mt-1 text-sm text-white/70">مقاطع التشطيب</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">{categoryCounts["ترميم"]}</div>
                  <div className="mt-1 text-sm text-white/70">مقاطع الترميم</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">3</div>
                  <div className="mt-1 text-sm text-white/70">نماذج مرئية أولية</div>
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
                <h2 className="text-lg font-bold">مكتبة فيديو فعلية قابلة للفهرسة</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  بدل أن تبقى الفيديوهات مخفية داخل المقالات فقط، أصبحت في صفحة مستقلة قابلة
                  للاكتشاف من جوجل والزائر مع سياق واضح حول كل فيديو.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">تهيئة قوية لـ Google Video</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  الصفحة تتضمن VideoObject وCollectionPage وItemList وFAQ وBreadcrumbs، مع صور
                  مصغرة ثابتة وروابط مشاهدة واضحة ونصوص داعمة حول كل فيديو.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Building2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">تحويل أسرع من المشاهدة إلى التواصل</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  كل فيديو يقود الزائر نحو الخدمة المناسبة أو طلب المشروع أو الحاسبة، مما يجعل
                  الصفحة أداة سيو وتحويل في نفس الوقت.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="videos" className="container mx-auto px-4 py-14 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#D4AF37]">مكتبة الفيديو</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">أحدث الفيديوهات</h2>
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
                <a
                  href={video.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden bg-black"
                  aria-label={video.title}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="aspect-video w-full object-cover transition duration-500 hover:scale-[1.02]"
                  />
                </a>

                <div className="aspect-video bg-black">
                  <iframe
                    className="h-full w-full"
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

                  <h3 className="text-lg font-bold leading-8 text-white">{video.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{video.description}</p>

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
                    <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#e5c158]">
                      <a href={video.watchUrl} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="me-2 h-4 w-4" />
                        مشاهدة على يوتيوب
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/5">
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
              <p className="text-sm text-[#D4AF37]">لماذا هذه الصفحة مهمة؟</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                لماذا مكتبة الفيديو صفحة قوية جدًا لجوجل؟
              </h2>
              <p className="mt-5 text-base leading-8 text-white/75">
                لأن الصفحة لا تعتمد على التضمين فقط، بل تقدم سياقًا واضحًا حول نوع المشروع،
                طبيعة التنفيذ، والوصول إلى الخدمة المناسبة بعد المشاهدة. هذا يجعل صفحة الفيديو
                أصل محتوى حقيقي داخل الموقع، وليس مجرد روابط خارجية مبعثرة.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
              {[
                "تقوية السيو الداخلي عبر ربط الفيديوهات بصفحات الخدمات والمقالات والحاسبات.",
                "زيادة الوقت الذي يقضيه الزائر داخل الموقع عند مشاهدة المقاطع من نفس الصفحة.",
                "تحويل الفيديو من أصل خارجي فقط إلى محتوى منظم داخل بنية الموقع.",
                "دعم إشارات الكيان الرقمي عبر الربط مع يوتيوب وحضور الشركة الخارجي.",
                "إتاحة مساحة مستقبلية لإضافة Shorts ومقاطع مشاريع ومقاطع قبل وبعد بسهولة.",
                "تجهيز الصفحة لتكون مرجعًا بصريًا أساسيًا لأي زائر يريد تقييم مستوى التنفيذ بسرعة.",
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">من الفيديو إلى القرار</h2>
              <p className="mt-4 text-sm leading-8 text-white/70">
                هذه الصفحة يجب أن تكون جزءًا من مسار التحويل الكامل: فيديو ← خدمة أو حاسبة ← طلب
                مشروع أو تواصل. لذلك أضفنا روابط داخلية مباشرة إلى أهم الصفحات التي تخدم الزائر
                بعد المشاهدة.
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
                  <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-bold leading-7 text-white">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">{faq.a}</p>
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
