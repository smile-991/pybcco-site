import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const SITE = "https://www.pybcco.com";
const CASE_STUDY_URL = "/case-study-villa-renovation-riyadh";

const FAQS = [
  {
    q: "ما هي خدمات ترميم الفلل التي تقدمونها في الرياض؟",
    a: "نقدم ترميم شامل حسب حالة الفيلا يشمل الدهانات، الجبس، الأرضيات، السباكة، الكهرباء، العزل، معالجة الرطوبة والتشققات، وتجديد الحمامات والمطابخ.",
  },
  {
    q: "هل تقدمون معاينة مجانية قبل الترميم؟",
    a: "نعم، نوفر معاينة وتقييم داخل الرياض لتحديد نطاق الأعمال وتقديم توصيات واضحة وعرض سعر حسب الحالة.",
  },
  {
    q: "هل يمكن ترميم جزء من الفيلا فقط؟",
    a: "نعم، يمكن تنفيذ ترميم جزئي مثل معالجة رطوبة، دهانات، تجديد حمامات أو مطبخ، إصلاحات جبس أو أرضيات حسب الاتفاق.",
  },
  {
    q: "كم مدة ترميم الفيلا عادة؟",
    a: "تختلف المدة حسب حجم الفيلا ونطاق الأعمال، وغالباً تتراوح بين 2 إلى 8 أسابيع، ويتم تحديد جدول زمني بعد المعاينة.",
  },
  {
    q: "هل يوجد إشراف هندسي على أعمال الترميم؟",
    a: "نعم، لدينا إشراف هندسي ومراقبين لضبط الجودة والالتزام بالمواصفات وخطة التنفيذ حتى التسليم.",
  },
  {
    q: "هل تشمل أعمال الترميم العزل ومعالجة التسربات؟",
    a: "نعم، ننفذ العزل ومعالجة التسربات والرطوبة حسب التشخيص، مثل عزل الأسطح ودورات المياه وإصلاح مصادر التسرب.",
  },
];

export default function VillaRenovationRiyadh() {
  const title = "ترميم فلل بالرياض | صيانة وتجديد شامل - بنيان الهرم";
  const description =
    "ترميم فلل بالرياض وتجديد شامل (دهانات، جبس، أرضيات، سباكة، كهرباء، عزل) حسب المعاينة. إشراف هندسي والتزام بالوقت. اطلب معاينة الآن.";
  const canonical = `${SITE}/villa-renovation-riyadh`;
  const ogImage = `${SITE}/images/VillaRenovationRiyadh.webp`;

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
      name: "ترميم فلل بالرياض",
      serviceType: "Villa renovation / Maintenance / Refurbishment",
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
          src="/images/VillaRenovationRiyadh.webp"
          alt="ترميم فلل بالرياض"
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold text-center">
            ترميم فلل بالرياض وتجديد شامل حسب المعاينة
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            نقدم خدمات{" "}
            <span className="text-gold font-bold">ترميم الفلل بالرياض</span>{" "}
            وتجديدها بالكامل حسب حالة المبنى والمعاينة الميدانية، مع{" "}
            <span className="text-gold font-bold">إشراف هندسي</span> وخطة واضحة
            والتزام بالوقت وجودة التنفيذ. نخدم جميع أحياء الرياض وننفذ أعمال
            الترميم الداخلية والخارجية حتى التسليم.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_renovation_hero");
                window.location.href = waPrefill(
                  "أريد طلب معاينة لمشروع ترميم فيلا بالرياض. الموقع/الحي: — مساحة الفيلا: — المشكلة الأساسية (رطوبة/تشققات/تجديد كامل/حمامات/مطبخ):"
                );
              }}
            >
              طلب معاينة (واتساب)
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_renovation_hero");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              استعرض خدمات الترميم
            </Button>
          </div>

          {/* Cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-right max-w-5xl mx-auto">
            {[
              {
                title: "معاينة وتقييم",
                desc: "نحدد نطاق الأعمال ونقدم توصيات واضحة قبل بدء التنفيذ.",
              },
              {
                title: "إشراف هندسي",
                desc: "مهندسون ومراقبون لضبط الجودة والالتزام بالمواصفات.",
              },
              {
                title: "ترميم شامل",
                desc: "دهانات، جبس، أرضيات، سباكة، كهرباء، عزل… حسب الحالة.",
              },
              {
                title: "التزام بالوقت",
                desc: "خطة واضحة وجدول زمني وتقارير متابعة حتى التسليم.",
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

      {/* ✅ CASE STUDY (Internal Link قوي + ثقة) */}
<section className="container mx-auto px-4 py-14">
  <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gold/20 bg-white/5 backdrop-blur-sm shadow-sm">
    <div className="grid lg:grid-cols-2">
      <div className="relative">
        <div className="aspect-[16/10] lg:h-full lg:aspect-auto overflow-hidden">
          <img
            src="/casestudy/main.webp"
            alt="دراسة حالة ترميم وتجديد فيلا بالرياض قبل وبعد"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute top-4 right-4 flex flex-wrap gap-2">
          <span className="bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
            قبل/بعد
          </span>
          <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
            دراسة حالة
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col justify-center text-right">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          شاهد دراسة حالة حقيقية لترميم وتجديد فيلا بالرياض (قبل/بعد)
        </h2>

        <p className="mt-3 text-white/75 leading-relaxed">
          إذا بدك تشوف مستوى التنفيذ قبل ما تطلب معاينة: هذه دراسة حالة موثّقة
          بالصور لمراحل العمل من البداية حتى النتيجة النهائية (تجهيزات، معالجة،
          تشطيبات داخلية وخارجية).
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            className="bg-gold text-black font-bold px-6 hover:bg-gold/90"
            onClick={() => track("open_case_study_from_renovation")}
          >
            <Link to={CASE_STUDY_URL}>عرض دراسة الحالة</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="text-gold bg-transparent hover:bg-white/10 px-6"
          >
            <Link to="/projects">مشاريع أخرى</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* LONG SEO CONTENT */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto text-right space-y-5 text-white/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            متى تحتاج <span className="text-gold">ترميم فيلا بالرياض</span>؟
          </h2>

          <p>
            كثير من الفلل في الرياض تحتاج ترميم لأسباب مثل{" "}
            <strong className="text-gold">الرطوبة</strong> أو{" "}
            <strong className="text-gold">التشققات</strong> أو{" "}
            <strong className="text-gold">تجديد الحمامات والمطابخ</strong> أو
            إعادة توزيع الإضاءة والديكورات. نحن نبدأ بمعاينة لتحديد السبب الحقيقي
            ثم نقترح الحل الأنسب (معالجة/تجديد/عزل) بدل “ترقيع” مؤقت.
          </p>

          <p>
            أسلوبنا في الترميم يعتمد على: تحديد نطاق العمل، اختيار المواد حسب
            المستوى، تنفيذ منظم بمراحل استلام، وتوثيق التقدم. هذا يقلل الأخطاء
            ويضمن مطابقة النتائج للمستوى المتفق عليه.
          </p>

          <p>
            إذا كان مشروعك يحتاج تشطيب كامل بدل ترميم جزئي، يمكنك زيارة صفحة{" "}
            <a
              href="/villa-finishing-riyadh"
              className="text-gold font-bold hover:underline"
            >
              تشطيب فلل بالرياض
            </a>{" "}
            أو استخدام{" "}
            <a
              href="/villa-finishing-price-riyadh"
              className="text-gold font-bold hover:underline"
            >
              حاسبة الأسعار
            </a>{" "}
            لأخذ تصور مبدئي قبل المعاينة.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">ترميم الفلل</span> التي نقدمها
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "ترميم واجهات وتشطيبات خارجية حسب الحالة",
            "صيانة ومعالجة رطوبة وتسربات (حسب التشخيص)",
            "دهانات داخلية وخارجية + معالجات تشققات",
            "جبس بورد وديكورات وإصلاحات أسقف",
            "أعمال كهرباء وسباكة وتجديد نقاط (حسب المعاينة)",
            "عزل أسطح ودورات مياه (حسب الحاجة)",
            "تغيير أرضيات وسيراميك وبورسلان حسب الاختيار",
            "إعادة تأهيل حمامات ومطابخ وتجديد كامل",
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
          الأسئلة الشائعة حول <span className="text-gold">ترميم الفلل بالرياض</span>
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
            أرسل تفاصيل بسيطة عن الحالة (رطوبة/تشققات/تجديد كامل) ونرتّب معاينة ونقدّم عرض سعر واضح.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_renovation_bottom");
                window.location.href = waPrefill(
                  "أريد عرض سعر لترميم فيلا بالرياض. الموقع/الحي: — مساحة الفيلا: — الحالة: — المطلوب (حمامات/مطبخ/دهانات/عزل/تجديد كامل):"
                );
              }}
            >
              واتساب الآن
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_renovation_bottom");
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

