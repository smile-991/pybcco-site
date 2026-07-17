import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import YouTubeFacade from "@/components/video/YouTubeFacade";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Calculator,
  CalendarClock,
  CheckCircle2,
  Clock3,
  HardHat,
  MapPin,
  MessageCircle,
  PlayCircle,
  Youtube,
} from "lucide-react";

const SITE_URL = "https://pybcco.com";
const CANONICAL = `${SITE_URL}/videos/villa-construction-180-days-riyadh`;
const VIDEO_ID = "ICBcSHZUaoE";
const COVER = `${SITE_URL}/video-covers/villa-construction-180-days-riyadh.webp`;
const ARTICLE_PATH =
  "/engineering-insights/construction-and-finishing-stages/how-long-does-it-take-to-build-villa-riyadh";
const CALCULATOR_PATH = "/villa-construction-cost-calculator-riyadh";

const TITLE =
  "مراحل بناء فيلا خلال 180 يومًا في الرياض | فيديو PYBCCO";
const DESCRIPTION =
  "شاهد فيديو تايم لابس يوضح مراحل بناء فيلا في الرياض خلال 180 يومًا تقريبًا، من القواعد والهيكل والبلوك حتى الواجهات والتشطيب والتسليم.";

const WHATSAPP_URL =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%B4%D8%A7%D9%87%D8%AF%D8%AA%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D9%85%D8%B1%D8%A7%D8%AD%D9%84%20%D8%A8%D9%86%D8%A7%D8%A1%20%D9%81%D9%8A%D9%84%D8%A7%20%D8%AE%D9%84%D8%A7%D9%84%20180%20%D9%8A%D9%88%D9%85%D9%8B%D8%A7%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A.";

const STAGES = [
  {
    day: "اليوم 0–30",
    title: "القواعد والأعمدة",
    description: "الحفر والقواعد والعزل وتمديدات ما تحت البلاطة ثم أعمدة الدور الأرضي.",
  },
  {
    day: "اليوم 31–60",
    title: "الهيكل الإنشائي",
    description: "تنفيذ الأعمدة والجسور والأسقف حتى اكتمال الهيكل الخرساني.",
  },
  {
    day: "اليوم 61–90",
    title: "البلوك والعظم",
    description: "الجدران الداخلية والخارجية وفتحات الأبواب والنوافذ.",
  },
  {
    day: "اليوم 91–120",
    title: "التمديدات والواجهة",
    description: "الكهرباء والسباكة واللياسة والعزل وتركيب الحجر والنوافذ.",
  },
  {
    day: "اليوم 121–150",
    title: "التشطيبات",
    description: "الأرضيات والجبس والدهانات والأبواب والتجهيزات الداخلية.",
  },
  {
    day: "اليوم 151–180",
    title: "الفحص والتسليم",
    description: "استكمال الإنارة والرصف والتنظيف والاختبارات والملاحظات النهائية.",
  },
] as const;

const FAQS = [
  {
    question: "هل كل فيلا يمكن تنفيذها خلال 180 يومًا؟",
    answer:
      "لا. الرقم نموذج تقريبي لمشروع منظم من دورين وملحق، وقد تزيد أو تقل المدة حسب المساحة والبدروم والتصميم ومستوى التشطيب والتوريد والاعتمادات.",
  },
  {
    question: "هل الفيديو يوثق مشروعًا واحدًا يومًا بيوم؟",
    answer:
      "الفيديو ملخص بصري توضيحي للمراحل الرئيسية، أما التفاصيل الزمنية والعوامل المؤثرة فتوجد في دليل مدة بناء الفيلا المرتبط بالصفحة.",
  },
  {
    question: "ما أكثر مرحلة قد تسبب تأخيرًا؟",
    answer:
      "غالبًا التشطيبات بسبب كثرة البنود والاعتمادات وتداخل فرق العمل، إضافة إلى تأخر القرارات أو المواد الخاصة.",
  },
];

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${CANONICAL}#webpage`,
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "ar-SA",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: COVER,
    },
    mainEntity: {
      "@id": `${CANONICAL}#video`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${CANONICAL}#video`,
    name: "مراحل بناء فيلا خلال 180 يومًا من القواعد حتى التسليم",
    description: DESCRIPTION,
    thumbnailUrl: [COVER],
    uploadDate: "2026-07-18T02:00:00+03:00",
    duration: "PT16S",
    embedUrl: `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`,
    contentUrl: `https://youtube.com/shorts/${VIDEO_ID}`,
    url: CANONICAL,
    inLanguage: "ar-SA",
    isFamilyFriendly: true,
    keywords:
      "مراحل بناء فيلا, مدة بناء فيلا, بناء فلل بالرياض, جدول تنفيذ فيلا, مقاول بناء الرياض",
    publisher: {
      "@type": "Organization",
      name: "شركة بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: `https://youtube.com/shorts/${VIDEO_ID}`,
    },
  },
  {
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
        item: `${SITE_URL}/videos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "مراحل بناء فيلا خلال 180 يومًا",
        item: CANONICAL,
      },
    ],
  },
  {
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
  },
];

export default function VillaConstruction180DaysVideoPage() {
  return (
    <>
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="video.other"
        ogImage={COVER}
        ogImageAlt="مراحل بناء فيلا في الرياض خلال 180 يومًا من القواعد حتى التسليم"
        jsonLd={SCHEMAS}
      />

      <main dir="rtl" className="overflow-hidden bg-[#07080b] text-white">
        <section className="relative border-b border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-44 top-0 h-[520px] w-[520px] rounded-full bg-[#d4af37]/15 blur-[130px]" />
            <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-700/10 blur-[120px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 py-10 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/55"
            >
              <Link to="/" className="transition hover:text-[#f4d675]">
                الرئيسية
              </Link>
              <span>/</span>
              <Link to="/videos" className="transition hover:text-[#f4d675]">
                مكتبة الفيديو
              </Link>
              <span>/</span>
              <span className="text-white">بناء فيلا خلال 180 يومًا</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_410px]">
              <div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f4d675]">
                    <PlayCircle className="h-4 w-4" />
                    فيديو تايم لابس
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/75">
                    <Clock3 className="h-4 w-4" />
                    16 ثانية
                  </span>
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.25] md:text-6xl">
                  مراحل بناء فيلا خلال 180 يومًا من القواعد حتى التسليم
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
                  رحلة بصرية سريعة توضح كيف يتطور مشروع الفيلا عبر ست مراحل
                  مترابطة: من القواعد والهيكل الإنشائي إلى البلوك والواجهة
                  والتشطيبات والفحص النهائي.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-2xl bg-[#d4af37] px-6 font-extrabold text-black hover:bg-[#efd36f]"
                  >
                    <Link to={ARTICLE_PATH}>
                      اقرأ الجدول الزمني الكامل
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <Link to={CALCULATOR_PATH}>
                      <Calculator className="ml-2 h-5 w-5" />
                      احسب تكلفة البناء
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      استفسر عن مشروعك
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[390px]">
                <YouTubeFacade
                  youtubeId={VIDEO_ID}
                  title="مراحل بناء فيلا خلال 180 يومًا من القواعد حتى التسليم"
                  cover="/video-covers/villa-construction-180-days-riyadh.webp"
                  priority
                  className="aspect-[9/16] w-full rounded-[30px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
                />

                <a
                  href={`https://youtube.com/shorts/${VIDEO_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  <Youtube className="h-4 w-4 text-[#d4af37]" />
                  مشاهدة على يوتيوب
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold text-[#d4af37]">المراحل الست</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              ماذا يعرض الفيديو خلال 180 يومًا؟
            </h2>
            <p className="mt-4 text-base leading-8 text-white/65">
              تقسيم بصري مبسط لمشروع منظم من دورين وملحق، يبدأ بعد جاهزية
              المخططات والتصاريح واستقرار القرارات الأساسية.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STAGES.map((stage, index) => (
              <article
                key={stage.title}
                className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d4af37]/35"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d4af37] text-lg font-black text-black">
                    {index + 1}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/55">
                    {stage.day}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">{stage.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0c10]">
          <div className="container mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <div className="inline-flex rounded-2xl bg-[#d4af37]/10 p-3 text-[#d4af37]">
                <CalendarClock className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl font-black md:text-4xl">
                الـ180 يومًا نموذج زمني وليست وعدًا ثابتًا
              </h2>
              <p className="mt-4 text-base leading-8 text-white/65">
                مدة التنفيذ الحقيقية تختلف حسب مساحة الفيلا، وجود بدروم أو
                تفاصيل إنشائية خاصة، مستوى التشطيب، سرعة اعتماد المواد، انتظام
                التوريد، وتغييرات المالك أثناء العمل.
              </p>
              <p className="mt-4 text-base leading-8 text-white/65">
                لذلك ربطنا هذا الفيديو بدليل كامل يشرح أين يضيع الوقت عادة، وما
                الذي يسرّع المشروع فعليًا من دون التضحية بالجودة.
              </p>

              <Link
                to={ARTICLE_PATH}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] transition hover:text-[#efd36f]"
              >
                اقرأ دليل مدة بناء الفيلا
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "جاهزية المخططات والتصاريح",
                "اعتماد المواد قبل موعدها",
                "تنسيق فرق العظم والتشطيب",
                "متابعة المراحل والاستلامات",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d4af37]" />
                  <span className="text-sm font-bold leading-7 text-white/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold text-[#d4af37]">خطوتك التالية</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              حوّل المشاهدة إلى تصور أولي لمشروعك
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                to: ARTICLE_PATH,
                title: "دليل مدة التنفيذ",
                description: "شرح تفصيلي للعوامل والمراحل وأسباب التأخير.",
                icon: CalendarClock,
              },
              {
                to: CALCULATOR_PATH,
                title: "حاسبة تكلفة البناء",
                description: "تقدير أولي للمسطحات والعظم والتشطيب والإضافات.",
                icon: Calculator,
              },
              {
                to: "/projects-in-riyadh",
                title: "خريطة المشاريع",
                description: "استعرض نماذج تنفيذ داخل أحياء الرياض.",
                icon: MapPin,
              },
              {
                to: "/villa-bone-construction-riyadh",
                title: "خدمة بناء العظم",
                description: "تعرف على نطاق تنفيذ الهيكل الإنشائي للفلل.",
                icon: HardHat,
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
        </section>

        <section className="border-t border-white/10 bg-[#0b0c10]">
          <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
            <div className="text-center">
              <p className="text-sm font-bold text-[#d4af37]">أسئلة شائعة</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                أسئلة عن مدة بناء الفيلا والفيديو
              </h2>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
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
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-14 text-center md:py-20">
          <Building2 className="mx-auto h-10 w-10 text-[#d4af37]" />
          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            تخطط لبناء فيلا في الرياض؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/65">
            أرسل مساحة الأرض ونطاق المشروع ومستوى التشطيب المطلوب للحصول على
            مراجعة أولية تساعدك على فهم الخطوة التالية.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="rounded-2xl bg-[#d4af37] px-7 font-extrabold text-black hover:bg-[#efd36f]"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="ml-2 h-5 w-5" />
                تواصل عبر واتساب
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to="/videos">
                جميع الفيديوهات
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
