import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ContractorAlMalqaRiyadh() {
  useEffect(() => {
    document.title = "مقاول تشطيب وبناء في حي الملقا بالرياض | بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة مقاولات في حي الملقا بالرياض لتنفيذ تشطيب فلل، بناء عظم، ترميم وتجديد حسب المعاينة. إشراف هندسي والتزام بالوقت. تواصل واتساب الآن.";
    document.head.appendChild(meta);

    // Service Schema (Page-specific)
    const serviceSchema = document.createElement("script");
    serviceSchema.type = "application/ld+json";
    serviceSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "مقاول تشطيب وبناء في حي الملقا بالرياض",
      "serviceType": "Villa finishing / Bone construction / Renovation",
      "url": "https://www.pybcco.com/contractor-almalqa-riyadh",
      "areaServed": { "@type": "Place", "name": "Al Malqa, Riyadh" },
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

  // ✅ ضع صور مشاريع الملقا هنا (اختياري)
  // إذا ما عندك صور حالياً، اترك القائمة فاضية وسيظهر نص بديل
  const gallery: string[] = [
    // مثال:
    // "/images/projects/almalqa-1.jpg",
    // "/images/projects/almalqa-2.jpg",
    // "/images/projects/almalqa-3.jpg",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO (full width background image + content) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background image */}
        <img
          src="/images/almalqa.jpg"
          alt="مقاول تشطيب وبناء في حي الملقا بالرياض"
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
            مقاول تشطيب وبناء في حي الملقا بالرياض
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            نقدم خدمات <span className="text-gold font-bold">تشطيب الفلل</span>{" "}
            و<span className="text-gold font-bold">بناء العظم</span>{" "}
            و<span className="text-gold font-bold">الترميم والتجديد</span> في{" "}
            <span className="text-gold font-bold">حي الملقا</span> بالرياض حسب
            المعاينة، مع إشراف هندسي كامل والتزام بالوقت وجودة التنفيذ.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("request_free_inspection_almalqa");
                window.location.href =
                  "https://wa.me/966550604837?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9%20%D9%84%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8%20%D8%A3%D9%88%20%D8%A8%D9%86%D8%A7%D8%A1%20%D9%81%D9%8A%D9%84%D8%A7%20%D9%81%D9%8A%20%D8%AD%D9%8A%20%D8%A7%D9%84%D9%85%D9%84%D9%82%D8%A7%20%D8%A8%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6";
              }}
            >
              طلب معاينة مجانية (واتساب)
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => {
                track("call_from_almalqa_page");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>
          </div>

          {/* Cards داخل الهيرو */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">
                خبرة في فلل شمال الرياض
              </h3>
              <p className="text-white/80">
                نفهم متطلبات فلل حي الملقا من حيث الجودة، والتفاصيل، ومستوى المواد
                والتشطيبات.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">تسعير واضح</h3>
              <p className="text-white/80">
                احسب تكلفة مشروعك ثم أرسل التفاصيل لنا عبر واتساب للحصول على عرض
                سعر نهائي.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">إشراف هندسي</h3>
              <p className="text-white/80">
                متابعة جودة التنفيذ والالتزام بالمواصفات حتى التسليم النهائي.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">التزام بالوقت</h3>
              <p className="text-white/80">
                خطة واضحة وجدول زمني وتقارير متابعة لضمان سير العمل بانتظام.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدماتنا في <span className="text-gold">حي الملقا</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب فلل (تجاري / قياسي / فاخر) حسب مستوى المواد والمواصفات",
            "تنفيذ بناء عظم ومتابعة مراحل التنفيذ حتى التسليم",
            "ترميم وتجديد فلل حسب حالة المبنى والمعاينة الميدانية",
            "دهانات داخلية وخارجية + معالجات تشققات حسب الحاجة",
            "جبس بورد وديكورات وإصلاحات أسقف حسب التصميم",
            "أعمال كهرباء وسباكة وتجديد نقاط (حسب المعاينة)",
            "عزل أسطح ودورات مياه ومعالجة تسربات (حسب التشخيص)",
            "أعمال خارجية (بلاط، أرصفة، واجهات) حسب متطلبات المشروع",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-right"
            >
              <div className="text-white/85 leading-relaxed">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING / CALCULATOR CTA */}
      <section className="container mx-auto px-4 pb-14">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            احسب تكلفة <span className="text-gold">تشطيب فيلتك</span> في الملقا
          </h2>

          <p className="mt-3 text-white/70 max-w-3xl mx-auto">
            استخدم حاسبة الأسعار الذكية لمعرفة التكلفة التقديرية حسب المساحة
            والمستوى، ثم أرسل الملخص لنا على واتساب.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() => {
                track("open_calculator_from_almalqa");
                window.location.href = "/villa-finishing-price-riyadh";
              }}
            >
              افتح الحاسبة الآن
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => {
                track("whatsapp_click_almalqa_pricing");
                window.location.href = "https://wa.me/966550604837";
              }}
            >
              واتساب الآن
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY (اختياري) */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صور من أعمالنا في <span className="text-gold">الملقا</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          هذه نماذج مختارة من أعمالنا. إذا رغبت، أرسل لنا صور مشروعك على واتساب
          لنحدد نطاق العمل بشكل أدق.
        </p>

        {gallery.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`مشروع في حي الملقا ${i + 1}`}
                  className="w-full h-56 object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/70">
            لم يتم إضافة صور خاصة بالملقا بعد. (يمكننا إضافتها لاحقاً بسهولة)
          </div>
        )}
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صفحات مهمة <span className="text-gold">قبل التواصل</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "مناطق عملنا في الرياض", href: "/service-areas-riyadh" },
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
          <h3 className="text-2xl font-bold">جاهز تبدأ مشروعك في الملقا؟</h3>
          <p className="mt-3 text-white/70">
            أرسل المساحة ونوع العمل (تشطيب/عظم/ترميم) وسنحدد موعد معاينة مجانية.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() => {
                track("whatsapp_click_almalqa_bottom");
                window.location.href = "https://wa.me/966550604837";
              }}
            >
              واتساب الآن
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => {
                track("call_from_almalqa_page_bottom");
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
