import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Phone,
  ArrowLeft,
  CheckCircle2,
  Hammer,
  Paintbrush2,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import SeoHead from "@/components/SeoHead";

const Contact = lazy(() => import("./Contact"));
const Team = lazy(() => import("./Team"));
const Certificates = lazy(() => import("./Certificates"));
const Partners = lazy(() => import("./Partners"));

import { GALLERY, type GalleryCat } from "../data/gallery";

const WA_LINK =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%A8%D9%8A%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9";

const CASE_STUDY_URL = "/case-study-villa-renovation-riyadh";

const serviceImage = (
  category: GalleryCat,
  index: number,
  fallback: string,
) => GALLERY[category].items[index]?.src ?? fallback;

const SERVICES = [
  {
    title: "بناء عظم فلل",
    desc: "تنفيذ الهيكل الإنشائي وفق المخططات والمواصفات، مع إشراف هندسي ومتابعة للمراحل الأساسية.",
    href: "/villa-bone-construction-riyadh",
    icon: Hammer,
    image: serviceImage(
      "concrete",
      0,
      "/projects/concrete/concrete-1.webp",
    ),
    tag: "من الأساسات حتى اكتمال الهيكل",
  },
  {
    title: "تشطيب فلل",
    desc: "تشطيب متكامل من الأعمال التأسيسية حتى التفاصيل النهائية، بمواد مختارة وإدارة دقيقة للتنفيذ.",
    href: "/villa-finishing-riyadh",
    icon: Paintbrush2,
    image: serviceImage(
      "finishing",
      0,
      "/projects/finishing/finishing-01.webp",
    ),
    tag: "الخدمة الأكثر طلبًا",
    featured: true,
  },
  {
    title: "سعر التشطيب",
    desc: "احصل على تقدير مبدئي حسب المساحة ومستوى التشطيب قبل طلب المعاينة وعرض السعر التفصيلي.",
    href: "/villa-finishing-price-riyadh",
    icon: Calculator,
    image: serviceImage(
      "finishing",
      1,
      "/projects/finishing/finishing-02.webp",
    ),
    tag: "حاسبة فورية",
  },
  {
    title: "ترميم فلل",
    desc: "إعادة تأهيل وتجديد شامل للواجهات والمساحات الداخلية والدهانات والجبس والأرضيات حسب حالة الموقع.",
    href: "/villa-renovation-riyadh",
    icon: Sparkles,
    image: serviceImage(
      "finishing",
      2,
      "/projects/finishing/finishing-03.webp",
    ),
    tag: "تجديد وإعادة تأهيل",
  },
  {
    title: "تشطيب شقق",
    desc: "حلول عملية ومنظمة لتشطيب الشقق الجديدة أو إعادة تجهيز الشقق القائمة وفق الاحتياج والميزانية.",
    href: "/apartment-finishing-riyadh",
    icon: Paintbrush2,
    image: serviceImage(
      "finishing",
      3,
      "/projects/finishing/finishing-04.webp",
    ),
    tag: "سكني وتسليم مفتاح",
  },
  {
    title: "شركة مقاولات بالرياض",
    desc: "إدارة وتنفيذ مشاريع البناء والتشطيب والترميم والتسليم المفتاح تحت مسؤولية جهة واحدة.",
    href: "/construction-company-riyadh",
    icon: Hammer,
    image: serviceImage(
      "concrete",
      1,
      "/projects/concrete/concrete-2.webp",
    ),
    tag: "إدارة متكاملة للمشروع",
  },
  {
    title: "مقاول حي الملقا",
    desc: "خدمة معاينة وتنفيذ منظم في حي الملقا وما حوله ضمن نطاق عملنا داخل أحياء الرياض.",
    href: "/contractor-almalqa-riyadh",
    icon: MapPin,
    image: serviceImage(
      "finishing",
      4,
      "/projects/finishing/finishing-05.webp",
    ),
    tag: "تغطية محلية داخل الرياض",
  },
];

const STATS = [
  { value: "90+", label: "مشروع منفذ" },
  { value: "12+", label: "سنة خبرة" },
  { value: "الرياض", label: "نطاق العمل" },
  { value: "2013", label: "تأسيس" },
];

const FAQ_ITEMS = [
  {
    q: "هل تقدمون معاينة مجانية داخل الرياض؟",
    a: "نعم، نوفر معاينة مبدئية داخل الرياض حسب موقع المشروع ونطاق العمل قبل تقديم عرض السعر.",
  },
  {
    q: "هل تقدمون تشطيب تسليم مفتاح؟",
    a: "نعم، نقدم تشطيب تسليم مفتاح للفلل والشقق حسب المستوى المطلوب وبإشراف هندسي.",
  },
  {
    q: "هل يمكنني حساب التكلفة قبل المعاينة؟",
    a: "نعم، يمكنك استخدام حاسبة التكلفة في الموقع للحصول على تقدير مبدئي سريع حسب المساحة والمستوى.",
  },
  {
    q: "ما هي الخدمات التي تقدمونها؟",
    a: "نقدم بناء عظم، تشطيب فلل وشقق، ترميم وتجديد، وإدارة مشاريع داخل الرياض.",
  },
];

function scrollToId(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function GalleryTabs() {
  const [cat, setCat] = useState<GalleryCat>("finishing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const items = useMemo(() => GALLERY[cat].items.slice(0, 6), [cat]);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, items.length]);

  const selectedImage = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
  {[
    { key: "concrete", label: "عظم" },
    { key: "finishing", label: "تشطيب" },
    { key: "entertainment", label: "ترفيه" },
  ].map((t) => {
    const active = cat === t.key;
    return (
      <button
        key={t.key}
        type="button"
        onClick={() => {
          setCat(t.key as GalleryCat);
          setSelectedIndex(null);
        }}
        className={[
          "px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap",
          active
            ? "bg-gold text-black"
            : "bg-black/5 text-gray-900 hover:bg-black/10",
        ].join(" ")}
      >
        {t.label}
      </button>
    );
  })}

  <Link
    to="/videos"
    className="px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap bg-black/5 text-gray-900 hover:bg-black/10"
  >
    فيديو
  </Link>
</div>

      <div className="mt-3 text-sm text-gray-600 text-center sm:text-right">
        {GALLERY[cat].title}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openImage(i)}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-black/5 text-right focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={`عرض الصورة: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 md:h-52 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 sm:p-6"
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const endX = e.changedTouches[0].clientX;
              const delta = endX - touchStartX;

              if (delta > 50) showPrev();
              if (delta < -50) showNext();

              setTouchStartX(null);
            }}
          >
            <button
              type="button"
              onClick={closeImage}
              className="absolute top-3 left-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 transition"
              aria-label="إغلاق الصورة"
            >
              <X className="w-5 h-5" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 transition"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 transition"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[82vh] object-contain bg-black"
              />
            </div>

            <div className="mt-4 text-center text-white/90 text-sm sm:text-base font-medium">
              {selectedImage.alt}
            </div>

            {items.length > 1 && (
              <div className="mt-2 text-center text-white/60 text-xs sm:text-sm">
                {selectedIndex! + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const heroImage =
    GALLERY.finishing.items[0]?.src ?? "/projects/finishing/finishing-01.webp";

  return (
    <main dir="rtl">
      <SeoHead
        title="شركة مقاولات بالرياض | بنيان الهرم للمقاولات"
        description="شركة بنيان الهرم للمقاولات بالرياض: تنفيذ بناء عظم وتشطيب وترميم وتسليم مفتاح بإشراف هندسي. احسب التكلفة عبر الحاسبة واطلب معاينة مجانية."
        canonical="https://pybcco.com/"
        ogImage="https://pybcco.com/images/og-home.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((x) => ({
              "@type": "Question",
              name: x.q,
              acceptedAnswer: { "@type": "Answer", text: x.a },
            })),
          },
        ]}
      />

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[92svh] sm:min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
  src={heroImage}
  alt="شركة مقاولات بالرياض"
  width={1600}
  height={900}
  className="absolute inset-0 w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
  decoding="async"
/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
        </div>

        <div className="relative z-10 container-custom w-full max-w-full overflow-hidden pt-24 pb-12 px-4 sm:pt-28 sm:pb-16">
          <div className="text-center w-full max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 mb-6 sm:backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-gold text-sm font-medium">
                شركة مقاولات بالرياض
              </span>
            </div>

            <h1 className="mx-auto max-w-[92vw] text-white font-extrabold leading-[1.18] tracking-normal text-[2rem] min-[380px]:text-[2.25rem] sm:text-5xl lg:text-6xl text-center mb-5 sm:mb-6 break-words overflow-visible">
              <span className="block">شركة مقاولات بالرياض</span>
              <span className="block mt-1 sm:mt-2">
                <span className="text-gold/90">بنيان الهرم</span>{" "}
                <span className="whitespace-nowrap">PYBCCO</span>
              </span>
            </h1>

            <p className="text-white/85 text-sm min-[380px]:text-base sm:text-lg max-w-[92vw] sm:max-w-2xl mx-auto leading-relaxed text-center">
              تنفيذ بناء وتشطيب وترميم في الرياض بإشراف هندسي، عقود واضحة، وجدول
              زمني منضبط وجودة تسليم.
            </p>

            <div className="mt-5 hidden sm:flex flex-wrap items-center justify-center gap-3">
  <Link
    to={CASE_STUDY_URL}
    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15 transition"
  >
    شاهد دراسة حالة حقيقية (قبل/بعد)
    <span className="text-gold">←</span>
  </Link>
  <span className="text-white/55 text-xs">
    صور مراحل التنفيذ + النتيجة النهائية
  </span>
</div>

            <Link
              to="/offers"
              className="mt-5 inline-flex w-full max-w-[92vw] sm:w-auto sm:max-w-full items-center justify-center gap-2 rounded-2xl sm:rounded-full border border-gold/40 bg-gold/15 px-3 sm:px-4 py-3 sm:py-2.5 text-sm sm:text-base font-extrabold text-gold text-center leading-snug shadow-[0_0_28px_rgba(245,170,0,0.18)] backdrop-blur-sm transition hover:bg-gold hover:text-black hover:shadow-[0_0_35px_rgba(245,170,0,0.28)]"
              aria-label="شاهد عروض بنيان الهرم للمقاولات الحالية"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                عروض يوليو للمشاريع الجديدة — خصم 3% وتصميم مبدئي مجاني
              </span>
              <span className="hidden sm:inline text-lg leading-none">←</span>
            </Link>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[92vw] sm:max-w-none mx-auto">
              <Button
                onClick={() => window.open(WA_LINK, "_blank")}
                size="lg"
                variant="outline"
                className="text-gold bg-transparent hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 ml-2" />
                اطلب معاينة
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-gold hover:bg-gold/90 text-black font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link to="/villa-finishing-price-riyadh">
                  <Calculator className="w-5 h-5 ml-2" />
                  احسب التكلفة
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-gold bg-transparent hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link to="/decor">🛍 المتجر</Link>
              </Button>
            </div>

            <div className="hidden mt-12 max-w-3xl mx-auto grid-cols-2 gap-3 sm:grid sm:grid-cols-4 sm:gap-6">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-2xl p-4 sm:p-5 sm:backdrop-blur-md"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-white/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 text-white/60 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => scrollToId("#calculator-cta")}
                className="hover:text-gold transition"
              >
                تعرف على أداة حساب التكلفة ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA الحاسبة */}
      <section id="calculator-cta" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gray-50 p-6 sm:p-10 shadow-sm border border-black/5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              احسب تكلفة مشروعك خلال <span className="text-gold">دقيقة</span>
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">
              تقدير سريع قبل المعاينة — ثم تواصل معنا لتأكيد التفاصيل بزيارة
              ميدانية.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold/90 text-black font-bold px-8 w-full sm:w-auto"
              >
                <Link to="/villa-finishing-price-riyadh">ابدأ الحسبة الآن</Link>
              </Button>

              <Button
                onClick={() => scrollToId("#contact")}
                size="lg"
                variant="outline"
                className="hover:bg-black/5 w-full sm:w-auto"
              >
                تواصل معنا بعد الحسبة
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* الخدمات */}
      <section
        id="services"
        className="relative overflow-hidden bg-[#070b16] py-20 sm:py-24 text-white"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 right-[8%] h-80 w-80 rounded-full bg-gold/15 blur-3xl motion-safe:animate-pulse" />
          <div className="absolute -bottom-40 left-[4%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_32%)]" />
        </div>

        <div className="container-custom relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              <Sparkles className="h-4 w-4" />
              خدماتنا الرئيسية
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              كل ما يحتاجه مشروعك
              <span className="block text-gold">تحت إدارة واحدة</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              من بناء العظم إلى التشطيب والترميم والتسليم المفتاح، نرتب لك نطاق
              العمل ونربط كل مرحلة بما بعدها حتى يكون التنفيذ أوضح وأسهل للمتابعة.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {/* الخدمة الرئيسية */}
            <Link
              to={SERVICES[1].href}
              className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl lg:col-span-7"
              aria-label="التعرف على خدمة تشطيب الفلل"
            >
              <img
                src={SERVICES[1].image}
                alt="تشطيب فلل في الرياض - بنيان الهرم للمقاولات"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-[#050812]/78 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-gold/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative flex h-full min-h-[440px] flex-col justify-end p-6 sm:p-9">
                <div className="mb-auto flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-black/45 px-3 py-1.5 text-xs font-bold text-gold backdrop-blur-md">
                    <Sparkles className="h-4 w-4" />
                    {SERVICES[1].tag}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition group-hover:bg-gold group-hover:text-black">
                    <Paintbrush2 className="h-5 w-5" />
                  </span>
                </div>

                <div className="max-w-xl">
                  <p className="text-sm font-bold text-gold">من العظم إلى الجاهزية</p>
                  <h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                    تشطيب فلل وتسليم مفتاح
                  </h3>
                  <p className="mt-4 max-w-lg leading-7 text-white/75">
                    {SERVICES[1].desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/80">
                    {["كهرباء وسباكة", "جبس ودهانات", "أرضيات وأبواب", "إشراف وتسليم"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="mt-7 inline-flex items-center gap-2 font-extrabold text-gold">
                    استعرض خدمة تشطيب الفلل
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>

            {/* حاسبة السعر */}
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-b from-[#14182a] to-[#090c17] p-6 shadow-2xl lg:col-span-5 sm:p-8">
              <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold text-gold">ابدأ من الميزانية</span>
                    <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      اعرف نطاق تكلفة التشطيب قبل المعاينة
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-black shadow-[0_0_30px_rgba(245,170,0,0.25)]">
                    <Calculator className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-4 leading-7 text-white/65">
                  غيّر المساحة واختر المستوى المناسب لتحصل على تقدير مبدئي يساعدك
                  على اتخاذ القرار قبل طلب عرض السعر التفصيلي.
                </p>

                <div className="mt-7 grid grid-cols-3 gap-2">
                  {["تجاري", "قياسي", "فاخر"].map((level, index) => (
                    <div
                      key={level}
                      className={[
                        "rounded-2xl border px-3 py-4 text-center",
                        index === 1
                          ? "border-gold/50 bg-gold/[0.12] text-gold"
                          : "border-white/10 bg-white/[0.04] text-white/70",
                      ].join(" ")}
                    >
                      <div className="text-xs opacity-70">مستوى</div>
                      <div className="mt-1 font-extrabold">{level}</div>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mt-7 w-full bg-gold font-extrabold text-black hover:bg-gold/90"
                >
                  <Link to={SERVICES[2].href}>
                    افتح حاسبة سعر التشطيب
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>

                <button
                  type="button"
                  onClick={() => window.open(WA_LINK, "_blank")}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-gold/40 hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  استفسار وتسعير مباشر عبر واتساب
                </button>
              </div>
            </div>
          </div>

          {/* الخدمات الداعمة */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[SERVICES[0], SERVICES[3], SERVICES[4], SERVICES[5]].map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="group relative min-h-[275px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]"
              >
                <img
                  src={service.image}
                  alt={`${service.title} في الرياض - بنيان الهرم للمقاولات`}
                  className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/82 to-[#070b16]/35" />

                <div className="relative flex min-h-[275px] flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-white/65 backdrop-blur-sm">
                      {service.tag}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-gold backdrop-blur-md transition group-hover:bg-gold group-hover:text-black">
                      <service.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-extrabold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {service.desc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-gold">
                      تفاصيل الخدمة
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* التغطية المحلية وروابط التحويل */}
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Link
              to={SERVICES[6].href}
              className="group flex flex-col justify-between gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-gold/35 sm:flex-row sm:items-center sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gold">نخدم أحياء الرياض</p>
                  <h3 className="mt-1 text-xl font-extrabold">مقاول حي الملقا وما حوله</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    معاينة وتنفيذ منظم للمشاريع السكنية والتجارية ضمن نطاق عملنا
                    داخل الرياض.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 font-extrabold text-gold">
                صفحة الملقا
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>

            <div className="flex flex-col justify-center rounded-[1.75rem] border border-gold/20 bg-gold p-5 text-black sm:p-6">
              <p className="text-sm font-bold opacity-70">شاهد قبل أن تقرر</p>
              <h3 className="mt-1 text-xl font-extrabold">مشاريع حقيقية داخل الرياض</h3>
              <p className="mt-2 text-sm leading-6 opacity-70">
                استعرض الصور ومواقع المشاريع ثم تواصل معنا لمناقشة مشروعك.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/projects-in-riyadh"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-black/85"
                >
                  <MapPin className="h-4 w-4" />
                  خريطة المشاريع
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/20 px-4 py-3 text-sm font-extrabold transition hover:bg-black/10"
                >
                  معرض الأعمال
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* المعرض */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-custom px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-3">
                معرض الأعمال
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                عظم / تشطيب / <span className="text-gold">ترفيه</span>
              </h2>
              <p className="mt-2 text-gray-600">
                اختر التصنيف وشاهد نماذج حقيقية من أعمالنا.
              </p>
            </div>

<div className="hidden sm:flex items-center gap-3">
  <Button
    asChild
    className="bg-gold hover:bg-gold/90 text-black font-bold"
  >
    <Link to="/projects">عرض جميع الصور</Link>
  </Button>

  <Button
    asChild
    variant="outline"
    className="border-black/10 bg-white text-gray-900 font-bold hover:bg-black hover:text-white"
  >
    <Link to="/projects-in-riyadh">خريطة المشاريع</Link>
  </Button>
</div>
          </div>

          <div className="mt-8">
            <Link
              to={CASE_STUDY_URL}
              className="group block rounded-3xl overflow-hidden border border-black/5 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative">
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                    <img
                      src="/casestudy/main.webp"
                      alt="دراسة حالة تشطيب وتجديد فيلا بالرياض قبل وبعد"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    <span className="bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
                      قبل/بعد
                    </span>
                    <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                      دراسة حالة
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    دراسة حالة: تشطيب وتجديد فيلا سكنية – الرياض (قبل/بعد)
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    توثيق كامل بالصور لمراحل التنفيذ: هدم وإعادة تشكيل، تجهيزات،
                    تشطيبات داخلية وخارجية، والنتيجة النهائية. صفحة واحدة مرتبة
                    تساعدك تشوف مستوى التنفيذ قبل اتخاذ القرار.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 font-extrabold text-gold-dark">
                    عرض الدراسة الآن <span aria-hidden>←</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <GalleryTabs />

<div className="mt-6 sm:hidden grid gap-3">
  <Button
    asChild
    className="bg-gold hover:bg-gold/90 text-black font-bold w-full"
  >
    <Link to="/projects">عرض جميع الصور</Link>
  </Button>

  <Button
    asChild
    variant="outline"
    className="border-black/10 bg-white text-gray-900 font-bold w-full hover:bg-black hover:text-white"
  >
    <Link to="/projects-in-riyadh">خريطة المشاريع</Link>
  </Button>
</div>
        </div>
      </section>

      {/* لماذا نحن */}
      <section id="why-us" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
              لماذا نحن؟
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              أسباب اختيار <span className="text-gold">بنيان الهرم</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { text: "إشراف هندسي مباشر ومتابعة ميدانية", href: "/#team" },
              { text: "عقود واضحة وبنود مفهومة" },
              {
                text: "جدول زمني وخطة تنفيذ قابلة للمتابعة",
                href: "/project-tracking-system-riyadh",
              },
              { text: "جودة مواد ومواصفات محددة", href: "/#services" },
              { text: "تسليم مفتاح حسب الاتفاق", href: "/villa-finishing-riyadh" },
              { text: "التزام بالتواصل والشفافية مع العميل", href: "/#contact" },
              {
                text: "نظام متابعة مشاريع إلكتروني خاص",
                href: "/project-tracking-system-riyadh",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-black/5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />

                  {item.href ? (
                    <Link
                      to={item.href}
                      className="text-gray-900 font-semibold hover:underline"
                      aria-label={item.text}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <div className="text-gray-900 font-semibold">{item.text}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فريق العمل */}
      <section id="team">
  <Suspense fallback={null}>
    <Team />
  </Suspense>
</section>

      {/* الشهادات */}
      <section id="certificates">
  <Suspense fallback={null}>
    <Certificates />
  </Suspense>
</section>

      {/* الشركاء */}
      <section id="partners">
  <Suspense fallback={null}>
    <Partners />
  </Suspense>
</section>

      {/* FAQ (ظاهر) — مربوط بالـ Schema */}
      <section id="faq" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              أسئلة شائعة عن{" "}
              <span className="text-gold">شركة مقاولات بالرياض</span>
            </h2>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {FAQ_ITEMS.map((x, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-black/5"
                >
                  <div className="text-gray-900 font-extrabold">{x.q}</div>
                  <div className="mt-2 text-gray-700 leading-relaxed">{x.a}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => window.open(WA_LINK, "_blank")}
                className="bg-gold hover:bg-gold/90 text-black font-bold px-8"
              >
                اطلب معاينة الآن
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA ختامي */}
      <section id="final-cta" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="rounded-3xl bg-black text-white p-8 sm:p-12 text-center shadow-sm">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              جاهز تبدأ <span className="text-gold">مشروعك؟</span>
            </h2>

<div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
  <Button
    asChild
    size="lg"
    className="bg-gold hover:bg-gold/90 text-black font-bold w-full sm:w-auto"
  >
    <Link to="/villa-finishing-price-riyadh">
      احسب التكلفة
    </Link>
  </Button>

  <Button
    asChild
    size="lg"
    variant="outline"
    className="text-white bg-transparent hover:bg-white/10 w-full sm:w-auto"
  >
    <Link to="/building-and-finishing-prices-riyadh">
      دليل الأسعار
    </Link>
  </Button>

  <Button
    onClick={() => window.open(WA_LINK, "_blank")}
    size="lg"
    variant="outline"
    className="text-white bg-transparent hover:bg-white/10 w-full sm:w-auto"
  >
    اطلب معاينة
  </Button>
</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
  <Suspense fallback={null}>
    <Contact />
  </Suspense>
</section>

      {/* SEO نص بسيط */}
      <section id="seo" className="section-padding bg-white">
        <div className="container-custom px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            شركة مقاولات بالرياض – <span className="text-gold">بنيان الهرم</span>
          </h2>

          <div className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 max-w-5xl">
            <p>
              تبحث عن شركة مقاولات بالرياض تجمع بين التنظيم وجودة التنفيذ ووضوح
              التعامل؟ في بنيان الهرم للمقاولات نعتمد منهجية عمل تبدأ بفهم احتياج
              العميل، ثم وضع خطة تنفيذ وجدول زمني، مع إشراف ومتابعة لضمان جودة
              الأعمال وتسليم مرتب.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}