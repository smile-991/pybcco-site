import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const SITE = "https://www.pybcco.com";

const FAQS = [
  {
    q: "هل تقدمون معاينة مجانية داخل الرياض؟",
    a: "نعم، نرتّب زيارة ومعاينة ميدانية حسب موقع المشروع ونطاق العمل، ثم نقدّم عرض سعر واضح ومفصّل.",
  },
  {
    q: "هل عندكم إشراف هندسي ومراقبين؟",
    a: "نعم، لدينا إشراف هندسي ومراقبة جودة لضبط المواد والتنفيذ والالتزام بالمخططات ومراحل الاستلام.",
  },
  {
    q: "هل تقدمون تسليم مفتاح؟",
    a: "نعم، ننفذ مشاريع تسليم مفتاح من إدارة المشروع إلى التشطيب النهائي، ويمكن الاتفاق مع توريد مواد أو بدون.",
  },
  {
    q: "كم مدة التنفيذ عادة؟",
    a: "تختلف حسب حجم المشروع ونوع الأعمال. بعد المعاينة نضع جدول زمني واضح بمراحل استلام وتسليم.",
  },
  {
    q: "ما الخدمات الأساسية التي تقدمها شركة بنيان الهرم في الرياض؟",
    a: "تشطيب فلل وشقق، ترميم وتجديد، بناء عظم، صيانة، وإدارة مشاريع مع إشراف هندسي وجودة تنفيذ.",
  },
  {
    q: "هل الأسعار تشمل المواد والعمالة؟",
    a: "حسب نوع العرض (مقطوعية شاملة أو بنود تفصيلية). نوضح ذلك صراحة داخل عرض السعر بعد المعاينة.",
  },
];

export default function ConstructionCompanyRiyadh() {
  const title = "شركة مقاولات بالرياض | تنفيذ وتشطيب وترميم - بنيان الهرم";
  const description =
    "شركة بنيان الهرم للمقاولات بالرياض: تنفيذ مشاريع، تشطيب فلل وشقق تسليم مفتاح، ترميم وصيانة، بناء عظم، وإشراف هندسي كامل. التزام بالمواعيد وجودة عالية. تواصل الآن.";
  const canonical = `${SITE}/construction-company-riyadh`;
  const ogImage = `${SITE}/images/ConstructionCompanyRiyadh.webp`;

  const jsonLd = useMemo(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "شركة مقاولات بالرياض",
      serviceType: "Construction / Finishing / Renovation",
      url: canonical,
      areaServed: { "@type": "City", name: "Riyadh" },
      provider: {
        "@type": ["LocalBusiness", "ConstructionCompany"],
        name: "PYBCCO – بنيان الهرم للمقاولات",
        url: SITE,
        telephone: "+966550604837",
      },
    };

    const webpageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: canonical,
      description,
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
          src="/images/ConstructionCompanyRiyadh.webp"
          alt="شركة مقاولات بالرياض"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
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
            شركة مقاولات بالرياض لتنفيذ المشاريع والتشطيب والترميم باحتراف
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold">بنيان الهرم (PYBCCO)</span> شركة
            مقاولات في الرياض تقدم حلول تنفيذ متكاملة تشمل{" "}
            <a
              href="/villa-finishing-riyadh"
              className="text-gold font-bold hover:underline"
            >
              تشطيب فلل وشقق
            </a>{" "}
            تسليم مفتاح،{" "}
            <a
              href="/villa-renovation-riyadh"
              className="text-gold font-bold hover:underline"
            >
              ترميم وصيانة وتجديد
            </a>{" "}
            شامل، و{" "}
            <a
              href="/villa-bone-construction-riyadh"
              className="text-gold font-bold hover:underline"
            >
              بناء عظم
            </a>{" "}
            حسب المخططات — مع إشراف هندسي وجودة تنفيذ والتزام بالوقت.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_construction_page");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال مباشر
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_construction_page");
                window.location.href = waPrefill(
                  "أريد طلب معاينة لمشروع في الرياض. مساحة المشروع: (اكتبها) — نوع العمل: (تشطيب/ترميم/عظم) — الموقع/الحي:"
                );
              }}
            >
              طلب معاينة (واتساب)
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

          {/* TRUST CARDS */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-right max-w-6xl mx-auto">
            {[
              {
                title: "إشراف هندسي كامل",
                desc: "مهندسون ومراقبون لمتابعة التنفيذ وضبط الجودة مرحلة بمرحلة.",
              },
              {
                title: "تنفيذ تسليم مفتاح",
                desc: "من البداية حتى التشطيب النهائي بدون تشتيت بين عدة مقاولين.",
              },
              {
                title: "التزام بالمواعيد",
                desc: "خطة عمل واضحة وتقارير متابعة لتسليم المشروع ضمن الجدول.",
              },
              {
                title: "تسعير واضح",
                desc: "نثبت نطاق العمل بعد المعاينة ونوضح (شامل/بنود) بشكل صريح.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-2xl border border-gold/20 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-gold mb-3">{x.title}</h3>
                <p className="text-white/80 leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LONG SEO CONTENT */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto text-right space-y-5 text-white/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            لماذا تختار <span className="text-gold">شركة مقاولات بالرياض</span> لديها نظام واضح؟
          </h2>

          <p>
            اختيار <strong className="text-gold">شركة مقاولات في الرياض</strong>{" "}
            ليس مجرد سعر. العميل يحتاج وضوح في نطاق العمل، جودة تنفيذ، والتزام في
            الوقت. لذلك نحن نعتمد أسلوب عمل يبدأ بـ{" "}
            <strong className="text-gold">المعاينة</strong> ثم تحديد البنود
            والمستوى (تجاري/قياسي/فاخر)، وبعدها خطة تنفيذ بمراحل استلام واضحة.
          </p>

          <p>
  ولتعزيز الشفافية وحفظ الحقوق، نعتمد{" "}
  <Link
    to="/project-tracking-system-riyadh"
    className="text-gold font-bold hover:underline"
  >
    نظام متابعة رقمي احترافي
  </Link>{" "}
  يمكّن العميل من متابعة نسبة الإنجاز، مراجعة الدفعات، تحميل الوثائق، والاطلاع
  على التحديثات بالصور ضمن حساب خاص — بحيث تكون الصورة واضحة في كل مرحلة من
  مراحل التنفيذ.
</p>

          <p>
            خدماتنا تغطي مشاريع سكنية وتجارية داخل الرياض:{" "}
            <strong className="text-gold">تشطيب فلل</strong> و{" "}
            <strong className="text-gold">تشطيب شقق</strong> و{" "}
            <strong className="text-gold">ترميم وتجديد</strong> و{" "}
            <strong className="text-gold">بناء عظم</strong>. ونقدر نشتغل كنظام
            تسليم مفتاح أو ضمن نطاق محدد حسب احتياج العميل.
          </p>

          <p>
            إذا بدك تقدير مبدئي قبل المعاينة، جهزنا صفحة{" "}
            <a
              href="/villa-finishing-price-riyadh"
              className="text-gold font-bold hover:underline"
            >
              حاسبة أسعار التشطيب في الرياض
            </a>{" "}
            لتأخذ تصور سريع، وبعدها نثبّت السعر النهائي عند المعاينة.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">شركة مقاولات بالرياض</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          مجموعة خدمات متكاملة داخل الرياض، مع جودة تنفيذ عالية وإدارة مشروع
          محترفة حسب المعاينة.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب فلل وشقق (دهانات، جبس، أرضيات، أبواب، إضاءة)",
            "تشطيب خارجي وواجهات حسب التصميم",
            "ترميم فلل ومباني + معالجة التشققات والرطوبة",
            "بناء عظم حسب المخططات والمواصفات",
            "أعمال كهرباء وسباكة وتحديث نقاط حسب الحاجة",
            "إدارة المشروع + توريد مواد حسب رغبة العميل",
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

      {/* INTERNAL LINK: AL MALQA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-right">
          <h2 className="text-2xl sm:text-3xl font-bold">
            مقاول تشطيب وبناء في <span className="text-gold">حي الملقا</span> بالرياض
          </h2>

          <p className="mt-4 text-white/80 leading-relaxed">
            جهزنا صفحة مخصصة لحي الملقا تشمل تفاصيل الخدمات + صور + أسئلة شائعة +
            أزرار تواصل مباشرة، لتقوية الظهور المحلي في شمال الرياض.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <a
              href="/contractor-almalqa-riyadh"
              className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded-xl transition text-center"
            >
              افتح صفحة حي الملقا
            </a>

            <a
              href="/villa-finishing-price-riyadh"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-center"
            >
              افتح حاسبة الأسعار
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صفحات مهمة <span className="text-gold">لخدماتنا</span>
        </h2>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              href: "/villa-finishing-riyadh",
              title: "تشطيب فلل بالرياض",
              desc: "تفاصيل التشطيب وتسليم المفتاح مع طرق تواصل مباشرة.",
            },
            {
              href: "/villa-renovation-riyadh",
              title: "ترميم فلل بالرياض",
              desc: "تجديد وترميم شامل ومعالجة التشققات والرطوبة حسب الحالة.",
            },
            {
              href: "/villa-bone-construction-riyadh",
              title: "بناء عظم بالرياض",
              desc: "تنفيذ العظم حسب المخططات والمواصفات مع إشراف هندسي.",
            },
            {
              href: "/apartment-finishing-riyadh",
              title: "تشطيب شقق بالرياض",
              desc: "تشطيب شقق سكنية بتصاميم عصرية وجودة تنفيذ عالية.",
            },
            {
              href: "/villa-finishing-price-riyadh",
              title: "أسعار تشطيب فلل بالرياض",
              desc: "تقدير تكلفة التشطيب حسب المساحة والمستوى قبل المعاينة.",
            },
            {
              href: "/home-renovation-company-riyadh",
              title: "مقاول ترميم منازل بالرياض",
              desc: "حلول ترميم وإعادة تأهيل بإدارة هندسية متكاملة.",
            },
          ].map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition text-right"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-2 text-white/70">{x.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ (VISIBLE + MATCHES SCHEMA) */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          أسئلة شائعة عن <span className="text-gold">شركة مقاولات بالرياض</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {FAQS.map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-right"
            >
              <div className="text-lg font-bold text-gold">{x.q}</div>
              <div className="mt-2 text-white/75 leading-relaxed">{x.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">جاهز تبدأ مشروعك في الرياض؟</h3>
          <p className="mt-3 text-white/70">
            تواصل معنا الآن وخذ استشارة أولية، ونرتّب معاينة ونقدّم عرض سعر واضح.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("call_from_construction_bottom");
                window.location.href = "tel:+966550604837";
              }}
            >
              اتصال
            </Button>

            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg hover:bg-gold/90 transition"
              onClick={() => {
                track("whatsapp_click_construction_bottom");
                window.location.href = waPrefill(
                  "أريد عرض سعر لمشروع في الرياض. مساحة المشروع: (اكتبها) — نوع العمل: (تشطيب/ترميم/عظم) — الموقع/الحي:"
                );
              }}
            >
              واتساب
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

