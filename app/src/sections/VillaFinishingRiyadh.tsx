import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VillaFinishingRiyadh() {
  useEffect(() => {
    document.title = "تشطيب فلل بالرياض | شركة بنيان الهرم للمقاولات";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة تشطيب فلل بالرياض تسليم مفتاح، عمالة على الكفالة، إشراف هندسي كامل، أسعار تبدأ من 450 ريال للمتر. تواصل الآن مع بنيان الهرم.";
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
          name: "كم سعر تشطيب الفلل في الرياض؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تبدأ أسعار تشطيب الفلل في الرياض من 450 ريال للمتر للمستوى التجاري، وتختلف حسب المساحة ونوع المواد ومستوى التشطيب المطلوب.",
          },
        },
        {
          "@type": "Question",
          name: "هل تقدمون تشطيب تسليم مفتاح؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، نقدم تشطيب فلل تسليم مفتاح من البداية حتى التسليم النهائي مع إشراف هندسي ومتابعة تنفيذ.",
          },
        },
        {
          "@type": "Question",
          name: "هل لديكم إشراف هندسي ومراقبين؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، لدينا فريق إشراف هندسي ومراقبين لضبط الجودة والالتزام بالمواصفات وجدول التنفيذ.",
          },
        },
        {
          "@type": "Question",
          name: "هل العمالة على الكفالة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، نملك عمالة نظامية على الكفالة لضمان الاستقرار وجودة التنفيذ وسرعة الإنجاز.",
          },
        },
        {
          "@type": "Question",
          name: "كم مدة تشطيب الفيلا عادة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تختلف المدة حسب مساحة الفيلا ومستوى التشطيب، وغالباً تتراوح بين 4 إلى 12 أسبوع حسب نطاق الأعمال وتوفر المواد.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكن تنفيذ تشطيب جزئي فقط؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، يمكن تنفيذ أعمال تشطيب جزئي مثل الدهانات أو الجبس أو الأرضيات أو الكهرباء والسباكة حسب الاتفاق.",
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
    <div className="min-h-screen bg-black text-white">
      {/* HERO (full width background image + content) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background image */}
        <img
          src="/images/VillaFinishingRiyadh.jpg"
          alt="تشطيب فلل بالرياض"
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
            تشطيب فلل بالرياض باحترافية عالية وتسليم مفتاح
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            نقدم خدمات تشطيب فلل بالرياض بأعلى معايير الجودة والاحتراف، مع إشراف
            هندسي كامل وطاقم مراقبين متخصصين. ننفذ أعمال التشطيب الداخلي والخارجي
            وتسليم مفتاح بأسعار تبدأ من
            <span className="text-gold font-bold"> 450 ريال للمتر</span>
            حسب نوع المواد ومتطلبات العميل.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصل الآن
            </Button>

            {/* ✅ FIX: كان variant="outline" يطلع خلفية بيضاء */}
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() =>
                (window.location.href = "https://wa.me/966550604837")
              }
            >
              واتساب
            </Button>
          </div>

          {/* Cards داخل الهيرو */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">
                عمالة على الكفالة
              </h3>
              <p className="text-white/80">
                نمتلك عمالة نظامية مدربة تضمن جودة التنفيذ وسرعة الإنجاز.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">
                إشراف هندسي كامل
              </h3>
              <p className="text-white/80">
                فريق مهندسين ومراقبين يتابع المشروع خطوة بخطوة حتى التسليم.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">تسليم مفتاح</h3>
              <p className="text-white/80">
                تنفيذ كامل من العظم حتى التشطيب النهائي بدون الحاجة لتعدد المقاولين.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">أسعار مرنة</h3>
              <p className="text-white/80">
                خيارات متعددة تناسب ميزانية العميل مع مرونة في اختيار المواد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          لماذا <span className="text-gold">بنيان الهرم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "تسليم مفتاح", desc: "من العظم إلى التشطيب النهائي وتسليم جاهز للسكن." },
            { title: "عمالة على الكفالة", desc: "استقرار وجودة تنفيذ بدون مفاجآت وتبديل مستمر." },
            { title: "إشراف هندسي", desc: "مهندسون ومراقبون لضبط الجودة والالتزام." },
            { title: "أسعار مرنة", desc: "خيارات متعددة حسب المواد ورغبة العميل." },
            { title: "سرعة وتنظيم", desc: "خطة زمنية واضحة وتقارير متابعة." },
            { title: "جودة تشطيب عالية", desc: "تفاصيل تنفيذ نظيفة ومعايير تشطيب ممتازة." },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-lg font-bold">{x.title}</div>
              <div className="mt-2 text-white/70 leading-relaxed">{x.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <p className="mt-8 text-white/60 text-center max-w-4xl mx-auto">
        نحن{" "}
        <a
          href="/construction-company-riyadh"
          className="text-gold font-bold hover:underline"
        >
          شركة مقاولات بالرياض
        </a>{" "}
        نقدم خدمات تشطيب فلل، ترميم مباني، بناء عظم، وصيانة عامة، مع التزام كامل
        بالجودة والجدول الزمني.
      </p>

      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدماتنا في <span className="text-gold">تشطيب الفلل</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب داخلي كامل (دهانات، جبس، أرضيات، أبواب)",
            "تشطيب خارجي وواجهات",
            "ترميم وصيانة الفلل والمباني",
            "أعمال سباكة وكهرباء وتكييف (حسب الاتفاق)",
            "إدارة كامل المشروع + توريد مواد حسب رغبة العميل",
            "تسليم مفتاح مع إشراف هندسي",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-white/80">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FAQ VISIBLE (قبل الروابط الداخلية) */}
      <section className="container mx-auto px-4 pb-14 text-right max-w-4xl" dir="rtl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول <span className="text-gold">تشطيب الفلل بالرياض</span>
        </h2>

        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          <div>
            <h3 className="font-bold text-white mb-2">
              كم سعر تشطيب الفلل في الرياض؟
            </h3>
            <p>
              تبدأ أسعار تشطيب الفلل في الرياض من 450 ريال للمتر للمستوى التجاري،
              وتختلف حسب المساحة ونوع المواد ومستوى التشطيب المطلوب.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل تقدمون تشطيب تسليم مفتاح؟
            </h3>
            <p>
              نعم، نقدم تشطيب فلل تسليم مفتاح من البداية حتى التسليم النهائي مع
              إشراف هندسي ومتابعة تنفيذ.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل لديكم إشراف هندسي ومراقبين؟
            </h3>
            <p>
              نعم، لدينا فريق إشراف هندسي ومراقبين لضبط الجودة والالتزام بالمواصفات
              وجدول التنفيذ.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل العمالة على الكفالة؟
            </h3>
            <p>
              نعم، نملك عمالة نظامية على الكفالة لضمان الاستقرار وجودة التنفيذ وسرعة
              الإنجاز.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              كم مدة تشطيب الفيلا عادة؟
            </h3>
            <p>
              تختلف المدة حسب مساحة الفيلا ومستوى التشطيب، وغالباً تتراوح بين 4 إلى 12
              أسبوع حسب نطاق الأعمال وتوفر المواد.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل يمكن تنفيذ تشطيب جزئي فقط؟
            </h3>
            <p>
              نعم، يمكن تنفيذ أعمال تشطيب جزئي مثل الدهانات أو الجبس أو الأرضيات أو
              الكهرباء والسباكة حسب الاتفاق.
            </p>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات أخرى في <span className="text-gold">الرياض</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          إذا بدك تقارن الخدمات أو عندك مشروع مختلف، تفضل تصفّح الصفحات التالية:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
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
          <h3 className="text-2xl font-bold">جاهز تبدأ تشطيب فيلتك؟</h3>
          <p className="mt-3 text-white/70">
            تواصل معنا، ونرتب زيارة ومعاينة، ونقدّم عرض سعر مرن حسب مستوى المواد.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() =>
                (window.location.href = "https://wa.me/966550604837")
              }
            >
              واتساب الآن
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
