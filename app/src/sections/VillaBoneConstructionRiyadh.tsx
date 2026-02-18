import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VillaBoneConstructionRiyadh() {
  useEffect(() => {
    document.title =
      "مقاول عظم بالرياض | بناء فلل عظم بإشراف هندسي - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "مقاول عظم بالرياض لبناء فلل عظم حسب المخططات والمواصفات، إشراف هندسي كامل، التزام بالجدول الزمني وجودة التنفيذ. تواصل الآن مع بنيان الهرم.";
    document.head.appendChild(meta);

    // ✅ FAQ Schema (SEO)
    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "ما المقصود ببناء عظم للفلل؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "بناء العظم هو تنفيذ الهيكل الإنشائي للفيلا حسب المخططات، ويشمل أعمال الحفر والقواعد والميدات والأعمدة والأسقف وجدران البلوك وتجهيز المبنى لمرحلة التشطيب.",
          },
        },
        {
          "@type": "Question",
          name: "هل تنفذون بناء العظم حسب المخططات والمواصفات؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، يتم تنفيذ العظم حسب المخططات المعتمدة والمواصفات المطلوبة، مع متابعة جودة مستمرة والتزام بنقاط الاستلام لكل مرحلة.",
          },
        },
        {
          "@type": "Question",
          name: "هل يوجد إشراف هندسي على بناء العظم؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، لدينا إشراف هندسي ومراقبة تنفيذ لضبط الجودة والالتزام بالمخططات والمواد والجدول الزمني حتى تسليم العظم.",
          },
        },
        {
          "@type": "Question",
          name: "كم مدة بناء العظم لفيلا في الرياض؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تختلف المدة حسب مساحة الفيلا وعدد الأدوار ونطاق الأعمال، وغالباً تتراوح بين 6 إلى 16 أسبوع، ويتم تحديد جدول زمني بعد المعاينة ومراجعة المخططات.",
          },
        },
        {
          "@type": "Question",
          name: "هل يشمل بناء العظم العزل؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يشمل العزل الأساسي حسب المواصفات ونطاق المشروع، ويتم تحديد تفاصيل العزل المطلوب بعد المعاينة ومراجعة المخططات.",
          },
        },
        {
          "@type": "Question",
          name: "كيف يتم تسعير بناء العظم؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "يتم التسعير بناءً على المساحة ونوع الهيكل وعدد الأدوار والمواصفات ونطاق الأعمال، ويتم تثبيت السعر النهائي بعد الاطلاع على المخططات والمعاينة.",
          },
        },
      ],
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(faqSchema);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/VillaBoneConstructionRiyadh.jpg"
          alt="بناء فلل عظم بالرياض"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Gold Glow */}
        <div
          className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 158, 11, 0.25), transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
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
              variant="secondary"
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

      {/* ✅ FAQ VISIBLE (قبل الروابط الداخلية) */}
      <section className="container mx-auto px-4 pb-14 text-right max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول <span className="text-gold">بناء العظم بالرياض</span>
        </h2>

        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          <div>
            <h3 className="font-bold text-white mb-2">
              ما المقصود ببناء عظم للفلل؟
            </h3>
            <p>
              بناء العظم هو تنفيذ الهيكل الإنشائي للفيلا حسب المخططات، ويشمل أعمال
              الحفر والقواعد والميدات والأعمدة والأسقف وجدران البلوك وتجهيز المبنى
              لمرحلة التشطيب.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل تنفذون بناء العظم حسب المخططات والمواصفات؟
            </h3>
            <p>
              نعم، يتم تنفيذ العظم حسب المخططات المعتمدة والمواصفات المطلوبة، مع
              متابعة جودة مستمرة والتزام بنقاط الاستلام لكل مرحلة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل يوجد إشراف هندسي على بناء العظم؟
            </h3>
            <p>
              نعم، لدينا إشراف هندسي ومراقبة تنفيذ لضبط الجودة والالتزام بالمخططات
              والمواد والجدول الزمني حتى تسليم العظم.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              كم مدة بناء العظم لفيلا في الرياض؟
            </h3>
            <p>
              تختلف المدة حسب مساحة الفيلا وعدد الأدوار ونطاق الأعمال، وغالباً
              تتراوح بين 6 إلى 16 أسبوع، ويتم تحديد جدول زمني بعد المعاينة ومراجعة
              المخططات.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل يشمل بناء العظم العزل؟
            </h3>
            <p>
              يشمل العزل الأساسي حسب المواصفات ونطاق المشروع، ويتم تحديد تفاصيل
              العزل المطلوب بعد المعاينة ومراجعة المخططات.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">كيف يتم تسعير بناء العظم؟</h3>
            <p>
              يتم التسعير بناءً على المساحة ونوع الهيكل وعدد الأدوار والمواصفات
              ونطاق الأعمال، ويتم تثبيت السعر النهائي بعد الاطلاع على المخططات
              والمعاينة.
            </p>
          </div>
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
