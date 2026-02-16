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

    return () => {
      document.head.removeChild(meta);
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
            ننفّذ أعمال <span className="text-gold font-bold">بناء فلل عظم بالرياض</span>{" "}
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
