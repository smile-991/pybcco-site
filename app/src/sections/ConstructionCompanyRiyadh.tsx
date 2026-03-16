import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const SITE = "https://pybcco.com";

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
    a: "تختلف حسب حجم المشروع ونوع الأعمال. بعد المعاينة نضع جدولًا زمنيًا واضحًا بمراحل استلام وتسليم.",
  },
  {
    q: "ما الخدمات الأساسية التي تقدمها شركة بنيان الهرم في الرياض؟",
    a: "تشطيب فلل وشقق، ترميم وتجديد، بناء عظم، صيانة، وإدارة مشاريع مع إشراف هندسي وجودة تنفيذ.",
  },
  {
    q: "هل الأسعار تشمل المواد والعمالة؟",
    a: "حسب نوع العرض، سواء كان مقطوعية شاملة أو بنودًا تفصيلية، ونوضح ذلك صراحة داخل عرض السعر بعد المعاينة.",
  },
  {
    q: "هل تقدمون عرض سعر تفصيلي قبل التنفيذ؟",
    a: "نعم، بعد المعاينة وتحديد نطاق العمل نقدّم عرض سعر واضح يشرح البنود وطبيعة التنفيذ وما إذا كان شاملاً أو بنظام بنود.",
  },
  {
    q: "هل تعملون في جميع أحياء الرياض؟",
    a: "نخدم مشاريع داخل مدينة الرياض في عدة أحياء ومناطق، ويتم ترتيب المعاينة حسب موقع المشروع ونوع الأعمال المطلوبة.",
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
      description:
        "شركة مقاولات بالرياض تقدم تشطيب فلل وشقق، ترميم وتجديد، بناء عظم، وإدارة مشاريع مع إشراف هندسي وجودة تنفيذ.",
      serviceType: "Construction / Finishing / Renovation",
      url: canonical,
      areaServed: {
        "@type": "City",
        name: "Riyadh",
      },
      provider: {
        "@type": "Organization",
        name: "PYBCCO – بنيان الهرم للمقاولات",
        url: SITE,
        image: ogImage,
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

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: SITE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "شركة مقاولات بالرياض",
          item: canonical,
        },
      ],
    };

    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "تشطيب وترميم فيلا سكنية في الرياض",
      description:
        "فيديو يوضح تنفيذ أعمال تشطيب وترميم فيلا سكنية في الرياض بواسطة شركة بنيان الهرم للمقاولات.",
      thumbnailUrl: [ogImage],
      uploadDate: "2026-03-14",
      contentUrl: "https://youtube.com/shorts/qaKZukA1534",
      embedUrl: "https://www.youtube.com/embed/qaKZukA1534",
      publisher: {
        "@type": "Organization",
        name: "PYBCCO – بنيان الهرم للمقاولات",
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/logo.webp`,
        },
      },
    };

    return [
      webpageSchema,
      serviceSchema,
      faqSchema,
      breadcrumbSchema,
      videoSchema,
    ];
  }, [canonical, description, title, ogImage]);

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
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold text-center leading-tight">
            شركة مقاولات بالرياض لتنفيذ المشاريع والتشطيب والترميم باحتراف
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            <span className="text-gold font-bold">بنيان الهرم (PYBCCO)</span> شركة
            مقاولات في الرياض تقدم حلول تنفيذ متكاملة تشمل{" "}
            <Link
              to="/villa-finishing-riyadh"
              className="text-gold font-bold hover:underline"
            >
              تشطيب فلل وشقق
            </Link>{" "}
            تسليم مفتاح، و{" "}
            <Link
              to="/villa-renovation-riyadh"
              className="text-gold font-bold hover:underline"
            >
              ترميم وصيانة وتجديد
            </Link>{" "}
            شامل، و{" "}
            <Link
              to="/villa-bone-construction-riyadh"
              className="text-gold font-bold hover:underline"
            >
              بناء عظم
            </Link>{" "}
            حسب المخططات — مع إشراف هندسي، وجودة تنفيذ، والتزام بالمواعيد.
          </p>

          <p className="mt-4 text-white/80 text-base md:text-lg max-w-3xl mx-auto">
            شركة مقاولات بالرياض بخطة عمل واضحة، وتسعير منظم، ومتابعة هندسية من
            المعاينة حتى التسليم.
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
                  "السلام عليكم، أريد طلب معاينة لمشروع في الرياض.\nنوع العمل: تشطيب / ترميم / بناء عظم\nالمساحة التقريبية:\nالحي:\nموعد مناسب للتواصل:"
                );
              }}
            >
              طلب معاينة (واتساب)
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => {
                track("open_calculator_from_construction_hero");
                window.location.href =
                  "/villa-construction-cost-calculator-riyadh";
              }}
            >
              أنشئ عرض سعرك بنفسك
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
                desc: "نثبت نطاق العمل بعد المعاينة ونوضح شامل أو بنود بشكل صريح.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-2xl border border-gold/20 backdrop-blur-sm"
              >
                <h2 className="text-xl font-bold text-gold mb-3">{x.title}</h2>
                <p className="text-white/80 leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT VIDEO */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            تشطيب وترميم فيلا سكنية في <span className="text-gold">الرياض</span>
          </h2>

          <p className="text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed">
            مثال حقيقي من أعمال شركة بنيان الهرم للمقاولات في تنفيذ وتشطيب
            وترميم الفلل السكنية داخل الرياض.
          </p>

          <p className="text-white/50 text-sm mb-8 break-all">
            https://youtube.com/shorts/qaKZukA1534
          </p>

          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/qaKZukA1534"
              title="تشطيب وترميم فيلا سكنية في الرياض"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* LONG SEO CONTENT */}
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto text-right space-y-5 text-white/80 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            لماذا تختار <span className="text-gold">شركة مقاولات بالرياض</span>{" "}
            لديها نظام واضح؟
          </h2>

          <p>
            اختيار <strong className="text-gold">شركة مقاولات في الرياض</strong>{" "}
            ليس مجرد سعر فقط. العميل يحتاج إلى وضوح في نطاق العمل، جودة تنفيذ،
            التزام بالمواعيد، ومتابعة حقيقية خلال مراحل المشروع. لذلك نعتمد أسلوب
            عمل يبدأ بـ <strong className="text-gold">المعاينة</strong> ثم تحديد
            البنود والمستوى المطلوب، وبعدها وضع خطة تنفيذ بمراحل استلام واضحة.
          </p>

          <p>
            ولتعزيز الشفافية وحفظ الحقوق، نعتمد{" "}
            <Link
              to="/project-tracking-system-riyadh"
              className="text-gold font-bold hover:underline"
            >
              نظام متابعة رقمي احترافي
            </Link>{" "}
            يمكّن العميل من متابعة نسبة الإنجاز، مراجعة الدفعات، تحميل الوثائق،
            والاطلاع على التحديثات بالصور ضمن حساب خاص، بحيث تكون الصورة واضحة في
            كل مرحلة من مراحل التنفيذ.
          </p>

          <p>
            خدماتنا تغطي مشاريع سكنية وتجارية داخل الرياض، وتشمل{" "}
            <strong className="text-gold">تشطيب فلل</strong> و{" "}
            <strong className="text-gold">تشطيب شقق</strong> و{" "}
            <strong className="text-gold">ترميم وتجديد</strong> و{" "}
            <strong className="text-gold">بناء عظم</strong>. ويمكن تنفيذ المشروع
            كنظام تسليم مفتاح أو ضمن نطاق محدد حسب احتياج العميل وميزانية
            التنفيذ.
          </p>

          <p>
            وإذا كنت تريد تصورًا مبدئيًا قبل المعاينة، جهزنا{" "}
            <Link
              to="/villa-construction-cost-calculator-riyadh"
              className="text-gold font-bold hover:underline"
            >
              حاسبة تكلفة البناء وإنشاء عرض سعر مبدئي
            </Link>{" "}
            لتأخذ فكرة أولية، وبعدها نثبت السعر النهائي عند المعاينة ورفع نطاق
            العمل الفعلي.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-6">
        <p className="text-sm opacity-80 text-center">
          قبل توقيع أي عقد، اطلع على{" "}
          <Link
            to="/engineering-insights/how-to-choose-construction-company-riyadh"
            className="underline underline-offset-4 text-gold hover:opacity-80"
          >
            رؤى هندسية: كيف تختار أفضل شركة مقاولات في الرياض؟
          </Link>
        </p>
      </div>

      {/* SERVICES */}
      <section id="services" className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">شركة مقاولات بالرياض</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          مجموعة خدمات متكاملة داخل الرياض مع جودة تنفيذ عالية، وإدارة مشروع
          محترفة، وتسعير واضح حسب المعاينة.
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

      {/* HOW WE WORK */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          كيف نعمل في <span className="text-gold">بنيان الهرم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "1) تواصل ومعاينة",
              desc: "نستقبل تفاصيل المشروع ونرتب زيارة ميدانية لفهم الحالة الفعلية ونطاق الأعمال المطلوبة.",
            },
            {
              title: "2) تحديد البنود",
              desc: "نحدد نطاق التنفيذ والمستوى المطلوب ونوضح ما هو شامل وما هو غير شامل بشكل واضح.",
            },
            {
              title: "3) عرض سعر واضح",
              desc: "نقدم عرض سعر منظم يشرح البنود وطريقة التنفيذ والمدة المتوقعة وخطوات العمل.",
            },
            {
              title: "4) تنفيذ ومتابعة",
              desc: "نبدأ التنفيذ مع إشراف هندسي ومتابعة جودة وتقارير واضحة حتى التسليم النهائي.",
            },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-right"
            >
              <h3 className="text-lg font-bold text-gold">{x.title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LINK: AL MALQA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-right">
          <h2 className="text-2xl sm:text-3xl font-bold">
            مقاول تشطيب وبناء في <span className="text-gold">حي الملقا</span>{" "}
            بالرياض
          </h2>

          <p className="mt-4 text-white/80 leading-relaxed">
            جهزنا صفحة مخصصة لحي الملقا تشمل تفاصيل الخدمات، صورًا، أسئلة شائعة،
            وأزرار تواصل مباشرة، لتقوية الظهور المحلي في شمال الرياض.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              to="/contractor-almalqa-riyadh"
              className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded-xl transition text-center"
            >
              افتح صفحة حي الملقا
            </Link>

            <Link
              to="/villa-construction-cost-calculator-riyadh"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition text-center"
            >
              افتح الحاسبة
            </Link>
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
              to: "/villa-finishing-riyadh",
              title: "تشطيب فلل بالرياض",
              desc: "تفاصيل التشطيب وتسليم المفتاح مع طرق تواصل مباشرة.",
            },
            {
              to: "/villa-renovation-riyadh",
              title: "ترميم فلل بالرياض",
              desc: "تجديد وترميم شامل ومعالجة التشققات والرطوبة حسب الحالة.",
            },
            {
              to: "/villa-bone-construction-riyadh",
              title: "بناء عظم بالرياض",
              desc: "تنفيذ العظم حسب المخططات والمواصفات مع إشراف هندسي.",
            },
            {
              to: "/apartment-finishing-riyadh",
              title: "تشطيب شقق بالرياض",
              desc: "تشطيب شقق سكنية بتصاميم عصرية وجودة تنفيذ عالية.",
            },
            {
              to: "/villa-finishing-price-riyadh",
              title: "أسعار تشطيب فلل بالرياض",
              desc: "تقدير تكلفة التشطيب حسب المساحة والمستوى قبل المعاينة.",
            },
            {
              to: "/home-renovation-company-riyadh",
              title: "مقاول ترميم منازل بالرياض",
              desc: "حلول ترميم وإعادة تأهيل بإدارة هندسية متكاملة.",
            },
          ].map((x, i) => (
            <Link
              key={i}
              to={x.to}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition text-right"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-2 text-white/70">{x.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
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
          <h2 className="text-2xl font-bold">جاهز تبدأ مشروعك في الرياض؟</h2>
          <p className="mt-3 text-white/70">
            تواصل معنا الآن وخذ استشارة أولية، أو استخدم الحاسبة وأنشئ تصورًا
            أوليًا لسعرك بنفسك.
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
                  "السلام عليكم، أريد عرض سعر لمشروع في الرياض.\nنوع العمل: تشطيب / ترميم / بناء عظم\nالمساحة التقريبية:\nالحي:\nتفاصيل إضافية:"
                );
              }}
            >
              واتساب
            </Button>

            <Button
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-6 text-lg hover:bg-white/15"
              onClick={() => {
                track("open_calculator_from_construction_bottom");
                window.location.href =
                  "/villa-construction-cost-calculator-riyadh";
              }}
            >
              أنشئ عرض سعرك بنفسك
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}