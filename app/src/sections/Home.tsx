import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Contact from "./Contact";
import Team from "./Team";
import Certificates from "./Certificates";
import Partners from "./Partners";

import { GALLERY, type GalleryCat } from "../data/gallery";

const WA_LINK =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%A8%D9%8A%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9";

const SERVICES = [
  {
    title: "بناء عظم فلل",
    desc: "تنفيذ العظم وفق المخططات والمواصفات وبإشراف هندسي.",
    href: "/villa-bone-construction-riyadh",
    icon: Hammer,
  },
  {
    title: "تشطيب فلل",
    desc: "تشطيب متكامل بمواد مختارة وإدارة دقيقة للتفاصيل.",
    href: "/villa-finishing-riyadh",
    icon: Paintbrush2,
  },
  {
    title: "سعر التشطيب",
    desc: "احسب تكلفة التشطيب الذكية حسب المستوى والمساحة.",
    href: "/villa-finishing-price-riyadh",
    icon: Calculator,
  },
  {
    title: "ترميم فلل",
    desc: "صيانة وتجديد شامل (دهانات، جبس، أرضيات) حسب المعاينة.",
    href: "/villa-renovation-riyadh",
    icon: Sparkles,
  },
  {
    title: "تشطيب شقق",
    desc: "حلول عملية ومرتبة لتشطيب الشقق وفق احتياجك وميزانيتك.",
    href: "/apartment-finishing-riyadh",
    icon: Paintbrush2,
  },
  {
    title: "شركة مقاولات بالرياض",
    desc: "تنفيذ وإدارة مشاريع بناء وتشطيب وتسليم مفتاح داخل الرياض.",
    href: "/construction-company-riyadh",
    icon: Hammer,
  },
  {
    title: "مقاول حي الملقا",
    desc: "تغطية حي الملقا وما حوله بسرعة معاينة وتنفيذ منظم.",
    href: "/contractor-almalqa-riyadh",
    icon: MapPin,
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
  const items = useMemo(() => GALLERY[cat].items.slice(0, 6), [cat]);

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
              onClick={() => setCat(t.key as GalleryCat)}
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
      </div>

      <div className="mt-3 text-sm text-gray-600 text-center sm:text-right">
        {GALLERY[cat].title}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((img, i) => (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-40 md:h-52 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "شركة مقاولات بالرياض | بنيان الهرم للمقاولات";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة بنيان الهرم للمقاولات بالرياض: تنفيذ بناء عظم وتشطيب وترميم وتسليم مفتاح بإشراف هندسي. احسب التكلفة عبر الحاسبة واطلب معاينة مجانية.";
    document.head.appendChild(meta);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ConstructionCompany"],
      name: "بنيان الهرم للمقاولات",
      alternateName: "PYBCCO",
      url: "https://pybcco.com/",
      telephone: "+966550604837",
      areaServed: { "@type": "City", name: "Riyadh" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riyadh",
        addressCountry: "SA",
      },
      // 🔁 بدّل الروابط بروابط حساباتك الحقيقية
      sameAs: [
        "https://www.linkedin.com/company/pybcco", // placeholder
        "https://x.com/pybcco", // placeholder
        "https://sites.google.com/view/bunian-alharam-riyadh/home",
      ],
    });
    document.head.appendChild(ld);

    const faq = document.createElement("script");
    faq.type = "application/ld+json";
    faq.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    });
    document.head.appendChild(faq);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(ld);
      document.head.removeChild(faq);
    };
  }, []);

  const heroImage =
    GALLERY.finishing.items[0]?.src ?? "/projects/finishing/finishing-01.jpg";

  return (
    <main dir="rtl">
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="شركة مقاولات بالرياض"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />
        </div>

        <div className="relative z-10 container-custom pt-24 pb-14 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-gold text-sm font-medium">
                شركة مقاولات بالرياض
              </span>
            </div>

            <h1 className="text-white font-extrabold leading-tight tracking-wide text-4xl sm:text-5xl lg:text-6xl text-center mb-6">
              شركة <span className="text-gold/90">بنيان الهرم</span>{" "}
              <span className="whitespace-nowrap">للمقاولات</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-center">
              تنفيذ بناء وتشطيب وترميم في الرياض بإشراف هندسي، عقود واضحة، وجدول
              زمني منضبط وجودة تسليم.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.open(WA_LINK, "_blank")}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 ml-2" />
                اطلب معاينة
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-gold bg-transparent hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto"
              >
                <Link to="/villa-finishing-price-riyadh#boq">
                  <Calculator className="w-5 h-5 ml-2" />
                  احسب التكلفة
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5"
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

            <div className="mt-10 text-white/60 text-sm">
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
          <div className="max-w-4xl mx-auto rounded-3xl bg-gray-50 p-6 sm:p-10 shadow-sm">
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
                <Link to="/villa-finishing-price-riyadh#boq">ابدأ الحسبة الآن</Link>
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
      <section id="services" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
              خدماتنا
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              خدمات <span className="text-gold">رئيسية</span> واضحة
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    {s.title}
                  </h3>
                </div>

                <p className="mt-3 text-gray-600 leading-relaxed">{s.desc}</p>

                <div className="mt-5">
                  <Button asChild variant="outline" className="hover:bg-black/5">
                    <Link to={s.href}>اعرف أكثر</Link>
                  </Button>
                </div>
              </div>
            ))}
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

            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-black font-bold hidden sm:inline-flex"
            >
              <Link to="/projects">عرض جميع المشاريع</Link>
            </Button>
          </div>

          <GalleryTabs />

          <div className="mt-6 sm:hidden">
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-black font-bold w-full"
            >
              <Link to="/projects">عرض جميع المشاريع</Link>
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
              "إشراف هندسي مباشر ومتابعة ميدانية",
              "عقود واضحة وبنود مفهومة",
              "جدول زمني وخطة تنفيذ قابلة للمتابعة",
              "جودة مواد ومواصفات محددة",
              "تسليم مفتاح حسب الاتفاق",
              "التزام بالتواصل والشفافية مع العميل",
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                  <div className="text-gray-900 font-semibold">{t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فريق العمل */}
      <section id="team">
        <Team />
      </section>

      {/* الشهادات */}
      <section id="certificates">
        <Certificates />
      </section>

      {/* الشركاء */}
      <section id="partners">
        <Partners />
      </section>

      {/* FAQ (ظاهر) — مهم جداً لأنه مربوط بالـ Schema */}
      <section id="faq" className="section-padding bg-white">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
              أسئلة شائعة عن <span className="text-gold">شركة مقاولات بالرياض</span>
            </h2>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {FAQ_ITEMS.map((x, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
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
                <Link to="/villa-finishing-price-riyadh#boq">احسب التكلفة</Link>
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
        <Contact />
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
