import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

const SITE = "https://www.pybcco.com";

const FAQS = [
  {
    q: "ما هي خدمات تشطيب الشقق التي تقدمونها في الرياض؟",
    a: "نقدم تشطيب شقق تسليم مفتاح حسب الاتفاق ويشمل الدهانات، الجبس، الأرضيات، الإضاءة، السباكة والكهرباء وتجهيزات الحمام والمطبخ حسب نطاق العمل.",
  },
  {
    q: "هل تقدمون تشطيب شقق تسليم مفتاح؟",
    a: "نعم، ننفذ تشطيب شقق تسليم مفتاح من البداية حتى التسليم النهائي مع إشراف هندسي وتنظيم كامل للأعمال.",
  },
  {
    q: "كم مدة تشطيب الشقة عادة؟",
    a: "تختلف المدة حسب مساحة الشقة ونطاق الأعمال ومستوى التشطيب، وغالباً تتراوح بين 2 إلى 6 أسابيع، ويتم تحديد جدول زمني بعد المعاينة.",
  },
  {
    q: "هل يمكن تنفيذ تشطيب جزئي فقط للشقة؟",
    a: "نعم، يمكن تنفيذ تشطيب جزئي مثل دهانات فقط، جبس فقط، أرضيات فقط، أو تحديث حمام/مطبخ حسب الاتفاق.",
  },
  {
    q: "هل يوجد إشراف هندسي على تشطيب الشقق؟",
    a: "نعم، لدينا إشراف هندسي ومراقبة جودة لضبط التنفيذ والمواد والالتزام بالمواصفات حتى التسليم.",
  },
  {
    q: "كيف يتم تحديد تكلفة تشطيب الشقة؟",
    a: "تتحدد التكلفة حسب المساحة ومستوى المواد ونطاق الأعمال (دهانات، جبس، أرضيات، كهرباء، سباكة) ويتم تثبيت السعر النهائي بعد المعاينة وتحديد التفاصيل.",
  },
];

export default function ApartmentFinishingRiyadh() {
  const title = "تشطيب شقق بالرياض | تنفيذ وتسليم مفتاح - بنيان الهرم";
  const description =
    "شركة بنيان الهرم تقدم خدمات تشطيب شقق بالرياض تسليم مفتاح: دهانات، جبس، أرضيات، سباكة وكهرباء حسب الاتفاق. جودة عالية والتزام بالمواعيد. اطلب معاينة الآن.";
  const canonical = `${SITE}/apartment-finishing-riyadh`;
  const ogImage = `${SITE}/images/ApartmentFinishingRiyadh.jpg`;

  const jsonLd = useMemo(() => {
    const webpageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: canonical,
      description,
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "تشطيب شقق بالرياض",
      serviceType: "Apartment finishing / Fit-out / Renovation",
      url: canonical,
      areaServed: { "@type": "City", name: "Riyadh" },
      provider: {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        name: "PYBCCO – بنيان الهرم للمقاولات",
        url: SITE,
        telephone: "+966550604837",
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    };

    return [webpageSchema, serviceSchema, faqSchema];
  }, [canonical, description, title]);

  const WA_NUMBER = "966550604837";
  const waPrefill = (text: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  const track = (eventName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") w.gtag("event", eventName);
  };

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <img
          src="/images/ApartmentFinishingRiyadh.jpg"
          alt="تشطيب شقق بالرياض"
          className="absolute inset-0 h-full w-full object-cover object-center"
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

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
            تشطيب شقق بالرياض تسليم مفتاح
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            نقدم خدمات{" "}
            <span className="text-gold font-bold">تشطيب شقق بالرياض</span> بجودة
            عالية — من الدهانات والأرضيات إلى الأسقف الجبسية والإضاءة — مع{" "}
            <span className="text-gold font-bold">إشراف هندسي</span> وتنفيذ منظم
            يضمن تسليم الشقة جاهزة للسكن.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_apartment_hero");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_apartment_hero");
                window.location.href = waPrefill(
                  "أريد تشطيب شقة بالرياض. المساحة (م²): — عدد الغرف: — المطلوب (تشطيب كامل/جزئي): — المستوى (تجاري/قياسي/فاخر):"
                );
              }}
            >
              واتساب الآن
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              استعرض الخدمات
            </Button>
          </div>

          {/* Cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            {[
              {
                title: "تسليم مفتاح",
                desc: "تنفيذ كامل من البداية حتى التسليم النهائي بدون تشتيت.",
              },
              {
                title: "إشراف هندسي",
                desc: "متابعة جودة التنفيذ والمواد ونقاط الاستلام لكل مرحلة.",
              },
              {
                title: "تشطيب جزئي أو كامل",
                desc: "دهانات / جبس / أرضيات / حمام / مطبخ حسب احتياجك.",
              },
              {
                title: "التزام بالمواعيد",
                desc: "خطة عمل وجدول واضح وتقارير متابعة حتى التسليم.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-gold mb-3">{x.title}</h3>
                <p className="text-white/80">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LONG SEO CONTENT */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto text-right space-y-5 text-white/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            كيف ننجز <span className="text-gold">تشطيب الشقق</span> بشكل منظم؟
          </h2>

          <p>
            تشطيب الشقة لا يعتمد فقط على جمال الشكل، بل على{" "}
            <strong className="text-gold">ترتيب المراحل</strong> وضبط الجودة
            والالتزام بالمواصفات. نحن نبدأ بمعاينة لتحديد نطاق العمل ثم نرتب
            التنفيذ: تجهيزات أولية، أعمال الجبس والدهانات، الأرضيات، الكهرباء
            والسباكة حسب الاتفاق، ثم تسليم نهائي مع ملاحظات استلام.
          </p>

          <p>
            إذا كانت شقتك تحتاج تجديد بعد سكن أو تعديل كامل، قد يناسبك أيضاً صفحة{" "}
            <a
              href="/villa-renovation-riyadh"
              className="text-gold font-bold hover:underline"
            >
              الترميم والتجديد
            </a>{" "}
            (نفس المنهجية لكن نطاق مختلف).
          </p>

          <p>
            ولأخذ تصور مبدئي لتكلفة مشروعك، يمكنك استخدام{" "}
            <a
              href="/villa-finishing-price-riyadh"
              className="text-gold font-bold hover:underline"
            >
              حاسبة الأسعار
            </a>{" "}
            ثم نثبت التفاصيل بعد المعاينة.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">تشطيب الشقق</span> التي نقدمها
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب كامل تسليم مفتاح للشقق السكنية حسب الاتفاق",
            "دهانات داخلية ومعالجات تشققات + تجهيزات قبل الدهان",
            "جبس بورد وأسقف وإضاءة مخفية حسب التصميم",
            "أرضيات (بورسلان/سيراميك/رخام) حسب الاختيار",
            "تجديد حمام/مطبخ (تكسير/تأسيس/تشطيب) حسب الحالة",
            "سباكة وكهرباء وتجديد نقاط حسب نطاق العمل",
            "أبواب وإكسسوارات وتشطيبات نهائية حسب المستوى",
            "تنظيم مراحل الاستلام ومتابعة جودة التنفيذ",
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

      {/* FAQ (VISIBLE + MATCHES SCHEMA) */}
      <section className="container mx-auto px-4 pb-14 text-right max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول{" "}
          <span className="text-gold">تشطيب الشقق بالرياض</span>
        </h2>

        <div className="mt-10 space-y-6">
          {FAQS.map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gold">{x.q}</h3>
              <p className="mt-2 text-white/80 leading-relaxed">{x.a}</p>
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
          تفضل تصفح صفحاتنا الأخرى حسب نوع مشروعك:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "سعر تشطيب المتر بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "شركة ترميم منازل بالرياض", href: "/home-renovation-company-riyadh" },
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
          <h3 className="text-2xl font-bold">جاهز تبدأ تشطيب شقتك؟</h3>
          <p className="mt-3 text-white/70">
            أرسل مساحة الشقة ونوع المطلوب (تشطيب كامل/جزئي) ونرتّب خطة واضحة ونقدّم عرض سعر.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_apartment_bottom");
                window.location.href = waPrefill(
                  "أريد عرض سعر لتشطيب شقة بالرياض. المساحة (م²): — عدد الغرف: — المطلوب: — المستوى:"
                );
              }}
            >
              واتساب الآن
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_apartment_bottom");
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
