import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import YouTubeFacade from "@/components/video/YouTubeFacade";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Calculator,
  Clapperboard,
  MapPin,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import {
  VIDEO_CATEGORIES,
  featuredVideo,
  getYoutubeEmbedUrl,
  getYoutubeWatchUrl,
  videos,
  type VideoCategory,
  type VideoItem,
} from "@/data/videos";

type JsonLd = Record<string, unknown>;
type FilterCategory = "الكل" | VideoCategory;

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/videos`;

const PAGE_TITLE =
  "فيديوهات مشاريع البناء والتشطيب في الرياض | مكتبة PYBCCO";

const PAGE_DESCRIPTION =
  "شاهد فيديوهات مشاريع التشطيب والترميم والبناء ونظام متابعة المشاريع في الرياض، مع نماذج تنفيذ وروابط مباشرة للخدمات والحاسبات وخريطة المشاريع.";

const WHATSAPP_URL =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%B4%D8%A7%D9%87%D8%AF%D8%AA%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88%D9%87%D8%A7%D8%AA%20%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9%D9%83%D9%85%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B4%D8%A7%D8%A8%D9%87.";

const FAQS = [
  {
    question: "هل هذه الفيديوهات مرتبطة بأعمال وخدمات حقيقية؟",
    answer:
      "نعم، تعرض المكتبة نماذج من أعمال ومراحل تنفيذ وخدمات تقدمها شركة بنيان الهرم للمقاولات داخل الرياض، إلى جانب فيديو يوضح نظام متابعة المشاريع.",
  },
  {
    question: "هل يمكنني طلب تنفيذ مشروع مشابه لما شاهدته؟",
    answer:
      "نعم، يوجد داخل كل بطاقة رابط للخدمة المناسبة، ويمكنك كذلك إرسال تفاصيل المشروع عبر واتساب للحصول على مراجعة أولية للنطاق.",
  },
  {
    question: "هل تشغيل الفيديوهات يؤثر على سرعة الصفحة؟",
    answer:
      "تظهر صورة الغلاف أولًا، ولا يتم تحميل مشغل يوتيوب الكامل إلا بعد الضغط على زر التشغيل، لتقليل الحمل على الصفحة.",
  },
  {
    question: "أين أتابع مواقع ونتائج المشاريع؟",
    answer:
      "يمكنك الانتقال إلى خريطة المشاريع لاستعراض نماذج التنفيذ حسب الحي ونوع المشروع داخل الرياض.",
  },
];

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function buildVideoSchema(video: VideoItem): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${CANONICAL}#${video.slug}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.cover)],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: getYoutubeEmbedUrl(video.youtubeId),
    url: `${CANONICAL}#${video.slug}`,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: video.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    publisher: {
      "@type": "Organization",
      name: "شركة بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.webp`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: getYoutubeWatchUrl(video.youtubeId),
    },
  };
}

function buildPageSchema(): JsonLd[] {
  const collectionPage: JsonLd = {
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
      "@id": `${CANONICAL}#video-list`,
    },
  };

  const itemList: JsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${CANONICAL}#video-list`,
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${CANONICAL}#${video.slug}`,
      name: video.title,
    })),
  };

  const breadcrumb: JsonLd = {
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

  const faqSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${CANONICAL}#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [
    collectionPage,
    itemList,
    breadcrumb,
    faqSchema,
    ...videos.map(buildVideoSchema),
  ];
}

function categoryCount(category: VideoCategory): number {
  return videos.filter((video) => video.categories.includes(category)).length;
}

export default function VideosLibraryPage() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>("الكل");

  const schemas = useMemo(() => buildPageSchema(), []);

  const visibleVideos = useMemo(() => {
    if (activeCategory === "الكل") {
      return videos.filter((video) => !video.featured);
    }

    return videos.filter((video) =>
      video.categories.includes(activeCategory),
    );
  }, [activeCategory]);

  const showFeaturedVideo =
    activeCategory === "الكل" && featuredVideo !== undefined;

  return (
    <>
      <SeoHead
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogImage={
          featuredVideo
            ? absoluteUrl(featuredVideo.cover)
            : `${SITE_URL}/assets/logo.webp`
        }
        ogType="website"
        jsonLd={schemas}
      />

      <main dir="rtl" className="overflow-hidden bg-[#07080b] text-white">
        <section className="relative border-b border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#d4af37]/15 blur-[130px]" />
            <div className="absolute -left-48 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-700/10 blur-[120px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 py-16 text-center md:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f4d675]">
              <Clapperboard className="h-4 w-4" />
              مكتبة فيديو PYBCCO
            </div>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.25] md:text-6xl">
              شاهد مشاريع البناء والتشطيب والترميم في الرياض
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              نماذج مرئية من التنفيذ، والترميم قبل وبعد، ومراحل البناء، ونظام
              متابعة المشاريع الذي يمنح العميل رؤية أوضح لتطور الأعمال.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="rounded-2xl bg-[#d4af37] px-6 font-extrabold text-black hover:bg-[#efd36f]"
              >
                <a href="#video-library">
                  <PlayCircle className="ml-2 h-5 w-5" />
                  شاهد الفيديوهات
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link to="/projects-in-riyadh">
                  <MapPin className="ml-2 h-5 w-5" />
                  خريطة المشاريع
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="ml-2 h-5 w-5" />
                  استفسار وتسعير
                </a>
              </Button>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-3xl font-black text-[#d4af37]">
                  {videos.length}
                </div>
                <div className="mt-1 text-sm text-white/60">فيديوهات منشورة</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-3xl font-black text-[#d4af37]">
                  {VIDEO_CATEGORIES.length}
                </div>
                <div className="mt-1 text-sm text-white/60">تصنيفات رئيسية</div>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-1">
                <div className="text-3xl font-black text-[#d4af37]">9:16</div>
                <div className="mt-1 text-sm text-white/60">
                  تجربة مشاهدة عمودية
                </div>
              </div>
            </div>
          </div>
        </section>

        {showFeaturedVideo && featuredVideo ? (
          <section className="border-b border-white/10 bg-[#0b0c10]">
            <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1fr_420px] lg:py-20">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f4d675]">
                  <ShieldCheck className="h-4 w-4" />
                  الفيديو المميز
                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                  {featuredVideo.title}
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                  {featuredVideo.description}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "متابعة صور وتقارير التنفيذ",
                    "رؤية أوضح لمراحل المشروع",
                    "تنظيم الملاحظات والتحديثات",
                    "رفع مستوى الشفافية مع العميل",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#d4af37]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-2xl bg-[#d4af37] font-extrabold text-black hover:bg-[#efd36f]"
                  >
                    <Link to={featuredVideo.relatedPage}>
                      {featuredVideo.relatedLabel}
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10"
                  >
                    <a
                      href={getYoutubeWatchUrl(featuredVideo.youtubeId)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="ml-2 h-5 w-5" />
                      مشاهدة على يوتيوب
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[390px]">
                <YouTubeFacade
                  youtubeId={featuredVideo.youtubeId}
                  title={featuredVideo.title}
                  cover={featuredVideo.cover}
                  priority
                  className="aspect-[9/16] w-full rounded-[30px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section
          id="video-library"
          className="container mx-auto max-w-7xl px-4 py-14 md:py-20"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#d4af37]">مكتبة الفيديو</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                اختر التصنيف وشاهد التنفيذ
              </h2>
            </div>

            <a
              href="https://www.youtube.com/@pybcco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition hover:text-white"
            >
              زيارة قناة PYBCCO
              <Youtube className="h-5 w-5 text-[#d4af37]" />
            </a>
          </div>

          <div className="mt-8 flex gap-3 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() => setActiveCategory("الكل")}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                activeCategory === "الكل"
                  ? "border-[#d4af37] bg-[#d4af37] text-black"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              الكل ({videos.length})
            </button>

            {VIDEO_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category
                    ? "border-[#d4af37] bg-[#d4af37] text-black"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {category} ({categoryCount(category)})
              </button>
            ))}
          </div>

          <div className="mt-9 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {visibleVideos.map((video, index) => (
              <article
                key={video.slug}
                id={video.slug}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.32)]"
              >
                <YouTubeFacade
                  youtubeId={video.youtubeId}
                  title={video.title}
                  cover={video.cover}
                  priority={index === 0 && activeCategory !== "الكل"}
                  className="aspect-[9/16] w-full"
                />

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {video.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-bold text-[#f4d675]"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-4 text-xl font-black leading-8">
                    {video.shortTitle}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {video.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Button
                      asChild
                      className="w-full rounded-2xl bg-[#d4af37] font-extrabold text-black hover:bg-[#efd36f]"
                    >
                      <Link to={video.relatedPage}>
                        {video.relatedLabel}
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <a
                      href={getYoutubeWatchUrl(video.youtubeId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white"
                    >
                      <Youtube className="h-4 w-4 text-[#d4af37]" />
                      فتح الفيديو على يوتيوب
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleVideos.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/65">
              لا توجد فيديوهات ضمن هذا التصنيف حاليًا.
            </div>
          ) : null}
        </section>

        <section className="border-y border-white/10 bg-[#0b0c10]">
          <div className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold text-[#d4af37]">
                الخطوة التالية
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                انتقل من المشاهدة إلى التخطيط لمشروعك
              </h2>
              <p className="mt-4 text-base leading-8 text-white/65">
                استخدم الأدوات والصفحات المرتبطة للحصول على تصور أولي للتكلفة أو
                استعراض مشاريع مشابهة أو إرسال طلبك مباشرة.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  to: "/villa-finishing-price-riyadh",
                  title: "حاسبة تكلفة التشطيب",
                  description: "تقدير أولي يساعدك على فهم ميزانية التشطيب.",
                  icon: Calculator,
                },
                {
                  to: "/villa-construction-cost-calculator-riyadh",
                  title: "حاسبة تكلفة البناء",
                  description: "تقدير أولي لتكلفة تنفيذ مشروع البناء.",
                  icon: Building2,
                },
                {
                  to: "/projects-in-riyadh",
                  title: "خريطة المشاريع",
                  description: "استعرض نماذج التنفيذ ومواقع المشاريع في الرياض.",
                  icon: MapPin,
                },
                {
                  to: "/request-project",
                  title: "طلب تنفيذ مشروع",
                  description: "أرسل نطاق المشروع للحصول على مراجعة أولية.",
                  icon: MessageCircle,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d4af37]/40 hover:bg-white/[0.07]"
                  >
                    <span className="inline-flex rounded-2xl bg-[#d4af37]/10 p-3 text-[#d4af37]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d4af37]">
                      الانتقال
                      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
          <div className="text-center">
            <p className="text-sm font-bold text-[#d4af37]">أسئلة شائعة</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              معلومات عن مكتبة الفيديو
            </h2>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {FAQS.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[24px] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-base font-black leading-8">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
