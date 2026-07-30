import { useMemo, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpLeft,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  CircleCheckBig,
  ClipboardCheck,
  Clock3,
  FileText,
  Hammer,
  HardHat,
  Layers3,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Paintbrush2,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const SITE = "https://pybcco.com";

const FAQS = [
  {
    q: "كيف أختار شركة مقاولات بالرياض لمشروع سكني أو تجاري؟",
    a: "ابدأ بالتأكد من وجود أعمال سابقة واضحة، عرض سعر مفصل، إشراف هندسي، خطة تنفيذ، ووسيلة متابعة للمشروع. في بنيان الهرم نوضح نطاق العمل والمدة والبنود قبل بدء التنفيذ.",
  },
  {
    q: "هل تقدمون معاينة مجانية داخل الرياض؟",
    a: "نعم، نرتّب زيارة ومعاينة ميدانية حسب موقع المشروع ونطاق العمل، ثم نقدّم عرض سعر واضح ومفصّل حسب الحالة الفعلية للمشروع.",
  },
  {
    q: "هل عندكم إشراف هندسي ومراقبين؟",
    a: "نعم، لدينا إشراف هندسي ومراقبة جودة لمتابعة المواد والتنفيذ والالتزام بالمخططات ومراحل الاستلام.",
  },
  {
    q: "هل تقدمون تسليم مفتاح؟",
    a: "نعم، ننفذ مشاريع تسليم مفتاح من إدارة المشروع إلى التشطيب النهائي، ويمكن الاتفاق على توريد المواد أو تنفيذ الأعمال فقط حسب رغبة العميل.",
  },
  {
    q: "كم مدة تنفيذ مشاريع المقاولات والتشطيب؟",
    a: "تختلف المدة حسب حجم المشروع ونوع الأعمال وحالة الموقع. بعد المعاينة نضع جدولًا زمنيًا واضحًا بمراحل التنفيذ والاستلام.",
  },
  {
    q: "ما الخدمات الأساسية التي تقدمها شركة بنيان الهرم في الرياض؟",
    a: "نقدم تشطيب فلل وشقق، ترميم وتجديد، بناء عظم، صيانة، أعمال كهرباء وسباكة، وإدارة مشاريع مع إشراف هندسي وجودة تنفيذ.",
  },
  {
    q: "هل الأسعار تشمل المواد والعمالة؟",
    a: "حسب نوع العرض، سواء كان مقطوعية شاملة أو بنودًا تفصيلية. نوضح ذلك صراحة داخل عرض السعر بعد المعاينة.",
  },
  {
    q: "هل تقدمون عرض سعر تفصيلي قبل التنفيذ؟",
    a: "نعم، بعد المعاينة وتحديد نطاق العمل نقدّم عرض سعر واضح يشرح البنود وطبيعة التنفيذ وما إذا كان شاملًا أو بنظام بنود.",
  },
  {
    q: "هل تعملون في جميع أحياء الرياض؟",
    a: "نخدم مشاريع داخل مدينة الرياض في عدة أحياء ومناطق، ويتم ترتيب المعاينة حسب موقع المشروع ونوع الأعمال المطلوبة.",
  },
];

type ServiceKey = "structure" | "finishing" | "renovation" | "commercial";

const SERVICES: Array<{
  key: ServiceKey;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  Icon: typeof Hammer;
  bullets: string[];
}> = [
  {
    key: "structure",
    number: "01",
    eyebrow: "من الأرض إلى الهيكل",
    title: "بناء عظم مضبوط من أول صبة",
    description:
      "تنفيذ الهيكل الإنشائي وفق المخططات والمواصفات، مع متابعة هندسية للمراحل الأساسية وجودة واضحة قبل الانتقال للتشطيب.",
    image: "/images/VillaBoneConstructionRiyadh.webp",
    href: "/villa-bone-construction-riyadh",
    cta: "استعرض خدمة بناء العظم",
    Icon: HardHat,
    bullets: ["متابعة هندسية", "تنفيذ حسب المخططات", "ضبط مراحل الاستلام"],
  },
  {
    key: "finishing",
    number: "02",
    eyebrow: "من العظم إلى الجاهزية",
    title: "تشطيب فلل وشقق بتسليم منظم",
    description:
      "أعمال تأسيس وتشطيبات نهائية بمواد مختارة وإدارة دقيقة للتنفيذ، من الكهرباء والسباكة حتى الأرضيات والدهانات والأبواب.",
    image: "/images/VillaFinishingRiyadh.webp",
    href: "/villa-finishing-riyadh",
    cta: "استعرض خدمة التشطيب",
    Icon: Paintbrush2,
    bullets: ["كهرباء وسباكة", "جبس ودهانات", "أرضيات وأبواب"],
  },
  {
    key: "renovation",
    number: "03",
    eyebrow: "تجديد يعيد قيمة المكان",
    title: "ترميم ومعالجة قبل التجميل",
    description:
      "نبدأ بفهم الحالة الفعلية، ثم نعالج التشققات والرطوبة والتأسيسات قبل إعادة التصميم والتشطيب حتى لا تكون النتيجة مجرد طبقة شكلية.",
    image: "/images/VillaRenovationRiyadh.webp",
    href: "/villa-renovation-riyadh",
    cta: "استعرض خدمة الترميم",
    Icon: Sparkles,
    bullets: ["فحص الحالة", "معالجة العيوب", "إعادة تأهيل وتشطيب"],
  },
  {
    key: "commercial",
    number: "04",
    eyebrow: "تنفيذ للأعمال التجارية",
    title: "مكاتب ومعارض ومساحات أعمال",
    description:
      "تنفيذ وتشطيب مشاريع تجارية بجدولة واضحة وتنسيق بين البنود، مع فهم حساسية الوقت والتشغيل والهوية البصرية للمكان.",
    image:
      "/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp",
    href: "/projects-in-riyadh",
    cta: "شاهد المشاريع التجارية",
    Icon: Building2,
    bullets: ["إدارة متكاملة", "تنسيق البنود", "تسليم جاهز للتشغيل"],
  },
];

const WORK_STEPS = [
  {
    number: "01",
    title: "نسمع المشروع",
    label: "تواصل ومعاينة",
    text: "نستقبل تفاصيل المشروع ونرتب زيارة ميدانية لفهم الموقع والحالة الفعلية ونطاق الأعمال المطلوبة.",
    image: "/images/timeline/villa-stage-01.webp",
    Icon: MessageCircle,
  },
  {
    number: "02",
    title: "نحوّل الفكرة إلى نطاق",
    label: "تحديد البنود",
    text: "نحدد مستوى التنفيذ والبنود وما هو شامل أو غير شامل، حتى تصبح المقارنة والقرارات واضحة قبل البدء.",
    image: "/images/timeline/villa-stage-02.webp",
    Icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "نضع رقمًا مفهومًا",
    label: "عرض سعر واضح",
    text: "نقدم عرض سعر منظم يشرح البنود وطريقة التنفيذ والمدة المتوقعة وخطوات الدفعات دون غموض.",
    image: "/images/timeline/villa-stage-03.webp",
    Icon: WalletCards,
  },
  {
    number: "04",
    title: "ننفذ ونوثق",
    label: "تنفيذ ومتابعة",
    text: "تبدأ الأعمال مع إشراف هندسي ومتابعة جودة، وتحديثات تساعد العميل على فهم ما تم وما بقي.",
    image: "/images/timeline/villa-stage-04.webp",
    Icon: Hammer,
  },
  {
    number: "05",
    title: "نغلق المشروع باحتراف",
    label: "فحص وتسليم",
    text: "نفحص البنود ونرتب الملاحظات والاستلام النهائي ليكون التسليم واضحًا وقابلًا للتوثيق.",
    image: "/images/timeline/villa-stage-06.webp",
    Icon: CircleCheckBig,
  },
];

const IMPORTANT_PAGES = [
  {
    to: "/villa-finishing-riyadh",
    title: "تشطيب فلل بالرياض",
    desc: "من التأسيس حتى التفاصيل النهائية وتسليم المفتاح.",
    image: "/images/VillaFinishingRiyadh.webp",
    tag: "تشطيب",
  },
  {
    to: "/villa-renovation-riyadh",
    title: "ترميم فلل بالرياض",
    desc: "معالجة وتجديد شامل حسب حالة المبنى ونطاق العمل.",
    image: "/images/VillaRenovationRiyadh.webp",
    tag: "ترميم",
  },
  {
    to: "/villa-bone-construction-riyadh",
    title: "بناء عظم بالرياض",
    desc: "تنفيذ الهيكل وفق المخططات مع متابعة هندسية.",
    image: "/images/VillaBoneConstructionRiyadh.webp",
    tag: "عظم",
  },
  {
    to: "/apartment-finishing-riyadh",
    title: "تشطيب شقق بالرياض",
    desc: "حلول تنفيذ وتشطيب للشقق السكنية بتوزيع منظم.",
    image: "/images/ApartmentFinishingRiyadh.webp",
    tag: "شقق",
  },
  {
    to: "/villa-finishing-price-riyadh",
    title: "حاسبة أسعار التشطيب",
    desc: "تقدير مبدئي حسب المساحة ومستوى التشطيب.",
    image: "/images/VillaFinishingPriceRiyadh.webp",
    tag: "حاسبة",
  },
  {
    to: "/home-renovation-company-riyadh",
    title: "ترميم منازل بالرياض",
    desc: "إعادة تأهيل مبانٍ ومنازل بإدارة هندسية متكاملة.",
    image: "/images/home-renovation-hero.webp",
    tag: "تجديد",
  },
];

const MAP_PINS = [
  { label: "الملقا", top: "20%", right: "31%", delay: "0s" },
  { label: "الياسمين", top: "28%", right: "45%", delay: ".7s" },
  { label: "KAFD", top: "39%", right: "51%", delay: "1.4s" },
  { label: "الحمراء", top: "49%", right: "28%", delay: "2.1s" },
  { label: "المربع", top: "59%", right: "47%", delay: "2.8s" },
  { label: "طويق", top: "70%", right: "66%", delay: "3.5s" },
];

export default function ConstructionCompanyRiyadh() {
  const title =
    "شركة مقاولات بالرياض 2026 | عظم وتشطيب وترميم | PYBCCO";
  const description =
    "تبحث عن شركة مقاولات بالرياض؟ بنيان الهرم PYBCCO لتنفيذ العظم، تشطيب فلل وشقق، ترميم وتسليم مفتاح، مع إشراف هندسي، نظام متابعة، ومعاينة وعرض سعر واضح.";
  const canonical = `${SITE}/construction-company-riyadh`;
  const ogImage = `${SITE}/images/ConstructionCompanyRiyadh.webp`;

  const [activeService, setActiveService] = useState<ServiceKey>("finishing");
  const [activeStep, setActiveStep] = useState(0);
  const [comparePosition, setComparePosition] = useState(54);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const activeServiceData =
    SERVICES.find((service) => service.key === activeService) ?? SERVICES[0];
  const activeWorkStep = WORK_STEPS[activeStep];

  const jsonLd = useMemo(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "شركة مقاولات بالرياض",
      alternateName: [
        "مقاول بالرياض",
        "شركة تشطيب بالرياض",
        "شركة ترميم بالرياض",
        "مقاول بناء عظم بالرياض",
        "شركة تسليم مفتاح بالرياض",
      ],
      description:
        "شركة مقاولات بالرياض تقدم تنفيذ العظم، تشطيب فلل وشقق، ترميم وتجديد، وتسليم مفتاح مع إشراف هندسي ونظام متابعة للمشروع.",
      serviceType: "Construction / Finishing / Renovation",
      url: canonical,
      areaServed: {
        "@type": "City",
        name: "Riyadh",
        alternateName: "الرياض",
      },
      provider: {
        "@type": "Organization",
        name: "PYBCCO – بنيان الهرم للمقاولات",
        url: SITE,
        image: ogImage,
        telephone: "+966550604837",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "خدمات المقاولات في الرياض",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "تشطيب فلل وشقق بالرياض",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "بناء عظم بالرياض" },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ترميم وتجديد فلل ومنازل بالرياض",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "تسليم مفتاح وإدارة مشاريع",
            },
          },
        ],
      },
    };

    const webpageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: canonical,
      description,
      inLanguage: "ar-SA",
      primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
      about: { "@type": "Service", name: "شركة مقاولات بالرياض" },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "شركة مقاولات بالرياض",
          item: canonical,
        },
      ],
    };

    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "تشطيب وترميم فيلا سكنية في الرياض",
      description:
        "فيديو يوضح تنفيذ أعمال تشطيب وترميم فيلا سكنية في الرياض بواسطة شركة بنيان الهرم للمقاولات.",
      thumbnailUrl: [ogImage],
      uploadDate: "2026-03-14T12:00:00+03:00",
      contentUrl: "https://youtube.com/shorts/qaKZukA1534",
      embedUrl: "https://www.youtube.com/embed/qaKZukA1534",
      publisher: {
        "@type": "Organization",
        name: "PYBCCO – بنيان الهرم للمقاولات",
        logo: { "@type": "ImageObject", url: `${SITE}/logo.webp` },
      },
    };

    return [
      webpageSchema,
      serviceSchema,
      faqSchema,
      breadcrumbSchema,
      videoSchema,
    ];
  }, [canonical, description, title, ogImage]);

  const WA_NUMBER = "966550604837";
  const waPrefill = (text: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  const track = (eventName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") w.gtag("event", eventName);
  };

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#07090d] text-white selection:bg-gold selection:text-black"
      dir="rtl"
    >
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        ogImageAlt="شركة مقاولات بالرياض لتنفيذ العظم والتشطيب والترميم"
        ogType="website"
        twitterCard="summary_large_image"
        jsonLd={jsonLd}
      />

      <style>{`
        @keyframes ccFloat {
          0%, 100% { transform: translate3d(0,0,0) rotate(var(--cc-rotate, 0deg)); }
          50% { transform: translate3d(0,-12px,0) rotate(var(--cc-rotate, 0deg)); }
        }
        @keyframes ccPulse {
          0% { transform: scale(.72); opacity: .85; }
          70%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes ccSweep {
          0% { transform: translateX(110%); opacity: 0; }
          15% { opacity: .8; }
          75%, 100% { transform: translateX(-130%); opacity: 0; }
        }
        @keyframes ccReveal {
          0% { opacity: 0; transform: translateY(16px) scale(.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ccScrollCue {
          0%, 100% { transform: translateY(0); opacity: .45; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .cc-float { animation: ccFloat 7s ease-in-out infinite; }
        .cc-float-slow { animation: ccFloat 9s ease-in-out 1.2s infinite; }
        .cc-service-reveal { animation: ccReveal .5s ease-out both; }
        .cc-map-ring::after {
          content: "";
          position: absolute;
          inset: -8px;
          border: 1px solid rgba(255,191,0,.78);
          border-radius: 999px;
          animation: ccPulse 2.4s ease-out infinite;
          animation-delay: var(--cc-delay, 0s);
        }
        .cc-sweep::after {
          content: "";
          position: absolute;
          top: -20%;
          bottom: -20%;
          width: 28%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
          transform: skewX(-14deg);
          animation: ccSweep 5.5s ease-in-out infinite;
        }
        .cc-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .cc-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* HERO — the flagship first impression */}
      <section className="relative isolate min-h-[94vh] overflow-hidden pt-28 lg:pt-32">
        <img
          src="/images/ConstructionCompanyRiyadh.webp"
          alt="شركة مقاولات بالرياض لتنفيذ العظم والتشطيب والترميم"
          className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,7,12,.98)_0%,rgba(4,7,12,.90)_44%,rgba(4,7,12,.55)_72%,rgba(4,7,12,.78)_100%)]" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_20%,rgba(255,190,0,.18),transparent_30%),radial-gradient(circle_at_12%_82%,rgba(55,95,180,.20),transparent_34%)]" />
        <div className="cc-grid-bg absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="cc-noise pointer-events-none absolute inset-0 -z-10 opacity-[.07]" />

        <div className="container relative mx-auto grid min-h-[calc(94vh-7rem)] items-center gap-14 px-4 pb-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="relative z-20 max-w-3xl text-right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-2 text-sm font-bold text-gold shadow-[0_0_40px_rgba(255,190,0,.12)] backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
              تنفيذ في الرياض · عظم · تشطيب · ترميم · تسليم مفتاح
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.13] tracking-tight sm:text-5xl lg:text-[4.35rem]">
              <span className="text-white">شركة مقاولات بالرياض</span>
              <br />
              <span className="bg-gradient-to-l from-gold via-[#ffd966] to-[#ff9f0a] bg-clip-text text-transparent">
                تحوّل المخطط إلى مشروع واضح.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/[.72] sm:text-lg lg:text-xl lg:leading-9">
              في <strong className="font-bold text-white">بنيان الهرم PYBCCO</strong>{" "}
              لا نبيعك وعدًا عامًا؛ نحدد نطاق العمل، نوضح السعر والمدة، ننفذ
              بإشراف هندسي، ونمنحك طريقة متابعة تحفظ وضوح المشروع من البداية
              حتى التسليم.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                className="group h-14 rounded-xl bg-gold px-7 text-base font-black text-black shadow-[0_16px_50px_rgba(255,190,0,.20)] transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
                onClick={() => {
                  track("whatsapp_click_construction_page");
                  window.location.href = waPrefill(
                    "السلام عليكم، أريد طلب معاينة لمشروع في الرياض.\nنوع العمل: تشطيب / ترميم / بناء عظم\nالمساحة التقريبية:\nالحي:\nموعد مناسب للتواصل:",
                  );
                }}
              >
                اطلب معاينة واتساب
                <MessageCircle className="mr-2 h-5 w-5 transition group-hover:rotate-6" />
              </Button>

              <Link
                to="/projects-in-riyadh"
                className="group inline-flex h-14 items-center justify-center rounded-xl border border-white/[.15] bg-white/[.07] px-7 text-base font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-gold/[.45] hover:bg-white/[.11]"
              >
                شاهد مشاريعنا داخل الرياض
                <ArrowLeft className="mr-2 h-5 w-5 transition group-hover:-translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  track("call_from_construction_page");
                  window.location.href = "tel:+966550604837";
                }}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white/75 transition hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                اتصال مباشر: 055 060 4837
              </button>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                { value: "90+", label: "مشروع منفذ" },
                { value: "12+", label: "سنة خبرة" },
                { value: "5.0", label: "تقييم Google" },
                { value: "رقمي", label: "نظام متابعة" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0b0e14]/90 px-4 py-4 text-center backdrop-blur-xl"
                >
                  <div className="text-xl font-black text-gold sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cinematic project collage */}
          <div className="relative hidden h-[590px] lg:block" aria-hidden="true">
            <div
              className="cc-float absolute right-[2%] top-[5%] h-[470px] w-[66%] overflow-hidden rounded-[2rem] border border-white/[.15] bg-white/5 shadow-[0_45px_100px_rgba(0,0,0,.55)]"
              style={{ "--cc-rotate": "2deg" } as CSSProperties}
            >
              <img
                src="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-05.webp"
                alt="مشروع تشطيب مكاتب تجارية في الرياض"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                  مشروع موثق · الرياض
                </span>
                <div className="mt-3 text-xl font-black">تشطيب مكاتب تجارية</div>
                <div className="mt-1 text-sm text-white/60">إدارة وتنفيذ وتسليم</div>
              </div>
            </div>

            <div
              className="cc-float-slow absolute bottom-[2%] left-[1%] h-[280px] w-[48%] overflow-hidden rounded-[1.6rem] border border-white/[.15] shadow-[0_35px_80px_rgba(0,0,0,.55)]"
              style={{ "--cc-rotate": "-4deg" } as CSSProperties}
            >
              <img
                src="/projects/concrete/concrete-14.webp"
                alt="مشروع بناء عظم فلل بالرياض"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <HardHat className="mb-2 h-6 w-6 text-gold" />
                <div className="font-black">بناء عظم</div>
                <div className="text-xs text-white/[.55]">من الأساسات حتى الهيكل</div>
              </div>
            </div>

            <div className="cc-float absolute left-[8%] top-[4%] rounded-2xl border border-gold/25 bg-[#0a0d13]/88 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-black">
                  <MonitorSmartphone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-white/[.45]">ميزة مختلفة</div>
                  <div className="font-black">متابعة رقمية للمشروع</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[12%] right-[6%] rounded-2xl border border-white/10 bg-white/[.08] px-5 py-4 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 text-sm font-bold">
                <ShieldCheck className="h-5 w-5 text-gold" />
                إشراف هندسي وجودة تنفيذ
              </div>
            </div>
          </div>
        </div>

        <a
          href="#services-experience"
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold text-white/40 transition hover:text-gold"
        >
          اكتشف طريقة عملنا
          <ChevronDown className="h-5 w-5 animate-[ccScrollCue_1.8s_ease-in-out_infinite]" />
        </a>
      </section>

      {/* SERVICES — interactive visual selector */}
      <section
        id="services-experience"
        className="relative border-y border-white/[.08] bg-[#0b0e14] py-20 sm:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,190,0,.08),transparent_28%)]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black tracking-[.22em] text-gold">
              نطاق متكامل · جهة واحدة
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              من أول قرار هندسي إلى آخر تفصيلة.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              اختر نوع المشروع لتشاهد كيف يتحول نطاق العمل إلى تجربة تنفيذ واضحة،
              بدل قائمة خدمات جامدة ومتكررة.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[.74fr_1.26fr]">
            <div className="space-y-3">
              {SERVICES.map((service) => {
                const isActive = activeService === service.key;
                const Icon = service.Icon;
                return (
                  <button
                    key={service.key}
                    type="button"
                    onClick={() => setActiveService(service.key)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition-all duration-300 sm:p-5 ${
                      isActive
                        ? "border-gold/[.55] bg-gold text-black shadow-[0_18px_60px_rgba(255,190,0,.14)]"
                        : "border-white/10 bg-white/[.035] text-white hover:border-white/25 hover:bg-white/[.065]"
                    }`}
                  >
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                        isActive ? "bg-black text-gold" : "bg-white/[.08] text-gold"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-xs font-black ${
                          isActive ? "text-black/[.55]" : "text-white/[.35]"
                        }`}
                      >
                        {service.number} · {service.eyebrow}
                      </div>
                      <div className="mt-1 text-base font-black sm:text-lg">
                        {service.title}
                      </div>
                    </div>
                    <ArrowUpLeft
                      className={`h-5 w-5 shrink-0 transition ${
                        isActive
                          ? "translate-x-0 text-black"
                          : "translate-x-2 text-white/30 group-hover:translate-x-0 group-hover:text-gold"
                      }`}
                    />
                  </button>
                );
              })}

              <div className="rounded-2xl border border-white/10 bg-gradient-to-bl from-white/[.07] to-transparent p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-black">لديك مساحة وتريد رقمًا أوليًا؟</div>
                    <div className="mt-1 text-sm text-white/50">
                      الحاسبة تعطيك تصورًا قبل المعاينة.
                    </div>
                  </div>
                </div>
                <Link
                  to="/villa-construction-cost-calculator-riyadh"
                  onClick={() => track("open_calculator_from_construction_hero")}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-gold"
                >
                  افتح حاسبة تكلفة البناء
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div
              key={activeServiceData.key}
              className="cc-service-reveal cc-sweep relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/[.12] bg-black shadow-[0_40px_100px_rgba(0,0,0,.35)]"
            >
              <img
                src={activeServiceData.image}
                alt={activeServiceData.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/[.45] to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-11">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/[.35] px-3 py-1.5 text-xs font-bold text-gold backdrop-blur-xl">
                  <activeServiceData.Icon className="h-4 w-4" />
                  {activeServiceData.eyebrow}
                </div>
                <h3 className="mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                  {activeServiceData.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  {activeServiceData.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeServiceData.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[.12] bg-white/[.08] px-3 py-2 text-xs font-bold text-white/75 backdrop-blur-xl"
                    >
                      <Check className="h-3.5 w-3.5 text-gold" />
                      {bullet}
                    </span>
                  ))}
                </div>
                <Link
                  to={activeServiceData.href}
                  className="mt-7 inline-flex items-center gap-2 font-black text-gold transition hover:gap-3 hover:text-white"
                >
                  {activeServiceData.cta}
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT — before/after + story */}
      <section className="relative overflow-hidden bg-gold text-black">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container relative mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-black text-gold">
              <Sparkles className="h-4 w-4" />
              مشروع حقيقي · حي المربع بالرياض
            </div>
            <h2 className="mt-6 text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl">
              الفرق لا يُشرح فقط.
              <br />
              <span className="text-black/[.55]">يُسحب أمامك.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-black/[.70]">
              مشروع إعادة تجهيز جلسات خارجية لمطعم؛ من موقع تحت التنفيذ إلى مساحة
              ذات هوية واضحة. حرّك المؤشر وشاهد التحول بصريًا.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "ترميم", label: "نوع العمل" },
                { value: "المربع", label: "الموقع" },
                { value: "تجاري", label: "الاستخدام" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/[.15] bg-black/[.06] p-4 text-center"
                >
                  <div className="text-lg font-black">{item.value}</div>
                  <div className="mt-1 text-xs font-bold text-black/[.50]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/case-study-restaurant-outdoor-riyadh"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-black px-6 py-3.5 font-black text-white transition hover:-translate-y-0.5"
              >
                شاهد دراسة المشروع
                <ArrowLeft className="mr-2 h-5 w-5 text-gold" />
              </Link>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex h-14 items-center justify-center rounded-xl border border-black/20 px-6 py-3.5 font-black transition hover:bg-black/[.08]"
              >
                <Play className="ml-2 h-5 w-5 fill-black" />
                شاهد فيديو تنفيذ آخر
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] max-h-[720px] overflow-hidden rounded-[2rem] border-4 border-black/10 bg-black shadow-[0_35px_90px_rgba(60,40,0,.28)] sm:aspect-[5/4]">
              <img
                src="/projects/restaurant-outdoor/03-outdoor-restaurant-renovation-before-riyadh.webp"
                alt="المشروع قبل أعمال الترميم والتشطيب"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <img
                  src="/projects/restaurant-outdoor/18-restaurant-outdoor-space-after-finishing-riyadh.webp"
                  alt="المشروع بعد أعمال الترميم والتشطيب"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
                قبل
              </div>
              <div className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-black text-black shadow-lg">
                بعد
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.3),0_0_24px_rgba(255,255,255,.75)]"
                style={{ left: `${comparePosition}%` }}
              >
                <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-black text-gold shadow-2xl">
                  <span className="text-lg font-black">↔</span>
                </div>
              </div>

              <input
                aria-label="مقارنة المشروع قبل وبعد"
                type="range"
                min="12"
                max="88"
                value={comparePosition}
                onChange={(event) => setComparePosition(Number(event.target.value))}
                className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
                dir="ltr"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-black/[.55]">
              <span>اسحب المؤشر</span>
              <span>قبل التنفيذ ← بعد التنفيذ</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS — interactive timeline */}
      <section className="relative bg-[#f3f0e9] py-20 text-[#101217] sm:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black tracking-[.2em] text-[#a86f00]">
                طريقة عمل قابلة للفهم
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                المشروع رحلة.
                <br />
                <span className="text-black/[.35]">وأنت تعرف أين وصلت.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-black/60 sm:text-lg">
                اختيار شركة مقاولات في الرياض لا يعتمد على السعر فقط. المشروع
                يحتاج إلى وضوح في نطاق العمل، جودة تنفيذ، إشراف هندسي، التزام
                بالمواعيد، وطريقة متابعة تحفظ حقوق العميل.
              </p>

              <div className="mt-9 space-y-2">
                {WORK_STEPS.map((step, index) => {
                  const isActive = activeStep === index;
                  const Icon = step.Icon;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-right transition ${
                        isActive
                          ? "border-black bg-black text-white shadow-xl"
                          : "border-black/10 bg-white/[.45] hover:bg-white"
                      }`}
                    >
                      <div
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                          isActive ? "bg-gold text-black" : "bg-black/5 text-black"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-xs font-black ${
                            isActive ? "text-gold" : "text-black/[.40]"
                          }`}
                        >
                          {step.number} · {step.label}
                        </div>
                        <div className="mt-1 font-black">{step.title}</div>
                      </div>
                      <ArrowLeft
                        className={`h-5 w-5 transition ${
                          isActive
                            ? "text-gold"
                            : "translate-x-2 text-black/[.20] group-hover:translate-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={activeStep}
              className="cc-service-reveal relative min-h-[600px] overflow-hidden rounded-[2rem] bg-black shadow-[0_35px_100px_rgba(0,0,0,.24)]"
            >
              <img
                src={activeWorkStep.image}
                alt={activeWorkStep.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[.35] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <div className="text-7xl font-black text-white/10 sm:text-8xl">
                  {activeWorkStep.number}
                </div>
                <h3 className="-mt-5 text-3xl font-black text-gold sm:text-4xl">
                  {activeWorkStep.label}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                  {activeWorkStep.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL PORTAL — product-like visual */}
      <section className="relative overflow-hidden border-y border-white/[.08] bg-[#090b10] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,190,0,.11),transparent_32%),radial-gradient(circle_at_12%_78%,rgba(58,96,183,.16),transparent_28%)]" />
        <div className="cc-grid-bg absolute inset-0 opacity-25" />
        <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[.08] px-4 py-2 text-xs font-black text-gold">
              <MonitorSmartphone className="h-4 w-4" />
              بوابة عميل ونظام متابعة
            </div>
            <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
              مشروعك ليس
              <br />
              <span className="text-gold">صندوقًا أسود.</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-white/[.62] sm:text-lg">
              ولتعزيز الشفافية، نعتمد نظام متابعة رقميًا يمكّن العميل من متابعة
              نسبة الإنجاز، مراجعة الدفعات، تحميل الوثائق، والاطلاع على التحديثات
              بالصور ضمن حساب خاص.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: TrendingUp, text: "نسبة الإنجاز والمراحل" },
                { icon: FileText, text: "الوثائق والتحديثات" },
                { icon: WalletCards, text: "الدفعات المالية" },
                { icon: Users, text: "تواصل موثق مع العميل" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] p-3.5 text-sm font-bold text-white/[.72]"
                >
                  <item.icon className="h-4 w-4 text-gold" />
                  {item.text}
                </div>
              ))}
            </div>
            <Link
              to="/project-tracking-system-riyadh"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-black text-black transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
            >
              اكتشف نظام متابعة المشاريع
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* CSS dashboard mockup */}
          <div className="relative min-h-[560px]">
            <div className="cc-float absolute inset-x-0 top-4 overflow-hidden rounded-[1.8rem] border border-white/[.12] bg-[#11151e] shadow-[0_45px_120px_rgba(0,0,0,.55)]">
              <div className="flex h-12 items-center justify-between border-b border-white/[.08] bg-[#151a24] px-5">
                <div className="flex gap-1.5" dir="ltr">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="text-xs font-bold text-white/40">بوابة العميل · PYBCCO</div>
              </div>

              <div className="grid gap-4 p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-5 rounded-2xl border border-white/[.08] bg-white/[.035] p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-xs font-bold text-gold">مشروع فيلا سكنية</div>
                    <div className="mt-1 text-xl font-black">التشطيب الداخلي</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/[.45]">
                      <MapPin className="h-3.5 w-3.5" /> حي الملقا، الرياض
                    </div>
                  </div>
                  <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[conic-gradient(#ffbf00_0_72%,rgba(255,255,255,.08)_72%_100%)]">
                    <div className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[#11151e]">
                      <div className="text-center">
                        <div className="text-xl font-black text-gold">72%</div>
                        <div className="text-[10px] text-white/40">إنجاز</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-black">مراحل المشروع</div>
                      <Layers3 className="h-5 w-5 text-gold" />
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        ["أعمال التأسيس", "100%"],
                        ["الجبس والأسقف", "88%"],
                        ["الأرضيات", "64%"],
                        ["الدهانات", "35%"],
                      ].map(([label, value], index) => (
                        <div key={label}>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-bold text-white/[.65]">{label}</span>
                            <span className="text-white/[.35]">{value}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[.08]">
                            <div
                              className="h-full rounded-full bg-gold"
                              style={{ width: [100, 88, 64, 35][index] + "%" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-black">آخر التحديثات</div>
                      <Clock3 className="h-5 w-5 text-gold" />
                    </div>
                    <div className="mt-5 space-y-3">
                      {[
                        "استلام تمديدات الكهرباء",
                        "رفع صور تركيب الجبس",
                        "تحديث الدفعة المرحلية",
                      ].map((update, index) => (
                        <div
                          key={update}
                          className="flex items-start gap-3 rounded-xl bg-black/25 p-3"
                        >
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                          <div>
                            <div className="text-xs font-bold text-white/70">{update}</div>
                            <div className="mt-1 text-[10px] text-white/30">
                              {index === 0 ? "اليوم" : `${index + 1} أيام`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-float-slow absolute bottom-0 left-1 w-[47%] min-w-[190px] overflow-hidden rounded-[1.7rem] border border-white/[.14] bg-[#171c26] p-4 shadow-[0_30px_80px_rgba(0,0,0,.65)]">
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/[.15]" />
              <div className="rounded-2xl bg-black/25 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-white/[.35]">التحديث الحالي</div>
                    <div className="mt-1 text-sm font-black">أعمال الأرضيات</div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-black">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 h-28 overflow-hidden rounded-xl">
                  <img
                    src="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-07.webp"
                    alt="تحديث مصور من مشروع تشطيب"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="h-2 flex-1 rounded-full bg-gold" />
                  <span className="h-2 flex-1 rounded-full bg-gold" />
                  <span className="h-2 flex-1 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP PREVIEW + TRUST */}
      <section className="relative bg-white py-20 text-[#111318] sm:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.18fr_.82fr]">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-black/[.08] bg-[#e9e6df] shadow-sm">
              <img
                src="/images/riyadhmap.webp"
                alt="خريطة مشاريع شركة بنيان الهرم داخل الرياض"
                className="absolute inset-0 h-full w-full object-cover opacity-75 grayscale-[25%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-white/10" />

              {MAP_PINS.map((pin) => (
                <div
                  key={pin.label}
                  className="absolute z-10"
                  style={{ top: pin.top, right: pin.right }}
                >
                  <div
                    className="cc-map-ring relative grid h-4 w-4 place-items-center rounded-full bg-gold shadow-[0_0_0_5px_rgba(0,0,0,.55)]"
                    style={{ "--cc-delay": pin.delay } as CSSProperties}
                  />
                  <div className="mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur">
                    {pin.label}
                  </div>
                </div>
              ))}

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/[.35] px-3 py-1.5 text-xs font-black text-gold backdrop-blur-xl">
                  <MapPin className="h-4 w-4" />
                  أعمال حقيقية داخل أحياء الرياض
                </div>
                <h2 className="mt-4 max-w-xl text-3xl font-black sm:text-4xl">
                  لا تكتفِ بالكلام. شاهد مواقع وصور المشاريع.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/[.65] sm:text-base">
                  جهزنا خريطة مشاريع تعرض نماذج من أعمالنا في التشطيب والترميم
                  والعظم والمشاريع التجارية داخل الرياض.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/projects-in-riyadh"
                    className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 font-black text-black transition hover:bg-[#ffd04d]"
                  >
                    افتح خريطة المشاريع
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white backdrop-blur transition hover:bg-white/20"
                  >
                    معرض الأعمال
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] bg-black p-7 text-white sm:p-9">
                <div className="flex items-center gap-1 text-gold">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-gold" />
                  ))}
                </div>
                <div className="mt-5 text-5xl font-black text-gold">5.0</div>
                <div className="mt-2 text-lg font-black">تقييم Google</div>
                <p className="mt-4 leading-7 text-white/[.55]">
                  الثقة لا تُبنى بجملة تسويقية؛ تبدأ من حضور نظامي، أعمال واضحة،
                  وتواصل يمكن للعميل التحقق منه.
                </p>
              </div>

              <Link
                to="/contractor-almalqa-riyadh"
                className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-black/[.08]"
              >
                <img
                  src="/images/almalqa.webp"
                  alt="مقاول تشطيب وبناء في حي الملقا بالرياض"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[.35] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <div className="text-xs font-black text-gold">صفحة محلية متخصصة</div>
                  <h3 className="mt-2 text-2xl font-black">مقاول حي الملقا وما حوله</h3>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold">
                    افتح صفحة الملقا
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL SEO CONTENT — no wall of text */}
      <section className="relative overflow-hidden bg-[#0a0d12] py-20 sm:py-28">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_right,rgba(255,190,0,.10),transparent_65%)]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
                <img
                  src="/projects/al-malaz-facade/al-malaz-facade-under-construction-05.webp"
                  alt="تنفيذ مشروع مقاولات وترميم واجهة داخل الرياض"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="text-xs font-black text-gold">قاعدة التنفيذ لدينا</div>
                  <blockquote className="mt-3 text-2xl font-black leading-relaxed">
                    الوضوح قبل البداية يقلل المفاجآت أثناء التنفيذ.
                  </blockquote>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-black tracking-[.2em] text-gold">
                لماذا بنيان الهرم؟
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                شركة مقاولات بالرياض
                <br />
                <span className="text-white/[.28]">بنظام واضح، لا بكلام أكثر.</span>
              </h2>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "إشراف هندسي",
                    text: "متابعة فنية للمراحل والمواد والاستلامات حسب نطاق المشروع.",
                  },
                  {
                    icon: FileText,
                    title: "عرض سعر مفهوم",
                    text: "نوضح البنود والمدة وما هو شامل أو غير شامل قبل بدء التنفيذ.",
                  },
                  {
                    icon: MonitorSmartphone,
                    title: "متابعة رقمية",
                    text: "نسبة الإنجاز والدفعات والوثائق والتحديثات في مسار واضح للعميل.",
                  },
                  {
                    icon: CircleCheckBig,
                    title: "تسليم منظم",
                    text: "فحص الملاحظات وترتيب الاستلام النهائي ضمن نطاق الاتفاق.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[.055]"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold text-black">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-white/[.55]">{feature.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-6 text-base leading-8 text-white/[.62] sm:text-lg sm:leading-9">
                <p>
                  اختيار <strong className="text-white">شركة مقاولات في الرياض</strong>{" "}
                  لا يعتمد على السعر فقط. المشروع يحتاج إلى وضوح في نطاق العمل،
                  جودة تنفيذ، إشراف هندسي، التزام بالمواعيد، وطريقة متابعة تحفظ
                  حقوق العميل وتوضح سير العمل من البداية حتى التسليم.
                </p>
                <p>
                  نبدأ بالمعاينة وفهم طبيعة المشروع، ثم نحدد البنود ومستوى
                  التشطيب أو نطاق الترميم أو أعمال العظم المطلوبة، وبعدها نقدّم
                  عرض سعر منظم يساعد العميل على اتخاذ القرار دون غموض.
                </p>
                <p>
                  خدماتنا تغطي مشاريع سكنية وتجارية داخل الرياض، ويمكن تنفيذ
                  المشروع بنظام تسليم مفتاح أو ضمن نطاق محدد حسب احتياج العميل
                  وميزانية التنفيذ.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/engineering-insights/how-to-choose-construction-company-riyadh"
                  className="inline-flex items-center justify-center rounded-xl border border-white/[.12] bg-white/[.05] px-6 py-3.5 font-black text-white transition hover:border-gold/[.35] hover:text-gold"
                >
                  كيف تختار شركة المقاولات؟
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
                <Link
                  to="/villa-construction-cost-calculator-riyadh"
                  className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3.5 font-black text-black transition hover:bg-[#ffd04d]"
                >
                  احسب تكلفة مشروعك
                  <Calculator className="mr-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL INTERNAL LINKS */}
      <section className="bg-[#f3f0e9] py-20 text-[#111318] sm:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black tracking-[.2em] text-[#a86f00]">
                اختر المسار المناسب
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                خدمات تبدأ من احتياجك.
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-black/[.55]">
              كل صفحة تشرح نطاقًا مختلفًا بوضوح؛ من بناء العظم إلى التشطيب
              والترميم والحاسبات التقديرية.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {IMPORTANT_PAGES.map((page, index) => (
              <Link
                key={page.to}
                to={page.to}
                className={`group relative min-h-[330px] overflow-hidden rounded-[1.7rem] border border-black/[.08] bg-black ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={page.image}
                  alt={page.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[.35] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <span className="inline-flex rounded-full border border-white/20 bg-black/[.35] px-3 py-1 text-xs font-black text-gold backdrop-blur">
                    {page.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-black sm:text-3xl">{page.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-white/60">
                    {page.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold">
                    تفاصيل الخدمة
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — compact accordion */}
      <section className="relative bg-[#090b0f] py-20 sm:py-28">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="text-sm font-black tracking-[.2em] text-gold">
              قبل أن تبدأ
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              أسئلة حقيقية.
              <br />
              <span className="text-white/[.28]">إجابات بلا تعقيد.</span>
            </h2>
            <p className="mt-5 max-w-md leading-8 text-white/[.55]">
              أهم ما يسأل عنه العملاء قبل اختيار شركة مقاولات بالرياض، من
              المعاينة والعرض إلى الإشراف والتسليم.
            </p>
            <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[.08] p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold text-black">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-black">سؤالك غير موجود؟</div>
                  <button
                    type="button"
                    onClick={() => {
                      track("call_from_construction_bottom");
                      window.location.href = "tel:+966550604837";
                    }}
                    className="mt-1 text-sm font-bold text-gold hover:text-white"
                  >
                    اتصل للاستشارة الأولية
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/8 overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[.025]">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-right sm:px-7 sm:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs font-black text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-black sm:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-white/[.35] transition duration-300 ${
                        isOpen ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 pr-12 leading-8 text-white/[.58] sm:px-7 sm:pr-16">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-white/[.08] bg-black py-16 sm:py-20">
        <img
          src="/images/ConstructionCompanyRiyadh.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050608_15%,rgba(5,6,8,.82)_55%,#050608_100%)]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/[.12] bg-white/[.055] p-7 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="text-sm font-black text-gold">الخطوة الأولى بسيطة</div>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                  هل مشروعك جاهز ليصبح واضحًا؟
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/60">
                  أرسل نوع العمل والمساحة والحي، ونرتب معك المعاينة والخطوة
                  المناسبة. أو استخدم الحاسبة لتحصل على تصور مبدئي بنفسك.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  className="h-14 rounded-xl bg-gold px-7 font-black text-black transition hover:bg-[#ffd04d]"
                  onClick={() => {
                    track("whatsapp_click_construction_bottom");
                    window.location.href = waPrefill(
                      "السلام عليكم، أريد عرض سعر لمشروع في الرياض.\nنوع العمل: تشطيب / ترميم / بناء عظم\nالمساحة التقريبية:\nالحي:\nتفاصيل إضافية:",
                    );
                  }}
                >
                  ابدأ عبر واتساب
                  <MessageCircle className="mr-2 h-5 w-5" />
                </Button>
                <Button
                  className="h-14 rounded-xl border border-white/[.15] bg-white/[.08] px-7 font-black text-white hover:bg-white/[.14]"
                  onClick={() => {
                    track("open_calculator_from_construction_bottom");
                    window.location.href =
                      "/villa-construction-cost-calculator-riyadh";
                  }}
                >
                  أنشئ تصورًا للتكلفة
                  <Calculator className="mr-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="فيديو من أعمال بنيان الهرم"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute -top-14 left-0 grid h-11 w-11 place-items-center rounded-full border border-white/[.15] bg-white/10 text-white transition hover:bg-gold hover:text-black"
              aria-label="إغلاق الفيديو"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/[.15] bg-black shadow-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/qaKZukA1534?autoplay=1"
                title="تشطيب وترميم فيلا سكنية في الرياض"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
