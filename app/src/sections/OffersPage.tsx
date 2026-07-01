import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BadgePercent,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gift,
  Hammer,
  Home,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
  UserPlus,
} from "lucide-react";

const SITE_URL = "https://pybcco.com";
const OFFERS_URL = `${SITE_URL}/offers`;
const PHONE_WHATSAPP = "966550604837";
const START_DATE = "2 يوليو 2026";
const END_DATE = "31 يوليو 2026";

const whatsappUrl = (message: string) =>
  `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;

const offers = [
  {
    id: "account-discount",
    eyebrow: "عرض المشاريع الجديدة",
    title: "سجل حسابك واحصل على خصم 3% على مشروعك",
    description:
      "خصم خاص للعملاء الجدد عند إنشاء حساب داخل الموقع قبل طلب عرض السعر، مناسب لمشاريع التشطيب، الترميم، البناء، وتسليم المفتاح داخل الرياض.",
    icon: BadgePercent,
    badge: "خصم 3%",
    href: "/create-account?source=offers-3-discount",
    cta: "سجل حسابك الآن",
    highlights: [
      "ينطبق على عقود التنفيذ الجديدة داخل الرياض",
      "يساعدنا الحساب على حفظ بيانات المشروع والتقديرات",
      "يمكن ربطه لاحقًا ببوابة متابعة المشاريع",
    ],
    terms:
      "يتم تأكيد الخصم بعد المعاينة واعتماد نطاق العمل، ولا يشمل البنود المسعرة بسعر خاص أو الأعمال الصغيرة جدًا.",
  },
  {
    id: "free-concept-design",
    eyebrow: "عرض الديكور والتشطيب",
    title: "تصور تصميمي مبدئي مجاني قبل التنفيذ",
    description:
      "أرسل صورة جدار التلفزيون أو المدخل أو المساحة، ونقترح لك تصورًا مبدئيًا باستخدام بديل الخشب، بديل الرخام، بديل الشيبورد أو الإنارة المناسبة قبل طلب التوريد والتركيب.",
    icon: Palette,
    badge: "مجاني",
    href: whatsappUrl(
      "السلام عليكم، أريد الاستفادة من عرض التصور التصميمي المبدئي المجاني قبل التنفيذ. سأرسل صورة الجدار والمقاسات التقريبية."
    ),
    cta: "اطلب التصميم المبدئي",
    highlights: [
      "مناسب لجدار التلفزيون والمداخل والصالات",
      "اقتراح مواد وألوان قبل شراء المواد",
      "التصور المبدئي للتوضيح وليس مخطط تنفيذ نهائي",
    ],
    terms:
      "الخدمة مخصصة للطلبات الجادة داخل الرياض، ويتم اعتماد التفاصيل النهائية بعد المقاسات والمعاينة واختيار المواد.",
  },
  {
    id: "quotation-review",
    eyebrow: "عرض قبل التعاقد",
    title: "مراجعة مبدئية مجانية لعرض السعر أو المخططات",
    description:
      "إذا كان لديك عرض سعر من مقاول أو مخططات لمشروع بناء أو تشطيب، نراجع لك البنود مبدئيًا ونوضح النقاط الناقصة أو غير الواضحة قبل اتخاذ قرار التعاقد.",
    icon: FileSearch,
    badge: "مراجعة مجانية",
    href: whatsappUrl(
      "السلام عليكم، أريد الاستفادة من عرض مراجعة عرض السعر أو المخططات مبدئيًا. سأرسل الملفات والتفاصيل المتاحة."
    ),
    cta: "أرسل العرض للمراجعة",
    highlights: [
      "مراجعة وضوح البنود والكميات العامة",
      "تنبيه على البنود الناقصة أو المبهمة",
      "مفيد قبل مقارنة عروض شركات المقاولات",
    ],
    terms:
      "المراجعة المبدئية لا تعتبر تقريرًا هندسيًا نهائيًا أو اعتمادًا فنيًا، بل قراءة أولية تساعد العميل قبل المعاينة والتسعير التفصيلي.",
  },
];

const serviceKeywords = [
  "عروض مقاولات بالرياض",
  "عروض تشطيب فلل بالرياض",
  "خصم شركة مقاولات",
  "تصميم مبدئي مجاني",
  "مراجعة عرض سعر مقاول",
  "عروض ترميم فلل ومنازل",
  "حاسبة تكلفة البناء والتشطيب",
  "تسليم مفتاح بالرياض",
];

const faqItems = [
  {
    question: "هل عروض بنيان الهرم للمقاولات تشمل كل مشاريع الرياض؟",
    answer:
      "العروض مخصصة للمشاريع الجديدة داخل الرياض، ويتم تأكيد قابلية تطبيق كل عرض بعد معرفة نطاق العمل، الموقع، المساحة، ومرحلة المشروع.",
  },
  {
    question: "هل خصم 3% ينطبق مباشرة على أي مشروع؟",
    answer:
      "الخصم مرتبط بإنشاء حساب وطلب عرض سعر لمشروع تنفيذ جديد، ويتم تأكيده عند اعتماد عرض السعر النهائي حسب نطاق المشروع والبنود المشمولة.",
  },
  {
    question: "هل التصميم المبدئي المجاني يعتبر تصميمًا نهائيًا؟",
    answer:
      "لا. هو تصور بصري مبدئي يساعدك على تخيل الفكرة قبل التنفيذ، أما التصميم النهائي والمقاسات التفصيلية فتتم بعد المعاينة واختيار المواد.",
  },
  {
    question: "هل مراجعة عرض السعر مجانية فعلًا؟",
    answer:
      "نعم، المراجعة المبدئية مجانية للطلبات الجادة، وهدفها توضيح البنود الناقصة أو غير الواضحة قبل التعاقد أو قبل طلب تسعير تفصيلي من الشركة.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${OFFERS_URL}#webpage`,
    url: OFFERS_URL,
    name: "عروض شركة مقاولات بالرياض | بنيان الهرم للمقاولات",
    description:
      "عروض مقاولات وتشطيب وترميم في الرياض تشمل خصم إنشاء الحساب، تصور تصميمي مبدئي مجاني، ومراجعة مبدئية لعروض الأسعار والمخططات.",
    inLanguage: "ar-SA",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/construction-offers.webp`,
    },
    breadcrumb: { "@id": `${OFFERS_URL}#breadcrumb` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${OFFERS_URL}#breadcrumb`,
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
        name: "العروض",
        item: OFFERS_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${OFFERS_URL}#offer-catalog`,
    name: "عروض بنيان الهرم للمقاولات في الرياض",
    itemListElement: offers.map((offer, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: offer.title,
      description: offer.description,
      url: `${OFFERS_URL}#${offer.id}`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-07-02",
      validThrough: "2026-07-31",
      areaServed: {
        "@type": "City",
        name: "Riyadh",
      },
      offeredBy: {
        "@id": `${SITE_URL}/#localbusiness`,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${OFFERS_URL}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10" dir="rtl">
      <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-800 mb-4">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-gray-600 leading-8 text-base md:text-lg">{description}</p>
    </div>
  );
}

export default function OffersPage() {
  return (
    <main className="bg-[#f7f5ef] text-dark" dir="rtl">
      <SeoHead
        title="عروض مقاولات وتشطيب بالرياض 2026 | خصم 3% وتصميم مجاني | PYBCCO"
        description="عروض بنيان الهرم للمقاولات في الرياض: خصم 3% عند إنشاء حساب، تصور تصميمي مبدئي مجاني، ومراجعة مبدئية لعروض الأسعار والمخططات للمشاريع الجديدة."
        canonical={OFFERS_URL}
        ogImage={`${SITE_URL}/images/construction-offers.webp`}
        ogImageAlt="عروض شركة مقاولات بالرياض تشمل خصم وتصميم مجاني ومراجعة عرض سعر"
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden flex items-center pt-24 pb-16">
        <div className="absolute inset-0">
          <img
            src="/images/construction-offers.webp"
            alt="عروض مقاولات وتشطيب في الرياض من بنيان الهرم للمقاولات"
            className="h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/70 to-black/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,193,7,0.28),transparent_34%),radial-gradient(circle_at_15%_75%,rgba(255,255,255,0.10),transparent_28%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="text-white max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/35 backdrop-blur-md px-4 py-2 mb-5 text-gold font-bold">
                <Gift className="h-5 w-5" />
                عروض محدودة للمشاريع الجديدة داخل الرياض
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                عروض شركة مقاولات بالرياض
                <span className="block text-gold mt-2">خصم، تصميم، ومراجعة قبل التعاقد</span>
              </h1>

              <p className="text-white/82 text-lg md:text-xl leading-9 max-w-2xl mb-8">
                استفد من عروض بنيان الهرم للمقاولات على مشاريع التشطيب، الترميم، البناء، وتسليم المفتاح في الرياض. صممنا هذه الصفحة لتجعل قرارك أوضح قبل طلب عرض السعر أو بدء التنفيذ.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4">
                  <BadgePercent className="h-6 w-6 text-gold mb-3" />
                  <p className="font-extrabold text-2xl">3%</p>
                  <p className="text-white/70 text-sm">خصم عند إنشاء حساب</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4">
                  <Palette className="h-6 w-6 text-gold mb-3" />
                  <p className="font-extrabold text-2xl">مجاني</p>
                  <p className="text-white/70 text-sm">تصور تصميمي مبدئي</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4">
                  <FileSearch className="h-6 w-6 text-gold mb-3" />
                  <p className="font-extrabold text-2xl">مراجعة</p>
                  <p className="text-white/70 text-sm">لعرض السعر أو المخططات</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-black font-extrabold px-7 py-6 text-base"
                >
                  <a href="#current-offers">
                    شاهد العروض الحالية
                    <ArrowLeft className="h-5 w-5 mr-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white px-7 py-6 text-base"
                >
                  <a href="/villa-construction-cost-calculator-riyadh">
                    احسب تكلفة مشروعك
                    <Calculator className="h-5 w-5 mr-2" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:justify-self-end w-full max-w-xl">
              <div className="rounded-[2rem] border border-white/15 bg-black/45 backdrop-blur-xl p-5 md:p-7 shadow-2xl">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="text-gold font-bold text-sm mb-1">صلاحية العروض</p>
                    <h2 className="text-white text-2xl font-extrabold">عروض يوليو 2026</h2>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-gold text-black flex items-center justify-center">
                    <Timer className="h-7 w-7" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <CalendarDays className="h-5 w-5 text-gold mb-2" />
                    <p className="text-white/55 text-xs">بداية العرض</p>
                    <p className="text-white font-bold">{START_DATE}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                    <CalendarDays className="h-5 w-5 text-gold mb-2" />
                    <p className="text-white/55 text-xs">نهاية العرض</p>
                    <p className="text-white font-bold">{END_DATE}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "عروض حقيقية للمشاريع الجديدة داخل الرياض",
                    "مناسبة للبناء، التشطيب، الترميم، وتسليم المفتاح",
                    "تطبيق العرض يتم بعد تحديد نطاق العمل والمعاينة",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                      <span className="leading-7">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/10 p-4 text-gold-50 leading-7 text-sm">
                  هذه الصفحة قابلة للتحديث شهريًا بعروض جديدة، لذلك تعتبر أفضل مكان لمتابعة الخصومات والخدمات المجانية قبل بدء مشروعك.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer cards */}
      <section id="current-offers" className="py-20">
        <div className="container-custom">
          <SectionTitle
            eyebrow="العروض الحالية"
            title="اختر العرض الأنسب لمرحلة مشروعك"
            description="سواء كنت في مرحلة حساب تكلفة البناء، مقارنة عروض المقاولين، أو اختيار ديكور داخلي، هذه العروض صممت لتقربك خطوة من قرار تنفيذ واضح وآمن."
          />

          <div className="grid lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <article
                  key={offer.id}
                  id={offer.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-gold via-gold-500 to-gold-900" />
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-dark text-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="rounded-full bg-gold text-black text-sm font-extrabold px-4 py-2">
                        {offer.badge}
                      </div>
                    </div>

                    <div className="text-sm font-bold text-gold-800 mb-2">
                      العرض {index + 1} — {offer.eyebrow}
                    </div>
                    <h3 className="text-2xl font-extrabold leading-tight mb-4 text-dark">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 leading-8 mb-6">{offer.description}</p>

                    <div className="space-y-3 mb-6">
                      {offer.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gold-700 mt-1 shrink-0" />
                          <p className="text-gray-700 leading-7 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-1 font-bold">شروط مختصرة</p>
                      <p className="text-sm text-gray-600 leading-7">{offer.terms}</p>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-dark hover:bg-black text-white font-bold py-6 rounded-xl"
                    >
                      <a href={offer.href} target={offer.href.startsWith("http") ? "_blank" : undefined} rel={offer.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {offer.cta}
                        <ArrowLeft className="h-5 w-5 mr-2" />
                      </a>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
            <div className="rounded-[2rem] overflow-hidden relative min-h-[420px] shadow-xl">
              <img
                src="/images/construction-offers.webp"
                alt="خصومات وعروض تشطيب وترميم وبناء في الرياض"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              <div className="absolute bottom-0 p-7 text-white">
                <p className="text-gold font-bold mb-2">PYBCCO Offers</p>
                <h2 className="text-3xl font-extrabold leading-tight mb-3">
                  عروض مقاولات قابلة للتحويل إلى طلبات حقيقية
                </h2>
                <p className="text-white/75 leading-8">
                  الصفحة مصممة لتجميع العروض التي تهم العميل قبل التنفيذ، وربطها بالحساب، الحاسبة، الواتساب، وخدمات الشركة.
                </p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 text-gold-800 px-4 py-2 font-bold mb-5">
                <ShieldCheck className="h-4 w-4" />
                لماذا هذه الصفحة مهمة للعميل؟
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                ليست مجرد خصومات، بل طريقة أوضح لبدء مشروعك مع شركة مقاولات منظمة في الرياض
              </h2>
              <p className="text-gray-600 leading-9 text-lg mb-7">
                كثير من العملاء يبحثون عن عروض تشطيب فلل بالرياض أو عروض ترميم منازل أو خصم شركة مقاولات، لكن المشكلة ليست في الخصم وحده؛ المشكلة في وضوح البنود، معرفة التكلفة التقريبية، ورؤية تصور مبدئي قبل التنفيذ. لذلك جمعنا العروض بطريقة تساعدك على اتخاذ قرار أفضل.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: UserPlus, title: "حساب عميل", text: "ابدأ بحساب يحفظ بياناتك ويمهد لبوابة المشاريع." },
                  { icon: Calculator, title: "حاسبة تكلفة", text: "قارن العرض مع تقدير مبدئي للبناء أو التشطيب." },
                  { icon: ClipboardCheck, title: "وضوح قبل التعاقد", text: "راجع البنود المهمة قبل اعتماد عرض السعر." },
                  { icon: Hammer, title: "تنفيذ داخل الرياض", text: "خدمات تشطيب، ترميم، عظم، وتسليم مفتاح." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <item.icon className="h-7 w-7 text-gold-700 mb-3" />
                    <h3 className="font-extrabold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-7 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-gold hover:bg-gold/90 text-black font-extrabold py-6 px-7">
                  <a href="/create-account?source=offers-section">
                    إنشاء حساب للاستفادة من العروض
                    <UserPlus className="h-5 w-5 mr-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-dark/20 py-6 px-7 font-bold">
                  <a href={whatsappUrl("السلام عليكم، أريد الاستفسار عن عروض بنيان الهرم الحالية للمشاريع الجديدة داخل الرياض.")} target="_blank" rel="noopener noreferrer">
                    استفسار واتساب
                    <Phone className="h-5 w-5 mr-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords / service coverage */}
      <section className="py-16 bg-[#f7f5ef]">
        <div className="container-custom">
          <div className="rounded-[2rem] border border-black/10 bg-dark text-white overflow-hidden">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
              <div className="p-7 md:p-10 bg-black/25 border-b lg:border-b-0 lg:border-l border-white/10">
                <Home className="h-10 w-10 text-gold mb-4" />
                <h2 className="text-3xl font-extrabold mb-4">كلمات بحث تخدم العميل</h2>
                <p className="text-white/70 leading-8">
                  تم بناء صفحة العروض لتخدم نية الباحث عن العروض والخصومات، وتربطها بخدمات حقيقية داخل موقع الشركة.
                </p>
              </div>
              <div className="p-7 md:p-10">
                <div className="flex flex-wrap gap-3">
                  {serviceKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-white/80">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <a href="/villa-finishing-riyadh" className="rounded-2xl bg-white/8 hover:bg-white/12 border border-white/10 p-5 transition">
                    <Hammer className="h-7 w-7 text-gold mb-3" />
                    <h3 className="font-bold mb-2">تشطيب فلل بالرياض</h3>
                    <p className="text-sm text-white/60 leading-7">خدمات تشطيب وتسليم مفتاح مع ربط مباشر بالعروض.</p>
                  </a>
                  <a href="/villa-renovation-riyadh" className="rounded-2xl bg-white/8 hover:bg-white/12 border border-white/10 p-5 transition">
                    <Home className="h-7 w-7 text-gold mb-3" />
                    <h3 className="font-bold mb-2">ترميم فلل ومنازل</h3>
                    <p className="text-sm text-white/60 leading-7">عروض تساعد العميل قبل قرار الترميم أو إعادة التأهيل.</p>
                  </a>
                  <a href="/construction-company-riyadh" className="rounded-2xl bg-white/8 hover:bg-white/12 border border-white/10 p-5 transition">
                    <ShieldCheck className="h-7 w-7 text-gold mb-3" />
                    <h3 className="font-bold mb-2">شركة مقاولات بالرياض</h3>
                    <p className="text-sm text-white/60 leading-7">ربط العروض بالثقة والخدمات الأساسية للشركة.</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            eyebrow="الأسئلة الشائعة"
            title="أسئلة مهمة قبل الاستفادة من العروض"
            description="إجابات مختصرة تساعدك على فهم شروط العروض قبل التواصل أو إنشاء الحساب."
          />

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-extrabold text-xl mb-3 text-dark">{item.question}</h3>
                <p className="text-gray-600 leading-8">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-dark text-white">
        <div className="container-custom">
          <div className="rounded-[2rem] border border-gold/25 bg-gradient-to-l from-gold/20 via-white/5 to-transparent p-7 md:p-10 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div>
              <p className="text-gold font-bold mb-2">ابدأ الآن</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                استفد من العرض قبل نهاية {END_DATE}
              </h2>
              <p className="text-white/70 leading-8 max-w-2xl">
                أنشئ حسابك، احسب تكلفة مشروعك، أو تواصل معنا لمعرفة العرض الأنسب لنطاق عملك داخل الرياض.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild className="bg-gold hover:bg-gold/90 text-black font-extrabold py-6 px-7 w-full sm:w-auto">
                <a href="/create-account?source=offers-final">
                  إنشاء حساب
                  <UserPlus className="h-5 w-5 mr-2" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white py-6 px-7 w-full sm:w-auto">
                <a href={whatsappUrl("السلام عليكم، أريد الاستفادة من عروض بنيان الهرم للمقاولات الحالية.")} target="_blank" rel="noopener noreferrer">
                  واتساب مباشر
                  <Phone className="h-5 w-5 mr-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
