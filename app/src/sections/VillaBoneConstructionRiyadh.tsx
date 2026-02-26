import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom"

const BONE_FAQS = [
  {
    q: "ما المقصود ببناء عظم للفلل؟",
    a: "بناء العظم هو تنفيذ الهيكل الإنشائي للفيلا حسب المخططات، ويشمل أعمال الحفر والقواعد والميدات والأعمدة والأسقف وجدران البلوك وتجهيز المبنى لمرحلة التشطيب.",
  },
  {
    q: "هل تنفذون بناء العظم حسب المخططات والمواصفات؟",
    a: "نعم، يتم تنفيذ العظم حسب المخططات المعتمدة والمواصفات المطلوبة، مع متابعة جودة مستمرة والتزام بنقاط الاستلام لكل مرحلة.",
  },
  {
    q: "هل يوجد إشراف هندسي على بناء العظم؟",
    a: "نعم، لدينا إشراف هندسي ومراقبة تنفيذ لضبط الجودة والالتزام بالمخططات والمواد والجدول الزمني حتى تسليم العظم.",
  },
  {
    q: "كم مدة بناء العظم لفيلا في الرياض؟",
    a: "تختلف المدة حسب مساحة الفيلا وعدد الأدوار ونطاق الأعمال، وغالباً تتراوح بين 6 إلى 16 أسبوع، ويتم تحديد جدول زمني بعد المعاينة ومراجعة المخططات.",
  },
  {
    q: "هل يشمل بناء العظم العزل؟",
    a: "يشمل العزل الأساسي حسب المواصفات ونطاق المشروع، ويتم تحديد تفاصيل العزل المطلوب بعد المعاينة ومراجعة المخططات.",
  },
  {
    q: "كيف يتم تسعير بناء العظم؟",
    a: "يتم التسعير بناءً على المساحة ونوع الهيكل وعدد الأدوار والمواصفات ونطاق الأعمال، ويتم تثبيت السعر النهائي بعد الاطلاع على المخططات والمعاينة.",
  },
];

export default function VillaBoneConstructionRiyadh() {
  const title = "مقاول عظم بالرياض | بناء فلل عظم بإشراف هندسي - بنيان الهرم";
  const description =
    "مقاول عظم بالرياض لبناء فلل عظم حسب المخططات والمواصفات، إشراف هندسي كامل، التزام بالجدول الزمني وجودة التنفيذ. تواصل الآن مع بنيان الهرم.";
  const canonical = "https://pybcco.com/villa-bone-construction-riyadh";
  const ogImage = "https://pybcco.com/images/VillaBoneConstructionRiyadh.webp";

  const jsonLd = [
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "بناء فلل عظم بالرياض",
      serviceType: "Villa shell construction (Bone Construction)",
      areaServed: { "@type": "City", name: "Riyadh" },
      provider: {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        name: "PYBCCO – بنيان الهرم للمقاولات",
        url: "https://pybcco.com",
        telephone: "+966550604837",
      },
      url: canonical,
    },
    // FAQ Schema (مطابق للـ FAQ الظاهر)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: BONE_FAQS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        ogType="website"
        twitterCard="summary_large_image"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/images/VillaBoneConstructionRiyadh.webp"
          alt="بناء فلل عظم بالرياض"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div
          className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 158, 11, 0.25), transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10 pt-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
            مقاول عظم بالرياض لبناء فلل عظم بإشراف هندسي
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ننفّذ أعمال{" "}
            <span className="text-gold font-bold">بناء فلل عظم بالرياض</span>{" "}
            حسب المخططات والمواصفات، مع إشراف هندسي كامل ومتابعة جودة مستمرة.
            التزام بالجدول الزمني وتنفيذ احترافي يضمن لك قاعدة قوية قبل التشطيب.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-white text-black font-bold px-8 py-6 text-lg"
              onClick={() =>
                (window.location.href =
                  "https://wa.me/966550604837?text=أرغب%20بعرض%20سعر%20لبناء%20فيلا%20عظم%20بالرياض")
              }
            >
              طلب معاينة مجانية
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT INCLUDED */}
      <section className="container mx-auto px-4 py-14 text-right max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          ماذا يشمل <span className="text-gold">بناء العظم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "أعمال الحفر وتجهيز الموقع",
            "صب القواعد والميدات حسب المخطط",
            "الأعمدة والأسقف الخرسانية",
            "جدران البلوك وتقسيمات العظم",
            "العزل الأساسي حسب المواصفات",
            "متابعة التنفيذ حتى جاهزية التشطيب",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-white/85 leading-relaxed">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT TRACKING SYSTEM LINK */}
<section className="container mx-auto px-4 pb-10 text-right max-w-5xl">
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <h2 className="text-xl sm:text-2xl font-bold text-gold">
      ميزة إضافية: نظام متابعة رقمي كامل لمشروعك
    </h2>

    <p className="mt-4 text-white/80 leading-relaxed">
      في PYBCCO جميع مشاريعنا تُدار عبر{" "}
      <Link
        to="/project-tracking-system-riyadh"
        className="text-gold font-bold hover:underline"
      >
        نظام متابعة رقمي احترافي
      </Link>{" "}
      يضمن الشفافية الكاملة في كل مرحلة من مراحل التنفيذ، مع توثيق الدفعات والعقود
      والتحديثات بالصور ضمن حساب العميل.
    </p>
  </div>
</section>

      {/* FAQ VISIBLE */}
      <section className="container mx-auto px-4 pb-14 text-right max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول <span className="text-gold">بناء العظم بالرياض</span>
        </h2>

        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          {BONE_FAQS.map((x, i) => (
            <div key={i}>
              <h3 className="font-bold text-white mb-2">{x.q}</h3>
              <p>{x.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات أخرى في <span className="text-gold">الرياض</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "مقاول ترميم منازل بالرياض", href: "/home-renovation-company-riyadh" },
          ].map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-1 text-white/70 text-sm">اضغط لعرض التفاصيل</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

