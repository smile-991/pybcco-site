import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ContractorAlMalqaRiyadh() {
  useEffect(() => {
  document.title =
    "مقاول تشطيب وبناء في حي الملقا بالرياض | بنيان الهرم PYBCCO";

  const meta = document.createElement("meta");
  meta.name = "description";
  meta.content =
    "مقاول تشطيب وبناء في حي الملقا بالرياض: تشطيب فلل وشقق، بناء عظم، ترميم وتجديد حسب المعاينة. إشراف هندسي، جودة تنفيذ، والتزام بالوقت.";
  document.head.appendChild(meta);

  // Service Schema
  const serviceSchema = document.createElement("script");
  serviceSchema.type = "application/ld+json";
  serviceSchema.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "مقاول تشطيب وبناء في حي الملقا بالرياض",
    areaServed: { "@type": "City", name: "Riyadh" },
    provider: {
      "@type": "LocalBusiness",
      name: "PYBCCO – بنيان الهرم للمقاولات",
      telephone: "+966550604837",
      url: "https://www.pybcco.com"
    }
  });
  document.head.appendChild(serviceSchema);

  // FAQ Schema
  const faqSchema = document.createElement("script");
  faqSchema.type = "application/ld+json";
  faqSchema.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة تشطيب فيلا في حي الملقا بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تختلف التكلفة حسب المساحة ومستوى التشطيب (تجاري، قياسي، فاخر). يمكن استخدام حاسبة الأسعار بالموقع لمعرفة تقدير مبدئي قبل المعاينة."
        }
      },
      {
        "@type": "Question",
        name: "هل تقدمون بناء عظم في حي الملقا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، ننفذ بناء عظم في حي الملقا حسب المخططات المعتمدة مع إشراف هندسي وجودة تنفيذ."
        }
      },
      {
        "@type": "Question",
        name: "هل يوجد معاينة مجانية لمشاريع الملقا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، نوفر معاينة ميدانية مجانية داخل حي الملقا لتحديد نطاق العمل بدقة قبل تقديم عرض السعر."
        }
      },
      {
        "@type": "Question",
        name: "ما مدة تنفيذ مشروع تشطيب في الملقا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "مدة التنفيذ تعتمد على حجم المشروع ونطاق العمل، ويتم تحديد جدول زمني واضح بعد المعاينة."
        }
      }
    ]
  });
  document.head.appendChild(faqSchema);

  return () => {
    document.head.removeChild(meta);
    document.head.removeChild(serviceSchema);
    document.head.removeChild(faqSchema);
  };
}, []);


  const track = (eventName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag === "function") w.gtag("event", eventName);
  };

  const WA_NUMBER = "966550604837";

  const waPrefill = (text: string) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  // ✅ صور الملقا (كما عندك داخل public/images)
  const galleryImages = [
    "/images/almalqa-4.jpg",
    "/images/almalqa-3.jpg",
    "/images/almalqa-1.jpg",
    "/images/almalqa-5.jpg",
    "/images/almalqa-6.jpg",
    "/images/almalqa-2.jpg",
  ];

  const galleryAlt = [
    "تشطيب داخلي فاخر في حي الملقا بالرياض",
    "ديكور داخلي حديث وتشطيب في الملقا بالرياض",
    "تنفيذ تشطيب سقف وديكور في فيلا بحي الملقا",
    "تنفيذ وتشطيب مشروع في حي الملقا شمال الرياض",
    "أعمال هيكل حديد وتجهيزات ضمن مشروع في الملقا",
    "تفاصيل تشطيب وإتقان تنفيذ في حي الملقا بالرياض",
  ];

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background image (Hero) */}
        <img
          src="/images/almalqa.jpg"
          alt="حي الملقا الرياض"
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
            إذا كنت تبحث عن{" "}
            <span className="text-gold font-bold">مقاول في حي الملقا</span>{" "}
            لتنفيذ <span className="text-gold font-bold">تشطيب فلل</span> أو{" "}
            <span className="text-gold font-bold">بناء عظم</span> أو{" "}
            <span className="text-gold font-bold">ترميم وتجديد</span> — نحن في{" "}
            <span className="text-gold font-bold">بنيان الهرم (PYBCCO)</span>{" "}
            ننفذ المشاريع حسب المعاينة وبخطة واضحة، مع إشراف هندسي وجودة تنفيذ
            والتزام بالوقت حتى التسليم.
          </p>

          {/* Top CTA Buttons (3 buttons as requested) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {/* WhatsApp */}
            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("request_free_inspection_almalqa");
                window.location.href = waPrefill(
                  "أريد طلب معاينة مجانية لمشروع في حي الملقا بالرياض. هذه مساحة المشروع (اكتبها) ونوع العمل (تشطيب/عظم/ترميم):"
                );
              }}
            >
              طلب معاينة مجانية (واتساب)
            </Button>

            {/* Direct Call (fixed - no outline) */}
            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("call_from_almalqa_page");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>

            {/* Open Calculator Now (as requested) */}
            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("open_calculator_from_almalqa");
                window.location.href = "/villa-finishing-price-riyadh";
              }}
            >
              افتح الحاسبة الآن
            </Button>
          </div>

          {/* Cards inside hero */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">تسعير واضح</h3>
              <p className="text-white/80">
                نعطيك نطاق تكلفة منطقي حسب المساحة والمستوى والمواصفات بعد
                المعاينة.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">خبرة شمال الرياض</h3>
              <p className="text-white/80">
                نعرف طبيعة مشاريع حي الملقا ومتطلبات التشطيب ومستوى التشطيبات
                المنتشرة فيه.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">إشراف هندسي</h3>
              <p className="text-white/80">
                متابعة جودة التنفيذ والالتزام بالمواصفات من البداية حتى التسليم
                النهائي.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-gold/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gold mb-3">التزام بالوقت</h3>
              <p className="text-white/80">
                جدول واضح وتقارير متابعة لضمان سير العمل بشكل منظم ودقيق.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO LONG CONTENT (Strong + Long) */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          لماذا يختار سكان <span className="text-gold">حي الملقا</span> بنيان الهرم؟
        </h2>

        <div className="mt-8 max-w-5xl mx-auto text-right space-y-5 text-white/80 leading-relaxed">
          <p>
            حي الملقا من أحياء شمال الرياض المعروفة بمستوى مشاريعها وتنوعها بين
            الفلل الحديثة والتجديدات الراقية، وهذا يعني أن اختيار{" "}
            <strong className="text-gold">مقاول تشطيب في الملقا</strong> لا يكون
            قراراً عشوائياً. العميل في الملقا عادة يبحث عن ثلاثة أمور واضحة:
            جودة التنفيذ، وضوح التسعير، والالتزام بالوقت. نحن في{" "}
            <strong className="text-gold">PYBCCO – بنيان الهرم للمقاولات</strong>{" "}
            بنينا طريقة عمل تحقق هذه النقاط عملياً على أرض الواقع، وليس فقط كلام
            تسويقي.
          </p>

          <p>
            أولاً: نبدأ دائماً بـ <strong className="text-gold">معاينة ميدانية</strong>{" "}
            لتحديد نطاق العمل بدقة، لأن المشاريع تختلف: هل هو تشطيب كامل لفيلا
            جديدة؟ أم{" "}
            <strong className="text-gold">ترميم وتجديد</strong> لجزء من المبنى؟
            أم{" "}
            <strong className="text-gold">بناء عظم</strong> مع تجهيزات أساسية؟
            بعد المعاينة نحدد بنداً بنداً ما المطلوب، ونختصر عليك القرارات
            المعقدة بأكثر شكل واضح، ثم نضع خطة تنفيذ وجداول زمنية منطقية.
          </p>

          <p>
            ثانياً: الجودة عندنا ليست “شعار”. نحن نعتمد نظام متابعة يضمن:
            استلام مراحل العمل (بالمعايير)، والتأكد من مطابقة المواد للمستوى
            المتفق عليه، وتوثيق التقدم بشكل مستمر. وهذا يهم جداً في حي الملقا لأن
            أغلب العملاء يركزون على التفاصيل: الاستقامة، الزوايا، العزل،
            التشطيبات النهائية، وتناسق الأعمال بين البنود. لذلك نؤمن أن{" "}
            <strong className="text-gold">التفاصيل هي الفرق</strong>.
          </p>

          <p>
            ثالثاً: نراعي طبيعة شمال الرياض من حيث المخططات الحديثة ومتطلبات
            التشطيب، لذلك خدماتنا في الملقا تشمل بشكل شائع:{" "}
            <strong className="text-gold">تشطيب فلل</strong>،{" "}
            <strong className="text-gold">تشطيب شقق</strong>،{" "}
            <strong className="text-gold">ترميم واجهات</strong>،{" "}
            <strong className="text-gold">أعمال جبس ودهانات</strong>،{" "}
            <strong className="text-gold">أرضيات وبلاط</strong>،{" "}
            <strong className="text-gold">كهرباء وسباكة</strong> حسب المعاينة،
            وأعمال عزل حسب الحاجة. الفكرة الأساسية: ننجز مشروعك كحزمة متكاملة
            بدلاً من تشتيت العمل بين عدة جهات.
          </p>

          <p>
            وإذا كنت تريد تقدير تكلفة مبدئي بسرعة قبل المعاينة، جهزنا لك{" "}
            <strong className="text-gold">حاسبة أسعار</strong> داخل الموقع تساعدك
            على فهم النطاق العام حسب المساحة والمستوى، ثم نثبت التفاصيل عند
            المعاينة. هذا الأسلوب يختصر وقت طويل على العميل ويزيد وضوح القرار.
          </p>

          <p>
            باختصار: إذا كنت تبحث عن{" "}
            <strong className="text-gold">مقاول في الملقا بالرياض</strong> يعطيك
            وضوح في السعر، وخطة تنفيذ، وإشراف، وجودة تسليم — فأنت في المكان
            الصحيح. تواصل معنا، أرسل مساحة مشروعك ونوع العمل، ونحدد لك موعد معاينة
            ونبدأ.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدماتنا في <span className="text-gold">حي الملقا</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب فلل في حي الملقا حسب المستوى (تجاري/قياسي/فاخر)",
            "تشطيب شقق في الملقا وتشطيبات داخلية كاملة",
            "بناء عظم وتنفيذ مراحل الهيكل حسب المخططات",
            "ترميم وتجديد فلل وشقق (حسب حالة الموقع)",
            "دهانات داخلية وخارجية + معالجات شروخ",
            "جبس بورد وديكورات وإضاءة مخفية",
            "أرضيات (سيراميك/بورسلان/رخام) حسب الاختيار",
            "أعمال كهرباء وسباكة وتجديد نقاط حسب المعاينة",
            "عزل أسطح ودورات مياه حسب التشخيص",
            "تنفيذ واجهات وتشطيبات خارجية حسب المتطلبات",
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

      {/* GALLERY */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صور أعمالنا في <span className="text-gold">حي الملقا</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          نماذج من أعمال التشطيب والتجهيزات والتنفيذ ضمن مشاريع متنوعة.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((src, idx) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img
                src={src}
                alt={galleryAlt[idx] || "أعمال تشطيب في حي الملقا بالرياض"}
                loading="lazy"
                className="w-full h-60 object-cover object-center group-hover:scale-[1.03] transition"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </a>
          ))}
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          روابط مهمة داخل <span className="text-gold">الموقع</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          إذا مشروعك يحتاج صفحة خدمة عامة أو مقارنة أسعار، تفضل:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض (الحاسبة)", href: "/villa-finishing-price-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
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

{/* FAQ Section */}
<section className="container mx-auto px-4 py-16">
  <h2 className="text-2xl sm:text-3xl font-bold text-center">
    أسئلة شائعة حول <span className="text-gold">مقاول حي الملقا</span>
  </h2>

  <div className="mt-10 space-y-6 max-w-4xl mx-auto text-right">

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gold">
        كم سعر تشطيب فيلا في حي الملقا؟
      </h3>
      <p className="mt-2 text-white/80 leading-relaxed">
        تختلف الأسعار حسب المساحة ومستوى التشطيب (تجاري – قياسي – فاخر).
        يمكن استخدام حاسبة الأسعار بالموقع للحصول على تقدير مبدئي،
        ثم يتم تحديد السعر النهائي بعد المعاينة.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gold">
        هل تقدمون بناء عظم في الملقا؟
      </h3>
      <p className="mt-2 text-white/80 leading-relaxed">
        نعم، ننفذ أعمال البناء العظم حسب المخططات المعتمدة،
        مع إشراف هندسي كامل ومتابعة جودة في جميع المراحل.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gold">
        هل المعاينة مجانية داخل حي الملقا؟
      </h3>
      <p className="mt-2 text-white/80 leading-relaxed">
        نعم، نوفر معاينة ميدانية مجانية لتقييم الموقع بدقة
        وتحديد نطاق العمل قبل إصدار عرض السعر.
      </p>
    </div>

  </div>
</section>


      {/* CTA BOTTOM (Buttons fixed - no outline) */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">جاهز تبدأ مشروعك في الملقا؟</h3>
          <p className="mt-3 text-white/70">
            أرسل مساحة المشروع ونوع العمل، ونحدد لك موعد معاينة ونرسل عرض سعر واضح.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() => {
                track("whatsapp_click_almalqa_bottom");
                window.location.href = waPrefill(
                  "أريد عرض سعر لمشروع في حي الملقا بالرياض. مساحة المشروع: (اكتبها) — نوع العمل: (تشطيب/عظم/ترميم)."
                );
              }}
            >
              واتساب الآن
            </Button>

            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("call_from_almalqa_page_bottom");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 text-lg"
              onClick={() => {
                track("open_calculator_from_almalqa_bottom");
                window.location.href = "/villa-finishing-price-riyadh";
              }}
            >
              افتح الحاسبة الآن
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
