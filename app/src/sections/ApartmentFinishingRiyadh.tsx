import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ApartmentFinishingRiyadh() {
  useEffect(() => {
    document.title = "تشطيب شقق بالرياض | تنفيذ وتسليم مفتاح - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة بنيان الهرم تقدم خدمات تشطيب شقق بالرياض تسليم مفتاح، دهانات، جبس، أرضيات، سباكة وكهرباء حسب الاتفاق. جودة عالية والتزام بالمواعيد.";
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
          name: "ما هي خدمات تشطيب الشقق التي تقدمونها في الرياض؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نقدم تشطيب شقق تسليم مفتاح حسب الاتفاق ويشمل الدهانات، الجبس، الأرضيات، الإضاءة، السباكة والكهرباء وتجهيزات الحمام والمطبخ حسب نطاق العمل.",
          },
        },
        {
          "@type": "Question",
          name: "هل تقدمون تشطيب شقق تسليم مفتاح؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، ننفذ تشطيب شقق تسليم مفتاح من البداية حتى التسليم النهائي مع إشراف هندسي وتنظيم كامل للأعمال.",
          },
        },
        {
          "@type": "Question",
          name: "كم مدة تشطيب الشقة عادة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تختلف المدة حسب مساحة الشقة ونطاق الأعمال ومستوى التشطيب، وغالباً تتراوح بين 2 إلى 6 أسابيع، ويتم تحديد جدول زمني بعد المعاينة.",
          },
        },
        {
          "@type": "Question",
          name: "هل يمكن تنفيذ تشطيب جزئي فقط للشقة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، يمكن تنفيذ تشطيب جزئي مثل دهانات فقط، جبس فقط، أرضيات فقط، أو تحديث حمام/مطبخ حسب الاتفاق.",
          },
        },
        {
          "@type": "Question",
          name: "هل يوجد إشراف هندسي على تشطيب الشقق؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "نعم، لدينا إشراف هندسي ومراقبة جودة لضبط التنفيذ والمواد والالتزام بالمواصفات حتى التسليم.",
          },
        },
        {
          "@type": "Question",
          name: "كيف يتم تحديد تكلفة تشطيب الشقة؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "تتحدد التكلفة حسب المساحة ومستوى المواد ونطاق الأعمال (دهانات، جبس، أرضيات، كهرباء، سباكة) ويتم تثبيت السعر النهائي بعد المعاينة وتحديد التفاصيل.",
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
      {/* HERO (full width background image) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/images/ApartmentFinishingRiyadh.jpg"
          alt="تشطيب شقق بالرياض"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="container mx-auto px-4 text-center relative z-10 pt-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
            تشطيب شقق بالرياض تسليم مفتاح
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            نقدم خدمات تشطيب شقق بالرياض بجودة عالية، من الدهانات والأرضيات إلى
            الأسقف الجبسية والإضاءة، مع إشراف هندسي وتنفيذ منظم يضمن تسليم الشقة
            جاهزة للسكن.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
              onClick={() => (window.location.href = "https://wa.me/966550604837")}
            >
              واتساب الآن
            </Button>
          </div>
        </div>
      </section>

      {/* ✅ FAQ VISIBLE (قبل الروابط الداخلية) */}
      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          الأسئلة الشائعة حول <span className="text-gold">تشطيب الشقق بالرياض</span>
        </h2>

        <div className="mt-8 space-y-6 text-white/80 leading-relaxed">
          <div>
            <h3 className="font-bold text-white mb-2">
              ما هي خدمات تشطيب الشقق التي تقدمونها في الرياض؟
            </h3>
            <p>
              نقدم تشطيب شقق تسليم مفتاح حسب الاتفاق ويشمل الدهانات، الجبس،
              الأرضيات، الإضاءة، السباكة والكهرباء وتجهيزات الحمام والمطبخ حسب
              نطاق العمل.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل تقدمون تشطيب شقق تسليم مفتاح؟
            </h3>
            <p>
              نعم، ننفذ تشطيب شقق تسليم مفتاح من البداية حتى التسليم النهائي مع
              إشراف هندسي وتنظيم كامل للأعمال.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">كم مدة تشطيب الشقة عادة؟</h3>
            <p>
              تختلف المدة حسب مساحة الشقة ونطاق الأعمال ومستوى التشطيب، وغالباً
              تتراوح بين 2 إلى 6 أسابيع، ويتم تحديد جدول زمني بعد المعاينة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل يمكن تنفيذ تشطيب جزئي فقط للشقة؟
            </h3>
            <p>
              نعم، يمكن تنفيذ تشطيب جزئي مثل دهانات فقط، جبس فقط، أرضيات فقط، أو
              تحديث حمام/مطبخ حسب الاتفاق.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              هل يوجد إشراف هندسي على تشطيب الشقق؟
            </h3>
            <p>
              نعم، لدينا إشراف هندسي ومراقبة جودة لضبط التنفيذ والمواد والالتزام
              بالمواصفات حتى التسليم.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">
              كيف يتم تحديد تكلفة تشطيب الشقة؟
            </h3>
            <p>
              تتحدد التكلفة حسب المساحة ومستوى المواد ونطاق الأعمال (دهانات، جبس،
              أرضيات، كهرباء، سباكة) ويتم تثبيت السعر النهائي بعد المعاينة وتحديد
              التفاصيل.
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
          <a
            href="/construction-company-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">شركة مقاولات بالرياض</div>
          </a>

          <a
            href="/villa-finishing-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">تشطيب فلل بالرياض</div>
          </a>

          <a
            href="/villa-bone-construction-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">بناء عظم بالرياض</div>
          </a>

          <a
            href="/villa-renovation-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">ترميم فلل بالرياض</div>
          </a>

          <a
            href="/villa-finishing-price-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">سعر تشطيب المتر بالرياض</div>
          </a>

          <a
            href="/home-renovation-company-riyadh"
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
          >
            <div className="text-lg font-bold text-gold">شركة ترميم منازل بالرياض</div>
          </a>
        </div>
      </section>
    </div>
  );
}
