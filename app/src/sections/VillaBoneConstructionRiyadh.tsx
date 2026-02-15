import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VillaBoneConstructionRiyadh() {
  useEffect(() => {
    document.title = "مقاول عظم بالرياض | بناء فلل عظم بإشراف هندسي - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "مقاول عظم بالرياض لبناء فلل عظم حسب المخططات والمواصفات، إشراف هندسي كامل، التزام بالجدول الزمني وجودة التنفيذ. تواصل الآن مع بنيان الهرم.";
    document.head.appendChild(meta);

    // Service Schema
    const serviceSchema = document.createElement("script");
    serviceSchema.type = "application/ld+json";
    serviceSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "بناء فلل عظم بالرياض",
      "serviceType": "Villa bone construction",
      "url": "https://www.pybcco.com/villa-bone-construction-riyadh",
      "areaServed": { "@type": "City", "name": "Riyadh" },
      "provider": {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        "name": "PYBCCO – بنيان الهرم للمقاولات",
        "url": "https://www.pybcco.com/",
        "telephone": "+966550604837"
      }
    });
    document.head.appendChild(serviceSchema);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(serviceSchema);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* HERO */}
      <section className="container mx-auto px-4 pt-24 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
          مقاول عظم بالرياض لبناء فلل عظم بإشراف هندسي
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          ننفّذ أعمال <span className="text-gold font-bold">بناء فلل عظم بالرياض</span>{" "}
          حسب المخططات والمواصفات، مع إشراف هندسي كامل ومتابعة جودة مستمرة.
          التزام بالجدول الزمني، وتنفيذ احترافي يضمن لك قاعدة قوية قبل التشطيب.
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
                "https://wa.me/966550604837?text=أرغب%20بعرض%20سعر%20لبناء%20فيلا%20عظم%20بالرياض%20—%20متى%20نقدر%20نرتب%20معاينة؟")
            }
          >
            طلب معاينة مجانية
          </Button>
        </div>
      </section>

      {/* WHAT INCLUDED */}
      <section className="container mx-auto px-4 pb-14 text-right max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          ماذا يشمل <span className="text-gold">بناء العظم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "أعمال الحفر (حسب الحاجة) وتجهيز الموقع",
            "صب القواعد والميدات حسب المخطط",
            "الأعمدة والأسقف الخرسانية (صب وتسليح)",
            "جدران البلوك وتقسيمات العظم",
            "العزل الأساسي (حسب المواصفات)",
            "تنظيم ومتابعة التنفيذ حتى جاهزية التشطيب",
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

      {/* WHY US */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          لماذا <span className="text-gold">بنيان الهرم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {[
            { title: "إشراف هندسي", desc: "متابعة تنفيذ وضبط جودة حسب المخططات." },
            { title: "التزام بالمواصفات", desc: "تنفيذ وفق المواصفات والاشتراطات." },
            { title: "تنظيم وسلامة", desc: "تنظيم الموقع وتقارير متابعة." },
            { title: "سرعة إنجاز", desc: "خطة عمل واضحة وجدول زمني." },
            { title: "خبرة تنفيذ", desc: "فريق عمل ومراقبين لضمان الجودة." },
            { title: "تجهيز للتشطيب", desc: "تسليم عظم مرتب يسهّل مرحلة التشطيب." },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 rounded-2xl"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-2 text-white/70 leading-relaxed">{x.desc}</div>
            </div>
          ))}
        </div>
      </section>
{/* INTERNAL LINKS */}
<section className="container mx-auto px-4 pb-14">
  <h2 className="text-2xl sm:text-3xl font-bold text-center">
    خدمات أخرى في <span className="text-gold">الرياض</span>
  </h2>

  <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
    بعد الانتهاء من العظم، غالباً تحتاج تشطيب أو ترميم أو معرفة الأسعار. تفضل الروابط التالية:
  </p>

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

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">جاهز تبدأ بناء فيلتك عظم؟</h3>
          <p className="mt-3 text-white/70">
            تواصل معنا الآن، ونرتب معاينة مجانية ونقدّم عرض سعر واضح حسب المخطط.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => (window.location.href = "https://wa.me/966550604837")}
            >
              واتساب
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
