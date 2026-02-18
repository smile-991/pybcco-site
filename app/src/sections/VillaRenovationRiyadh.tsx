import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VillaRenovationRiyadh() {
  useEffect(() => {
    document.title = "ترميم فلل بالرياض | صيانة وتجديد شامل - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "ترميم فلل بالرياض وتجديد شامل (دهانات، جبس، أرضيات، سباكة، كهرباء، عزل) حسب المعاينة. إشراف هندسي والتزام بالوقت. اطلب معاينة مجانية الآن.";
    document.head.appendChild(meta);

    // Service Schema (Page-specific)
    const serviceSchema = document.createElement("script");
    serviceSchema.type = "application/ld+json";
    serviceSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "ترميم فلل بالرياض",
      "serviceType": "Villa renovation / Maintenance / Refurbishment",
      "url": "https://www.pybcco.com/villa-renovation-riyadh",
      "areaServed": { "@type": "City", "name": "Riyadh" },
      "provider": {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        "name": "PYBCCO – بنيان الهرم للمقاولات",
        "url": "https://www.pybcco.com/",
        "telephone": "+966550604837",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Washm St, Al Murabba",
          "addressLocality": "Riyadh",
          "postalCode": "12345",
          "addressCountry": "SA"
        }
      }
    });
    document.head.appendChild(serviceSchema);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(serviceSchema);
    };
  }, []);

  const track = (eventName: string) => {
    // Optional Analytics event tracking if gtag exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") w.gtag("event", eventName);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO (full width background image + content) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background image */}
        <img
          src="/images/VillaRenovationRiyadh.jpg"
          alt="ترميم فلل بالرياض"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Optional gold glow */}
        <div
          className="absolute inset-0 opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top, rgba(245, 158, 11, 0.25), transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold text-center">
            ترميم فلل بالرياض وتجديد شامل حسب المعاينة
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            نقدم خدمات <span className="text-gold font-bold">ترميم الفلل بالرياض</span>{" "}
            وتجديدها بالكامل حسب حالة المبنى والمعاينة الميدانية، مع إشراف هندسي كامل
            والتزام بالوقت وجودة التنفيذ. نخدم جميع أحياء الرياض وننفذ أعمال الترميم
            الداخلية والخارجية من الصفر حتى التسليم.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("request_free_inspection");
                window.location.href =
                  "https://wa.me/966550604837?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%84%D8%AA%D8%B1%D9%85%D9%8A%D9%85%20%D9%81%D9%8A%D9%84%D8%A7%20%D8%A8%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6";
              }}
            >
              طلب معاينة مجانية (واتساب)
            </Button>

            {/* ✅ صار نفس زر المعاينة */}
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_renovation_page");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>
          </div>

          {/* Cards داخل الهيرو */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">معاينة وتقييم مجاني</h3>
              <p className="text-white/80">
                نحدد نطاق الأعمال ونقدم توصيات واضحة قبل بدء التنفيذ.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">إشراف هندسي</h3>
              <p className="text-white/80">
                مهندسون ومراقبون لضبط الجودة والالتزام بالمواصفات.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">ترميم شامل</h3>
              <p className="text-white/80">
                دهانات، جبس، أرضيات، سباكة، كهرباء، عزل… حسب حالة الفيلا.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">التزام بالوقت</h3>
              <p className="text-white/80">
                خطة واضحة وجدول زمني وتقارير متابعة حتى التسليم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">ترميم الفلل</span> التي نقدمها
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "ترميم واجهات وتشطيبات خارجية",
            "صيانة ومعالجة رطوبة وتسربات (حسب التشخيص)",
            "دهانات داخلية وخارجية + معالجات تشققات",
            "جبس بورد وديكورات وإصلاحات أسقف",
            "أعمال كهرباء وسباكة وتجديد نقاط (حسب المعاينة)",
            "عزل أسطح ودورات مياه (حسب الحاجة)",
            "تغيير أرضيات وسيراميك وبلاط",
            "إعادة تأهيل حمامات ومطابخ وتجديد كامل",
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-right">
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

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          إذا مشروعك يحتاج تشطيب أو بناء عظم أو مقارنة أسعار، تفضل الصفحات التالية:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
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
          <h3 className="text-2xl font-bold">جاهز ترمم فيلتك؟</h3>
          <p className="mt-3 text-white/70">
            اطلب معاينة مجانية، ونحدد نطاق الأعمال ونقدم عرض سعر واضح حسب حالة الفيلا.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() => (window.location.href = "https://wa.me/966550604837")}
            >
              واتساب الآن
            </Button>

            {/* ✅ صار نفس زر واتساب */}
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_renovation_page_bottom");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
