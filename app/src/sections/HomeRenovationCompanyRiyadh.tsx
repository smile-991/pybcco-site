import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

const HOME_RENOVATION_FAQS = [
  {
    q: "ما الفرق بين ترميم منزل وتجديد منزل؟",
    a: "الترميم يركز على إصلاح الأعطال ومعالجة التشققات والرطوبة وإعادة التأهيل، بينما التجديد يشمل تحديث الديكورات والتشطيبات وقد يتضمن تغيير مطابخ وحمامات وأرضيات.",
  },
  {
    q: "هل تقدمون معاينة مجانية داخل الرياض؟",
    a: "نعم، نوفر معاينة وتقييم مجاني داخل الرياض لتحديد حالة المنزل ونطاق الأعمال ثم تقديم عرض سعر واضح حسب المعاينة.",
  },
  {
    q: "ما هي الأعمال التي تشملها خدمة ترميم المنازل؟",
    a: "تشمل عادة إصلاح التشققات، معالجة الرطوبة والتسربات، دهانات داخلية وخارجية، جبس وإصلاحات أسقف، وتحديث مطابخ وحمامات وأرضيات حسب الحاجة.",
  },
  {
    q: "هل يمكن ترميم جزء محدد فقط من المنزل؟",
    a: "نعم، يمكن تنفيذ ترميم جزئي مثل معالجة رطوبة، دهانات، إصلاح جبس، تجديد حمام أو مطبخ، أو تغيير أرضيات حسب الاتفاق.",
  },
  {
    q: "كم مدة ترميم المنزل عادة؟",
    a: "تختلف حسب مساحة المنزل ونطاق الأعمال، وغالباً تتراوح بين عدة أيام إلى عدة أسابيع، ويتم تحديد جدول زمني بعد المعاينة.",
  },
  {
    q: "هل يوجد إشراف هندسي على أعمال الترميم؟",
    a: "نعم، لدينا إشراف هندسي ومراقبة جودة لضبط التنفيذ والمواد والالتزام بالمواصفات حتى التسليم.",
  },
];

export default function HomeRenovationCompanyRiyadh() {
  const title = "شركة ترميم منازل بالرياض | تجديد وصيانة شاملة - بنيان الهرم";
  const description =
    "شركة ترميم منازل بالرياض تقدم خدمات تجديد شامل، إصلاح تشققات، دهانات، جبس، سباكة وكهرباء حسب المعاينة. إشراف هندسي وجودة تنفيذ عالية.";
  const canonical = "https://pybcco.com/home-renovation-company-riyadh";
  const ogImage = "https://pybcco.com/images/home-renovation-hero.webp";

  const jsonLd = [
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "ترميم منازل بالرياض",
      serviceType: "Home renovation / Home maintenance / Refurbishment",
      url: canonical,
      areaServed: { "@type": "City", name: "Riyadh" },
      provider: {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        name: "PYBCCO – بنيان الهرم للمقاولات",
        telephone: "+966550604837",
        url: "https://pybcco.com",
      },
    },

    // FAQ Schema (مطابق للـFAQ الظاهر)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_RENOVATION_FAQS.map((x) => ({
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
          src="/images/home-renovation-hero.webp"
          alt="ترميم منازل بالرياض"
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
            شركة ترميم منازل بالرياض وتجديد شامل
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            تقدم{" "}
            <a href="/" className="text-gold font-bold hover:underline">
              بنيان الهرم للمقاولات
            </a>{" "}
            خدمات ترميم منازل بالرياض تشمل معالجة التشققات، إصلاح الأضرار، تجديد
            الواجهات، وتحديث كامل للمنازل القديمة بإشراف هندسي وجودة تنفيذ عالية.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => (window.location.href = "https://wa.me/966550604837")}
            >
              واتساب الآن
            </Button>
          </div>

          {/* Services card inside hero */}
          <section className="container mx-auto px-4 mt-8 max-w-4xl relative z-20">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gold mb-4 text-right">
                خدمات ترميم المنازل تشمل:
              </h2>

              <ul className="space-y-3 text-white/80 text-right">
                <li>✔️ إصلاح تشققات الجدران والأسقف</li>
                <li>✔️ معالجة رطوبة وتسربات</li>
                <li>✔️ تجديد دهانات وواجهات</li>
                <li>✔️ تحديث مطابخ وحمامات</li>
                <li>✔️ إعادة تأهيل كاملة حسب حالة المنزل</li>
              </ul>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ VISIBLE */}
      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول{" "}
          <span className="text-gold">ترميم المنازل بالرياض</span>
        </h2>

        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          {HOME_RENOVATION_FAQS.map((x, i) => (
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

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          تفضل تصفّح صفحاتنا الأخرى المرتبطة بالتشطيب والترميم وبناء العظم:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
          ].map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-gold/30 transition text-right"
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

