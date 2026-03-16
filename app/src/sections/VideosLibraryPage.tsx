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
  "شاهد مكتبة فيديوهات بنيان الهرم للمقاولات: أعمال تشطيب، ترميم، تنفيذ، ومقاطع قصيرة من المشاريع في الرياض، مع روابط مباشرة للخدمات والحاسبات والمقالات ذات الصلة.";

/**
 * مهم:
 * استبدل الروابط التالية بروابط الفيديوهات الفعلية من يوتيوب.
 * embedUrl = رابط التضمين
 * watchUrl = رابط المشاهدة
 * thumbnailUrl = صورة الغلاف
 */
const VIDEOS: VideoItem[] = [
  {
    id: "video-1",
    title: "تشطيب فاخر في الرياض | تنفيذ احترافي وتفاصيل نهائية عالية الجودة",
    description:
      "فيديو قصير يعرض جانبًا من أعمال التشطيب الفاخر في الرياض مع إبراز جودة التنفيذ واللمسات النهائية داخل المشروع.",
    embedUrl: "https://www.youtube.com/embed/REPLACE_VIDEO_ID_1",
    watchUrl: "https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_1",
    thumbnailUrl: "https://img.youtube.com/vi/REPLACE_VIDEO_ID_1/hqdefault.jpg",
    uploadDate: "2026-03-13",
    duration: "PT29S",
    keywords: ["تشطيب فلل", "مقاولات الرياض", "تشطيب فاخر", "مشاريع تشطيب"],
    category: "تشطيب",
  },
  {
    id: "video-2",
    title: "مراحل تنفيذ مشروع تشطيب بالرياض | لقطة سريعة من أرض الواقع",
    description:
      "مقطع يوثق جزءًا من مراحل التنفيذ في مشروع تشطيب داخل الرياض، مناسب لبناء الثقة وإظهار مستوى المتابعة الميدانية.",
    embedUrl: "https://www.youtube.com/embed/REPLACE_VIDEO_ID_2",
    watchUrl: "https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_2",
    thumbnailUrl: "https://img.youtube.com/vi/REPLACE_VIDEO_ID_2/hqdefault.jpg",
    uploadDate: "2026-03-14",
    duration: "PT25S",
    keywords: ["تشطيب بالرياض", "تنفيذ مشاريع", "شركة مقاولات", "مراحل التشطيب"],
    category: "ترميم",
  },
  {
    id: "video-3",
    title: "أعمال بناء وتشطيب في الرياض | محتوى مرئي من مشاريع PYBCCO",
    description:
      "فيديو قصير يعرض جانبًا من أعمال البناء أو التشطيب الميدانية، ويدعم حضور الشركة بصريًا أمام العملاء ومحركات البحث.",
    embedUrl: "https://www.youtube.com/embed/REPLACE_VIDEO_ID_3",
    watchUrl: "https://www.youtube.com/watch?v=REPLACE_VIDEO_ID_3",
    thumbnailUrl: "https://img.youtube.com/vi/REPLACE_VIDEO_ID_3/hqdefault.jpg",
    uploadDate: "2026-03-15",
    duration: "PT30S",
    keywords: ["بناء فيلا", "تشطيب منزل", "مقاول بالرياض", "أعمال ميدانية"],
    category: "عظم",
  },
];

const FAQS = [
  {
    q: "هل هذه الفيديوهات لمشاريع حقيقية؟",
    a: "نعم، الصفحة مخصصة لعرض فيديوهات مرتبطة بأعمال ومشاريع ونماذج تنفيذ ومحتوى بصري مرتبط بخدمات الشركة في الرياض.",
  },
  {
    q: "هل أستطيع طلب عرض سعر بعد مشاهدة الفيديوهات؟",
    a: "نعم، يمكنك الانتقال مباشرة إلى حاسبة التكلفة أو طلب تنفيذ مشروع أو التواصل معنا عبر واتساب بعد مشاهدة المقاطع.",
  },
  {
    q: "هل الصفحة مفيدة لجوجل والسيو؟",
    a: "نعم، تم تصميم الصفحة بحيث تكون صفحة مكتبة فيديو فعلية تحتوي على محتوى نصي، ربط داخلي، وسكيما منظمة لشرح الفيديوهات ومكتبة المحتوى المرتبط بها.",
  },
  {
    q: "هل الفيديوهات مرتبطة بالخدمات داخل الموقع؟",
    a: "نعم، الصفحة تربط بين الفيديوهات وصفحات الخدمات، الحاسبات، والمقالات الهندسية لتقوية المسار الداخلي وتحسين تجربة الزائر.",
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
    inLanguage: "ar",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.webp`,
      },
    },
    keywords: video.keywords.join(", "),
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
                صفحة فيديو احترافية تجمع المقاطع المرئية الخاصة بالمشاريع، التنفيذ، والتشطيب،
                وتحوّل الفيديو من مجرد رابط خارجي إلى أصل محتوى فعلي داخل الموقع يخدم السيو،
                الثقة، والربط الداخلي.
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
                  <div className="text-2xl font-extrabold text-[#D4AF37]">{categoryCounts["عظم"]}</div>
                  <div className="mt-1 text-sm text-white/70">مقاطع العظم</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-extrabold text-[#D4AF37]">{categoryCounts["ترميم"]}</div>
                  <div className="mt-1 text-sm text-white/70">مقاطع الترميم</div>
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
                <h2 className="text-lg font-bold">أصل محتوى فعلي داخل الموقع</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  بدل أن تبقى الفيديوهات موزعة أو مخفية داخل المقالات فقط، أصبحت في مكتبة مستقلة
                  قابلة للفهرسة والربط الداخلي.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">تهيئة قوية للسيو</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  الصفحة تتضمن CollectionPage و ItemList و VideoObject و FAQ و Breadcrumbs،
                  مع محتوى نصي وروابط داخلية تخدم Google بوضوح.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 inline-flex rounded-xl bg-[#D4AF37]/10 p-2 text-[#D4AF37]">
                  <Building2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold">بناء ثقة أسرع</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  الصفحة مناسبة لعرض أعمال الشركة بصريًا قبل طلب العرض السعري أو التواصل، وتختصر
                  كثيرًا من التردد عند العميل السكني.
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
              href="https://www.youtube.com/"
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
                لأن الصفحة لا تعتمد فقط على التضمين المرئي، بل تقدم سياقًا واضحًا حول طبيعة
                الأعمال، أنواع المشاريع، والروابط ذات الصلة. هذا يجعلها صفحة محتوى حقيقية وليست
                مجرد تجميع فيديوهات بدون معنى. كما أنها تربط بين الحضور المرئي للشركة وصفحات
                الخدمة والحاسبات والمقالات، فتقوي الرحلة الكاملة من الاكتشاف إلى التحويل.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
              {[
                "تقوية السيو الداخلي عبر ربط الفيديوهات بصفحات الخدمات والمقالات والحاسبات.",
                "زيادة الوقت الذي يقضيه الزائر داخل الموقع عند مشاهدة المقاطع من نفس الصفحة.",
                "تحويل الفيديو من أصل خارجي فقط إلى محتوى منظم داخل بنية الموقع.",
                "دعم إشارات الكيان الرقمي عبر الربط مع يوتيوب وبقية حضور الشركة الخارجي.",
                "إتاحة مساحة مستقبلية لتوسيع المحتوى المرئي: Shorts، شروحات، ومقاطع مشاريع.",
                "تجهيز الصفحة لتكون وجهة مرجعية لأي فيديو جديد بدل بعثرته في صفحات متفرقة.",
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
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">تابع من الفيديو إلى القرار</h2>
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
