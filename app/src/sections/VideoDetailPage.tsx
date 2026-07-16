import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  MessageCircle,
  PlayCircle,
  Tag,
  Youtube,
} from "lucide-react";

import SeoHead from "@/components/SeoHead";
import YouTubeFacade from "@/components/video/YouTubeFacade";
import { Button } from "@/components/ui/button";
import {
  getVideoBySlug,
  getYoutubeEmbedUrl,
  getYoutubeWatchUrl,
  videos,
  type VideoItem,
} from "@/data/videos";

import NotFound from "./NotFound";

type JsonLd = Record<string, unknown>;

const SITE_URL = "https://pybcco.com";

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function formatUploadDate(uploadDate: string): string {
  const date = new Date(uploadDate);

  if (Number.isNaN(date.getTime())) {
    return uploadDate;
  }

  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Riyadh",
  }).format(date);
}

function formatDuration(duration: string): string {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);

  if (!match) {
    return duration;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const parts: string[] = [];

  if (hours > 0) parts.push(`${hours} ساعة`);
  if (minutes > 0) parts.push(`${minutes} دقيقة`);
  if (seconds > 0) parts.push(`${seconds} ثانية`);

  return parts.join(" و") || duration;
}

function buildWhatsappUrl(video: VideoItem): string {
  const pageUrl = `${SITE_URL}/videos/${video.slug}`;
  const message = [
    "السلام عليكم،",
    `شاهدت فيديو: ${video.title}`,
    `رابط الفيديو: ${pageUrl}`,
    "وأرغب بالاستفسار عن تنفيذ مشروع مشابه.",
  ].join("\n");

  return `https://wa.me/966550604837?text=${encodeURIComponent(message)}`;
}

function buildSchemas(video: VideoItem): JsonLd[] {
  const pageUrl = `${SITE_URL}/videos/${video.slug}`;
  const webPageId = `${pageUrl}#webpage`;
  const videoId = `${pageUrl}#video`;

  const webPageSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webPageId,
    url: pageUrl,
    name: video.title,
    description: video.description,
    inLanguage: "ar",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(video.cover),
    },
    mainEntity: {
      "@id": videoId,
    },
  };

  const videoSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": videoId,
    name: video.title,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.cover)],
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: getYoutubeEmbedUrl(video.youtubeId),
    url: pageUrl,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: video.keywords.join(", "),
    mainEntityOfPage: {
      "@id": webPageId,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "WatchAction",
      target: getYoutubeWatchUrl(video.youtubeId),
    },
  };

  const breadcrumbSchema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
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
        item: `${SITE_URL}/videos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.shortTitle,
        item: pageUrl,
      },
    ],
  };

  return [webPageSchema, videoSchema, breadcrumbSchema];
}

function getRelatedVideos(video: VideoItem): readonly VideoItem[] {
  const sameCategory = videos.filter(
    (candidate) =>
      candidate.slug !== video.slug &&
      candidate.categories.some((category) =>
        video.categories.includes(category),
      ),
  );

  const remaining = videos.filter(
    (candidate) =>
      candidate.slug !== video.slug &&
      !sameCategory.some((matched) => matched.slug === candidate.slug),
  );

  return [...sameCategory, ...remaining].slice(0, 3);
}

export default function VideoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const video = slug ? getVideoBySlug(slug) : undefined;

  const relatedVideos = useMemo(
    () => (video ? getRelatedVideos(video) : []),
    [video],
  );

  const schemas = useMemo(
    () => (video ? buildSchemas(video) : []),
    [video],
  );

  if (!video) {
    return <NotFound />;
  }

  const canonical = `${SITE_URL}/videos/${video.slug}`;
  const pageTitle = `${video.title} | فيديو مشاريع PYBCCO`;
  const pageDescription = `${video.description} شاهد الفيديو وتعرّف على الخدمة المرتبطة من شركة بنيان الهرم للمقاولات في الرياض.`;
  const whatsappUrl = buildWhatsappUrl(video);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        robots="index,follow,max-image-preview:large,max-video-preview:-1"
        ogImage={absoluteUrl(video.cover)}
        ogImageAlt={video.title}
        ogType="video.other"
        jsonLd={schemas}
      />

      <main dir="rtl" className="overflow-hidden bg-[#07080b] text-white">
        <section className="relative border-b border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-[#d4af37]/15 blur-[130px]" />
            <div className="absolute -left-48 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-700/10 blur-[120px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 py-10 md:py-16">
            <nav
              aria-label="مسار التنقل"
              className="flex flex-wrap items-center gap-2 text-sm text-white/55"
            >
              <Link to="/" className="transition hover:text-[#d4af37]">
                الرئيسية
              </Link>
              <span>/</span>
              <Link
                to="/videos"
                className="transition hover:text-[#d4af37]"
              >
                مكتبة الفيديو
              </Link>
              <span>/</span>
              <span className="text-white/80">{video.shortTitle}</span>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_430px] lg:gap-16">
              <div>
                <Link
                  to="/videos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
                >
                  <ArrowRight className="h-4 w-4" />
                  العودة إلى مكتبة الفيديو
                </Link>

                <div className="mt-7 flex flex-wrap gap-2">
                  {video.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-bold text-[#f4d675]"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {category}
                    </span>
                  ))}
                </div>

                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.3] md:text-5xl">
                  {video.title}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
                  {video.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#d4af37]" />
                    {formatUploadDate(video.uploadDate)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#d4af37]" />
                    {formatDuration(video.duration)}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-[#d4af37]" />
                    فيديو مشروع
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-auto rounded-2xl bg-[#d4af37] px-6 py-4 font-extrabold text-black hover:bg-[#efd36f]"
                  >
                    <Link to={video.relatedPage}>
                      {video.relatedLabel}
                      <ArrowLeft className="mr-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-auto rounded-2xl border-white/20 bg-transparent px-6 py-4 font-bold text-white hover:bg-white/10 hover:text-white"
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="ml-2 h-5 w-5 text-[#d4af37]" />
                      استفسار عن مشروع مشابه
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[430px]">
                <YouTubeFacade
                  youtubeId={video.youtubeId}
                  title={video.title}
                  cover={video.cover}
                  priority
                  className="aspect-[9/16] w-full rounded-[32px] border border-white/10 shadow-[0_35px_100px_rgba(0,0,0,0.6)]"
                />

                <a
                  href={getYoutubeWatchUrl(video.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/40 hover:text-white"
                >
                  <Youtube className="h-5 w-5 text-[#d4af37]" />
                  مشاهدة الفيديو على يوتيوب
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm font-bold text-[#d4af37]">عن الفيديو</p>

              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                {video.shortTitle}
              </h2>

              <p className="mt-4 text-base leading-9 text-white/70">
                {video.description}
              </p>

              <div className="mt-8 border-t border-white/10 pt-7">
                <h3 className="text-lg font-black">مواضيع مرتبطة بالفيديو</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {video.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/60"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <aside className="rounded-[28px] border border-[#d4af37]/25 bg-[#d4af37]/10 p-6">
              <p className="text-sm font-bold text-[#f4d675]">
                خدمة مرتبطة بالفيديو
              </p>

              <h2 className="mt-3 text-2xl font-black">
                هل تخطط لمشروع مشابه؟
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                انتقل إلى صفحة الخدمة المرتبطة لمعرفة التفاصيل، أو أرسل بيانات
                مشروعك للحصول على مراجعة أولية للنطاق.
              </p>

              <div className="mt-6 grid gap-3">
                <Button
                  asChild
                  className="h-auto w-full rounded-2xl bg-[#d4af37] px-5 py-4 font-extrabold text-black hover:bg-[#efd36f]"
                >
                  <Link to={video.relatedPage}>
                    {video.relatedLabel}
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-auto w-full rounded-2xl border-white/20 bg-black/20 px-5 py-4 font-bold text-white hover:bg-black/40 hover:text-white"
                >
                  <Link to="/request-project">
                    طلب تنفيذ مشروع
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {relatedVideos.length > 0 ? (
          <section className="border-y border-white/10 bg-[#0b0c10]">
            <div className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#d4af37]">
                    فيديوهات أخرى
                  </p>
                  <h2 className="mt-2 text-3xl font-black md:text-4xl">
                    شاهد المزيد من مشاريعنا
                  </h2>
                </div>

                <Link
                  to="/videos"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/65 transition hover:text-[#d4af37]"
                >
                  عرض مكتبة الفيديو كاملة
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedVideos.map((relatedVideo) => (
                  <article
                    key={relatedVideo.slug}
                    className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#d4af37]/35"
                  >
                    <Link
                      to={`/videos/${relatedVideo.slug}`}
                      className="block"
                      aria-label={`مشاهدة ${relatedVideo.title}`}
                    >
                      <div className="relative aspect-[9/16] max-h-[480px] overflow-hidden bg-black">
                        <img
                          src={relatedVideo.cover}
                          alt={relatedVideo.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />

                        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/60 text-[#d4af37] backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black">
                            <PlayCircle className="h-8 w-8" />
                          </span>
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="flex flex-wrap gap-2">
                          {relatedVideo.categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full bg-[#d4af37]/10 px-3 py-1 text-xs font-bold text-[#f4d675]"
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        <h3 className="mt-4 text-xl font-black leading-8">
                          {relatedVideo.shortTitle}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/60">
                          {relatedVideo.description}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d4af37]">
                          مشاهدة الفيديو والتفاصيل
                          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
